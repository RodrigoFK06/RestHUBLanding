import { SITE_HOST } from "@/lib/site";
import { ImageResponse } from "next/og";

// Imagen para redes en el mundo «la comanda» (docs/diseno/decisiones.md · D18): mostrador
// obsidiana, titular con «bajo control.» en menta y la comanda de la Mesa 4 en papel.

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RestHUB: sistema POS y ERP para restaurantes en Perú";

const LINEAS = [
  ["2", "1/4 Pollo a la brasa", "48.00"],
  ["1", "Chicha morada 1 L", "12.00"],
];

export default function Image() {
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
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#CFCFCF" }}>RestHUB</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 36 }}>
            <div style={{ fontSize: 86, lineHeight: 0.98, fontWeight: 900, letterSpacing: -3 }}>Tu restaurante,</div>
            <div style={{ fontSize: 86, lineHeight: 0.98, fontWeight: 900, letterSpacing: -3, color: "#5DC9A5" }}>bajo control.</div>
          </div>
          <div style={{ marginTop: 30, fontSize: 28, lineHeight: 1.4, color: "#CFCFCF" }}>
            Pedidos, cocina y caja en un solo sistema. Hecho en Perú, en soles.
          </div>
          <div style={{ marginTop: 40, fontSize: 22, fontWeight: 700, color: "#A8A8A8" }}>{SITE_HOST}</div>
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
            <div style={{ fontSize: 30, fontWeight: 900 }}>COMANDA</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#A4521C" }}>N° 000482</div>
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 20, fontWeight: 700, color: "#3F5A52" }}>MESA 4 · SALÓN · 12:41</div>
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
            <span style={{ fontSize: 20, fontWeight: 900 }}>TOTAL</span>
            <span style={{ fontSize: 40, fontWeight: 900 }}>S/ 60.00</span>
          </div>
        </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
