"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WifiOff, RefreshCw, ArrowRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Offline() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".offline-head", ".offline-body", ".offline-chips"], { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", toggleActions: "play none none none" },
      });
      tl.fromTo(".offline-head", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .fromTo(".offline-body", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.4")
        .fromTo(".offline-chips", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="offline" className="relative bg-black py-28 overflow-hidden">
      {/* Amber tint — the "apagón" moment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(245,158,11,0.09) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-[860px] mx-auto px-8 text-center">
        <h2 className="offline-head text-[clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white mb-6" style={{ opacity: 0 }}>
          Se cayó el internet.{" "}
          <span className="text-[#F59E0B]">Tú sigues vendiendo.</span>
        </h2>

        <p className="offline-body text-[1.05rem] text-[#94A3B8] leading-[1.8] max-w-[560px] mx-auto mb-12" style={{ opacity: 0 }}>
          El POS y la cocina siguen operando en modo local: tomas órdenes y gestionas caja como
          siempre. Cuando vuelve la conexión, todo se sincroniza solo, sin perder una venta
          ni volver a digitar nada.
        </p>

        {/* Two-state visual: offline queue → synced */}
        <div className="offline-chips flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4" style={{ opacity: 0 }}>
          <div
            className="flex items-center gap-2.5 rounded-full px-5 py-3 bg-[#05101e]"
            style={{ border: "1px solid rgba(245,158,11,0.4)" }}
          >
            <WifiOff className="w-4 h-4 shrink-0 text-[#F59E0B]" strokeWidth={2} />
            <span className="text-[0.78rem] font-bold text-white">Sin conexión · modo local</span>
            <span className="text-[0.7rem] text-[#64748B]">3 órdenes en cola</span>
          </div>

          <ArrowRight className="w-4 h-4 text-[#475569] rotate-90 sm:rotate-0" strokeWidth={2} aria-hidden="true" />

          <div
            className="flex items-center gap-2.5 rounded-full px-5 py-3 bg-[#05101e]"
            style={{ border: "1px solid rgba(13,148,136,0.45)" }}
          >
            <RefreshCw className="w-4 h-4 shrink-0 text-[#14B8A6]" strokeWidth={2} />
            <span className="text-[0.78rem] font-bold text-white">Conexión restablecida</span>
            <span className="text-[0.7rem] font-bold text-[#14B8A6]">Todo sincronizado ✓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
