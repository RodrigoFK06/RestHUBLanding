"use client";

import { useEffect, useState } from "react";
import { useModals } from "@/components/modals/ModalProvider";

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
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPast && !footerVisible;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ transform: visible ? "translateY(0)" : "translateY(110%)" }}
    >
      <div
        className="border-t flex items-center gap-0 sm:gap-3 px-4 py-3 sm:px-5"
        style={{
          background: "rgba(5,5,5,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <p className="hidden md:block flex-1 text-[0.78rem] text-white/65 truncate mr-4">
          Tu restaurante, bajo control.{" "}
          <strong className="text-white font-semibold">RestHUB.</strong>
        </p>

        <div className="flex items-center gap-2 ml-auto sm:ml-0 w-full sm:w-auto">
          <a
            href="https://rest-hub.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none text-center text-[0.76rem] font-semibold text-white border rounded-full px-5 py-2.5 transition hover:bg-white/5 active:scale-[0.97] cursor-pointer"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            Probar la demo
          </a>
          <button
            onClick={() => openContact({ topic: "Solicitar acceso" })}
            className="flex-1 sm:flex-none text-[0.76rem] font-bold text-black rounded-full px-5 py-2.5 transition hover:opacity-90 active:scale-[0.97] cursor-pointer"
            style={{
              background: "#F59E0B",
              boxShadow: "0 4px 24px rgba(245,158,11,0.35)",
            }}
          >
            Solicitar acceso →
          </button>
        </div>
      </div>
    </div>
  );
}
