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

// Avisos como papelitos del color de su significado (docs/diseno/decisiones.md · D18).
const VARIANT_STYLES: Record<ToastVariant, { icon: React.ReactNode; papel: string }> = {
  success: { icon: <CheckCircle2 className="size-5 text-menta-oscura" strokeWidth={2.4} aria-hidden="true" />, papel: "bg-copia-cocina" },
  error: { icon: <AlertCircle className="size-5 text-[#8A1C12]" strokeWidth={2.4} aria-hidden="true" />, papel: "bg-[#F6C9C2]" },
  info: { icon: <Info className="size-5 text-ambar-oscuro" strokeWidth={2.4} aria-hidden="true" />, papel: "bg-copia-caja" },
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
              className={`toast-entra comanda-papel pointer-events-auto flex items-start gap-3 rounded-[4px] py-3 pl-4 pr-1 font-brand text-mostrador shadow-[0_18px_36px_-16px_rgba(0,0,0,0.9)] ${s.papel}`}
            >
              <div className="mt-0.5 shrink-0">{s.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold leading-snug">{t.title}</div>
                {t.description && <div className="mt-0.5 text-[15px] leading-snug">{t.description}</div>}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Cerrar aviso"
                className="-mt-1.5 grid size-10 shrink-0 cursor-pointer place-items-center rounded-md transition-opacity hover:opacity-70"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toast-entra { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
        .toast-entra { animation: toast-entra 300ms cubic-bezier(0.23, 1, 0.32, 1) both; }
        @media (prefers-reduced-motion: reduce) { .toast-entra { animation: none; } }
      `}</style>
    </ToastContext.Provider>
  );
}
