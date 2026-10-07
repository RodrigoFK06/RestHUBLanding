"use client";

import { ArrowRight } from "lucide-react";
import SplitWords from "@/components/reactbits/SplitWords";
import ComandaDemo from "@/components/hero/ComandaDemo";
import { useModals } from "@/components/modals/ModalProvider";

// Hero «la comanda del mozo» (docs/diseno/decisiones.md · D7). El mostrador es el fondo y el
// talonario es la prueba: el dueño toma un pedido, lo manda a cocina y ve cómo lo suma la caja.
export default function Hero() {
  const { openContact } = useModals();

  return (
    <section id="hero" className="relative overflow-hidden border-b border-linea bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 pb-14 pt-24 sm:px-8 lg:px-10 lg:pb-14 lg:pt-24">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-end lg:gap-14">
          <h1 className="display-cond text-[clamp(3.25rem,6.8vw,6rem)] leading-[0.9] tracking-[-0.01em]">
            <span className="block">
              <SplitWords text="Tu restaurante," delay={0.05} stagger={0.05} />
            </span>
            <span className="block text-menta">
              <SplitWords text="bajo control." delay={0.22} stagger={0.06} />
            </span>
          </h1>

          <div className="hero-subir flex flex-col gap-4" style={{ animationDelay: "0.35s" }}>
            <p className="max-w-[44ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.55] text-texto-2">
              <strong className="font-semibold text-white">Sabe cuánto ganas, cierra la caja sin sorpresas</strong> y atiende más rápido,
              aunque se caiga el internet. Un solo sistema, hecho en Perú, en soles.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={() => openContact({ topic: "Solicitar acceso" })}
                className="btn-accion inline-flex h-13 cursor-pointer items-center gap-2.5 rounded-lg px-6 text-[17px] font-extrabold"
              >
                Solicitar acceso
                <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden="true" />
              </button>
              <a href="#producto" className="link-menta inline-flex h-11 items-center text-[17px] font-semibold">
                Ver el sistema por dentro
              </a>
            </div>
            <p className="max-w-[56ch] text-[15px] leading-normal text-texto-3">
              <strong className="font-semibold text-ambar">Quedan 7 cupos en el Programa Socios Fundadores.</strong> Acompañamos a un
              grupo reducido de restaurantes en la implementación inicial, con beneficios y precios fundadores.
            </p>
          </div>
        </header>

        <div className="hero-subir mt-12 lg:mt-8" style={{ animationDelay: "0.5s" }}>
          <ComandaDemo />
        </div>
      </div>
    </section>
  );
}
