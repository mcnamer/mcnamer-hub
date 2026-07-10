"use client";

/**
 * COUNTER — a single 0.6s settle-count, "never a slot machine." Parses the
 * numeric core of a figure ("500+", "$50M+", "23 years") and counts only that,
 * preserving prefix and suffix. Fires once when scrolled into view. Under Calm
 * Motion the final value is present immediately.
 */

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";
import { DURATION, EASE } from "@/lib/design/motion";

interface CounterProps {
  /** The full figure string, e.g. "$50M+" or "23 years". */
  value: string;
}

/** Split "$50M+" → { prefix:"$", number:50, suffix:"M+" }. */
function parseFigure(value: string): {
  prefix: string;
  number: number | null;
  suffix: string;
} {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return { prefix: value, number: null, suffix: "" };
  const [, prefix = "", digits = "", suffix = ""] = match;
  return { prefix, number: Number(digits.replace(/,/g, "")), suffix };
}

export function Counter({ value }: CounterProps) {
  const { motionEnabled } = useMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { prefix, number, suffix } = parseFigure(value);
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(number ?? 0);

  useEffect(() => {
    if (number === null) return;
    if (!motionEnabled || !inView) {
      setDisplay(number);
      return;
    }
    const controls = animate(mv, number, {
      duration: DURATION.photographic,
      ease: EASE.settle,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, motionEnabled, number, mv]);

  if (number === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
