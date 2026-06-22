"use client";

import { useState } from "react";
import { Crown, Utensils, CreditCard, ChefHat, Calculator, Smartphone, Check } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";

const roles = [
  {
    Icon: Crown,
    color: "#F59E0B",
    colorBg: "rgba(245,158,11,0.12)",
    colorBorder: "rgba(245,158,11,0.3)",
    name: "Admin",
    access: "Control total",
    desc: "Configuración, reportes y acceso completo a todos los módulos del sistema. El único que lo ve todo.",
    chips: ["POS", "KDS", "Caja", "BI", "Contabilidad", "Empleados"],
    gradientFrom: "rgba(245,158,11,0.14)",
  },
  {
    Icon: Utensils,
    color: "#14B8A6",
    colorBg: "rgba(13,148,136,0.12)",
    colorBorder: "rgba(13,148,136,0.3)",
    name: "Mesero",
    access: "Operación de salón",
    desc: "Mesas, órdenes e historial propio. Sin acceso a información financiera ni configuración.",
    chips: ["POS", "Historial propio"],
    gradientFrom: "rgba(13,148,136,0.12)",
  },
  {
    Icon: CreditCard,
    color: "#a78bfa",
    colorBg: "rgba(167,139,250,0.12)",
    colorBorder: "rgba(167,139,250,0.3)",
    name: "Cajero",
    access: "Pagos y turnos",
    desc: "Caja, pagos y turnos. Cobra sin gestionar empleados ni ver reportes financieros.",
    chips: ["POS", "Caja", "Turnos"],
    gradientFrom: "rgba(167,139,250,0.12)",
  },
  {
    Icon: ChefHat,
    color: "#f97316",
    colorBg: "rgba(249,115,22,0.12)",
    colorBorder: "rgba(249,115,22,0.3)",
    name: "Cocinero",
    access: "Solo lo necesario",
    desc: "KDS exclusivo. Solo ve lo que necesita preparar y en qué orden. Nada más.",
    chips: ["KDS"],
    gradientFrom: "rgba(249,115,22,0.12)",
  },
  {
    Icon: Calculator,
    color: "#22C55E",
    colorBg: "rgba(34,197,94,0.12)",
    colorBorder: "rgba(34,197,94,0.3)",
    name: "Contador",
    access: "Panel financiero",
    desc: "Balance, facturas y reportes. Datos limpios sin molestar al equipo ni pedir exports.",
    chips: ["Contabilidad", "Reportes", "BI"],
    gradientFrom: "rgba(34,197,94,0.12)",
  },
  {
    Icon: Smartphone,
    color: "#94A3B8",
    colorBg: "rgba(148,163,184,0.08)",
    colorBorder: "rgba(148,163,184,0.2)",
    name: "Cliente",
    access: "Autoservicio",
    desc: "Panel de autoservicio y seguimiento de pedido. Módulo opcional según el modelo.",
    chips: ["Autoservicio", "Seguimiento"],
    gradientFrom: "rgba(148,163,184,0.08)",
  },
];

export default function ExpandingRoles() {
  const [active, setActive] = useState(0);

  return (
    <section id="roles" className="py-24 bg-[#1E293B]">
      <div className="max-w-[1160px] mx-auto px-8">
        {/* Header */}
        <BlurFade>
          <div className="max-w-[600px] mb-16">
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3">
              RestHUB no es una sola pantalla para todos.
            </h2>
            <p className="text-[1.05rem] text-[#94A3B8] leading-[1.75]">
              Cada actor tiene su entorno. Confundir roles genera caos — y caos genera pérdidas.
            </p>
          </div>
        </BlurFade>

        {/* ── Desktop: expanding horizontal panels ── */}
        <BlurFade delay={0.1}>
          <div
            role="tablist"
            aria-label="Roles del sistema"
            className="hidden md:flex gap-2 rounded-2xl overflow-hidden"
            style={{ height: 520 }}
          >
            {roles.map((role, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Rol ${role.name}: ${role.access}`}
                  className="relative overflow-hidden cursor-pointer border transition-[flex-grow,border-color,background-color,border-radius] duration-[460ms] ease-[cubic-bezier(0.4,0,0.2,1)] text-left"
                  style={{
                    flex: isActive ? "4.5" : "0.5",
                    borderColor: isActive ? role.colorBorder : "rgba(255,255,255,0.05)",
                    borderRadius: "1rem",
                    background: isActive ? "#0F172A" : "rgba(255,255,255,0.025)",
                    minWidth: 0,
                  }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  {/* Active gradient background */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${role.gradientFrom} 0%, transparent 60%)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  {/* Bottom glow line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${role.color}, transparent)`,
                      opacity: isActive ? 0.7 : 0,
                    }}
                  />

                  {/* Inactive: vertical label */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: role.colorBg }}
                      >
                        <role.Icon className="w-4 h-4" style={{ color: role.color }} strokeWidth={1.75} />
                      </div>
                      <span
                        className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#64748B] whitespace-nowrap"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {role.name}
                      </span>
                    </div>
                  </div>

                  {/* Active: full content */}
                  <div
                    className="relative z-10 h-full flex flex-col p-8 transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                      style={{ background: role.colorBg }}
                    >
                      <role.Icon className="w-6 h-6" style={{ color: role.color }} strokeWidth={1.75} />
                    </div>

                    <div
                      className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2"
                      style={{ color: role.color }}
                    >
                      {role.access}
                    </div>

                    <h3 className="text-[1.65rem] font-extrabold leading-[1.15] tracking-[-0.025em] mb-3 text-white">
                      {role.name}
                    </h3>

                    <p className="text-[0.88rem] text-[#94A3B8] leading-[1.7] mb-6 flex-1">
                      {role.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {role.chips.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center gap-1 text-[0.65rem] font-semibold px-2.5 py-1 rounded-full border"
                          style={{ color: role.color, borderColor: role.colorBorder, background: role.colorBg }}
                        >
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </BlurFade>

        {/* ── Mobile: vertical accordion ── */}
        <div className="md:hidden flex flex-col gap-2">
          {roles.map((role, i) => {
            const isActive = active === i;
            const panelId = `role-panel-${i}`;
            return (
              <div
                key={i}
                className="border rounded-2xl overflow-hidden transition-colors duration-300"
                style={{ borderColor: isActive ? role.colorBorder : "rgba(255,255,255,0.1)" }}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer min-h-[56px]"
                  onClick={() => setActive(isActive ? -1 : i)}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: role.colorBg }}
                  >
                    <role.Icon className="w-4 h-4" style={{ color: role.color }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">{role.name}</div>
                    <div className="text-[0.65rem] text-[#94A3B8] uppercase tracking-wide">{role.access}</div>
                  </div>
                  <span aria-hidden="true" className="text-white/70 text-lg font-light shrink-0">{isActive ? "−" : "+"}</span>
                </button>
                {isActive && (
                  <div id={panelId} className="px-5 pb-5 border-t border-white/5 pt-4">
                    <p className="text-[0.82rem] text-[#94A3B8] leading-[1.65] mb-4">{role.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-[0.65rem] font-semibold px-2.5 py-1 rounded-full border"
                          style={{ color: role.color, borderColor: role.colorBorder, background: role.colorBg }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <BlurFade delay={0.2}>
          <p className="mt-10 text-center text-[0.82rem] text-[#94A3B8]">
            <span className="hidden md:inline">Hovereá o tocá cada rol para ver su entorno → </span>
            <span className="md:hidden">Tocá cada rol para ver su entorno → </span>
            <span className="ml-2 text-white/85">6 roles · 6 realidades distintas</span>
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
