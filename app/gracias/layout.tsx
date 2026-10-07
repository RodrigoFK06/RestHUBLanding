import type { Metadata } from "next";

// Página post-checkout: no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Gracias",
  robots: { index: false, follow: false },
};

export default function GraciasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
