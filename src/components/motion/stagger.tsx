"use client";

/**
 * STAGGER — a Bloom sequence. Children arrive one after another along reading
 * direction (the "walking past lit doorways" cadence of Movement V, the
 * settle-count sequence of The Record). Built on Framer's stagger orchestration.
 */

import { motion, type Variants } from "framer-motion";
import { Children, type ReactNode } from "react";
import { useMotion } from "./motion-provider";
import { EASE, DURATION, DISTANCE } from "@/lib/design/motion";

interface StaggerProps {
  children: ReactNode;
  /** Seconds between each child's bloom. */
  step?: number;
  /** Delay before the first child. */
  delay?: number;
  amount?: number;
  className?: string;
  as?: "div" | "ul" | "ol";
}

const container: Variants = {
  hidden: {},
  shown: (custom: { step: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.step,
      delayChildren: custom.delay,
    },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: DISTANCE.parallax },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.settle, ease: EASE.settle },
  },
};

export function Stagger({
  children,
  step = 0.12,
  delay = 0,
  amount = 0.3,
  className,
  as = "div",
}: StaggerProps) {
  const { motionEnabled } = useMotion();
  const MotionTag = motion[as];

  if (!motionEnabled) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={{ step, delay }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount, margin: "0px 0px -20% 0px" }}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </MotionTag>
  );
}
