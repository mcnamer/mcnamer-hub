/**
 * THE RAY REGISTRY — the single place a business is registered. Adding a sixth
 * ray means writing one content file to the RayContent shape and listing it
 * here; the route, the Refractor, the Movement V band-stack, and the SEO all
 * absorb it with no structural change. "A sixth ray is a weekend of composition."
 */

import type { RayContent } from "../types";
import { realEstate } from "./real-estate";
import { mortgage } from "./mortgage";
import { coaching } from "./coaching";
import { leads } from "./leads";
import { autismWorks } from "./autism-works";

export const RAY_CONTENT: Readonly<Record<string, RayContent>> = {
  [realEstate.slug]: realEstate,
  [mortgage.slug]: mortgage,
  [coaching.slug]: coaching,
  [leads.slug]: leads,
  [autismWorks.slug]: autismWorks,
} as const;

export const RAY_SLUGS = Object.keys(RAY_CONTENT);

export function getRayContent(slug: string): RayContent | undefined {
  return RAY_CONTENT[slug];
}
