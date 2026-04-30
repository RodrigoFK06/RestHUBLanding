const items = [
  "POS multi-mesa",
  "KDS en tiempo real",
  "Facturación electrónica",
  "Cierre de caja automático",
  "6 roles diferenciados",
  "BI sin exports",
  "Control de inventario",
  "Integración SUNAT / SIRE",
  "Comandas < 200ms",
  "Culqi · Yape · Plin",
  "Multi-local",
  "Reportes en vivo",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-black border-t border-b border-white/8 py-5 overflow-hidden">
      <div className="flex items-center">
        <div className="animate-marquee flex items-center gap-10">
          {doubled.map((label, i) => (
            <div key={i} className="contents">
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.04em] text-white/35 hover:text-white/65 transition-colors shrink-0 uppercase">
                <span className="w-1 h-1 rounded-full bg-[#F59E0B]/60 flex-shrink-0" />
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
