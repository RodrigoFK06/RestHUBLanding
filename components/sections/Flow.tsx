import BlurFade from "@/components/reactbits/BlurFade";

// Un pedido de principio a fin. Esto sí es una secuencia, por eso va numerado.
const steps = [
  {
    name: "Mesa",
    desc: "El mozo toma el pedido en el celular o la tablet, con modificadores y combos.",
    who: "Mozo",
  },
  {
    name: "Cocina",
    desc: "El pedido aparece en la pantalla de cocina. El cocinero ve solo lo que tiene que preparar.",
    who: "Cocinero",
  },
  {
    name: "Caja",
    desc: "El cajero cobra, emite la boleta y al final del turno cierra con el reporte de caja.",
    who: "Cajero",
  },
  {
    name: "Contabilidad",
    desc: "El contador ve las ventas, gastos y el balance sin pedirle datos a nadie.",
    who: "Contador",
  },
];

export default function Flow() {
  return (
    <section id="flujo" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8">
        <BlurFade>
          <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#0F172A] max-w-[560px] mb-14">
            Un pedido, de la mesa a la contabilidad.
          </h2>
        </BlurFade>

        <BlurFade delay={0.1}>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {steps.map((s, i) => (
              <li key={s.name} className="border-t-2 border-[#0F172A] pt-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[0.95rem] font-bold text-[#B45309] tabular-nums">{i + 1}</span>
                  <h3 className="text-[1.15rem] font-bold text-[#0F172A]">{s.name}</h3>
                </div>
                <p className="text-[0.98rem] text-[#475569] leading-[1.6] mb-3">{s.desc}</p>
                <p className="text-[0.88rem] text-[#64748B]">Lo usa: {s.who}</p>
              </li>
            ))}
          </ol>
        </BlurFade>
      </div>
    </section>
  );
}
