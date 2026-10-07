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
      className="fab-entra fixed right-4 z-[60] flex flex-col items-end gap-2 font-brand sm:right-6"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }}
    >
      {showTooltip && !dismissed && (
        <div
          role="status"
          className="comanda-papel flex max-w-[260px] items-center gap-1 rounded-[4px] bg-papel py-1.5 pl-4 pr-1 text-mostrador shadow-[0_18px_36px_-16px_rgba(0,0,0,0.9)]"
        >
          <span className="text-[15px] font-semibold leading-snug">¿Dudas? Escríbenos por WhatsApp.</span>
          <button
            type="button"
            onClick={() => {
              setShowTooltip(false);
              setDismissed(true);
            }}
            aria-label="Cerrar aviso de WhatsApp"
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-md text-impreso transition-colors hover:text-mostrador"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-[#128C4A] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.9)] transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none"
      >
        <MessageCircle className="size-6 text-white" strokeWidth={2.2} aria-hidden="true" />
      </a>

      <style>{`
        @keyframes fab-entra { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .fab-entra { animation: fab-entra 360ms cubic-bezier(0.23, 1, 0.32, 1) both; }
        @media (prefers-reduced-motion: reduce) { .fab-entra { animation: none; } }
      `}</style>
    </div>
  );
}
