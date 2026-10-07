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
  { Icon: Eye, color: "#14B8A6", title: "Datos en tiempo real", desc: "Ventas, turnos y cuentas a la vista cuando los necesitas." },
  { Icon: ShieldCheck, color: "#F59E0B", title: "Roles que respetan la realidad", desc: "El cocinero no ve el balance. El contador no toca órdenes." },
  { Icon: Globe2, color: "#14B8A6", title: "Hecho para Perú", desc: "Culqi, Izipay, Yape, Plin y SUNAT desde el primer día." },
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
            src="https://images.unsplash.com/photo-1772957041453-e0eb938535a8?w=2000&q=85&auto=format&fit=crop"
            alt="Pollos a la brasa en el horno de una pollería"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ transformOrigin: "center center" }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F172A]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        </div>

        {/* ── RIGHT: Content ── */}
        <div className="why-text-block flex flex-col justify-center px-10 lg:px-16 py-16 md:py-20" style={{ opacity: 0 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.025em] mb-5">
            La mayoría de los sistemas te obligan a elegir entre funciones.
          </h2>

          <p className="text-[1.05rem] text-[#94A3B8] leading-[1.7] mb-10 max-w-[460px]">
            Con RestHUB no eliges. La mesa, la cocina, la caja y la contabilidad viven en el mismo sistema, sin módulos que se pagan aparte.
          </p>

          {/* Pillars */}
          <div className="why-pillars grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-10">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="why-pillar flex items-start gap-3"
                style={{ opacity: 0 }}
              >
                <p.Icon className="w-5 h-5 shrink-0 mt-0.5 text-[#F59E0B]" strokeWidth={1.75} />
                <div>
                  <h3 className="text-[0.98rem] font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-[0.9rem] text-[#94A3B8] leading-[1.55]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#modulos"
            className="btn-amber self-start inline-flex items-center gap-2 font-bold text-[0.95rem] px-7 py-3.5 rounded-full"
          >
            Ver todos los módulos
          </a>
        </div>
      </div>
    </section>
  );
}
