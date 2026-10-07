// URL pública canónica de la landing: resthub.tech.
// SITE_URL en Vercel permite cambiarla sin tocar código.
// Ojo: resthub.app NO es nuestro; nunca debe volver a usarse como canonical.
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  return "https://resthub.tech";
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
