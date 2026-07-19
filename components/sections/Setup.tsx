"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Monitor, Wrench, Zap, ArrowRight } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/ModalProvider";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    day: "Día 1",
    Icon: Monitor,
    title: "Demo en vivo",
    desc: "Una llamada de 15 minutos. Ves el sistema funcionando en un restaurante real y haces todas las preguntas.",
    items: [
      "Sin presentación ni pitch de ventas",
      "Demostración del flujo completo",
      "Preguntas técnicas respondidas",
      "Evaluación de tu caso específico",
    ],
  },
  {
    num: "02",
    day: "Días 1 – 2",
    Icon: Wrench,
    title: "Setup guiado",
    desc: "Nuestro equipo configura RestHUB con tu menú, tus roles y tu estructura. Tú solo validas.",
    items: [
      "Carga de menú y modificadores",
      "Roles y credenciales por persona",
      "Integración de pagos activa",
      "Configuración de impresoras y KDS",
    ],
  },
  {
    num: "03",
    day: "Día 3",
    Icon: Zap,
    title: "Primer turno operativo",
    desc: "Tu restaurante en producción. Acompañamiento en tiempo real durante el primer servicio.",
    items: [
      "POS y KDS sincronizados en vivo",
      "Primer cierre de turno real",
      "Soporte en línea durante el servicio",
      "Ajustes inmediatos si es necesario",
    ],
  },
];

export default function Setup() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openContact } = useModals();

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".setup-step", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".setup-step",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="setup" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-8">

        {/* Header */}
        <BlurFade>
          <div className="max-w-[600px] mx-auto text-center mb-16">
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-[#0F172A]">
              De cero a operativo<br />en 72 horas.
            </h2>
            <p className="text-[1.05rem] text-[#475569] leading-[1.75]">
              No un tutorial en PDF. Acompañamiento real incluido en todos los planes, sin costo adicional.
            </p>
          </div>
        </BlurFade>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Connector line desktop */}
          <div
            className="absolute hidden md:block top-[2.25rem] left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px pointer-events-none z-0"
            style={{ background: "linear-gradient(to right, #E2E8F0, #F59E0B40, #E2E8F0)" }}
          />

          {steps.map((s, i) => (
            <div
              key={i}
              className="setup-step relative z-10 bg-white rounded-2xl p-7 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition"
            >
              {/* Number badge */}
              <div className="w-[2.6rem] h-[2.6rem] rounded-full bg-[#F59E0B] flex items-center justify-center text-[#0F172A] font-black text-[0.85rem] mb-5 shadow-[0_4px_12px_rgba(245,158,11,0.3)]">
                {s.num}
              </div>

              {/* Day */}
              <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#94A3B8] mb-2">
                {s.day}
              </div>

              {/* Icon + Title row */}
              <div className="flex items-center gap-2.5 mb-3">
                <s.Icon className="w-4.5 h-4.5 text-[#D97706] shrink-0" strokeWidth={1.75} />
                <h3 className="text-[1.05rem] font-bold text-[#0F172A]">{s.title}</h3>
              </div>

              {/* Description */}
              <p className="text-[0.84rem] text-[#475569] leading-[1.65] mb-5">{s.desc}</p>

              {/* Items */}
              <ul className="flex flex-col gap-2.5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[0.79rem] text-[#64748B]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[0.35rem] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social proof note + CTA */}
        <BlurFade delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border border-[#E2E8F0] rounded-2xl px-8 py-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Avatars placeholder */}
              <div className="flex -space-x-2.5 shrink-0">
                {["#0F172A", "#14B8A6", "#F59E0B"].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-[0.65rem] font-bold"
                    style={{ background: c }}
                  >
                    {["JR", "MC", "PS"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[0.9rem] font-semibold text-[#0F172A]">
                  Equipo de implementación dedicado
                </div>
                <div className="text-[0.8rem] text-[#64748B]">
                  Los mismos que configuraron el sistema te acompañan el primer día.
                </div>
              </div>
            </div>

            <Button
              onClick={() => openContact({ topic: "Agendar demo" })}
              className="shrink-0 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold px-6 py-4 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              Solicitar demo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
