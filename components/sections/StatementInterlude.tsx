"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Words that get revealed as you scroll — each phrase fades from muted → white
const lines = [
  { text: "Un restaurante no es solo una cocina.", highlight: false },
  { text: "Es un sistema de roles que se comunican.", highlight: false },
  { text: "Mesero, cocinero, cajero, contador.", highlight: true },
  { text: "Cada uno con su realidad.", highlight: false },
  { text: "Hoy, RestHUB les da su propia pantalla.", highlight: true },
];

export default function StatementInterlude() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".stmt-word");
      if (!words?.length) return;

      // Reveal each word sequentially as user scrolls through the section
      gsap.fromTo(
        words,
        { opacity: 0.12, color: "rgba(148,163,184,0.5)", y: 0 },
        {
          opacity: 1,
          color: (i, el) => {
            const isHighlight = el.dataset.highlight === "true";
            return isHighlight ? "#F59E0B" : "#ffffff";
          },
          duration: 0.001, // instant per word, driven by scroll
          stagger: {
            each: 0.1,
            from: "start",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    // Tall container to create scroll room
    <section ref={sectionRef} className="relative bg-black" style={{ height: "300vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle grain / gradient */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(13,148,136,0.08) 0%, rgba(0,0,0,0) 65%), #000" }} />

        <div ref={containerRef} className="relative z-10 max-w-[820px] mx-auto px-8 text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-10"
            style={{ background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.15)", color: "rgba(148,163,184,0.6)" }}
          >
            Por qué existimos
          </div>

          <p
            className="text-[clamp(1.7rem,3.8vw,3rem)] font-extrabold leading-[1.35] tracking-[-0.025em]"
          >
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.text.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className="stmt-word inline-block mr-[0.28em]"
                    style={{ opacity: 0.12, color: "rgba(148,163,184,0.5)" }}
                    data-highlight={line.highlight ? "true" : "false"}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </p>

          {/* Bottom micro-stat strip — stays visible */}
          <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
            {[
              { val: "6", label: "Módulos nativos" },
              { val: "6", label: "Roles diferenciados" },
              { val: "< 200ms", label: "POS → KDS" },
              { val: "1", label: "Solo sistema" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[clamp(1.4rem,2.5vw,2rem)] font-black text-white leading-none mb-1">{s.val}</div>
                <div className="text-[0.65rem] text-[rgba(148,163,184,0.5)] uppercase tracking-[0.15em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
