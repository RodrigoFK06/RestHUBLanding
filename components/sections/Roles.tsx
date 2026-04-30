import BlurFade from "@/components/reactbits/BlurFade";
import { Crown, Utensils, CreditCard, ChefHat, Calculator, Smartphone, Check, Minus } from "lucide-react";

const roles = [
  {
    Icon: Crown,
    iconBg: "bg-[rgba(245,158,11,0.15)]",
    iconColor: "text-[#F59E0B]",
    name: "Admin",
    access: "Control total",
    desc: "Configuración, reportes y acceso completo a todos los módulos.",
    chips: ["POS", "KDS", "Caja", "BI", "Contabilidad", "Empleados"],
    accentColor: "border-[rgba(245,158,11,0.2)]",
  },
  {
    Icon: Utensils,
    iconBg: "bg-[rgba(13,148,136,0.15)]",
    iconColor: "text-[#14B8A6]",
    name: "Worker · Mesero",
    access: "Operación de salón",
    desc: "Mesas, órdenes e historial propio. Sin acceso a financiero.",
    chips: ["POS", "Historial propio"],
    accentColor: "border-[rgba(13,148,136,0.2)]",
  },
  {
    Icon: CreditCard,
    iconBg: "bg-[rgba(167,139,250,0.15)]",
    iconColor: "text-[#a78bfa]",
    name: "Cajero",
    access: "Pagos y turnos",
    desc: "Caja, pagos y turnos. POS pero sin gestión de empleados.",
    chips: ["POS", "Caja", "Turnos"],
    accentColor: "border-[rgba(167,139,250,0.2)]",
  },
  {
    Icon: ChefHat,
    iconBg: "bg-[rgba(249,115,22,0.15)]",
    iconColor: "text-[#f97316]",
    name: "Cocinero",
    access: "Solo lo necesario",
    desc: "KDS exclusivo. Solo ve lo que necesita preparar y en qué orden.",
    chips: ["KDS"],
    accentColor: "border-[rgba(249,115,22,0.2)]",
  },
  {
    Icon: Calculator,
    iconBg: "bg-[rgba(34,197,94,0.15)]",
    iconColor: "text-[#22C55E]",
    name: "Contador",
    access: "Panel financiero",
    desc: "Balance, facturas y reportes. Datos limpios sin pedirlos cada semana.",
    chips: ["Contabilidad", "Reportes", "BI"],
    accentColor: "border-[rgba(34,197,94,0.2)]",
  },
  {
    Icon: Smartphone,
    iconBg: "bg-[rgba(148,163,184,0.1)]",
    iconColor: "text-[#94A3B8]",
    name: "Cliente",
    access: "Autoservicio (opcional)",
    desc: "Panel de autoservicio y seguimiento. Módulo opcional según el modelo.",
    chips: ["Autoservicio", "Seguimiento"],
    accentColor: "border-white/10",
  },
];

// Permissions matrix: [POS, KDS, Caja, BI, Contab, Empleados]
const matrix = [
  { role: "Admin",    perms: [true, true, true, true, true, true],   color: "text-[#F59E0B]" },
  { role: "Mesero",  perms: [true, false, false, false, false, false], color: "text-[#14B8A6]" },
  { role: "Cajero",  perms: [true, false, true, false, false, false],  color: "text-[#a78bfa]" },
  { role: "Cocinero",perms: [false, true, false, false, false, false], color: "text-[#f97316]" },
  { role: "Contador",perms: [false, false, false, true, true, false],  color: "text-[#22C55E]" },
  { role: "Cliente", perms: [false, false, false, false, false, false],color: "text-[#94A3B8]" },
];
const matrixModules = ["POS", "KDS", "Caja", "BI", "Contab.", "Empleados"];

export default function Roles() {
  return (
    <section id="roles" className="py-24 bg-[#0F172A]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <div className="max-w-[580px] mb-14">
            <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-[rgba(245,158,11,0.1)] text-[#F59E0B] border border-[rgba(245,158,11,0.25)] mb-5">
              Los roles
            </span>
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3">
              RestHUB no es una sola pantalla para todos.
            </h2>
            <p className="text-[1.05rem] text-[#94A3B8] leading-[1.75]">
              Cada actor tiene su entorno. Confundir roles genera caos.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {roles.map((r, i) => (
            <BlurFade key={i} delay={0.06 * (i % 3 + 1)}>
              <div className={`bg-[rgba(255,255,255,0.025)] border border-white/8 hover:${r.accentColor} rounded-2xl p-7 hover:-translate-y-1.5 hover:border-white/14 transition-all h-full flex flex-col`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${r.iconBg}`}>
                  <r.Icon className={`w-5 h-5 ${r.iconColor}`} strokeWidth={1.75} />
                </div>
                <div className="text-[0.97rem] font-bold mb-0.5 text-white">{r.name}</div>
                <div className="text-[0.67rem] font-semibold tracking-[0.1em] uppercase text-[#64748B] mb-3">{r.access}</div>
                <p className="text-[0.82rem] text-[#94A3B8] leading-[1.6] mb-4 flex-1">{r.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.chips.map((c) => (
                    <span key={c} className="text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full bg-white/6 text-[#94A3B8] border border-white/6">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Permissions Matrix */}
        <BlurFade delay={0.18}>
          <div className="bg-[rgba(255,255,255,0.02)] border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/6 bg-white/2">
              <span className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#94A3B8]">Matriz de accesos por rol</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="px-6 py-3 text-left text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#64748B] w-[110px]">Rol</th>
                    {matrixModules.map((m) => (
                      <th key={m} className="px-3 py-3 text-center text-[0.65rem] font-bold tracking-[0.08em] uppercase text-[#64748B]">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
                      <td className={`px-6 py-3 text-[0.78rem] font-bold ${row.color}`}>{row.role}</td>
                      {row.perms.map((has, j) => (
                        <td key={j} className="px-3 py-3 text-center">
                          {has ? (
                            <Check className={`w-3.5 h-3.5 mx-auto ${row.color}`} strokeWidth={2.5} />
                          ) : (
                            <Minus className="w-3.5 h-3.5 mx-auto text-white/12" strokeWidth={2} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
