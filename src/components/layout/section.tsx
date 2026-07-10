"use client";

/**
 * SECTION — the Movement wrapper (component Tier 3). Each declares its position
 * on the day-night axis and (optionally) a wavelength; while it is the most
 * in-view section it becomes the dominant surface, dawning the whole field to
 * its lighting. This is how "the visitor's scroll is the camera moving through
 * one continuous space."
 *
 * It renders a real <section> with an accessible label so the film is a
 * coherent document/outline for crawlers and screen readers (the Phase 6 law:
 * the film reads correctly unstyled).
 */

import { useEffect, useId, useRef } from "react";
import { useSurface } from "@/components/motion/surface-provider";
import { type DayNight } from "@/lib/design/daynight";
import { type Spectrum } from "@/lib/design/wavelengths";
import { cn } from "@/lib/utils/cn";

interface SectionProps {
  dayNight: DayNight;
  wavelength?: Spectrum;
  /** Accessible section name (also the outline heading target). */
  label: string;
  /** Apply the dark grain material (auto on dark surfaces). */
  grain?: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({
  dayNight,
  wavelength = "spine",
  label,
  grain,
  children,
  className,
  id,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const autoId = useId();
  const sectionId = id ?? autoId;
  const { publish, withdraw } = useSurface();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const key = sectionId;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            publish(key, { dayNight, wavelength }, entry.intersectionRatio);
          } else {
            withdraw(key);
          }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9] },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      withdraw(key);
    };
  }, [sectionId, dayNight, wavelength, publish, withdraw]);

  const useGrain = grain ?? dayNight !== "day";

  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={cn("relative", useGrain && "grain", className)}
    >
      {children}
    </section>
  );
}
