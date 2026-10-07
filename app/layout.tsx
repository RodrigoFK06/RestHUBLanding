import type { Metadata } from "next";
import { Archivo, Inter, Playfair_Display } from "next/font/google";
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

// Mundo «la comanda» (D6): Archivo con eje de ancho — condensada para titulares y cifras,
// normal para texto, cursiva para la tinta carbón del talonario. Es la misma familia de la
// carta del comensal en el producto. Inter y Playfair se retiran sección por sección.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["wdth"],
});

import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SAME_AS } from "@/lib/site";
import { faqs } from "@/lib/faqs";

const TITLE = SITE_TITLE;
const DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "sistema para restaurantes",
    "software para restaurantes Perú",
    "POS restaurante",
    "ERP restaurante",
    "punto de venta restaurante",
    "facturación electrónica SUNAT restaurante",
    "comandas cocina KDS",
    "control de caja restaurante",
    "costo por plato",
    "carta QR restaurante",
  ],
  authors: [{ name: "Árkos", url: "https://xn--rkos-4na.com" }],
  creator: "Árkos",
  publisher: "Árkos",
  category: "software",
  alternates: { canonical: "/" },
  // Pega el código de Search Console / Bing Webmaster como variable de entorno en Vercel.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
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
    siteName: SITE_NAME,
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
  themeColor: "#121212",
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
      "@id": `${SITE_URL}/#organization`,
      name: "RestHUB",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      sameAs: SAME_AS,
      parentOrganization: {
        "@type": "Organization",
        name: "Árkos",
        url: "https://xn--rkos-4na.com",
        sameAs: SAME_AS,
      },
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
      applicationSubCategory: "Restaurant POS / ERP",
      operatingSystem: "Web",
      url: SITE_URL,
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: [
        { "@type": "Offer", name: "Starter", price: "159", priceCurrency: "PEN", url: `${SITE_URL}/#precios` },
        { "@type": "Offer", name: "Pro", price: "399", priceCurrency: "PEN", url: `${SITE_URL}/#precios` },
        { "@type": "Offer", name: "Enterprise", price: "719", priceCurrency: "PEN", url: `${SITE_URL}/#precios` },
      ],
      featureList: [
        "Punto de venta (POS) para mozos y caja",
        "Pantalla de cocina y barra (KDS)",
        "Boletas y facturas electrónicas SUNAT",
        "Inventario con recetas y costo por plato",
        "Carta y pedidos por QR",
        "Contabilidad y reportes",
        "Operación offline",
      ],
      description: DESCRIPTION,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
      className={`${inter.variable} ${playfair.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-mostrador text-white">
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
