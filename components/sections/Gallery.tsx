import Image from "next/image";
import BlurFade from "@/components/reactbits/BlurFade";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop",
    alt: "Salón de restaurante gestionado con RestHUB",
    label: "Salón · POS activo",
    caption: "Órdenes por mesa en tiempo real",
    accent: "border-[#14B8A6]",
    dotColor: "bg-[#14B8A6]",
  },
  {
    src: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=800&q=80&auto=format&fit=crop",
    alt: "Cocina con KDS RestHUB",
    label: "Cocina · KDS integrado",
    caption: "De la comanda a cocina en < 200ms",
    accent: "border-[#F59E0B]",
    dotColor: "bg-[#F59E0B]",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    alt: "Dashboard BI RestHUB en acción",
    label: "BI · Dashboard en vivo",
    caption: "Ventas, métodos y tendencias al instante",
    accent: "border-[#a78bfa]",
    dotColor: "bg-[#a78bfa]",
  },
  {
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80&auto=format&fit=crop",
    alt: "Caja y cierre de turno con RestHUB",
    label: "Caja · Cierre de turno",
    caption: "Z-report exacto. Cada peso cuadra.",
    accent: "border-[#22C55E]",
    dotColor: "bg-[#22C55E]",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-[rgba(13,148,136,0.1)] text-[#14B8A6] border border-[rgba(13,148,136,0.25)] mb-5">
              En operación
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.025em]">
              RestHUB donde más se necesita
            </h2>
            <p className="text-[#94A3B8] mt-4 text-[0.95rem] max-w-[480px] mx-auto leading-[1.7]">
              Desde el salón hasta el cierre de caja — cada módulo diseñado para el ritmo real del restaurante.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <BlurFade key={i} delay={0.07 * i}>
              <div className={`relative rounded-2xl overflow-hidden border ${p.accent} border-opacity-30 shadow-[0_20px_50px_rgba(0,0,0,0.45)] group`}
                style={{ aspectRatio: "3/4" }}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[rgba(15,23,42,0.35)] to-transparent" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.dotColor} animate-pulse`} />
                    <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-white/70">{p.label}</span>
                  </div>
                  <p className="text-[0.78rem] font-semibold text-white leading-snug">{p.caption}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
