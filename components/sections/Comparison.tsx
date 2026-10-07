import { Check, Minus, X } from "lucide-react";

// «Cómo cambia el día a día» (docs/diseno/decisiones.md · D14). Contra cómo trabaja hoy el
// restaurante, no contra marcas que no venden en Perú. La columna de RestHUB es una sola copia
// menta que corre de arriba abajo; las otras dos formas quedan en gris con su marca.

type Celda = { texto: string; ok: boolean | "a medias" };

const FILAS: { tarea: string; resthub: string; cuaderno: Celda; boletas: Celda }[] = [
  { tarea: "El pedido llega a cocina", resthub: "En la pantalla de cocina, al instante", cuaderno: { texto: "Papelito o a gritos", ok: false }, boletas: { texto: "Papelito", ok: false } },
  { tarea: "Cierre de caja", resthub: "Yape, Plin, tarjeta y efectivo por separado", cuaderno: { texto: "Se cuenta a mano", ok: "a medias" }, boletas: { texto: "Solo el total de boletas", ok: "a medias" } },
  { tarea: "Cuánto te deja cada plato", resthub: "Calculado con tus recetas", cuaderno: { texto: "No se sabe", ok: false }, boletas: { texto: "No se sabe", ok: false } },
  { tarea: "Inventario", resthub: "Se descuenta con cada venta", cuaderno: { texto: "Se cuenta cuando hay tiempo", ok: "a medias" }, boletas: { texto: "No lo lleva", ok: false } },
  { tarea: "Boletas y facturas SUNAT", resthub: "Desde la caja, al cobrar", cuaderno: { texto: "Aparte", ok: false }, boletas: { texto: "Sí", ok: true } },
  { tarea: "Tu contador", resthub: "Entra con su propio usuario", cuaderno: { texto: "Recibe fotos y archivos sueltos", ok: false }, boletas: { texto: "Recibe el reporte de boletas", ok: "a medias" } },
];

function Marca({ ok }: { ok: Celda["ok"] }) {
  if (ok === true)
    return (
      <>
        <Check className="mt-1 size-4 shrink-0 text-menta" strokeWidth={2.75} aria-hidden="true" />
        <span className="sr-only">Sí:</span>
      </>
    );
  if (ok === "a medias")
    return (
      <>
        <Minus className="mt-1 size-4 shrink-0 text-ambar" strokeWidth={2.75} aria-hidden="true" />
        <span className="sr-only">A medias:</span>
      </>
    );
  return (
    <>
      <X className="mt-1 size-4 shrink-0 text-texto-3" strokeWidth={2.75} aria-hidden="true" />
      <span className="sr-only">No:</span>
    </>
  );
}

export default function Comparison() {
  return (
    <section id="vs" className="bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-end lg:gap-14">
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            Cómo cambia
            <span className="block text-menta">el día a día.</span>
          </h2>
          <p className="max-w-[46ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            Comparado con las dos formas más comunes de llevar un restaurante chico: cuaderno y Excel, o un sistema que solo emite boletas.
          </p>
        </header>

        {/* ── Escritorio: tabla con la columna de RestHUB en copia menta ── */}
        <div className="relative mt-12 hidden lg:mt-16 lg:block">
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 top-0 w-[30%] rounded-[3px] bg-copia-cocina shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)]"
          />
          <table className="relative w-full table-fixed border-collapse text-left">
            <caption className="sr-only">RestHUB comparado con cuaderno y Excel, y con un sistema solo de boletas</caption>
            <colgroup>
              <col className="w-[24%]" />
              <col className="w-[23%]" />
              <col className="w-[23%]" />
              <col className="w-[30%]" />
            </colgroup>
            <thead>
              <tr className="text-[12px] font-extrabold uppercase tracking-[0.04em]">
                <th scope="col" className="pb-4 pt-6 pr-6 text-texto-3">
                  En tu restaurante
                </th>
                <th scope="col" className="pb-4 pt-6 pr-6 text-texto-3">
                  Cuaderno y Excel
                </th>
                <th scope="col" className="pb-4 pt-6 pr-6 text-texto-3">
                  Sistema solo de boletas
                </th>
                <th scope="col" className="px-6 pb-4 pt-6 text-menta-oscura">
                  <span className="display-cond text-[26px] normal-case leading-none tracking-normal text-mostrador">Con RestHUB</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {FILAS.map((f) => (
                <tr key={f.tarea} className="border-t border-linea">
                  <th scope="row" className="py-5 pr-6 align-top">
                    <span className="display-cond text-[26px] uppercase leading-[0.95]">{f.tarea}</span>
                  </th>
                  <td className="py-5 pr-6 align-top text-[17px] leading-snug text-texto-2">
                    <span className="flex gap-2.5">
                      <Marca ok={f.cuaderno.ok} />
                      {f.cuaderno.texto}
                    </span>
                  </td>
                  <td className="py-5 pr-6 align-top text-[17px] leading-snug text-texto-2">
                    <span className="flex gap-2.5">
                      <Marca ok={f.boletas.ok} />
                      {f.boletas.texto}
                    </span>
                  </td>
                  <td className="border-t border-menta-oscura/25 px-6 py-5 align-top text-[17px] font-bold leading-snug text-mostrador">
                    <span className="flex gap-2.5">
                      <Check className="mt-1 size-4 shrink-0 text-menta-oscura" strokeWidth={3} aria-hidden="true" />
                      {f.resthub}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Celular: un bloque por tarea ── */}
        <ul className="mt-10 lg:hidden">
          {FILAS.map((f) => (
            <li key={f.tarea} className="border-t border-linea py-6">
              <h3 className="display-cond text-[26px] uppercase leading-[0.95]">{f.tarea}</h3>
              <p className="comanda-papel mt-3 flex gap-2.5 rounded-[3px] bg-copia-cocina px-4 py-3 text-[17px] font-bold leading-snug text-mostrador">
                <Check className="mt-1 size-4 shrink-0 text-menta-oscura" strokeWidth={3} aria-hidden="true" />
                <span>
                  <span className="sr-only">Con RestHUB: </span>
                  {f.resthub}
                </span>
              </p>
              <ul className="mt-3 space-y-2 text-[15px] leading-snug text-texto-2">
                <li className="flex gap-2.5">
                  <Marca ok={f.cuaderno.ok} />
                  <span>
                    <strong className="font-semibold text-white">Cuaderno y Excel: </strong>
                    {f.cuaderno.texto}
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <Marca ok={f.boletas.ok} />
                  <span>
                    <strong className="font-semibold text-white">Solo boletas: </strong>
                    {f.boletas.texto}
                  </span>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
