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
import Footer from "@/components/sections/Footer";
import StickyCtaBar from "@/components/ui/StickyCtaBar";
import DeepLinkOpener from "@/components/modals/DeepLinkOpener";
import BelowFoldSections from "@/components/BelowFoldSections";
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
      <BelowFoldSections />
      <Footer />
      <StickyCtaBar />
    </>
  );
}
