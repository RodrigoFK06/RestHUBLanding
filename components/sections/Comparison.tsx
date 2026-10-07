import BlurFade from "@/components/reactbits/BlurFade";

// La comparación que le importa al dueño: contra cómo trabaja hoy, no contra Oracle.
const columns = ["Cuaderno y Excel", "Sistema solo de boletas", "RestHUB"] as const;

const rows: { label: string; values: [string, string, string] }[] = [
  {
    label: "El pedido llega a cocina",
    values: ["En un papelito o a gritos", "En un papelito", "En la pantalla de cocina, al instante"],
  },
  {
    label: "Cierre de caja",
    values: [
      "Se cuenta a mano y se cruza con el cuaderno",
      "Total de boletas del día",
      "Reporte con Yape, Plin, tarjeta y efectivo por separado",
    ],
  },
  {
    label: "Cuánto te deja cada plato",
    values: ["No se sabe", "No se sabe", "Calculado con tus recetas"],
  },
  {
    label: "Inventario",
    values: ["Se cuenta cuando hay tiempo", "No lo lleva", "Se descuenta con cada venta"],
  },
  {
    label: "Tu contador",
    values: ["Recibe fotos y archivos sueltos", "Recibe el reporte de boletas", "Entra con su propio usuario"],
  },
];

export default function Comparison() {
  return (
    <section id="vs" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8">
        <BlurFade>
          <div className="max-w-[620px] mb-12">
            <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-[#0F172A]">
              Cómo cambia el día a día.
            </h2>
            <p className="text-[1.05rem] text-[#475569] leading-[1.7]">
              Comparado con las dos formas más comunes de llevar un restaurante chico: cuaderno y
              Excel, o un sistema que solo emite boletas.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <caption className="sr-only">Comparación entre cuaderno y Excel, un sistema solo de boletas y RestHUB</caption>
              <thead>
                <tr className="border-b-2 border-[#0F172A]">
                  <th scope="col" className="py-3 pr-6 w-[22%]"><span className="sr-only">Tarea</span></th>
                  {columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className={`py-3 px-4 text-[0.95rem] font-bold ${c === "RestHUB" ? "text-[#0F172A] bg-[#F59E0B]/15" : "text-[#475569]"}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-[#E2E8F0]">
                    <th scope="row" className="py-4 pr-6 text-[0.95rem] font-semibold text-[#0F172A] align-top">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td
                        key={i}
                        className={`py-4 px-4 text-[0.95rem] leading-[1.5] align-top ${
                          i === 2 ? "text-[#0F172A] font-medium bg-[#F59E0B]/[0.08]" : "text-[#64748B]"
                        }`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BlurFade>

        {/* Móvil: una tarjeta por tarea, RestHUB siempre visible */}
        <dl className="md:hidden divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
          {rows.map((r) => (
            <div key={r.label} className="py-5">
              <dt className="text-[1rem] font-bold text-[#0F172A] mb-2">{r.label}</dt>
              {r.values.map((v, i) => (
                <dd
                  key={i}
                  className={`text-[0.95rem] leading-[1.5] ${i === 2 ? "mt-2 text-[#0F172A] font-medium" : "text-[#64748B]"}`}
                >
                  <span className="font-semibold">{columns[i]}:</span> {v}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
