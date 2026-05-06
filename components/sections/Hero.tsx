"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Zap, DollarSign } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";
import SplitWords from "@/components/reactbits/SplitWords";
import { useModals } from "@/components/modals/ModalProvider";

// Video sources — free stock from Pexels CDN (no auth needed)
const VIDEO_SRC = "https://videos.pexels.com/video-files/3252960/3252960-uhd_2560_1440_25fps.mp4";
const VIDEO_POSTER = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=60&auto=format&fit=crop";

// Floating stat cards that drift in from below
const floatCards = [
  {
    style: { bottom: "18%", left: "5%" },
    anim: "float-c1 5s ease-in-out infinite",
    icon: <Zap className="w-4 h-4 text-[#14B8A6]" strokeWidth={2} />,
    iconBg: "rgba(13,148,136,0.2)",
    label: "Comanda → Cocina",
    value: "< 200ms",
    valueColor: "#14B8A6",
  },
  {
    style: { top: "28%", right: "6%" },
    anim: "float-c2 6s ease-in-out 1s infinite",
    icon: <DollarSign className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />,
    iconBg: "rgba(245,158,11,0.2)",
    label: "Caja cerrada · hoy",
    value: "S/ 2,847 ✓",
    valueColor: "#F59E0B",
  },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { openContact } = useModals();

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});
  }, []);

  const handleAnchor = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* ── FULL-BLEED VIDEO ─────────────────────────────── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: videoLoaded ? 1 : 0 }}
      />

      {/* Fallback poster while video loads */}
      {!videoLoaded && (
        <Image
          src={VIDEO_POSTER}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}

      {/* Cinematic overlays */}
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-black/52" />
      {/* Bottom dark fade */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 45%, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />
      {/* Teal tint left */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 0% 55%, rgba(13,148,136,0.22) 0%, transparent 60%)" }} />
      {/* Amber tint right */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 100% 30%, rgba(245,158,11,0.16) 0%, transparent 55%)" }} />

      {/* ── CENTERED HERO TEXT ───────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[900px]">

        {/* Eyebrow badge */}
        <BlurFade delay={0}>
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: "#F59E0B" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#F59E0B" }} />
            v1.0 · Latinoamérica · 2026
          </div>
        </BlurFade>

        {/* Giant headline — word-split with GSAP */}
        <h1 className="text-[clamp(3.2rem,7.5vw,6.5rem)] font-black leading-[0.97] tracking-[-0.04em] text-white mb-6">
          <span className="block">
            <SplitWords text="Tu restaurante," delay={0.1} stagger={0.055} />
          </span>
          <span className="block" style={{ color: "#F59E0B", fontFamily: "var(--font-display)", fontStyle: "italic", letterSpacing: "-0.02em" }}>
            <SplitWords text="bajo control." delay={0.38} stagger={0.065} />
          </span>
        </h1>

        {/* Animated rotating sub-word */}
        <BlurFade delay={0.7}>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-white/65 leading-[1.7] max-w-[600px] mb-10">
            <strong className="text-white/90">POS · Cocina · Caja · Contabilidad</strong> en un solo sistema.
            <br className="hidden sm:block" /> Cada rol con su propia pantalla. Sin módulos extra, sin costuras.
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.85}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openContact({ topic: "Solicitar acceso" })}
              className="font-bold text-[#0F172A] px-8 py-3.5 rounded-full text-sm transition-all hover:scale-105 cursor-pointer"
              style={{ background: "#F59E0B", boxShadow: "0 0 0 0 rgba(245,158,11,0)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(245,158,11,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 0 rgba(245,158,11,0)"; }}
            >
              Solicitar acceso →
            </button>
            <button
              onClick={() => handleAnchor("#modulos")}
              className="font-semibold text-white px-8 py-3.5 rounded-full text-sm border transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              Ver los módulos
            </button>
          </div>
        </BlurFade>

        {/* Founding partners — programa cerrado, cupos limitados */}
        <BlurFade delay={1.05}>
          <div className="flex flex-col items-center gap-3 mt-10">
            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.32)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#F59E0B", boxShadow: "0 0 10px rgba(245,158,11,0.7)" }}
              />
              <span className="text-[0.72rem] font-bold tracking-[0.18em] uppercase" style={{ color: "#F59E0B" }}>
                Programa Socios Fundadores
              </span>
              <span className="text-[0.72rem] font-semibold text-white/70">
                Quedan <strong className="text-white">7 cupos</strong>
              </span>
            </div>
            <p className="text-[0.78rem] text-white/45 max-w-[480px] text-center leading-relaxed">
              Acompañamos a un grupo reducido de restaurantes en la implementación inicial, con beneficios y precios fundadores.
            </p>
          </div>
        </BlurFade>
      </div>

      {/* ── FLOATING STAT CARDS ─────────────────────────── */}
      {floatCards.map((c, i) => (
        <div
          key={i}
          className="absolute hidden md:block z-10 rounded-2xl p-4 min-w-[155px]"
          style={{
            ...c.style,
            background: "rgba(8,16,28,0.82)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            animation: c.anim,
          }}
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5"
            style={{ background: c.iconBg }}>
            {c.icon}
          </div>
          <div className="text-[0.6rem] text-white/50 font-semibold mb-0.5">{c.label}</div>
          <div className="text-sm font-extrabold" style={{ color: c.valueColor }}>{c.value}</div>
        </div>
      ))}

      {/* ── SCROLL INDICATOR ────────────────────────────── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ animation: "scroll-cue 2.5s ease-in-out infinite" }}>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
        <span className="text-[0.52rem] tracking-[0.25em] uppercase text-white/35">scroll</span>
      </div>

      <style>{`
        @keyframes float-c1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-12px) rotate(1deg)} }
        @keyframes float-c2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(10px) rotate(-1deg)} }
        @keyframes scroll-cue { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>
    </section>
  );
}
