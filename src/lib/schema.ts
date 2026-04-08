// ---------------------------------------------------------------------------
// Scuolario -- JSON-LD structured data helpers
// ---------------------------------------------------------------------------
// Each function returns a plain object representing a JSON-LD graph node.
// Render them inside a <script type="application/ld+json"> tag, e.g.:
//
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
//   />
// ---------------------------------------------------------------------------

import type { School } from "@/lib/types";

const BASE_URL = "https://scuolario.it";

// ---- WebSite + SearchAction (home page) -----------------------------------

export function websiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Scuolario",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/cerca?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ---- BreadcrumbList -------------------------------------------------------

export function breadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

// ---- CollectionPage -------------------------------------------------------

export function collectionPageSchema(
  name: string,
  description: string,
  url: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
  };
}

// ---- EducationalOrganization (School) -------------------------------------

export function schoolSchema(school: School): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.canonicalName,
    url: `${BASE_URL}/scuole/${school.schoolCode}`,
    identifier: school.schoolCode,
  };

  // Address
  if (school.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: school.address.street,
      postalCode: school.address.postalCode,
      addressLocality: school.address.city,
      addressRegion: school.provinceName,
      addressCountry: "IT",
    };
  }

  // Coordinates
  if (school.coordinates) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: school.coordinates.lat,
      longitude: school.coordinates.lng,
    };
  }

  // Contact points
  if (school.contacts) {
    if (school.contacts.phone) {
      schema.telephone = school.contacts.phone;
    }
    if (school.contacts.email) {
      schema.email = school.contacts.email;
    }
    if (school.contacts.websiteUrl) {
      schema.sameAs = school.contacts.websiteUrl;
    }
  }

  return schema;
}

// ---- FAQPage --------------------------------------------------------------

export function faqSchema(
  items: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ---- WebPage --------------------------------------------------------------

export function webPageSchema(
  name: string,
  description: string,
  url: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
    inLanguage: "it",
    isPartOf: {
      "@type": "WebSite",
      name: "Scuolario",
      url: BASE_URL,
    },
  };
}
