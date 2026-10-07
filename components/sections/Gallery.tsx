"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";

// «Así se ve por dentro» (docs/diseno/decisiones.md · D9). Las cuatro pantallas reales del
// sistema, una por puesto del servicio. Seleccionar un puesto lo convierte en la copia de su
// color (menta = cocina, ámbar = caja), como en el hero. Sin fotos de stock: aquí entran las
// fotos reales del local cuando lleguen.

type Puesto = {
  id: string;
  puesto: string;
  tarea: string;
  leyenda: string;
  src: string;
  alt: string;
  ancho: number;
  alto: number;
  // Color del papel cuando el puesto está elegido (un color, un oficio).
  papel: string;
};

const PUESTOS: Puesto[] = [
  {
    id: "mozo",
    puesto: "Mozo",
    tarea: "Toma de pedido",
    leyenda: "El mozo marca el pedido por mesa y va directo a cocina. Sin papelitos.",
    src: "/screenshots/shot-pos.jpg",
    alt: "Toma de pedido por mesa en el POS de RestHUB: carta con fotos y precios en soles, y la comanda de la mesa T3 con subtotal e IGV.",
    ancho: 1863,
    alto: 820,
    papel: "bg-papel",
  },
  {
    id: "cocina",
    puesto: "Cocina",
    tarea: "Pantalla de cocina",
    leyenda: "El cocinero ve cada pedido al instante, con mesa, tiempo y especificaciones, y marca cuándo está listo.",
    src: "/screenshots/shot-kds.jpg",
    alt: "Pantalla de cocina de RestHUB: pedidos de las mesas T3, T2 y S4 con su tiempo de espera, especificaciones y botón Despachar.",
    ancho: 1902,
    alto: 937,
    papel: "bg-copia-cocina",
  },
  {
    id: "caja",
    puesto: "Caja",
    tarea: "Caja y finanzas",
    leyenda: "Cada sol que entra y sale, registrado. La caja cuadra sola al cierre.",
    src: "/screenshots/shot-caja.jpg",
    alt: "Caja de RestHUB: ingresos del periodo S/ 2,267.00, egresos S/ 0.00 y cada venta con hora, mesa y mesero.",
    ancho: 1860,
    alto: 939,
    papel: "bg-copia-caja",
  },
  {
    id: "dueno",
    puesto: "Dueño",
    tarea: "Resumen del turno",
    leyenda: "Cuánto vendiste y cuánto entró por Yape, Plin o efectivo, en vivo y sin pedir reportes.",
    src: "/screenshots/shot-dashboard.jpg",
    alt: "Resumen del turno en RestHUB: ventas del periodo, mesas atendidas, hora punta, mozo líder y mix de cobro entre Yape, Plin, efectivo y tarjeta.",
    ancho: 1865,
    alto: 935,
    papel: "bg-papel",
  },
];

export default function Gallery() {
  const [activo, setActivo] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const actual = PUESTOS[activo];

  // Patrón de pestañas ARIA: flechas, Inicio y Fin mueven el foco y la selección.
  function teclas(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const ultimo = PUESTOS.length - 1;
    let siguiente: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") siguiente = i === ultimo ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") siguiente = i === 0 ? ultimo : i - 1;
    if (e.key === "Home") siguiente = 0;
    if (e.key === "End") siguiente = ultimo;
    if (siguiente === null) return;
    e.preventDefault();
    setActivo(siguiente);
    pestanas.current[siguiente]?.focus();
  }

  return (
    <section id="producto" className="bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,470px)] lg:items-end lg:gap-14">
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            Así se ve por dentro.
            <span className="block text-menta">Sin maquetas.</span>
          </h2>
          <p className="max-w-[44ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.55] text-texto-2">
            Estas son pantallas reales del sistema funcionando, el mismo que verías operando en tu restaurante. Elige un puesto.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-16 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
          {/* ── Los puestos ── */}
          <div
            role="tablist"
            aria-label="Puestos del restaurante"
            aria-orientation="vertical"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-linea"
          >
            {PUESTOS.map((p, i) => {
              const elegido = i === activo;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    pestanas.current[i] = el;
                  }}
                  id={`puesto-${p.id}`}
                  type="button"
                  role="tab"
                  aria-selected={elegido}
                  aria-controls="pantalla-puesto"
                  tabIndex={elegido ? 0 : -1}
                  onClick={() => setActivo(i)}
                  onKeyDown={(e) => teclas(e, i)}
                  className={`puesto-pestana group shrink-0 cursor-pointer rounded-[4px] px-4 py-3 text-left lg:rounded-none lg:border-b lg:border-linea lg:px-0 lg:py-5 ${
                    elegido ? `comanda-papel ${p.papel} text-mostrador lg:rounded-[4px] lg:border-transparent lg:px-5` : "bg-mostrador-2 text-white lg:bg-transparent"
                  }`}
                >
                  <span className="display-cond block text-[26px] uppercase leading-none lg:text-[34px]">{p.puesto}</span>
                  <span className={`mt-1 block text-[15px] font-semibold ${elegido ? "text-impreso" : "text-texto-3 group-hover:text-texto-2"}`}>
                    {p.tarea}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── La pantalla del puesto ── */}
          <div id="pantalla-puesto" role="tabpanel" aria-labelledby={`puesto-${actual.id}`} className="min-w-0">
            <figure>
              <div className="comanda-papel rounded-[4px] bg-papel p-2 shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] sm:p-2.5">
                <div key={actual.id} className="pantalla-cambia relative overflow-hidden rounded-[2px] bg-mostrador" style={{ aspectRatio: `${actual.ancho} / ${actual.alto}` }}>
                  <Image
                    src={actual.src}
                    alt={actual.alt}
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <p className="max-w-[60ch] text-[17px] leading-[1.5] text-white">{actual.leyenda}</p>
                <p className="shrink-0 text-sm text-texto-3">Pantalla real · {actual.tarea}</p>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-linea pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[48ch] text-[17px] leading-[1.5] text-texto-2">
            <strong className="font-semibold text-white">Tócala tú mismo,</strong> desde tu celular o tu laptop. Sin agendar nada.
          </p>
          <a
            href="https://rest-hub.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg border-[1.5px] border-menta px-5 text-[17px] font-extrabold text-white transition-colors hover:bg-menta hover:text-mostrador"
          >
            Entra a la demo en vivo
            <ArrowUpRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
