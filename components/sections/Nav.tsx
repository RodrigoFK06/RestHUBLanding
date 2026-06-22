"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-colors duration-300 border-b ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <Link href="#hero" className="flex items-center" aria-label="RestHUB — ir al inicio">
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
      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTAs */}
      <div className="hidden md:flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openContact({ topic: "Agendar demo" })}
          className="text-white border border-white/25 hover:border-white/55 hover:bg-white/5 text-xs cursor-pointer"
        >
          Agendar demo
        </Button>
        <Button
          size="sm"
          onClick={() => openContact({ topic: "Solicitar acceso" })}
          className="bg-[#F59E0B] hover:bg-[#FCD34D] text-[#0F172A] font-bold text-xs cursor-pointer"
        >
          Solicitar acceso
        </Button>
      </div>

      {/* Mobile burger */}
      <button
        type="button"
        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer -mr-2"
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
          className="nav-mobile-menu md:hidden fixed top-[64px] left-0 right-0 z-40 bg-black/97 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-5"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-white/85 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                openContact({ topic: "Agendar demo" });
              }}
              className="w-full text-white border border-white/25 hover:bg-white/5 cursor-pointer"
            >
              Agendar demo
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                openContact({ topic: "Solicitar acceso" });
              }}
              className="w-full bg-[#F59E0B] hover:bg-[#FCD34D] text-[#0F172A] font-bold cursor-pointer"
            >
              Solicitar acceso →
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
