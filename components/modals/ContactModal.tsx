"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, X, MessageCircle, Mail } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export type ContactTopic =
  | "Solicitar acceso"
  | "Agendar demo"
  | "Contactar ventas"
  | "Contacto general";

type Props = {
  open: boolean;
  onClose: () => void;
  topic?: ContactTopic;
  prefillMessage?: string;
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

export default function ContactModal({ open, onClose, topic, prefillMessage }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const toast = useToast();

  const errors = {
    name: !name.trim() ? "Tu nombre es obligatorio." : null,
    email: !email.trim()
      ? "Tu email es obligatorio."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? "Email inválido."
      : null,
    message: !message.trim()
      ? "Cuéntanos qué necesitas."
      : message.trim().length < 10
      ? "Cuéntanos un poco más (mín. 10 caracteres)."
      : null,
  } as const;

  const isValid = !errors.name && !errors.email && !errors.message;

  useEffect(() => {
    if (!open) return;
    if (prefillMessage !== undefined) setMessage(prefillMessage);
    setStatus("idle");
    setError(null);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, prefillMessage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          restaurant,
          message,
          website, // honeypot
          topic: topic ?? "Contacto general",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Error desconocido.");
      setStatus("success");
      toast.success("Mensaje enviado", "Te respondemos en menos de 24 h hábiles.");
    } catch (err) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "No pudimos enviar tu mensaje.";
      setError(msg);
      toast.error("No pudimos enviar tu mensaje", msg);
    }
  };

  const waMessage = encodeURIComponent(
    `Hola RestHUB, ${topic ? `me interesa ${topic.toLowerCase()}` : "quiero más información"}.${
      message ? `\n\n${message}` : ""
    }`
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      style={{ animation: "fadeIn 200ms ease-out" }}
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      />

      <div
        className="relative w-full sm:max-w-[460px] mx-auto sm:rounded-3xl rounded-t-3xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0F172A 0%, #0B1220 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          animation: "modalIn 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {status === "success" ? (
          <div className="px-8 pt-12 pb-10 text-center">
            <div
              className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(20,184,166,0.15)",
                border: "1px solid rgba(20,184,166,0.4)",
                animation: "pop 420ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <CheckCircle2 className="w-8 h-8 text-[#14B8A6]" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white mb-3">
              Mensaje enviado.
            </h3>
            <p className="text-sm text-white/60 leading-[1.7] mb-7">
              Te enviamos una copia a <strong className="text-white/85">{email}</strong>.
              <br />Respondemos en menos de 24 horas hábiles.
            </p>
            <button
              onClick={onClose}
              className="w-full font-bold text-[#0F172A] py-3.5 rounded-full text-sm transition-all hover:scale-[1.02]"
              style={{ background: "#F59E0B", boxShadow: "0 8px 32px rgba(245,158,11,0.35)" }}
            >
              Listo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 pt-9 pb-7">
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-3"
                style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B" }}
              >
                {topic ?? "Contacto"}
              </div>
              <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white">
                Hablemos.
              </h3>
              <p className="text-sm text-white/55 mt-1.5">
                Cuéntanos sobre tu restaurante. Respondemos en menos de 24 h.
              </p>
            </div>

            {/* Honeypot — oculto para humanos, los bots lo rellenan */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Field
                label="Nombre"
                required
                value={name}
                onChange={setName}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Tu nombre"
                error={touched.name ? errors.name : null}
              />
              <Field
                label="Email"
                required
                type="email"
                value={email}
                onChange={setEmail}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="tu@email.com"
                error={touched.email ? errors.email : null}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Field label="Teléfono" type="tel" value={phone} onChange={setPhone} placeholder="+51 9XX XXX XXX" />
              <Field label="Restaurante" value={restaurant} onChange={setRestaurant} placeholder="Nombre del local" />
            </div>

            <div className="mb-5">
              <label className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/45 mb-1.5">
                Mensaje<span className="text-[#F59E0B] ml-0.5">*</span>
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                rows={3}
                placeholder="Cuéntanos qué necesitas resolver…"
                className={`w-full bg-white/[0.04] border ${
                  touched.message && errors.message
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-[#F59E0B]/60"
                } rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-all resize-none`}
              />
              {touched.message && errors.message && (
                <p className="mt-1.5 text-[0.72rem] text-red-300/90">{errors.message}</p>
              )}
            </div>

            {error && (
              <div className="mb-4 px-3.5 py-2.5 rounded-lg text-xs text-red-300 bg-red-500/10 border border-red-500/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full font-bold text-[#0F172A] py-3.5 rounded-full text-sm transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "#F59E0B", boxShadow: "0 8px 32px rgba(245,158,11,0.35)" }}
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Enviar mensaje
                </>
              )}
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-white/8" />
              <span className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-white/30">
                o más rápido
              </span>
              <div className="h-px flex-1 bg-white/8" />
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 font-semibold text-white py-3.5 rounded-full text-sm border border-white/15 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Escribir por WhatsApp
            </a>
          </form>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string | null;
}) {
  const hasError = Boolean(error);
  return (
    <div>
      <label className="block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/45 mb-1.5">
        {label}
        {required && <span className="text-[#F59E0B] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full bg-white/[0.04] border ${
          hasError ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-[#F59E0B]/60"
        } rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-all`}
      />
      {hasError && <p className="mt-1.5 text-[0.72rem] text-red-300/90">{error}</p>}
    </div>
  );
}
