import { Check } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";

// Qué ve cada rol. Una tabla dice más que seis paneles animados.
const areas = ["Pedidos", "Cocina", "Caja", "Reportes", "Contabilidad", "Empleados"] as const;
type Area = (typeof areas)[number];

const roles: { name: string; desc: string; sees: Area[] }[] = [
  {
    name: "Dueño o administrador",
    desc: "Ve todo y configura el sistema.",
    sees: ["Pedidos", "Cocina", "Caja", "Reportes", "Contabilidad", "Empleados"],
  },
  {
    name: "Mozo",
    desc: "Sus mesas y sus pedidos. No ve plata ni configuración.",
    sees: ["Pedidos"],
  },
  {
    name: "Cajero",
    desc: "Cobra y cierra su turno. No ve los reportes del negocio.",
    sees: ["Pedidos", "Caja"],
  },
  {
    name: "Cocinero",
    desc: "Solo los pedidos que tiene que preparar, en orden.",
    sees: ["Cocina"],
  },
  {
    name: "Contador",
    desc: "Ventas, gastos y balance. No toca la operación.",
    sees: ["Reportes", "Contabilidad"],
  },
];

export default function ExpandingRoles() {
  return (
    <section id="roles" className="py-24 bg-[#1E293B]">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8">
        <BlurFade>
          <div className="max-w-[600px] mb-12">
            <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4">
              Cada uno ve solo lo suyo.
            </h2>
            <p className="text-[1.05rem] text-[#94A3B8] leading-[1.7]">
              Cada persona entra con su propio usuario. El cocinero no ve cuánto vendiste y el
              contador no puede anular un pedido.
            </p>
          </div>
        </BlurFade>

        {/* Desktop: matriz de accesos */}
        <BlurFade delay={0.1}>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Qué módulos ve cada rol en RestHUB</caption>
              <thead>
                <tr className="border-b border-white/15">
                  <th scope="col" className="py-3 pr-6 text-[0.9rem] font-semibold text-[#94A3B8]">Rol</th>
                  {areas.map((a) => (
                    <th key={a} scope="col" className="py-3 px-3 text-[0.9rem] font-semibold text-[#94A3B8] text-center">
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.name} className="border-b border-white/10">
                    <th scope="row" className="py-5 pr-6 align-top font-normal">
                      <div className="text-[1.02rem] font-bold text-white">{r.name}</div>
                      <div className="text-[0.9rem] text-[#94A3B8] mt-1">{r.desc}</div>
                    </th>
                    {areas.map((a) => (
                      <td key={a} className="py-5 px-3 text-center align-middle">
                        {r.sees.includes(a) ? (
                          <Check className="w-5 h-5 text-[#F59E0B] inline-block" strokeWidth={2.5} aria-label="Sí" />
                        ) : (
                          <span className="text-white/20" aria-label="No">–</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BlurFade>

        {/* Móvil: lista */}
        <ul className="md:hidden divide-y divide-white/10 border-y border-white/10">
          {roles.map((r) => (
            <li key={r.name} className="py-5">
              <div className="text-[1.02rem] font-bold text-white">{r.name}</div>
              <div className="text-[0.95rem] text-[#94A3B8] mt-1">{r.desc}</div>
              <div className="text-[0.9rem] text-white/80 mt-2">Ve: {r.sees.join(", ")}</div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[0.95rem] text-[#94A3B8] max-w-[640px]">
          Si quieres, tus clientes también pueden pedir solos desde el QR de la mesa o un kiosko
          de autoservicio. El pedido llega a cocina igual que si lo tomara un mozo.
        </p>
      </div>
    </section>
  );
}
