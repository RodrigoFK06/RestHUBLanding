import BlurFade from "@/components/reactbits/BlurFade";

// Esto sí es una secuencia (día 1, 2 y 3), por eso va numerado.
const steps = [
  {
    day: "Día 1",
    title: "Demo",
    desc: "Una llamada de 15 minutos. Te mostramos el sistema y vemos si encaja con cómo trabaja tu local.",
    items: ["El recorrido completo, de la mesa al cierre de caja", "Respondemos todas tus preguntas"],
  },
  {
    day: "Días 1 y 2",
    title: "Configuración",
    desc: "Cargamos tu carta, tus mesas y los usuarios de tu equipo. Tú solo revisas que esté bien.",
    items: ["Carta, precios y modificadores", "Un usuario para cada persona", "Impresoras y pantalla de cocina", "Yape, Plin y boletas activos"],
  },
  {
    day: "Día 3",
    title: "Primer turno",
    desc: "Abres con RestHUB. Estamos en línea durante el primer servicio para ajustar lo que haga falta.",
    items: ["Primer cierre de caja con nosotros", "Ajustes el mismo día"],
  },
];

export default function Setup() {
  return (
    <section id="setup" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8">
        <BlurFade>
          <div className="max-w-[600px] mb-14">
            <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-[#0F172A]">
              Funcionando en tres días.
            </h2>
            <p className="text-[1.05rem] text-[#475569] leading-[1.7]">
              La configuración la hacemos con tu equipo y está incluida en todos los planes.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <ol className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-[#0F172A] pt-5">
                <p className="text-[0.9rem] font-semibold text-[#B45309] mb-1">
                  {i + 1}. {s.day}
                </p>
                <h3 className="text-[1.2rem] font-bold text-[#0F172A] mb-2">{s.title}</h3>
                <p className="text-[0.98rem] text-[#475569] leading-[1.6] mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="text-[0.92rem] text-[#334155] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.62em] before:w-1.5 before:h-px before:bg-[#94A3B8]">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </BlurFade>

      </div>
    </section>
  );
}
