"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CreditCard,
  Smartphone,
  Building2,
  FileText,
  QrCode,
  ShieldCheck,
  Globe,
  Wifi,
} from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  {
    Icon: CreditCard,
    name: "Culqi",
    category: "Pagos online",
    desc: "Gateway principal para e-commerce y cobros digitales en Perú.",
  },
  {
    Icon: CreditCard,
    name: "Izipay",
    category: "POS físico",
    desc: "Terminal POS física con integración directa al módulo Caja.",
  },
  {
    Icon: QrCode,
    name: "Yape",
    category: "QR / Billetera",
    desc: "Cobro por QR directo en mesa o en caja. Confirmación instantánea.",
  },
  {
    Icon: Smartphone,
    name: "Plin",
    category: "QR / Billetera",
    desc: "Pago interoperado entre bancos. Flujo de caja unificado.",
  },
  {
    Icon: Building2,
    name: "SUNAT",
    category: "Facturación fiscal",
    desc: "Emisión de facturas y boletas electrónicas directamente desde Caja.",
  },
  {
    Icon: FileText,
    name: "SIRE",
    category: "Registro de ventas",
    desc: "Registro de Ventas e Ingresos integrado al módulo Contabilidad.",
  },
  {
    Icon: ShieldCheck,
    name: "Visa · Mastercard",
    category: "Tarjeta",
    desc: "Tokenización y cobro seguro con PCI DSS en todos los planes.",
  },
  {
    Icon: Globe,
    name: "MercadoPago",
    category: "Pagos regionales",
    desc: "Para operaciones multi-país. Chile, Argentina, Colombia.",
  },
];

const certs = [
  "PCI DSS Compliant",
  "TLS 1.3 en tránsito",
  "Encriptación en reposo",
  "Facturación SUNAT certificada",
  "Backup automático diario",
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
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-[rgba(13,148,136,0.1)] text-[#14B8A6] border border-[rgba(13,148,136,0.25)] mb-5">
                Ecosistema LATAM
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4">
                Conectado con lo que<br />tu restaurante ya usa.
              </h2>
              <p className="text-[1.05rem] text-[#94A3B8] leading-[1.75]">
                Sin adaptadores ni integraciones de terceros. Pagos, fiscal y reportes — todo nativo.
              </p>
            </div>

            {/* Live badge */}
            <div className="shrink-0 flex items-center gap-2.5 bg-[rgba(13,148,136,0.05)] border border-[rgba(13,148,136,0.18)] rounded-2xl px-5 py-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]" />
              </span>
              <span className="text-[0.82rem] text-[#94A3B8]">
                <span className="text-white font-semibold">8 integraciones</span> activas en producción
              </span>
            </div>
          </div>
        </BlurFade>

        {/* Integration grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {integrations.map((item, i) => (
            <div
              key={i}
              className="integ-card group bg-[rgba(255,255,255,0.025)] border border-white/6 rounded-2xl p-5 flex flex-col gap-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-white/12 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.04)] border border-white/6 flex items-center justify-center group-hover:border-white/10 transition-colors">
                  <item.Icon className="w-4.5 h-4.5 text-[#64748B] group-hover:text-[#94A3B8] transition-colors" strokeWidth={1.6} />
                </div>
                <span className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#475569] bg-white/3 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Name + desc */}
              <div>
                <div className="text-[0.95rem] font-semibold text-white mb-1.5">{item.name}</div>
                <p className="text-[0.77rem] text-[#64748B] leading-[1.55]">{item.desc}</p>
              </div>

              {/* Status dot */}
              <div className="flex items-center gap-1.5 mt-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                <span className="text-[0.68rem] text-[#475569]">Activo</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certification strip */}
        <BlurFade delay={0.35}>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-2.5 pt-7 border-t border-white/5">
            {certs.map((c) => (
              <div key={c} className="flex items-center gap-2 text-[0.73rem] text-[#475569]">
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
