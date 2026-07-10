import type { MetadataRoute } from "next";
import { SITE, SPINE_PAGES } from "@/lib/constants/site";
import { RAY_CONTENT, RAY_SLUGS } from "@/features/rays/content";

/**
 * SITEMAP — one human-readable sitemap mirroring the spine/ray architecture.
 * Spine first (highest authority), then the five rays, then their sub-paths.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-07-10");

  const spine: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...SPINE_PAGES.map((p) => ({
      url: `${SITE.url}${p.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const rays: MetadataRoute.Sitemap = RAY_SLUGS.map((slug) => ({
    url: `${SITE.url}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const subPaths: MetadataRoute.Sitemap = RAY_SLUGS.flatMap((slug) =>
    (RAY_CONTENT[slug]?.arrival.subPaths ?? []).map((sp) => ({
      url: `${SITE.url}${sp.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...spine, ...rays, ...subPaths];
}
