"use client";

// Estas secciones se cargan en chunks aparte, pero SÍ se renderizan en el servidor:
// con ssr:false los bots de IA (que no ejecutan JS) no veían precios, FAQ ni testimonios.
import dynamic from "next/dynamic";

const fallback = <div style={{ minHeight: "200px" }} />;

const ExpandingRoles = dynamic(() => import("@/components/sections/ExpandingRoles"), {
  loading: () => fallback,
});
const Messages = dynamic(() => import("@/components/sections/Messages"), {
  loading: () => fallback,
});
const CaseStudy = dynamic(() => import("@/components/sections/CaseStudy"), {
  loading: () => fallback,
});
const MidStatement = dynamic(() => import("@/components/sections/MidStatement"), {
  loading: () => fallback,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => fallback,
});
const Founder = dynamic(() => import("@/components/sections/Founder"), {
  loading: () => fallback,
});
const Comparison = dynamic(() => import("@/components/sections/Comparison"), {
  loading: () => fallback,
});
const PricingPivot = dynamic(() => import("@/components/sections/PricingPivot"), {
  loading: () => fallback,
});
const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => fallback,
});
const Faq = dynamic(() => import("@/components/sections/Faq"), {
  loading: () => fallback,
});
const Setup = dynamic(() => import("@/components/sections/Setup"), {
  loading: () => fallback,
});
const Cta = dynamic(() => import("@/components/sections/Cta"), {
  loading: () => fallback,
});

export default function BelowFoldSections() {
  return (
    <>
      <ExpandingRoles />
      <Messages />
      <CaseStudy />
      <MidStatement />
      <Testimonials />
      <Founder />
      <Comparison />
      <PricingPivot />
      <Pricing />
      <Faq />
      <Setup />
      <Cta />
    </>
  );
}
