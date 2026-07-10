"use client";

/**
 * THE THREAD — Layer 3 of the navigation, present only inside a ray. A slim
 * indicator of position in the ray's six movements, plus the constant,
 * understated way home: white light always visible at the edge of the ray's
 * colour. Nobody lost, nobody trapped.
 *
 * Desktop: a vertical rail of six ticks on the right. Mobile: a thin progress
 * edge at the top. Both are decorative mirrors of real, in-page anchor links,
 * so keyboard and screen-reader users navigate by the headings themselves.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";

const MOVEMENTS = [
  "Arrival",
  "Problem",
  "Guide",
  "Path",
  "Proof",
  "Door",
] as const;

export function RayThread() {
  const { motionEnabled } = useMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.movementIndex,
            );
            if (!Number.isNaN(index)) setActive(index);
          }
        }
      },
      { threshold: 0.5 },
    );
    document
      .querySelectorAll("[data-movement-index]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile: a thin progress edge. */}
      {motionEnabled && (
        <motion.div
          aria-hidden
          className="fixed inset-x-0 top-0 z-30 h-0.5 origin-left lg:hidden"
          style={{ scaleX, backgroundColor: "var(--wave)" }}
        />
      )}

      {/* Desktop: the six-movement rail + the way home. */}
      <nav
        aria-label="Position within this ray"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        {/* The way home — white light at the edge of the ray's colour. */}
        <Link
          href="/"
          aria-label="Return to the light"
          className="mb-2 grid size-8 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40"
        >
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-[var(--color-light-cream)]"
          />
        </Link>
        <ul className="flex flex-col items-center gap-3">
          {MOVEMENTS.map((label, i) => (
            <li key={label}>
              <a
                href={`#movement-${i}`}
                aria-label={`${label} (movement ${i + 1} of 6)`}
                aria-current={active === i ? "true" : undefined}
                className="group flex items-center"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? 10 : 6,
                    height: 2,
                    backgroundColor:
                      active >= i ? "var(--wave)" : "rgba(255,255,255,0.25)",
                    opacity: active === i ? 1 : 0.7,
                  }}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
