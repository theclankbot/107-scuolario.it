// ---------------------------------------------------------------------------
// Scuolario -- SEO metadata helper
// ---------------------------------------------------------------------------
// Builds Next.js `Metadata` objects with canonical URLs, Open Graph tags,
// and Italian locale settings.
// ---------------------------------------------------------------------------

import type { Metadata } from "next";

const BASE_URL = "https://scuolario.it";
const SITE_NAME = "Scuolario";
const DEFAULT_LOCALE = "it_IT";

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  noindex?: boolean;
}

/**
 * Build a `Metadata` object suitable for Next.js `generateMetadata` or
 * static `export const metadata`.
 *
 * ```ts
 * export function generateMetadata() {
 *   return buildMetadata({
 *     title: "Scuole a Roma",
 *     description: "Trova tutte le scuole di Roma...",
 *     path: "/citta/roma",
 *   });
 * }
 * ```
 */
export function buildMetadata({
  title,
  description,
  path: pagePath,
  ogType = "website",
  noindex = false,
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = `${BASE_URL}${pagePath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
