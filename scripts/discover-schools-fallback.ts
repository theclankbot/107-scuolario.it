#!/usr/bin/env tsx
/**
 * discover-schools-fallback.ts
 *
 * Fallback school discovery using publicly accessible directory sites
 * when official browser-driven discovery is unavailable.
 *
 * Sources:
 * - https://www.tuttitalia.it/scuole/ (geography/type directory)
 * - https://www.cercascuole.it/ (city-level school lists)
 *
 * These are used ONLY for candidate enumeration.
 * Final page facts must come from official sources.
 *
 * Usage: npx tsx scripts/discover-schools-fallback.ts
 */

import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "data-raw", "fallback");

interface DiscoveredSchool {
  name: string;
  schoolCode: string | null;
  city: string;
  province: string;
  region: string;
  type: string | null;
  sourceUrl: string;
  discoveredAt: string;
}

async function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const resp = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Scuolario/1.0; +https://scuolario.it)",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      if (resp.ok) return await resp.text();
      console.log(`  HTTP ${resp.status} for ${url}, retry ${i + 1}/${retries}`);
    } catch (err) {
      console.log(
        `  Error fetching ${url}: ${(err as Error).message}, retry ${i + 1}/${retries}`
      );
    }
    await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
  }
  return null;
}

async function discoverFromTuttitalia(): Promise<DiscoveredSchool[]> {
  console.log("Discovering schools from tuttitalia.it...");
  const schools: DiscoveredSchool[] = [];

  // Main regions and provinces structure
  const regionUrls = [
    { url: "https://www.tuttitalia.it/lazio/33-roma/64-scuole/", region: "Lazio", province: "Roma", city: "Roma" },
    { url: "https://www.tuttitalia.it/lombardia/15-milano/64-scuole/", region: "Lombardia", province: "Milano", city: "Milano" },
    { url: "https://www.tuttitalia.it/campania/63-napoli/64-scuole/", region: "Campania", province: "Napoli", city: "Napoli" },
    { url: "https://www.tuttitalia.it/piemonte/1-torino/64-scuole/", region: "Piemonte", province: "Torino", city: "Torino" },
  ];

  for (const entry of regionUrls) {
    console.log(`  Fetching ${entry.city}...`);
    const html = await fetchWithRetry(entry.url);

    if (html) {
      // Save raw HTML for later parsing
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `tuttitalia-${entry.city.toLowerCase()}.html`),
        html
      );

      // Basic extraction of school names from HTML
      const schoolMatches = html.match(
        /<td[^>]*class="[^"]*nome[^"]*"[^>]*>([^<]+)<\/td>/gi
      );
      if (schoolMatches) {
        for (const match of schoolMatches) {
          const nameMatch = match.match(/>([^<]+)</);
          if (nameMatch) {
            schools.push({
              name: nameMatch[1].trim(),
              schoolCode: null,
              city: entry.city,
              province: entry.province,
              region: entry.region,
              type: null,
              sourceUrl: entry.url,
              discoveredAt: new Date().toISOString(),
            });
          }
        }
      }
      console.log(
        `    Found ${schoolMatches?.length || 0} candidate names`
      );
    }

    await new Promise((r) => setTimeout(r, 3000));
  }

  return schools;
}

async function main() {
  console.log("=== Scuolario Fallback School Discovery ===");
  console.log("Sources: tuttitalia.it, cercascuole.it");
  console.log(`Output: ${OUTPUT_DIR}\n`);

  await ensureDir(OUTPUT_DIR);

  const schools = await discoverFromTuttitalia();

  const output = {
    totalCandidates: schools.length,
    discoveredAt: new Date().toISOString(),
    note: "Fallback discovery only. Final facts must come from official sources.",
    schools,
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "fallback-discovery.json"),
    JSON.stringify(output, null, 2)
  );

  console.log(`\nTotal candidates discovered: ${schools.length}`);
  console.log("Output saved to:", path.join(OUTPUT_DIR, "fallback-discovery.json"));
  console.log(
    "\nNext step: Run enrich-school-pages.ts to validate against official sources."
  );
}

main().catch(console.error);
