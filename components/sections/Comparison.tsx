"use client";

import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Cell = { text: string; ok: boolean | "part" };

// Contra cómo trabaja hoy el restaurante, no contra marcas que no venden en Perú.
const rows: { feature: string; rh: string; excel: Cell; boletas: Cell }[] = [
  { feature: "El pedido llega a cocina", rh: "En la pantalla de cocina, al instante", excel: { text: "Papelito o a gritos", ok: false }, boletas: { text: "Papelito", ok: false } },
  { feature: "Cierre de caja", rh: "Yape, Plin, tarjeta y efectivo por separado", excel: { text: "Se cuenta a mano", ok: "part" }, boletas: { text: "Solo el total de boletas", ok: "part" } },
  { feature: "Cuánto te deja cada plato", rh: "Calculado con tus recetas", excel: { text: "No se sabe", ok: false }, boletas: { text: "No se sabe", ok: false } },
  { feature: "Inventario", rh: "Se descuenta con cada venta", excel: { text: "Se cuenta cuando hay tiempo", ok: "part" }, boletas: { text: "No lo lleva", ok: false } },
  { feature: "Boletas y facturas SUNAT", rh: "Desde la caja, al cobrar", excel: { text: "Aparte", ok: false }, boletas: { text: "Sí", ok: true } },
  { feature: "Tu contador", rh: "Entra con su propio usuario", excel: { text: "Recibe fotos y archivos sueltos", ok: false }, boletas: { text: "Recibe el reporte de boletas", ok: "part" } },
];

function Mark({ ok }: { ok: Cell["ok"] }) {
  if (ok === true) return <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" strokeWidth={2} />;
  if (ok === "part") return <MinusCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" strokeWidth={2} />;
  return <XCircle className="w-3.5 h-3.5 text-red-400/50 shrink-0" strokeWidth={2} />;
}


export default function Comparison() {
  return (
    <section id="vs" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <div className="text-center max-w-[620px] mx-auto mb-14">
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3 text-[#0F172A]">
              Cómo cambia<br />el día a día.
            </h2>
            <p className="text-[1.05rem] text-[#475569] leading-[1.75]">
              Comparado con las dos formas más comunes de llevar un restaurante chico: cuaderno y Excel, o un sistema que solo emite boletas.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="overflow-x-auto border border-[#E2E8F0] rounded-2xl mb-6 bg-white shadow-sm">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC]">
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Característica</TableHead>
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#B45309] bg-[#F59E0B]/[0.06]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      RestHUB
                    </span>
                  </TableHead>
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Cuaderno y Excel</TableHead>
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Sistema solo de boletas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r, i) => (
                  <TableRow
                    key={i}
                    className="border-[#E2E8F0] transition-colors group hover:bg-[#F59E0B]/[0.04]"
                  >
                    <TableCell className="text-[0.82rem] text-[#64748B] font-medium group-hover:text-[#0F172A] transition-colors">
                      {r.feature}
                    </TableCell>
                    <TableCell className="text-[0.82rem] text-[#0F172A] font-semibold bg-[#F59E0B]/[0.03] group-hover:bg-[#F59E0B]/[0.08] transition-colors">
                      <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" strokeWidth={2} />{r.rh}</span>
                    </TableCell>
                    <TableCell className="text-[0.82rem] text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5"><Mark ok={r.excel.ok} />{r.excel.text}</span>
                    </TableCell>
                    <TableCell className="text-[0.82rem] text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5"><Mark ok={r.boletas.ok} />{r.boletas.text}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
