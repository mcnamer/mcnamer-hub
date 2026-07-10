import Link from "next/link";
import { PrismMark } from "@/components/primitives/prism-mark";
import { CalmMotionToggle } from "@/components/motion/calm-motion-toggle";
import { WAVELENGTH_LIST } from "@/lib/design/wavelengths";
import { SPINE_PAGES, SITE } from "@/lib/constants/site";

/**
 * THE FOOTER — quiet, complete, and honest. The full spine map, the five ways,
 * the Calm Motion toggle, and a person-first sign-off. Rendered on the standard
 * dark field (dusk / field-navy).
 */
export function Footer() {
  const year = 2026; // Stamped at authorship; no client clock needed.

  return (
    <footer className="relative border-t border-white/5 bg-[var(--color-field-navy)] text-[var(--color-light-cream)]">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_auto]">
          {/* Identity */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 no-underline"
              aria-label={`${SITE.name} — home`}
            >
              <PrismMark size={32} />
              <span className="font-voice text-xl font-medium">
                Jody McNamer
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-body text-balance opacity-70">
              {SITE.thesis} {SITE.tagline}
            </p>
          </div>

          {/* The five ways */}
          <nav aria-label="The five ways">
            <h2 className="murmur mb-4 opacity-50">The five ways</h2>
            <ul className="space-y-2.5">
              {WAVELENGTH_LIST.map((w) => (
                <li key={w.id}>
                  <Link
                    href={`/${w.slug}`}
                    className="group inline-flex items-center gap-2.5 text-body no-underline opacity-80 transition-opacity hover:opacity-100"
                  >
                    <span
                      aria-hidden
                      className="h-4 w-px rounded-full transition-all group-hover:h-5"
                      style={{ backgroundColor: w.display }}
                    />
                    {w.business}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* The spine */}
          <nav aria-label="The spine">
            <h2 className="murmur mb-4 opacity-50">The spine</h2>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-body no-underline opacity-80 transition-opacity hover:opacity-100"
                >
                  The Light
                </Link>
              </li>
              {SPINE_PAGES.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-body no-underline opacity-80 transition-opacity hover:opacity-100"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Motion preference */}
          <div className="flex items-start">
            <CalmMotionToggle />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 text-caption opacity-60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Jody McNamer. Built as an authored work — one light, five
            ways forward.
          </p>
          <p>U.S. Navy veteran · Washington State</p>
        </div>
      </div>
    </footer>
  );
}
