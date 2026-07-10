"use client";

/**
 * THE RAY BAND — the richest hover on the site, because it is a door. A
 * full-width horizontal band (never a card grid — that is banned template-scent)
 * framed as a transformation. Three verbs in 300ms on hover/focus:
 *   · Fill — colour floods the band from the light-line outward.
 *   · Settle — the band opens 12px, "a door opening a crack."
 *   · Draw — the arrow steps 4px forward.
 * Selecting it Refracts the interface into that ray (handled by the transition).
 *
 * Colour is passed in — the band never hard-codes a wavelength.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LightLine } from "./light-line";
import type { Wavelength } from "@/lib/design/wavelengths";

interface RayBandProps {
  href: string;
  wavelength: Wavelength;
  display: string;
  business: string;
  door: string;
  proof: string;
}

export function RayBand({
  href,
  display,
  business,
  door,
  proof,
}: RayBandProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden no-underline outline-none"
      // The wavelength enters as a scoped custom property so children inherit it.
      style={{ ["--wave" as string]: display }}
      aria-label={`${door} — ${business}`}
    >
      {/* Fill — floods from the light-line (left edge) on hover/focus. */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:opacity-[0.07] group-focus-visible:scale-x-100 group-focus-visible:opacity-[0.07]"
        style={{ backgroundColor: display }}
      />

      {/* The band's full-width light-line — illuminates in sequence when scrolled. */}
      <LightLine draw responsive thickness={1} />

      <div className="relative flex items-center justify-between gap-6 py-8 transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:py-[calc(2rem+6px)] group-focus-visible:py-[calc(2rem+6px)] md:py-10">
        <div className="min-w-0">
          <span className="murmur mb-2 block opacity-60" style={{ color: display }}>
            {business}
          </span>
          <h3 className="font-voice text-display-1 text-balance">{door}</h3>
        </div>

        <div className="hidden shrink-0 items-center gap-6 text-right sm:flex">
          <span className="max-w-[16rem] text-body opacity-70">{proof}</span>
          <ArrowRight
            size={28}
            strokeWidth={1.5}
            aria-hidden
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            style={{ color: display }}
          />
        </div>
      </div>
    </Link>
  );
}
