"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TargetAndTransition, Transition, VariantLabels } from "motion/react";

interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

type AnimationTarget = boolean | TargetAndTransition | VariantLabels;

interface RotatingTextProps {
  texts: string[];
  transition?: Transition;
  initial?: AnimationTarget;
  animate?: AnimationTarget;
  exit?: TargetAndTransition | VariantLabels;
  animatePresenceMode?: "wait" | "sync" | "popLayout";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      className,
      style,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (s) => s.segment);
      }
      return Array.from(text);
    };

    const elements = texts[currentIndex]
      ? splitBy === "characters"
        ? splitIntoCharacters(texts[currentIndex])
        : splitBy === "words"
        ? texts[currentIndex].split(" ")
        : splitBy === "lines"
        ? texts[currentIndex].split("\n")
        : texts[currentIndex].split(splitBy)
      : [];

    const getStaggerDelay = useCallback(
      (index: number, total: number) => {
        const staggerOrder: Record<string, (i: number, t: number) => number> = {
          first: (i) => i,
          last: (i, t) => t - 1 - i,
          center: (i, t) => Math.abs(Math.floor(t / 2) - i),
          random: () => Math.random() * total,
        };
        if (typeof staggerFrom === "number") {
          return Math.abs(staggerFrom - index);
        }
        return staggerOrder[staggerFrom]?.(index, total) ?? index;
      },
      [staggerFrom]
    );

    const next = useCallback(() => {
      setCurrentIndex((prev) => {
        const newIndex = loop ? (prev + 1) % texts.length : Math.min(prev + 1, texts.length - 1);
        onNext?.(newIndex);
        return newIndex;
      });
    }, [texts.length, loop, onNext]);

    const previous = useCallback(() => {
      setCurrentIndex((prev) =>
        loop ? (prev - 1 + texts.length) % texts.length : Math.max(prev - 1, 0)
      );
    }, [texts.length, loop]);

    const jumpTo = useCallback((index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, texts.length - 1)));
    }, [texts.length]);

    const reset = useCallback(() => {
      setCurrentIndex(0);
    }, []);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }));

    useEffect(() => {
      if (!auto) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span className={mainClassName ?? className} style={style}>
        <span className="sr-only">{texts[currentIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentIndex}
            className={`flex items-center flex-wrap whitespace-pre-wrap ${splitLevelClassName ?? ""}`}
            aria-hidden
          >
            {elements.map((element, i) => (
              <motion.span
                key={i}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{
                  ...transition,
                  delay: staggerDuration ? getStaggerDelay(i, elements.length) * staggerDuration : 0,
                }}
                className={`inline-block ${elementLevelClassName ?? ""}`}
              >
                {element === " " ? "\u00A0" : element}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
