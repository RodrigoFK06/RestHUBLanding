"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Wifi } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ── Marcas reales (wordmarks / marcas en sus colores oficiales) ───────────────

function CulqiLogo() {
  return (
    <span className="text-[1.15rem] font-extrabold lowercase tracking-[-0.02em] text-[#00D6A0] leading-none">
      culqi
    </span>
  );
}

function IzipayLogo() {
  return (
    <span className="text-[1.15rem] font-extrabold lowercase tracking-[-0.02em] leading-none">
      <span className="text-[#FF3B5C]">izi</span>
      <span className="text-white">pay</span>
    </span>
  );
}

function YapeLogo() {
  return (
    <span
      className="inline-flex items-center h-9 px-3 rounded-[10px] leading-none"
      style={{ background: "#742384" }}
    >
      <span className="text-white font-extrabold italic lowercase text-[0.95rem] tracking-[-0.02em]">yape</span>
    </span>
  );
}

function PlinLogo() {
  return (
    <span
      className="inline-flex items-center h-9 px-3 rounded-[10px] leading-none"
      style={{ background: "linear-gradient(135deg, #00C6C0 0%, #0A7BC4 100%)" }}
    >
      <span className="text-white font-extrabold lowercase text-[0.95rem] tracking-[-0.02em]">plin</span>
    </span>
  );
}

function SunatLogo() {
  return (
    <span
      className="inline-flex flex-col items-center justify-center h-9 px-3 rounded-[8px] gap-[3px]"
      style={{ background: "#002F6C" }}
    >
      <span className="text-white font-black text-[0.78rem] tracking-[0.04em] leading-none">SUNAT</span>
      <span className="block h-[3px] w-full rounded-full" style={{ background: "#DA291C" }} />
    </span>
  );
}

function SireLogo() {
  return (
    <span className="inline-flex flex-col items-start gap-[3px] leading-none">
      <span className="text-white font-black text-[1.05rem] tracking-[0.06em]">SIRE</span>
      <span className="flex h-[3px] w-full rounded-full overflow-hidden">
        <span className="flex-1" style={{ background: "#DA291C" }} />
        <span className="flex-1" style={{ background: "#002F6C" }} />
      </span>
    </span>
  );
}

function VisaMastercardLogo() {
  return (
    <span className="inline-flex items-center gap-3 leading-none">
      <span className="text-white font-black italic text-[1rem] tracking-[-0.06em]">VISA</span>
      <svg width="34" height="21" viewBox="0 0 34 21" aria-hidden="true">
        <circle cx="12.5" cy="10.5" r="10" fill="#EB001B" />
        <circle cx="21.5" cy="10.5" r="10" fill="#F79E1B" />
        <path
          d="M17 3.05a9.98 9.98 0 0 1 0 14.9 9.98 9.98 0 0 1 0-14.9Z"
          fill="#FF5F00"
        />
      </svg>
    </span>
  );
}

const integrations = [
  {
    logo: <CulqiLogo />,
    name: "Culqi",
    category: "Pagos online",
    desc: "Gateway principal para e-commerce y cobros digitales en Perú.",
  },
  {
    logo: <IzipayLogo />,
    name: "Izipay",
    category: "POS físico",
    desc: "Terminal POS física con integración directa al módulo Caja.",
  },
  {
    logo: <YapeLogo />,
    name: "Yape",
    category: "QR / Billetera",
    desc: "Cobro por QR directo en mesa o en caja. Confirmación instantánea.",
  },
  {
    logo: <PlinLogo />,
    name: "Plin",
    category: "QR / Billetera",
    desc: "Pago interoperado entre bancos. Flujo de caja unificado.",
  },
  {
    logo: <SunatLogo />,
    name: "SUNAT",
    category: "Facturación fiscal",
    desc: "Boletas y facturas electrónicas emitidas desde Caja. Tu contador no digita nada.",
  },
  {
    logo: <SireLogo />,
    name: "SIRE",
    category: "Registro de ventas",
    desc: "El Registro de Ventas sale del sistema, sin exportar archivos para que alguien los suba después.",
  },
  {
    logo: <VisaMastercardLogo />,
    name: "Visa · Mastercard",
    category: "Tarjeta",
    desc: "Cobro con tarjeta registrado en la caja con su método de pago.",
  },
];

const certs = [
  "Datos cifrados en tránsito y en reposo",
  "Boletas y facturas electrónicas SUNAT",
  "Soporte en español, desde Perú",
];

export default function Integrations() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".integ-card", { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.fromTo(
        ".integ-card",
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="integraciones" className="py-24 bg-[#0F172A]">
      <div className="max-w-[1160px] mx-auto px-8">

        {/* Header */}
        <BlurFade>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-[520px]">
              <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4">
                Conectado con lo que tu restaurante ya usa.
              </h2>
              <p className="text-[1.05rem] text-[#94A3B8] leading-[1.75]">
                Sin adaptadores ni integraciones de terceros. Pagos, facturación y reportes vienen incluidos.
              </p>
            </div>

            {/* Live badge */}
            <div className="shrink-0 flex items-center gap-2.5 bg-[rgba(13,148,136,0.05)] border border-[rgba(13,148,136,0.18)] rounded-2xl px-5 py-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]" />
              </span>
              <span className="text-[0.82rem] text-[#94A3B8]">
                <span className="text-white font-semibold">{integrations.length} integraciones</span> listas para usar
              </span>
            </div>
          </div>
        </BlurFade>

        {/* Integration grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {integrations.map((item, i) => (
            <div
              key={i}
              className="integ-card group bg-[rgba(255,255,255,0.025)] border border-white/6 rounded-2xl p-5 flex flex-col gap-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-white/12 transition duration-300 cursor-default"
            >
              {/* Brand logo */}
              <div className="flex items-center justify-between gap-2">
                <div className="h-10 flex items-center">{item.logo}</div>
                <span className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8] bg-white/5 px-2 py-0.5 rounded-full shrink-0">
                  {item.category}
                </span>
              </div>

              {/* Name + desc */}
              <div>
                <div className="text-[0.95rem] font-semibold text-white mb-1.5">{item.name}</div>
                <p className="text-[0.77rem] text-[#94A3B8] leading-[1.55]">{item.desc}</p>
              </div>

              {/* Status dot */}
              <div className="flex items-center gap-1.5 mt-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                <span className="text-[0.68rem] text-[#94A3B8]">Activo</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certification strip */}
        <BlurFade delay={0.35}>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-2.5 pt-7 border-t border-white/5">
            {certs.map((c) => (
              <div key={c} className="flex items-center gap-2 text-[0.73rem] text-[#7C8DA5]">
                <Wifi className="w-3 h-3 text-[#14B8A6] shrink-0" strokeWidth={2} />
                {c}
              </div>
            ))}
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
