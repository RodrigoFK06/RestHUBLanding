"use client";

import BlurFade from "@/components/reactbits/BlurFade";
import { ArrowDown } from "lucide-react";

export default function PricingPivot() {
  return (
    <section className="py-20 bg-[#0F172A] border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-8 text-center">
        <BlurFade>
          <div className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[#64748B] mb-8">
            <div className="w-8 h-px bg-white/10" />
            El siguiente paso
            <div className="w-8 h-px bg-white/10" />
          </div>

          <h2 className="text-[clamp(1.9rem,4.5vw,3.4rem)] font-black leading-[1.08] tracking-[-0.035em] mb-5">
            Ya comparaste.<br />
            <span className="text-[#F59E0B]">Ahora es el momento de elegir.</span>
          </h2>

          <p className="text-[1rem] text-[#64748B] leading-[1.75] max-w-[480px] mx-auto mb-10">
            Sin contrato de largo plazo. Sin comisiones ocultas. Implementación guiada incluida desde el primer día.
          </p>

          <div className="flex justify-center">
            <a
              href="#precios"
              className="group flex flex-col items-center gap-2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-[0.7rem] font-medium tracking-[0.1em] uppercase">Ver planes</span>
              <ArrowDown
                className="w-4 h-4 motion-safe:animate-bounce group-hover:translate-y-0.5 transition-transform"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
