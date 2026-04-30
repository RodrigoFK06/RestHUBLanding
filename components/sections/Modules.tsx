import BlurFade from "@/components/reactbits/BlurFade";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, ChefHat, Wallet, BarChart2, BookOpen, Users2, ArrowRight } from "lucide-react";

const modules = [
  {
    Icon: Monitor,
    iconBg: "bg-[rgba(13,148,136,0.15)]",
    iconColor: "text-[#14B8A6]",
    arrowColor: "text-[#14B8A6]",
    name: "POS · Punto de Venta",
    badge: "Operación de salón",
    badgeClass: "bg-[rgba(13,148,136,0.12)] text-[#14B8A6] border border-[rgba(13,148,136,0.2)]",
    gradientClass: "from-[#14B8A6] to-[#38bdf8]",
    desc: "Toma de órdenes por mesa, combos, modificadores y splits de cuenta en un flujo sin fricción.",
    items: ["Gestión de mesas y zonas", "Modificadores y combos", "Split de cuentas", "Historial por turno"],
  },
  {
    Icon: ChefHat,
    iconBg: "bg-[rgba(245,158,11,0.15)]",
    iconColor: "text-[#F59E0B]",
    arrowColor: "text-[#F59E0B]",
    name: "KDS · Kitchen Display",
    badge: "Cocina en tiempo real",
    badgeClass: "bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border border-[rgba(245,158,11,0.2)]",
    gradientClass: "from-[#F59E0B] to-[#f97316]",
    desc: "La orden llega a la pantalla de cocina al instante. Pendiente → Cocinando → Listo.",
    items: ["Sincronización < 200ms", "Estados visuales claros", "Sin papel ni errores", "Múltiples estaciones"],
  },
  {
    Icon: Wallet,
    iconBg: "bg-[rgba(167,139,250,0.15)]",
    iconColor: "text-[#a78bfa]",
    arrowColor: "text-[#a78bfa]",
    name: "Caja y Turnos",
    badge: "Control financiero diario",
    badgeClass: "bg-[rgba(167,139,250,0.12)] text-[#a78bfa] border border-[rgba(167,139,250,0.2)]",
    gradientClass: "from-[#a78bfa] to-[#14B8A6]",
    desc: "Apertura, Z-report, control de efectivo. Sabés exactamente qué tenés en caja antes de cerrar.",
    items: ["Z-report automático", "Control de diferencias", "Historial de movimientos", "Cierre con cuadre completo"],
  },
  {
    Icon: BarChart2,
    iconBg: "bg-[rgba(34,211,238,0.12)]",
    iconColor: "text-[#22d3ee]",
    arrowColor: "text-[#22d3ee]",
    name: "BI y Reportes",
    badge: "Inteligencia operativa",
    badgeClass: "bg-[rgba(34,211,238,0.1)] text-[#22d3ee] border border-[rgba(34,211,238,0.2)]",
    gradientClass: "from-[#14B8A6] to-[#22d3ee]",
    desc: "Ventas, métodos de pago, productos top y tendencias. En tiempo real, sin esperar el lunes.",
    items: ["Dashboard en vivo", "Ranking de productos", "Análisis por método de pago", "Comparativas diarias"],
  },
  {
    Icon: BookOpen,
    iconBg: "bg-[rgba(34,197,94,0.12)]",
    iconColor: "text-[#22C55E]",
    arrowColor: "text-[#22C55E]",
    name: "Contabilidad",
    badge: "Panel exclusivo contador",
    badgeClass: "bg-[rgba(34,197,94,0.1)] text-[#22C55E] border border-[rgba(34,197,94,0.2)]",
    gradientClass: "from-[#22C55E] to-[#0D9488]",
    desc: "Cuentas por cobrar, gastos y facturas en un panel exclusivo — sin tocar la operación.",
    items: ["Cuentas por cobrar y pagar", "Registro de gastos", "Facturación electrónica", "Balance mensual automático"],
  },
  {
    Icon: Users2,
    iconBg: "bg-[rgba(245,158,11,0.1)]",
    iconColor: "text-[#FCD34D]",
    arrowColor: "text-[#FCD34D]",
    name: "Empleados",
    badge: "Gestión del equipo",
    badgeClass: "bg-[rgba(245,158,11,0.08)] text-[#FCD34D] border border-[rgba(245,158,11,0.15)]",
    gradientClass: "from-[#FCD34D] to-[#F59E0B]",
    desc: "Asistencia, roles, historial. Sin apps externas ni planillas manuales.",
    items: ["Control de asistencia", "Gestión de roles", "Historial de actividad", "Onboarding rápido"],
  },
];

export default function Modules() {
  return (
    <section id="modulos" className="py-24 bg-[#0F172A]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-[rgba(13,148,136,0.1)] text-[#14B8A6] border border-[rgba(13,148,136,0.25)] mb-5">
            Los módulos
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] max-w-[620px]">
            Un restaurante tiene seis dimensiones. RestHUB las cubre todas.
          </h2>
          <p className="mt-3 text-[1.05rem] text-[#94A3B8] leading-[1.75] max-w-[560px] mb-14">
            Cada módulo opera solo y en conjunto. No hay costuras porque son el mismo sistema.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <BlurFade key={i} delay={0.06 * (i % 3 + 1)}>
              <Card className="relative overflow-hidden bg-[rgba(255,255,255,0.025)] border border-white/8 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_28px_64px_rgba(0,0,0,0.5)] transition-all duration-300 h-full">
                {/* top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${m.gradientClass}`} />
                <CardContent className="pt-7 pb-6 px-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${m.iconBg}`}>
                    <m.Icon className={`w-5 h-5 ${m.iconColor}`} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[0.97rem] font-bold mb-2 text-white">{m.name}</h3>
                  <span className={`self-start inline-block text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full mb-3 ${m.badgeClass}`}>
                    {m.badge}
                  </span>
                  <p className="text-[0.85rem] text-[#94A3B8] leading-[1.65] mb-5">{m.desc}</p>
                  <ul className="flex flex-col gap-2 mt-auto">
                    {m.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-[0.82rem] text-[#94A3B8]">
                        <ArrowRight className={`w-3 h-3 shrink-0 opacity-70 ${m.arrowColor}`} strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
