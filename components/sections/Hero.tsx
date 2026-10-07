"use client";

import Image from "next/image";
import BlurFade from "@/components/reactbits/BlurFade";
import SplitWords from "@/components/reactbits/SplitWords";
import { useModals } from "@/components/modals/ModalProvider";

// Hero: el sistema real, no un video de stock.
// La captura es la carta del POS tal como la ve el mozo.
export default function Hero() {
  const { openContact } = useModals();

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0F172A] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="max-w-[1160px] mx-auto px-6 md:px-8 grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-14 md:gap-10 items-center">
        <div className="relative z-10 max-w-[560px]">
          <h1 className="text-[clamp(2.6rem,5.2vw,4.4rem)] font-black leading-[1] tracking-[-0.04em] text-white mb-7">
            <SplitWords text="Tu restaurante, bajo control." delay={0.1} stagger={0.06} />
          </h1>

          <BlurFade delay={0.55}>
            <p className="text-[1.125rem] text-white/75 leading-[1.65] mb-9">
              Sabe cuánto ganas, cierra la caja sin sorpresas y atiende más rápido,
              aunque se caiga el internet. Un solo sistema, hecho en Perú, en soles.
            </p>
          </BlurFade>

          <BlurFade delay={0.7}>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openContact({ topic: "Solicitar acceso" })}
                className="btn-amber font-bold px-7 py-3.5 rounded-full text-[0.95rem] cursor-pointer"
              >
                Solicitar acceso
              </button>
              <a
                href="#producto"
                className="btn-ghost-light inline-flex items-center justify-center font-semibold px-7 py-3.5 rounded-full text-[0.95rem] cursor-pointer"
              >
                Ver el sistema por dentro
              </a>
            </div>
            <p className="mt-5 text-[0.9rem] text-white/50">
              Desde S/ 159 al mes por local. Sin permanencia.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.35}>
          <figure className="relative md:-mr-[22vw] lg:-mr-[18vw]">
            <div className="rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white">
              <Image
                src="/screenshots/hero-pos-carta.jpg"
                alt="Carta del POS de RestHUB con platos peruanos y precios en soles"
                width={1398}
                height={550}
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="w-full h-auto"
              />
            </div>
            <figcaption className="mt-3 text-[0.85rem] text-white/45">
              Así ve la carta el mozo al tomar un pedido.
            </figcaption>
          </figure>
        </BlurFade>
      </div>
    </section>
  );
}
