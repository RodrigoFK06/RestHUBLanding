"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";

// «Gente detrás + 7 cupos» (docs/diseno/decisiones.md · D15). Las personas reales que
// responden (Rodrigo y Emilio) y el Programa Socios Fundadores como un ticket de reserva en
// copia ámbar. Reúne Founder y Testimonials.

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola Rodrigo y Emilio, quiero saber más de RestHUB para mi restaurante."
)}`;
const RODRIGO_LINKEDIN = "https://www.linkedin.com/in/rodrigo-torres-arkos";

const FUNDADORES = [
  {
    foto: "/rodrigo-torres.png",
    alt: "Rodrigo Torres, co-fundador de RestHUB",
    nombre: "Rodrigo Torres",
    rol: "Co-fundador · Producto",
    linea: "Lidera producto, estrategia y desarrollo. Construyendo software desde los 16.",
    foco: "50% 25%",
  },
  {
    foto: "/emilio-orbegozo.jpg",
    alt: "Emilio Orbegozo, co-fundador de RestHUB",
    nombre: "Emilio Orbegozo",
    rol: "Co-fundador · Ingeniería y QA",
    linea: "Ingeniero de Sistemas. Creó la base original del sistema y lidera la calidad de cada versión.",
    foco: "50% 35%",
  },
];

const BENEFICIOS = [
  {
    titulo: "Onboarding 1 a 1 con el equipo fundador",
    detalle: "Te acompañamos en la configuración inicial: carta, estaciones de cocina, roles, impresoras y reportes.",
    valor: "Incluido",
  },
  {
    titulo: "Precio fundador por 12 meses",
    detalle: "S/ 100 al mes en cualquier plan durante 12 meses, aunque suba el precio público.",
    valor: "S/ 100 al mes",
  },
  {
    titulo: "Voz directa en el roadmap",
    detalle: "Tus tickets entran a una cola priorizada. Lo que te falta para tu operación lo construimos primero.",
    valor: "Incluido",
  },
];

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function Founder() {
  const { openContact } = useModals();

  return (
    <section id="fundadores" className="bg-mostrador font-brand text-white">
      <div className="mx-auto grid max-w-[1376px] grid-cols-[minmax(0,1fr)] gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16 lg:px-10 lg:py-28 xl:gap-24">
        {/* ── Las personas detrás ── */}
        <div id="fundador" className="min-w-0">
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            Detrás de RestHUB hay gente,
            <span className="block text-menta">no un call center.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            Somos Rodrigo y Emilio. Construimos RestHUB acá en Perú, hablando con dueños de restaurantes reales (pollerías, cevicherías,
            menús) para resolver los problemas que viven todos los días, no los que salen en un manual.
          </p>

          <ul className="mt-10 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-4 sm:gap-8">
            {FUNDADORES.map((f, i) => (
              <li key={f.nombre}>
                <div className={`comanda-papel bg-papel p-2 shadow-[0_28px_50px_-24px_rgba(0,0,0,0.9)] ${i === 0 ? "sm:-rotate-[1deg]" : "sm:rotate-[0.8deg]"}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-mostrador-2">
                    <Image src={f.foto} alt={f.alt} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-cover" style={{ objectPosition: f.foco }} />
                  </div>
                </div>
                <p className="display-cond mt-4 text-[22px] uppercase leading-none sm:mt-5 sm:text-[26px]">{f.nombre}</p>
                <p className="mt-1 text-[15px] font-semibold text-menta">{f.rol}</p>
                <p className="mt-2 text-[15px] leading-snug text-texto-2">{f.linea}</p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[52ch] text-[17px] leading-[1.5] text-white">
            Cuando tengas un problema, hablas con nosotros. Con nombre y apellido, no con un bot.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-lg border-[1.5px] border-menta px-5 text-[17px] font-extrabold text-white transition-colors hover:bg-menta hover:text-mostrador"
            >
              Escríbenos por WhatsApp
              <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
            </a>
            <a
              href={RODRIGO_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Rodrigo Torres"
              className="inline-flex h-12 items-center gap-2 rounded-lg border-[1.5px] border-[#4A4A4A] px-5 text-[15px] font-bold text-texto-2 transition-colors hover:border-[#7A7A7A] hover:text-white"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── El ticket del Programa Socios Fundadores ── */}
        <div className="min-w-0 lg:pt-4">
          <div className="comanda-papel relative bg-copia-caja text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] lg:rotate-[0.8deg]">
            <div aria-hidden="true" className="comanda-troquel-caja h-3" />
            <div className="px-5 pb-6 pt-2 sm:px-7">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-2 border-mostrador pb-2.5">
                <h3 className="display-cond whitespace-nowrap text-[26px] uppercase leading-none">Socios fundadores</h3>
                <span className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-ambar-oscuro">Programa cerrado</span>
              </div>

              <div className="mt-5 flex items-end gap-4">
                <span className="display-cond text-[clamp(6rem,10vw,8.5rem)] leading-[0.8] tabular-nums">7</span>
                <p className="pb-2 text-[17px] font-bold leading-snug">
                  cupos restantes
                  <br />
                  en Latinoamérica
                </p>
              </div>
              <p className="mt-4 text-[15px] leading-snug">
                Estamos cerrando el primer grupo de restaurantes que adoptan RestHUB con acompañamiento directo. Cuando se asignen los 7 cupos,
                el programa se cierra.
              </p>

              <ul className="mt-5 border-t border-dashed border-ambar-oscuro">
                {BENEFICIOS.map((b) => (
                  <li key={b.titulo} className="border-b border-dashed border-ambar-oscuro py-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[17px] font-extrabold leading-snug">{b.titulo}</span>
                      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-4px] border-b-2 border-dotted border-ambar-oscuro" />
                      <span className="display-75 shrink-0 text-[15px] font-black uppercase">{b.valor}</span>
                    </div>
                    <p className="mt-1 text-[15px] leading-snug text-ambar-oscuro">{b.detalle}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[15px] font-semibold italic text-tinta">
                Sin contrato de permanencia · implementación inicial en menos de una semana · soporte 1 a 1 con el equipo fundador.
              </p>

              <button
                type="button"
                onClick={() => openContact({ topic: "Programa Socios Fundadores" })}
                className="comanda-mandar mt-6 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-mostrador text-[17px] font-extrabold text-white"
              >
                Postular a un cupo
                <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
              </button>
              <p className="mt-3 text-center text-[15px] text-ambar-oscuro">Revisamos cada postulación. Te respondemos en menos de 48 h.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
