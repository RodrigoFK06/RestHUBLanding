"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurFade from "@/components/reactbits/BlurFade";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const words = [
  { text: "Cada", highlight: false },
  { text: "sol.", highlight: true },
  { text: "Cada", highlight: false },
  { text: "orden.", highlight: true },
  { text: "Cada", highlight: false },
  { text: "turno.", highlight: true },
  { text: "En\u00a0un", highlight: false },
  { text: "solo", highlight: false },
  { text: "sistema.", highlight: true },
];

export default function MidStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".mid-word", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".mid-word",
        { opacity: 0.08, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 bg-black overflow-hidden">
      {/* Subtle photo background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=60&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      </div>

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[960px] mx-auto px-8 text-center">
        <BlurFade>
          <div className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[#F59E0B] mb-10">
            RestHUB
          </div>
        </BlurFade>

        <h2 className="text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[1.05] tracking-[-0.04em]">
          {words.map((w, i) => (
            <span key={i} className="mid-word inline-block mr-[0.3em] last:mr-0">
              {w.highlight ? (
                <span className="text-[#F59E0B]">{w.text}</span>
              ) : (
                <span className="text-white">{w.text}</span>
              )}
            </span>
          ))}
        </h2>

        <BlurFade delay={0.6}>
          <p className="mt-8 text-[1.05rem] text-[#64748B] max-w-[480px] mx-auto leading-[1.75]">
            No cuatro herramientas integradas. Un solo sistema diseñado desde el principio para operar restaurantes.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
