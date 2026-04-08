#!/usr/bin/env tsx
/**
 * discover-schools-official.ts
 *
 * Official school discovery pipeline using browser-driven access
 * to Scuola in Chiaro / MIM search endpoints.
 *
 * These endpoints return 403 to plain HTTP requests and require
 * browser context (Playwright) to access:
 * - /cercalatuascuola/caricaProvincia.json?codiceRegione=...
 * - /cercalatuascuola/caricaComune.json?codiceProvincia=...
 * - /cercalatuascuola/caricaTipologia.json?codiceOrdine=...
 * - /cercalatuascuola/jsp/common/ricercaScuole.jsp?...
 *
 * Usage: npx tsx scripts/discover-schools-official.ts
 *
 * Prerequisites: npm install playwright
 * Then: npx playwright install chromium
 */

import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://unica.istruzione.gov.it";
const OUTPUT_DIR = path.join(process.cwd(), "data-raw", "official");

const REGION_CODES: Record<string, string> = {
  "01": "Piemonte",
  "02": "Valle d'Aosta",
  "03": "Lombardia",
  "04": "Trentino-Alto Adige",
  "05": "Veneto",
  "06": "Friuli-Venezia Giulia",
  "07": "Liguria",
  "08": "Emilia-Romagna",
  "09": "Toscana",
  "10": "Umbria",
  "11": "Marche",
  "12": "Lazio",
  "13": "Abruzzo",
  "14": "Molise",
  "15": "Campania",
  "16": "Puglia",
  "17": "Basilicata",
  "18": "Calabria",
  "19": "Sicilia",
  "20": "Sardegna",
};

async function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function discoverWithPlaywright() {
  // Dynamic runtime import so TypeScript does not require playwright to be installed
  let chromium;
  try {
    const loadPlaywright = new Function(
      'return import("playwright")'
    ) as () => Promise<{ chromium: { launch: (options: { headless: boolean }) => Promise<any> } }>;
    const pw = await loadPlaywright();
    chromium = pw.chromium;
  } catch {
    console.error(
      "Playwright not installed. Install with: npm install playwright && npx playwright install chromium"
    );
    console.log(
      "Falling back to discover-schools-fallback.ts for discovery."
    );
    process.exit(1);
  }

  await ensureDir(OUTPUT_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  console.log("Starting official school discovery via browser automation...\n");

  for (const [code, name] of Object.entries(REGION_CODES)) {
    console.log(`Discovering provinces for ${name} (code: ${code})...`);

    try {
      // Navigate to search page first to establish session
      await page.goto(
        `${BASE_URL}/cercalatuascuola/jsp/common/ricercaScuole.jsp`,
        { waitUntil: "networkidle", timeout: 30000 }
      );

      // Fetch provinces for this region via browser context
      const provinceResponse = await page.evaluate(
        async (regionCode: string) => {
          const resp = await fetch(
            `/cercalatuascuola/caricaProvincia.json?codiceRegione=${regionCode}`
          );
          return resp.json();
        },
        code
      );

      const regionOutput = {
        regionCode: code,
        regionName: name,
        provinces: provinceResponse,
        discoveredAt: new Date().toISOString(),
      };

      fs.writeFileSync(
        path.join(OUTPUT_DIR, `region-${code}.json`),
        JSON.stringify(regionOutput, null, 2)
      );

      console.log(
        `  Found ${Array.isArray(provinceResponse) ? provinceResponse.length : 0} provinces`
      );

      // Rate limiting
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  Error discovering ${name}: ${(err as Error).message}`);
    }
  }

  await browser.close();
  console.log("\nOfficial discovery complete. Output saved to:", OUTPUT_DIR);
}

async function main() {
  console.log("=== Scuolario Official School Discovery ===");
  console.log("Source: Scuola in Chiaro / MIM");
  console.log(`Output: ${OUTPUT_DIR}\n`);

  await discoverWithPlaywright();
}

main().catch(console.error);
