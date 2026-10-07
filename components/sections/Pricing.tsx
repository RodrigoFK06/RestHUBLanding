"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    price: 159,
    priceNote: "Unos S/ 5.30 al día",
    desc: "Para dejar la libreta y los papelitos.",
    cta: "Empezar por WhatsApp",
    waMessage: "Hola, quiero empezar con el plan Starter de RestHUB para mi restaurante.",
    ctaStyle: "border",
    features: [
      "Pedidos por mesa (POS)",
      "Pantalla de cocina (KDS)",
      "Caja y cierre de turno",
      "Boletas y facturas SUNAT",
      "Cobros con Yape y Plin",
      "1 local",
    ],
    accent: "#0F172A",
    glow: "rgba(13,148,136,0.1)",
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Recomendado",
    price: 399,
    priceNote: "Unos S/ 13 al día",
    desc: "Para saber cuánto ganas de verdad.",
    cta: "Empezar por WhatsApp",
    waMessage: "Hola, me interesa el plan Pro de RestHUB para mi restaurante.",
    ctaStyle: "filled",
    features: [
      "Todo lo del plan Starter",
      "Inventario y costo por plato",
      "Reportes en tiempo real",
      "Contabilidad y PLE para tu contador",
      "Clientes y delivery",
      "Soporte prioritario",
      "Implementación guiada",
    ],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.12)",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: null,
    price: 719,
    pricePrefix: "desde",
    priceNote: "para cadenas de 5 a 15 locales",
    desc: "Para grupos con varios locales.",
    cta: "Hablemos por WhatsApp",
    waMessage: "Hola, tengo una cadena de restaurantes y me interesa RestHUB Enterprise.",
    ctaStyle: "border",
    features: [
      "Todo lo del plan Pro",
      "Multi-local con reportes consolidados",
      "Conciliación bancaria",
      "Usuarios ilimitados",
      "Acompañamiento dedicado",
    ],
    accent: "#0F172A",
    glow: "rgba(167,139,250,0.1)",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".pricing-card", ".pricing-founder"], { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".pricing-founder",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-founder",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="precios" className="bg-[#F8FAFC] py-28">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="mb-14 max-w-[640px]">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-[#0F172A]">
            Precios en soles, sin comisiones por venta.
          </h2>
          <p className="text-[#475569] text-[1.05rem] leading-[1.7] max-w-[520px]">
            Pagas un monto fijo al mes por local. La implementación guiada está incluida en
            todos los planes y puedes cancelar cuando quieras.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => {
            const isPro = plan.id === "pro";
            return (
              <div
                key={plan.id}
                className="pricing-card relative flex flex-col rounded-2xl p-7"
                style={{
                  background: isPro ? "#0F172A" : "#ffffff",
                  border: isPro ? "1px solid #0F172A" : "1px solid #E2E8F0",
                  opacity: 0,
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-7 text-[0.78rem] font-bold px-3 py-0.5 rounded-full"
                    style={{ background: "#F59E0B", color: "#0F172A" }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-5">
                  <h3 className="text-[1.2rem] font-bold mb-1" style={{ color: isPro ? "#fff" : "#0F172A" }}>
                    {plan.name}
                  </h3>
                  <p className="text-[0.95rem] leading-snug" style={{ color: isPro ? "#CBD5E1" : "#475569" }}>
                    {plan.desc}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-7">
                  <div className="flex items-end gap-1.5 mb-1">
                    {plan.pricePrefix && (
                      <span className="text-[0.8rem] font-semibold text-[#64748B] mb-2">{plan.pricePrefix}</span>
                    )}
                    <span className="text-[0.9rem] font-bold text-[#64748B] mb-2">S/</span>
                    <span
                      className="text-[2.5rem] font-black leading-none"
                      style={{ color: isPro ? "#fff" : "#0F172A" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-[#64748B] mb-1.5">al mes por local</span>
                  </div>
                  <div className="text-[0.88rem]" style={{ color: isPro ? "#94A3B8" : "#64748B" }}>
                    {plan.priceNote}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={waLink(plan.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pricing-cta w-full py-3.5 rounded-xl text-sm font-bold mb-7 transition active:scale-[0.98] cursor-pointer text-center ${
                    plan.ctaStyle === "filled"
                      ? "pricing-cta-filled"
                      : isPro
                      ? "pricing-cta-ghost-pro"
                      : "pricing-cta-ghost-light"
                  }`}
                  style={{ ["--accent" as string]: plan.accent }}
                >
                  {plan.cta}
                </a>

                {/* Divider */}
                <div className="h-px mb-6" style={{ background: isPro ? "rgba(255,255,255,0.06)" : "#E2E8F0" }} />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: isPro ? "#F59E0B" : "#B45309" }}
                        strokeWidth={2.5}
                      />
                      <span className="text-[0.95rem]" style={{ color: isPro ? "rgba(255,255,255,0.85)" : "#0F172A" }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Founder price */}
        <div
          className="pricing-founder mt-8 rounded-2xl px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: "rgba(245,158,11,0.07)",
            border: "1px solid rgba(217,119,6,0.35)",
            opacity: 0,
          }}
        >
          <div className="text-center sm:text-left">
            <h3 className="text-[1.1rem] font-bold text-[#0F172A]">
              Precio de primeros clientes: S/ 100 al mes por 12 meses
            </h3>
            <p className="text-[0.95rem] text-[#475569] mt-1.5 max-w-[560px] leading-[1.55]">
              Cualquier plan, a cambio de que nos cuentes qué funciona y qué no, y de poder
              contar tu caso. Te acompañamos nosotros mismos en la configuración. Quedan 7 cupos.
            </p>
          </div>
          <a
            href={waLink("Hola, quiero uno de los cupos del Programa Socios Fundadores de RestHUB (S/ 100/mes).")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber shrink-0 font-bold px-7 py-3.5 rounded-full text-sm cursor-pointer"
          >
            Quiero un cupo
          </a>
        </div>

        {/* Bottom note */}
        <p className="text-[0.9rem] text-[#64748B] mt-10">
          No necesitas tarjeta para empezar. El soporte es en español, desde Perú.
        </p>
      </div>
    </section>
  );
}
