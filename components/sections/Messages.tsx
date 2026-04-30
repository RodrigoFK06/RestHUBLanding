"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Bento-grid editorial — like Square's "Why Square" section
// 5 cells in an asymmetric layout: 2 tall + 3 wide
const cells = [
  {
    id: "completitud",
    span: "md:col-span-1 md:row-span-2",
    bg: "#0F172A",
    accent: "#F59E0B",
    num: "6",
    numLabel: "módulos nativos",
    title: "Un sistema completo.",
    body: "POS, cocina, caja y contabilidad operando como uno. Sin módulos de pago aparte.",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80&auto=format&fit=crop",
    photoAlt: "Restaurante en operación",
    tall: true,
  },
  {
    id: "roles",
    span: "md:col-span-1 md:row-span-1",
    bg: "#1E293B",
    accent: "#14B8A6",
    num: "6",
    numLabel: "roles diferenciados",
    title: "Cada quien ve lo suyo.",
    body: "Tu cocinero no ve el balance. Tu contador no toca una orden. Acceso exacto por función.",
    photo: null,
    tall: false,
  },
  {
    id: "latam",
    span: "md:col-span-1 md:row-span-1",
    bg: "#0F172A",
    accent: "#F59E0B",
    num: "2",
    numLabel: "gateways nativos",
    title: "Hecho para LATAM.",
    body: "Culqi, Izipay, Yape y Plin nativos. Fiscalización local. No una adaptación de otro mercado.",
    photo: null,
    tall: false,
  },
  {
    id: "realtime",
    span: "md:col-span-1 md:row-span-1",
    bg: "#0A1628",
    accent: "#14B8A6",
    num: "< 200ms",
    numLabel: "POS → KDS",
    title: "Tiempo real, de verdad.",
    body: "El BI no es un reporte semanal. Es un dashboard que vive con la operación del día.",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
    photoAlt: "Dashboard analytics",
    tall: false,
  },
  {
    id: "cocina",
    span: "md:col-span-1 md:row-span-1",
    bg: "#1E293B",
    accent: "#F59E0B",
    num: "80%",
    numLabel: "menos errores",
    title: "La cocina también cuenta.",
    body: "El KDS integrado elimina el papel. La orden llega al instante, sin malentendidos.",
    photo: null,
    tall: false,
  },
];

export default function Messages() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".msg-cell",
        { opacity: 0, y: 45, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
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
    <section ref={sectionRef} id="mensajes" className="py-24 bg-[#0F172A]">
      <div className="max-w-[1160px] mx-auto px-8">

        {/* Header */}
        <div className="mb-12">
          <span
            className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#F59E0B" }}
          >
            Por qué RestHUB
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em]">
            No hacemos compromisos.<br />
            <span style={{ color: "#F59E0B" }}>Hacemos sistemas.</span>
          </h2>
        </div>

        {/* Bento grid — 3 cols × 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">
          {cells.map((cell) => (
            <div
              key={cell.id}
              className={`msg-cell relative overflow-hidden rounded-2xl flex flex-col justify-between group ${cell.span} ${cell.tall ? "md:row-span-2" : ""}`}
              style={{
                background: cell.bg,
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: 0,
              }}
            >
              {/* Photo bg for tall + realtime cells */}
              {cell.photo && (
                <>
                  <Image
                    src={cell.photo}
                    alt={cell.photoAlt || ""}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </>
              )}

              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${cell.accent}, transparent)` }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-6">
                {/* Big stat */}
                <div>
                  <div
                    className="text-[clamp(2.5rem,4vw,3.5rem)] font-black leading-none mb-1 tabular-nums"
                    style={{ color: cell.accent }}
                  >
                    {cell.num}
                  </div>
                  <div className="text-[0.58rem] font-bold tracking-[0.15em] uppercase text-white/35 mb-4">
                    {cell.numLabel}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[1rem] font-extrabold text-white mb-2 leading-tight">{cell.title}</h3>
                  <p className="text-[0.82rem] text-white/55 leading-[1.65]">{cell.body}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${cell.accent}10 0%, transparent 70%)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
