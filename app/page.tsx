import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import ExpandingRoles from "@/components/sections/ExpandingRoles";
import Incluye from "@/components/sections/Incluye";
import Gallery from "@/components/sections/Gallery";
import FoodCost from "@/components/sections/FoodCost";
import Offline from "@/components/sections/Offline";
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
      <Gallery />
      <FoodCost />
      <Offline />
      <ExpandingRoles />
      <Incluye />
      <BelowFoldSections />
      <Footer />
      <StickyCtaBar />
    </>
  );
}
