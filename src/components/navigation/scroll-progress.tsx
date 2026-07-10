"use client";

/**
 * SCROLL PROGRESS — the sitewide progress indicator, rendered (of course) as a
 * light-line. A hairline of the contextual wavelength at the very top edge that
 * Fills left-to-right with scroll position. Pure transform (scaleX); retires to
 * a static full line under Calm Motion.
 */

import { motion, useScroll, useSpring } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";

export function ScrollProgress() {
  const { motionEnabled } = useMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (!motionEnabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-px origin-left"
      style={{ scaleX, backgroundColor: "var(--wave)", opacity: 0.9 }}
    />
  );
}
