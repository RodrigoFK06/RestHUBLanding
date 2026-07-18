"use client";

import { useState } from "react";
import BlurFade from "@/components/reactbits/BlurFade";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿En cuánto tiempo puedo tener RestHUB operativo?",
    a: "No prometemos \"listo en 5 minutos\". Un sistema que gestiona caja, cocina, contabilidad y empleados requiere configuración real. Estimamos 1 a 3 días de implementación guiada. Después, la operación diaria es fluida.",
  },
  {
    q: "¿Funciona para una cadena con múltiples locales?",
    a: "Sí. RestHUB está diseñado para 1 a 15 locales: gestión centralizada, reportes consolidados, roles independientes por sede y configuración compartida o independiente según necesites.",
  },
  {
    q: "¿Puedo saber cuánto me cuesta cada plato?",
    a: "Sí. Cargas la receta de cada plato una vez, y RestHUB descuenta los ingredientes del inventario con cada venta. Ves el costo real por plato, cuánto te deja, y recibes alertas antes de quedarte sin un insumo. Las mermas también se registran para que el stock cuadre con la realidad.",
  },
  {
    q: "¿Qué pasa si se cae internet?",
    a: "El POS y el KDS tienen operación offline básica: puedes seguir tomando órdenes y gestionando caja. Al recuperar conexión, la sincronización es automática.",
  },
  {
    q: "¿El contador puede acceder sin ver toda la operación?",
    a: "Exactamente para eso están los roles. El Contador tiene acceso exclusivo a contabilidad, reportes financieros y balance — sin ver la operación ni tocar órdenes. Credenciales totalmente independientes.",
  },
  {
    q: "¿RestHUB reemplaza mi sistema de delivery?",
    a: "No somos Rappi, iFood ni UberEats. RestHUB opera el restaurante por dentro. La integración con plataformas de delivery puede ser parte del roadmap, pero nunca será la identidad del producto.",
  },
  {
    q: "¿Los datos de mi restaurante son seguros?",
    a: "La seguridad está en la arquitectura base. Cada transacción, acceso y reporte está protegido con encriptación en tránsito y en reposo. Los roles garantizan que nadie accede a lo que no le corresponde.",
  },
];

export default function Faq() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1160px] mx-auto px-8">
        <BlurFade>
          <div className="max-w-[540px] mb-12">
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3 text-[#0F172A]">
              Sin rodeos.
            </h2>
            <p className="text-[1.05rem] text-[#475569] leading-[1.75]">
              Las preguntas reales antes de decidir.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <Accordion
            value={openItem ? [openItem] : []}
            onValueChange={(values: string[]) => setOpenItem(values[0] ?? null)}
            className="flex flex-col gap-2.5 max-w-[780px]"
          >
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden px-0 shadow-sm data-[state=open]:border-[rgba(245,158,11,0.4)] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 text-[0.92rem] font-semibold text-[#0F172A] hover:bg-[#F8FAFC] hover:no-underline text-left [&[data-state=open]]:text-[#F59E0B]">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-[0.87rem] text-[#475569] leading-[1.75] border-t border-[#E2E8F0]">
                  <div className="pt-4">{f.a}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
}
