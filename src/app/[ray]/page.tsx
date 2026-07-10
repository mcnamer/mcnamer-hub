import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RayPage } from "@/features/rays/ray-page";
import { getRayContent, RAY_SLUGS } from "@/features/rays/content";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema } from "@/lib/seo/schema";
import { pageMetadata } from "@/lib/seo/metadata";
import { WAVELENGTHS } from "@/lib/design/wavelengths";

/**
 * THE RAY ROUTE — clean URLs mirroring the spine/ray architecture
 * (/real-estate, /mortgage, …). Statically generated for the five rays; any
 * other single-segment path that isn't a spine page falls through to notFound.
 * Adding a ray to the registry adds its route here automatically.
 */

interface RayParams {
  params: Promise<{ ray: string }>;
}

export function generateStaticParams() {
  return RAY_SLUGS.map((ray) => ({ ray }));
}

export async function generateMetadata({
  params,
}: RayParams): Promise<Metadata> {
  const { ray } = await params;
  const content = getRayContent(ray);
  if (!content) return {};
  return pageMetadata({
    title: `${content.business} — ${WAVELENGTHS[content.wavelength].door}`,
    description: content.metaDescription,
    path: `/${content.slug}`,
  });
}

export default async function Ray({ params }: RayParams) {
  const { ray } = await params;
  const content = getRayContent(ray);
  if (!content) notFound();

  const schema = organizationSchema(content.slug);

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <RayPage content={content} />
    </>
  );
}
