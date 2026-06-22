"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  X,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import Confetti from "@/components/ui/Confetti";

export type CheckoutPlan = {
  id: string;
  name: string;
  amount: number;
  currency: "USD" | "PEN" | string;
  billing: "monthly" | "yearly";
  description?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  plan: CheckoutPlan | null;
};

type Stage = "form" | "processing" | "success" | "error";

const POST_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_POST_CHECKOUT_URL ?? "https://megalodon-blue.vercel.app/auth/login";

const PROCESSING_STEPS = [
  { label: "Validando tarjeta", duration: 900 },
  { label: "Conectando con la pasarela", duration: 1100 },
  { label: "Autorizando pago", duration: 1300 },
  { label: "Activando suscripción", duration: 900 },
];

function detectBrand(num: string) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^6/.test(n)) return "Discover";
  return "Card";
}

function formatCard(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length < 3) return d;
  return d.slice(0, 2) + "/" + d.slice(2);
}

export default function CheckoutModal({ open, onClose, plan }: Props) {
  const [stage, setStage] = useState<Stage>("form");
  const [stepIdx, setStepIdx] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holder, setHolder] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [locations, setLocations] = useState(1);
  const toast = useToast();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setStage("form");
    setStepIdx(0);
    setError(null);
    setOrderId(null);
    setLocations(1);
    openerRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      openerRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stage !== "processing") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const list = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, stage]);

  const brand = useMemo(() => detectBrand(card), [card]);
  const last4 = useMemo(() => card.replace(/\D/g, "").slice(-4), [card]);

  const sym = plan?.currency === "PEN" ? "S/ " : "$";
  const totalAmount = plan ? plan.amount * locations : 0;
  const formattedAmount = `${sym}${totalAmount.toFixed(2)}`;
  const formattedUnit = plan ? `${sym}${plan.amount.toFixed(2)}` : "";
  const billingLabel = plan?.billing === "yearly" ? "/año · por local" : "/mes · por local";

  if (!open || !plan) return null;

  const validate = () => {
    if (!name.trim() || !email.trim()) return "Nombre y email son obligatorios.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email inválido.";
    const digits = card.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) return "Número de tarjeta inválido.";
    const exp = expiry.replace(/\D/g, "");
    if (exp.length !== 4) return "Vencimiento inválido (MM/AA).";
    const mm = Number(exp.slice(0, 2));
    if (mm < 1 || mm > 12) return "Mes de vencimiento inválido.";
    if (cvc.length < 3 || cvc.length > 4) return "CVC inválido.";
    if (!holder.trim()) return "Falta el nombre del titular.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setStage("processing");
    setStepIdx(0);

    let cancelled = false;

    const animate = async () => {
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        if (cancelled) return;
        setStepIdx(i);
        await new Promise((r) => setTimeout(r, PROCESSING_STEPS[i].duration));
      }
    };

    const apiCall = fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: plan.id,
        planName: locations > 1 ? `${plan.name} × ${locations} locales` : plan.name,
        amount: totalAmount,
        currency: plan.currency,
        billing: plan.billing,
        customer: { name, email, restaurant },
        card: { last4, brand },
        website, // honeypot
      }),
    });

    try {
      const [, res] = await Promise.all([animate(), apiCall]);
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "No pudimos procesar el pago.");
      setOrderId(data.orderId ?? null);
      setStage("success");
      toast.success("¡Pago confirmado!", `Te enviamos el recibo a ${email}.`);
    } catch (err) {
      cancelled = true;
      const msg = err instanceof Error ? err.message : "Error al procesar el pago.";
      setError(msg);
      setStage("error");
      toast.error("Pago rechazado", msg);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ animation: "fadeIn 200ms ease-out" }}
    >
      <button
        type="button"
        aria-label="Cerrar"
        tabIndex={-1}
        className="absolute inset-0 cursor-default"
        onClick={() => stage !== "processing" && onClose()}
        style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      />

      <div
        ref={dialogRef}
        className="relative w-full sm:max-w-[920px] mx-auto sm:rounded-3xl rounded-t-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.1fr_1fr] max-h-[92vh]"
        style={{
          background: "linear-gradient(180deg, #0F172A 0%, #0B1220 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          animation: "modalIn 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {stage !== "processing" && (
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* LEFT — Form / States */}
        <div className="p-7 sm:p-9 overflow-y-auto">
          {stage === "form" && (
            <form onSubmit={handleSubmit}>
              {/* Honeypot */}
              <div aria-hidden="true" className="absolute pointer-events-none opacity-0 -z-10" style={{ left: "-9999px" }}>
                <label>
                  Sitio web
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>
              <div
                className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-3"
                style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B" }}
              >
                Suscripción
              </div>
              <h3 id="checkout-modal-title" className="text-2xl font-extrabold tracking-[-0.02em] text-white">Confirmar pago</h3>
              <p className="text-sm text-white/55 mt-1.5 mb-6">
                Activamos tu cuenta de inmediato. Cancela cuando quieras.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <Field label="Nombre completo" required value={name} onChange={setName} placeholder="Tu nombre" inputRef={firstFieldRef} autoComplete="name" />
                <Field label="Email" required type="email" value={email} onChange={setEmail} placeholder="tu@email.com" autoComplete="email" />
              </div>
              <Field
                label="Nombre del restaurante"
                value={restaurant}
                onChange={setRestaurant}
                placeholder="Opcional"
                wrapperClassName="mb-4"
              />

              {/* Locales stepper */}
              <div className="mb-5">
                <label className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/45 mb-1.5">
                  Cantidad de locales
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className="inline-flex items-center bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setLocations((n) => Math.max(1, n - 1))}
                      disabled={locations <= 1}
                      aria-label="Quitar local"
                      className="w-10 h-10 flex items-center justify-center text-white/65 hover:text-white hover:bg-white/5 transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      −
                    </button>
                    <div className="w-12 text-center text-sm font-bold text-white tabular-nums">
                      {locations}
                    </div>
                    <button
                      type="button"
                      onClick={() => setLocations((n) => Math.min(10, n + 1))}
                      disabled={locations >= 10}
                      aria-label="Sumar local"
                      className="w-10 h-10 flex items-center justify-center text-white/65 hover:text-white hover:bg-white/5 transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[0.78rem] text-white/45">
                    {locations === 1 ? "1 local" : `${locations} locales`} · {formattedUnit} c/u
                  </span>
                </div>
              </div>

              <div className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-white/40 mb-2 flex items-center gap-2">
                <CreditCard className="w-3 h-3" /> Datos de pago
              </div>

              <div className="mb-3">
                <label className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/45 mb-1.5">
                  Número de tarjeta<span className="text-[#F59E0B] ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    inputMode="numeric"
                    autoComplete="cc-number"
                    required
                    value={card}
                    onChange={(e) => setCard(formatCard(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-[#F59E0B]/60 rounded-xl px-3.5 py-2.5 pr-16 text-sm text-white placeholder:text-white/25 outline-none transition font-mono tracking-wide"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[0.65rem] font-bold uppercase tracking-wider text-white/50">
                    {brand}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <Field
                  label="Vencimiento"
                  required
                  value={expiry}
                  onChange={(v) => setExpiry(formatExpiry(v))}
                  placeholder="MM/AA"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                />
                <Field
                  label="CVC"
                  required
                  value={cvc}
                  onChange={(v) => setCvc(v.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                />
              </div>

              <Field
                label="Titular de la tarjeta"
                required
                value={holder}
                onChange={setHolder}
                placeholder="Como aparece en la tarjeta"
                autoComplete="cc-name"
                wrapperClassName="mb-5"
              />

              {error && (
                <div className="mb-4 px-3.5 py-2.5 rounded-lg text-xs text-red-300 bg-red-500/10 border border-red-500/30">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full font-bold text-[#0F172A] py-3.5 rounded-full text-sm transition hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: "#F59E0B", boxShadow: "0 8px 32px rgba(245,158,11,0.35)" }}
              >
                <Lock className="w-4 h-4" />
                Pagar {formattedAmount} {plan.billing === "yearly" ? "/ año" : "/ mes"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[0.7rem] text-white/40">
                <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
                Pago simulado · Modo demostración
              </div>
            </form>
          )}

          {stage === "processing" && (
            <div className="py-8 sm:py-12">
              <div className="flex items-center justify-center mb-8">
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(245,158,11,0.12)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}
                >
                  <Loader2 className="w-7 h-7 text-[#F59E0B] animate-spin" strokeWidth={2.2} />
                  <div
                    className="absolute inset-[-6px] rounded-full"
                    style={{
                      border: "1px solid rgba(245,158,11,0.18)",
                      animation: "ping 1.6s cubic-bezier(0,0,.2,1) infinite",
                    }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-extrabold tracking-[-0.02em] text-white text-center mb-1">
                Procesando tu pago
              </h3>
              <p className="text-sm text-white/55 text-center mb-7">
                Estamos asegurando la transacción. No cierres esta ventana.
              </p>

              <ul className="flex flex-col gap-2 max-w-[320px] mx-auto">
                {PROCESSING_STEPS.map((s, i) => {
                  const done = i < stepIdx;
                  const active = i === stepIdx;
                  return (
                    <li
                      key={s.label}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition"
                      style={{
                        background: active ? "rgba(245,158,11,0.08)" : "transparent",
                        border: `1px solid ${active ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: done ? "#14B8A6" : active ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)",
                        }}
                      >
                        {done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ) : active ? (
                          <Loader2 className="w-3 h-3 text-[#F59E0B] animate-spin" />
                        ) : null}
                      </div>
                      <span
                        className="text-[0.82rem] font-medium"
                        style={{ color: done ? "rgba(255,255,255,0.85)" : active ? "#fff" : "rgba(255,255,255,0.4)" }}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {stage === "success" && (
            <div className="py-8 text-center relative">
              <Confetti />
              <div
                className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center relative"
                style={{
                  background: "rgba(20,184,166,0.15)",
                  border: "1px solid rgba(20,184,166,0.4)",
                  animation: "pop 480ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <CheckCircle2 className="w-10 h-10 text-[#14B8A6]" strokeWidth={2} />
                <div
                  className="absolute inset-[-10px] rounded-full"
                  style={{
                    border: "1px solid rgba(20,184,166,0.25)",
                    animation: "ping 1.8s cubic-bezier(0,0,.2,1) 1",
                  }}
                />
              </div>
              <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white mb-2">
                ¡Pago confirmado!
              </h3>
              <p className="text-sm text-white/60 leading-[1.7] mb-2">
                Activamos tu plan <strong className="text-white/85">{plan.name}</strong>.
                Te enviamos el recibo a <strong className="text-white/85">{email}</strong>.
              </p>
              {orderId && (
                <div className="text-[0.7rem] text-white/35 font-mono mb-6">Orden {orderId}</div>
              )}

              <a
                href={POST_CHECKOUT_URL}
                className="w-full font-bold text-[#0F172A] py-3.5 rounded-full text-sm transition hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 mb-3"
                style={{ background: "#F59E0B", boxShadow: "0 8px 32px rgba(245,158,11,0.35)" }}
              >
                Acceder a tu cuenta
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full font-semibold text-white/70 hover:text-white py-2.5 text-sm transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}

          {stage === "error" && (
            <div className="py-10 text-center">
              <div
                className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.4)" }}
              >
                <X className="w-8 h-8 text-red-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-extrabold tracking-[-0.02em] text-white mb-2">
                No pudimos procesar el pago
              </h3>
              <p className="text-sm text-white/55 mb-6">{error ?? "Inténtalo nuevamente."}</p>
              <button
                onClick={() => {
                  setStage("form");
                  setError(null);
                }}
                className="font-semibold text-white px-6 py-3 rounded-full text-sm border border-white/20 hover:border-white/50 hover:bg-white/5 transition active:scale-[0.98]"
              >
                Volver e intentar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* RIGHT — Order summary / receipt panel */}
        <aside
          className="hidden md:flex flex-col justify-between p-9 border-l"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "linear-gradient(180deg, rgba(245,158,11,0.05) 0%, rgba(13,148,136,0.04) 100%)",
          }}
        >
          <div>
            <div className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-white/45 mb-3">
              Resumen
            </div>
            <h4 className="text-[1.4rem] font-extrabold tracking-[-0.02em] text-white mb-1.5">
              {plan.name}
            </h4>
            {plan.description && (
              <p className="text-[0.85rem] text-white/55 leading-[1.6] mb-6">{plan.description}</p>
            )}

            <div className="flex items-end gap-1.5 mb-3">
              <span className="text-[0.85rem] font-bold text-white/55 mb-2">{sym}</span>
              <span className="text-[3rem] font-black leading-none text-white tracking-[-0.03em]">
                {plan.amount.toFixed(0)}
              </span>
              <span className="text-[0.85rem] text-white/45 mb-2">{billingLabel}</span>
            </div>
            {locations > 1 && (
              <div className="text-[0.78rem] text-white/55 mb-6">
                × {locations} locales = <strong className="text-white">{formattedAmount}</strong>
              </div>
            )}

            <div className="h-px bg-white/8 my-5" />

            <ul className="flex flex-col gap-2.5 text-[0.82rem] text-white/65">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" /> Activación inmediata
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" /> Sin contrato de permanencia
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" /> Implementación guiada incluida
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" /> Soporte en español
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/8">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-white/55">Total hoy</span>
              <span className="text-white font-extrabold text-base">{formattedAmount}</span>
            </div>
            <div className="text-[0.7rem] text-white/35">
              Renueva automáticamente cada {plan.billing === "yearly" ? "año" : "mes"}.
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes ping { 75%,100% { transform: scale(1.4); opacity: 0; } }
      `}</style>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  inputMode,
  autoComplete,
  wrapperClassName,
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputMode?: "numeric" | "text" | "email" | "tel";
  autoComplete?: string;
  wrapperClassName?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const id = `checkout-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/65 mb-1.5">
        {label}
        {required && (
          <span className="text-[#F59E0B] ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="w-full bg-white/[0.06] border border-white/15 focus:border-[#F59E0B]/70 rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-white/35 outline-none transition"
      />
    </div>
  );
}
