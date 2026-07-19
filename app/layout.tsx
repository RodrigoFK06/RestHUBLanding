import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/modals/ModalProvider";
import ToastProvider from "@/components/ui/Toast";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import CookieBanner from "@/components/ui/CookieBanner";
import LenisProvider from "@/components/providers/LenisProvider";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resthub.app";
const TITLE = "RestHUB — ERP para Restaurantes";
const DESCRIPTION =
  "POS, KDS, caja, contabilidad y BI en un solo sistema. Roles diferenciados, pagos integrados y soporte en español. Diseñado para restaurantes en Latinoamérica.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "RestHUB",
  keywords: [
    "ERP restaurante",
    "POS restaurante",
    "software gestión restaurante",
    "KDS cocina",
    "punto de venta",
    "caja restaurante",
    "Perú",
    "Latinoamérica",
  ],
  authors: [{ name: "RestHUB" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "RestHUB",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export const viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "RestHUB",
      url: SITE_URL,
      inLanguage: "es",
      creator: {
        "@type": "Organization",
        name: "Árkos",
        url: "https://xn--rkos-4na.com",
      },
    },
    {
      "@type": "Organization",
      name: "RestHUB",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      sameAs: [],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+51-961-869-348",
          contactType: "sales",
          areaServed: ["PE", "LATAM"],
          availableLanguage: ["Spanish"],
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "RestHUB",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: [
        { "@type": "Offer", name: "Esencial", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", name: "Profesional", price: "149", priceCurrency: "USD" },
      ],
      description: DESCRIPTION,
    },
  ],
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
      <body className="min-h-full flex flex-col bg-[#0F172A] text-white">
        <LenisProvider />
        <ToastProvider>
          <ModalProvider>
            {children}
            <WhatsAppFab />
            <CookieBanner />
          </ModalProvider>
        </ToastProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
