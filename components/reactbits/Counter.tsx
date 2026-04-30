"use client";

import { useSpring, useTransform, motion, MotionValue, useInView } from "motion/react";
import { useEffect, useRef } from "react";

function Digit({
  mv,
  place,
  fontSize,
  height,
  textColor,
  fontWeight,
  gradientFrom,
  gradientTo,
  borderRadius,
}: {
  mv: MotionValue<number>;
  place: number;
  fontSize: number;
  height: number;
  textColor: string;
  fontWeight: number;
  gradientFrom: string;
  gradientTo: string;
  borderRadius: number;
}) {
  const placeMv = useTransform(mv, (v: number) => Math.floor(v / place));
  const modMv = useTransform(placeMv, (v: number) => v % 10);

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color: textColor,
        width: fontSize * 0.65,
        height,
        borderRadius,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {[...Array(10)].map((_, i) => (
        <SingleDigit key={i} digit={i} modMv={modMv} height={height} />
      ))}
    </div>
  );
}

function SingleDigit({
  digit,
  modMv,
  height,
}: {
  digit: number;
  modMv: MotionValue<number>;
  height: number;
}) {
  const y = useTransform(modMv, (latest: number) => {
    const offset = (10 + digit - latest) % 10;
    return offset <= 5 ? -offset * height : (10 - offset) * height;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center select-none"
    >
      {digit}
    </motion.span>
  );
}

interface CounterProps {
  value: number;
  fontSize?: number;
  places?: number[];
  gap?: number;
  borderRadius?: number;
  textColor?: string;
  fontWeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function Counter({
  value,
  fontSize = 64,
  places = [100, 10, 1],
  gap = 4,
  borderRadius = 4,
  textColor = "white",
  fontWeight = 700,
  gradientFrom = "transparent",
  gradientTo = "transparent",
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const mv = useSpring(0, { mass: 0.8, stiffness: 60, damping: 15 });

  useEffect(() => {
    if (isInView) mv.set(value);
  }, [mv, isInView, value]);

  const height = Math.round(fontSize * 1.2);

  return (
    <div ref={ref} className="flex" style={{ gap }}>
      {places.map((place, i) => (
        <Digit
          key={i}
          mv={mv}
          place={place}
          fontSize={fontSize}
          height={height}
          textColor={textColor}
          fontWeight={fontWeight}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
          borderRadius={borderRadius}
        />
      ))}
    </div>
  );
}
