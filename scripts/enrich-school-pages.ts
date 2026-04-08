#!/usr/bin/env tsx
/**
 * enrich-school-pages.ts
 *
 * Enriches discovered school records by fetching official school detail pages
 * from Scuola in Chiaro / MIM and extracting real facts.
 *
 * For each school code, fetches:
 * - Overview page: /cercalatuascuola/istituti/{CODE}/{slug}/
 * - Didattica tab: .../didattica/
 * - Servizi tab: .../servizi/
 * - Finanza tab: .../finanza/
 * - PTOF tab: .../ptof/
 * - Valutazione tab: .../valutazione/
 * - Rendicontazione Sociale tab: .../rendicontazioneSociale/
 * - Edilizia tab: .../edilizia/
 * - PON tab: .../pon/
 *
 * Usage: npx tsx scripts/enrich-school-pages.ts
 */

import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://unica.istruzione.gov.it/cercalatuascuola/istituti";
const INPUT_DIR = path.join(process.cwd(), "data-raw");
const OUTPUT_DIR = path.join(process.cwd(), "data-raw", "official", "schools");

interface SchoolEnrichment {
  schoolCode: string;
  name: string | null;
  address: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  pec: string | null;
  websiteUrl: string | null;
  city: string | null;
  province: string | null;
  region: string | null;
  officialUrl: string;
  tabs: {
    didattica: boolean;
    servizi: boolean;
    finanza: boolean;
    ptof: boolean;
    valutazione: boolean;
    rendicontazioneSociale: boolean;
    edilizia: boolean;
    pon: boolean;
  };
  enrichedAt: string;
}

async function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugifySchoolName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function enrichSchool(
  schoolCode: string,
  knownSlug?: string
): Promise<SchoolEnrichment | null> {
  const slug = knownSlug || schoolCode.toLowerCase();
  const baseUrl = `${BASE_URL}/${schoolCode}`;

  try {
    // Try to fetch the overview page
    const overviewResp = await fetch(`${baseUrl}/${slug}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Scuolario/1.0; +https://scuolario.it)",
      },
      redirect: "follow",
    });

    if (!overviewResp.ok) {
      console.log(`  ${schoolCode}: HTTP ${overviewResp.status}`);
      return null;
    }

    const html = await overviewResp.text();

    // Extract school name
    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const name = nameMatch ? nameMatch[1].trim() : null;

    // Extract contact info patterns
    const phoneMatch = html.match(/tel[.:]\s*([0-9\s/.-]+)/i);
    const emailMatch = html.match(
      /([a-zA-Z0-9._-]+@istruzione\.it)/i
    );
    const pecMatch = html.match(
      /([a-zA-Z0-9._-]+@pec\.istruzione\.it)/i
    );

    // Check tab availability by looking for navigation links
    const tabs = {
      didattica: html.includes("/didattica/") || html.includes("Didattica"),
      servizi: html.includes("/servizi/") || html.includes("Servizi"),
      finanza: html.includes("/finanza/") || html.includes("Finanza"),
      ptof: html.includes("/ptof/") || html.includes("PTOF"),
      valutazione:
        html.includes("/valutazione/") || html.includes("Valutazione"),
      rendicontazioneSociale:
        html.includes("/rendicontazioneSociale/") ||
        html.includes("Rendicontazione"),
      edilizia: html.includes("/edilizia/") || html.includes("Edilizia"),
      pon: html.includes("/pon/") || html.includes("PON"),
    };

    return {
      schoolCode,
      name,
      address: null, // Requires deeper HTML parsing
      phone: phoneMatch ? phoneMatch[1].trim() : null,
      fax: null,
      email: emailMatch ? emailMatch[1] : null,
      pec: pecMatch ? pecMatch[1] : null,
      websiteUrl: null,
      city: null,
      province: null,
      region: null,
      officialUrl: overviewResp.url,
      tabs,
      enrichedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.log(
      `  ${schoolCode}: Error - ${(err as Error).message}`
    );
    return null;
  }
}

async function main() {
  console.log("=== Scuolario School Page Enrichment ===");
  console.log("Source: Official school detail pages");
  console.log(`Output: ${OUTPUT_DIR}\n`);

  await ensureDir(OUTPUT_DIR);

  // Load school codes from existing data
  const schoolsDir = path.join(process.cwd(), "public", "data", "schools");
  if (!fs.existsSync(schoolsDir)) {
    console.log("No schools directory found. Run discovery scripts first.");
    return;
  }

  const files = fs.readdirSync(schoolsDir).filter((f) => f !== "index.json");
  console.log(`Found ${files.length} school files to enrich.\n`);

  let enriched = 0;
  let failed = 0;

  for (const file of files) {
    const schoolCode = file.replace(".json", "");
    if (schoolCode === "index") continue;

    console.log(`Enriching ${schoolCode}...`);
    const result = await enrichSchool(schoolCode);

    if (result) {
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${schoolCode}.json`),
        JSON.stringify(result, null, 2)
      );
      enriched++;
    } else {
      failed++;
    }

    // Rate limiting: 1 request per 2 seconds
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\nEnrichment complete.`);
  console.log(`  Enriched: ${enriched}`);
  console.log(`  Failed: ${failed}`);
}

main().catch(console.error);
