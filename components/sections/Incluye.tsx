// «Todo lo que incluye» (docs/diseno/decisiones.md · D13). La carta de RestHUB: los seis
// módulos como platos con «Incluido» donde iría el precio y, al pie, lo que se acepta y lo
// que se factura, como en la carta de cualquier restaurante. Reúne StickyModules,
// Integrations, Why, Messages y los datos de Stats y Flow.

type Modulo = { nombre: string; titulo: string; texto: string; con: string[] };

const OPERACION: Modulo[] = [
  {
    nombre: "Pedidos",
    titulo: "POS · Punto de venta",
    texto: "Toma de órdenes por mesa, combos, modificadores y cuentas divididas. Diseñado para el ritmo real del salón.",
    con: ["mesas y zonas", "modificadores y combos", "cuentas divididas", "historial por turno"],
  },
  {
    nombre: "Cocina",
    titulo: "Pantalla de cocina",
    texto: "La orden llega a la pantalla de cocina al instante. Sin papel, sin gritos, sin errores entre el salón y la cocina.",
    con: ["estados nuevo, cocinando y listo", "varias estaciones", "sin papelitos"],
  },
  {
    nombre: "Caja y turnos",
    titulo: "Control financiero diario",
    texto: "Apertura, cierre Z y control de efectivo en tiempo real. Sabes exactamente qué tienes en caja antes de cerrar el turno.",
    con: ["cierre Z automático", "control de diferencias", "historial de movimientos", "cuadre completo"],
  },
];

const GESTION: Modulo[] = [
  {
    nombre: "Reportes",
    titulo: "Lo que pasa hoy, hoy",
    texto: "Ventas, métodos de pago, productos top y tendencias semanales. En tiempo real, sin esperar el lunes ni pedir un export.",
    con: ["resumen en vivo", "ranking de productos", "ventas por método de pago", "comparativas diarias y semanales"],
  },
  {
    nombre: "Contabilidad",
    titulo: "Panel exclusivo del contador",
    texto: "Cuentas por cobrar, gastos y facturas en un panel que el contador maneja solo. Cierra el mes sin digitar una sola venta.",
    con: ["cuentas por cobrar y pagar", "registro de gastos", "SUNAT y SIRE sin digitación", "balance mensual automático"],
  },
  {
    nombre: "Empleados",
    titulo: "Gestión del equipo",
    texto: "Asistencia, roles e historial de actividad. Sin apps externas ni planillas que nadie llena al final del turno.",
    con: ["control de asistencia", "roles por función", "historial de actividad"],
  },
];

const ACEPTAMOS = ["Yape", "Plin", "Culqi", "Izipay", "Visa", "Mastercard"];

function Plato({ m }: { m: Modulo }) {
  return (
    <li className="py-5">
      <div className="flex items-baseline gap-3">
        <h4 className="display-cond shrink-0 text-[26px] uppercase leading-none">{m.nombre}</h4>
        <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-4px] border-b-2 border-dotted border-impreso" />
        <span className="display-75 shrink-0 text-[15px] font-black uppercase text-menta-oscura">Incluido</span>
      </div>
      <p className="mt-1 text-[15px] font-bold text-impreso">{m.titulo}</p>
      <p className="mt-2 text-[17px] leading-[1.5]">{m.texto}</p>
      <p className="mt-2 text-[15px] font-semibold italic leading-snug text-tinta">Con {m.con.join(", ")}.</p>
    </li>
  );
}

export default function Incluye() {
  return (
    <section id="modulos" className="bg-mostrador font-brand text-white">
      <div className="mx-auto max-w-[1376px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-end lg:gap-14">
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            La mayoría de los sistemas te obligan a elegir entre funciones.
            <span className="block">Aquí todo viene en la carta.</span>
          </h2>
          <p className="max-w-[46ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            <strong className="font-semibold text-white">RestHUB existe para que esa elección no exista.</strong> Desde la mesa hasta el
            balance, un solo punto de control: seis módulos que son el mismo sistema, sin módulos de pago aparte ni integraciones frágiles.
          </p>
        </header>

        <article aria-label="La carta de RestHUB" className="comanda-papel mt-12 bg-papel text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)] lg:mt-16">
          <div aria-hidden="true" className="comanda-troquel h-3" />
          <div className="px-5 pb-7 pt-2 sm:px-8 lg:px-12 lg:pb-10">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-2 border-mostrador pb-3">
              <h3 className="display-cond whitespace-nowrap text-[34px] uppercase leading-none">La carta</h3>
              <span className="text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">Todo incluido en tu plan</span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)] gap-x-14 lg:grid-cols-[repeat(2,minmax(0,1fr))]">
              <section aria-labelledby="carta-operacion">
                <h3 id="carta-operacion" className="mt-6 text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                  Para el servicio
                </h3>
                <ul className="divide-y divide-papel-linea">
                  {OPERACION.map((m) => (
                    <Plato key={m.nombre} m={m} />
                  ))}
                </ul>
              </section>
              <section aria-labelledby="carta-gestion">
                <h3 id="carta-gestion" className="mt-6 text-[12px] font-extrabold uppercase tracking-[0.04em] text-impreso">
                  Para el dueño y el contador
                </h3>
                <ul className="divide-y divide-papel-linea">
                  {GESTION.map((m) => (
                    <Plato key={m.nombre} m={m} />
                  ))}
                </ul>
              </section>
            </div>

            {/* Pie de carta: lo que se acepta y lo que se factura. */}
            <div id="integraciones" className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 border-t-2 border-dashed border-impreso pt-6 lg:grid-cols-[repeat(2,minmax(0,1fr))] lg:gap-14">
              <div>
                <p className="display-75 text-[15px] font-black uppercase">Aceptamos</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ACEPTAMOS.map((a) => (
                    <li key={a} className="rounded-[3px] border-[1.5px] border-mostrador px-3 py-1.5 text-[15px] font-bold">
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[15px] leading-snug text-impreso">
                  Cobro con QR en la mesa o en caja, POS físico y pagos en línea, cada uno registrado en caja con su método de pago.
                </p>
              </div>
              <div>
                <p className="display-75 text-[15px] font-black uppercase">Facturamos</p>
                <p className="mt-3 text-[17px] leading-[1.5]">
                  Boletas y facturas electrónicas <strong className="font-extrabold">SUNAT</strong> emitidas desde caja, y el Registro de Ventas{" "}
                  <strong className="font-extrabold">SIRE</strong> sale del sistema. Tu contador no digita nada.
                </p>
              </div>
            </div>
          </div>
        </article>

        <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-4 text-[15px] leading-snug text-texto-2 sm:grid-cols-2 lg:grid-cols-4">
          <li className="border-t border-linea pt-4">
            <strong className="block font-semibold text-white">Hasta 15 locales</strong> desde un solo panel.
          </li>
          <li className="border-t border-linea pt-4">
            <strong className="block font-semibold text-white">1,699 pruebas automáticas</strong> antes de que una actualización llegue a tu local.
          </li>
          <li className="border-t border-linea pt-4">
            <strong className="block font-semibold text-white">Datos cifrados</strong> en tránsito y en reposo.
          </li>
          <li className="border-t border-linea pt-4">
            <strong className="block font-semibold text-white">Soporte en español,</strong> desde Perú.
          </li>
        </ul>
      </div>
    </section>
  );
}
