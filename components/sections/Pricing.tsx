import { ArrowRight, Check } from "lucide-react";

// «Precios» (docs/diseno/decisiones.md · D16). Tres planes como tres tickets de papel; el
// recomendado va en copia ámbar. Reúne Pricing y PricingPivot.

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

function waLink(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

type Plan = {
  id: string;
  nombre: string;
  para: string;
  desde?: boolean;
  precio: number;
  nota: string;
  cta: string;
  mensaje: string;
  incluye: string[];
  recomendado?: boolean;
};

const PLANES: Plan[] = [
  {
    id: "starter",
    nombre: "Starter",
    para: "Para dejar la libreta y los papelitos.",
    precio: 159,
    nota: "≈ S/ 5.30 al día",
    cta: "Empezar por WhatsApp",
    mensaje: "Hola, quiero empezar con el plan Starter de RestHUB para mi restaurante.",
    incluye: ["Pedidos por mesa (POS)", "Pantalla de cocina", "Caja y cierre de turno", "Boletas y facturas SUNAT", "Cobros con Yape y Plin", "1 local"],
  },
  {
    id: "pro",
    nombre: "Pro",
    para: "Para saber cuánto ganas de verdad.",
    precio: 399,
    nota: "≈ S/ 13 al día, menos que un mozo a medio tiempo",
    cta: "Empezar por WhatsApp",
    mensaje: "Hola, me interesa el plan Pro de RestHUB para mi restaurante.",
    incluye: [
      "Todo lo del plan Starter",
      "Inventario y costo por plato",
      "Reportes en tiempo real",
      "Contabilidad y PLE para tu contador",
      "Clientes y delivery",
      "Soporte prioritario",
      "Implementación guiada",
    ],
    recomendado: true,
  },
  {
    id: "enterprise",
    nombre: "Enterprise",
    para: "Para grupos con varios locales.",
    desde: true,
    precio: 719,
    nota: "Para cadenas de 5 a 15 locales",
    cta: "Hablemos por WhatsApp",
    mensaje: "Hola, tengo una cadena de restaurantes y me interesa RestHUB Enterprise.",
    incluye: ["Todo lo del plan Pro", "Multi-local con reportes consolidados", "Conciliación bancaria", "Usuarios ilimitados", "Acompañamiento dedicado"],
  },
];

function Ticket({ p }: { p: Plan }) {
  const ambar = p.recomendado;
  return (
    <article
      aria-labelledby={`plan-${p.id}`}
      className={`comanda-papel relative flex h-full flex-col text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] ${
        ambar ? "bg-copia-caja lg:-translate-y-4" : "bg-papel"
      }`}
    >
      <div aria-hidden="true" className={`${ambar ? "comanda-troquel-caja" : "comanda-troquel"} h-3`} />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-2 sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-2 border-mostrador pb-2.5">
          <h3 id={`plan-${p.id}`} className="display-cond text-[34px] uppercase leading-none">
            {p.nombre}
          </h3>
          {ambar && <span className="rounded-[3px] bg-mostrador px-2 py-1 text-[12px] font-extrabold uppercase tracking-[0.04em] text-copia-caja">Recomendado</span>}
        </div>
        <p className={`mt-3 text-[17px] font-bold leading-snug ${ambar ? "text-ambar-oscuro" : "text-impreso"}`}>{p.para}</p>

        <p className="mt-5 flex items-end gap-1.5">
          {p.desde && <span className="pb-1.5 text-[15px] font-bold">desde</span>}
          <span className="pb-1.5 text-[17px] font-black">S/</span>
          <span className="display-cond text-[clamp(3.5rem,5vw,4.25rem)] leading-[0.8] tabular-nums">{p.precio}</span>
          <span className="pb-1.5 text-[15px] font-semibold">/mes · por local</span>
        </p>
        <p className="mt-2 text-[15px] font-semibold italic text-tinta">{p.nota}</p>

        <ul className="mt-5 flex-1 space-y-2.5 border-t border-dashed border-impreso pt-5">
          {p.incluye.map((i) => (
            <li key={i} className="flex items-start gap-2.5 text-[17px] leading-snug">
              <Check className="mt-1 size-4 shrink-0 text-tinta" strokeWidth={3} aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>

        <a
          href={waLink(p.mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-7 flex h-13 items-center justify-center gap-2 rounded-lg text-[17px] font-extrabold transition-colors ${
            ambar ? "comanda-mandar bg-mostrador text-white" : "comanda-plato border-[1.5px] border-mostrador"
          }`}
        >
          {p.cta}
          <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function Pricing() {
  return (
    <section id="precios" className="bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-end lg:gap-14">
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            Precios en soles.
            <span className="block text-menta">Sin comisiones por venta. Sin permanencia.</span>
          </h2>
          <p className="max-w-[46ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            <strong className="font-semibold text-white">Pagas un monto fijo al mes y ya.</strong> Implementación guiada incluida en todos los
            planes. Cancelas cuando quieras.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-stretch gap-6 lg:mt-20 lg:grid-cols-[repeat(3,minmax(0,1fr))] lg:gap-8">
          {PLANES.map((p) => (
            <div key={p.id} className={p.recomendado ? "order-first lg:order-none" : ""}>
              <Ticket p={p} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-linea pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[62ch] text-[17px] leading-[1.5] text-texto-2">
            <strong className="font-semibold text-ambar">¿Eres de los primeros?</strong> Con el Programa Socios Fundadores pagas S/ 100 al mes en
            cualquier plan durante 12 meses, a cambio de tu feedback y tu caso de éxito. Quedan 7 cupos.
          </p>
          <a
            href={waLink("Hola, quiero uno de los cupos del Programa Socios Fundadores de RestHUB (S/ 100/mes).")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accion inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg px-5 text-[17px] font-extrabold"
          >
            Quiero mi cupo
            <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-6 text-[15px] text-texto-3">Precios en soles (S/) · Sin tarjeta para empezar · Soporte en español, desde Perú</p>
      </div>
    </section>
  );
}
