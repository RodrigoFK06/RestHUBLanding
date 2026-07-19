"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurFade from "@/components/reactbits/BlurFade";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Editorial photo grid — restaurant lifestyle imagery with parallax depth
// Each photo has a parallax speed (negative = slower than scroll = background effect)
const photos = [
  {
    src: "https://images.unsplash.com/photo-1759299595850-24572dd0d447?w=900&q=80&auto=format&fit=crop",
    alt: "Restaurante de barrio lleno a la hora punta",
    label: "Salón · POS activo",
    caption: "Órdenes en tiempo real",
    accent: "#14B8A6",
    parallaxY: -60, // moves up slower → appears to float
    col: "col-start-1 col-end-2",
    row: "row-start-1 row-end-3",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80&auto=format&fit=crop",
    alt: "Cocina de restaurante trabajando",
    label: "Cocina · KDS integrado",
    caption: "El pedido llega al toque",
    accent: "#F59E0B",
    parallaxY: -40,
    col: "col-start-2 col-end-3",
    row: "row-start-1 row-end-2",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1636552550775-9e6b065d0481?w=700&q=80&auto=format&fit=crop",
    alt: "Plato criollo con pollo y arroz",
    label: "Experiencia · Cliente",
    caption: "Desde la mesa hasta el balance",
    accent: "#a78bfa",
    parallaxY: -80,
    col: "col-start-3 col-end-4",
    row: "row-start-1 row-end-3",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
    alt: "Dashboard BI analytics",
    label: "BI · Dashboard en vivo",
    caption: "Tendencias sin esperar el lunes",
    accent: "#22d3ee",
    parallaxY: -30,
    col: "col-start-2 col-end-3",
    row: "row-start-2 row-end-3",
    aspect: "aspect-[4/3]",
  },
];

// Second "feature strip" — full-bleed horizontal images like Square's testimonial row
const featureStrip = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=75&auto=format&fit=crop",
    label: "Gestión de Salón",
    stat: "12 mesas activas",
    bg: "from-[#0F172A]",
  },
  {
    src: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=75&auto=format&fit=crop",
    label: "Cocina en Vivo",
    stat: "Órdenes sincronizadas",
    bg: "from-[#0F172A]",
  },
  {
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=75&auto=format&fit=crop",
    label: "Control de Caja",
    stat: "Cierre exacto, siempre",
    bg: "from-[#0F172A]",
  },
];

export default function EditorialGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        const cards = gridRef.current?.querySelectorAll(".grid-card");
        if (cards?.length) gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        const inner = el.querySelector(".parallax-inner");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { y: 0 },
          {
            y: photos[i].parallaxY,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Slide in grid items from below
      const cards = gridRef.current?.querySelectorAll(".grid-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: gridRef }
  );

  return (
    <section className="bg-[#0F172A] pb-0">
      {/* ── Eyebrow ── */}
      <div className="max-w-[1160px] mx-auto px-8 pt-24 pb-14">
        <BlurFade>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] max-w-[600px]">
            RestHUB donde más se necesita.{" "}
            <span style={{ color: "#14B8A6" }}>En la operación real.</span>
          </h2>
        </BlurFade>
      </div>

      {/* ── Masonry-style editorial grid ── */}
      <div
        ref={gridRef}
        className="max-w-[1160px] mx-auto px-8 grid gap-4 mb-6"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto" }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            ref={(el) => { imgRefs.current[i] = el; }}
            className={`grid-card relative overflow-hidden rounded-2xl group ${photo.col} ${photo.row} ${photo.aspect}`}
            style={{ border: `1px solid rgba(255,255,255,0.06)` }}
          >
            {/* Parallax image wrapper — slightly taller than container */}
            <div
              className="parallax-inner absolute inset-0 w-full"
              style={{ height: "130%", top: "-15%" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

            {/* Accent line at top */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: `linear-gradient(90deg, transparent, ${photo.accent}, transparent)` }}
            />

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: photo.accent }} />
                <span className="text-[0.58rem] font-bold tracking-[0.18em] uppercase" style={{ color: `${photo.accent}cc` }}>
                  {photo.label}
                </span>
              </div>
              <p className="text-[0.85rem] font-semibold text-white leading-snug">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Feature strip — 3 full-bleed horizontal panels ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-0">
        {featureStrip.map((item, i) => (
          <div key={i} className="relative overflow-hidden group" style={{ aspectRatio: "4/3" }}>
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Dark overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${item.bg}/80 via-black/30 to-transparent`} />
            {/* Hover border */}
            <div className="absolute inset-0 border border-transparent group-hover:border-white/10 transition-colors duration-400 rounded-none" />

            {/* Label */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-white/50 mb-1">{item.label}</p>
              <p className="text-[1.1rem] font-extrabold text-white leading-tight">{item.stat}</p>
            </div>

            {/* Hover reveal — thin bottom line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] translate-y-full group-hover:translate-y-0 transition-transform duration-400"
              style={{ background: "linear-gradient(90deg, #14B8A6, #F59E0B)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
