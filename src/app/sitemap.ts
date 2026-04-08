import type { MetadataRoute } from "next";
import {
  getRegions,
  getProvinces,
  getCities,
  getSchoolTypes,
  getSchoolsIndex,
  getComparePresets,
  getGuides,
} from "@/lib/data";
import { filterPublished } from "@/lib/publication";

const BASE = "https://scuolario.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/regioni`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/province`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/comuni`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/tipologie`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/confronta`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/data-sources`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...filterPublished(getRegions()).map((r) => ({
      url: `${BASE}/regioni/${r.slug}`,
      lastModified: r.publishedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...filterPublished(getProvinces()).map((p) => ({
      url: `${BASE}/province/${p.slug}`,
      lastModified: p.publishedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...filterPublished(getCities()).map((c) => ({
      url: `${BASE}/comuni/${c.slug}`,
      lastModified: c.publishedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...filterPublished(getSchoolTypes()).map((t) => ({
      url: `${BASE}/tipologie/${t.slug}`,
      lastModified: t.publishedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...filterPublished(getSchoolsIndex()).map((s) => ({
      url: `${BASE}/scuole/${s.schoolCode}`,
      lastModified: s.publishedAt || now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...filterPublished(getComparePresets()).map((c) => ({
      url: `${BASE}/confronta/${c.slug}`,
      lastModified: c.publishedAt || now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...filterPublished(getGuides()).map((g) => ({
      url: `${BASE}/guide/${g.slug}`,
      lastModified: g.publishedAt || now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
