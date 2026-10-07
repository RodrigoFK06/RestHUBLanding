"use client";

import { useState } from "react";
import { Check } from "lucide-react";

// «Cada uno con su pantalla» (docs/diseno/decisiones.md · D12). El cuadro de accesos impreso:
// cada rol del restaurante ve solo lo suyo. Reúne el interludio de roles y ExpandingRoles.

const AREAS = ["Pedidos", "Cocina", "Caja y turnos", "Reportes", "Contabilidad", "Empleados", "Autoservicio"] as const;
type Area = (typeof AREAS)[number];

type Rol = {
  nombre: string;
  acceso: string;
  descripcion: string;
  ve: Partial<Record<Area, "todo" | "propio">>;
};

const ROLES: Rol[] = [
  {
    nombre: "Admin",
    acceso: "Control total",
    descripcion: "Configuración, reportes y acceso completo a todos los módulos del sistema. El único que lo ve todo.",
    ve: { Pedidos: "todo", Cocina: "todo", "Caja y turnos": "todo", Reportes: "todo", Contabilidad: "todo", Empleados: "todo", Autoservicio: "todo" },
  },
  {
    nombre: "Mozo",
    acceso: "Operación de salón",
    descripcion: "Mesas, órdenes e historial propio. Sin acceso a información financiera ni configuración.",
    ve: { Pedidos: "propio" },
  },
  {
    nombre: "Cajero",
    acceso: "Pagos y turnos",
    descripcion: "Caja, pagos y turnos. Cobra sin gestionar empleados ni ver reportes financieros.",
    ve: { Pedidos: "todo", "Caja y turnos": "todo" },
  },
  {
    nombre: "Cocinero",
    acceso: "Solo lo necesario",
    descripcion: "Pantalla de cocina exclusiva. Solo ve lo que necesita preparar y en qué orden. Nada más.",
    ve: { Cocina: "todo" },
  },
  {
    nombre: "Contador",
    acceso: "Panel financiero",
    descripcion: "Balance, facturas y reportes. Datos limpios sin molestar al equipo ni pedir exports.",
    ve: { Reportes: "todo", Contabilidad: "todo" },
  },
  {
    nombre: "Cliente",
    acceso: "Autoservicio",
    descripcion: "Panel de autoservicio y seguimiento de pedido. Módulo opcional según el modelo.",
    ve: { Autoservicio: "todo" },
  },
];

function Marca({ valor }: { valor?: "todo" | "propio" }) {
  if (valor === "todo")
    return (
      <>
        <Check className="mx-auto size-5 text-tinta" strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">Sí</span>
      </>
    );
  if (valor === "propio") return <span className="text-[15px] font-semibold italic text-tinta">solo lo suyo</span>;
  return (
    <>
      <span className="text-impreso" aria-hidden="true">
        —
      </span>
      <span className="sr-only">No</span>
    </>
  );
}

export default function ExpandingRoles() {
  const [elegido, setElegido] = useState(1);
  const rol = ROLES[elegido];

  return (
    <section id="roles" className="bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-end lg:gap-14">
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            Un restaurante no es solo una cocina.
            <span className="block text-menta">Cada uno con su pantalla.</span>
          </h2>
          <p className="max-w-[46ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            <strong className="font-semibold text-white">Mozo, cocinero, cajero, contador: cada uno con su realidad.</strong> RestHUB le
            da a cada persona su propia pantalla. Cuando todos ven todo, se arma el desorden y se pierde plata.
          </p>
        </header>

        {/* ── Escritorio: el cuadro de accesos impreso ── */}
        <div className="comanda-papel mt-12 hidden bg-papel text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] md:block lg:mt-16">
          <div aria-hidden="true" className="comanda-troquel h-3" />
          <div className="px-6 pb-6 pt-2 lg:px-8">
            <div className="flex items-end justify-between gap-4 border-b-2 border-mostrador pb-2.5">
              <span className="display-cond text-[26px] uppercase leading-none">Cuadro de accesos</span>
              <span className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">Elige un rol</span>
            </div>
            <table className="mt-2 w-full border-collapse text-left">
              <caption className="sr-only">Qué ve cada rol en RestHUB</caption>
              <thead>
                <tr className="border-b border-papel-linea text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                  <th scope="col" className="py-3 pr-4 font-extrabold">
                    Rol
                  </th>
                  {AREAS.map((a) => (
                    <th key={a} scope="col" className="px-2 py-3 text-center font-extrabold">
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r, i) => {
                  const activo = i === elegido;
                  return (
                    <tr key={r.nombre} className={`border-b border-papel-linea transition-colors ${activo ? "bg-copia-cocina" : ""}`}>
                      <th scope="row" className="py-1 pr-4 font-normal">
                        <button
                          type="button"
                          onClick={() => setElegido(i)}
                          aria-pressed={activo}
                          aria-controls="rol-detalle"
                          className="flex min-h-12 w-full cursor-pointer flex-col items-start justify-center rounded-[3px] px-2 text-left"
                        >
                          <span className="display-cond text-[26px] uppercase leading-none">{r.nombre}</span>
                          <span className="text-[15px] font-semibold text-impreso">{r.acceso}</span>
                        </button>
                      </th>
                      {AREAS.map((a) => (
                        <td key={a} className="px-2 py-3 text-center">
                          <Marca valor={r.ve[a]} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p id="rol-detalle" aria-live="polite" className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[17px] leading-[1.5]">
              <span className="display-cond text-[26px] uppercase leading-none">{rol.nombre}</span>
              <span>{rol.descripcion}</span>
            </p>
          </div>
        </div>

        {/* ── Celular: una tira de papel por rol ── */}
        <ul className="mt-10 space-y-3 md:hidden">
          {ROLES.map((r) => {
            const areas = AREAS.filter((a) => r.ve[a]);
            return (
              <li key={r.nombre} className="comanda-papel rounded-[3px] bg-papel px-4 pb-4 pt-3.5 text-mostrador">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="display-cond text-[26px] uppercase leading-none">{r.nombre}</span>
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">{r.acceso}</span>
                </div>
                <p className="mt-2 text-[15px] leading-snug">{r.descripcion}</p>
                <p className="mt-3 border-t border-dashed border-impreso pt-2.5 text-[15px] font-semibold italic text-tinta">
                  Ve: {areas.map((a) => (r.ve[a] === "propio" ? `${a.toLowerCase()} (solo lo suyo)` : a.toLowerCase())).join(", ")}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
