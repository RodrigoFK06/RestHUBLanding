"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WifiOff, Eye, ShieldCheck, Globe2 } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { Icon: WifiOff, color: "#F59E0B", title: "Funciona sin internet", desc: "Se cae la conexión y sigues vendiendo. Al volver, todo se sincroniza solo." },
  { Icon: Eye, color: "#14B8A6", title: "Datos en tiempo real", desc: "BI, turnos, cuentas — a la vista cuando se necesita." },
  { Icon: ShieldCheck, color: "#F59E0B", title: "Roles que respetan la realidad", desc: "El cocinero no ve el balance. El contador no toca órdenes." },
  { Icon: Globe2, color: "#14B8A6", title: "Construido para LATAM", desc: "Culqi, Izipay, fiscalización — nativo, no adaptado." },
];

export default function Why() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".why-text-block", ".why-pillar"], { opacity: 1, x: 0, y: 0 });
        return;
      }
      // Subtle parallax on the photo
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current.querySelector("img"),
          { y: 0 },
          {
            y: -50,
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
        ".why-text-block",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".why-pillar",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".why-pillars",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="why" className="bg-[#0F172A] overflow-hidden">
      {/* Full-bleed 2-col grid — photo goes edge-to-edge */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[620px]">

        {/* ── LEFT: Full-bleed photo ── */}
        <div ref={imgRef} className="relative overflow-hidden min-h-[420px] md:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1772957041453-e0eb938535a8?w=1200&q=85&auto=format&fit=crop"
            alt="Pollería con el horno lleno operando con RestHUB"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ transformOrigin: "center center" }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F172A]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

          {/* Live badge */}
          <div className="absolute bottom-8 left-8 flex items-center gap-2.5 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]" />
            </span>
            <span className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/70">Sistema activo · 12 mesas en línea</span>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="why-text-block flex flex-col justify-center px-10 lg:px-16 py-16 md:py-20" style={{ opacity: 0 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.025em] mb-5">
            La mayoría de los sistemas te obligan a{" "}
            <span style={{ color: "#F59E0B" }}>elegir entre funciones.</span>
          </h2>

          <p className="text-[0.95rem] text-[#94A3B8] leading-[1.75] mb-10 max-w-[440px]">
            RestHUB existe para que esa elección no exista. Desde la mesa hasta el balance, un solo punto de control — sin módulos extra, sin integraciones frágiles.
          </p>

          {/* Pillars */}
          <div className="why-pillars grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="why-pillar flex items-start gap-3 rounded-xl p-4 group"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: 0,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${p.color}18` }}
                >
                  <p.Icon className="w-4 h-4" style={{ color: p.color }} strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-[0.82rem] font-bold text-white mb-0.5">{p.title}</h4>
                  <p className="text-[0.75rem] text-[#64748B] leading-[1.55]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#modulos"
            className="btn-amber inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full"
          >
            Ver todos los módulos →
          </a>
        </div>
      </div>
    </section>
  );
}
