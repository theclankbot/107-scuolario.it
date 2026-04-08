#!/usr/bin/env tsx
/**
 * build-region-province-city-indexes.ts
 *
 * Generates index.json files for regions, provinces, and cities
 * from the individual entity JSON files in public/data/.
 *
 * Usage: npx tsx scripts/build-region-province-city-indexes.ts
 */

import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "public", "data");

function readJsonDir<T>(dir: string): T[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f !== "index.json" && f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
}

function buildRegionIndex() {
  const regions = readJsonDir<{
    slug: string;
    name: string;
    code: string;
    publishedAt: string | null;
    provinceCount: number;
    publishedSchoolCount: number;
  }>(path.join(DATA_DIR, "regions"));

  const index = regions
    .map((r) => ({
      slug: r.slug,
      name: r.name,
      code: r.code,
      publishedAt: r.publishedAt,
      provinceCount: r.provinceCount,
      publishedSchoolCount: r.publishedSchoolCount,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "it"));

  fs.writeFileSync(
    path.join(DATA_DIR, "regions", "index.json"),
    JSON.stringify(index, null, 2)
  );
  console.log(`Regions index: ${index.length} entries`);
}

function buildProvinceIndex() {
  const provinces = readJsonDir<{
    slug: string;
    name: string;
    sigla: string;
    regionSlug: string;
    publishedAt: string | null;
    schoolCount: number;
  }>(path.join(DATA_DIR, "provinces"));

  const index = provinces
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      sigla: p.sigla,
      regionSlug: p.regionSlug,
      publishedAt: p.publishedAt,
      schoolCount: p.schoolCount,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "it"));

  fs.writeFileSync(
    path.join(DATA_DIR, "provinces", "index.json"),
    JSON.stringify(index, null, 2)
  );
  console.log(`Provinces index: ${index.length} entries`);
}

function buildCityIndex() {
  const cities = readJsonDir<{
    slug: string;
    name: string;
    provinceSlug: string;
    regionSlug: string;
    publishedAt: string | null;
    schoolCount: number;
  }>(path.join(DATA_DIR, "cities"));

  const index = cities
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      provinceSlug: c.provinceSlug,
      regionSlug: c.regionSlug,
      publishedAt: c.publishedAt,
      schoolCount: c.schoolCount,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "it"));

  fs.writeFileSync(
    path.join(DATA_DIR, "cities", "index.json"),
    JSON.stringify(index, null, 2)
  );
  console.log(`Cities index: ${index.length} entries`);
}

function main() {
  console.log("=== Building Region/Province/City Indexes ===\n");

  buildRegionIndex();
  buildProvinceIndex();
  buildCityIndex();

  console.log("\nAll indexes built successfully.");
}

main();
