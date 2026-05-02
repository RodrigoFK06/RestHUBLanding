"use client";

import { useMemo } from "react";

const COLORS = ["#F59E0B", "#FCD34D", "#14B8A6", "#34D399", "#60A5FA", "#F472B6"];

type Piece = {
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
  size: number;
  drift: number;
};

export default function Confetti({ count = 36 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.25,
      duration: 1.6 + Math.random() * 1.4,
      rotate: Math.random() * 360,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 60,
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "600px" }}
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.45,
            background: p.color,
            borderRadius: "2px",
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ${p.delay}s cubic-bezier(0.2,0.6,0.4,1) forwards`,
            // CSS custom property used inside keyframes for unique drift per piece
            ["--drift" as never]: `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translate3d(0, -20px, 0) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translate3d(var(--drift, 0), 380px, 0) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
