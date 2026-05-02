"use client";

import dynamic from "next/dynamic";

const fallback = <div style={{ minHeight: "200px" }} />;

const ExpandingRoles = dynamic(() => import("@/components/sections/ExpandingRoles"), {
  loading: () => fallback,
  ssr: false,
});
const Messages = dynamic(() => import("@/components/sections/Messages"), {
  loading: () => fallback,
  ssr: false,
});
const CaseStudy = dynamic(() => import("@/components/sections/CaseStudy"), {
  loading: () => fallback,
  ssr: false,
});
const MidStatement = dynamic(() => import("@/components/sections/MidStatement"), {
  loading: () => fallback,
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => fallback,
  ssr: false,
});
const Comparison = dynamic(() => import("@/components/sections/Comparison"), {
  loading: () => fallback,
  ssr: false,
});
const PricingPivot = dynamic(() => import("@/components/sections/PricingPivot"), {
  loading: () => fallback,
  ssr: false,
});
const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => fallback,
  ssr: false,
});
const Faq = dynamic(() => import("@/components/sections/Faq"), {
  loading: () => fallback,
  ssr: false,
});
const Setup = dynamic(() => import("@/components/sections/Setup"), {
  loading: () => fallback,
  ssr: false,
});
const Cta = dynamic(() => import("@/components/sections/Cta"), {
  loading: () => fallback,
  ssr: false,
});

export default function BelowFoldSections() {
  return (
    <>
      <ExpandingRoles />
      <Messages />
      <CaseStudy />
      <MidStatement />
      <Testimonials />
      <Comparison />
      <PricingPivot />
      <Pricing />
      <Faq />
      <Setup />
      <Cta />
    </>
  );
}
