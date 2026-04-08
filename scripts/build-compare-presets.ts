#!/usr/bin/env tsx
/**
 * build-compare-presets.ts
 *
 * Generates compare preset JSON files from school data,
 * creating city+type comparison pages for high-demand combinations.
 *
 * Usage: npx tsx scripts/build-compare-presets.ts
 */

import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "public", "data");

interface SchoolSummary {
  schoolCode: string;
  name: string;
  schoolTypeSlug: string;
  citySlug: string;
  publishedAt: string | null;
}

function readJsonDir<T>(dir: string): T[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f !== "index.json" && f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâ]/g, "a")
    .replace(/[èéê]/g, "e")
    .replace(/[ìíî]/g, "i")
    .replace(/[òóô]/g, "o")
    .replace(/[ùúû]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const COMPARE_FIELDS = [
  "address.full",
  "contacts.phone",
  "contacts.email",
  "contacts.pec",
  "contacts.websiteUrl",
  "availability.hasServizi",
  "availability.hasPtof",
  "availability.hasRav",
  "servicesSummary.hasDigitalLabs",
];

function main() {
  console.log("=== Building Compare Presets ===\n");

  const schools = readJsonDir<SchoolSummary>(path.join(DATA_DIR, "schools"));
  const publishedSchools = schools.filter((s) => s.publishedAt !== null);

  // Group by city + school type
  const groups = new Map<string, SchoolSummary[]>();

  for (const school of publishedSchools) {
    const key = `${school.citySlug}--${school.schoolTypeSlug}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(school);
  }

  let created = 0;
  const presets: Array<{ slug: string; title: string; publishedAt: string | null }> =
    [];

  for (const [key, schoolList] of groups) {
    // Only create presets with 2+ schools
    if (schoolList.length < 2) continue;

    const [citySlug, typeSlug] = key.split("--");

    // Read city data for display name
    const cityPath = path.join(DATA_DIR, "cities", `${citySlug}.json`);
    const typePath = path.join(DATA_DIR, "school-types", `${typeSlug}.json`);

    if (!fs.existsSync(cityPath) || !fs.existsSync(typePath)) continue;

    const city = JSON.parse(fs.readFileSync(cityPath, "utf-8"));
    const type = JSON.parse(fs.readFileSync(typePath, "utf-8"));

    const slug = `${citySlug}-${slugify(type.label.replace(/^(Liceo|Istituto|Scuola)\s+/i, "").toLowerCase())}`;
    const title = `Confronta ${type.label.toLowerCase()} a ${city.name}`;

    const preset = {
      slug,
      title,
      comparisonScope: "city-school-type" as const,
      citySlug,
      schoolTypeSlug: typeSlug,
      publishedAt: city.publishedAt && type.publishedAt ? "2026-04-08T00:00:00.000Z" : null,
      h1: title,
      metaTitle: `${title} | Scuolario`,
      metaDescription: `Confronto tra ${type.label.toLowerCase()} a ${city.name} con dati ufficiali, contatti e servizi. Nessuna classifica inventata.`,
      schoolCodes: schoolList.slice(0, 6).map((s) => s.schoolCode),
      fields: COMPARE_FIELDS,
      comparisonNotes: [
        "Il confronto mostra solo campi presenti nelle fonti ufficiali",
        "Nessuna classifica o punteggio sintetico",
      ],
    };

    fs.writeFileSync(
      path.join(DATA_DIR, "compare", `${slug}.json`),
      JSON.stringify(preset, null, 2)
    );

    presets.push({
      slug: preset.slug,
      title: preset.title,
      publishedAt: preset.publishedAt,
    });
    created++;
  }

  // Write index
  fs.writeFileSync(
    path.join(DATA_DIR, "compare", "index.json"),
    JSON.stringify(presets, null, 2)
  );

  console.log(`Created ${created} compare presets.`);
}

main();
