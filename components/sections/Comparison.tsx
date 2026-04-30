"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import BlurFade from "@/components/reactbits/BlurFade";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const rows = [
  { feature: "POS + KDS integrado", rh: "POS y KDS nativos", toast: "POS completo", oracle: "Enterprise", spec: "Según especialidad", rhOk: true, toastOk: true, oracleOk: true, specPart: true },
  { feature: "Contabilidad integrada", rh: "Panel Contador nativo", toast: "Requiere integración", oracle: "Módulo enterprise", spec: "Fuera de scope", rhOk: true, toastOk: false, oracleOk: true, specOk: false },
  { feature: "Roles diferenciados", rh: "6 roles completos", toast: "Básico", oracle: "Complejo y costoso", spec: "Parcial", rhOk: true, toastPart: true, oracleOk: true, specPart: true },
  { feature: "Pagos latinoamericanos", rh: "Culqi + Izipay nativos", toast: "No disponible", oracle: "Adaptación costosa", spec: "No disponible", rhOk: true, toastOk: false, oraclePart: true, specOk: false },
  { feature: "BI en tiempo real", rh: "Dashboard nativo", toast: "Básico", oracle: "Enterprise, costoso", spec: "Según producto", rhOk: true, toastPart: true, oracleOk: true, specPart: true },
  { feature: "Precio accesible (1–15 locales)", rh: "Diseñado para SMB", toast: "Accesible", oracle: "Solo enterprise", spec: "Parcial", rhOk: true, toastOk: true, oracleOk: false, specOk: true },
];

const posMap = [
  { label: "Generalistas de escala", name: "Toast · Square", desc: "Penetración masiva, facilidad. Faltan profundidad contable y roles reales.", bars: [{ l: "Cobertura funcional", pct: 45, color: "bg-[#64748B]" }, { l: "Precio accesible", pct: 85, color: "bg-[#14B8A6]" }], highlight: false },
  { label: "RestHUB — el espacio vacío", name: "RestHUB", desc: "Profundidad del enterprise + accesibilidad del SMB + pensado para LATAM.", bars: [{ l: "Cobertura funcional", pct: 92, color: "bg-[#F59E0B]" }, { l: "Precio accesible", pct: 78, color: "bg-[#F59E0B]" }], highlight: true },
  { label: "Enterprise clásico", name: "Oracle Simphony", desc: "Escala y seguridad máxima. Inaccesible en precio para 1–15 locales.", bars: [{ l: "Cobertura funcional", pct: 95, color: "bg-[#14B8A6]" }, { l: "Precio accesible", pct: 10, color: "bg-[#64748B]" }], highlight: false },
];

function Bar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  return (
    <div ref={ref} className="h-1 rounded-full bg-[#E2E8F0] overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-[1200ms] ease-out`}
        style={{ width: inView ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

export default function Comparison() {
  return (
    <section id="vs" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <div className="text-center max-w-[620px] mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-black/5 text-[#64748B] border border-black/8 mb-5">
              El mapa competitivo
            </span>
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3 text-[#0F172A]">
              Profundidad funcional.<br />Precio accesible.
            </h2>
            <p className="text-[1.05rem] text-[#475569] leading-[1.75]">
              Generalistas de escala o especialistas de nicho. RestHUB ocupa el espacio vacío.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="overflow-x-auto border border-[#E2E8F0] rounded-2xl mb-6 bg-white shadow-sm">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC]">
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Característica</TableHead>
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#F59E0B]">RestHUB</TableHead>
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Toast / Square</TableHead>
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Oracle Simphony</TableHead>
                  <TableHead className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">Especialistas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r, i) => (
                  <TableRow key={i} className="border-[#E2E8F0] hover:bg-[#F8FAFC]">
                    <TableCell className="text-[0.82rem] text-[#64748B] font-medium">{r.feature}</TableCell>
                    <TableCell className="text-[0.82rem] text-[#0F172A] font-medium">
                      <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" strokeWidth={2} />{r.rh}</span>
                    </TableCell>
                    <TableCell className="text-[0.82rem] text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5">
                        {r.toastOk === false ? <XCircle className="w-3.5 h-3.5 text-red-400/50 shrink-0" strokeWidth={2} /> : r.toastOk ? <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" strokeWidth={2} /> : <MinusCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={2} />}
                        {r.toast}
                      </span>
                    </TableCell>
                    <TableCell className="text-[0.82rem] text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5">
                        {r.oracleOk === false ? <XCircle className="w-3.5 h-3.5 text-red-400/50 shrink-0" strokeWidth={2} /> : r.oracleOk ? <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" strokeWidth={2} /> : <MinusCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={2} />}
                        {r.oracle}
                      </span>
                    </TableCell>
                    <TableCell className="text-[0.82rem] text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5">
                        {r.specOk === false ? <XCircle className="w-3.5 h-3.5 text-red-400/50 shrink-0" strokeWidth={2} /> : r.specOk ? <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" strokeWidth={2} /> : <MinusCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={2} />}
                        {r.spec}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posMap.map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${
                  p.highlight
                    ? "border-[#0F172A] bg-[#0F172A] text-white"
                    : "border-[#E2E8F0] bg-white shadow-sm"
                }`}
              >
                <div className={`text-[0.62rem] font-bold tracking-[0.12em] uppercase mb-1 ${p.highlight ? "text-[#F59E0B]" : "text-[#94A3B8]"}`}>{p.label}</div>
                <div className={`text-[0.95rem] font-bold mb-2 ${p.highlight ? "text-white" : "text-[#0F172A]"}`}>{p.name}</div>
                <p className={`text-[0.8rem] leading-[1.55] mb-4 ${p.highlight ? "text-[#94A3B8]" : "text-[#475569]"}`}>{p.desc}</p>
                {p.bars.map((b, j) => (
                  <div key={j} className="mb-2.5">
                    <div className={`text-[0.65rem] mb-1 ${p.highlight ? "text-[#64748B]" : "text-[#94A3B8]"}`}>{b.l}</div>
                    <Bar pct={b.pct} color={b.color} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
