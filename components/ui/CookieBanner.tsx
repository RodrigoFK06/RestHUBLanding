"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Aviso de cookies (docs/diseno/decisiones.md · D18): un papelito que flota sobre el
// mostrador, sin vidrio ni degradado. Más angosto para no tapar el talonario del hero.

const STORAGE_KEY = "resthub.cookies.accepted.v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let guardado: string | null = null;
    try {
      guardado = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (!guardado) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (value: "all" | "essential") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="cookie-entra fixed left-3 right-3 z-[90] font-brand sm:left-6 sm:right-auto sm:max-w-[340px]"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }}
    >
      <div className="comanda-papel relative rounded-[4px] bg-papel px-4 pb-4 pt-3.5 text-mostrador shadow-[0_24px_48px_-20px_rgba(0,0,0,0.9)]">
        <button
          type="button"
          onClick={() => accept("essential")}
          aria-label="Cerrar y usar solo las esenciales"
          className="absolute right-1.5 top-1.5 grid size-10 cursor-pointer place-items-center rounded-md text-impreso transition-colors hover:text-mostrador"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
        <p className="display-cond pr-10 text-[26px] uppercase leading-none">Usamos cookies</p>
        <p className="mt-2 pr-4 text-[15px] leading-snug">Solo las necesarias para que el sitio funcione bien. Puedes ajustar tu preferencia.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => accept("essential")}
            className="comanda-plato h-11 cursor-pointer rounded-lg border-[1.5px] border-mostrador text-[15px] font-bold"
          >
            Solo esenciales
          </button>
          <button
            type="button"
            onClick={() => accept("all")}
            className="comanda-mandar h-11 cursor-pointer rounded-lg bg-mostrador text-[15px] font-extrabold text-white"
          >
            Aceptar todas
          </button>
        </div>
      </div>
      <style>{`
        @keyframes cookie-entra { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .cookie-entra { animation: cookie-entra 360ms cubic-bezier(0.23, 1, 0.32, 1) both; }
        @media (prefers-reduced-motion: reduce) { .cookie-entra { animation: none; } }
      `}</style>
    </div>
  );
}
