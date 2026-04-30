import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "RestHUB — ERP para Restaurantes",
  description:
    "Gestión integral para tu restaurante: pedidos, cocina, inventario, staff y reportes en un solo sistema. Aumenta ventas y reduce desperdicios desde el primer día.",
  openGraph: {
    title: "RestHUB — ERP para Restaurantes",
    description: "El sistema operativo de tu restaurante. Mesas, cocina, inventario, staff y reportes unificados.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0F172A] text-white">{children}</body>
    </html>
  );
}
