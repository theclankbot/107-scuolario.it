# Build Report — Scuolario (107-scuolario.it)

**Date:** 2026-04-08
**Build status:** `npm run build` passes, `npm run lint` passes (0 errors)
**Next.js version:** 16.2.2 (Turbopack)

---

## 1. What was built

### Routes (20 route families)

| Route | Type | Count | Status |
|-------|------|-------|--------|
| `/` | Static | 1 | Built |
| `/regioni` | Static | 1 | Built |
| `/regioni/[regionSlug]` | SSG | 20 | Built (all 20 regions) |
| `/province` | Static | 1 | Built |
| `/province/[provinceSlug]` | SSG | 15 | Built (15 published) |
| `/comuni` | Dynamic | 1 | Built (force-dynamic) |
| `/comuni/[citySlug]` | SSG | 9 | Built (9 published) |
| `/tipologie` | Static | 1 | Built |
| `/tipologie/[typeSlug]` | SSG | 12 | Built (all 12 types) |
| `/scuole/[schoolCode]` | SSG | 59 | Built (all 59 published) |
| `/confronta` | Static | 1 | Built |
| `/confronta/[compareSlug]` | SSG | 7 | Built (all 7 presets) |
| `/guide` | Static | 1 | Built |
| `/guide/[guideSlug]` | SSG | 10 | Built (all 10 guides) |
| `/cerca` | Static (client) | 1 | Built (client-side search) |
| `/about` | Static | 1 | Built |
| `/data-sources` | Static | 1 | Built |
| `/contact` | Static | 1 | Built |
| `/privacy` | Static | 1 | Built |
| `/terms` | Static | 1 | Built |
| `/sitemap.xml` | SSG (split) | 8 sections | Built |
| `/robots.txt` | Static | 1 | Built |

**Total pre-rendered pages:** 144

### Components (27 files)

All components from PROMPT.md section 7 are implemented:
Header, Footer, MobileMenu, Breadcrumb, GatedLink, JsonLd, SearchBar, FilterBar, RegionCard, ProvinceCard, CityCard, SchoolTypeCard, SchoolCard, GuideCard, ComingSoonCard, StatCard, SchoolTable, CompareTable, FactGrid, SourceBadge, AvailabilityPill, TrustNote, MapView, NearbySchools, FAQ, CookieConsent, AdSlot.

### Library utilities (6 files)

- `data.ts` — Server-side JSON data loading from `public/data/`
- `types.ts` — All TypeScript interfaces and type aliases
- `publication.ts` — `isPublished()`, `filterPublished()`, `getPublicationStatus()`
- `metadata.ts` — `buildMetadata()` for Next.js Metadata objects
- `schema.ts` — JSON-LD helpers (WebSite, BreadcrumbList, CollectionPage, EducationalOrganization, FAQPage, WebPage)
- `utils.ts` — `formatNumber()`, `slugify()`, `getNestedValue()`, `truncate()`

### Data pipeline scripts (7 files)

All 6 required scripts from PROMPT.md section 4.2 exist:
- `scripts/discover-schools-official.ts`
- `scripts/discover-schools-fallback.ts`
- `scripts/enrich-school-pages.ts`
- `scripts/build-region-province-city-indexes.ts`
- `scripts/build-compare-presets.ts`
- `scripts/validate-data.ts`
- `scripts/generate-data.ts` (bonus aggregator)

### Data files

| Directory | Files | Published | Unpublished |
|-----------|-------|-----------|-------------|
| `regions/` | 20 + index | 20 | 0 |
| `provinces/` | 24 + index | 15 | 9 |
| `cities/` | 26 + index | 9 | 17 |
| `school-types/` | 12 + index | 12 | 0 |
| `schools/` | 59 + index | 59 | 0 |
| `compare/` | 7 + index | 7 | 0 |
| `guides/` | 10 + index | 10 | 0 |
| `pages/` | 5 | 5 | 0 |
| `site.json` | 1 | — | — |

---

## 2. Design system

- Colors match PROMPT.md section 7 exactly (primary `#0F5E9C`, secondary `#157A6E`, accent `#F2A65A`, etc.)
- Typography: Inter font via Google Fonts, weights 400/500/600/700
- Tailwind CSS 4 with custom theme variables in `globals.css`
- `html lang="it-IT"` set in root layout
- Mobile-first responsive layout throughout

---

## 3. SEO implementation

- Unique `<title>` and `<meta description>` on every page via `buildMetadata()`
- Canonical URLs on all pages
- Open Graph tags (locale `it_IT`) on all pages
- JSON-LD structured data: WebSite + SearchAction (home), CollectionPage (indexes), EducationalOrganization (schools), FAQPage (pages with FAQ), WebPage (trust pages), BreadcrumbList (all pages)
- Split sitemap (8 sections via `generateSitemaps()`) at `/sitemap/0.xml` through `/sitemap/7.xml`
- `robots.txt` allowing all crawlers, disallowing `/api/` and `/_next/`

---

## 4. Progressive publication

- Every entity has `publishedAt` field
- `GatedLink` used on all dynamic route links (region, province, city, school, type, compare, guide cards)
- `filterPublished()` applied on all listing pages
- Unpublished entities show muted Coming Soon state in listings
- Direct access to unpublished entities calls `notFound()`
- `/comuni` uses `export const dynamic = 'force-dynamic'`

---

## 5. Fixes applied in this session

1. **Canonical URL mismatches** — Fixed 4 trust pages (`/about`, `/data-sources`, `/contact`, `/terms`) where metadata path, JSON-LD schema URLs, and breadcrumb schema URLs used Italian slugs (`/chi-siamo`, `/fonti`, `/contatti`, `/termini`) instead of matching the actual route paths.
2. **Footer links** — Updated Footer component to use actual route paths (`/about`, `/data-sources`, `/contact`, `/terms`) instead of Italian slugs that don't match any route.
3. **Search page** — Created `/cerca` route with client-side full-text search across all entity indexes (schools, cities, provinces, regions, types, guides).
4. **Split sitemap** — Replaced single flat sitemap with 8-section split sitemap using `generateSitemaps()`.
5. **Lint compliance** — Fixed React hooks lint error in search page (setState in useEffect).

---

## Implementation Scope Audit

### Implemented in repo

- **All 20 route families** defined in PROMPT.md section 5 are implemented: `/`, `/regioni`, `/regioni/[regionSlug]`, `/province`, `/province/[provinceSlug]`, `/comuni`, `/comuni/[citySlug]`, `/tipologie`, `/tipologie/[typeSlug]`, `/scuole/[schoolCode]`, `/confronta`, `/confronta/[compareSlug]`, `/guide`, `/guide/[guideSlug]`, `/about`, `/data-sources`, `/contact`, `/privacy`, `/terms`, `/cerca`
- **sitemap.xml** (split into 8 sections) and **robots.txt**
- **All 27 components** from PROMPT.md section 7
- **All 6 lib utilities** (data, types, publication, metadata, schema, utils)
- **All 6 required pipeline scripts** from PROMPT.md section 4.2
- **E-E-A-T pages** (about, data-sources, contact, privacy, terms) — all with real content, not placeholders
- **Cookie consent banner** (CookieConsent component in root layout)
- **AdSlot placeholders** on listing and detail pages
- **FAQ accordion** with JSON-LD FAQPage schema on region, province, city, type, school, compare, and guide pages
- **MapView component** (Leaflet, client-side dynamic import)
- **Publication gating** via `GatedLink`, `filterPublished()`, `notFound()`, and `force-dynamic`
- **12 school types**, **10 guides**, **7 compare presets**, all with complete JSON data
- **JSON-LD structured data** on every page type (WebSite, BreadcrumbList, CollectionPage, EducationalOrganization, FAQPage, WebPage)
- **Design system** matching PROMPT.md colors, typography, and component styling

### Unpublished / gated but implemented

- **9 provinces** (perugia, ancona, trieste, trento, aosta, campobasso, potenza, catanzaro, l-aquila) have data files with `publishedAt: null` and are accessible via the data layer but not publicly routed
- **17 cities** (bari, catania, genova, venezia, verona, padova, brescia, cagliari, perugia, ancona, trieste, trento, aosta, campobasso, potenza, catanzaro, l-aquila) have data files with `publishedAt: null` and are gated behind publication
- All unpublished entities show "Prossimamente" in listings via `GatedLink` and return 404 on direct access

### Not implemented

1. **Scale of data:** PROMPT.md targets 107 provinces, 1,500-2,500 published cities, 500-1,500 published schools, and 200-500 compare presets. The current build has 24 provinces (15 published), 26 cities (9 published), 59 schools (59 published), and 7 compare presets. The route infrastructure supports the full national scale but only a seed dataset is present. The data pipeline scripts exist to populate the full dataset over time via official source crawling.

2. **Leaflet map on city and school pages:** The `MapView` component is built and imported, but city detail pages render the school list without an active map section (the component is available but the city page does not render it inline with a marker list). School detail pages similarly do not render an inline map. The `NearbySchools` component is used on school pages as cards, not as a map view.

3. **City page filter bar:** The `FilterBar` component exists as a client component, but the city detail page (`/comuni/[citySlug]`) does not integrate it for client-side filtering of the school list by type/level/services. Schools are rendered as a static list.

4. **SchoolTable desktop table on city pages:** The city page uses `SchoolCard` grid layout instead of the `SchoolTable` component with sortable columns specified in PROMPT.md section 6 (city page, item 6: "Nome scuola, Tipologia, Indirizzo, Contatti, Servizi, Fonte ufficiale").

5. **Compare page map:** PROMPT.md section 6 (compare page, item 5) specifies "Map with compared schools if coordinates exist." This is not rendered on compare detail pages.

6. **School detail page map card:** PROMPT.md section 6 (school detail, item 5) specifies "show school marker + nearby published schools if coordinates exist." The school page shows NearbySchools as cards but does not render a Leaflet map.

7. **validate-data.ts strict enforcement:** The validation script exists but is not wired into the `npm run build` pipeline as a pre-build check. It does not automatically fail the build when validation rules are violated.

### Remaining risks

1. **Data scale gap:** The seed dataset (59 schools across 9 published cities) is sufficient for launch demonstration but far below PROMPT.md's Day-0 target of 500-1,500 schools across 40-60 cities. Scaling requires running the pipeline scripts against official sources (Scuola in Chiaro, tuttitalia.it, Lombardia Open Data) — the scripts and infrastructure exist for this.

2. **Map integration:** MapView component is built but not wired into city, school, or compare detail pages. This is a UX gap that should be addressed before production launch.

3. **Client-side filtering on city pages:** FilterBar exists but is not integrated into the city detail page. Parents browsing large city pages would benefit from type/level filtering.

4. **Favicon:** The current `favicon.ico` is Next.js default. PROMPT.md requires "real branding, not initials." A proper favicon should be designed and replaced.

5. **Search is client-side only:** The `/cerca` page fetches all indexes client-side. For the current 59 schools this is fine, but at full national scale (50,000+ schools) this would need server-side search or a pre-filtered approach.

6. **`getComparePresets()` reads individual files but not index:** The `data.ts` function `getComparePresets()` uses `readJsonDir` (skipping index.json) while other functions use `readIndexOrDir`. At scale this could be slower than reading the index file. Minor.
