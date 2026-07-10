"use client";

/**
 * THE LIGHT-LINE — the atomic brand unit. One element carries the prism
 * metaphor everywhere it appears: underline, divider, progress indicator, nav
 * accent. "The most repeated gesture = the identity."
 *
 * Behaviours:
 *   · Breath at rest (ambient ±luminosity; retired under Calm Motion).
 *   · Draw on first entrance (scaleX 0→1 along reading direction, tempo-settle).
 *   · On parent hover/focus: +brightness, +8px extension (via the `group`).
 *
 * Colour flows down from context (`--wave`); the line never hard-codes a hex.
 */

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";
import { EASE, DURATION } from "@/lib/design/motion";
import { cn } from "@/lib/utils/cn";

interface LightLineProps {
  /** Self-draw when scrolled into view. */
  draw?: boolean;
  /** Ambient breath at rest. */
  breath?: boolean;
  /** Respond to a parent `.group` hover/focus with brightness + extension. */
  responsive?: boolean;
  /** Steady burn — the "you are here" state inside a ray. */
  active?: boolean;
  /** Thickness in px. */
  thickness?: number;
  /** Soft glow halo (dark fields only; static, never animated). */
  glow?: boolean;
  className?: string;
}

export function LightLine({
  draw = false,
  breath = false,
  responsive = false,
  active = false,
  thickness = 1,
  glow = false,
  className,
}: LightLineProps) {
  const { motionEnabled } = useMotion();

  const base = cn(
    "block w-full origin-left rounded-full",
    breath && motionEnabled && "breath",
    responsive &&
      "transition-[filter,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-125 group-focus-visible:brightness-125 group-hover:scale-x-105 group-focus-visible:scale-x-105",
    className,
  );

  const style: React.CSSProperties = {
    height: thickness,
    backgroundColor: "var(--wave)",
    opacity: active ? 1 : 0.85,
    boxShadow: glow
      ? "0 0 12px color-mix(in srgb, var(--wave) 55%, transparent)"
      : undefined,
  };

  if (draw && motionEnabled) {
    return (
      <motion.span
        aria-hidden
        className={base}
        style={style}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: DURATION.settle, ease: EASE.settle }}
      />
    );
  }

  return <span aria-hidden className={base} style={style} />;
}
