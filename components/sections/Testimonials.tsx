"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import Counter from "@/components/reactbits/Counter";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Antes usábamos tres sistemas distintos. Ahora con RestHUB todo habla solo. El KDS cambió cómo trabaja mi cocina — ya no hay confusiones ni pérdidas de órdenes.",
    name: "Carlos Mendoza",
    role: "Propietario",
    restaurant: "La Mar Cebichería",
    location: "Lima, Perú",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&q=80&auto=format&fit=crop&crop=face",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop",
    accent: "#14B8A6",
    stat: "−80% errores de comanda",
  },
  {
    quote:
      "El cierre de caja antes me tomaba 40 minutos. Ahora aprieto un botón. El contador tiene acceso directo y la facturación electrónica sale sola. Increíble.",
    name: "Sofía Herrera",
    role: "Administradora",
    restaurant: "Bistró 365",
    location: "Bogotá, Colombia",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80&auto=format&fit=crop&crop=face",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop",
    accent: "#F59E0B",
    stat: "40 min → 2 min en cierre",
  },
  {
    quote:
      "Gestiono 3 locales desde un solo panel. El BI me muestra en tiempo real qué local está rindiendo y cuál necesita atención. Eso antes era imposible sin un equipo entero.",
    name: "Ricardo Torres",
    role: "Director de Operaciones",
    restaurant: "Grupo Fuego",
    location: "Santiago, Chile",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop&crop=face",
    photo: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80&auto=format&fit=crop",
    accent: "#14B8A6",
    stat: "3 locales, 1 panel",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance solo en móvil (carousel visible). En desktop el grid muestra los 3.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      // Si el contenedor no es scroll-horizontal (desktop md+), no hacer nada
      if (el.scrollWidth <= el.clientWidth + 8) return;
      const next = (activeIdx + 1) % testimonials.length;
      const card = el.children[next] as HTMLElement | undefined;
      card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 5500);
    return () => window.clearInterval(id);
  }, [activeIdx, paused]);

  // Detecta scroll para actualizar el dot activo
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < el.children.length; i++) {
        const c = el.children[i] as HTMLElement;
        const cCenter = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActiveIdx(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".testi-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".testi-headline",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="testimonios" className="bg-black py-28 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-8">

        {/* ── Big social proof stat ── */}
        <div className="testi-headline text-center mb-20">
          <div className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.14)", color: "rgba(148,163,184,0.6)" }}>
            Restaurantes que ya operan con RestHUB
          </div>

          <div className="flex items-end justify-center gap-4 mb-6">
            <div className="text-[clamp(5rem,12vw,9rem)] font-black leading-none text-white flex items-end gap-0">
              <Counter value={40} fontSize={96} places={[10, 1]} fontWeight={900} />
              <span className="text-[clamp(5rem,12vw,9rem)] font-black leading-none">+</span>
            </div>
            <div className="pb-4 text-left">
              <p className="text-[clamp(1.1rem,2vw,1.5rem)] font-bold text-white/80 leading-tight">restaurantes<br />en Latinoamérica</p>
            </div>
          </div>

          <p className="text-base text-white/40 max-w-[480px] mx-auto">
            Desde cebicherías en Lima hasta grupos multi-local en Chile y Colombia.
          </p>
        </div>

        {/* ── Testimonial cards (mobile: carousel, desktop: grid) ── */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth -mx-8 md:mx-0 px-8 md:px-0 pb-2 md:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testi-card group relative flex flex-col rounded-2xl overflow-hidden snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto md:shrink"
              style={{
                background: "rgba(15,23,42,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                opacity: 0,
              }}
            >
              {/* Photo top */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={t.photo}
                  alt={t.restaurant}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                {/* Stat chip */}
                <div
                  className="absolute bottom-3 left-4 text-[0.6rem] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${t.accent}20`, border: `1px solid ${t.accent}50`, color: t.accent }}
                >
                  {t.stat}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-[0.9rem] text-white/75 leading-[1.75] italic flex-1 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-bold text-white leading-tight">{t.name}</p>
                    <p className="text-[0.68rem] text-white/45">{t.role} · {t.restaurant}</p>
                    <p className="text-[0.62rem] text-white/30">{t.location}</p>
                  </div>
                  {/* Accent dot */}
                  <div
                    className="ml-auto w-2 h-2 rounded-full shrink-0"
                    style={{ background: t.accent, boxShadow: `0 0 8px ${t.accent}` }}
                  />
                </div>
              </div>

              {/* Hover bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] translate-y-full group-hover:translate-y-0 transition-transform duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Dots — solo mobile */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              className="transition-all rounded-full cursor-pointer"
              style={{
                width: i === activeIdx ? 22 : 6,
                height: 6,
                background: i === activeIdx ? "#F59E0B" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>

        <style>{`
          .testi-card { scroll-snap-align: center; }
          /* Hide scrollbar across browsers */
          [class*="overflow-x-auto"]::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Trust strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            { val: "4.9/5", label: "Satisfacción promedio" },
            { val: "< 1 sem", label: "Tiempo de implementación" },
            { val: "98%", label: "Uptime garantizado" },
            { val: "0", label: "Contratos de permanencia" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-extrabold text-white">{s.val}</div>
              <div className="text-[0.62rem] text-white/35 uppercase tracking-[0.12em]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
