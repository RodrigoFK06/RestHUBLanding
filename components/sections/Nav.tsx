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
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 border-b ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-white/8"
          : "bg-transparent border-transparent"
      }`}
    >
      <Link href="#hero" onClick={(e) => handleAnchor(e, "#hero")} className="flex items-center">
        <Image src="/logo.svg" alt="RestHUB" width={0} height={0} sizes="200px" loading="eager" className="invert" style={{ height: '1.5rem', width: 'auto' }} />
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={(e) => handleAnchor(e, l.href)}
              className="text-sm font-medium text-white/75 hover:text-white transition-colors"
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
          className="text-white border border-white/20 hover:border-white/50 hover:bg-transparent text-xs cursor-pointer"
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
        className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        <span className={`block w-5 h-0.5 bg-[#94A3B8] rounded transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-[#94A3B8] rounded transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-[#94A3B8] rounded transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-black/97 border-b border-white/7 p-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleAnchor(e, l.href)}
              className="text-sm font-medium text-white/75 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
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
      )}
    </nav>
  );
}
