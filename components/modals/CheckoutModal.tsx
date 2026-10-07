"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, CreditCard, Loader2, Lock, ShieldCheck, X, ArrowRight, Check } from "lucide-react";
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
  process.env.NEXT_PUBLIC_POST_CHECKOUT_URL ?? "https://rest-hub.vercel.app/";

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
      className="checkout-fondo fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
    >
      <button
        type="button"
        aria-label="Cerrar"
        tabIndex={-1}
        className="absolute inset-0 cursor-default"
        onClick={() => stage !== "processing" && onClose()}
        style={{ background: "rgba(0,0,0,0.72)" }}
      />

      <div
        ref={dialogRef}
        className="checkout-hoja comanda-papel relative mx-auto grid max-h-[92dvh] w-full grid-cols-1 overflow-hidden rounded-t-[8px] bg-papel font-brand text-mostrador shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] sm:max-w-[920px] sm:rounded-[4px] md:grid-cols-[1.1fr_1fr]"
      >
        {stage !== "processing" && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-2 top-2 z-10 grid size-11 cursor-pointer place-items-center rounded-md text-impreso transition-colors hover:text-mostrador"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        )}

        {/* Izquierda: formulario y estados */}
        <div className="overflow-y-auto px-6 pb-7 pt-7 sm:px-9 sm:pt-8">
          {stage === "form" && (
            <form onSubmit={handleSubmit}>
              {/* Honeypot */}
              <div aria-hidden="true" className="pointer-events-none absolute -z-10 opacity-0" style={{ left: "-9999px" }}>
                <label>
                  Sitio web
                  <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
              </div>
              <h3 id="checkout-modal-title" className="display-cond border-b-2 border-mostrador pb-2.5 pr-10 text-[34px] uppercase leading-none">
                Confirmar pago
              </h3>
              <p className="mb-6 mt-3 text-[15px] leading-snug text-impreso">Activamos tu cuenta de inmediato. Cancela cuando quieras.</p>

              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Nombre completo" required value={name} onChange={setName} placeholder="Tu nombre" inputRef={firstFieldRef} autoComplete="name" />
                <Field label="Correo" required type="email" value={email} onChange={setEmail} placeholder="tu@correo.com" autoComplete="email" />
              </div>
              <Field label="Nombre del restaurante" value={restaurant} onChange={setRestaurant} placeholder="Opcional" wrapperClassName="mb-4" />

              {/* Locales */}
              <div className="mb-5">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">Cantidad de locales</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="inline-flex items-center overflow-hidden rounded-md border-[1.5px] border-papel-linea bg-white/60">
                    <button
                      type="button"
                      onClick={() => setLocations((n) => Math.max(1, n - 1))}
                      disabled={locations <= 1}
                      aria-label="Quitar local"
                      className="grid size-11 cursor-pointer place-items-center text-[17px] font-bold transition-colors hover:bg-[#DCEBE6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>
                    <div className="w-12 text-center text-[17px] font-extrabold tabular-nums">{locations}</div>
                    <button
                      type="button"
                      onClick={() => setLocations((n) => Math.min(10, n + 1))}
                      disabled={locations >= 10}
                      aria-label="Sumar local"
                      className="grid size-11 cursor-pointer place-items-center text-[17px] font-bold transition-colors hover:bg-[#DCEBE6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[15px] text-impreso">
                    {locations === 1 ? "1 local" : `${locations} locales`} · {formattedUnit} c/u
                  </span>
                </div>
              </div>

              <p className="mb-2 flex items-center gap-2 border-t border-dashed border-impreso pt-4 text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                <CreditCard className="size-4" aria-hidden="true" /> Datos de pago
              </p>

              <div className="mb-3">
                <label htmlFor="checkout-tarjeta" className="block text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                  Número de tarjeta
                  <span className="ml-0.5 text-numerador" aria-hidden="true">
                    *
                  </span>
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="checkout-tarjeta"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    required
                    value={card}
                    onChange={(e) => setCard(formatCard(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    className="h-12 w-full rounded-md border-[1.5px] border-papel-linea bg-white/60 px-3.5 pr-20 text-[17px] tabular-nums tracking-wide text-mostrador outline-none transition-colors placeholder:text-impreso focus:border-tinta"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">{brand}</span>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-3">
                <Field label="Vencimiento" required value={expiry} onChange={(v) => setExpiry(formatExpiry(v))} placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" />
                <Field label="CVC" required value={cvc} onChange={(v) => setCvc(v.replace(/\D/g, "").slice(0, 4))} placeholder="123" inputMode="numeric" autoComplete="cc-csc" />
              </div>

              <Field label="Titular de la tarjeta" required value={holder} onChange={setHolder} placeholder="Como aparece en la tarjeta" autoComplete="cc-name" wrapperClassName="mb-5" />

              {error && (
                <p role="alert" className="mb-4 rounded-md border-[1.5px] border-[#8A1C12] bg-[#F6C9C2] px-3.5 py-2.5 text-[15px] font-semibold text-[#5E1109]">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-accion flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-[17px] font-extrabold">
                <Lock className="size-4" aria-hidden="true" />
                Pagar {formattedAmount} {plan.billing === "yearly" ? "/ año" : "/ mes"}
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-[15px] text-impreso">
                <ShieldCheck className="size-4 text-menta-oscura" aria-hidden="true" />
                Pago simulado · Modo demostración
              </p>
            </form>
          )}

          {stage === "processing" && (
            <div className="py-8 sm:py-12" aria-live="polite">
              <Loader2 className="mx-auto size-9 animate-spin text-tinta" strokeWidth={2.2} aria-hidden="true" />
              <h3 className="display-cond mt-5 text-center text-[34px] uppercase leading-none">Procesando tu pago</h3>
              <p className="mb-7 mt-3 text-center text-[15px] text-impreso">Estamos asegurando la transacción. No cierres esta ventana.</p>
              <ol className="comanda-renglones mx-auto max-w-[340px]">
                {PROCESSING_STEPS.map((s, i) => {
                  const done = i < stepIdx;
                  const active = i === stepIdx;
                  return (
                    <li key={s.label} className="flex h-8 items-center gap-3 text-[17px] italic text-tinta">
                      {done ? (
                        <CheckCircle2 className="size-4 shrink-0 text-menta-oscura" aria-hidden="true" />
                      ) : active ? (
                        <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
                      ) : (
                        <span className="size-4 shrink-0" aria-hidden="true" />
                      )}
                      <span className={active ? "font-bold" : done ? "font-semibold" : "font-semibold text-impreso"}>{s.label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {stage === "success" && (
            <div className="relative py-8 text-center">
              <Confetti />
              <CheckCircle2 className="mx-auto size-12 text-menta-oscura" strokeWidth={2} aria-hidden="true" />
              <h3 className="display-cond mt-4 text-[34px] uppercase leading-none">¡Pago confirmado!</h3>
              <p className="mt-3 text-[15px] leading-snug">
                Activamos tu plan <strong className="font-extrabold">{plan.name}</strong>. Te enviamos el recibo a{" "}
                <strong className="font-extrabold">{email}</strong>.
              </p>
              {orderId && <p className="display-cond mb-6 mt-3 text-[19px] text-numerador tabular-nums">Orden {orderId}</p>}

              <a href={POST_CHECKOUT_URL} className="btn-accion mb-3 mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-lg text-[17px] font-extrabold">
                Acceder a tu cuenta
                <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
              </a>
              <button type="button" onClick={onClose} className="h-11 w-full cursor-pointer text-[15px] font-bold text-impreso transition-colors hover:text-mostrador">
                Cerrar
              </button>
            </div>
          )}

          {stage === "error" && (
            <div className="py-10 text-center">
              <X className="mx-auto size-12 text-[#8A1C12]" strokeWidth={2} aria-hidden="true" />
              <h3 className="display-cond mt-4 text-[34px] uppercase leading-none">No pudimos procesar el pago</h3>
              <p className="mb-6 mt-3 text-[15px]">{error ?? "Inténtalo nuevamente."}</p>
              <button
                type="button"
                onClick={() => {
                  setStage("form");
                  setError(null);
                }}
                className="comanda-plato h-12 cursor-pointer rounded-lg border-[1.5px] border-mostrador px-6 text-[17px] font-extrabold"
              >
                Volver e intentar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* Derecha: la copia de caja con lo que se cobra hoy */}
        <aside className="hidden flex-col justify-between bg-copia-caja px-9 pb-9 pt-12 md:flex" aria-label="Lo que pagas hoy">
          <div>
            <h4 className="display-cond text-[34px] uppercase leading-none">{plan.name}</h4>
            {plan.description && <p className="mt-2 text-[15px] font-bold leading-snug text-ambar-oscuro">{plan.description}</p>}

            <p className="mt-6 flex items-end gap-1.5">
              <span className="pb-1.5 text-[17px] font-black">{sym}</span>
              <span className="display-cond text-[4.25rem] leading-[0.8] tabular-nums">{plan.amount.toFixed(0)}</span>
              <span className="pb-1.5 text-[15px] font-semibold">{billingLabel}</span>
            </p>
            {locations > 1 && (
              <p className="mt-2 text-[15px] font-semibold italic text-tinta">
                × {locations} locales = <strong className="font-extrabold">{formattedAmount}</strong>
              </p>
            )}

            <ul className="mt-6 space-y-2.5 border-t border-dashed border-ambar-oscuro pt-5 text-[17px] leading-snug">
              {["Activación inmediata", "Sin contrato de permanencia", "Implementación guiada incluida", "Soporte en español"].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check className="mt-1 size-4 shrink-0 text-tinta" strokeWidth={3} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t-2 border-mostrador pt-3">
            <p className="flex items-baseline justify-between">
              <span className="text-[12px] font-black uppercase tracking-[0.04em]">Total hoy</span>
              <span className="display-cond text-[34px] leading-none tabular-nums">{formattedAmount}</span>
            </p>
            <p className="mt-1 text-[15px] text-ambar-oscuro">Renueva automáticamente cada {plan.billing === "yearly" ? "año" : "mes"}.</p>
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes checkout-fondo { from { opacity: 0; } to { opacity: 1; } }
        @keyframes checkout-hoja { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .checkout-fondo { animation: checkout-fondo 200ms ease-out both; }
        .checkout-hoja { animation: checkout-hoja 300ms cubic-bezier(0.23, 1, 0.32, 1) both; }
        @media (prefers-reduced-motion: reduce) { .checkout-fondo, .checkout-hoja { animation: none; } }
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
      <label htmlFor={id} className="block text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
        {label}
        {required && (
          <span className="ml-0.5 text-numerador" aria-hidden="true">
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
        className="mt-1.5 h-12 w-full rounded-md border-[1.5px] border-papel-linea bg-white/60 px-3.5 text-[17px] text-mostrador outline-none transition-colors placeholder:text-impreso focus:border-tinta"
      />
    </div>
  );
}
