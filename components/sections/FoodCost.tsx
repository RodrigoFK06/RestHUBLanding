"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, TriangleAlert } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const points = [
  "Cada venta descuenta del inventario los ingredientes exactos, sin que nadie digite nada.",
  "Registras mermas y pérdidas para que el stock cuadre con la realidad, no con el papel.",
  "Alertas antes de quedarte sin un insumo en pleno servicio.",
  "Ves el costo real de cada plato y cuánto te deja.",
];

function PlateCostMock() {
  const recipe = [
    ["Carne de res 300 g", "8.40"],
    ["Papa amarilla 250 g", "0.90"],
    ["Tomate y cebolla", "0.80"],
    ["Arroz y otros", "1.10"],
  ];
  // Se ve como el ticket de la impresora térmica: es lo que el dueño ya conoce.
  return (
    <div className="foodcost-mock w-[320px] max-w-full rotate-[1.5deg] drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)]">
      <div className="bg-[#FAF9F6] text-[#1C1917] font-mono px-6 pt-6 pb-5">
        <p className="text-center text-[0.8rem] font-bold">COSTO POR PLATO</p>
        <p className="text-center text-[0.75rem] text-[#57534E] mb-4">Lomo saltado</p>
        <div className="border-t border-dashed border-[#A8A29E] my-3" />
        <div className="space-y-1.5 text-[0.78rem]">
          {recipe.map(([name, cost]) => (
            <div key={name} className="flex justify-between gap-4">
              <span>{name}</span>
              <span className="tabular-nums">{cost}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-dashed border-[#A8A29E] my-3" />
        <div className="space-y-1.5 text-[0.78rem]">
          <div className="flex justify-between"><span>Costo</span><span className="tabular-nums">S/ 11.20</span></div>
          <div className="flex justify-between"><span>Precio en carta</span><span className="tabular-nums">S/ 35.00</span></div>
        </div>
        <div className="border-t border-dashed border-[#A8A29E] my-3" />
        <div className="flex justify-between items-baseline text-[0.95rem] font-bold">
          <span>TE DEJA</span>
          <span className="tabular-nums">S/ 23.80</span>
        </div>
        <p className="text-right text-[0.75rem] text-[#57534E]">68% del precio</p>
      </div>
      {/* Borde de papel cortado */}
      <div
        aria-hidden="true"
        className="h-[10px]"
        style={{
          background:
            "linear-gradient(-45deg, transparent 7px, #FAF9F6 0) 0 0 / 14px 10px repeat-x, linear-gradient(45deg, transparent 7px, #FAF9F6 0) 0 0 / 14px 10px repeat-x",
        }}
      />

      <div className="foodcost-alert mt-5 -rotate-[1.5deg] flex items-start gap-2.5 rounded-lg px-4 py-3 bg-[#1E293B] ring-1 ring-[#F59E0B]/40">
        <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#F59E0B]" strokeWidth={2} />
        <div>
          <div className="text-[0.85rem] font-bold text-white">Carne de res: quedan 8.2 kg</div>
          <div className="text-[0.8rem] text-[#94A3B8] mt-0.5">Alcanza para unos 27 platos. Repón antes del sábado.</div>
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
      <div className="max-w-[1160px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-center">

          {/* ── LEFT: pain copy ── */}
          <div className="foodcost-copy" style={{ opacity: 0 }}>
            <h2 className="text-[clamp(2rem,4.5vw,3.3rem)] font-extrabold leading-[1.08] tracking-[-0.028em] mb-6 text-white">
              Vendes todos los días. ¿Sabes cuánto te deja cada plato?
            </h2>
            <p className="text-[1.02rem] text-[#94A3B8] leading-[1.8] mb-9 max-w-[480px]">
              La mayoría de restaurantes no lo sabe. Se compra, se cocina, se vende, y a fin de mes
              la plata no cuadra con lo vendido. RestHUB conecta tus recetas con tu inventario para
              que dejes de adivinar dónde se va el margen.
            </p>

            <ul className="foodcost-points space-y-3.5">
              {points.map((p) => (
                <li key={p} className="foodcost-point flex items-start gap-3 text-[1rem] text-white/90 leading-[1.6]">
                  <Check className="w-4 h-4 shrink-0 mt-1 text-[#F59E0B]" strokeWidth={2.5} />
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
