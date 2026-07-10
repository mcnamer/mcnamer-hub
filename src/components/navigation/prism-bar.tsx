"use client";

/**
 * THE PRISM BAR — Layer 1 of the navigation system. At rest it is a completely
 * conventional labeled top bar (zero learning curve). The signature lives
 * *inside* the familiar form: each label carries a hairline of its wavelength;
 * on hover/focus the line brightens and lengthens "like light through glass,"
 * and inside a ray that ray's line burns steady.
 *
 * At the top of the page it is nearly transparent; once scrolled it becomes one
 * of the system's only two Glass surfaces (blur 16px, field-navy 72%, 1px white
 * top edge). Mobile condenses to mark + Door + Refractor trigger.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { PrismMark } from "@/components/primitives/prism-mark";
import { Button } from "@/components/primitives/button";
import { WAVELENGTHS, type Wavelength } from "@/lib/design/wavelengths";
import {
  PRISM_BAR_RAYS,
  PRISM_BAR_SPINE,
  DOOR,
  SITE,
} from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

interface PrismBarProps {
  onOpenRefractor: () => void;
}

export function PrismBar({ onOpenRefractor }: PrismBarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-white/5 bg-[color-mix(in_srgb,var(--color-field-navy)_72%,transparent)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      {/* 1px white top edge — the Glass material's tell. */}
      {scrolled && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-white/10"
        />
      )}
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[var(--container-stage)] items-center justify-between gap-6 px-6 md:px-12"
      >
        {/* Mark — always home to the spine (white light). */}
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="flex shrink-0 items-center gap-2.5 no-underline"
        >
          <PrismMark size={30} spectral={pathname === "/"} />
          <span className="hidden font-voice text-lg font-medium tracking-tight sm:inline">
            McNamer
          </span>
        </Link>

        {/* Ray + spine labels — the conventional bar, signature hairlines within. */}
        <ul className="hidden items-center gap-1 lg:flex">
          {PRISM_BAR_RAYS.map((ray) => (
            <NavLabel
              key={ray.href}
              href={ray.href}
              label={ray.shortLabel}
              wavelength={ray.wavelength}
              active={pathname.startsWith(ray.href)}
            />
          ))}
          <li aria-hidden className="mx-2 h-4 w-px bg-white/10" />
          {PRISM_BAR_SPINE.map((page) => (
            <NavLabel
              key={page.href}
              href={page.href}
              label={page.label}
              active={pathname.startsWith(page.href)}
            />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* The Refractor trigger — the power layer, never a dependency. */}
          <button
            type="button"
            onClick={onOpenRefractor}
            aria-label="Open the Refractor — jump to any destination"
            aria-haspopup="dialog"
            className="grid size-10 place-items-center rounded-full text-current/70 transition-colors hover:text-current focus-visible:text-current"
          >
            <Menu size={20} strokeWidth={1.5} aria-hidden />
          </button>
          <div className="hidden sm:block">
            <Button href={DOOR.href} className="px-5 py-2.5 text-caption">
              {DOOR.label}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

interface NavLabelProps {
  href: string;
  label: string;
  wavelength?: Wavelength;
  active: boolean;
}

function NavLabel({ href, label, wavelength, active }: NavLabelProps) {
  const color = wavelength
    ? WAVELENGTHS[wavelength].display
    : "var(--color-gold)";
  return (
    <li>
      <Link
        href={href}
        className="group relative block px-3 py-2 text-body-large text-sm no-underline opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        aria-current={active ? "page" : undefined}
      >
        {label}
        {/* The wavelength hairline — brightens + lengthens on hover; steady inside the ray. */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-1 left-3 h-px rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active
              ? "w-[calc(100%-1.5rem)] opacity-100"
              : "w-3 opacity-60 group-hover:w-[calc(100%-1.5rem)] group-hover:opacity-100 group-focus-visible:w-[calc(100%-1.5rem)]",
          )}
          style={{ backgroundColor: color }}
        />
      </Link>
    </li>
  );
}
