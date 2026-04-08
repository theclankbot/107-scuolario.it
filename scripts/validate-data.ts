#!/usr/bin/env tsx
/**
 * validate-data.ts
 *
 * Validates all data files in public/data/ against required schemas
 * and business rules. Exits with code 1 if validation fails.
 *
 * Rules:
 * - Published school must have: schoolCode, name, citySlug, provinceSlug,
 *   regionSlug, source.officialOverviewUrl
 * - Published city must have schoolCount >= 3 or explicit publishabilityReason
 * - Compare preset must have >= 2 schools
 * - All published pages must have metaTitle and metaDescription
 *
 * Usage: npx tsx scripts/validate-data.ts
 */

import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "public", "data");

let errors: string[] = [];
let warnings: string[] = [];

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function readJsonDir(dir: string): Array<{ file: string; data: Record<string, unknown> }> {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f !== "index.json" && f.endsWith(".json"))
    .map((f) => ({
      file: f,
      data: readJson(path.join(dir, f)) as Record<string, unknown>,
    }));
}

function validateSchools() {
  console.log("Validating schools...");
  const schools = readJsonDir(path.join(DATA_DIR, "schools"));

  for (const { file, data } of schools) {
    if (data.publishedAt === null) continue; // Only validate published

    const missing: string[] = [];
    if (!data.schoolCode) missing.push("schoolCode");
    if (!data.name) missing.push("name");
    if (!data.citySlug) missing.push("citySlug");
    if (!data.provinceSlug) missing.push("provinceSlug");
    if (!data.regionSlug) missing.push("regionSlug");

    const source = data.source as Record<string, unknown> | undefined;
    if (!source?.officialOverviewUrl)
      missing.push("source.officialOverviewUrl");

    if (missing.length > 0) {
      errors.push(
        `School ${file}: published but missing required fields: ${missing.join(", ")}`
      );
    }

    if (!data.metaTitle) errors.push(`School ${file}: missing metaTitle`);
    if (!data.metaDescription)
      errors.push(`School ${file}: missing metaDescription`);
  }

  console.log(`  Checked ${schools.length} school files`);
}

function validateCities() {
  console.log("Validating cities...");
  const cities = readJsonDir(path.join(DATA_DIR, "cities"));

  for (const { file, data } of cities) {
    if (data.publishedAt === null) continue;

    const schoolCount = data.schoolCount as number;
    if (schoolCount < 3 && !data.publishabilityReason) {
      errors.push(
        `City ${file}: published with schoolCount=${schoolCount} but no publishabilityReason`
      );
    }

    if (!data.metaTitle) errors.push(`City ${file}: missing metaTitle`);
    if (!data.metaDescription)
      errors.push(`City ${file}: missing metaDescription`);
  }

  console.log(`  Checked ${cities.length} city files`);
}

function validateComparePresets() {
  console.log("Validating compare presets...");
  const presets = readJsonDir(path.join(DATA_DIR, "compare"));

  for (const { file, data } of presets) {
    if (data.publishedAt === null) continue;

    const codes = data.schoolCodes as string[];
    if (!codes || codes.length < 2) {
      errors.push(
        `Compare ${file}: published with fewer than 2 schools`
      );
    }

    if (!data.metaTitle) errors.push(`Compare ${file}: missing metaTitle`);
    if (!data.metaDescription)
      errors.push(`Compare ${file}: missing metaDescription`);
  }

  console.log(`  Checked ${presets.length} compare files`);
}

function validateRegionsProvincesTypes() {
  console.log("Validating regions, provinces, and school types...");

  for (const section of ["regions", "provinces", "school-types"]) {
    const items = readJsonDir(path.join(DATA_DIR, section));
    for (const { file, data } of items) {
      if (data.publishedAt === null) continue;
      if (!data.metaTitle)
        errors.push(`${section}/${file}: missing metaTitle`);
      if (!data.metaDescription)
        errors.push(`${section}/${file}: missing metaDescription`);
    }
    console.log(`  ${section}: ${items.length} files`);
  }
}

function validateGuides() {
  console.log("Validating guides...");
  const guides = readJsonDir(path.join(DATA_DIR, "guides"));

  for (const { file, data } of guides) {
    if (data.publishedAt === null) continue;
    if (!data.metaTitle) errors.push(`Guide ${file}: missing metaTitle`);
    if (!data.metaDescription)
      errors.push(`Guide ${file}: missing metaDescription`);
    if (!data.title) errors.push(`Guide ${file}: missing title`);

    const sections = data.sections as Array<Record<string, unknown>> | undefined;
    if (!sections || sections.length === 0) {
      warnings.push(`Guide ${file}: no content sections`);
    }
  }

  console.log(`  Checked ${guides.length} guide files`);
}

function validateSiteConfig() {
  console.log("Validating site.json...");
  const sitePath = path.join(DATA_DIR, "site.json");
  if (!fs.existsSync(sitePath)) {
    errors.push("site.json not found");
    return;
  }
  const site = readJson(sitePath) as Record<string, unknown>;
  if (!site.siteName) errors.push("site.json: missing siteName");
  if (!site.siteUrl) errors.push("site.json: missing siteUrl");
  if (!site.contactEmail) errors.push("site.json: missing contactEmail");
}

function main() {
  console.log("=== Scuolario Data Validation ===\n");

  validateSiteConfig();
  validateSchools();
  validateCities();
  validateComparePresets();
  validateRegionsProvincesTypes();
  validateGuides();

  console.log("\n=== Results ===");
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (warnings.length > 0) {
    console.log("\nWarnings:");
    warnings.forEach((w) => console.log(`  ⚠ ${w}`));
  }

  if (errors.length > 0) {
    console.log("\nErrors:");
    errors.forEach((e) => console.log(`  ✗ ${e}`));
    console.log("\nValidation FAILED.");
    process.exit(1);
  }

  console.log("\nValidation PASSED.");
}

main();
