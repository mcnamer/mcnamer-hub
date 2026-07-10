"use client";

/**
 * MOVEMENT II — THE REFRACTION (Awe). The memorable moment: the brand model
 * taught in one wordless second. Scroll pushes the camera toward the line; it
 * meets an implied prism and the white light splits into five rays fanning
 * across the viewport, resolving the thesis.
 *
 * The split is SCROLL-BOUND, not time-bound — the visitor performs the
 * refraction; reversing scroll re-converges the light. Pure transforms, 60fps.
 * Reduced-motion twin: an elegant crossfade to the resolved composition.
 */

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Section } from "@/components/layout/section";
import { useMotion } from "@/components/motion/motion-provider";
import { WAVELENGTH_LIST } from "@/lib/design/wavelengths";
import { THESIS } from "@/lib/constants/content";

/** Target fan angles (deg) for the five rays, shallow and rising. */
const FAN_ANGLES = [-18, -9, 0, 9, 18];

export function MovementRefraction() {
  const { motionEnabled } = useMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 0 → converged white line; 1 → fully fanned spectrum.
  const split = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);
  // Hooks must run unconditionally; the thesis fades in as the fan resolves.
  const thesisOpacity = useTransform(split, [0.4, 0.9], [0, 1]);

  return (
    <Section dayNight="night" label="The Refraction" id="refraction">
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
          {/* The prism convergence point sits at the left third. */}
          <div className="absolute left-[10%] top-1/2 h-0 w-0 sm:left-[18%]">
            {WAVELENGTH_LIST.map((w, i) => (
              <Ray
                key={w.id}
                split={split}
                angle={FAN_ANGLES[i] ?? 0}
                color={w.display}
                name={w.id}
                href={`/${w.slug}`}
                motionEnabled={motionEnabled}
              />
            ))}
          </div>

          {/* The thesis resolves in the lower-right quadrant. */}
          <motion.div
            className="ml-auto max-w-xl px-6 pb-8 pt-[46vh] text-right md:px-16"
            style={motionEnabled ? { opacity: thesisOpacity } : undefined}
          >
            <h2 className="font-voice text-display-1 text-balance text-[var(--color-light-cream)]">
              {THESIS.headline}
            </h2>
            <p className="mt-6 text-body-large italic opacity-70">
              {THESIS.sub}
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

interface RayProps {
  split: MotionValue<number>;
  angle: number;
  color: string;
  name: string;
  href: string;
  motionEnabled: boolean;
}

function Ray({ split, angle, color, name, href, motionEnabled }: RayProps) {
  // Rotate from 0 (converged, overlapping white) to the fan angle.
  const rotate = useTransform(split, [0, 1], [0, angle]);
  const width = useTransform(split, [0, 1], ["36vw", "82vw"]);
  const opacity = useTransform(split, [0, 0.25, 1], [0.15, 0.6, 0.92]);

  const style = motionEnabled
    ? { rotate, width, opacity, transformOrigin: "left center" }
    : {
        rotate: angle,
        width: "82vw",
        opacity: 0.92,
        transformOrigin: "left center" as const,
      };

  return (
    <motion.div
      className="group absolute left-0 top-0 h-px"
      style={style as never}
    >
      <Link
        href={href}
        className="relative block h-px w-full rounded-full no-underline"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px color-mix(in srgb, ${color} 55%, transparent)`,
        }}
        aria-label={`${name} — one of the five ways`}
      >
        {/* The ray's name rides the beam, revealed on hover/focus. */}
        <span
          className="murmur absolute right-2 top-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-90 group-focus-visible:opacity-90"
          style={{ color }}
        >
          {name}
        </span>
      </Link>
    </motion.div>
  );
}
