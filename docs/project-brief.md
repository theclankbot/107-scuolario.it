# Scuolario — project-brief.md

## 1. Executive Summary
Scuolario should be built as a geography-first Italian school finder using official public-school data, but presented in a way that is dramatically easier to browse than the current ministry experience. The product is not a news site, not a general education blog, and not a rankings business. It is a structured reference product for parents and families who want to find schools by region, province, city, school type, and official institution page.

Core value proposition:
- faster than Scuola in Chiaro for local browsing
- crawlable region/province/city/type pages instead of mostly search-led discovery
- cleaner school pages with the fields parents actually need first: address, contacts, school type, school levels, official links, services, documents, and comparison-safe facts
- comparison views only for real fields; no fake numeric score

Recommended initial scope:
- national home page
- 20 region pages
- 107 province pages
- city pages only where the page will not be thin: publish when a city has at least 3 schools OR clear search demand OR multiple school-type choices
- school-type hubs for the main Italian school categories
- one canonical detail page per school
- curated comparison pages for high-demand city + school-type combinations
- required E-E-A-T pages: About, Data Sources, Contact, Privacy, Terms

Page-count expectation once fully implemented:
- 1 home
- 20 regions
- 107 provinces
- ~1,500–2,500 city pages after anti-thin thresholding
- 12–18 school-type / path hubs
- ~30,000–45,000 school detail pages depending on official matching success and publication scope
- ~200–500 comparison pages for major city/type clusters
- ~10–14 guides / help pages

Monetization:
- primary: AdSense on listing and school pages, with restrained placement
- secondary: sponsored enhanced profile requests for private/paritarie schools later, but not at launch
- tertiary: lead-gen experiments later for tutoring / open-day / orientation partners, only after traffic exists
- do NOT build affiliate assumptions into v1

CSV-backed SEO conclusion:
- the root seed `scuola` has a huge universe (30,003 exported keywords; ~5.34M monthly volume in Semrush broad match Italy), but it is noisy
- the usable opportunity is not “school” generically; it is geography + type + institution-intent search
- competitor exports show the strongest practical opportunities around city school discovery, school-type intent, institution detail pages, and official-school lookups

## 2. Keyword Analysis

### 2.1 Research inputs used
CSV-backed inputs:
- `research/scuola_broad-match_it_2026-04-08.csv`
- `research/unica-istruzione-gov-it_organic-positions_it_2026-04-08.csv`
- `research/tuttitalia-it_organic-positions_it_2026-04-08.csv`
- `research/cercascuole-it_organic-positions_it_2026-04-08.csv`
- `research/scuoladvisor-it_organic-positions_it_2026-04-08.csv`

Notes:
- Earlier CSV attempts for derivative seeds failed; those were superseded by the CEO reset to one allowed root seed only: `scuola`.
- The `scuola` export succeeded via Semrush export-server JSON-RPC + CSV download retry.
- Competitor organic exports succeeded for all selected competitors.

### 2.2 Keyword universe
From the Semrush `scuola` broad-match export:
- total keywords exported: 30,003
- summed monthly volume across export rows: 5,341,700
- dominant pattern: broad informational intent, but the commercial buildable slice is geography/type/entity discovery

### 2.3 Volume distribution
- 50k+: 5 keywords / 646,500 volume
- 10k–49.9k: 12 keywords / 215,000 volume
- 1k–9.9k: 687 keywords / 1,417,100 volume
- 100–999: 8,349 keywords / 2,073,210 volume
- 0–99: 20,950 keywords / 989,890 volume

Takeaway:
- head terms are noisy and dominated by navigational / institutional / unrelated education intent
- the buildable SEO moat is in the long tail, especially city, school-type, institution, and meccanographic-code discovery

### 2.4 Heuristic intent distribution from seed export
- informational: 28,459 keywords / 4,667,190 volume
- navigational: 225 keywords / 466,000 volume
- transactional: 1,048 keywords / 189,060 volume
- commercial: 271 keywords / 19,450 volume

Interpretation:
- parents are usually not searching with explicit “buy” language here
- this is a utility/reference SERP market
- product UX matters more than conversion copy

### 2.5 Dominant keyword clusters
Cluster totals from seed export heuristics:
- general school queries: 16,834 keywords / 3,081,010 volume
- school types: 8,020 keywords / 833,950 volume
- official tools / official-school lookup intent: 173 keywords / 452,450 volume
- geography: 3,269 keywords / 434,640 volume
- careers/learning/admin spillover: meaningful but mostly out-of-scope for a finder product

Build focus clusters:
1. city + schools queries
2. school-type queries (`liceo scientifico`, `licei`, `scuole medie`, `scuola primaria`, etc.)
3. institution-name queries
4. meccanographic-code / official school lookup queries
5. compare-intent inside city/type clusters

### 2.6 Top 20 raw exported keywords
These are from the root export and demonstrate why the seed is huge but noisy:
1. hub scuola — 201,000
2. orizzonte scuola — 165,000
3. scuola futura — 110,000
4. scuola — 110,000
5. axios scuola digitale — 60,500
6. alternanza scuola lavoro — 49,500
7. giunti scuola — 27,100
8. quanti giorni mancano alla fine della scuola — 18,100
9. dea scuola — 18,100
10. scuole chiuse — 14,800
11. rinnovo contratto scuola — 14,800
12. contratto scuola — 12,100
13. scuola primaria — 12,100
14. scuola viva — 12,100
15. scuola di polizia — 12,100
16. cisl scuola — 12,100
17. scuola in chiaro — 12,100
18. scuola holden — 9,900
19. scuole — 9,900
20. pagopa scuola — 9,900

Important strategic filter:
Most top-volume rows are not the product opportunity. The site should target the subset where users need to find and compare real schools.

### 2.7 High-value product keywords from competitor evidence
These are the real signals that support Scuolario’s IA:
- `scuola in chiaro` — 12,100 (official lookup intent)
- `scuola primaria` — 12,100
- `liceo scientifico` — 12,100
- `liceo scienze umane` — 8,100
- `scuola materna` — 6,600
- `scuola superiore` — 6,600
- `scuole superiori` — 5,400
- `scuole secondarie` — 5,400
- `scuole medie` — 3,600
- `codice meccanografico scuole` — 4,400
- `scuola vicino a me` — 2,900 (competitor-ranking evidence via cercascuole.it)
- `liceo scientifico milano` — 1,600 (competitor-ranking evidence via scuoladvisor.it)
- `roma liceo scientifico` — 1,600
- institution-name demand for specific schools and comprehensive institutes is strong and frequent

### 2.8 Difficulty distribution
- unknown/0–14: 22,569 keywords
- 15–29: 5,486 keywords
- 30–49: 1,743 keywords
- 50–69: 194 keywords
- 70–100: 11 keywords

Interpretation:
- long-tail school/entity intent is very attackable
- generic `scuola` head terms are not where the win is

### 2.9 Quick wins (CSV-backed, but not all are product-relevant)
Semrush quick wins by KD <30 and volume >100 include:
- `scuola materna` — 6,600 / KD 23
- `scuola superiore` — 6,600 / KD 28
- `codice meccanografico scuole` — 4,400 / KD 15
- `iscrizione scuola primaria` — 4,400 / KD 21
- `scuola dell'infanzia` — 4,400 / KD 24
- `diploma di scuola secondaria di secondo grado` — 3,600 / KD 13
- `scuole in chiaro` — 3,600 / KD 15

Practical quick-win interpretation for this product:
- school-type hubs
- official-code lookup pages
- city/type combinations
- specific-school detail pages
- nearby-school / local list UX

### 2.10 Competitor gaps
CSV-backed competitor observations:

Official competitor: `unica.istruzione.gov.it`
- wins branded/head intent and owns `scuola in chiaro`
- ranks for many school-type pages and individual institution pages
- URLs observed in export:
  - `https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro`
  - `https://unica.istruzione.gov.it/sic`
  - `https://unica.istruzione.gov.it/portale/it/orientamento/iscrizioni`
  - school detail URLs under `/cercalatuascuola/istituti/.../`
- weakness: poor browse UX, weak crawlable geography experience, heavy institutional feel

SEO directory competitor: `tuttitalia.it`
- strongest crawlable geography structure
- useful evidence that city/province/type directory pages can rank
- URLs observed:
  - `https://www.tuttitalia.it/scuole/`
  - `https://www.tuttitalia.it/scuole/liceo-scientifico/`
  - `https://www.tuttitalia.it/lazio/33-roma/64-scuole/`
  - `https://www.tuttitalia.it/scuole/scuola-secondaria-di-primo-grado/`
- weakness: old directory presentation, weaker product polish, weaker parent-facing clarity

Finder competitor: `cercascuole.it`
- proves city-level school-list pages have demand
- URLs observed:
  - `https://www.cercascuole.it/`
  - `https://www.cercascuole.it/scuole-a-Pordenone.php`
  - `https://www.cercascuole.it/scuole-a-Brescia.php`
  - `https://www.cercascuole.it/scuole-a-Bologna.php`
- weakness: dated UX, weak trust layer, low topical breadth

Parent-facing comparator: `scuoladvisor.it`
- proves institution detail pages + city/type pages can capture school-name and local type demand
- URLs observed:
  - `https://www.scuoladvisor.it/lazio/roma/liceo-scientifico`
  - `https://www.scuoladvisor.it/lombardia/milano/liceo-scientifico`
  - `https://www.scuoladvisor.it/lombardia/nerviano/istituto-comprensivo`
  - `https://www.scuoladvisor.it/scuole/49940/manara`
- weakness: limited depth, patchy coverage, mixed URL logic

Gap Scuolario should exploit:
- combine official-data trust with directory-grade crawlability
- create province/city/type pages that the official product does not serve cleanly
- make every school page useful above the fold without invented rankings
- support compare views using real fields only

## 3. Entity Model
Primary entities:
1. Regione
2. Provincia
3. Comune
4. Tipologia scolastica
5. Percorso / indirizzo di studio (secondary schools only, optional)
6. Scuola
7. Confronto preset
8. Guida editoriale

### 3.1 Entity relationships
- one Regione has many Province
- one Provincia belongs to one Regione and has many Comuni
- one Comune belongs to one Provincia and one Regione and has many Scuole
- one Tipologia has many Scuole
- one Scuola belongs to one Comune, one Provincia, one Regione
- one Scuola may expose multiple tabs / source sections: chi-siamo, didattica, servizi, finanza, PTOF, RAV, rendicontazione sociale, edilizia, PON
- one Confronto preset belongs to one city or one school type or one province cluster and references 2–6 schools

### 3.2 Suggested entity counts for implementation planning
- regions: 20
- provinces: 107
- city/comune pages: publish selectively; expect 1,500–2,500 non-thin pages in medium-term publication, though the internal data model should support all matched comuni
- school types: 12–18 launchable hubs
- schools: target support for the entire matched official-school universe; likely tens of thousands
- compare presets: 200–500 high-value combinations
- guides: 10–14

### 3.3 Core attributes by entity
Regione:
- slug, name, code, provinceCount, cityCount, schoolCount, publishedAt

Provincia:
- slug, name, sigla, regionSlug, cityCount, schoolCount, publishedAt

Comune:
- slug, name, provinceSlug, regionSlug, population optional, schoolCount, schoolTypeMix, publishedAt

Tipologia:
- slug, label, schoolLevelGroup, description, schoolCount, publishedAt

Scuola:
- schoolCode / codice meccanografico
- name
- legal status / statale-paritaria if available
- order / level
- type / tipologia
- address
- CAP
- comune, provincia, regione
- latitude, longitude if extractable
- phone, fax, email, PEC
- website URL
- official source URLs by tab
- didattica / servizi / finanza / document availability flags
- safe comparison metrics only where present

## 4. Information Architecture
Canonical route strategy:
- `/` home
- `/regioni/[regionSlug]`
- `/province/[provinceSlug]`
- `/comuni/[citySlug]`
- `/tipologie/[typeSlug]`
- `/scuole/[schoolCode]`
- `/confronta/[compareSlug]`
- `/guide/[guideSlug]`
- static trust pages

Why this IA works:
- matches the strongest crawlable competitor structures
- keeps geography-first browsing front and center
- lets the school detail page absorb institution-name demand
- allows school-type demand to map to clean hubs
- keeps compare pages curated and non-thin

Anti-thin rule for city pages:
- do NOT publish every Italian comune page automatically
- publish only if at least one of these is true:
  - >= 3 matched schools
  - multiple school types available
  - observed search demand from competitor evidence / keyword list
  - strategic cluster city in a published province
- all comuni can still exist in JSON for search and filters; publication remains gated via `publishedAt`

## 5. Data Requirements

### 5.1 Confirmed source layers
1. Official product overview and methodology surface
- `https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro`
- `https://www.mim.gov.it/-/scuola-in-chiaro`
Use for: product methodology, trust page, scope explanation, official language about what Scuola in Chiaro provides.

2. Official school detail pages
- pattern: `https://unica.istruzione.gov.it/cercalatuascuola/istituti/{CODICE}/{slug}/`
Use for: school name, contacts, address, web URL, canonical official detail URL, visible detail tabs.

3. Official school tabs
- `/didattica/`
- `/servizi/`
- `/finanza/`
- `/ptof/`
- `/valutazione/`
- `/rendicontazioneSociale/`
- `/edilizia/`
- `/pon/`
Use for: services/infrastructure facts, finance charts/tables, document availability, evaluation / trust indicators, public-programme visibility.

4. Official school-data portal root
- `https://dati.istruzione.it/opendata/`
Use for: Data Sources page and future structured dataset validation.

### 5.2 Access-risk finding you must account for
Observed during research:
- generic direct HTTP access to some `cercalatuascuola` search / JSON endpoints returned 403 from Akamai in non-browser requests
- detail pages and static JS resources were accessible
- the official front-end JS clearly references useful discovery endpoints, but plain scripted requests may be blocked

Implication for builder:
- treat official discovery as a browser-automation task first, not a plain `fetch()` task
- build the pipeline to use Playwright for discovery when necessary
- keep a fallback discovery source for school-universe enumeration if official search endpoints block non-interactive crawling

### 5.3 Specific field-to-source mapping
For each school detail page, source these fields from the official detail URL when available:
- school name → official detail page title / H1
- school code → page URL + page data attributes
- address → official detail page
- comune / provincia / regione → official detail page meta + visible text
- email → official detail page
- PEC → official detail page
- phone / fax → official detail page
- website URL → official detail page
- official-source tabs available → links on official detail page
- services / labs / digital resources → official `/servizi/` tab
- finance charts / funding categories → official `/finanza/` tab
- RAV / self-evaluation access → official `/valutazione/` tab
- PTOF availability → official `/ptof/` tab
- social accountability visibility → official `/rendicontazioneSociale/` tab
- building / facilities section presence → official `/edilizia/` tab

### 5.4 Discovery sources
Primary discovery attempt:
- browser-automation against official Scuola in Chiaro search UI / browser-only endpoints
- front-end JS confirms discovery endpoints such as:
  - `/cercalatuascuola/caricaProvincia.json?codiceRegione=...`
  - `/cercalatuascuola/caricaComune.json?codiceProvincia=...`
  - `/cercalatuascuola/caricaTipologia.json?codiceOrdine=...`
  - `/cercalatuascuola/jsp/common/ricercaScuole.jsp?...`

Fallback discovery if official discovery blocks automation:
- crawl geography/type list pages from `tuttitalia.it/scuole/` and `cercascuole.it`
- use those only to enumerate candidate school names / city clusters / type clusters
- enrich and canonicalize against official Scuola in Chiaro school detail pages before publication

Rule:
- final page facts must come from official sources wherever available
- third-party sources may help discovery, never replace official core facts

## 6. Page-Level Specifications

### 6.1 Home
Must include:
- H1 focused on finding schools in Italy by city, province, and type
- search box for school name / code / city
- quick links to regions
- top provinces / cities grid
- school-type navigation
- trust banner explaining official data source
- compare CTA for major cities
- “How to use” section for parents

### 6.2 Region page
Must include:
- region intro
- counts for provinces, comuni with published pages, schools
- province grid
- top cities by school count
- school-type distribution in region
- internal links to province pages and type hubs filtered by region

### 6.3 Province page
Must include:
- province stats
- city table with school counts
- featured schools section
- school-type breakdown
- compare links for strongest cities and school-type combinations

### 6.4 City page
Must include:
- H1 for schools in city
- summary stats: total schools, main types, statali/paritarie if available
- sticky filter bar
- school cards/table
- mini map if coordinates exist
- compare-safe highlights (no rankings)
- FAQs around finding the right school / how to verify official data

### 6.5 School-type hub
Must include:
- explanation of the school type in plain Italian
- top regions/provinces/cities for that type
- featured schools by city clusters
- internal links into city+type compare pages

### 6.6 School detail page
Must include:
- official identity block first
- contacts and address above the fold
- quick facts grid
- tabs/sections for services, documents, finance, evaluation, facilities only when extracted
- official-source links for each block
- nearby schools and same-type schools in same city
- compare CTA
- “How this page is sourced” note with last-updated date
- absolutely no fake review score or rank score

### 6.7 Compare page
Must include:
- 2–6 schools only
- side-by-side fields that exist for all selected schools
- contacts, level, type, city, services flags, available documents, website, official link
- if a field is missing, show `Dato non disponibile`
- no derived winner badge

### 6.8 Guides / help pages
Suggested guides:
- how to read a school’s official page
- what the codice meccanografico means
- how to compare schools without fake rankings
- difference between scuola primaria / secondaria / liceo / istituto tecnico / professionale
- how to use Scuola in Chiaro and how Scuolario improves on it

## 7. Design & UX Direction
Mood:
- calm, civic, trustworthy, parent-friendly
- more modern than ministry interfaces
- should feel like a public-interest utility, not a blog or startup landing page

Visual direction:
- primary blue / teal family for trust and clarity
- warm neutral background to avoid sterile bureaucracy
- card-heavy layouts with clean labels and strong spacing
- bold breadcrumbing and visible official-source labels

UX principles:
- search first, but browsing always visible
- one-click transitions between geography levels
- filters are always understandable: city, type, level, statale/paritaria, services available
- on mobile, priority order is search > filters > cards > official links

## 8. SEO Strategy
Keyword mapping:
- home → `scuola`, `scuole`, `scuola in chiaro` alternative-intent framing
- region/province/city pages → `scuole a [città]`, `scuole in provincia di [x]`, `scuole [regione]`
- type hubs → `licei`, `liceo scientifico`, `scuole medie`, `scuola primaria`, etc.
- school detail pages → institution-name demand + school-code intent
- compare pages → `confronta scuole [città]`, `[type] [city]`

Internal linking:
- home → regions, top provinces, top cities, top types
- region → provinces, cities, types
- province → cities, schools, compare pages
- city → school details, compare pages, type hubs
- school detail → city, province, type, similar schools

Schema:
- Home: `WebSite` + `SearchAction`
- Listing pages: `CollectionPage` + `BreadcrumbList`
- School detail: `School` or `EducationalOrganization` + `BreadcrumbList`
- FAQ blocks: `FAQPage`

Indexation rules:
- index only published pages
- noindex empty / unpublished dynamic pages
- do not publish thin city pages
- compare pages must have unique combinations and useful fields

## 9. Publication Strategy
Implementation scope should be broader than initial publication.

Day 0 publication recommendation:
- home
- all trust pages
- all 20 region pages
- 12–18 school-type pages
- 10–15 highest-value province pages
- 40–60 highest-value city pages
- 500–1,500 school pages inside those published city clusters
- first compare pages for Rome, Milan, Naples, Turin, Bologna, Florence, Palermo, Bari, Catania, Genoa

Ramp-up:
- publish complete city clusters at 20–50 pages/day
- each cluster should include the city page + all currently matched child school pages + related compare pages
- expand province-by-province once city-cluster QA is stable

Do not publish:
- empty comuni
- single-school pages without enough context unless the school itself has direct demand
- compare pages with mostly missing fields

## 10. Competitive Advantages
Scuolario wins if it does these 10 things better than the market:
1. Official-data trust without official-site UX pain
2. Clean geography-first crawlability
3. Real filters parents can actually use
4. Better above-the-fold school page summaries
5. Compare pages based only on real, present fields
6. Strong meccanographic-code / school-name lookup
7. City pages that summarize type mix and options, not just dump rows
8. Explicit source notes and update dates on every page
9. Progressive publication that avoids thin pages
10. No fake scoring theatre

## Final build recommendation
This project is a strong Web Factory fit if and only if the build remains:
- official-data anchored
- geography-first
- comparison-safe
- anti-thin

The biggest execution risk is discovery of the full school universe from official sources because some search endpoints are browser-sensitive. The builder must plan for Playwright/browser-driven ingestion or a hybrid discovery pipeline. That risk is manageable and should be documented in the implementation prompt, not ignored.
