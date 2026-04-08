# Review Report: scuolario.it
Date: 2026-04-08
Reviewer: Web Factory Reviewer
Verdict: APPROVE

## Summary
Scuolario was close, but not passable as-is. I fixed the launch blockers that would have made me reject it: generic 404, missing brand assets, legal indexation mistakes, broken sitemap behavior, publication leaks from school/search pages, and missing IndexNow setup. I also improved thin city pages with territorial context so the currently published low-count cities are more useful and honest.

## Build Verification
- npm install: PASS
- npm run build: PASS
- npm run lint: PASS
- Pages generated: 133 routes in final local build
- Live Vercel deploy: PASS

## Navigation QA
Local checks on http://localhost:3107:
- Homepage / : loaded, stats corrected to 59 published schools, branding updated with SVG logo
- Custom 404 /nonexistent-page: branded and non-generic after fix
- Comuni index /comuni: now shows published and unpublished monitored cities; unpublished entries render as muted/non-linked
- Unpublished URL /comuni/genova: 404 as expected
- Legal pages:
  - /privacy PASS
  - /terms PASS
  - /contact PASS
- Sitemap /sitemap.xml: 200 OK after fix
- Random detail pages checked:
  - /scuole/RMIC8F2007
  - /scuole/MIPC03000N
  - /scuole/BAPS060001
  - /scuole/NAPC01000Q
  - /scuole/VEPS01000X
- Thin-city spot-check /comuni/bologna: now includes territorial comparison/context block
- Search gate spot-check /cerca?q=bari: unpublished city appears muted, published province remains clickable

Live checks on https://107-scuolarioit.vercel.app:
- Homepage PASS
- /nonexistent-page PASS
- /scuole/MIPC03000N PASS
- IndexNow key file PASS

## Code Inspection
Files reviewed and/or changed:
- src/app/layout.tsx
- src/app/not-found.tsx
- src/app/sitemap.ts
- src/app/page.tsx
- src/app/comuni/page.tsx
- src/app/comuni/[citySlug]/page.tsx
- src/app/scuole/[schoolCode]/page.tsx
- src/app/confronta/[compareSlug]/page.tsx
- src/app/cerca/page.tsx
- src/app/privacy/page.tsx
- src/app/terms/page.tsx
- src/app/contact/page.tsx
- src/app/regioni/page.tsx
- src/app/province/page.tsx
- src/app/tipologie/page.tsx
- src/app/guide/page.tsx
- src/components/GatedLink.tsx
- src/components/Header.tsx
- src/components/Footer.tsx
- src/components/Brand.tsx
- src/app/icon.svg
- src/app/apple-icon.svg
- public/912662772832c299bba3bd4a76335904.txt
- scripts/submit-indexnow.mjs
- package.json

What I verified/fixed:
- GatedLink exists and uses isPublished() correctly
- School detail page internal dynamic links now respect publication state for city/province/type/compare links
- Search results now use GatedLink instead of raw Link for dynamic routes
- Comuni listing now surfaces unpublished monitored cities as muted instead of hiding them entirely
- Legal pages are now noindex/nofollow
- Sitemap now resolves correctly at /sitemap.xml and excludes privacy/terms/contact
- IndexNow key file and submission script added
- Vercel Analytics already installed and retained
- Branding upgraded from text-only mark to real SVG logo + branded icon assets
- Listing index pages marked force-dynamic where they act as publication/gate surfaces

## Content Quality
- Core school detail pages are usable: contacts, address, source links, and document availability are present and understandable.
- The weakest content pattern was on low-count city pages (for example Bologna/Firenze/Palermo with 2 schools). I improved this by adding territorial context comparing each city to its province/region so those pages carry more decision-making value.
- The site still has a seed dataset and should grow materially over time, but the current publication state is now honest about what is and is not published.

## Data Verification
External source spot-checks:
- RMIC8F2007 official page reachable; name/phone/email matched in source HTML checks
- MIPC03000N official page reachable; email matched and page accessible via official source URL
- BAPS060001 official page reachable; name/email matched and official source URL accessible
- Additional browser spot-checks confirmed official source links open correctly from school pages for Napoli and Venezia examples

Notes:
- Official Unica / Scuola in Chiaro access is inconsistent and sometimes returns 403 to non-browser requests; this matched the brief’s source-access warning and is not a site bug.

## SEO Audit
Passes after reviewer fixes:
- Unique titles/descriptions present
- Canonicals present
- OG metadata present
- Vercel Analytics installed
- Robots.txt present
- Sitemap works at /sitemap.xml
- Legal/contact pages noindexed
- Legal/contact pages removed from sitemap
- Branded 404 and icon assets now present
- IndexNow key file + submission script added

## Issues Found
### Critical
- Generic Next.js 404 page shipped locally and live before fix
- Sitemap route returned 404 before fix
- Legal/contact pages were indexable and present in sitemap before fix
- Published school pages linked users into unpublished city pages before gating fix
- Search page leaked unpublished dynamic routes via raw Link before fix
- No branded logo/favicon system before fix

### Important
- Homepage published-school count was inaccurate (48 from city sums instead of 59 actual published school pages)
- Comuni listing hid unpublished monitored cities instead of showing clear coming-soon states
- Thin city pages lacked enough context to justify publication at current seed scale
- No IndexNow setup before fix

### Minor
- Browser vision backend still frames the homepage oddly in screenshots; manual/browser snapshots and live pages themselves are functional
- Dataset remains seed-sized relative to long-term brief ambitions

## Recommendation
Approve for launch in its current seed-data state. The critical trust, gating, SEO, and publication-state issues are fixed, the live deployment is working, and the current scope is now represented honestly. Next improvement cycle should focus on expanding verified school coverage and adding richer city/province comparisons as the dataset grows.
