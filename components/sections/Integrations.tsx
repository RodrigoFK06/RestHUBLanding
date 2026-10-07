import BlurFade from "@/components/reactbits/BlurFade";

// Solo lo que hoy está conectado en el sistema. Si se suma algo nuevo, se agrega aquí.
const groups = [
  {
    title: "Cobros",
    items: [
      { name: "Yape y Plin", desc: "Cobro por QR en la mesa o en caja." },
      { name: "Izipay", desc: "El cobro con tarjeta en el POS físico entra directo a la caja." },
      { name: "Culqi", desc: "Cobros con tarjeta en línea." },
      { name: "Visa y Mastercard", desc: "Cada pago queda registrado con su método." },
    ],
  },
  {
    title: "SUNAT",
    items: [
      { name: "Boletas y facturas electrónicas", desc: "Se emiten desde la caja al cobrar." },
      { name: "SIRE", desc: "El registro de ventas sale del sistema, sin exportar archivos ni digitar." },
    ],
  },
];

export default function Integrations() {
  return (
    <section id="integraciones" className="py-24 bg-[#0F172A] border-t border-white/5">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 md:gap-16">
        <BlurFade>
          <div className="max-w-[440px]">
            <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4">
              Conectado con lo que tu restaurante ya usa.
            </h2>
            <p className="text-[1.05rem] text-[#94A3B8] leading-[1.7]">
              Los cobros y la facturación electrónica vienen incluidos. No tienes que contratar
              otro sistema para emitir boletas.
            </p>
          </div>
        </BlurFade>

        <div className="grid sm:grid-cols-2 gap-10">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-[0.95rem] font-bold text-[#F59E0B] mb-4">{g.title}</h3>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {g.items.map((it) => (
                  <div key={it.name} className="py-4">
                    <dt className="text-[1rem] font-semibold text-white">{it.name}</dt>
                    <dd className="text-[0.92rem] text-[#94A3B8] leading-[1.55] mt-1">{it.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
