"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArkosLogo } from "./ArkosLogo";
import { MessageCircle, Copy, Check } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";
import { useToast } from "@/components/ui/Toast";

const productLinks = [
  { href: "#modulos", label: "Módulos" },
  { href: "#roles", label: "Roles" },
  { href: "#flujo", label: "Cómo funciona" },
  { href: "#vs", label: "Comparativa" },
];

const whyLinks = [
  { href: "#precios", label: "Precios" },
  { href: "#fundador", label: "Quiénes somos" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";
const CONTACT_EMAIL = "gerencia@árkos.com";

export default function Footer() {
  const { openContact } = useModals();
  const toast = useToast();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola RestHUB, me gustaría más información."
  )}`;

  const [copied, setCopied] = useState<"email" | "wa" | null>(null);

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

  return (
    <footer className="bg-black border-t border-white/8 pt-16 pb-10">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.svg"
              alt="RestHUB"
              width={120}
              height={24}
              className="invert mb-4 h-6 w-auto"
            />
            <p className="text-[0.84rem] text-[#94A3B8] leading-[1.65] max-w-[260px]">
              Sistema para restaurantes: pedidos, cocina, caja y contabilidad. Hecho en Perú.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h5 className="text-[0.9rem] font-semibold text-white mb-3.5">
              Producto
            </h5>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.84rem] text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Por qué */}
          <div>
            <h5 className="text-[0.9rem] font-semibold text-white mb-3.5">
              RestHUB
            </h5>
            <ul className="flex flex-col gap-2.5">
              {whyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.84rem] text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h5 className="text-[0.9rem] font-semibold text-white mb-3.5">
              Contacto
            </h5>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-1.5">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[0.84rem] text-[#94A3B8] hover:text-white transition-colors truncate"
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
                  className="inline-flex items-center gap-1.5 text-[0.84rem] text-[#94A3B8] hover:text-white transition-colors"
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
                  className="text-[0.84rem] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                >
                  Solicitar demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="text-[0.75rem] text-[#94A3B8]">
            © 2026 RestHUB.{" "}
            <a
              href="https://xn--rkos-4na.com"
              target="_blank"
              rel="noopener"
              className="text-[#94A3B8] hover:text-white transition-colors"
            >
              Desarrollado por{" "}
              <ArkosLogo className="inline-block h-[1.05em] w-auto align-[-0.15em]" />{" "}
              Árkos
            </a>
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/legal/privacidad"
              className="text-[0.75rem] text-[#94A3B8] hover:text-white transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/legal/terminos"
              className="text-[0.75rem] text-[#94A3B8] hover:text-white transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
