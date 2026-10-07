"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";

// Cierre (docs/diseno/decisiones.md · D17). La página empieza con la comanda de la Mesa 4 y
// termina con la tuya: una demo de 15 minutos y la implementación guiada, sin costo hoy.

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

export default function Cta() {
  const { openContact } = useModals();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola RestHUB, me gustaría agendar una demo.")}`;

  return (
    <section id="cta" className="border-t border-linea bg-mostrador font-brand text-white">
      <div className="mx-auto grid max-w-[1376px] grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16 lg:px-10 lg:py-32">
        <div>
          <h2 className="display-cond text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.01em]">
            Tu restaurante merece un sistema que trabaje
            <span className="text-menta"> como tú.</span>
          </h2>
          <p className="mt-7 max-w-[40ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            Agendar una demo toma 15 minutos. <strong className="font-semibold text-white">Ver la diferencia toma uno.</strong>
          </p>
          <p className="mt-6 text-[15px] text-texto-3">Sin contrato de largo plazo · Implementación guiada incluida</p>
        </div>

        {/* La comanda del visitante */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div aria-hidden="true" className="absolute inset-x-3 -bottom-3 top-3 rounded-[4px] bg-copia-caja lg:rotate-[2deg]" />
          <div aria-hidden="true" className="absolute inset-x-1.5 -bottom-1.5 top-1.5 rounded-[4px] bg-copia-cocina lg:rotate-[0.9deg]" />
          <div className="comanda-papel relative rounded-b-[4px] bg-papel text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] lg:-rotate-[0.8deg]">
            <div aria-hidden="true" className="comanda-troquel h-3" />
            <div className="px-5 pb-6 pt-2 sm:px-7">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-2 border-mostrador pb-2.5">
                <div className="flex items-end gap-3">
                  <Image src="/logo.svg" alt="" width={92} height={18} className="mb-[3px] h-[14px] w-auto sm:h-[17px]" />
                  <span className="display-cond text-[22px] uppercase leading-none sm:text-[26px]">Comanda</span>
                </div>
                <span className="display-cond whitespace-nowrap text-[19px] leading-none text-numerador sm:text-[22px]">Tu mesa</span>
              </div>

              <div className="mt-3 grid grid-cols-[3.25rem_1fr_auto] text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                <span>Cant.</span>
                <span>Descripción</span>
                <span>Importe</span>
              </div>
              <ol className="comanda-renglones mt-1">
                <li className="grid h-8 grid-cols-[3.25rem_1fr_auto] items-center text-[17px] font-semibold italic text-tinta">
                  <span>1</span>
                  <span className="truncate pr-3">Demo en vivo · 15 min</span>
                  <span className="tabular-nums">0.00</span>
                </li>
                <li className="grid h-8 grid-cols-[3.25rem_1fr_auto] items-center text-[17px] font-semibold italic text-tinta">
                  <span>1</span>
                  <span className="truncate pr-3">Implementación guiada</span>
                  <span>incluida</span>
                </li>
                <li className="grid h-8 grid-cols-[3.25rem_1fr_auto] items-center text-[17px] font-semibold italic text-tinta">
                  <span>1</span>
                  <span className="truncate pr-3">Primer turno acompañado</span>
                  <span>incluido</span>
                </li>
              </ol>
              <div className="flex items-baseline justify-between border-t-2 border-mostrador pt-2">
                <span className="text-[12px] font-black uppercase tracking-[0.04em]">Total hoy</span>
                <span className="display-cond text-[34px] leading-none tabular-nums">S/ 0.00</span>
              </div>

              <button
                type="button"
                onClick={() => openContact({ topic: "Solicitar acceso" })}
                className="comanda-mandar mt-5 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-mostrador text-[17px] font-extrabold text-white"
              >
                Solicitar acceso
                <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
              </button>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => openContact({ topic: "Agendar demo" })}
                  className="comanda-plato flex h-12 cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-mostrador text-[15px] font-extrabold"
                >
                  Agendar demo
                </button>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comanda-plato flex h-12 items-center justify-center gap-2 rounded-lg border-[1.5px] border-mostrador text-[15px] font-extrabold"
                >
                  <MessageCircle className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
