"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Mail, Copy, Check, Loader2, ArrowRight } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";
import { useToast } from "@/components/ui/Toast";

const productLinks = [
  { href: "#modulos", label: "Módulos" },
  { href: "#roles", label: "Roles" },
  { href: "#flujo", label: "Flujo operativo" },
  { href: "#vs", label: "Comparativa" },
];

const whyLinks = [
  { href: "#why", label: "Nuestra misión" },
  { href: "#mensajes", label: "Argumentos clave" },
  { href: "#faq", label: "FAQ" },
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";
const CONTACT_EMAIL = "rodrigoan.torresp@gmail.com";

export default function Footer() {
  const { openContact } = useModals();
  const toast = useToast();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola RestHUB, me gustaría más información."
  )}`;

  const [copied, setCopied] = useState<"email" | "wa" | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success">(
    "idle"
  );

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

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
      toast.error(
        "No pudimos suscribirte",
        err instanceof Error ? err.message : "Intenta más tarde."
      );
    }
  };

  return (
    <footer className="bg-black border-t border-white/8 pt-16 pb-10">
      <div className="max-w-[1160px] mx-auto px-8">
        {/* Newsletter band */}
        <div
          className="rounded-3xl p-7 sm:p-8 mb-14 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(20,184,166,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#F59E0B] mb-1.5">
              Recibe novedades
            </div>
            <h3 className="text-[1.4rem] sm:text-[1.6rem] font-extrabold tracking-[-0.02em] text-white leading-tight">
              Una vez al mes. Sin ruido.
            </h3>
            <p className="text-[0.86rem] text-white/55 mt-1.5 max-w-[420px]">
              Te avisamos cuando lanzamos un módulo nuevo o publicamos algo útil.
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 w-full md:max-w-[460px]">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={newsletterStatus !== "idle"}
                className="w-full bg-white/[0.04] border border-white/10 focus:border-[#F59E0B]/60 rounded-full pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={newsletterStatus !== "idle"}
              className="font-bold text-[#0F172A] px-6 py-3 rounded-full text-sm transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shrink-0"
              style={{ background: "#F59E0B", boxShadow: "0 8px 24px rgba(245,158,11,0.3)" }}
            >
              {newsletterStatus === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Suscribiendo…
                </>
              ) : newsletterStatus === "success" ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Listo!
                </>
              ) : (
                <>
                  Suscribirme
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.svg"
              alt="RestHUB"
              width={0}
              height={0}
              sizes="200px"
              className="invert mb-4"
              style={{ height: "1.5rem", width: "auto" }}
            />
            <p className="text-[0.84rem] text-[#64748B] leading-[1.65] max-w-[260px]">
              El hub operativo completo para restaurantes — desde la mesa hasta el balance.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h5 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#64748B] mb-3.5">
              Producto
            </h5>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    className="text-[0.84rem] text-[#64748B] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Por qué */}
          <div>
            <h5 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#64748B] mb-3.5">
              Por qué RestHUB
            </h5>
            <ul className="flex flex-col gap-2.5">
              {whyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    className="text-[0.84rem] text-[#64748B] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h5 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#64748B] mb-3.5">
              Contacto
            </h5>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-1.5">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[0.84rem] text-[#64748B] hover:text-white transition-colors truncate"
                >
                  {CONTACT_EMAIL}
                </a>
                <button
                  onClick={() => copy(CONTACT_EMAIL, "email")}
                  aria-label="Copiar email"
                  className="text-white/30 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  {copied === "email" ? <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.84rem] text-[#64748B] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  +51 961 869 348
                </a>
                <button
                  onClick={() => copy("+51 961 869 348", "wa")}
                  aria-label="Copiar WhatsApp"
                  className="text-white/30 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  {copied === "wa" ? <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openContact({ topic: "Agendar demo" })}
                  className="text-[0.84rem] text-[#64748B] hover:text-white transition-colors cursor-pointer"
                >
                  Solicitar demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="text-[0.75rem] text-[#64748B]">
            © 2026 RestHUB. Todos los derechos reservados.
          </p>
          <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[rgba(148,163,184,0.35)] px-3 py-1 rounded-full bg-white/3 border border-white/5">
            v1.0 · Abril 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
