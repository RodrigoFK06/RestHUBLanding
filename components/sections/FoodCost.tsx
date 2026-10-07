"use client";

import { useState } from "react";
import { Check, Minus, Plus, TriangleAlert } from "lucide-react";

// «¿Cuánto te deja cada plato?» (docs/diseno/decisiones.md · D10). La receta impresa del
// sistema con el costo real del plato; el dueño mueve el precio de carta y ve cuánto le deja.

const PUNTOS = [
  "Cada venta descuenta los ingredientes exactos de tu inventario, sin que nadie digite nada.",
  "Registras mermas y pérdidas para que el stock cuadre con la realidad, no con el papel.",
  "Alertas antes de quedarte sin un insumo en pleno servicio.",
  "Costo real por plato: ingredientes, precio y lo que te deja, a la vista.",
];

const RECETA = [
  { insumo: "Carne de res", cantidad: "300 g", costo: 8.4 },
  { insumo: "Papa amarilla", cantidad: "250 g", costo: 0.9 },
  { insumo: "Tomate y cebolla", cantidad: "", costo: 0.8 },
  { insumo: "Arroz y otros", cantidad: "", costo: 1.1 },
];

const COSTO = RECETA.reduce((s, r) => s + r.costo, 0);
const PRECIO_INICIAL = 35;

export default function FoodCost() {
  const [precio, setPrecio] = useState(PRECIO_INICIAL);
  const deja = precio - COSTO;
  const margen = Math.round((deja / precio) * 100);

  return (
    <section id="costos" className="bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] xl:gap-x-24">
          <h2 className="display-cond max-w-[20ch] text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em] lg:col-start-2 lg:row-start-1">
            Vendes todos los días.
            <span className="block text-ambar">¿Sabes cuánto te deja cada plato?</span>
          </h2>

          {/* ── La receta impresa ── */}
          <div className="mx-auto w-full max-w-[460px] lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="comanda-papel relative bg-papel text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] lg:-rotate-[0.6deg]">
              <div aria-hidden="true" className="comanda-troquel h-3" />
              <div className="px-5 pb-6 pt-2 sm:px-7">
                <div className="flex items-end justify-between gap-4 border-b-2 border-mostrador pb-2.5">
                  <span className="display-cond text-[26px] uppercase leading-none">Receta</span>
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">Costo por plato</span>
                </div>
                <p className="display-cond mt-3 text-[34px] uppercase leading-none">Lomo saltado</p>

                <div className="mt-4 grid grid-cols-[1fr_auto] text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                  <span>Insumo</span>
                  <span>Costo</span>
                </div>
                <ul className="comanda-renglones mt-1">
                  {RECETA.map((r) => (
                    <li key={r.insumo} className="grid h-8 grid-cols-[1fr_auto] items-center text-[17px]">
                      <span>
                        {r.insumo}
                        {r.cantidad && <span className="text-impreso"> · {r.cantidad}</span>}
                      </span>
                      <span className="tabular-nums">{r.costo.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex items-baseline justify-between border-t-2 border-mostrador pt-2">
                  <span className="text-[15px] font-bold">Costo del plato</span>
                  <span className="display-cond text-[26px] leading-none tabular-nums">S/ {COSTO.toFixed(2)}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-y border-dashed border-impreso py-3">
                  <span className="text-[15px] font-bold">Precio en carta</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPrecio((p) => Math.max(15, p - 1))}
                      aria-label="Bajar el precio un sol"
                      className="comanda-plato grid size-11 cursor-pointer place-items-center rounded-md border-[1.5px] border-mostrador bg-papel"
                    >
                      <Minus className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </button>
                    <output aria-live="polite" className="display-cond w-[4.5ch] text-center text-[26px] leading-none tabular-nums">
                      S/ {precio}
                    </output>
                    <button
                      type="button"
                      onClick={() => setPrecio((p) => Math.min(60, p + 1))}
                      aria-label="Subir el precio un sol"
                      className="comanda-plato grid size-11 cursor-pointer place-items-center rounded-md border-[1.5px] border-mostrador bg-papel"
                    >
                      <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <span className="text-[15px] font-bold">Te deja</span>
                  <span className="text-right">
                    <span className="display-cond block text-[clamp(2.5rem,5vw,3.25rem)] leading-none text-menta-oscura tabular-nums">
                      S/ {deja.toFixed(2)}
                    </span>
                    <span className="mt-1 block text-[15px] font-bold text-impreso tabular-nums">{margen}% del precio</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="comanda-papel mt-6 flex items-start gap-3 rounded-[3px] bg-copia-caja px-4 py-3.5 text-mostrador shadow-[0_14px_26px_-14px_rgba(0,0,0,0.8)] lg:rotate-[0.8deg]">
              <TriangleAlert className="mt-0.5 size-[18px] shrink-0 text-ambar-oscuro" strokeWidth={2.25} aria-hidden="true" />
              <p className="text-[15px] leading-snug">
                <strong className="font-extrabold">Carne de res: quedan 8.2 kg.</strong> Alcanza para unos 27 platos. Repón antes del sábado.
              </p>
            </div>
            <p className="mt-4 text-center text-[15px] text-texto-3">Datos de ejemplo. Mueve el precio y mira cuánto te deja.</p>
          </div>

          {/* ── El dolor, en palabras del dueño ── */}
          <div className="min-w-0 lg:col-start-2 lg:row-start-2">
            <p className="max-w-[46ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
              <strong className="font-semibold text-white">La mayoría de restaurantes no lo sabe.</strong> Se compra, se cocina, se vende, y a fin
              de mes la plata no cuadra con lo vendido. RestHUB conecta tus recetas con tu inventario para que dejes de adivinar
              dónde se va el margen.
            </p>
            <ul className="mt-10 border-t border-linea">
              {PUNTOS.map((p) => (
                <li key={p} className="flex items-start gap-4 border-b border-linea py-5 text-[17px] leading-[1.5] text-white">
                  <Check className="mt-1 size-5 shrink-0 text-menta" strokeWidth={2.5} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
