"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useModals } from "@/components/modals/ModalProvider";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FOUNDING_PERKS = [
  {
    title: "Onboarding 1-a-1 con el equipo fundador",
    body: "Te acompañamos en la configuración inicial: carta, estaciones de cocina, roles, impresoras y reportes.",
    accent: "#14B8A6",
  },
  {
    title: "Precio fundador por 12 meses",
    body: "S/ 100 al mes en cualquier plan durante 12 meses, aunque suba el precio público.",
    accent: "#F59E0B",
  },
  {
    title: "Voz directa en el roadmap",
    body: "Tus tickets entran a una cola priorizada. Lo que te falta para tu operación lo construimos primero.",
    accent: "#14B8A6",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openContact } = useModals();

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".founder-card", ".testi-headline"], { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".founder-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".testi-headline",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="fundadores" className="bg-black py-28 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-8">

        {/* ── Founding partners headline ── */}
        <div className="testi-headline text-center mb-20">
          <div className="flex items-end justify-center gap-5 mb-6">
            <div className="text-[clamp(5rem,12vw,9rem)] font-black leading-none text-white">
              7
            </div>
            <div className="pb-4 text-left">
              <p className="text-[clamp(1.1rem,2vw,1.5rem)] font-bold text-white/80 leading-tight">
                cupos restantes<br />en Latinoamérica
              </p>
            </div>
          </div>

          <p className="text-base text-white/55 max-w-[560px] mx-auto leading-relaxed">
            Estamos cerrando el primer grupo de restaurantes que adoptan RestHUB con acompañamiento directo. Cuando se asignen los 7 cupos, el programa se cierra.
          </p>
        </div>

        {/* ── Founder perks ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {FOUNDING_PERKS.map((p, i) => (
            <div
              key={i}
              className="founder-card relative flex flex-col rounded-2xl p-7"
              style={{
                background: "rgba(15,23,42,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                opacity: 0,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-5 text-sm font-bold"
                style={{ background: `${p.accent}20`, border: `1px solid ${p.accent}50`, color: p.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-bold text-white leading-snug mb-3">{p.title}</h3>
              <p className="text-[0.85rem] text-white/55 leading-[1.7]">{p.body}</p>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${p.accent}55, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <button
            onClick={() => openContact({ topic: "Programa Socios Fundadores" })}
            className="font-bold text-[#0F172A] px-8 py-3.5 rounded-full text-sm transition hover:scale-105 active:scale-[0.98] cursor-pointer"
            style={{ background: "#F59E0B", boxShadow: "0 12px 40px rgba(245,158,11,0.35)" }}
          >
            Postular a un cupo →
          </button>
          <p className="text-[0.72rem] text-white/40">
            Revisamos cada postulación. Te respondemos en menos de 48 h.
          </p>
        </div>

        {/* ── Trust strip — promesas verificables ── */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            { val: "< 1 sem", label: "Implementación inicial" },
            { val: "S/ 100", label: "Al mes, precio fundador" },
            { val: "0", label: "Contratos de permanencia" },
            { val: "1-a-1", label: "Soporte con el equipo fundador" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-extrabold text-white">{s.val}</div>
              <div className="text-[0.62rem] text-white/35 uppercase tracking-[0.12em]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
