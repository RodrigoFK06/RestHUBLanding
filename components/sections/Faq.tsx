"use client";

import { useState } from "react";
import { faqs } from "@/lib/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// «Sin rodeos» (docs/diseno/decisiones.md · D17). Las preguntas reales, sobre el mostrador y
// con filetes; el contenido sale de lib/faqs, que también alimenta el schema FAQPage.

export default function Faq() {
  const [abierta, setAbierta] = useState<string | null>(null);

  return (
    <section id="faq" className="border-t border-linea bg-mostrador font-brand text-white">
      <div className="mx-auto grid max-w-[1376px] grid-cols-[minmax(0,1fr)] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-28">
        <div>
          <h2 className="display-cond text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.92] tracking-[-0.01em]">
            Sin rodeos.
            <span className="block text-menta">Las preguntas reales.</span>
          </h2>
          <p className="mt-6 max-w-[36ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.6] text-texto-2">
            Lo que nos preguntan los dueños antes de decidir.
          </p>
        </div>

        <Accordion
          value={abierta ? [abierta] : []}
          onValueChange={(valores: string[]) => setAbierta(valores[0] ?? null)}
          className="border-t border-linea"
        >
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`pregunta-${i}`} className="border-b border-linea">
              <AccordionTrigger className="cursor-pointer gap-6 rounded-none py-5 text-[17px] font-extrabold leading-snug text-white hover:no-underline hover:text-menta aria-expanded:text-menta **:data-[slot=accordion-trigger-icon]:mt-1 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-menta">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[68ch] pb-6 text-[17px] leading-[1.6] text-texto-2">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
