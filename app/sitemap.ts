import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Fecha fija: si cambia en cada build, Google deja de confiar en lastmod.
// Actualízala cuando cambie el contenido de la landing.
const LAST_CONTENT_UPDATE = new Date("2026-10-06");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/legal/privacidad`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/terminos`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
