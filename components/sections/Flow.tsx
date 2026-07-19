import BlurFade from "@/components/reactbits/BlurFade";
import { UtensilsCrossed, ChefHat, DollarSign, BookOpen, Zap } from "lucide-react";

const steps = [
  {
    num: "01",
    Icon: UtensilsCrossed,
    iconBg: "bg-[rgba(13,148,136,0.15)]",
    iconColor: "text-[#0F766E]",
    numColor: "text-[#0D9488]",
    name: "Mesa",
    desc: "El mesero toma la orden. Mesas, modificadores, combos — en segundos.",
    role: "Worker / Cajero",
    roleClass: "bg-[rgba(13,148,136,0.12)] text-[#0F766E] border border-[rgba(13,148,136,0.3)]",
  },
  {
    num: "02",
    Icon: ChefHat,
    iconBg: "bg-[rgba(245,158,11,0.15)]",
    iconColor: "text-[#B45309]",
    numColor: "text-[#D97706]",
    name: "Cocina",
    desc: "La orden aparece al instante en el KDS. El cocinero solo ve lo que prepara.",
    role: "Cocinero",
    roleClass: "bg-[rgba(245,158,11,0.12)] text-[#B45309] border border-[rgba(245,158,11,0.3)]",
  },
  {
    num: "03",
    Icon: DollarSign,
    iconBg: "bg-[rgba(13,148,136,0.12)]",
    iconColor: "text-[#0F766E]",
    numColor: "text-[#0D9488]",
    name: "Caja",
    desc: "El cajero cierra el turno con el Z-report exacto. Cada sol cuadra.",
    role: "Cajero",
    roleClass: "bg-[rgba(13,148,136,0.12)] text-[#0F766E] border border-[rgba(13,148,136,0.3)]",
  },
  {
    num: "04",
    Icon: BookOpen,
    iconBg: "bg-[rgba(245,158,11,0.12)]",
    iconColor: "text-[#B45309]",
    numColor: "text-[#D97706]",
    name: "Balance",
    desc: "El contador ve cuentas y balance — sin tocar la operación ni pedir datos.",
    role: "Contador",
    roleClass: "bg-[rgba(245,158,11,0.12)] text-[#B45309] border border-[rgba(245,158,11,0.3)]",
  },
];

export default function Flow() {
  return (
    <section id="flujo" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#0F172A]">
              De la mesa al balance,<br />sin interrupciones.
            </h2>
          </div>
        </BlurFade>

        {/* Steps with connector arrows on desktop */}
        <BlurFade delay={0.1}>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Connector line behind cards (desktop only) */}
            <div className="absolute hidden lg:block top-[2.75rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#14B8A6] to-[#F59E0B] opacity-30 pointer-events-none z-0" />

            {steps.map((s, i) => (
              <div
                key={i}
                className="relative z-10 bg-white border border-[#E2E8F0] rounded-2xl px-6 py-7 hover:shadow-md hover:border-[#CBD5E1] transition shadow-sm"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${s.iconBg}`}>
                  <s.Icon className={`w-5 h-5 ${s.iconColor}`} strokeWidth={1.75} />
                </div>
                {/* Step number */}
                <div className={`text-[2.4rem] font-black tracking-[-0.06em] leading-none mb-2 ${s.numColor}`}>{s.num}</div>
                <div className="text-[0.97rem] font-bold mb-2 text-[#0F172A]">{s.name}</div>
                <p className="text-[0.82rem] text-[#475569] leading-[1.6] mb-4">{s.desc}</p>
                <span className={`inline-block text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full border ${s.roleClass}`}>
                  {s.role}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Latency banner */}
        <BlurFade delay={0.2}>
          <div className="flex items-center justify-center gap-6 bg-white border border-[#E2E8F0] rounded-2xl px-8 py-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[rgba(13,148,136,0.15)] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#0F766E]" strokeWidth={1.75} />
            </div>
            <div className="text-[2.2rem] font-black text-[#0D9488] tracking-[-0.04em]">Al instante</div>
            <div className="text-[0.84rem] text-[#475569] leading-[1.5]">el pedido del mesero aparece en cocina<br />— sin papelitos, sin gritos</div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
