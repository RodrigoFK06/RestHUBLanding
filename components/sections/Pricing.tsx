"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { useModals } from "@/components/modals/ModalProvider";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "esencial",
    name: "Esencial",
    badge: null,
    price: { monthly: 0, yearly: 0 },
    desc: "Para empezar a operar desde el día uno.",
    cta: "Comenzar gratis",
    ctaStyle: "border",
    features: [
      "POS básico + KDS",
      "Hasta 2 roles de usuario",
      "1 local",
      "Soporte por email",
      "Pagos con Culqi",
    ],
    notIncluded: [
      "Contabilidad integrada",
      "BI y analytics",
      "Roles avanzados",
      "Multi-local",
    ],
    accent: "#94A3B8",
    glow: "rgba(148,163,184,0.08)",
  },
  {
    id: "pro",
    name: "Profesional",
    badge: "MÁS POPULAR",
    price: { monthly: 149, yearly: 119 },
    desc: "Todo lo que un restaurante necesita. Sin compromisos.",
    cta: "Solicitar acceso →",
    ctaStyle: "filled",
    features: [
      "POS + KDS integrado",
      "6 roles de usuario completos",
      "Hasta 3 locales",
      "Contabilidad nativa + SUNAT",
      "BI dashboard en tiempo real",
      "Culqi + Izipay + Yape + Plin",
      "Soporte prioritario",
      "Implementación guiada",
    ],
    notIncluded: [],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.12)",
  },
  {
    id: "empresa",
    name: "Empresa",
    badge: null,
    price: { monthly: null, yearly: null },
    desc: "Para grupos y cadenas con múltiples locales y equipos grandes.",
    cta: "Contactar ventas",
    ctaStyle: "border",
    features: [
      "Todo lo de Profesional",
      "Locales ilimitados",
      "Usuarios ilimitados",
      "SLA de uptime 99.9%",
      "API e integraciones custom",
      "Gerente de cuenta dedicado",
      "Soporte 24/7",
    ],
    notIncluded: [],
    accent: "#14B8A6",
    glow: "rgba(13,148,136,0.1)",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [yearly, setYearly] = useState(false);
  const { openContact, openCheckout } = useModals();

  const handlePlanClick = (planId: string) => {
    if (planId === "esencial") {
      openContact({
        topic: "Solicitar acceso",
        prefillMessage: "Quiero comenzar con el plan Esencial (gratis).",
      });
      return;
    }
    if (planId === "empresa") {
      openContact({
        topic: "Contactar ventas",
        prefillMessage: "Estoy interesado en el plan Empresa para múltiples locales.",
      });
      return;
    }
    const plan = plans.find((p) => p.id === planId)!;
    const amount = (yearly ? plan.price.yearly : plan.price.monthly) ?? 0;
    openCheckout({
      id: plan.id,
      name: `RestHUB ${plan.name}`,
      amount: yearly ? amount * 12 : amount,
      currency: "USD",
      billing: yearly ? "yearly" : "monthly",
      description: plan.desc,
    });
  };

  useGSAP(
    () => {
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="precios" className="bg-[#F8FAFC] py-28">
      <div className="max-w-[1080px] mx-auto px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6 bg-black/5 text-[#64748B] border border-black/8"
          >
            Planes
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-[#0F172A]">
            Sin comisiones ocultas.<br />
            <span style={{ color: "#F59E0B" }}>Sin contratos de permanencia.</span>
          </h2>
          <p className="text-[#475569] text-base max-w-[420px] mx-auto mb-8">
            Cancela o cambia de plan cuando quieras. Implementación guiada incluida en todos.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-full p-1.5 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: !yearly ? "rgba(245,158,11,0.12)" : "transparent",
                color: !yearly ? "#F59E0B" : "#94A3B8",
              }}
            >
              Mensual
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: yearly ? "rgba(245,158,11,0.12)" : "transparent",
                color: yearly ? "#F59E0B" : "#94A3B8",
              }}
            >
              Anual
              <span
                className="ml-2 text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(20,184,166,0.15)", color: "#14B8A6" }}
              >
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => {
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            const isPro = plan.id === "pro";

            return (
              <div
                key={plan.id}
                className="pricing-card relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: isPro
                    ? "linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,1) 100%)"
                    : "#ffffff",
                  border: isPro ? `1px solid rgba(245,158,11,0.35)` : "1px solid #E2E8F0",
                  boxShadow: isPro ? `0 0 80px ${plan.glow}, 0 32px 60px rgba(0,0,0,0.3)` : "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                  opacity: 0,
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.58rem] font-black tracking-[0.18em] px-3 py-1 rounded-full"
                    style={{ background: "#F59E0B", color: "#0F172A" }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: plan.accent }} />
                    <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase" style={{ color: plan.accent }}>
                      {plan.name}
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-snug">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-7">
                  {price === null ? (
                    <div>
                      <div className="text-[2.5rem] font-black leading-none mb-1" style={{ color: isPro ? '#fff' : '#0F172A' }}>Custom</div>
                      <div className="text-sm text-[#64748B]">según tamaño de operación</div>
                    </div>
                  ) : price === 0 ? (
                    <div>
                      <div className="text-[2.5rem] font-black leading-none mb-1" style={{ color: isPro ? '#fff' : '#0F172A' }}>$0</div>
                      <div className="text-sm text-[#64748B]">para siempre</div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-end gap-1 mb-1">
                        <span className="text-[0.9rem] font-bold text-[#64748B] mb-2">$</span>
                        <span className="text-[2.5rem] font-black leading-none" style={{ color: isPro ? '#fff' : '#0F172A' }}>{price}</span>
                        <span className="text-sm text-[#64748B] mb-1.5">/mes · por local</span>
                      </div>
                      {yearly && (
                        <div className="text-[0.7rem] text-[#14B8A6]">
                          Ahorras ${(plan.price.monthly! - plan.price.yearly!) * 12}/año
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handlePlanClick(plan.id)}
                  className="w-full py-3.5 rounded-xl text-sm font-bold mb-7 transition-all cursor-pointer"
                  style={
                    plan.ctaStyle === "filled"
                      ? {
                          background: "#F59E0B",
                          color: "#0F172A",
                          boxShadow: "0 8px 32px rgba(245,158,11,0.35)",
                        }
                      : isPro
                      ? {
                          background: "transparent",
                          color: "rgba(255,255,255,0.75)",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }
                      : {
                          background: "transparent",
                          color: "#0F172A",
                          border: "1px solid #CBD5E1",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (plan.ctaStyle === "filled") {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(245,158,11,0.55)";
                    } else if (isPro) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = plan.accent;
                      (e.currentTarget as HTMLButtonElement).style.color = plan.accent;
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = plan.accent;
                      (e.currentTarget as HTMLButtonElement).style.color = plan.accent;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.ctaStyle === "filled") {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(245,158,11,0.35)";
                    } else if (isPro) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#CBD5E1";
                      (e.currentTarget as HTMLButtonElement).style.color = "#0F172A";
                    }
                  }}
                >
                  {plan.cta}
                </button>

                {/* Divider */}
                <div className="h-px mb-6" style={{ background: isPro ? "rgba(255,255,255,0.06)" : "#E2E8F0" }} />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: plan.accent }}
                        strokeWidth={2.5}
                      />
                    <span className="text-[0.83rem]" style={{ color: isPro ? 'rgba(255,255,255,0.8)' : '#0F172A' }}>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 opacity-35">
                      <div className="w-4 h-4 shrink-0 mt-0.5 flex items-center justify-center">
                        <div className="w-2.5 h-px bg-[#64748B] rounded" />
                      </div>
                      <span className="text-[0.83rem] text-[#64748B]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[0.72rem] text-[#64748B] mt-10">
          Precios en USD. Implementación guiada incluida · Sin tarjeta de crédito para empezar · Soporte en español
        </p>
      </div>
    </section>
  );
}
