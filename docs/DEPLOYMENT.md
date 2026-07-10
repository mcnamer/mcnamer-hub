# Deployment Guide

The site targets **Vercel** and is edge-friendly by construction: almost every
route is static or statically generated; only `/connect` is dynamic (it reads a
`?intent=` search param and hosts a Server Action).

---

## Prerequisites

- Node ≥ 20.11
- A Vercel account with access to the target project
- The domain `mcnamer.com` (and `www`) pointed at Vercel

## First deploy

1. **Import the repo** into Vercel. Framework preset auto-detects **Next.js**
   (also declared in `vercel.json`).
2. Build settings (defaults are correct):
   - Build command: `next build`
   - Output: `.next`
   - Install: `npm install`
3. Deploy. The five rays and their sub-paths are pre-rendered via
   `generateStaticParams`; the spine pages are static; `/connect` is served on
   demand.

`vercel.json` pins the region to `iad1` and enables deploys from the working
branch. Adjust `regions` as the audience dictates (the audience is Washington
State — `sfo1`/`pdx` may lower latency; measure before changing).

## Environment variables

The build needs **none** to render. Wire these when integrations go live:

| Variable | Purpose | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, if it ever differs from `mcnamer.com` | No (falls back to the constant in `lib/constants/site.ts`) |
| `HUBSPOT_TOKEN` | Deliver Connect leads to the CRM ("HubSpot as the memory") | When the lead sink is wired in `features/connect/actions.ts` |
| `LEAD_WEBHOOK_URL` | Route submissions into the five-agent command center | Optional |

Set them in **Vercel → Settings → Environment Variables**, scoped to Production
and Preview. Never commit secrets; `.env*.local` is git-ignored.

Vercel **Analytics** and **Speed Insights** activate automatically on Vercel
with no keys.

## Domain & SEO go-live checklist

- [ ] `mcnamer.com` and `www.mcnamer.com` attached; `www` → apex redirect.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` (or the `SITE.url` constant) matches the
      live origin — it feeds canonical URLs, Open Graph, `sitemap.xml`,
      `robots.txt`, and the Schema.org `@id`s.
- [ ] Submit `https://mcnamer.com/sitemap.xml` to Google Search Console.
- [ ] Verify the Person + Organization JSON-LD in the Rich Results Test.
- [ ] Add real Open Graph imagery (`app/opengraph-image.*`) — currently
      text-only cards.

## Wiring real content

- **Photography:** every `Photo` slot is `next/image`-ready. Add `src`, and
  declare the host in `next.config.ts → images.remotePatterns` if remote. Keep
  the editorial alt text.
- **The serif:** Source Serif 4 is the ratified open-license route. To upgrade to
  a licensed Tiempos-class face, swap the `next/font` config in `lib/fonts.ts` —
  the `--font-voice` token means nothing else changes.
- **Insights:** replace the seed in `features/insights/data.ts` with the output
  of the transcription → summary → schema pipeline.
- **Connect:** implement the hand-off in `features/connect/actions.ts`
  (`deliverLead`) against HubSpot / the command center.

## Performance verification

After deploy, run Lighthouse (mobile) against the production URL and confirm the
targets: 95–100 performance, green Core Web Vitals. The performance contract is
built in (transform/opacity-only motion, static grain, subset fonts, zero motion
media), so regressions almost always come from newly-added imagery — keep it
responsive and lazy.

## CI (optional)

A minimal gate is enough given the strict typing and lint baseline:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

Vercel's own preview deployments cover build verification per PR, so CI is
belt-and-braces.
