import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import StatementInterlude from "@/components/sections/StatementInterlude";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Stats from "@/components/sections/Stats";
import Why from "@/components/sections/Why";
import EditorialGrid from "@/components/sections/EditorialGrid";
import StickyModules from "@/components/sections/StickyModules";
import Integrations from "@/components/sections/Integrations";
import Flow from "@/components/sections/Flow";
import ExpandingRoles from "@/components/sections/ExpandingRoles";
import Comparison from "@/components/sections/Comparison";
import Messages from "@/components/sections/Messages";
import CaseStudy from "@/components/sections/CaseStudy";
import MidStatement from "@/components/sections/MidStatement";
import Testimonials from "@/components/sections/Testimonials";
import PricingPivot from "@/components/sections/PricingPivot";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Setup from "@/components/sections/Setup";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";
import StickyCtaBar from "@/components/ui/StickyCtaBar";
import DeepLinkOpener from "@/components/modals/DeepLinkOpener";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <DeepLinkOpener />
      </Suspense>
      <Nav />
      <Hero />
      <StatementInterlude />
      <MarqueeStrip />
      <Stats />
      <Why />
      <EditorialGrid />
      <StickyModules />
      <Integrations />
      <Flow />
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
      <Footer />
      <StickyCtaBar />
    </>
  );
}
