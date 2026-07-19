"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola Rodrigo y Emilio, quiero saber más de RestHUB para mi restaurante."
)}`;
const RODRIGO_LINKEDIN = "https://www.linkedin.com/in/rodrigo-torres-arkos";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const founders = [
  {
    photo: "/rodrigo-torres.png",
    alt: "Rodrigo Torres, co-fundador de RestHUB",
    name: "Rodrigo Torres",
    role: "Co-fundador · Producto",
    line: "Lidera producto, estrategia y desarrollo. Construyendo software desde los 16.",
    objectPosition: "50% 25%",
  },
  {
    photo: "/emilio-orbegozo.jpg",
    alt: "Emilio Orbegozo, co-fundador de RestHUB",
    name: "Emilio Orbegozo",
    role: "Co-fundador · Ingeniería y QA",
    line: "Ingeniero de Sistemas. Creó la base original del sistema y lidera la calidad de cada versión.",
    objectPosition: "50% 35%",
  },
];

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".founder-head", ".founder-card", ".founder-copy"], { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
      });
      tl.fromTo(".founder-head", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .fromTo(
          ".founder-card",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.12 },
          "-=0.35"
        )
        .fromTo(".founder-copy", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="fundador" className="bg-[#0F172A] py-24 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-8 text-center">

        <h2 className="founder-head text-[clamp(1.8rem,3.8vw,2.6rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-white mb-4" style={{ opacity: 0 }}>
          Detrás de RestHUB hay gente,{" "}
          <span className="text-[#14B8A6]">no un call center.</span>
        </h2>
        <p className="founder-copy text-[0.98rem] text-[#94A3B8] leading-[1.8] max-w-[560px] mx-auto mb-12" style={{ opacity: 0 }}>
          Somos Rodrigo y Emilio. Construimos RestHUB acá en Perú, hablando con dueños de
          restaurantes reales — pollerías, cevicherías, menús — para resolver los problemas
          que viven todos los días, no los que salen en un manual.
        </p>

        {/* Founders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[640px] mx-auto mb-12">
          {founders.map((f) => (
            <div
              key={f.name}
              className="founder-card flex flex-col items-center rounded-2xl px-6 py-8"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.08)",
                opacity: 0,
              }}
            >
              <div
                className="relative w-[124px] h-[124px] rounded-full overflow-hidden mb-5"
                style={{ border: "2px solid rgba(20,184,166,0.4)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src={f.photo}
                  alt={f.alt}
                  fill
                  sizes="124px"
                  className="object-cover"
                  style={{ objectPosition: f.objectPosition }}
                />
              </div>
              <p className="text-[1.05rem] font-extrabold text-white">{f.name}</p>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#14B8A6] mt-1 mb-3">
                {f.role}
              </p>
              <p className="text-[0.83rem] text-[#94A3B8] leading-[1.65]">{f.line}</p>
            </div>
          ))}
        </div>

        <div className="founder-copy" style={{ opacity: 0 }}>
          <p className="text-[0.95rem] text-[#94A3B8] leading-[1.8] max-w-[520px] mx-auto mb-8">
            Cuando tengas un problema, hablas con nosotros. Con nombre y apellido, no con un bot.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber font-bold px-7 py-3 rounded-full text-sm cursor-pointer"
            >
              Escríbenos por WhatsApp →
            </a>
            <a
              href={RODRIGO_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Rodrigo Torres"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[0.82rem] font-semibold text-white/75 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
