"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TrendingUp, Users, Clock } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    Icon: TrendingUp,
    value: "S/ 180K",
    label: "en ventas mensuales",
    sub: "consolidado 3 locales",
  },
  {
    Icon: Users,
    value: "−72%",
    label: "tiempo en cierre de turno",
    sub: "de 40 min a 11 min",
  },
  {
    Icon: Clock,
    value: "0",
    label: "errores de traspaso entre sistemas",
    sub: "antes usaban 3 herramientas",
  },
];

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".case-metric", { opacity: 1, x: 0 });
        return;
      }
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current.querySelector("img"),
          { y: 0 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        ".case-metric",
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="caso" className="bg-[#F8FAFC] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">

        {/* Left — full-bleed photo */}
        <div ref={imgRef} className="relative h-[400px] md:h-auto overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=900&q=80&auto=format&fit=crop"
            alt="La Taberna San Isidro"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8FAFC]/20" />
          {/* Restaurant name badge */}
          <div className="absolute bottom-6 left-6">
            <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-3">
              <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#F59E0B] mb-0.5">Caso de uso</div>
              <div className="text-white font-bold text-[0.95rem]">La Taberna San Isidro</div>
              <div className="text-white/60 text-[0.72rem]">Lima, Perú · 3 locales</div>
            </div>
          </div>
        </div>

        {/* Right — metrics + quote */}
        <div className="flex flex-col justify-center px-10 py-16 md:px-14">
          {/* Metrics */}
          <div className="flex flex-col gap-6 mb-10">
            {metrics.map((m, i) => (
              <div key={i} className="case-metric flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <m.Icon className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[2rem] font-black leading-none tracking-[-0.04em] text-[#0F172A] mb-0.5">
                    {m.value}
                  </div>
                  <div className="text-[0.84rem] font-semibold text-[#0F172A]">{m.label}</div>
                  <div className="text-[0.75rem] text-[#94A3B8] mt-0.5">{m.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <BlurFade delay={0.4}>
            <blockquote className="border-l-2 border-[#F59E0B] pl-5">
              <p className="text-[0.92rem] text-[#475569] leading-[1.7] italic mb-3">
                "Antes cerraba el turno con tres planillas distintas. Ahora aprieto un botón
                y el sistema me da el balance exacto. El contador accede directo — sin llamadas,
                sin exports, sin esperas."
              </p>
              <div>
                <div className="text-[0.82rem] font-bold text-[#0F172A]">Marcos Ríos</div>
                <div className="text-[0.75rem] text-[#94A3B8]">Dueño · La Taberna San Isidro</div>
              </div>
            </blockquote>
          </BlurFade>
        </div>

      </div>
    </section>
  );
}
