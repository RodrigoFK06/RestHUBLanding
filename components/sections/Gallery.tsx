import Image from "next/image";
import BlurFade from "@/components/reactbits/BlurFade";

const shots = [
  {
    src: "/screenshots/shot-dashboard.jpg",
    alt: "Dashboard de RestHUB con ventas del período en soles y mix de cobro Yape, Plin, efectivo y tarjeta",
    label: "Resumen del turno",
    caption: "Cuánto vendiste y cuánto entró por Yape, Plin o efectivo, en vivo y sin pedir reportes.",
    dotColor: "bg-[#14B8A6]",
  },
  {
    src: "/screenshots/shot-pos.jpg",
    alt: "Toma de pedido por mesa en el POS de RestHUB",
    label: "Toma de pedido",
    caption: "El mozo marca el pedido por mesa y va directo a cocina. Sin papelitos.",
    dotColor: "bg-[#F59E0B]",
  },
  {
    src: "/screenshots/shot-kds.jpg",
    alt: "Pantalla de cocina KDS de RestHUB con comandas en tiempo real",
    label: "Pantalla de cocina",
    caption: "El cocinero ve cada pedido al instante y marca cuándo está listo.",
    dotColor: "bg-[#a78bfa]",
  },
  {
    src: "/screenshots/shot-caja.jpg",
    alt: "Módulo de caja y finanzas de RestHUB con movimientos de ingresos y egresos",
    label: "Caja y finanzas",
    caption: "Cada sol que entra y sale, registrado. La caja cuadra sola al cierre.",
    dotColor: "bg-[#22C55E]",
  },
];

export default function Gallery() {
  return (
    <section id="producto" className="py-24 bg-[#0F172A]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.025em]">
              Así se ve por dentro.{" "}
              <span className="text-[#14B8A6]">Sin maquetas.</span>
            </h2>
            <p className="text-[#94A3B8] mt-4 text-[0.98rem] max-w-[520px] mx-auto leading-[1.7]">
              Estas son pantallas reales del sistema funcionando, el mismo que verías
              operando en tu restaurante.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {shots.map((p, i) => (
            <BlurFade key={i} delay={0.07 * i}>
              <figure className="group">
                <div
                  className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                  style={{ aspectRatio: "16/9", background: "#F8FAFC" }}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="px-1.5 pt-3.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.dotColor}`} />
                    <span className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/60">{p.label}</span>
                  </div>
                  <p className="text-[0.85rem] text-[#94A3B8] leading-snug">{p.caption}</p>
                </figcaption>
              </figure>
            </BlurFade>
          ))}
        </div>

        {/* Live demo CTA */}
        <BlurFade delay={0.2}>
          <div className="text-center">
            <a
              href="https://rest-hub.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
            >
              Entra a la demo en vivo →
            </a>
            <p className="text-[0.78rem] text-[#64748B] mt-3.5">
              Tócala tú mismo, desde tu celular o tu laptop. Sin agendar nada.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
