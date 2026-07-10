"use client";

/**
 * PAGE TRANSITION — a restrained crossfade on navigation. The sacred Refract
 * verb is reserved for entering a ray; ordinary spine navigation gets a gentle
 * Bloom so nothing ever flashes. Under Calm Motion it is instant. A `template`
 * (not a `layout`) so it re-mounts and re-runs on every route change.
 */

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";
import { DURATION, EASE } from "@/lib/design/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const { motionEnabled } = useMotion();

  if (!motionEnabled) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.settle, ease: EASE.settle }}
    >
      {children}
    </motion.div>
  );
}
