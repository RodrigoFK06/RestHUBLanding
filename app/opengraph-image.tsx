import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RestHUB — ERP para Restaurantes";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0F172A",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(245,158,11,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 100% 100%, rgba(20,184,166,0.18) 0%, transparent 60%)",
          color: "#fff",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#F59E0B",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#F59E0B" }} />
          RestHUB · v1.0
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: -3,
              color: "#fff",
              maxWidth: 980,
            }}
          >
            Tu restaurante,
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: -3,
              fontStyle: "italic",
              color: "#F59E0B",
              maxWidth: 980,
            }}
          >
            bajo control.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            POS · Cocina · Caja · Contabilidad — un solo sistema, cada rol con su pantalla.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.45)",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", gap: 28, fontWeight: 600 }}>
            <span>POS</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>·</span>
            <span>KDS</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>·</span>
            <span>Caja</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>·</span>
            <span>Contabilidad</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>·</span>
            <span>BI</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>resthub.app</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
