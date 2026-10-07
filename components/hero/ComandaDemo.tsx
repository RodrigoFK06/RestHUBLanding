"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Flame, Wallet } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";

// La comanda del mozo (docs/diseno/decisiones.md · D7): un pedido, tres copias.
// Demo con datos de ejemplo: la escena arranca en pleno servicio (Mesa 4 ya escrita,
// dos comandas colgadas en cocina, dos copias por cobrar) y el visitante la continúa.

type Plato = { id: string; nombre: string; corto: string; precio: number };
type Ticket = { clave: string; mesa: number; hora: string; lineas: string[]; estado: "Preparando" | "Listo" };
type Copia = { clave: string; mesa: number; hora: string; total: number };

const CARTA: Plato[] = [
  { id: "pollo-cuarto", nombre: "1/4 Pollo a la brasa", corto: "1/4 Pollo", precio: 24 },
  { id: "pollo-medio", nombre: "1/2 Pollo a la brasa", corto: "1/2 Pollo", precio: 42 },
  { id: "chicha", nombre: "Chicha morada 1\u00a0L", corto: "Chicha 1\u00a0L", precio: 12 },
  { id: "anticuchos", nombre: "Anticuchos", corto: "Anticuchos", precio: 18 },
  { id: "lomo", nombre: "Lomo saltado", corto: "Lomo saltado", precio: 32 },
  { id: "inca", nombre: "Inca Kola 1.5\u00a0L", corto: "Inca Kola", precio: 10 },
];

const TICKETS_INICIALES: Ticket[] = [
  { clave: "t-2", mesa: 2, hora: "12:38", lineas: ["2\u00a0×\u00a0Lomo saltado", "1\u00a0×\u00a0Inca Kola 1.5\u00a0L"], estado: "Preparando" },
  { clave: "t-7", mesa: 7, hora: "12:35", lineas: ["1\u00a0×\u00a01/2 Pollo a la brasa", "1\u00a0×\u00a0Inca Kola 1.5\u00a0L"], estado: "Listo" },
];

const COPIAS_INICIALES: Copia[] = [
  { clave: "c-2", mesa: 2, hora: "12:38", total: 74 },
  { clave: "c-7", mesa: 7, hora: "12:35", total: 52 },
];

const PEDIDO_INICIAL: Record<string, number> = { "pollo-cuarto": 2, chicha: 1 };
const COBRADO_HOY = 2267;
const SIGUIENTES_MESAS = [5, 9, 3, 11, 6, 8, 1];
const GIROS_TICKET = [-1.6, 1.3];
const GIROS_COPIA = [-1.4, 1.1, -0.5];

function soles(n: number) {
  const [entero, decimales] = n.toFixed(2).split(".");
  return `S/ ${entero.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimales}`;
}

function horaDe(minutos: number) {
  return `${String(Math.floor(minutos / 60)).padStart(2, "0")}:${String(minutos % 60).padStart(2, "0")}`;
}

export default function ComandaDemo() {
  const { openContact } = useModals();
  const [hoja, setHoja] = useState(482);
  const [mesa, setMesa] = useState(4);
  const [minutos, setMinutos] = useState(12 * 60 + 41);
  const [pedido, setPedido] = useState<Record<string, number>>(PEDIDO_INICIAL);
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS_INICIALES);
  const [copias, setCopias] = useState<Copia[]>(COPIAS_INICIALES);
  const [ultimo, setUltimo] = useState<string | null>(null);
  const [enviadas, setEnviadas] = useState(0);
  const [aviso, setAviso] = useState("");
  // Solo la primera hoja se «escribe» con retraso al cargar; después cada toque se escribe al instante.
  const [cargaInicial, setCargaInicial] = useState(true);

  const lineas = CARTA.filter((p) => (pedido[p.id] ?? 0) > 0).map((p) => ({
    ...p,
    cantidad: pedido[p.id],
    importe: pedido[p.id] * p.precio,
  }));
  const total = lineas.reduce((s, l) => s + l.importe, 0);
  const vacia = lineas.length === 0;
  const porCobrar = copias.reduce((s, c) => s + c.total, 0);
  const colgados = tickets.slice(0, 2);
  const enCola = tickets.length - colgados.length;

  function agregar(id: string) {
    setCargaInicial(false);
    setPedido((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  }

  function borrar() {
    setCargaInicial(false);
    setPedido({});
  }

  function mandar() {
    if (vacia) return;
    setCargaInicial(false);
    const hora = horaDe(minutos);
    const clave = `${hoja}`;
    const ticket: Ticket = {
      clave: `t-${clave}`,
      mesa,
      hora,
      lineas: lineas.map((l) => `${l.cantidad}\u00a0×\u00a0${l.nombre}`),
      estado: "Preparando",
    };
    // El pedido anterior pasa a «Listo»: la cocina avanza mientras tú tomas el siguiente.
    setTickets((ts) => [ticket, ...ts.map((t, i) => (i === 0 ? { ...t, estado: "Listo" as const } : t))].slice(0, 4));
    setCopias((cs) => [{ clave: `c-${clave}`, mesa, hora, total }, ...cs].slice(0, 4));
    setUltimo(clave);
    setAviso(`Comanda de la mesa ${mesa} enviada a cocina a las ${hora}. ${soles(total)} por cobrar.`);
    setHoja((h) => h + 1);
    setMesa(SIGUIENTES_MESAS[enviadas % SIGUIENTES_MESAS.length]);
    setEnviadas((n) => n + 1);
    setMinutos((m) => m + 3);
    setPedido({});
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 md:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[minmax(0,1fr)_minmax(0,500px)_minmax(0,1fr)] xl:gap-10 min-[1440px]:grid-cols-[minmax(0,1fr)_minmax(0,540px)_minmax(0,1fr)] min-[1440px]:gap-12">
        {/* ── Cocina: el riel con las comandas colgadas ── */}
        <section aria-labelledby="hero-cocina" className="order-2 min-w-0 xl:order-1 xl:pt-6">
          <div className="flex items-center justify-between gap-4">
            <h2 id="hero-cocina" className="display-75 flex items-center gap-2 text-[15px] font-black uppercase tracking-[0.05em] text-menta">
              <Flame className="size-[18px]" strokeWidth={2.25} aria-hidden="true" />
              Cocina
            </h2>
            <span className="text-sm text-texto-3">{tickets.length} pedidos en curso</span>
          </div>

          <div className="relative mt-5">
            <div aria-hidden="true" className="comanda-riel h-2.5 rounded-full" />
            <ol className="-mt-1 flex gap-3 px-1">
              {colgados.map((t, i) => (
                <li
                  key={t.clave}
                  className={`relative min-w-0 flex-1 ${t.clave === `t-${ultimo}` ? "ticket-nuevo" : ""}`}
                  style={{ ["--giro" as string]: `${GIROS_TICKET[i]}deg`, transform: `rotate(${GIROS_TICKET[i]}deg)`, transformOrigin: "50% 0" }}
                  aria-label={`Mesa ${t.mesa}, ${t.hora}, ${t.estado}`}
                >
                  <span aria-hidden="true" className="mx-auto block h-3.5 w-9 rounded-[3px] bg-[#4A4A4A] shadow-[0_2px_0_#262626]" />
                  <div className="comanda-papel -mt-1 rounded-[3px] bg-copia-cocina px-3 pb-3 pt-2.5 text-mostrador shadow-[0_16px_28px_-14px_rgba(0,0,0,0.8)]">
                    <div className="display-75 flex items-baseline justify-between gap-2 text-[15px] font-black uppercase">
                      <span>Mesa {t.mesa}</span>
                      <span className="tabular-nums">{t.hora}</span>
                    </div>
                    <ul className="mt-1.5 space-y-0.5 text-[14px] font-semibold italic leading-snug text-tinta">
                      {t.lineas.slice(0, 3).map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                    <span
                      className={`mt-2.5 inline-block rounded-[3px] px-2 py-1 text-[12px] font-extrabold uppercase tracking-[0.03em] ${
                        t.estado === "Listo" ? "bg-menta-oscura text-white" : "bg-mostrador text-copia-cocina"
                      }`}
                    >
                      {t.estado}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            {enCola > 0 && (
              <p className="mt-4 text-sm font-semibold text-texto-2">
                + {enCola} {enCola === 1 ? "pedido" : "pedidos"} en cola
              </p>
            )}
          </div>

          <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-texto-3">
            La cocina lo recibe al instante, con mesa y hora. Aunque se caiga el internet.
          </p>
        </section>

        {/* ── El talonario ── */}
        <section aria-label={`Comanda de la mesa ${mesa}`} className="relative order-1 mx-auto w-full max-w-[560px] md:col-span-2 xl:order-2 xl:col-span-1">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-x-3 -bottom-3 top-3 rounded-[4px] bg-copia-caja lg:rotate-[2.2deg]" />
            <div aria-hidden="true" className="absolute inset-x-1.5 -bottom-1.5 top-1.5 rounded-[4px] bg-copia-cocina lg:rotate-[1deg]" />

            <div key={hoja} className={`comanda-papel relative rounded-b-[4px] bg-papel text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] lg:-rotate-[0.8deg] ${hoja !== 482 ? "hoja-nueva" : ""}`}>
              <div aria-hidden="true" className="comanda-troquel h-3" />
              <div className="px-5 pb-5 pt-2 sm:px-7">
                <div className="flex items-end justify-between gap-4 border-b-2 border-mostrador pb-2.5">
                  <div className="flex items-end gap-3">
                    <Image src="/logo.svg" alt="" width={92} height={18} className="mb-[3px] h-[14px] w-auto sm:h-[17px]" />
                    <span className="display-cond text-[22px] uppercase leading-none sm:text-[26px]">Comanda</span>
                  </div>
                  <span className="display-cond whitespace-nowrap text-[19px] leading-none text-numerador tabular-nums sm:text-[22px]">N° 000{hoja}</span>
                </div>

                <dl className="mt-2.5 grid grid-cols-3 border border-papel-linea text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                  <div className="border-r border-papel-linea px-2.5 py-1">
                    <dt>Mesa</dt>
                    <dd className="text-[16px] font-semibold normal-case italic tracking-normal text-tinta">{mesa} · salón</dd>
                  </div>
                  <div className="border-r border-papel-linea px-2.5 py-1">
                    <dt>Mozo</dt>
                    <dd className="text-[16px] font-semibold normal-case italic tracking-normal text-tinta">Lucía</dd>
                  </div>
                  <div className="px-2.5 py-1">
                    <dt>Hora</dt>
                    <dd className="text-[16px] font-semibold normal-case italic tracking-normal text-tinta tabular-nums">{horaDe(minutos)}</dd>
                  </div>
                </dl>

                <div className="mt-3 grid grid-cols-[3.25rem_1fr_auto] text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                  <span>Cant.</span>
                  <span>Descripción</span>
                  <span>Importe</span>
                </div>
                <ol className="comanda-renglones mt-1 min-h-[128px]">
                  {vacia && (
                    <li className="flex h-8 items-center text-[16px] italic text-impreso">Toca los platos de abajo: la comanda se escribe sola.</li>
                  )}
                  {lineas.map((l, i) => (
                    <li
                      key={`${l.id}-${l.cantidad}`}
                      className="comanda-linea grid h-8 grid-cols-[3.25rem_1fr_auto] items-center text-[17px] font-semibold italic text-tinta"
                      style={cargaInicial ? { animationDelay: `${0.9 + i * 0.35}s` } : undefined}
                    >
                      <span className="tabular-nums">{l.cantidad}</span>
                      <span className="truncate pr-3">{l.nombre}</span>
                      <span className="tabular-nums">{l.importe.toFixed(2)}</span>
                    </li>
                  ))}
                </ol>

                <div className="flex items-baseline justify-between border-t-2 border-mostrador pt-2">
                  <span className="text-[13px] font-black uppercase tracking-[0.05em]">Total</span>
                  <span className="display-cond text-[34px] leading-none tabular-nums">{soles(total)}</span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-[13px] font-bold text-impreso">Agregar a la mesa {mesa}</span>
                  {!vacia && (
                    <button type="button" onClick={borrar} className="inline-flex h-8 cursor-pointer items-center text-[13px] font-bold text-numerador underline underline-offset-4">
                      Borrar comanda
                    </button>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CARTA.map((p) => {
                    const cantidad = pedido[p.id] ?? 0;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => agregar(p.id)}
                        aria-label={`Agregar ${p.nombre}, ${p.precio} soles${cantidad ? `. Van ${cantidad}` : ""}`}
                        className={`comanda-plato flex h-11 cursor-pointer items-center justify-between gap-2 rounded-md border-[1.5px] border-mostrador px-3 text-left text-[14px] font-bold xl:px-2.5 xl:text-[13px] min-[1440px]:px-3 min-[1440px]:text-[14px] ${
                          cantidad ? "bg-copia-cocina" : "bg-papel"
                        }`}
                      >
                        <span className="truncate">{p.corto}</span>
                        <span className="shrink-0 font-black tabular-nums">{cantidad ? `× ${cantidad}` : p.precio}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={mandar}
                  disabled={vacia}
                  className="comanda-mandar mt-4 flex h-13 w-full cursor-pointer items-center justify-center rounded-lg bg-mostrador text-[17px] font-extrabold text-white disabled:cursor-not-allowed disabled:bg-[#767676]"
                >
                  {vacia ? "Toca un plato para empezar" : `Mandar a cocina · ${soles(total)}`}
                </button>
              </div>
            </div>
          </div>

          {enviadas > 0 && (
            <div className="hero-subir mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-lg border border-linea bg-mostrador-2 px-5 py-4">
              <p className="text-[16px] leading-snug text-texto-2">
                <strong className="font-semibold text-white">¿Así quieres trabajar en tu local?</strong> Te acompañamos en la implementación.
              </p>
              <button
                type="button"
                onClick={() => openContact({ topic: "Solicitar acceso" })}
                className="btn-accion inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg px-5 text-[16px] font-extrabold"
              >
                Solicitar acceso
                <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        {/* ── Caja: la cinta de cierre y la pila de copias por cobrar ── */}
        <section aria-labelledby="hero-caja" className="order-3 min-w-0 xl:pt-6">
          <div className="flex items-center justify-between gap-4">
            <h2 id="hero-caja" className="display-75 flex items-center gap-2 text-[15px] font-black uppercase tracking-[0.05em] text-ambar">
              <Wallet className="size-[18px]" strokeWidth={2.25} aria-hidden="true" />
              Caja
            </h2>
            <span className="text-sm text-texto-3">Datos de ejemplo</span>
          </div>

          <div className="comanda-papel relative mt-5 bg-papel px-4 pb-4 pt-3.5 text-mostrador shadow-[0_18px_30px_-16px_rgba(0,0,0,0.85)]">
            <div className="flex flex-col gap-1 border-b border-dashed border-impreso pb-2">
              <span className="display-cond text-[20px] uppercase leading-none">Cierre de caja</span>
              <span className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">Hoy · se cierra solo a las 23:00</span>
            </div>
            <dl className="mt-3 space-y-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[14px] font-semibold text-impreso">Cobrado</dt>
                <dd className="display-cond text-[clamp(1.875rem,2.4vw,2.25rem)] leading-none tabular-nums">{soles(COBRADO_HOY)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[14px] font-semibold text-impreso">Por cobrar</dt>
                <dd className="display-cond text-[22px] leading-none text-numerador tabular-nums">{soles(porCobrar)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-impreso pt-2.5">
                <dt className="text-[14px] font-semibold text-impreso">Diferencia</dt>
                <dd className="text-[15px] font-extrabold text-menta-oscura tabular-nums">S/ 0.00</dd>
              </div>
            </dl>
            <div aria-hidden="true" className="comanda-troquel-abajo absolute inset-x-0 top-full h-3" />
          </div>

          <div className="relative mt-8 h-[124px]">
            {copias.slice(0, 3).map((c, i) => (
              <div
                key={c.clave}
                aria-hidden={i > 0}
                className={`comanda-papel absolute inset-x-0 rounded-[3px] bg-copia-caja px-4 py-3 text-mostrador shadow-[0_14px_26px_-14px_rgba(0,0,0,0.8)] ${c.clave === `c-${ultimo}` ? "copia-nueva" : ""}`}
                style={{ top: i * 11, zIndex: 10 - i, ["--giro" as string]: `${GIROS_COPIA[i]}deg`, transform: `rotate(${GIROS_COPIA[i]}deg) scale(${1 - i * 0.025})` }}
              >
                <div className="display-75 flex items-baseline justify-between text-[14px] font-black uppercase">
                  <span>Mesa {c.mesa}</span>
                  <span className="tabular-nums">{c.hora}</span>
                </div>
                <p className="display-cond mt-1 text-[30px] leading-none tabular-nums">{soles(c.total)}</p>
                <p className="mt-1 text-[12px] font-extrabold uppercase tracking-[0.03em] text-ambar-oscuro">Se cobra al cerrar la mesa</p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-texto-3">
            Cada copia suma sola al cierre. Nada que pasar al cuaderno.
          </p>
        </section>
      </div>

      <p className="mt-10 text-center text-[13px] text-texto-3">
        Demo con datos de ejemplo. Toca los platos y manda la comanda: así se trabaja en RestHUB.
      </p>
      <p aria-live="polite" className="sr-only">
        {aviso}
      </p>
    </div>
  );
}
