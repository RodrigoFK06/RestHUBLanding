"use client";

import BlurFade from "@/components/reactbits/BlurFade";
import { useModals } from "@/components/modals/ModalProvider";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

export default function Cta() {
  const { openContact } = useModals();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, me gustaría ver una demo de RestHUB."
  )}`;

  return (
    <section id="cta" className="py-28 md:py-32 px-6 md:px-8 bg-[#0F172A]">
      <div className="max-w-[1160px] mx-auto">
        <BlurFade>
          <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.05] tracking-[-0.03em] max-w-[760px] mb-5">
            Míralo funcionando con tu propia carta.
          </h2>
          <p className="text-[1.1rem] text-[#94A3B8] max-w-[520px] mb-10 leading-[1.65]">
            La demo dura 15 minutos. Si te convence, en tres días estás operando.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openContact({ topic: "Agendar demo" })}
              className="btn-amber font-bold px-7 py-3.5 rounded-full text-[0.95rem] cursor-pointer"
            >
              Agendar la demo
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light inline-flex items-center font-semibold px-7 py-3.5 rounded-full text-[0.95rem]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
