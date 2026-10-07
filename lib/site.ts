// URL pública canónica de la landing.
// Orden: SITE_URL (cuando tengamos dominio propio) > dominio de producción de Vercel > fallback fijo.
// Ojo: resthub.app NO es nuestro; nunca debe volver a usarse como canonical.
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return `https://${vercelProd.replace(/\/+$/, "")}`;
  return "https://rest-hub-landing.vercel.app";
}

export const SITE_URL = resolveSiteUrl();
export const SITE_HOST = new URL(SITE_URL).host;

export const SITE_NAME = "RestHUB";
export const SITE_TITLE = "RestHUB | Sistema POS y ERP para restaurantes en Perú";
export const SITE_DESCRIPTION =
  "Software para restaurantes con POS, comandas a cocina (KDS), caja, inventario con costo por plato, facturación electrónica SUNAT y reportes. Hecho en Perú por Árkos.";

export const SAME_AS = [
  "https://www.linkedin.com/company/arkos-pe",
];
