// ---------------------------------------------------------------------------
// Scuolario -- Data loading helpers (server-side, build-time)
// ---------------------------------------------------------------------------

import fs from "fs";
import path from "path";

import type {
  SiteConfig,
  Region,
  Province,
  City,
  SchoolType,
  School,
  SchoolIndex,
  ComparePreset,
  Guide,
  PageData,
} from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "public", "data");

function readJson<T>(filePath: string): T | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function readJsonDir<T>(dirPath: string): T[] {
  try {
    const files = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith(".json") && f !== "index.json");
    const items: T[] = [];
    for (const file of files) {
      const item = readJson<T>(path.join(dirPath, file));
      if (item !== null) items.push(item);
    }
    return items;
  } catch {
    return [];
  }
}

function readIndexOrDir<T>(dirPath: string): T[] {
  const indexPath = path.join(dirPath, "index.json");
  const index = readJson<T[]>(indexPath);
  if (index !== null) return index;
  return readJsonDir<T>(dirPath);
}

// ---- Site config ----------------------------------------------------------

export function getSiteConfig(): SiteConfig {
  const config = readJson<SiteConfig>(path.join(DATA_DIR, "site.json"));
  if (config) return config;
  return {
    siteName: "Scuolario",
    siteUrl: "https://scuolario.it",
    defaultLocale: "it-IT",
    tagline: "Trova scuole in Italia per città, provincia e tipologia",
    country: "IT",
    language: "it",
    launchState: "italy-only",
    lastDataRefreshAt: "2026-04-08",
    contactEmail: "ciao@scuolario.it",
    primarySourceLabel: "Scuola in Chiaro / MIM",
    primarySourceUrl: "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro",
  };
}

// ---- Regions --------------------------------------------------------------

export function getRegions(): Region[] {
  return readIndexOrDir<Region>(path.join(DATA_DIR, "regions"));
}

export function getRegion(slug: string): Region | null {
  return readJson<Region>(path.join(DATA_DIR, "regions", `${slug}.json`));
}

// ---- Provinces ------------------------------------------------------------

export function getProvinces(): Province[] {
  return readIndexOrDir<Province>(path.join(DATA_DIR, "provinces"));
}

export function getProvince(slug: string): Province | null {
  return readJson<Province>(path.join(DATA_DIR, "provinces", `${slug}.json`));
}

// ---- Cities ---------------------------------------------------------------

export function getCities(): City[] {
  return readIndexOrDir<City>(path.join(DATA_DIR, "cities"));
}

export function getCity(slug: string): City | null {
  return readJson<City>(path.join(DATA_DIR, "cities", `${slug}.json`));
}

// ---- School types ---------------------------------------------------------

export function getSchoolTypes(): SchoolType[] {
  return readIndexOrDir<SchoolType>(path.join(DATA_DIR, "school-types"));
}

export function getSchoolType(slug: string): SchoolType | null {
  return readJson<SchoolType>(
    path.join(DATA_DIR, "school-types", `${slug}.json`)
  );
}

// ---- Schools --------------------------------------------------------------

export function getSchool(code: string): School | null {
  return readJson<School>(path.join(DATA_DIR, "schools", `${code}.json`));
}

export function getSchoolsIndex(): SchoolIndex[] {
  const indexPath = path.join(DATA_DIR, "schools", "index.json");
  const index = readJson<SchoolIndex[]>(indexPath);
  if (index !== null) return index;

  const schools = readJsonDir<School>(path.join(DATA_DIR, "schools"));
  return schools.map((s) => ({
    schoolCode: s.schoolCode,
    slug: s.slug,
    name: s.name,
    schoolTypeSlug: s.schoolTypeSlug,
    schoolTypeLabel: s.schoolTypeLabel,
    citySlug: s.citySlug,
    cityName: s.cityName,
    provinceSlug: s.provinceSlug,
    provinceSigla: s.provinceSigla,
    publishedAt: s.publishedAt,
  }));
}

export function getSchoolsByCity(citySlug: string): School[] {
  const city = getCity(citySlug);
  if (!city) return [];

  if (city.featuredSchoolCodes && city.featuredSchoolCodes.length > 0) {
    const schools: School[] = [];
    for (const code of city.featuredSchoolCodes) {
      const school = getSchool(code);
      if (school) schools.push(school);
    }
    return schools;
  }

  const index = getSchoolsIndex();
  const matchingCodes = index
    .filter((s) => s.citySlug === citySlug)
    .map((s) => s.schoolCode);

  const schools: School[] = [];
  for (const code of matchingCodes) {
    const school = getSchool(code);
    if (school) schools.push(school);
  }
  return schools;
}

export function getSchoolsForCompare(codes: string[]): School[] {
  const schools: School[] = [];
  for (const code of codes) {
    const school = getSchool(code);
    if (school) schools.push(school);
  }
  return schools;
}

// ---- Compare presets ------------------------------------------------------

export function getComparePresets(): ComparePreset[] {
  return readJsonDir<ComparePreset>(path.join(DATA_DIR, "compare"));
}

export function getComparePreset(slug: string): ComparePreset | null {
  return readJson<ComparePreset>(
    path.join(DATA_DIR, "compare", `${slug}.json`)
  );
}

// ---- Guides ---------------------------------------------------------------

export function getGuides(): Guide[] {
  return readIndexOrDir<Guide>(path.join(DATA_DIR, "guides"));
}

export function getGuide(slug: string): Guide | null {
  return readJson<Guide>(path.join(DATA_DIR, "guides", `${slug}.json`));
}

// ---- Static pages ---------------------------------------------------------

export function getPageData(slug: string): PageData | null {
  return readJson<PageData>(path.join(DATA_DIR, "pages", `${slug}.json`));
}
