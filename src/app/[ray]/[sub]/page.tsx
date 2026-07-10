import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Bloom } from "@/components/motion/bloom";
import { LightLine } from "@/components/primitives/light-line";
import { Button } from "@/components/primitives/button";
import { RAY_CONTENT, RAY_SLUGS } from "@/features/rays/content";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * THE SUB-PATH ROUTE — the third and deepest surface (spine → ray → sub-path),
 * honouring the depth law: never more than two refractions from the spine. A
 * focused environment in the ray's wavelength so distinct personas (e.g. Marcus
 * the military buyer) never wade through each other's story. Statically
 * generated from each ray's declared sub-paths.
 */

interface SubParams {
  params: Promise<{ ray: string; sub: string }>;
}

function subSlug(href: string): string {
  return href.split("/").filter(Boolean).pop() ?? "";
}

function resolve(ray: string, sub: string) {
  const content = RAY_CONTENT[ray];
  const subPath = content?.arrival.subPaths?.find(
    (sp) => subSlug(sp.href) === sub,
  );
  return content && subPath ? { content, subPath } : null;
}

export function generateStaticParams() {
  const params: { ray: string; sub: string }[] = [];
  for (const ray of RAY_SLUGS) {
    for (const sp of RAY_CONTENT[ray]?.arrival.subPaths ?? []) {
      params.push({ ray, sub: subSlug(sp.href) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: SubParams): Promise<Metadata> {
  const { ray, sub } = await params;
  const resolved = resolve(ray, sub);
  if (!resolved) return {};
  return pageMetadata({
    title: `${resolved.subPath.label} — ${resolved.content.business}`,
    description: resolved.subPath.blurb,
    path: `/${ray}/${sub}`,
  });
}

export default async function SubPath({ params }: SubParams) {
  const { ray, sub } = await params;
  const resolved = resolve(ray, sub);
  if (!resolved) notFound();
  const { content, subPath } = resolved;

  return (
    <Section
      dayNight={content.dayNight === "day" ? "day" : "dusk"}
      wavelength={content.wavelength}
      label={`${subPath.label} — ${content.business}`}
      className={
        content.dayNight === "day"
          ? "flex min-h-dvh flex-col justify-center bg-[var(--color-light-cream)] px-6 py-[var(--breath)] text-[var(--color-ink)] md:px-12"
          : "flex min-h-dvh flex-col justify-center px-6 py-[var(--breath)] md:px-12"
      }
    >
      <div className="mx-auto w-full max-w-[var(--container-content)]">
        <Link
          href={`/${ray}`}
          className="mb-10 inline-flex items-center gap-2 text-caption no-underline opacity-70 transition-opacity hover:opacity-100"
        >
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
          Back to {content.business}
        </Link>

        <Bloom>
          {subPath.signal && (
            <p className="murmur mb-6" style={{ color: "var(--wave-text)" }}>
              {subPath.signal}
            </p>
          )}
          <div className="mb-8 w-24">
            <LightLine draw thickness={2} glow={content.dayNight !== "day"} />
          </div>
          <h1 className="max-w-4xl font-voice text-display-hero text-balance leading-[1.02]">
            {subPath.label}
          </h1>
          <p className="mt-8 max-w-2xl text-body-large opacity-80">
            {subPath.blurb}
          </p>

          <div className="mt-14">
            <Button href={content.door.cta.href} magnetic>
              {content.door.cta.label}
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
            </Button>
          </div>
        </Bloom>
      </div>
    </Section>
  );
}
