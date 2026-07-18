"use client";

import Image from "next/image";
import BlurFade from "@/components/reactbits/BlurFade";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

const checks = [
  "POS + KDS integrado",
  "6 roles diferenciados",
  "Contabilidad nativa",
  "BI en tiempo real",
  "Culqi + Izipay",
  "Soporte de implementación",
];

export default function Cta() {
  const { openContact } = useModals();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola RestHUB, me gustaría agendar una demo."
  )}`;
  return (
    <section id="cta" className="relative py-36 px-8 bg-[#0F172A] text-center overflow-hidden">
      {/* Background restaurant photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=70&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-[0.09]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-transparent to-[#0F172A]/80" />
      </div>
      {/* Glow */}
      <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-[820px] mx-auto">
        <BlurFade delay={0.08}>
          <h2 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.08] tracking-[-0.03em] max-w-[760px] mx-auto mb-5">
            Tu restaurante merece un sistema que trabaje como{" "}
            <em style={{ color: "#F59E0B", fontFamily: "var(--font-display)", fontStyle: "italic" }}>tú</em>.
          </h2>
        </BlurFade>

        <BlurFade delay={0.16}>
          <p className="text-base text-[#94A3B8] max-w-[480px] mx-auto mb-10 leading-[1.75]">
            Agendar una demo toma 15 minutos.<br />Ver la diferencia toma uno.
          </p>
        </BlurFade>

        <BlurFade delay={0.24}>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Button
              onClick={() => openContact({ topic: "Solicitar acceso" })}
              className="bg-[#F59E0B] hover:bg-[#FCD34D] text-[#0F172A] font-bold text-base px-8 py-5 hover:shadow-[0_10px_32px_rgba(245,158,11,0.38)] hover:-translate-y-1 cursor-pointer"
            >
              Solicitar acceso →
            </Button>
            <Button
              variant="ghost"
              onClick={() => openContact({ topic: "Agendar demo" })}
              className="text-white border border-white/20 hover:border-white/50 hover:bg-transparent text-base px-8 py-5 hover:-translate-y-1 cursor-pointer"
            >
              Agendar demo
            </Button>
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className="text-white border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10 text-base px-8 py-5 hover:-translate-y-1 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] mr-1.5" />
                WhatsApp
              </Button>
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.32}>
          <p className="text-[0.75rem] text-[#64748B] mb-12">Sin contrato de largo plazo · Implementación guiada incluida</p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="flex flex-wrap justify-center gap-3 pt-10 border-t border-white/6">
            {checks.map((c) => (
              <div key={c} className="flex items-center gap-1.5 text-[0.78rem] text-[#94A3B8]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" strokeWidth={2} />
                {c}
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
