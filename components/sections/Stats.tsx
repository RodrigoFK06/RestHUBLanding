"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import Counter from "@/components/reactbits/Counter";
import BlurFade from "@/components/reactbits/BlurFade";
import { TrendingUp, CreditCard, ShoppingBag } from "lucide-react";

const stats = [
  { value: 6, places: [1], label: "Módulos integrados\nen un solo sistema", color: "text-[#D97706]", suffix: "" },
  { value: 6, places: [1], label: "Roles de usuario\ncon acceso diferenciado", color: "text-[#0D9488]", suffix: "" },
  { value: null, display: "< 200ms", label: "Latencia POS → KDS\nen tiempo real", color: "text-[#0D9488]", suffix: "" },
  { value: 15, places: [10, 1], label: "Locales gestionables\ndesde un solo panel", color: "text-[#D97706]", suffix: "" },
];

const chartBars = [
  { day: "Lun", val: 55 },
  { day: "Mar", val: 42 },
  { day: "Mié", val: 68 },
  { day: "Jue", val: 51 },
  { day: "Vie", val: 85 },
  { day: "Sáb", val: 100 },
  { day: "Dom", val: 73 },
];

function MiniBarChart() {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once: true, margin: "-50px" } as any);

  return (
    <div ref={ref} className="flex items-end gap-1.5" style={{ height: "72px" }}>
      {chartBars.map((b, i) => (
        <div key={b.day} className="flex flex-col items-center gap-1.5 flex-1">
          <div
            className="w-full origin-bottom rounded-sm transition-transform ease-snappy"
            style={{
              height: `${b.val}%`,
              transform: inView ? "scaleY(1)" : "scaleY(0)",
              background: i === 5 ? "linear-gradient(to top, #F59E0B, #FCD34D)" : "rgba(20,184,166,0.4)",
              transitionDuration: "900ms",
              transitionDelay: `${i * 70}ms`,
            }}
          />
          <span className="text-[0.55rem] text-[#64748B] leading-none">{b.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-8">

        {/* Header */}
        <BlurFade>
          <div className="text-center max-w-[540px] mx-auto mb-10">
            <h2 className="text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#0F172A]">
              Todo lo que un restaurante necesita.
              <span className="text-[#D97706]"> Integrado.</span>
            </h2>
          </div>
        </BlurFade>

        {/* Counters */}
        <BlurFade delay={0.08}>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E2E8F0] rounded-2xl overflow-hidden mb-6 bg-white shadow-sm">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`px-8 py-10 text-center ${i < 3 ? "border-b md:border-b-0 md:border-r border-[#E2E8F0]" : ""} hover:bg-[#F8FAFC] transition-colors`}
              >
                <div className={`text-[clamp(2.4rem,4.5vw,3.4rem)] font-black leading-none tracking-[-0.05em] mb-2 flex justify-center items-center ${s.color}`}>
                  {s.value !== null ? (
                    <Counter
                      value={s.value}
                      places={s.places}
                      fontSize={52}
                      textColor={s.color.replace("text-[", "").replace("]", "")}
                      fontWeight={900}
                    />
                  ) : (
                    <span className="text-[clamp(1.6rem,3vw,2.4rem)]">{s.display}</span>
                  )}
                </div>
                <div className="text-sm text-[#475569] leading-snug font-medium whitespace-pre-line">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Mini bar chart strip */}
        <BlurFade delay={0.18}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 bg-white border border-[#E2E8F0] rounded-2xl px-8 py-6 shadow-sm">
            <div>
              <div className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#94A3B8] mb-1">Ventas semanales &middot; Sábado pico</div>
              <div className="text-[1.5rem] font-black text-[#0F172A] tracking-tight">S/ 47,320 <span className="text-sm font-semibold text-[#0F766E]">+12% vs semana anterior</span></div>
            </div>
            <div className="w-full sm:w-[260px] shrink-0">
              <MiniBarChart />
            </div>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
