/**
 * SCHEMA.ORG — "The Decade Engine," Tier 1: The Entity.
 *
 * Teach search one fact: Jody McNamer is a single authoritative entity with
 * five expressions. Person schema on the spine; Organization schema per ray;
 * relationships explicit — the knowledge graph mirrors the prism.
 */

import { SITE } from "@/lib/constants/site";
import { WAVELENGTH_LIST } from "@/lib/design/wavelengths";

const PERSON_ID = `${SITE.url}/#jody-mcnamer`;

/** The Person entity — the white light. Every ray's Organization points back. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Jody McNamer",
    url: SITE.url,
    description: SITE.tagline,
    jobTitle: "Real estate broker, mentor, and entrepreneur",
    knowsAbout: [
      "Real estate",
      "Short sales",
      "VA loans",
      "Mortgage lending",
      "Real estate coaching",
      "Autism advocacy",
    ],
    hasCredential: [
      "23+ years in Washington State real estate",
      "500+ properties",
      "$50M+ in short-sale transactions since 2003",
      "U.S. Navy veteran",
    ],
    worksFor: WAVELENGTH_LIST.map((w) => ({
      "@type": "Organization",
      name: w.business,
      url: `${SITE.url}/${w.slug}`,
    })),
    areaServed: ["Kitsap County", "King County", "Pierce County", "Thurston County"],
  };
}

/** Organization schema for a single ray, linked to the Person entity. */
export function organizationSchema(slug: string) {
  const ray = WAVELENGTH_LIST.find((w) => w.slug === slug);
  if (!ray) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/${ray.slug}/#organization`,
    name: ray.business,
    url: `${SITE.url}/${ray.slug}`,
    description: ray.meaning,
    founder: { "@id": PERSON_ID },
    parentOrganization: { "@id": PERSON_ID },
  };
}

/** WebSite schema with the site search action, for the spine root. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": PERSON_ID },
    inLanguage: "en-US",
  };
}
