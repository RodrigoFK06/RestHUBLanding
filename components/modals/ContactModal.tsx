"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, X, MessageCircle, Mail } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export type ContactTopic =
  | "Solicitar acceso"
  | "Agendar demo"
  | "Contactar ventas"
  | "Contacto general"
  | "Programa Socios Fundadores";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

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
    openerRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog after mount.
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      openerRef.current?.focus?.();
    };
  }, [open, prefillMessage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Simple focus trap: keep Tab cycling within the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusable).filter((el) => el.offsetParent !== null);
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
      aria-labelledby="contact-modal-title"
      className="modal-fondo fixed inset-0 z-[100] flex items-end justify-center font-brand sm:items-center"
    >
      <button type="button" aria-label="Cerrar" tabIndex={-1} className="absolute inset-0 cursor-default bg-black/75" onClick={onClose} />

      <div
        ref={dialogRef}
        className="modal-hoja comanda-papel relative mx-auto max-h-[92dvh] w-full overflow-y-auto rounded-t-[8px] bg-papel text-mostrador shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] sm:max-w-[480px] sm:rounded-[4px]"
      >
        <div aria-hidden="true" className="comanda-troquel hidden h-3 sm:block" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-2 top-2 z-10 grid size-11 cursor-pointer place-items-center rounded-md text-impreso transition-colors hover:text-mostrador sm:top-4"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className="px-6 pb-8 pt-10 text-center sm:px-8">
            <CheckCircle2 className="mx-auto size-12 text-menta-oscura" strokeWidth={2} aria-hidden="true" />
            <h3 className="display-cond mt-4 text-[34px] uppercase leading-none">Mensaje enviado.</h3>
            <p className="mt-3 text-[15px] leading-snug">
              Te enviamos una copia a <strong className="font-extrabold">{email}</strong>.
              <br />
              Respondemos en menos de 24 horas hábiles.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="comanda-mandar mt-7 h-13 w-full cursor-pointer rounded-lg bg-mostrador text-[17px] font-extrabold text-white"
            >
              Listo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-6 sm:px-8 sm:pt-4">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-2 border-mostrador pb-2.5 pr-10">
              <h3 id="contact-modal-title" className="display-cond text-[34px] uppercase leading-none">
                Hablemos.
              </h3>
              <span className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-numerador">{topic ?? "Contacto"}</span>
            </div>
            <p className="mt-3 text-[15px] leading-snug text-impreso">Cuéntanos sobre tu restaurante. Respondemos en menos de 24 h.</p>

            {/* Honeypot: oculto para humanos, los bots lo rellenan */}
            <div aria-hidden="true" className="pointer-events-none absolute -z-10 opacity-0" style={{ left: "-9999px" }}>
              <label>
                Sitio web
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
              <Field
                label="Nombre"
                required
                value={name}
                onChange={setName}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Tu nombre"
                error={touched.name ? errors.name : null}
                inputRef={firstFieldRef}
                autoComplete="name"
              />
              <Field
                label="Correo"
                required
                type="email"
                value={email}
                onChange={setEmail}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="tu@correo.com"
                error={touched.email ? errors.email : null}
                autoComplete="email"
              />
              <Field label="Teléfono" type="tel" value={phone} onChange={setPhone} placeholder="+51 9XX XXX XXX" autoComplete="tel" />
              <Field label="Restaurante" value={restaurant} onChange={setRestaurant} placeholder="Nombre del local" autoComplete="organization" />
            </div>

            <div className="mt-3">
              <label htmlFor="field-mensaje" className="block text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                Mensaje
                <span className="ml-0.5 text-numerador" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="field-mensaje"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                rows={3}
                placeholder="Cuéntanos qué necesitas resolver…"
                aria-invalid={Boolean(touched.message && errors.message) || undefined}
                aria-describedby={touched.message && errors.message ? "field-mensaje-error" : undefined}
                className={`mt-1.5 w-full resize-none rounded-md border-[1.5px] bg-white/60 px-3.5 py-2.5 text-[17px] text-mostrador outline-none transition-colors placeholder:text-impreso ${
                  touched.message && errors.message ? "border-[#8A1C12]" : "border-papel-linea focus:border-tinta"
                }`}
              />
              {touched.message && errors.message && (
                <p id="field-mensaje-error" className="mt-1.5 text-[15px] font-semibold text-[#8A1C12]">
                  {errors.message}
                </p>
              )}
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-md border-[1.5px] border-[#8A1C12] bg-[#F6C9C2] px-3.5 py-2.5 text-[15px] font-semibold text-[#5E1109]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="comanda-mandar mt-5 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-mostrador text-[17px] font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Enviando…
                </>
              ) : (
                <>
                  <Mail className="size-4" aria-hidden="true" />
                  Enviar mensaje
                </>
              )}
            </button>

            <p className="my-3 text-center text-[15px] text-impreso">o más rápido</p>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="comanda-plato flex h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-mostrador text-[17px] font-extrabold"
            >
              <MessageCircle className="size-[18px] text-[#128C4A]" strokeWidth={2.4} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </form>
        )}
      </div>

      <style>{`
        @keyframes modal-fondo { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-hoja { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .modal-fondo { animation: modal-fondo 200ms ease-out both; }
        .modal-hoja { animation: modal-hoja 300ms cubic-bezier(0.23, 1, 0.32, 1) both; }
        @media (prefers-reduced-motion: reduce) { .modal-fondo, .modal-hoja { animation: none; } }
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
  inputRef,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string | null;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  autoComplete?: string;
}) {
  const hasError = Boolean(error);
  const id = `field-${label.toLowerCase()}`;
  return (
    <div>
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
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`mt-1.5 h-12 w-full rounded-md border-[1.5px] bg-white/60 px-3.5 text-[17px] text-mostrador outline-none transition-colors placeholder:text-impreso ${
          hasError ? "border-[#8A1C12]" : "border-papel-linea focus:border-tinta"
        }`}
      />
      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-[15px] font-semibold text-[#8A1C12]">
          {error}
        </p>
      )}
    </div>
  );
}
