// ---------------------------------------------------------------------------
// Scuolario -- TypeScript type definitions for all entities
// Matches schemas defined in docs/PROMPT.md exactly
// ---------------------------------------------------------------------------

// ---- Shared / embedded value types ----------------------------------------

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  province: string;
  region: string;
  full: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
  source?: string;
  isApproximate?: boolean;
}

export interface Contacts {
  phone: string | null;
  fax: string | null;
  email: string | null;
  pec: string | null;
  websiteUrl: string | null;
}

export interface Source {
  officialOverviewUrl: string;
  didatticaUrl: string | null;
  serviziUrl: string | null;
  finanzaUrl: string | null;
  ptofUrl: string | null;
  ravUrl: string | null;
  rendicontazioneSocialeUrl: string | null;
  ediliziaUrl: string | null;
  ponUrl: string | null;
}

export interface Availability {
  hasDidattica: boolean;
  hasServizi: boolean;
  hasFinanza: boolean;
  hasPtof: boolean;
  hasRav: boolean;
  hasRendicontazioneSociale: boolean;
  hasEdilizia: boolean;
  hasPon: boolean;
}

export interface ServicesSummary {
  hasDigitalLabs: boolean;
  digitalDeviceCount: number | null;
  connectivityPoints: number | null;
  hasInnovativeLearningSpaces: boolean;
  serviceNotes: string[];
}

export interface FinanceSummary {
  hasFinanceCharts: boolean;
  financeNotes: string[];
}

export interface DocumentsSummary {
  hasRav: boolean;
  hasPtof: boolean;
  hasRendicontazioneSociale: boolean;
}

export interface DataQuality {
  officiallyMatched: boolean;
  matchMethod: string;
  missingFields: string[];
}

// ---- Stats / summary types ------------------------------------------------

export interface TopSchoolType {
  slug: string;
  label: string;
  schoolCount: number;
}

export interface SchoolTypeStats {
  slug: string;
  label: string;
  schoolCount: number;
}

// ---- Site configuration ---------------------------------------------------

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultLocale: string;
  tagline: string;
  country: string;
  language: string;
  launchState: string;
  lastDataRefreshAt: string;
  contactEmail: string;
  primarySourceLabel: string;
  primarySourceUrl: string;
}

// ---- Region ---------------------------------------------------------------

export interface Region {
  slug: string;
  name: string;
  code: string;
  publishedAt: string | null;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  provinceCount: number;
  publishedProvinceCount: number;
  publishedCityCount: number;
  publishedSchoolCount: number;
  topSchoolTypes: TopSchoolType[];
  featuredProvinceSlugs: string[];
  sourceUrls: string[];
}

export type RegionIndex = Region[];

// ---- Province -------------------------------------------------------------

export interface Province {
  slug: string;
  name: string;
  displayName: string;
  sigla: string;
  regionSlug: string;
  publishedAt: string | null;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  schoolCount: number;
  publishedCityCount: number;
  featuredCitySlugs: string[];
  topSchoolTypes: TopSchoolType[];
  comparePresetSlugs: string[];
  sourceUrls: string[];
}

export type ProvinceIndex = Province[];

// ---- City -----------------------------------------------------------------

export interface City {
  slug: string;
  name: string;
  provinceSlug: string;
  provinceName: string;
  regionSlug: string;
  regionName: string;
  publishedAt: string | null;
  isPublishable: boolean;
  publishabilityReason: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  schoolCount: number;
  schoolTypeCount: number;
  hasMap: boolean;
  center: Coordinates;
  schoolTypeStats: SchoolTypeStats[];
  featuredSchoolCodes: string[];
  comparePresetSlugs: string[];
  sourceUrls: string[];
}

export type CityIndex = City[];

// ---- School type ----------------------------------------------------------

export interface SchoolType {
  slug: string;
  label: string;
  schoolLevelGroup: string;
  publishedAt: string | null;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  schoolCount: number;
  featuredRegionSlugs: string[];
  featuredCitySlugs: string[];
  sourceUrls: string[];
}

export type SchoolTypeIndex = SchoolType[];

// ---- School (full detail) -------------------------------------------------

export interface School {
  schoolCode: string;
  slug: string;
  name: string;
  canonicalName: string;
  schoolLevelGroup: string;
  schoolTypeSlug: string;
  schoolTypeLabel: string;
  legalStatus: string;
  publishedAt: string | null;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  regionSlug: string;
  regionName: string;
  provinceSlug: string;
  provinceName: string;
  provinceSigla: string;
  citySlug: string;
  cityName: string;
  address: Address;
  coordinates: Coordinates | null;
  contacts: Contacts;
  source: Source;
  availability: Availability;
  servicesSummary: ServicesSummary | null;
  financeSummary: FinanceSummary | null;
  documentsSummary: DocumentsSummary | null;
  nearbySchoolCodes: string[];
  sameTypeInCitySchoolCodes: string[];
  lastSourceCheckAt: string;
  dataQuality: DataQuality;
}

/** Lightweight school record used in listing / index pages. */
export interface SchoolIndex {
  schoolCode: string;
  slug: string;
  name: string;
  schoolTypeSlug: string;
  schoolTypeLabel: string;
  citySlug: string;
  cityName: string;
  provinceSlug: string;
  provinceSigla: string;
  publishedAt: string | null;
}

// ---- Compare preset -------------------------------------------------------

export interface ComparePreset {
  slug: string;
  title: string;
  comparisonScope: string;
  citySlug: string;
  schoolTypeSlug: string;
  publishedAt: string | null;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  schoolCodes: string[];
  fields: string[];
  comparisonNotes: string[];
}

export type CompareIndex = ComparePreset[];

// ---- Guide ----------------------------------------------------------------

export interface GuideSection {
  heading: string;
  body: string;
}

export interface Guide {
  slug: string;
  title: string;
  targetKeyword: string;
  publishedAt: string | null;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: GuideSection[];
  sourceUrls: string[];
}

export type GuideIndex = Guide[];

// ---- Static page data (about, privacy, etc.) ------------------------------

export interface PageData {
  slug: string;
  title: string;
  publishedAt: string | null;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  body: string;
}
