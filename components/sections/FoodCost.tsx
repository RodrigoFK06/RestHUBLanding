"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, TriangleAlert } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const points = [
  "Cada venta descuenta los ingredientes exactos de tu inventario, sin que nadie digite nada.",
  "Registras mermas y pérdidas para que el stock cuadre con la realidad, no con el papel.",
  "Alertas antes de quedarte sin un insumo en pleno servicio.",
  "Costo real por plato: ingredientes, precio y lo que te deja, a la vista.",
];

function PlateCostMock() {
  const green = "#22C55E";
  const amber = "#F59E0B";
  const recipe = [
    ["Carne de res · 300 g", "S/ 8.40"],
    ["Papa amarilla · 250 g", "S/ 0.90"],
    ["Tomate + cebolla", "S/ 0.80"],
    ["Arroz + otros", "S/ 1.10"],
  ];
  return (
    <div className="foodcost-mock w-[300px] max-w-full">
      <div
        className="bg-[#05101e] rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(34,197,94,0.35)",
          boxShadow: "0 0 70px rgba(34,197,94,0.14), 0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="px-4 py-3 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.07)" }}
        >
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em]" style={{ color: green }}>
            Costo por plato
          </span>
          <span className="text-[0.62rem] font-bold text-white/70">Lomo saltado · S/ 35</span>
        </div>

        <div className="p-4 space-y-1.5">
          {recipe.map(([name, cost], i) => (
            <div key={i} className="flex items-center justify-between bg-white/3 rounded-lg px-3 py-2">
              <span className="text-[0.72rem] text-[#94A3B8]">{name}</span>
              <span className="text-[0.72rem] font-bold text-white/60">{cost}</span>
            </div>
          ))}

          <div className="flex items-center justify-between px-3 pt-2">
            <span className="text-[0.68rem] text-[#64748B]">Costo del plato</span>
            <span className="text-[0.8rem] font-extrabold text-white">S/ 11.20</span>
          </div>
          <div className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-white/7">
            <span className="text-[0.72rem] text-[#94A3B8]">Te deja</span>
            <span className="text-[0.88rem] font-extrabold" style={{ color: green }}>
              S/ 23.80 · 68%
            </span>
          </div>
        </div>
      </div>

      {/* Low-stock alert chip */}
      <div
        className="foodcost-alert mt-3 flex items-start gap-2.5 rounded-xl px-3.5 py-3 bg-[#05101e]"
        style={{ border: "1px solid rgba(245,158,11,0.35)" }}
      >
        <TriangleAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: amber }} strokeWidth={2} />
        <div>
          <div className="text-[0.7rem] font-bold text-white">Carne de res: quedan 8.2 kg</div>
          <div className="text-[0.62rem] text-[#64748B] mt-0.5">Alcanza para ~27 platos. Repón antes del sábado.</div>
        </div>
      </div>
    </div>
  );
}

export default function FoodCost() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".foodcost-copy", ".foodcost-point", ".foodcost-mock", ".foodcost-alert"], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }
      gsap.fromTo(
        ".foodcost-copy",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".foodcost-point",
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".foodcost-points", start: "top 78%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".foodcost-mock",
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 62%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="costos" className="bg-black py-28 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-center">

          {/* ── LEFT: pain copy ── */}
          <div className="foodcost-copy" style={{ opacity: 0 }}>
            <h2 className="text-[clamp(2rem,4.5vw,3.3rem)] font-extrabold leading-[1.08] tracking-[-0.028em] mb-6 text-white">
              Vendes todos los días.{" "}
              <span className="text-[#22C55E]">¿Sabes cuánto te deja cada plato?</span>
            </h2>
            <p className="text-[1.02rem] text-[#94A3B8] leading-[1.8] mb-9 max-w-[480px]">
              La mayoría de restaurantes no lo sabe. Se compra, se cocina, se vende, y a fin de mes
              la plata no cuadra con lo vendido. RestHUB conecta tus recetas con tu inventario para
              que dejes de adivinar dónde se va el margen.
            </p>

            <ul className="foodcost-points space-y-3.5">
              {points.map((p) => (
                <li key={p} className="foodcost-point flex items-start gap-3 text-[0.92rem] text-white/90 leading-[1.6]">
                  <Check className="w-4 h-4 shrink-0 mt-1 text-[#22C55E]" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT: plate cost mock ── */}
          <div className="flex justify-center md:justify-end">
            <PlateCostMock />
          </div>
        </div>
      </div>
    </section>
  );
}
