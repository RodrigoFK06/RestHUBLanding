"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration: number;
};

type ToastInput = Omit<ToastItem, "id" | "duration"> & { duration?: number };

type ToastContextValue = {
  toast: (t: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}

let nextId = 1;

const VARIANT_STYLES: Record<
  ToastVariant,
  { icon: React.ReactNode; ring: string; bg: string; titleColor: string }
> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-[#14B8A6]" strokeWidth={2.2} />,
    ring: "rgba(20,184,166,0.4)",
    bg: "rgba(20,184,166,0.06)",
    titleColor: "#14B8A6",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-red-400" strokeWidth={2.2} />,
    ring: "rgba(239,68,68,0.4)",
    bg: "rgba(239,68,68,0.06)",
    titleColor: "#fca5a5",
  },
  info: {
    icon: <Info className="w-5 h-5 text-[#F59E0B]" strokeWidth={2.2} />,
    ring: "rgba(245,158,11,0.4)",
    bg: "rgba(245,158,11,0.06)",
    titleColor: "#F59E0B",
  },
};

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (input: ToastInput) => {
      const id = nextId++;
      const duration = input.duration ?? 4500;
      setItems((prev) => [...prev, { id, variant: input.variant, title: input.title, description: input.description, duration }]);
      window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toast: push,
      success: (title, description) => push({ variant: "success", title, description }),
      error: (title, description) => push({ variant: "error", title, description }),
      info: (title, description) => push({ variant: "info", title, description }),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] flex flex-col gap-2 max-w-[calc(100vw-2rem)] sm:max-w-[380px] pointer-events-none"
        aria-live="polite"
      >
        {items.map((t) => {
          const s = VARIANT_STYLES[t.variant];
          return (
            <div
              key={t.id}
              className="pointer-events-auto rounded-2xl pl-4 pr-3 py-3.5 flex items-start gap-3"
              style={{
                background: `linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(11,18,32,0.95) 100%), ${s.bg}`,
                border: `1px solid ${s.ring}`,
                boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                animation: "toastIn 320ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="shrink-0 mt-0.5">{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.85rem] font-bold leading-snug" style={{ color: s.titleColor }}>
                  {t.title}
                </div>
                {t.description && (
                  <div className="text-[0.78rem] text-white/65 mt-0.5 leading-snug">{t.description}</div>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Cerrar"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toastIn { from { opacity: 0; transform: translateX(20px) scale(0.96); } to { opacity: 1; transform: translateX(0) scale(1); } }
      `}</style>
    </ToastContext.Provider>
  );
}
