"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";

// «De cero a operativo en 72 horas» (docs/diseno/decisiones.md · D17). Los tres días de la
// implementación cuelgan del mismo riel de cocina del hero: es una secuencia real, por eso va
// numerada por día.

const DIAS = [
  {
    dia: "Día 1",
    titulo: "Demo en vivo",
    texto: "Una llamada de 15 minutos. Te mostramos el sistema con una carta parecida a la tuya y respondemos todas tus preguntas.",
    lista: ["Sin presentación ni pitch de ventas", "Demostración del flujo completo", "Preguntas técnicas respondidas", "Evaluación de tu caso"],
  },
  {
    dia: "Días 1 y 2",
    titulo: "Setup guiado",
    texto: "Nuestro equipo configura RestHUB con tu menú, tus roles y tu estructura. Tú solo validas.",
    lista: ["Carga de menú y modificadores", "Roles y credenciales por persona", "Integración de pagos activa", "Impresoras y pantalla de cocina"],
  },
  {
    dia: "Día 3",
    titulo: "Primer turno operativo",
    texto: "Tu restaurante en producción, con acompañamiento en tiempo real durante el primer servicio.",
    lista: ["Pedidos y cocina sincronizados en vivo", "Primer cierre de turno real", "Soporte en línea durante el servicio", "Ajustes inmediatos si hace falta"],
  },
];

const GIROS = [-1.2, 0.9, -0.6];

export default function Setup() {
  const { openContact } = useModals();

  return (
    <section id="setup" className="bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-end lg:gap-14">
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            De cero a operativo
            <span className="block">en 72 horas.</span>
          </h2>
          <p className="max-w-[46ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            Te acompañamos en toda la configuración. <strong className="font-semibold text-white">Está incluido en todos los planes,</strong> sin costo
            adicional.
          </p>
        </header>

        <div className="relative mt-12 lg:mt-16">
          <div aria-hidden="true" className="comanda-riel absolute inset-x-0 top-0 hidden h-2.5 rounded-full md:block" />
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-6 lg:gap-10">
            {DIAS.map((d, i) => (
              <li key={d.dia} className="relative md:pt-1" style={{ transformOrigin: "50% 0" }}>
                <span aria-hidden="true" className="mx-auto hidden h-3.5 w-9 rounded-[3px] bg-[#4A4A4A] shadow-[0_2px_0_#262626] md:block" />
                <div
                  className={`comanda-papel -mt-1 rounded-[3px] px-5 pb-5 pt-4 text-mostrador shadow-[0_22px_40px_-20px_rgba(0,0,0,0.9)] ${i === 2 ? "bg-copia-cocina" : "bg-papel"}`}
                  style={{ rotate: `${GIROS[i]}deg` }}
                >
                  <div className="flex items-baseline justify-between gap-3 border-b-2 border-mostrador pb-2">
                    <span className="display-cond text-[26px] uppercase leading-none">{d.dia}</span>
                    <span className="display-cond text-[26px] leading-none text-numerador tabular-nums">{i + 1}/3</span>
                  </div>
                  <h3 className="mt-3 text-[17px] font-extrabold">{d.titulo}</h3>
                  <p className="mt-1.5 text-[15px] leading-snug">{d.texto}</p>
                  <ul className="mt-3 space-y-1 border-t border-dashed border-impreso pt-3 text-[15px] font-semibold italic leading-snug text-tinta">
                    {d.lista.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-linea pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 -space-x-3">
              {[
                { src: "/rodrigo-torres.png", alt: "Rodrigo Torres", pos: "50% 25%" },
                { src: "/emilio-orbegozo.jpg", alt: "Emilio Orbegozo", pos: "50% 35%" },
              ].map((p) => (
                <div key={p.src} className="relative size-12 overflow-hidden rounded-full border-2 border-mostrador">
                  <Image src={p.src} alt={p.alt} fill sizes="48px" className="object-cover" style={{ objectPosition: p.pos }} />
                </div>
              ))}
            </div>
            <p className="max-w-[52ch] text-[17px] leading-snug text-texto-2">
              <strong className="block font-semibold text-white">Te acompañamos nosotros.</strong>
              Rodrigo y Emilio configuran el sistema contigo y están en línea en tu primer turno.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openContact({ topic: "Agendar demo" })}
            className="btn-accion inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 text-[17px] font-extrabold"
          >
            Solicitar demo
            <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
