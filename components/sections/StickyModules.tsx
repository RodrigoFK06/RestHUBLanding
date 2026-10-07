import { Monitor, ChefHat, Wallet, BarChart2, BookOpen, Users2 } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";

// Los seis módulos, en una sola vista. Las pantallas reales están en la sección "producto".
const modules = [
  {
    Icon: Monitor,
    name: "Punto de venta (POS)",
    desc: "El mozo toma el pedido por mesa, con combos, modificadores y cuentas divididas.",
    items: ["Mesas y zonas", "Modificadores y combos", "Dividir la cuenta", "Historial por turno"],
  },
  {
    Icon: ChefHat,
    name: "Pantalla de cocina (KDS)",
    desc: "El pedido aparece en cocina apenas se toma. Sin papelitos ni gritos entre el salón y la cocina.",
    items: ["Nuevo, cocinando, listo", "Varias estaciones: cocina, barra, parrilla", "Tiempo de cada pedido"],
  },
  {
    Icon: Wallet,
    name: "Caja y turnos",
    desc: "Apertura, movimientos y cierre de caja. Sabes cuánto debe haber antes de contar el efectivo.",
    items: ["Reporte de cierre automático", "Diferencias de caja", "Yape, Plin, tarjeta y efectivo por separado"],
  },
  {
    Icon: BarChart2,
    name: "Reportes",
    desc: "Ventas del día, platos más vendidos y métodos de pago, sin esperar al lunes ni pedir un Excel.",
    items: ["Ventas en vivo", "Ranking de platos", "Comparación por día y por semana"],
  },
  {
    Icon: BookOpen,
    name: "Contabilidad",
    desc: "Tu contador entra con su propio usuario y cierra el mes sin digitar una sola venta.",
    items: ["Boletas y facturas SUNAT", "Registro de ventas para el SIRE", "Gastos y cuentas por pagar"],
  },
  {
    Icon: Users2,
    name: "Empleados",
    desc: "Cada persona entra con su usuario y ve solo lo que le toca. Queda registro de quién hizo qué.",
    items: ["Asistencia", "Permisos por rol", "Historial de acciones"],
  },
];

export default function StickyModules() {
  return (
    <section id="modulos" className="bg-[#0F172A] py-24 md:py-28 border-t border-white/5">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8">
        <BlurFade>
          <div className="max-w-[620px] mb-14">
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold leading-[1.1] tracking-[-0.028em] mb-4">
              Seis módulos, un solo sistema.
            </h2>
            <p className="text-[1.05rem] text-[#94A3B8] leading-[1.7]">
              Cada módulo funciona por su cuenta, y como comparten los mismos datos, lo que se
              vende en la mesa ya está en la caja y en la contabilidad.
            </p>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {modules.map((m) => (
            <div key={m.name} className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-3 mb-3">
                <m.Icon className="w-5 h-5 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
                <h3 className="text-[1.15rem] font-bold text-white">{m.name}</h3>
              </div>
              <p className="text-[0.98rem] text-[#94A3B8] leading-[1.65] mb-4">{m.desc}</p>
              <ul className="space-y-1.5">
                {m.items.map((item) => (
                  <li key={item} className="text-[0.92rem] text-white/80 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.62em] before:w-1.5 before:h-px before:bg-white/40">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
