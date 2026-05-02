"use client";

const BRANDS = [
  "La Mar",
  "Central",
  "Isolina",
  "Astrid & Gastón",
  "Tanta",
  "La Lucha",
  "Maido",
  "Osso",
  "El Mercado",
  "Madam Tusan",
  "Chinawok",
  "Bottega Dasso",
];

type Props = {
  variant?: "hero" | "section";
};

export default function LogosMarquee({ variant = "hero" }: Props) {
  // Duplicamos para loop continuo. La animación marquee mueve -50% del ancho.
  const doubled = [...BRANDS, ...BRANDS];
  const isHero = variant === "hero";

  return (
    <div
      className={`relative w-full overflow-hidden ${
        isHero ? "" : "bg-black border-t border-b border-white/8 py-7"
      }`}
      style={
        isHero
          ? undefined
          : { background: "linear-gradient(180deg, #050505 0%, #0a0a0a 100%)" }
      }
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10"
        style={{
          background: isHero
            ? "linear-gradient(to right, rgba(0,0,0,0.85), transparent)"
            : "linear-gradient(to right, #050505, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10"
        style={{
          background: isHero
            ? "linear-gradient(to left, rgba(0,0,0,0.85), transparent)"
            : "linear-gradient(to left, #050505, transparent)",
        }}
      />

      <div className="animate-marquee flex items-center gap-10 sm:gap-14">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="shrink-0 font-bold tracking-[0.18em] uppercase whitespace-nowrap transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: isHero ? "0.78rem" : "0.95rem",
              color: isHero ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.34)",
              letterSpacing: "0.12em",
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
