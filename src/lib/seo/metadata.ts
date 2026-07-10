/**
 * METADATA HELPERS — per-page SEO with sane spine defaults.
 * next-seo's job, done natively with the App Router Metadata API.
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.thesis}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  keywords: [
    "Jody McNamer",
    "Washington State real estate",
    "VA loan realtor",
    "short sale specialist",
    "real estate coaching",
    "AutismWorks",
    "Kitsap County real estate",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.thesis}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.thesis}`,
    description: SITE.description,
  },
  alternates: { canonical: SITE.url },
};

/** Build metadata for a ray or spine page from a title + description + path. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
