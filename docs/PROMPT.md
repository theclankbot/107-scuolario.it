# PROMPT.md — Scuolario

## 1. Project Overview
Build Scuolario as a geography-first Italian school finder and comparison reference product using official public-school data. The site must help parents, families, and users searching by school name, school code, city, province, region, and school type. This is not a general education news site and not a fake ranking product. It should feel like the fast, clear, modern alternative to Scuola in Chiaro for browsing and comparing schools, while staying visibly anchored to official public data.

Language and locale:
- Italian (it-IT)
- Italy only at launch
- No multilingual routing

Who it is for:
- parents comparing nearby schools
- users searching by city / province / school type
- people looking up a specific school or codice meccanografico
- families who want official facts faster than ministry UX allows

Non-negotiable product constraints:
- official-source links visible on every school page
- no fake numeric score, no star ratings, no editorialized “best school” claims
- every dynamic entity must support `publishedAt`
- all dynamic-route links must use `GatedLink`
- listing / gate pages must be `force-dynamic`
- unpublished entities must show muted Coming Soon states in listings and `notFound()` on direct access
- city pages must not be published if they are thin

## 2. Tech Stack
Use exactly this stack:
- Next.js 15 App Router + TypeScript
- Tailwind CSS 4
- Static JSON in `public/data/` — NO database
- Leaflet for maps (`"use client"`, dynamic import)
- `@vercel/analytics`
- Vercel deployment

Add only these extras:
- `clsx`
- `zod`
- `date-fns`
- `leaflet`
- `react-leaflet`

Do NOT add:
- CMS
- hosted backend
- auth/accounts
- fake review system
- external search SaaS

## 3. Data Structure
```text
public/data/
├── site.json
├── regions/
│   ├── index.json
│   ├── lazio.json
│   ├── lombardia.json
│   └── ...20 total
├── provinces/
│   ├── index.json
│   ├── roma.json
│   ├── milano.json
│   └── ...107 total
├── cities/
│   ├── index.json
│   ├── roma.json
│   ├── milano.json
│   └── ...published + unpublished city records
├── school-types/
│   ├── index.json
│   ├── scuola-primaria.json
│   ├── scuola-secondaria-di-primo-grado.json
│   ├── liceo-scientifico.json
│   ├── liceo-classico.json
│   ├── liceo-linguistico.json
│   ├── liceo-scienze-umane.json
│   ├── istituto-tecnico.json
│   ├── istituto-professionale.json
│   └── ...
├── schools/
│   ├── index.json
│   ├── RMIC8F2007.json
│   ├── MIPC03000N.json
│   └── ...
├── compare/
│   ├── index.json
│   ├── roma-licei-scientifici.json
│   ├── milano-scuole-primarie.json
│   └── ...
├── guides/
│   ├── index.json
│   ├── come-leggere-scheda-scuola.json
│   ├── codice-meccanografico-scuole.json
│   ├── differenza-liceo-tecnico-professionale.json
│   └── ...
└── pages/
    ├── about.json
    ├── data-sources.json
    ├── contact.json
    ├── privacy.json
    └── terms.json
```

### 3.1 `site.json`
```json
{
  "siteName": "Scuolario",
  "siteUrl": "https://scuolario.it",
  "defaultLocale": "it-IT",
  "tagline": "Trova scuole in Italia per città, provincia e tipologia",
  "country": "IT",
  "language": "it",
  "launchState": "italy-only",
  "lastDataRefreshAt": "2026-04-08",
  "contactEmail": "ciao@scuolario.it",
  "primarySourceLabel": "Scuola in Chiaro / MIM",
  "primarySourceUrl": "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro"
}
```

### 3.2 Region schema (`public/data/regions/[slug].json`)
```json
{
  "slug": "lazio",
  "name": "Lazio",
  "code": "12",
  "publishedAt": "2026-04-08T00:00:00.000Z",
  "h1": "Scuole nel Lazio: cerca per provincia, comune e tipologia",
  "metaTitle": "Scuole nel Lazio: province, comuni e tipologie | Scuolario",
  "metaDescription": "Trova scuole nel Lazio per provincia, comune e tipologia con dati ufficiali e pagine più facili da consultare.",
  "provinceCount": 5,
  "publishedProvinceCount": 5,
  "publishedCityCount": 42,
  "publishedSchoolCount": 1240,
  "topSchoolTypes": [
    {"slug": "scuola-primaria", "label": "Scuola primaria", "schoolCount": 310},
    {"slug": "liceo-scientifico", "label": "Liceo scientifico", "schoolCount": 95}
  ],
  "featuredProvinceSlugs": ["roma", "frosinone", "latina"],
  "sourceUrls": [
    "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro",
    "https://dati.istruzione.it/opendata/"
  ]
}
```

### 3.3 Province schema (`public/data/provinces/[slug].json`)
```json
{
  "slug": "roma",
  "name": "Roma",
  "displayName": "Provincia di Roma",
  "sigla": "RM",
  "regionSlug": "lazio",
  "publishedAt": "2026-04-08T00:00:00.000Z",
  "h1": "Scuole in provincia di Roma: comuni, tipologie e istituti",
  "metaTitle": "Scuole in provincia di Roma | Comuni, tipologie e istituti",
  "metaDescription": "Consulta scuole in provincia di Roma per comune e tipologia con dati ufficiali e confronto rapido.",
  "schoolCount": 1680,
  "publishedCityCount": 21,
  "featuredCitySlugs": ["roma", "guidonia-montecelio", "fiumicino"],
  "topSchoolTypes": [
    {"slug": "scuola-primaria", "label": "Scuola primaria", "schoolCount": 380},
    {"slug": "liceo-scientifico", "label": "Liceo scientifico", "schoolCount": 120}
  ],
  "comparePresetSlugs": ["roma-licei-scientifici", "roma-scuole-primarie"],
  "sourceUrls": [
    "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro"
  ]
}
```

### 3.4 City schema (`public/data/cities/[slug].json`)
```json
{
  "slug": "roma",
  "name": "Roma",
  "provinceSlug": "roma",
  "provinceName": "Roma",
  "regionSlug": "lazio",
  "regionName": "Lazio",
  "publishedAt": "2026-04-08T00:00:00.000Z",
  "isPublishable": true,
  "publishabilityReason": "schoolCount>=3 and multiple school types",
  "h1": "Scuole a Roma: contatti, tipologie e confronto istituti",
  "metaTitle": "Scuole a Roma: trova e confronta istituti | Scuolario",
  "metaDescription": "Trova scuole a Roma per tipologia, quartiere e dati ufficiali. Confronta istituti senza classifiche inventate.",
  "schoolCount": 980,
  "schoolTypeCount": 11,
  "hasMap": true,
  "center": {"lat": 41.9028, "lng": 12.4964},
  "schoolTypeStats": [
    {"slug": "scuola-primaria", "label": "Scuola primaria", "schoolCount": 220},
    {"slug": "scuola-secondaria-di-primo-grado", "label": "Scuola secondaria di primo grado", "schoolCount": 145},
    {"slug": "liceo-scientifico", "label": "Liceo scientifico", "schoolCount": 62}
  ],
  "featuredSchoolCodes": ["RMIC8F2007", "RMPC12000C", "RMPS26000V"],
  "comparePresetSlugs": ["roma-licei-scientifici", "roma-scuole-primarie"],
  "sourceUrls": [
    "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro"
  ]
}
```

### 3.5 School-type schema (`public/data/school-types/[slug].json`)
```json
{
  "slug": "liceo-scientifico",
  "label": "Liceo scientifico",
  "schoolLevelGroup": "secondaria-secondo-grado",
  "publishedAt": "2026-04-08T00:00:00.000Z",
  "h1": "Licei scientifici in Italia: cerca per città e provincia",
  "metaTitle": "Licei scientifici in Italia | Città, province e istituti",
  "metaDescription": "Scopri licei scientifici in Italia per città e provincia con dati ufficiali, contatti e pagine istituto.",
  "intro": "Hub nazionale per i licei scientifici, con accesso rapido alle città e province dove confrontare le scuole in modo utile.",
  "schoolCount": 2400,
  "featuredRegionSlugs": ["lazio", "lombardia", "campania"],
  "featuredCitySlugs": ["roma", "milano", "napoli"],
  "sourceUrls": [
    "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro"
  ]
}
```

### 3.6 School schema (`public/data/schools/[schoolCode].json`)
Use real field names throughout the app. This is the most important schema.

```json
{
  "schoolCode": "RMIC8F2007",
  "slug": "RMIC8F2007",
  "name": "IC Sandro Onofri",
  "canonicalName": "IC SANDRO ONOFRI",
  "schoolLevelGroup": "istituto-comprensivo",
  "schoolTypeSlug": "istituto-comprensivo",
  "schoolTypeLabel": "Istituto comprensivo",
  "legalStatus": "statale",
  "publishedAt": "2026-04-08T00:00:00.000Z",
  "h1": "IC Sandro Onofri a Roma: contatti, dati ufficiali e servizi",
  "metaTitle": "IC Sandro Onofri a Roma | Contatti, servizi e dati ufficiali",
  "metaDescription": "Scheda scuola ufficiale per IC Sandro Onofri a Roma: contatti, indirizzo, servizi, documenti e fonti MIM.",
  "regionSlug": "lazio",
  "regionName": "Lazio",
  "provinceSlug": "roma",
  "provinceName": "Roma",
  "provinceSigla": "RM",
  "citySlug": "roma",
  "cityName": "Roma",
  "address": {
    "street": "Via Cutigliano 82",
    "postalCode": "00100",
    "city": "Roma",
    "province": "RM",
    "region": "Lazio",
    "full": "VIA CUTIGLIANO, 82, 00100 ROMA (RM)"
  },
  "coordinates": {
    "lat": 41.0,
    "lng": 12.0,
    "source": "official-page-parse",
    "isApproximate": true
  },
  "contacts": {
    "phone": "0655264932",
    "fax": "0655264932",
    "email": "RMIC8F2007@istruzione.it",
    "pec": "rmic8f2007@pec.istruzione.it",
    "websiteUrl": "http://www.icsandronofri.edu.it"
  },
  "source": {
    "officialOverviewUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/",
    "didatticaUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/didattica/",
    "serviziUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/servizi/",
    "finanzaUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/finanza/",
    "ptofUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/ptof/",
    "ravUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/valutazione/",
    "rendicontazioneSocialeUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/rendicontazioneSociale/",
    "ediliziaUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/edilizia/",
    "ponUrl": "https://unica.istruzione.gov.it/cercalatuascuola/istituti/RMIC8F2007/ic-sandro-onofri/pon/"
  },
  "availability": {
    "hasDidattica": true,
    "hasServizi": true,
    "hasFinanza": true,
    "hasPtof": true,
    "hasRav": true,
    "hasRendicontazioneSociale": true,
    "hasEdilizia": true,
    "hasPon": true
  },
  "servicesSummary": {
    "hasDigitalLabs": true,
    "digitalDeviceCount": 225,
    "connectivityPoints": 145,
    "hasInnovativeLearningSpaces": true,
    "serviceNotes": [
      "La scuola dispone di laboratori multimediali/digitalizzati",
      "Sono presenti ambienti didattici innovativi"
    ]
  },
  "financeSummary": {
    "hasFinanceCharts": true,
    "financeNotes": [
      "Entrate per fonti di finanziamento disponibili sulla pagina ufficiale"
    ]
  },
  "documentsSummary": {
    "hasRav": true,
    "hasPtof": true,
    "hasRendicontazioneSociale": true
  },
  "nearbySchoolCodes": ["RMPS26000V", "RMPC12000C"],
  "sameTypeInCitySchoolCodes": ["RMIC850001", "RMIC8B901C"],
  "lastSourceCheckAt": "2026-04-08",
  "dataQuality": {
    "officiallyMatched": true,
    "matchMethod": "official-page-url",
    "missingFields": []
  }
}
```

### 3.7 Compare preset schema (`public/data/compare/[slug].json`)
```json
{
  "slug": "roma-licei-scientifici",
  "title": "Confronta licei scientifici a Roma",
  "comparisonScope": "city-school-type",
  "citySlug": "roma",
  "schoolTypeSlug": "liceo-scientifico",
  "publishedAt": "2026-04-08T00:00:00.000Z",
  "h1": "Confronta licei scientifici a Roma",
  "metaTitle": "Confronta licei scientifici a Roma | Scuolario",
  "metaDescription": "Confronto essenziale tra licei scientifici a Roma con campi ufficiali e link alle pagine scuola.",
  "schoolCodes": ["RMPS26000V", "RMPC12000C", "RMPS520003"],
  "fields": [
    "address.full",
    "contacts.phone",
    "contacts.email",
    "contacts.websiteUrl",
    "availability.hasServizi",
    "availability.hasPtof",
    "availability.hasRav",
    "servicesSummary.hasDigitalLabs"
  ],
  "comparisonNotes": [
    "Il confronto mostra solo campi presenti nelle fonti ufficiali",
    "Nessuna classifica o punteggio sintetico"
  ]
}
```

### 3.8 Guide schema (`public/data/guides/[slug].json`)
```json
{
  "slug": "codice-meccanografico-scuole",
  "title": "Cos'è il codice meccanografico di una scuola e come usarlo",
  "targetKeyword": "codice meccanografico scuole",
  "publishedAt": "2026-04-08T00:00:00.000Z",
  "h1": "Cos'è il codice meccanografico di una scuola e come usarlo",
  "metaTitle": "Codice meccanografico scuole: significato e ricerca",
  "metaDescription": "Guida semplice al codice meccanografico delle scuole e a come usarlo per trovare una scheda istituto ufficiale.",
  "intro": "Spiegazione pratica del codice meccanografico e del suo uso nella ricerca di una scuola.",
  "sections": [
    {"heading": "Che cos'è", "body": "..."},
    {"heading": "Dove si trova", "body": "..."},
    {"heading": "Come usarlo su Scuolario", "body": "..."}
  ],
  "sourceUrls": [
    "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro"
  ]
}
```

## 4. Data Pipeline
This project is data-driven. Do not hardcode the content layer.

### 4.1 Source system and access reality
Primary source system:
- `https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro`
- official school pages under `https://unica.istruzione.gov.it/cercalatuascuola/istituti/...`

Observed access behavior during strategy research:
- official school detail pages and static JS were accessible
- some search / JSON endpoints returned 403 to direct non-browser requests
- official front-end JS reveals useful discovery endpoints, but browser automation may be required to access them reliably

### 4.2 Required fetch scripts
Create these scripts under `scripts/`:
- `scripts/discover-schools-official.ts`
- `scripts/discover-schools-fallback.ts`
- `scripts/enrich-school-pages.ts`
- `scripts/build-region-province-city-indexes.ts`
- `scripts/build-compare-presets.ts`
- `scripts/validate-data.ts`

### 4.3 Discovery pipeline
Step 1 — official browser-driven discovery (preferred)
- Use Playwright, not plain `fetch`, to load Scuola in Chiaro search flows.
- Source evidence from official JS endpoints:
  - `/cercalatuascuola/caricaProvincia.json?codiceRegione=...`
  - `/cercalatuascuola/caricaComune.json?codiceProvincia=...`
  - `/cercalatuascuola/caricaTipologia.json?codiceOrdine=...`
  - `/cercalatuascuola/jsp/common/ricercaScuole.jsp?...`
- Use browser context requests or page interaction to enumerate schools by geography and type.
- Save raw discovery outputs into `data-raw/official/`.

Step 2 — fallback discovery if official browser discovery blocks
- Crawl `https://www.tuttitalia.it/scuole/` and relevant geography pages to enumerate candidate schools and city clusters.
- Crawl `https://www.cercascuole.it/` only for supplementary city/type discovery.
- Use fallback discovery ONLY to enumerate candidates; do not publish page facts from fallback-only data.

Step 3 — official enrichment
For every discovered school, fetch and parse:
- overview page
- `didattica`
- `servizi`
- `finanza`
- `ptof`
- `valutazione`
- `rendicontazioneSociale`
- `edilizia`
- `pon`

Step 4 — normalization
Normalize:
- school code
- name casing
- region/province/city slugs
- school-type slugs
- contact fields
- official URLs
- availability flags for each tab
- comparable service flags only when clearly present

Step 5 — build indexes
Generate:
- region summaries
- province summaries
- city summaries
- type summaries
- compare preset candidates
- guide metadata

Step 6 — publishability gating
Set `publishedAt: null` for:
- city pages with thin coverage
- schools not fully matched to official source
- compare presets with mostly missing fields

### 4.4 Parsing gotchas
- official pages may include uppercase names and noisy spacing
- some pages append `;jsessionid=...` to URLs — strip session IDs from stored URLs
- finance/services sections may be present as chart/text hybrids, not clean tables
- some metrics exist only for some schools; preserve nulls instead of inventing defaults
- if coordinates are missing or weak, allow city-page map clustering from available school coordinates only

### 4.5 Validation requirements
`validate-data.ts` must fail the build if:
- a published school lacks `schoolCode`, `name`, `citySlug`, `provinceSlug`, `regionSlug`, `source.officialOverviewUrl`
- a published city has `schoolCount < 3` and no explicit `publishabilityReason`
- a compare preset contains fewer than 2 schools
- any published page has missing meta title or description

## 5. Routes
Implement all of these routes.

```text
/                                            → Home
/regioni                                     → Regions index
/regioni/[regionSlug]                        → Region detail (20)
/province                                    → Provinces index
/province/[provinceSlug]                     → Province detail (107)
/comuni                                      → Cities index (published only)
/comuni/[citySlug]                           → City detail (1,500–2,500 published target)
/tipologie                                   → School-type index
/tipologie/[typeSlug]                        → School-type detail (12–18)
/scuole/[schoolCode]                         → School detail (tens of thousands supported; published subset)
/confronta                                   → Compare index
/confronta/[compareSlug]                     → Compare preset page (200–500 target)
/guide                                       → Guides index
/guide/[guideSlug]                           → Guide detail (10–14)
/about
/data-sources
/privacy
/terms
/contact
/sitemap.xml
/robots.txt
```

## 6. Page Templates

### Home (/)
1. Hero
   - Literal H1: `Trova scuole in Italia per città, provincia e tipologia`
   - Subhead: explain official data + faster browsing
   - Main search input with placeholder: `Cerca scuola, codice meccanografico, città o provincia`
   - Primary CTA: `Inizia dalla tua città`
   - Secondary CTA: `Sfoglia per regione`
2. Stats banner
   - show 4 numbers: regioni, province, comuni pubblicati, scuole pubblicate
3. Regions grid
   - all 20 region cards
4. Top cities section
   - featured published cities with school counts
5. School-type shortcuts
   - cards for primary, lower secondary, upper secondary, licei, tecnici, professionali, infanzia
6. Why Scuolario section
   - official data, no fake rankings, compare only real fields
7. Trust note
   - `Dati da Scuola in Chiaro / MIM. Ultimo aggiornamento: [date].`
8. Guide teaser
   - 3 guide cards

### Regions index (/regioni)
1. Breadcrumb: Home > Regioni
2. H1: `Regioni d'Italia: trova scuole per territorio`
3. Intro paragraph explaining geography-first browsing
4. Region card grid with counts
5. FAQ with 4 questions

### Region page (/regioni/[regionSlug])
1. Breadcrumb: Home > Regioni > [Regione]
2. H1 pattern: `Scuole in [Regione]: cerca per provincia, comune e tipologia`
3. Summary cards
   - province count
   - comuni pubblicati
   - scuole pubblicate
   - tipologie principali
4. Province grid
   - card shows province name, sigla, school count, top city
5. Top cities section
6. School-type distribution section
7. Related compare links
8. FAQ examples
   - `Come trovare le scuole in [Regione]?`
   - `Quali tipologie di scuole ci sono in [Regione]?`
   - `Scuolario usa dati ufficiali per [Regione]?`
   - `Perché non vedo tutti i comuni di [Regione]?`

### Provinces index (/province)
1. Breadcrumb: Home > Province
2. H1: `Province italiane: trova scuole per provincia`
3. Searchable province table
4. Featured province cards
5. FAQ

### Province page (/province/[provinceSlug])
1. Breadcrumb: Home > Province > [Provincia]
2. H1 pattern: `Scuole in provincia di [Provincia]: comuni, tipologie e istituti`
3. Summary cards
   - city count published
   - school count
   - top school type
   - compare pages available
4. City table
   - columns: Comune, Scuole pubblicate, Tipologie principali, Link
5. Featured schools strip
6. School-type breakdown grid
7. Related compare pages
8. FAQ examples
   - `Quali comuni della provincia di [Provincia] hanno più scuole?`
   - `Come confronto scuole nella provincia di [Provincia]?`
   - `Quali tipologie di scuole trovo nella provincia di [Provincia]?`
   - `Da dove arrivano i dati sulle scuole di [Provincia]?`

### Cities index (/comuni)
1. Breadcrumb: Home > Comuni
2. H1: `Comuni pubblicati: trova scuole città per città`
3. Search + filters by region and province
4. City table/card grid
5. Thin-content note: only published cities shown

### City page (/comuni/[citySlug])
1. Breadcrumb: Home > Regioni > [Regione] > Province > [Provincia] > [Comune]
2. H1 pattern: `Scuole a [Comune]: contatti, tipologie e confronto istituti`
3. Summary cards
   - total schools
   - number of school types
   - statali count if available
   - paritarie count if available
4. Filter bar (`"use client"`)
   - school type
   - level group
   - services flags
   - has website
5. Optional map (`"use client"` Leaflet)
   - show published schools with clickable markers
6. Main school table/grid
   - exact columns: Nome scuola, Tipologia, Indirizzo, Contatti, Servizi, Fonte ufficiale
7. Compare CTA rail
   - city compare presets
8. Nearby / related links
   - province page, region page, type pages
9. FAQ examples
   - `Come trovare una scuola a [Comune]?`
   - `Quali scuole ci sono a [Comune]?`
   - `Come confrontare scuole a [Comune] senza classifiche inventate?`
   - `Qual è il link ufficiale della scuola che cerco a [Comune]?`

### School-type index (/tipologie)
1. Breadcrumb: Home > Tipologie
2. H1: `Tipologie scolastiche: cerca scuole per percorso`
3. Type card grid
4. Intro section explaining differences among school types
5. Guide links

### School-type page (/tipologie/[typeSlug])
1. Breadcrumb: Home > Tipologie > [Tipologia]
2. H1 pattern: `[Tipologia] in Italia: cerca per città e provincia`
3. Summary cards
   - school count
   - top regions
   - top cities
   - compare pages available
4. Intro explanation of the school type
5. Region/city grid for this type
6. Featured schools section
7. Related guides section
8. FAQ examples
   - `Che cos'è [Tipologia]?`
   - `Dove trovare [Tipologia] in Italia?`
   - `Come confrontare [Tipologia] nella mia città?`
   - `Scuolario usa dati ufficiali per [Tipologia]?`

### School detail (/scuole/[schoolCode]) — MONEY PAGE
1. Breadcrumb
   - Home > Regione > Provincia > Comune > Nome scuola
2. H1 pattern
   - `[Nome scuola] a [Comune]: contatti, dati ufficiali e servizi`
3. Identity header
   - school name
   - school code
   - school type label
   - city / province / region chips
   - primary CTA: `Apri fonte ufficiale`
4. Key facts grid
   - address.full
   - contacts.phone
   - contacts.email
   - contacts.pec
   - contacts.websiteUrl
   - legalStatus
5. Map card
   - show school marker + nearby published schools if coordinates exist
6. Official-source sections
   - Overview / Chi siamo
   - Servizi e attività
   - Didattica / documenti if available
   - Finanza if available
   - RAV / PTOF / rendicontazione sociale availability
   - Edilizia / PON availability
7. Compare module
   - link to city/type compare presets including this school
8. Nearby schools
   - 4–6 cards
9. Source methodology note
   - `Questa scheda riassume dati ufficiali pubblici disponibili su Scuola in Chiaro / MIM.`
10. FAQ examples
   - `Dove si trova [Nome scuola]?`
   - `Quali contatti ufficiali ha [Nome scuola]?`
   - `Come verificare i dati di [Nome scuola]?`
   - `Con quali scuole simili posso confrontare [Nome scuola]?`
11. Do NOT implement score/rating badge
   - explicitly omit ratings and composite rankings

### Compare index (/confronta)
1. Breadcrumb: Home > Confronta
2. H1: `Confronta scuole con dati ufficiali`
3. Compare preset cards grouped by city and type
4. Explain rules: no rankings, only comparable fields

### Compare page (/confronta/[compareSlug])
1. Breadcrumb: Home > Confronta > [Titolo preset]
2. H1 pattern: `[Titolo preset]`
3. Comparison rules note
4. Side-by-side comparison table
   - rows: tipologia, indirizzo, telefono, email, PEC, sito web, servizi presenti, documenti disponibili, fonte ufficiale
5. Map with compared schools if coordinates exist
6. Related city and type links
7. FAQ examples
   - `Come leggere questo confronto?`
   - `Perché alcuni campi sono vuoti?`
   - `Scuolario assegna punteggi alle scuole?`
   - `Dove trovo la pagina ufficiale di ogni scuola?`

### Guides index (/guide)
1. Breadcrumb: Home > Guide
2. H1: `Guide pratiche per cercare e confrontare scuole`
3. Guide cards with target intent labels

### Guide detail (/guide/[guideSlug])
1. Breadcrumb: Home > Guide > [Titolo]
2. H1 from guide JSON
3. Intro summary
4. 3–6 numbered sections
5. Related routes and tools
6. FAQ where useful

### About (/about)
1. H1: `Cos'è Scuolario`
2. Explain mission: clearer access to official school data
3. Explain what the site does not do: no rankings, no reviews, no endorsements
4. Explain publication logic

### Data Sources (/data-sources)
1. H1: `Fonti dati e metodologia`
2. List every source URL
3. Explain official vs fallback discovery sources
4. Explain `publishedAt` and why some pages are not yet public
5. Explain missing-data policy

### Contact (/contact)
1. H1: `Contatti`
2. Short contact intro
3. Email block
4. Optional simple form stub only if static solution is easy; otherwise email only

### Privacy (/privacy)
1. H1: `Privacy Policy`
2. Standard privacy content

### Terms (/terms)
1. H1: `Termini di utilizzo`
2. Standard terms content

## 7. Design System

### Colors
- Primary: `#0F5E9C` — trust, civic utility, not corporate startup blue
- Secondary: `#157A6E` — calm teal accent for active states and trust highlights
- Accent: `#F2A65A` — warm accent for calls to compare or learn more
- Background: `#F7FAFC`
- Surface: `#FFFFFF`
- Border: `#D8E2EB`
- Text primary: `#16324F`
- Text secondary: `#4A6178`
- Success: `#1F9D55`
- Warning: `#B7791F`
- Danger: `#C53030`
- Muted unpublished / Coming Soon: `#A0AEC0`
- Link hover: `#0B4F83`

Do NOT use score colors because there is no rating system.

### Typography
- Font family: `Inter, ui-sans-serif, system-ui, sans-serif`
- Heading weight: 700
- Subheading weight: 600
- Body weight: 400 / 500
- Use compact label styling for metadata chips and source badges

### Key Components
```text
Header.tsx                     # global nav + search shortcut
Footer.tsx                     # trust/footer links
Breadcrumb.tsx                 # breadcrumb everywhere
GatedLink.tsx                  # required on ALL dynamic route links
SearchBar.tsx                  # "use client" search input on home and indexes
RegionCard.tsx                 # region summaries
ProvinceCard.tsx               # province summaries
CityCard.tsx                   # city summary with school count
SchoolTypeCard.tsx             # type hubs
SchoolCard.tsx                 # listing card for schools
SchoolTable.tsx                # sortable desktop table
CompareTable.tsx               # side-by-side comparison table
FactGrid.tsx                   # key school facts
SourceBadge.tsx                # official-source badge
AvailabilityPill.tsx           # tab/document availability indicator
FilterBar.tsx                  # "use client" city/type filters
MapView.tsx                    # "use client" Leaflet map
NearbySchools.tsx              # related schools list
FAQ.tsx                        # accordion + FAQ schema
ComingSoonCard.tsx             # muted unpublished entity card
StatCard.tsx                   # number + label
TrustNote.tsx                  # source/update note
GuideCard.tsx                  # guide teasers
```

## 8. SEO

### Meta Tags
Title patterns:
- Home: `Scuolario | Trova scuole in Italia per città, provincia e tipologia`
- Region: `Scuole in [Regione] | Province, comuni e tipologie`
- Province: `Scuole in provincia di [Provincia] | Scuolario`
- City: `Scuole a [Comune] | Trova e confronta istituti`
- Type: `[Tipologia] in Italia | Città, province e scuole`
- School: `[Nome scuola] a [Comune] | Contatti e dati ufficiali`
- Compare: `[Titolo preset] | Scuolario`
- Guide: `[Titolo guida] | Scuolario`

Description patterns:
- must be unique per page type
- mention official data source where appropriate
- do not claim “best” or “ranking” language unless literally about comparison method without ranks

Other rules:
- `<html lang="it-IT">`
- canonical on every page
- Open Graph on every page

### Schema.org
- Home: `WebSite` + `SearchAction`
- Region / Province / City / Type / Compare / Guide: `CollectionPage`
- School detail: `School`
- All pages: `BreadcrumbList`
- FAQPage on pages with FAQ section
- About / Contact / Data Sources: `WebPage`

### Sitemap
- split sitemap by section:
  - `/sitemaps/regions.xml`
  - `/sitemaps/provinces.xml`
  - `/sitemaps/cities.xml`
  - `/sitemaps/schools-1.xml`, `/sitemaps/schools-2.xml`, etc.
  - `/sitemaps/types.xml`
  - `/sitemaps/compare.xml`
  - `/sitemaps/guides.xml`
- sitemap index at `/sitemap.xml`
- include only published pages

## 9. Progressive Publication (NON-NEGOTIABLE)
The site must be implemented for the agreed scope even if not everything is public on Day 0.

Rules:
- every entity record must include `publishedAt`
- `publishedAt: null` means implemented but not public
- ALL links to dynamic routes must use `GatedLink`
- apply `GatedLink` on:
  - region cards
  - province cards
  - city cards
  - school-type cards
  - school cards
  - nearby school links
  - compare preset links
  - guide cards if guide unpublished
  - breadcrumbs to dynamic entities when target may be unpublished
- listing / gate pages that compute visibility must use `export const dynamic = 'force-dynamic'`
- direct access to unpublished entity route must call `notFound()`
- unpublished cards/rows must show muted Coming Soon UI and be non-clickable

Day 0 publication plan:
- home
- all trust pages
- all region pages
- all school-type pages
- top 10–15 province pages
- top 40–60 city pages
- first 500–1,500 fully matched school pages inside those city clusters
- first compare presets for the largest city/type combinations

Ramp-up plan:
- publish complete city clusters at 20–50 pages/day
- a cluster means: city page + all child published schools + related compare pages
- move province-by-province once city QA is stable

Explicit separation:
- implemented routes will support the larger national data model
- publicly published routes are controlled by `publishedAt`

## 10. E-E-A-T Pages (MANDATORY)

### About
Say:
- Scuolario is a public-interest reference product for school discovery in Italy
- it reorganizes public official information to make it easier to browse
- it does not assign scores or endorsements

### Data Sources
Must list:
- `https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro`
- `https://www.mim.gov.it/-/scuola-in-chiaro`
- `https://dati.istruzione.it/opendata/`
- official school pages under `https://unica.istruzione.gov.it/cercalatuascuola/istituti/...`
- if fallback discovery is used, disclose third-party discovery sources clearly and say official pages remain the canonical facts source

### Contact
- simple contact email
- no fake office address unless real

### Privacy Policy
- standard static page

### Terms of Use
- standard static page

### Cookie consent
- lightweight, compliant banner
- restrained visual style matching site colors

## 11. Guides / Editorial Content
Create these guides:
1. `/guide/come-leggere-scheda-scuola`
   - Title: `Come leggere la scheda di una scuola su Scuolario`
   - Target keyword: `scuola in chiaro`
2. `/guide/codice-meccanografico-scuole`
   - Title: `Cos'è il codice meccanografico di una scuola e come usarlo`
   - Target keyword: `codice meccanografico scuole`
3. `/guide/differenza-liceo-tecnico-professionale`
   - Title: `Differenza tra liceo, istituto tecnico e professionale`
4. `/guide/come-confrontare-scuole-senza-classifiche`
   - Title: `Come confrontare scuole senza classifiche inventate`
5. `/guide/come-trovare-scuola-per-citta`
   - Title: `Come trovare una scuola per città, provincia e tipologia`
6. `/guide/scuola-primaria-secondaria-differenze`
   - Title: `Scuola primaria, secondaria di primo grado e secondo grado: differenze`
7. `/guide/come-usare-scuola-in-chiaro`
   - Title: `Come usare Scuola in Chiaro e quando conviene usare Scuolario`
8. `/guide/scuola-paritaria-cosa-significa`
   - Title: `Scuola paritaria: cosa significa`
9. `/guide/iscrizione-scuola-primaria-cosa-guardare`
   - Title: `Iscrizione alla scuola primaria: cosa guardare prima di scegliere`
10. `/guide/liceo-scientifico-cosa-guardare`
   - Title: `Cosa guardare quando confronti un liceo scientifico`

## 12. Monetization Hooks
- AdSense only on index/listing/school pages, with low aggression
- no ads above the main H1
- safe placements:
  - below city/province summary cards
  - between school listing sections
  - below school detail related-links block
- leave room in data model for future `enhancedProfileAvailable` on schools, but do not implement paid profile UX in v1

## 13. Differentiators
Scuolario must not feel like a generic directory. It must differentiate via:
- official-data trust + visible source URLs
- geography-first crawlability
- city pages with useful summaries, not just lists
- comparison pages with only real fields
- explicit missing-data handling (`Dato non disponibile`)
- clean parent-facing UX
- no fake score or rank
- fast school lookup by name and code
- stronger breadcrumbs and internal-link design than the official product

## What NOT to include
- no keyword tables in the UI
- no competitor analysis in the UI
- no fake “migliori scuole” rankings
- no user reviews
- no hidden dynamic routes outside the data model above
