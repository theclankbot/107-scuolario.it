import type { Metadata } from "next";
import { getCities, getRegions, getProvinces } from "@/lib/data";
import { filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import CityCard from "@/components/CityCard";
import SearchBar from "@/components/SearchBar";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Comuni italiani con scuole | Scuolario",
    description:
      "Esplora l'elenco completo dei comuni italiani con scuole pubblicate su Scuolario. Trova scuole citta per citta, filtra per regione e provincia.",
    path: "/comuni",
  });
}

export default function ComuniPage() {
  const allCities = getCities();
  const publishedCities = filterPublished(allCities);
  const regions = getRegions();
  const provinces = getProvinces();

  // Build lookup maps for display
  const regionMap = new Map(regions.map((r) => [r.slug, r.name]));
  const provinceMap = new Map(provinces.map((p) => [p.slug, p.name]));

  // Collect unique regions and provinces from all tracked cities for filter display
  const cityRegions = Array.from(
    new Set(allCities.map((c) => c.regionSlug))
  )
    .map((slug) => ({ slug, name: regionMap.get(slug) ?? slug }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const cityProvinces = Array.from(
    new Set(allCities.map((c) => c.provinceSlug))
  )
    .map((slug) => ({ slug, name: provinceMap.get(slug) ?? slug }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Sort cities alphabetically
  const sortedCities = [...allCities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Comuni", url: "/comuni" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* JSON-LD */}
          <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
          <JsonLd
            data={collectionPageSchema(
              "Comuni italiani con scuole",
              "Elenco completo dei comuni italiani con pagine scuole pubblicate su Scuolario.",
              "/comuni"
            )}
          />

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Comuni" },
            ]}
          />

          {/* Header section */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Comuni pubblicati: trova scuole citta per citta
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">
              Sfoglia i comuni italiani per trovare le scuole della tua citta.
              Puoi filtrare per regione o provincia per restringere la ricerca.
            </p>
          </div>

          {/* Search + filters */}
          <div className="mt-8 space-y-4">
            <SearchBar placeholder="Cerca un comune..." />

            <div className="flex flex-wrap items-center gap-3">
              {/* Region filter display */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-text-secondary">
                  Regioni:
                </span>
                <span className="text-sm text-muted">
                  {formatNumber(cityRegions.length)} disponibili
                </span>
              </div>

              <span className="text-muted">|</span>

              {/* Province filter display */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-text-secondary">
                  Province:
                </span>
                <span className="text-sm text-muted">
                  {formatNumber(cityProvinces.length)} disponibili
                </span>
              </div>
            </div>
          </div>

          {/* Stats summary */}
          <div className="mt-6 rounded-lg border border-border bg-surface px-5 py-4">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-primary">
                {formatNumber(publishedCities.length)}
              </span>{" "}
              comuni pubblicati su{" "}
              <span className="font-semibold">
                {formatNumber(allCities.length)}
              </span>{" "}
              monitorati
            </p>
          </div>

          <AdSlot slot="comuni-top" className="mt-8" />

          {/* City card grid */}
          <section className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sortedCities.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>

            {sortedCities.length === 0 && (
              <p className="py-12 text-center text-sm text-muted">
                Nessun comune monitorato al momento.
              </p>
            )}
          </section>

          <AdSlot slot="comuni-bottom" className="mt-8" />

          {/* Thin-content note */}
          <div className="mt-8 rounded-lg border border-border bg-surface px-5 py-4">
            <p className="text-xs leading-relaxed text-muted">
              Vengono mostrati solo i comuni con pagine pubblicate con almeno 3
              scuole o copertura sufficiente come pagine complete. In questa
              directory mostriamo anche i comuni non ancora pubblicati con stato
              &ldquo;Prossimamente&rdquo;, cosi puoi vedere quali territori sono gia
              monitorati e quali arriveranno a breve.
            </p>
          </div>
    </div>
  );
}
