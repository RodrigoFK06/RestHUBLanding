"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/ModalProvider";

const links = [
  { href: "#modulos", label: "Módulos" },
  { href: "#roles", label: "Roles" },
  { href: "#vs", label: "Comparativa" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { openContact } = useModals();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      ref={navRef}
      aria-label="Principal"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 font-brand transition-colors duration-300 border-b ${
        scrolled || open
          ? "bg-mostrador border-linea"
          : "bg-transparent border-transparent"
      }`}
    >
      <Link href="#hero" className="flex items-center" aria-label="RestHUB, ir al inicio">
        <Image
          src="/logo.svg"
          alt="RestHUB"
          width={120}
          height={24}
          priority
          className="invert h-6 w-auto"
        />
      </Link>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[0.9375rem] font-medium text-texto-2 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTAs */}
      <div className="hidden lg:flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open("https://rest-hub.vercel.app", "_blank", "noopener")}
          className="h-10 rounded-lg px-4 text-sm font-bold text-white border border-[#4A4A4A] hover:border-[#7A7A7A] hover:bg-white/5 cursor-pointer"
        >
          Probar la demo
        </Button>
        <Button
          size="sm"
          onClick={() => openContact({ topic: "Solicitar acceso" })}
          className="btn-accion h-10 rounded-lg px-4 text-sm font-extrabold cursor-pointer"
        >
          Solicitar acceso
        </Button>
      </div>

      {/* Mobile burger */}
      <button
        type="button"
        className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer -mr-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        <span className={`block w-5 h-0.5 bg-white rounded transition-[transform,opacity] duration-300 ease-snappy ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white rounded transition-[transform,opacity] duration-300 ease-snappy ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white rounded transition-[transform,opacity] duration-300 ease-snappy ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="nav-mobile-menu lg:hidden fixed top-[64px] left-0 right-0 z-40 bg-mostrador border-b border-linea p-6 flex flex-col gap-5"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-texto-2 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                window.open("https://rest-hub.vercel.app", "_blank", "noopener");
              }}
              className="h-12 w-full rounded-lg font-bold text-white border border-[#4A4A4A] hover:bg-white/5 cursor-pointer"
            >
              Probar la demo
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                openContact({ topic: "Solicitar acceso" });
              }}
              className="btn-accion h-12 w-full rounded-lg font-extrabold cursor-pointer"
            >
              Solicitar acceso
              <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
