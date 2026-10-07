"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";

// Barra fija de acción (docs/diseno/decisiones.md · D18): mostrador sólido, sin desenfoque.
export default function StickyCtaBar() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const { openContact } = useModals();

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0,
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPast && !footerVisible;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 font-brand transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
      style={{ transform: visible ? "translateY(0)" : "translateY(110%)" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3 border-t border-linea bg-mostrador px-4 py-3 sm:px-6">
        <p className="mr-4 hidden flex-1 truncate text-[15px] text-texto-2 md:block">
          Tu restaurante, bajo control. <strong className="font-semibold text-white">RestHUB.</strong>
        </p>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <a
            href="https://rest-hub.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border-[1.5px] border-[#4A4A4A] px-4 text-[15px] font-bold text-white transition-colors hover:border-[#7A7A7A] sm:flex-none"
          >
            Probar la demo
          </a>
          <button
            type="button"
            tabIndex={visible ? 0 : -1}
            onClick={() => openContact({ topic: "Solicitar acceso" })}
            className="btn-accion inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-[15px] font-extrabold sm:flex-none"
          >
            Solicitar acceso
            <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
