import { ArrowRight, RefreshCw, WifiOff } from "lucide-react";

// «Se cayó el internet» (docs/diseno/decisiones.md · D11). Una franja de calma entre dos
// secciones densas: la copia ámbar guarda los pedidos en cola y la menta confirma que todo
// subió al volver la conexión.

const EN_COLA = [
  { mesa: 4, hora: "20:41", total: "S/ 60.00" },
  { mesa: 9, hora: "20:44", total: "S/ 42.00" },
  { mesa: 2, hora: "20:46", total: "S/ 74.00" },
];

export default function Offline() {
  return (
    <section id="offline" className="border-y border-linea bg-mostrador-2 font-brand text-white">
      <div className="mx-auto grid max-w-[1376px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,620px)] lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            Se cayó el internet.
            <span className="block text-ambar">Tú sigues vendiendo.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            El POS y la cocina siguen operando en modo local: tomas órdenes y gestionas caja como siempre. Cuando vuelve la
            conexión, todo se sincroniza solo, sin perder una venta ni volver a digitar nada.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="comanda-papel rounded-[3px] bg-copia-caja px-4 pb-4 pt-3.5 text-mostrador shadow-[0_14px_26px_-14px_rgba(0,0,0,0.8)] sm:-rotate-[1.2deg]">
            <p className="display-75 flex items-center gap-2 text-[15px] font-black uppercase">
              <WifiOff className="size-4" strokeWidth={2.5} aria-hidden="true" />
              Sin conexión
            </p>
            <p className="mt-1 text-[12px] font-extrabold uppercase tracking-[0.03em] text-ambar-oscuro">Modo local · 3 pedidos en cola</p>
            <ul className="mt-3 space-y-1 border-t border-dashed border-ambar-oscuro pt-2.5 text-[15px] font-semibold italic text-tinta">
              {EN_COLA.map((p) => (
                <li key={p.mesa} className="flex justify-between gap-3 tabular-nums">
                  <span>
                    Mesa {p.mesa} · {p.hora}
                  </span>
                  <span>{p.total}</span>
                </li>
              ))}
            </ul>
          </div>

          <ArrowRight className="mx-auto size-6 rotate-90 text-texto-3 sm:rotate-0" strokeWidth={2.25} aria-hidden="true" />

          <div className="comanda-papel rounded-[3px] bg-copia-cocina px-4 pb-4 pt-3.5 text-mostrador shadow-[0_14px_26px_-14px_rgba(0,0,0,0.8)] sm:rotate-[1deg]">
            <p className="display-75 flex items-center gap-2 text-[15px] font-black uppercase">
              <RefreshCw className="size-4" strokeWidth={2.5} aria-hidden="true" />
              Conexión de vuelta
            </p>
            <p className="mt-1 text-[12px] font-extrabold uppercase tracking-[0.03em] text-menta-oscura">Todo sincronizado</p>
            <p className="mt-3 border-t border-dashed border-menta-oscura pt-2.5 text-[15px] leading-snug">
              Los 3 pedidos ya están en cocina y en caja. <strong className="font-extrabold">Ninguna venta perdida.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
