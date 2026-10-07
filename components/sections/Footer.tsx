"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArkosLogo } from "./ArkosLogo";
import { MessageCircle, Mail, Copy, Check, Loader2, ArrowRight } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";
import { useToast } from "@/components/ui/Toast";

// Pie de página (docs/diseno/decisiones.md · D18): misma lógica de novedades y contacto, en el
// mundo de la comanda (franja plana, sin degradado ni vidrio) y con enlaces a las secciones nuevas.

const productLinks = [
  { href: "#modulos", label: "Módulos" },
  { href: "#roles", label: "Roles" },
  { href: "#vs", label: "Comparativa" },
  { href: "#precios", label: "Precios" },
];

const ayudaLinks = [
  { href: "#fundadores", label: "Quiénes somos" },
  { href: "#setup", label: "Implementación en 72 horas" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";
const CONTACT_EMAIL = "gerencia@árkos.com";

export default function Footer() {
  const { openContact } = useModals();
  const toast = useToast();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola RestHUB, me gustaría más información.")}`;

  const [copied, setCopied] = useState<"email" | "wa" | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success">("idle");

  const copy = async (text: string, kind: "email" | "wa") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      toast.success("Copiado al portapapeles");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("No pudimos copiar");
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      toast.error("Email inválido");
      return;
    }
    setNewsletterStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter",
          email: newsletterEmail,
          message: "Suscripción a newsletter desde el footer.",
          topic: "Newsletter",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "");
      setNewsletterStatus("success");
      toast.success("¡Listo!", "Te enviamos confirmación a tu correo.");
      setTimeout(() => {
        setNewsletterStatus("idle");
        setNewsletterEmail("");
      }, 3000);
    } catch (err) {
      setNewsletterStatus("idle");
      toast.error("No pudimos suscribirte", err instanceof Error ? err.message : "Intenta más tarde.");
    }
  };

  return (
    <footer className="border-t border-linea bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 pb-10 pt-16 sm:px-8 lg:px-10">
        {/* Novedades: una franja plana */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 border-b border-linea pb-12 md:grid-cols-[minmax(0,1fr)_minmax(0,460px)] md:items-end md:gap-10">
          <div>
            <h2 className="display-cond text-[34px] leading-none">
              Novedades una vez al mes. Sin ruido.
            </h2>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-snug text-texto-2">
              Te avisamos cuando lanzamos un módulo nuevo o publicamos algo útil.
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="footer-email" className="sr-only">
              Tu correo
            </label>
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-texto-3" aria-hidden="true" />
              <input
                id="footer-email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={newsletterStatus !== "idle"}
                className="h-12 w-full rounded-lg border-[1.5px] border-linea bg-mostrador-2 pl-10 pr-4 text-[15px] text-white outline-none transition-colors placeholder:text-texto-3 focus:border-menta disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={newsletterStatus !== "idle"}
              className="btn-accion inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-extrabold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {newsletterStatus === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Suscribiendo…
                </>
              ) : newsletterStatus === "success" ? (
                <>
                  <Check className="size-4" aria-hidden="true" />
                  ¡Listo!
                </>
              ) : (
                <>
                  Suscribirme
                  <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Image src="/logo.svg" alt="RestHUB" width={120} height={24} className="h-6 w-auto invert" />
            <p className="mt-4 max-w-[30ch] text-[15px] leading-snug text-texto-2">
              El sistema completo para restaurantes, desde la mesa hasta el balance. Hecho en Perú.
            </p>
          </div>

          <nav aria-label="Producto">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-texto-3">Producto</p>
            <ul className="mt-3 space-y-1">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center text-[15px] text-texto-2 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Te acompañamos">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-texto-3">Te acompañamos</p>
            <ul className="mt-3 space-y-1">
              {ayudaLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center text-[15px] text-texto-2 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-texto-3">Contacto</p>
            <ul className="mt-3 space-y-1">
              <li className="flex items-center gap-1">
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-10 items-center truncate text-[15px] text-texto-2 transition-colors hover:text-white">
                  {CONTACT_EMAIL}
                </a>
                <button
                  type="button"
                  onClick={() => copy(CONTACT_EMAIL, "email")}
                  aria-label="Copiar correo"
                  className="grid size-10 cursor-pointer place-items-center rounded-md text-texto-3 transition-colors hover:text-white"
                >
                  {copied === "email" ? <Check className="size-4 text-menta" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                </button>
              </li>
              <li className="flex items-center gap-1">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 text-[15px] text-texto-2 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 text-menta" aria-hidden="true" />
                  +51 961 869 348
                </a>
                <button
                  type="button"
                  onClick={() => copy("+51 961 869 348", "wa")}
                  aria-label="Copiar WhatsApp"
                  className="grid size-10 cursor-pointer place-items-center rounded-md text-texto-3 transition-colors hover:text-white"
                >
                  {copied === "wa" ? <Check className="size-4 text-menta" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openContact({ topic: "Agendar demo" })}
                  className="link-menta inline-flex min-h-10 cursor-pointer items-center text-[15px] font-semibold"
                >
                  Solicitar demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-linea pt-8 text-[15px] text-texto-3">
          <p>
            © 2026 RestHUB · v1.0 ·{" "}
            <a href="https://xn--rkos-4na.com" target="_blank" rel="noopener" className="transition-colors hover:text-white">
              Desarrollado por <ArkosLogo className="inline-block h-[1.05em] w-auto align-[-0.15em]" /> Árkos
            </a>
          </p>
          <div className="flex items-center gap-5">
            <Link href="/legal/privacidad" className="inline-flex min-h-10 items-center transition-colors hover:text-white">
              Privacidad
            </Link>
            <Link href="/legal/terminos" className="inline-flex min-h-10 items-center transition-colors hover:text-white">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
