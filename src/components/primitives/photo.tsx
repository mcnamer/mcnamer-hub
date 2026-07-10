"use client";

/**
 * PHOTO — the photo-with-settle molecule. When real photography is wired in
 * (`src`), it renders through next/image (AVIF/WebP, responsive, lazy). Until
 * then it renders a refined "light study" placeholder — a composed field in the
 * surface's light, never a gray box — so the art direction is legible and the
 * slot is production-ready.
 *
 * Motion: Bloom + Settle simultaneously — "a print developing." Nothing slides;
 * things resolve into place. Alt text is written editorially: for a
 * screen-reader visitor, the alt text IS the photography.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";
import { DURATION, EASE } from "@/lib/design/motion";
import { cn } from "@/lib/utils/cn";

interface PhotoProps {
  /** Editorial alt text — required. "Two men reviewing a manuscript," never "photo." */
  alt: string;
  src?: string;
  width?: number;
  height?: number;
  /** Aspect ratio for the placeholder slot when no src is present. */
  ratio?: string;
  /** Tint the light study toward the contextual wavelength. */
  tintWavelength?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function Photo({
  alt,
  src,
  width = 1200,
  height = 1500,
  ratio = "4 / 5",
  tintWavelength = false,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 66vw",
}: PhotoProps) {
  const { motionEnabled } = useMotion();

  const settle = motionEnabled
    ? {
        initial: { opacity: 0, y: 10, filter: "brightness(0.7)" },
        whileInView: { opacity: 1, y: 0, filter: "brightness(1)" },
        viewport: { once: true, amount: 0.3, margin: "0px 0px -15% 0px" },
        transition: { duration: DURATION.photographic, ease: EASE.photographic },
      }
    : {};

  return (
    <motion.figure
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/5",
        className,
      )}
      style={{ aspectRatio: src ? undefined : ratio }}
      {...settle}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover"
        />
      ) : (
        <LightStudy alt={alt} tintWavelength={tintWavelength} />
      )}
    </motion.figure>
  );
}

/**
 * The placeholder: a Puget-Sound light study. A layered field of the surface's
 * own light — the art-direction note ("environmental, real, Puget Sound light")
 * expressed, not a stock gray. The alt text remains the true content for AT.
 */
function LightStudy({
  alt,
  tintWavelength,
}: {
  alt: string;
  tintWavelength: boolean;
}) {
  return (
    <div role="img" aria-label={alt} className="absolute inset-0">
      {/* Base field */}
      <div className="absolute inset-0 bg-[var(--color-field-navy)]" />
      {/* Light behaviour — dawn from the lower edge (not decoration: light). */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 110%, color-mix(in srgb, var(--color-gold) 22%, transparent), transparent 60%)",
        }}
      />
      {tintWavelength && (
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(90% 70% at 80% 0%, var(--wave), transparent 55%)",
          }}
        />
      )}
      {/* Horizon line — a light-line, of course. */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-[62%] h-px opacity-40"
        style={{ backgroundColor: "var(--color-gold)" }}
      />
      <div className="grain absolute inset-0" />
      <span className="murmur absolute bottom-4 left-4 max-w-[80%] text-[var(--color-light-cream)]/50">
        {alt}
      </span>
    </div>
  );
}
