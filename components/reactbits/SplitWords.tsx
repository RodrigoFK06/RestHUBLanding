"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface SplitWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.07,
}: SplitWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll(".sw-w");
      if (!words?.length) return;
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(words, { y: "0%", opacity: 1 });
        return;
      }
      gsap.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger,
          delay,
        }
      );
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`inline ${className}`}>
      {text.split(" ").map((word, i, arr) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom", paddingBottom: "0.06em" }}
        >
          <span className="sw-w inline-block">
            {word}
            {i < arr.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
