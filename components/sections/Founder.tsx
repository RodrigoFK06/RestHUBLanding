"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/utils";
import { useModals } from "@/components/modals/ModalProvider";

gsap.registerPlugin(ScrollTrigger);

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

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openContact } = useModals();

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".founder-photo", ".founder-copy"], { opacity: 1, x: 0, y: 0 });
        return;
      }
      gsap.fromTo(
        ".founder-photo",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".founder-copy",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="fundador" className="bg-[#0F172A] py-24 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 max-w-[880px] mx-auto">

          {/* ── Photo ── */}
          <div className="founder-photo shrink-0" style={{ opacity: 0 }}>
            <div
              className="relative w-[180px] h-[210px] rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            >
              <Image
                src="/rodrigo-torres.png"
                alt="Rodrigo Torres, fundador de RestHUB"
                fill
                sizes="180px"
                className="object-cover object-[50%_25%]"
              />
            </div>
            <div className="mt-4 text-center md:text-left">
              <p className="text-[1.05rem] font-extrabold text-white">Rodrigo Torres</p>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#64748B] mt-0.5">
                Fundador de RestHUB
              </p>
            </div>
          </div>

          {/* ── Copy ── */}
          <div className="founder-copy text-center md:text-left" style={{ opacity: 0 }}>
            <h2 className="text-[clamp(1.8rem,3.8vw,2.6rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-white mb-5">
              Detrás de RestHUB hay gente,{" "}
              <span className="text-[#14B8A6]">no un call center.</span>
            </h2>
            <p className="text-[0.98rem] text-[#94A3B8] leading-[1.8] max-w-[520px] mb-4">
              Soy Rodrigo. Construimos RestHUB acá en Perú, hablando con dueños de restaurantes
              reales — pollerías, cevicherías, menús — para resolver los problemas que viven todos
              los días, no los que salen en un manual.
            </p>
            <p className="text-[0.98rem] text-[#94A3B8] leading-[1.8] max-w-[520px] mb-8">
              Cuando tengas un problema, hablas con nosotros. Con nombre y apellido, no con un bot.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => openContact({ topic: "Contacto general" })}
                className="btn-amber font-bold px-7 py-3 rounded-full text-sm cursor-pointer"
              >
                Habla conmigo →
              </button>
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
      </div>
    </section>
  );
}
