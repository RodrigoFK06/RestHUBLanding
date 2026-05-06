"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";
const WA_TEXT = encodeURIComponent("Hola RestHUB, me gustaría más información sobre el producto.");

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setShowTooltip(true), 1400);
    const t2 = setTimeout(() => setShowTooltip(false), 8400);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [visible, dismissed]);

  if (!visible) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;

  return (
    <div
      className="fixed right-4 sm:right-6 z-[60] flex flex-col items-end gap-2"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 90px)",
        animation: "fabIn 380ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {showTooltip && !dismissed && (
        <div
          role="status"
          className="flex items-center gap-2 pl-4 pr-2 py-2.5 rounded-2xl shadow-2xl max-w-[260px]"
          style={{
            background: "rgba(15,23,42,0.96)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            animation: "tooltipIn 320ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="text-[0.78rem] text-white/85 leading-snug">
            ¿Dudas? Escríbenos por WhatsApp.
          </span>
          <button
            onClick={() => {
              setShowTooltip(false);
              setDismissed(true);
            }}
            aria-label="Cerrar"
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/45 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{
          background: "#25D366",
          boxShadow: "0 12px 40px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0.5)",
        }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(37,211,102,0.6)",
            animation: "fabPing 2.4s cubic-bezier(0,0,.2,1) infinite",
          }}
        />
        <MessageCircle className="w-6 h-6 text-white relative z-10" strokeWidth={2.2} />
      </a>

      <style>{`
        @keyframes fabIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tooltipIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fabPing { 0% { transform: scale(1); opacity: 0.7; } 80%,100% { transform: scale(1.6); opacity: 0; } }
      `}</style>
    </div>
  );
}
