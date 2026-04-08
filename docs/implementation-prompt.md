# Claude Code Implementation Prompt

Project: 107-scuolario.it
Path: /Users/clank/.hermes/workspace/webs/107-scuolario.it
Domain: scuolario.it

Read in this exact order:
1. DESIGN.md if present
2. docs/implementation-prompt.md (this file)
3. docs/PROMPT.md
4. docs/project-brief.md
5. docs/project-definition.md if present
6. docs/ceo-review.md / docs/ceo-addendum.md if present

## Mission
Build the full Scuolario website in this repository as a production-quality Italian school finder using real public data only. No placeholders. No TODOs. No fake data. No generic directory shell. The site must feel like a cleaner, faster, geography-first alternative to Scuola in Chiaro while remaining visibly anchored to official public-school data.

## Hard Constraints
- Follow docs/PROMPT.md as the canonical blueprint.
- Follow docs/project-brief.md and docs/project-definition.md as supporting requirements.
- Use the real project directory, not a scratch repo.
- Build the full agreed scope from the brief/prompt, not a trimmed MVP.
- Progressive publication means implemented routes plus publication gating, not missing page types.
- Keep docs/build-report.md updated as you work.
- Run npm run build before finishing.
- Run npm run lint before finishing if lint script exists.
- Do not push or deploy.
- Consolidate datasets sensibly in public/data/; do not create pathological one-file-per-entity explosions unless the prompt explicitly requires per-entity JSON and you can keep it manageable.
- All dynamic-route links must use GatedLink when publication is involved.
- Listing/gate pages must use force-dynamic where needed.
- E-E-A-T pages are mandatory.
- Legal/disclaimer requirements are mandatory.
- Favicon/logo must be real branding, not initials.
- Cookie consent banner is required.
- NO placeholder, fake, mocked, synthesized, guessed, or example data. Ever.
- If a field is unavailable from official data, preserve null / show “Dato non disponibile”; do not invent defaults.
- No fake rankings, no stars, no composite scores, no “best school” claims.

## Design Direction
- Tone: calm, civic, trustworthy, parent-friendly, modern public-interest utility.
- Make it feel more usable and polished than ministry UX, but not like a startup landing page.
- Use the palette and typography in docs/PROMPT.md.
- Emphasize strong breadcrumbs, dense-but-readable cards/tables, visible source badges, and high scanability on mobile.
- Search-first, but browsing by region/province/city/type must remain visible.
- Above the fold on school pages must prioritize identity, address, contacts, type, official links, and availability of documents/services.

## Inspiration References
- Official UX/problem reference: https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro
- Geography/directory reference: https://www.tuttitalia.it/scuole/
- Finder reference: https://www.cercascuole.it/
- Parent-facing comparator reference: https://www.scuoladvisor.it/
Use these for hierarchy and useful patterns only. Do not clone layouts or copy wording.

## Anti-Patterns to Avoid
- No ministry-style clunkiness.
- No generic SaaS hero + feature-block template.
- No thin city pages auto-published just because data exists.
- No pages that are just tables with no context.
- No fake editorial summaries pretending to know school quality.
- No placeholder legal content, contact details, or source lists.
- No runtime dependence on third-party APIs for core content; precompute static JSON.
- No giant client-side data dumps for all schools at once if you can segment by route/section.
- No broken gating: every dynamic entity route must respect publishedAt.

## Required Pages / Blocks
Implement all route families defined in docs/PROMPT.md:
- /
- /regioni and /regioni/[regionSlug]
- /province and /province/[provinceSlug]
- /comuni and /comuni/[citySlug]
- /tipologie and /tipologie/[typeSlug]
- /scuole/[schoolCode]
- /confronta and /confronta/[compareSlug]
- /guide and /guide/[guideSlug]
- /about
- /data-sources
- /contact
- /privacy
- /terms
- sitemap index + split sitemaps
- robots.txt
Every page family must include the required blocks, copy direction, FAQs, schema, and metadata patterns from docs/PROMPT.md.

## UX Requirements
- Search input on home plus discoverable browsing paths.
- Mobile-first responsive layout.
- Sticky/clear filter bar on city pages.
- Leaflet maps via client components and dynamic import only.
- Show Coming Soon muted states for unpublished entities in all relevant cards/rows.
- Direct access to unpublished dynamic pages must call notFound().
- Comparison pages must show only real comparable fields and “Dato non disponibile” where missing.
- Visible official-source links on every school page and methodology note with last update.
- Fast internal navigation between region, province, city, type, compare, guide, and school pages.

## Technical Requirements
- Next.js 15 App Router + TypeScript.
- Tailwind CSS 4.
- Static JSON in public/data/.
- Leaflet + react-leaflet for maps.
- @vercel/analytics.
- Allowed extras: clsx, zod, date-fns, leaflet, react-leaflet.
- No CMS, backend, auth, fake review system, or search SaaS.
- Build scripts required by prompt:
  - scripts/discover-schools-official.ts
  - scripts/discover-schools-fallback.ts
  - scripts/enrich-school-pages.ts
  - scripts/build-region-province-city-indexes.ts
  - scripts/build-compare-presets.ts
  - scripts/validate-data.ts
- validate-data must fail when prompt-defined required fields/thresholds are violated.
- Use sensible shared lib/util components for data loading, metadata, publication gating, schema, and SEO.
- Ensure package scripts cover build, lint, and data pipeline as needed.

## SEO / Publication Requirements
- Italian locale only: html lang=it-IT.
- Unique title + meta description per page.
- Canonical URLs, OG tags, JSON-LD, breadcrumb schema.
- Sitemap index plus split section sitemaps.
- Include only published pages in sitemap.
- Use publishedAt on every dynamic entity.
- Day-0 publication target from prompt: all trust pages, all 20 regions, all type hubs, top provinces/cities, first school clusters, first compare presets.
- Implement the larger national model even if only a subset is published.

## Data / Content Requirements
Use real data only. The content layer must be data-driven, not hardcoded prose pretending to be data.

Source classification for this build:

1. SIMPLE sources Claude should fetch directly from the project shell
- docs/ and research/*.csv already present in repo for strategist context.
- Official product/methodology pages that return 200 in normal requests:
  - https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro
  - https://www.mim.gov.it/-/scuola-in-chiaro
  - https://dati.istruzione.it/opendata/
- Official school detail pages under https://unica.istruzione.gov.it/cercalatuascuola/istituti/... that return 200 in direct requests and can be parsed for school facts/tab availability.
- Public fallback HTML directories for discovery assistance:
  - https://www.tuttitalia.it/scuole/
  - https://www.cercascuole.it/
  - https://www.scuoladvisor.it/ (only if useful for demand/cluster ideas, not canonical facts)

2. HARD sources already pre-resolved / classified by Builder/Hermes
- Official discovery/search JSON endpoints under /cercalatuascuola/ are browser-sensitive and returned 403 to direct curl in Builder preflight.
- Builder saved preflight classification at data-raw/source-access-notes.json.
- Treat endpoint discovery/enumeration as browser automation work first (Playwright or browser context requests), not plain fetch.

3. HARD sources Claude may still use, but with the above constraint
- Browser-driven official discovery flows via Playwright against:
  - /cercalatuascuola/caricaProvincia.json?codiceRegione=...
  - /cercalatuascuola/caricaComune.json?codiceProvincia=...
  - /cercalatuascuola/caricaTipologia.json?codiceOrdine=...
  - /cercalatuascuola/jsp/common/ricercaScuole.jsp?...
- If browser-driven official discovery fails at scale, use fallback sources only to enumerate candidates, then canonicalize every published school against official school detail pages.

Data rules:
- Save raw discovery outputs under data-raw/official/ and data-raw/fallback/.
- Save normalized build outputs under public/data/.
- Include source metadata and refresh dates where appropriate.
- Build enough real content to satisfy full route/page requirements; do not leave empty templates.
- Publish city pages only when non-thin per prompt rules.
- Final page facts must come from official sources wherever available.

## Finish Line
Before stopping:
1. write/update docs/build-report.md
2. state explicitly what full scope was implemented vs what is merely unpublished behind progressive publication
3. run npm run build
4. run npm run lint if available
5. summarize remaining risks honestly
6. if anything from the prompt scope was not implemented, say it plainly instead of calling the project complete
