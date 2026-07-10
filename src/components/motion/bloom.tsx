"use client";

/**
 * BLOOM — "luminosity arriving." The verb that replaces every conventional
 * fade-in. Change of light, never distance (a tokened ≤8px settle is permitted
 * to accompany it — a print developing, not a slide).
 *
 * LAW: "Nothing waits below the fold broken." The element is fully legible at
 * rest; the entrance is garnish on presence. So we render visible content and
 * only *dim then bloom* when motion is live — a reduced-motion or SSR visitor
 * sees 100% legibility with zero dependency on JS.
 */

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useMotion } from "./motion-provider";
import { EASE, DURATION, DISTANCE } from "@/lib/design/motion";

interface BloomProps {
  children: ReactNode;
  /** Seconds of delay before this element blooms (for hand-tuned sequencing). */
  delay?: number;
  /** Vertical settle distance in px, capped at the parallax token. */
  settle?: number;
  /** Photographic tempo (600ms) instead of the standard 300ms. */
  photographic?: boolean;
  /** Fraction of the element that must be in view before blooming. */
  amount?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export function Bloom({
  children,
  delay = 0,
  settle = 8,
  photographic = false,
  amount = 0.35,
  className,
  style,
  id,
}: BloomProps) {
  const { motionEnabled } = useMotion();
  const distance = Math.min(settle, DISTANCE.parallax);

  if (!motionEnabled) {
    // Present, legible, still. The film reads correctly without motion.
    return (
      <div className={className} style={style} id={id}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      id={id}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -20% 0px" }}
      transition={{
        duration: photographic ? DURATION.photographic : DURATION.settle,
        ease: photographic ? EASE.photographic : EASE.settle,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
