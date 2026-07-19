"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Monitor, ChefHat, Wallet, BarChart2, BookOpen, Users2, Check } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    num: "01",
    Icon: Monitor,
    color: "#14B8A6",
    colorBg: "rgba(13,148,136,0.14)",
    colorBorder: "rgba(13,148,136,0.4)",
    colorGlow: "rgba(13,148,136,0.2)",
    name: "POS · Punto de Venta",
    badge: "Operación de salón",
    desc: "Toma de órdenes por mesa, combos, modificadores y splits de cuenta. Diseñado para el ritmo real del salón — sin fricción.",
    items: ["Gestión de mesas y zonas", "Modificadores y combos", "Split de cuentas", "Historial por turno"],
  },
  {
    num: "02",
    Icon: ChefHat,
    color: "#F59E0B",
    colorBg: "rgba(245,158,11,0.14)",
    colorBorder: "rgba(245,158,11,0.4)",
    colorGlow: "rgba(245,158,11,0.2)",
    name: "KDS · Kitchen Display",
    badge: "Cocina en tiempo real",
    desc: "La orden llega a la pantalla de cocina al instante. Sin papel, sin gritos, sin errores entre el salón y la cocina.",
    items: ["El pedido llega al instante", "Estados: Nuevo · Cocinando · Listo", "Sin papel ni errores", "Múltiples estaciones"],
  },
  {
    num: "03",
    Icon: Wallet,
    color: "#a78bfa",
    colorBg: "rgba(167,139,250,0.14)",
    colorBorder: "rgba(167,139,250,0.4)",
    colorGlow: "rgba(167,139,250,0.18)",
    name: "Caja y Turnos",
    badge: "Control financiero diario",
    desc: "Apertura, Z-report y control de efectivo en tiempo real. Sabes exactamente qué tienes en caja antes de cerrar el turno.",
    items: ["Z-report automático", "Control de diferencias", "Historial de movimientos", "Cierre con cuadre completo"],
  },
  {
    num: "04",
    Icon: BarChart2,
    color: "#22d3ee",
    colorBg: "rgba(34,211,238,0.12)",
    colorBorder: "rgba(34,211,238,0.4)",
    colorGlow: "rgba(34,211,238,0.18)",
    name: "BI y Reportes",
    badge: "Inteligencia operativa",
    desc: "Ventas, métodos de pago, productos top y tendencias semanales. En tiempo real, sin esperar el lunes ni pedir un export.",
    items: ["Dashboard en vivo", "Ranking de productos", "Análisis por método de pago", "Comparativas diarias y semanales"],
  },
  {
    num: "05",
    Icon: BookOpen,
    color: "#22C55E",
    colorBg: "rgba(34,197,94,0.12)",
    colorBorder: "rgba(34,197,94,0.4)",
    colorGlow: "rgba(34,197,94,0.18)",
    name: "Contabilidad",
    badge: "Panel exclusivo contador",
    desc: "Cuentas por cobrar, gastos y facturas en un panel que el contador maneja solo. Cierra el mes sin digitar una sola venta.",
    items: ["Cuentas por cobrar y pagar", "Registro de gastos", "SUNAT y SIRE sin digitación", "Balance mensual automático"],
  },
  {
    num: "06",
    Icon: Users2,
    color: "#FCD34D",
    colorBg: "rgba(252,211,77,0.12)",
    colorBorder: "rgba(252,211,77,0.4)",
    colorGlow: "rgba(252,211,77,0.15)",
    name: "Empleados",
    badge: "Gestión del equipo",
    desc: "Asistencia, roles e historial de actividad. Sin apps externas ni planillas manuales que nadie llena al final del turno.",
    items: ["Control de asistencia", "Gestión de roles", "Historial de actividad", "Onboarding rápido"],
  },
];

// ── UI mock visuals ───────────────────────────────────────────────────────────

function PosMock() {
  const c = "#14B8A6";
  return (
    <div className="bg-[#05101e] rounded-2xl overflow-hidden w-[290px]" style={{ border: `1px solid rgba(13,148,136,0.4)`, boxShadow: `0 0 70px rgba(13,148,136,0.18), 0 20px 60px rgba(0,0,0,0.5)` }}>
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "rgba(13,148,136,0.2)", background: "rgba(13,148,136,0.09)" }}>
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em]" style={{ color: c }}>POS · Mesa 4</span>
        <span className="text-[0.58rem] font-bold px-2 py-0.5 rounded-full" style={{ color: c, background: "rgba(13,148,136,0.15)" }}>3 ítems</span>
      </div>
      <div className="p-4 space-y-2">
        {[["Lomo saltado", "S/35"], ["Ceviche mixto", "S/32"], ["Inca Kola x2", "S/18"]].map(([name, price], i) => (
          <div key={i} className="flex items-center justify-between bg-white/4 rounded-xl px-3 py-2.5">
            <span className="text-[0.75rem] text-white">{name}</span>
            <span className="text-[0.7rem] font-bold text-white/35">{price}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2 px-1">
          <span className="text-[0.65rem] text-[#64748B]">Total</span>
          <span className="text-[0.88rem] font-extrabold text-white">S/ 85.00</span>
        </div>
      </div>
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        <button className="py-2.5 rounded-xl text-[0.68rem] font-bold border" style={{ borderColor: "rgba(13,148,136,0.4)", color: c }}>Dividir</button>
        <button className="py-2.5 rounded-xl text-[0.68rem] font-bold text-[#0F172A]" style={{ background: c }}>Cobrar</button>
      </div>
    </div>
  );
}

function KdsMock() {
  const c = "#F59E0B";
  const orders = [
    { table: "Mesa 4", items: "Lomo · Arroz · Causa", status: "Nuevo", sColor: "#14B8A6", bColor: "rgba(13,148,136,0.55)" },
    { table: "Mesa 2", items: "Ceviche · Chicha", status: "Cocinando", sColor: c, bColor: "rgba(245,158,11,0.55)" },
    { table: "Mesa 7", items: "Anticucho x2", status: "Listo", sColor: "#22C55E", bColor: "rgba(34,197,94,0.55)" },
  ];
  return (
    <div className="bg-[#05101e] rounded-2xl overflow-hidden w-[290px]" style={{ border: `1px solid rgba(245,158,11,0.4)`, boxShadow: `0 0 70px rgba(245,158,11,0.16), 0 20px 60px rgba(0,0,0,0.5)` }}>
      <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.08)" }}>
        <ChefHat className="w-3.5 h-3.5 shrink-0" style={{ color: c }} />
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em]" style={{ color: c }}>Cocina · 5 pendientes</span>
      </div>
      <div className="p-3 space-y-2">
        {orders.map((o, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/3 rounded-xl px-3 py-2.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: o.sColor }} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <div className="text-[0.75rem] font-bold text-white">{o.table}</div>
              <div className="text-[0.6rem] text-[#64748B] truncate">{o.items}</div>
            </div>
            <span className="text-[0.58rem] font-bold uppercase tracking-wide shrink-0" style={{ color: o.sColor }}>{o.status}</span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-[0.62rem] text-[#64748B]">Tiempo promedio</span>
        <span className="text-[0.68rem] font-bold" style={{ color: c }}>12 min</span>
      </div>
    </div>
  );
}

function CajaMock() {
  const c = "#a78bfa";
  return (
    <div className="bg-[#05101e] rounded-2xl overflow-hidden w-[290px]" style={{ border: `1px solid rgba(167,139,250,0.4)`, boxShadow: `0 0 70px rgba(167,139,250,0.16), 0 20px 60px rgba(0,0,0,0.5)` }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(167,139,250,0.2)", background: "rgba(167,139,250,0.08)" }}>
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em]" style={{ color: c }}>Cierre de turno · 18:00</span>
      </div>
      <div className="p-4 space-y-2">
        {[
          { label: "Ventas totales", val: "S/ 2,847", accent: true },
          { label: "Efectivo", val: "S/ 1,240", accent: false },
          { label: "Tarjeta / Culqi", val: "S/ 1,607", accent: false },
          { label: "Diferencia", val: "S/ 0.00 ✓", ok: true },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-white/3 rounded-lg px-3 py-2">
            <span className="text-[0.72rem] text-[#94A3B8]">{item.label}</span>
            <span className="text-[0.78rem] font-bold" style={{ color: item.accent ? c : item.ok ? "#22C55E" : "#94A3B8" }}>{item.val}</span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <button className="w-full py-2.5 rounded-xl text-[0.7rem] font-bold text-[#0F172A]" style={{ background: c }}>Generar Z-Report</button>
      </div>
    </div>
  );
}

function BiMock() {
  const c = "#22d3ee";
  const bars = [55, 42, 68, 51, 85, 100, 73];
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  return (
    <div className="bg-[#05101e] rounded-2xl overflow-hidden w-[290px]" style={{ border: `1px solid rgba(34,211,238,0.4)`, boxShadow: `0 0 70px rgba(34,211,238,0.15), 0 20px 60px rgba(0,0,0,0.5)` }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(34,211,238,0.2)", background: "rgba(34,211,238,0.07)" }}>
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em]" style={{ color: c }}>BI · Esta semana</span>
      </div>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-end gap-1.5 h-[68px]">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? `linear-gradient(to top, ${c}, rgba(34,211,238,0.3))` : "rgba(255,255,255,0.07)" }} />
              <span className="text-[0.5rem] text-[#4B5563]">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 pb-4 grid grid-cols-3 gap-2">
        {[{ label: "Ventas hoy", val: "S/ 847" }, { label: "Ticket prom.", val: "S/ 54" }, { label: "# Órdenes", val: "38" }].map((s, i) => (
          <div key={i} className="bg-white/4 rounded-xl px-2 py-2.5 text-center">
            <div className="text-[0.82rem] font-extrabold text-white">{s.val}</div>
            <div className="text-[0.5rem] text-[#64748B] mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContabMock() {
  const c = "#22C55E";
  return (
    <div className="bg-[#05101e] rounded-2xl overflow-hidden w-[290px]" style={{ border: `1px solid rgba(34,197,94,0.4)`, boxShadow: `0 0 70px rgba(34,197,94,0.15), 0 20px 60px rgba(0,0,0,0.5)` }}>
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.07)" }}>
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em]" style={{ color: c }}>Contabilidad · Abril 2026</span>
        <span className="text-[0.55rem] text-[#64748B] cursor-pointer">← →</span>
      </div>
      <div className="p-4 space-y-2">
        {[
          { label: "Ingresos", val: "+S/ 68,240", color: "#22C55E" },
          { label: "Gastos operativos", val: "-S/ 31,850", color: "#f87171" },
          { label: "Utilidad neta", val: "S/ 36,390", color: c, highlight: true },
        ].map((row, i) => (
          <div key={i} className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${row.highlight ? "bg-white/7" : "bg-white/3"}`}>
            <span className="text-[0.72rem] text-[#94A3B8]">{row.label}</span>
            <span className="text-[0.78rem] font-bold" style={{ color: row.color }}>{row.val}</span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-white/6" />
        <span className="text-[0.55rem] text-[#64748B]">Facturación electrónica activa</span>
        <div className="h-px flex-1 bg-white/6" />
      </div>
    </div>
  );
}

function EmpleadosMock() {
  const c = "#FCD34D";
  const staff = [
    { name: "Juan Ríos", role: "Mesero", hrs: "6h 20m", dot: "#22C55E" },
    { name: "María C.", role: "Cajera", hrs: "6h 45m", dot: "#22C55E" },
    { name: "Pedro S.", role: "Cocinero", hrs: "7h 10m", dot: "#22C55E" },
    { name: "Ana L.", role: "Mesera", hrs: "—", dot: "#64748B" },
  ];
  return (
    <div className="bg-[#05101e] rounded-2xl overflow-hidden w-[290px]" style={{ border: `1px solid rgba(252,211,77,0.4)`, boxShadow: `0 0 70px rgba(252,211,77,0.12), 0 20px 60px rgba(0,0,0,0.5)` }}>
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "rgba(252,211,77,0.2)", background: "rgba(252,211,77,0.07)" }}>
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em]" style={{ color: c }}>Turno · 12:00 → 20:00</span>
        <span className="text-[0.58rem] font-bold text-[#22C55E]">3 activos</span>
      </div>
      <div className="p-3 space-y-2">
        {staff.map((s, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/3 rounded-xl px-3 py-2.5">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.dot }} />
            <div className="flex-1 min-w-0">
              <div className="text-[0.75rem] font-bold text-white">{s.name}</div>
              <div className="text-[0.6rem] text-[#64748B]">{s.role}</div>
            </div>
            <span className="text-[0.62rem] font-mono text-[#64748B]">{s.hrs}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Mocks = [PosMock, KdsMock, CajaMock, BiMock, ContabMock, EmpleadosMock];

// ── Main component ────────────────────────────────────────────────────────────

export default function StickyModules() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track active module via scroll position
  useEffect(() => {
    const update = () => {
      const center = window.innerHeight * 0.5;
      let next = 0;
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        if (top <= center) next = i;
      });
      setActiveIdx(next);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // GSAP entrance animations for right-column sections
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        sectionRefs.current.forEach((el) => {
          if (!el) return;
          gsap.set(el.querySelectorAll(".mod-num, .mod-badge, .mod-title, .mod-desc, .mod-item"), {
            opacity: 1,
            x: 0,
            y: 0,
          });
          // Keep the giant background number subtle as designed.
          gsap.set(el.querySelector(".mod-num"), { opacity: 0.12 });
        });
        return;
      }
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 68%",
            toggleActions: "play none none none",
          },
        });
        tl.fromTo(el.querySelector(".mod-num"), { opacity: 0, x: -24 }, { opacity: 0.12, x: 0, duration: 0.55, ease: "power3.out" })
          .fromTo(el.querySelector(".mod-badge"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.3")
          .fromTo(el.querySelector(".mod-title"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.35")
          .fromTo(el.querySelector(".mod-desc"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
          .fromTo(el.querySelectorAll(".mod-item"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.08 }, "-=0.25");
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="modulos" ref={containerRef} className="bg-[#0F172A]">
      {/* Header */}
      <div className="max-w-[1160px] mx-auto px-8 pt-24 pb-16">
        <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.028em] max-w-[640px] mb-4">
          Un restaurante tiene seis dimensiones.{" "}
          <span className="text-[#14B8A6]">RestHUB las cubre todas.</span>
        </h2>
        <p className="text-[1.05rem] text-[#94A3B8] leading-[1.75] max-w-[520px]">
          Cada módulo opera solo y en conjunto. No hay costuras porque son el mismo sistema.
        </p>
      </div>

      {/* ── Desktop: sticky split ── */}
      <div className="hidden md:flex relative border-t border-white/5">
        {/* Left: sticky mock panel */}
        <div className="w-[48%] sticky top-0 h-screen flex items-center justify-center bg-[#0F172A] border-r border-white/5">
          {/* Progress dots */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
            {modules.map((m, i) => (
              <div
                key={i}
                className="rounded-full transition-[width,height,background-color] duration-400"
                style={{
                  width: activeIdx === i ? "6px" : "4px",
                  height: activeIdx === i ? "22px" : "4px",
                  background: activeIdx === i ? m.color : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>

          {/* Mocks cross-fade */}
          <div className="relative" style={{ width: 290, height: 280 }}>
            {modules.map((m, i) => {
              const Mock = Mocks[i];
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center transition duration-500"
                  style={{
                    opacity: activeIdx === i ? 1 : 0,
                    transform: activeIdx === i ? "scale(1) translateY(0px)" : "scale(0.95) translateY(14px)",
                    pointerEvents: activeIdx === i ? "auto" : "none",
                  }}
                >
                  <Mock />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: scrolling descriptions */}
        <div className="w-[52%]">
          {modules.map((m, i) => (
            <div
              key={i}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="min-h-screen flex items-center px-14 py-20 border-b border-white/4 last:border-b-0"
            >
              <div className="max-w-[460px]">
                <div
                  className="mod-num select-none font-black leading-none tracking-[-0.06em] mb-4"
                  style={{ fontSize: "clamp(4.5rem,9vw,7rem)", color: m.color, opacity: 0.12 }}
                >
                  {m.num}
                </div>
                <span
                  className="mod-badge inline-flex items-center gap-1.5 text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border mb-5"
                  style={{ color: m.color, background: m.colorBg, borderColor: m.colorBorder }}
                >
                  {m.badge}
                </span>
                <h3
                  className="mod-title font-extrabold leading-[1.12] tracking-[-0.025em] mb-5"
                  style={{ fontSize: "clamp(1.7rem,3.2vw,2.5rem)" }}
                >
                  {m.name}
                </h3>
                <p className="mod-desc text-[1.02rem] text-[#94A3B8] leading-[1.8] mb-8">
                  {m.desc}
                </p>
                <ul className="space-y-3">
                  {m.items.map((item) => (
                    <li key={item} className="mod-item flex items-center gap-3 text-[0.9rem] text-white">
                      <Check className="w-4 h-4 shrink-0" strokeWidth={2.5} style={{ color: m.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: simple grid ── */}
      <div className="md:hidden max-w-[1160px] mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modules.map((m, i) => (
          <div key={i} className="bg-white/2 border border-white/8 rounded-2xl p-6">
            <span
              className="inline-flex items-center gap-1.5 text-[0.62rem] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border mb-4"
              style={{ color: m.color, background: m.colorBg, borderColor: m.colorBorder }}
            >
              {m.badge}
            </span>
            <h3 className="text-[1.05rem] font-extrabold mb-2">{m.name}</h3>
            <p className="text-[0.82rem] text-[#94A3B8] leading-[1.65] mb-4">{m.desc}</p>
            <ul className="space-y-2">
              {m.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[0.78rem] text-[#94A3B8]">
                  <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} style={{ color: m.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
