import { SITE_HOST } from "@/lib/site";
import { ImageResponse } from "next/og";

// Imagen para redes en el mundo «la comanda» (docs/diseno/decisiones.md · D18): mostrador
// obsidiana, titular en Archivo condensada con «bajo control.» en menta y la comanda de la
// Mesa 4 en papel, con sus copias detrás.

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RestHUB: sistema POS y ERP para restaurantes en Perú";

const LINEAS = [
  ["2", "1/4 Pollo a la brasa", "48.00"],
  ["1", "Chicha morada 1 L", "12.00"],
];

// Satori necesita TTF/OTF estático: se pide a Google Fonts la instancia exacta y solo los
// caracteres que usa la imagen.
async function fuente(familia: string, texto: string): Promise<ArrayBuffer> {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${familia}&text=${encodeURIComponent(texto)}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("sin fuente");
  return (await fetch(url)).arrayBuffer();
}

const TEXTO_COND = "RestHUBTu restaurante,bajo control.COMANDAN° 000482TOTALS/ 60.00";
const TEXTO_NORMAL = `Pedidos, cocina y caja en un solo sistema. Hecho en Perú, en soles.${SITE_HOST}MESA 4 · SALÓN · 12:41`;
const TEXTO_ITALICA = LINEAS.map((l) => l.join(" × ")).join(" ") + "0123456789.×";

export default async function Image() {
  let fuentes: { name: string; data: ArrayBuffer; weight: 400 | 600 | 900; style: "normal" | "italic" }[] = [];
  try {
    const [cond, normal, italica] = await Promise.all([
      fuente("Archivo:wdth,wght@62.5,900", TEXTO_COND),
      fuente("Archivo:wght@400", TEXTO_NORMAL),
      fuente("Archivo:ital,wght@1,600", TEXTO_ITALICA),
    ]);
    fuentes = [
      { name: "ArchivoCond", data: cond, weight: 900, style: "normal" },
      { name: "Archivo", data: normal, weight: 400, style: "normal" },
      { name: "Archivo", data: italica, weight: 600, style: "italic" },
    ];
  } catch {
    // Sin conexión a Google Fonts la imagen sale igual, con la fuente del sistema.
  }
  const cond = fuentes.length ? "ArchivoCond" : "system-ui";
  const texto = fuentes.length ? "Archivo" : "system-ui";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#121212",
          color: "#FFFFFF",
          fontFamily: texto,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
          <div style={{ fontFamily: cond, fontSize: 34, fontWeight: 900, color: "#CFCFCF" }}>RestHUB</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
            <div style={{ fontFamily: cond, fontSize: 96, lineHeight: 0.92, fontWeight: 900 }}>Tu restaurante,</div>
            <div style={{ fontFamily: cond, fontSize: 96, lineHeight: 0.92, fontWeight: 900, color: "#5DC9A5" }}>bajo control.</div>
          </div>
          <div style={{ marginTop: 30, fontSize: 28, lineHeight: 1.4, color: "#CFCFCF" }}>
            Pedidos, cocina y caja en un solo sistema. Hecho en Perú, en soles.
          </div>
          <div style={{ marginTop: 36, fontSize: 22, color: "#A8A8A8" }}>{SITE_HOST}</div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 380 }}>
          <div style={{ position: "absolute", left: 22, top: 26, right: -22, bottom: -26, background: "#F4C27A", borderRadius: 4, transform: "rotate(2deg)" }} />
          <div style={{ position: "absolute", left: 11, top: 13, right: -11, bottom: -13, background: "#9EDCCB", borderRadius: 4, transform: "rotate(0.8deg)" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 380,
              padding: "28px 30px 30px",
              background: "#EEF5F2",
              color: "#121212",
              borderRadius: 4,
              transform: "rotate(-1.5deg)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "3px solid #121212", paddingBottom: 10 }}>
              <div style={{ fontFamily: cond, fontSize: 38, fontWeight: 900, lineHeight: 1 }}>COMANDA</div>
              <div style={{ fontFamily: cond, fontSize: 30, fontWeight: 900, lineHeight: 1, color: "#A4521C" }}>N° 000482</div>
            </div>
            <div style={{ display: "flex", marginTop: 14, fontSize: 18, color: "#3F5A52" }}>MESA 4 · SALÓN · 12:41</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 12 }}>
              {LINEAS.map(([cant, nombre, importe]) => (
                <div
                  key={nombre}
                  style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #C3D6CF", fontSize: 24, fontStyle: "italic", fontWeight: 600, color: "#23286B" }}
                >
                  <span>
                    {cant} × {nombre}
                  </span>
                  <span>{importe}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 18, borderTop: "3px solid #121212", paddingTop: 10 }}>
              <span style={{ fontFamily: cond, fontSize: 24, fontWeight: 900 }}>TOTAL</span>
              <span style={{ fontFamily: cond, fontSize: 50, fontWeight: 900 }}>S/ 60.00</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fuentes.length ? fuentes : undefined }
  );
}
