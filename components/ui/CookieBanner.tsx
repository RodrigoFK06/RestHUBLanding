"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "resthub.cookies.accepted.v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) {
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
      className="fixed left-3 right-3 sm:left-6 sm:right-auto sm:max-w-[400px] z-[90]"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
        animation: "cookieIn 380ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="rounded-2xl p-5 relative"
        style={{
          background: "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(11,18,32,0.96) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <button
          onClick={() => accept("essential")}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)" }}
          >
            <Cookie className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.85rem] font-bold text-white mb-1">Usamos cookies</div>
            <p className="text-[0.78rem] text-white/55 leading-snug">
              Solo las necesarias para que el sitio funcione bien. Puedes ajustar tu preferencia.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => accept("essential")}
            className="flex-1 text-[0.78rem] font-semibold text-white/75 hover:text-white border border-white/10 hover:border-white/25 rounded-full py-2.5 transition active:scale-[0.98] cursor-pointer"
          >
            Solo esenciales
          </button>
          <button
            onClick={() => accept("all")}
            className="flex-1 text-[0.78rem] font-bold text-[#0F172A] rounded-full py-2.5 transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ background: "#F59E0B", boxShadow: "0 6px 24px rgba(245,158,11,0.3)" }}
          >
            Aceptar todas
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cookieIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
