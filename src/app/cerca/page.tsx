"use client";

import { useSearchParams } from "next/navigation";
import { useState, useCallback, Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import GatedLink from "@/components/GatedLink";

interface SearchResult {
  type: "school" | "city" | "province" | "region" | "type" | "guide";
  label: string;
  sublabel: string;
  href: string;
  publishedAt: string | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function searchIndex(
  query: string,
  schools: any[],
  cities: any[],
  provinces: any[],
  regions: any[],
  types: any[],
  guides: any[],
): SearchResult[] {
  const matched: SearchResult[] = [];

  for (const s of schools) {
    if (
      s.name?.toLowerCase().includes(query) ||
      s.schoolCode?.toLowerCase().includes(query)
    ) {
      matched.push({
        type: "school",
        label: s.name,
        sublabel: `${s.schoolTypeLabel} — ${s.cityName} (${s.provinceSigla})`,
        href: `/scuole/${s.schoolCode}`,
        publishedAt: s.publishedAt,
      });
    }
    if (matched.length >= 50) break;
  }

  for (const c of cities) {
    if (c.name?.toLowerCase().includes(query)) {
      matched.push({
        type: "city",
        label: c.name,
        sublabel: `Comune — ${c.schoolCount ?? 0} scuole`,
        href: `/comuni/${c.slug}`,
        publishedAt: c.publishedAt,
      });
    }
  }

  for (const p of provinces) {
    if (
      p.name?.toLowerCase().includes(query) ||
      p.sigla?.toLowerCase() === query
    ) {
      matched.push({
        type: "province",
        label: p.name,
        sublabel: `Provincia (${p.sigla})`,
        href: `/province/${p.slug}`,
        publishedAt: p.publishedAt,
      });
    }
  }

  for (const r of regions) {
    if (r.name?.toLowerCase().includes(query)) {
      matched.push({
        type: "region",
        label: r.name,
        sublabel: "Regione",
        href: `/regioni/${r.slug}`,
        publishedAt: r.publishedAt,
      });
    }
  }

  for (const t of types) {
    if (t.label?.toLowerCase().includes(query)) {
      matched.push({
        type: "type",
        label: t.label,
        sublabel: "Tipologia scolastica",
        href: `/tipologie/${t.slug}`,
        publishedAt: t.publishedAt,
      });
    }
  }

  for (const g of guides) {
    if (g.title?.toLowerCase().includes(query)) {
      matched.push({
        type: "guide",
        label: g.title,
        sublabel: "Guida",
        href: `/guide/${g.slug}`,
        publishedAt: g.publishedAt,
      });
    }
  }

  return matched;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const TYPE_LABELS: Record<string, string> = {
  school: "Scuola",
  city: "Comune",
  province: "Provincia",
  region: "Regione",
  type: "Tipologia",
  guide: "Guida",
};

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    try {
      const [schools, cities, provinces, regions, types, guides] =
        await Promise.all([
          fetch("/data/schools/index.json").then((r) => r.json()),
          fetch("/data/cities/index.json").then((r) => r.json()),
          fetch("/data/provinces/index.json").then((r) => r.json()),
          fetch("/data/regions/index.json").then((r) => r.json()),
          fetch("/data/school-types/index.json").then((r) => r.json()),
          fetch("/data/guides/index.json").then((r) => r.json()),
        ]);

      const matched = searchIndex(
        query.toLowerCase().trim(),
        schools,
        cities,
        provinces,
        regions,
        types,
        guides,
      );
      setResults(matched);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  // Trigger search on mount when query param is present
  if (q && !searched && !loading) {
    doSearch(q);
  }

  return (
    <div className="mt-8">
      {q && searched && !loading && (
        <p className="text-sm text-text-secondary mb-4">
          {results.length === 0
            ? `Nessun risultato per "${q}"`
            : `${results.length} risultat${results.length === 1 ? "o" : "i"} per "${q}"`}
        </p>
      )}

      {loading && (
        <p className="text-sm text-muted">Ricerca in corso...</p>
      )}

      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((r, i) => (
            <li key={`${r.type}-${r.href}-${i}`}>
              <GatedLink
                href={r.href}
                publishedAt={r.publishedAt}
                className="block rounded-lg border border-border bg-surface p-4 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex shrink-0 items-center rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {TYPE_LABELS[r.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-text truncate">{r.label}</p>
                    <p className="text-sm text-text-secondary truncate">
                      {r.sublabel}
                    </p>
                  </div>
                </div>
              </GatedLink>
            </li>
          ))}
        </ul>
      )}

      {!q && (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-lg font-medium text-text">
            Cerca scuole, comuni, province e altro
          </p>
          <p className="mt-2 text-sm">
            Inserisci il nome di una scuola, un codice meccanografico, un comune
            o una provincia per iniziare.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CercaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Cerca" }]}
      />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
        Cerca
      </h1>

      <div className="mt-6">
        <SearchBar placeholder="Cerca scuola, codice meccanografico, città o provincia" />
      </div>

      <Suspense fallback={<p className="mt-8 text-sm text-muted">Caricamento...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
