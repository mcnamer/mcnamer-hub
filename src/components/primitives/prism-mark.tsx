"use client";

/**
 * THE MARK — the prism glyph. White light enters, refracts, leaves as five
 * rays. This is gold's third sanctioned job (the mark itself). Drawn on a 24px
 * grid with 1.5px strokes and rounded terminals — "as if traced by light."
 *
 * On first mount the rays self-draw; at rest the incoming beam breathes.
 */

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";
import { WAVELENGTH_LIST } from "@/lib/design/wavelengths";
import { EASE, DURATION } from "@/lib/design/motion";

interface PrismMarkProps {
  size?: number;
  /** Colour the rays with the spectrum (home) or keep monochrome gold (in-ray). */
  spectral?: boolean;
  className?: string;
}

export function PrismMark({
  size = 32,
  spectral = true,
  className,
}: PrismMarkProps) {
  const { motionEnabled } = useMotion();

  // Five rays fanning from the prism's right vertex.
  const rays = WAVELENGTH_LIST.map((w, i) => {
    const angle = (i - 2) * 7; // -14°..+14°
    const rad = (angle * Math.PI) / 180;
    const len = 9;
    const x2 = 15 + Math.cos(rad) * len;
    const y2 = 12 + Math.sin(rad) * len;
    return { color: spectral ? w.display : "var(--color-gold)", x2, y2, key: w.id };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Incoming white beam */}
      <line
        x1="1"
        y1="12"
        x2="8"
        y2="12"
        stroke="var(--color-light-cream)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={motionEnabled ? "breath" : undefined}
      />
      {/* The prism — a light-traced triangle in gold */}
      <path
        d="M8 6 L15 12 L8 18 Z"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Refracted rays */}
      {rays.map((r, i) =>
        motionEnabled ? (
          <motion.line
            key={r.key}
            x1="15"
            y1="12"
            x2={r.x2}
            y2={r.y2}
            stroke={r.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{
              duration: DURATION.settle,
              ease: EASE.settle,
              delay: 0.3 + i * 0.06,
            }}
          />
        ) : (
          <line
            key={r.key}
            x1="15"
            y1="12"
            x2={r.x2}
            y2={r.y2}
            stroke={r.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        ),
      )}
    </svg>
  );
}
