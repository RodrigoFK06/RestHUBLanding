"use client";

import { useInView, motion } from "motion/react";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  inViewMargin?: string;
}

export default function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  blur = "8px",
  inViewMargin = "-50px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once: true, margin: `0px 0px ${inViewMargin} 0px` } as any);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
