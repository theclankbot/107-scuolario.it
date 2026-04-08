import type { Metadata } from "next";
import { getProvinces, getRegions } from "@/lib/data";
import { filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import ProvinceCard from "@/components/ProvinceCard";
import StatCard from "@/components/StatCard";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

const PAGE_PATH = "/province";
const PAGE_TITLE = "Province italiane: trova scuole per provincia";
const PAGE_DESCRIPTION =
  "Esplora tutte le province d'Italia per trovare scuole pubbliche e paritarie. Cerca per sigla o nome della provincia e accedi ai dati ufficiali delle scuole dal Ministero dell'Istruzione.";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `${PAGE_TITLE} | Scuolario`,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Province" },
];

const breadcrumbLd = [
  { name: "Home", url: "/" },
  { name: "Province", url: PAGE_PATH },
];

const faqItems = [
  {
    question: "Quante province ci sono in Italia?",
    answer:
      "L'Italia conta oltre 100 province e citta metropolitane, distribuite nelle 20 regioni. Ogni provincia raggruppa diversi comuni e offre scuole di ogni ordine e grado, dalla scuola dell'infanzia alla secondaria di secondo grado.",
  },
  {
    question: "Qual e la differenza tra provincia e citta metropolitana?",
    answer:
      "Le citta metropolitane sono un ente territoriale che ha sostituito alcune province nei principali centri urbani (Roma, Milano, Napoli, Torino, ecc.). Su Scuolario, le citta metropolitane sono trattate come province per facilitare la navigazione.",
  },
  {
    question: "Come trovo le scuole della mia provincia?",
    answer:
      "Cerca la tua provincia nella griglia sottostante, oppure usa la sigla automobilistica (es. MI per Milano, RM per Roma). Cliccando sulla provincia accederai all'elenco dei comuni e delle scuole disponibili.",
  },
  {
    question: "Posso confrontare scuole di province diverse?",
    answer:
      "Si, Scuolario permette di confrontare scuole anche tra province e regioni diverse. Visita la sezione Confronta per accedere ai confronti predefiniti o crearne di personalizzati.",
  },
];

export default function ProvincePage() {
  const allProvinces = getProvinces();
  const publishedProvinces = filterPublished(allProvinces);
  const allRegions = getRegions();

  const totalSchools = allProvinces.reduce(
    (sum, p) => sum + (p.schoolCount ?? 0),
    0,
  );
  const totalCities = allProvinces.reduce(
    (sum, p) => sum + (p.publishedCityCount ?? 0),
    0,
  );

  // Group provinces by region for organized display
  const regionMap = new Map<string, typeof allProvinces>();
  for (const province of allProvinces) {
    const existing = regionMap.get(province.regionSlug) ?? [];
    existing.push(province);
    regionMap.set(province.regionSlug, existing);
  }

  // Sort region keys alphabetically by region name
  const sortedRegionEntries = Array.from(regionMap.entries()).sort(
    (a, b) => {
      const regionA = allRegions.find((r) => r.slug === a[0]);
      const regionB = allRegions.find((r) => r.slug === b[0]);
      return (regionA?.name ?? a[0]).localeCompare(regionB?.name ?? b[0], "it");
    },
  );

  // Featured provinces: top by school count
  const featuredProvinces = publishedProvinces
    .sort((a, b) => b.schoolCount - a.schoolCount)
    .slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD structured data */}
        <JsonLd
          data={collectionPageSchema(PAGE_TITLE, PAGE_DESCRIPTION, PAGE_PATH)}
        />
        <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
        <JsonLd data={faqSchema(faqItems)} />

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page header */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {PAGE_TITLE}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Cerca tra tutte le province italiane per trovare scuole pubbliche e
            paritarie nella tua zona. Ogni provincia offre una panoramica dei
            comuni, delle scuole e delle tipologie di istituti presenti nel
            territorio, con dati ufficiali dal Ministero dell&apos;Istruzione.
          </p>
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            value={formatNumber(allProvinces.length)}
            label="Province totali"
          />
          <StatCard
            value={formatNumber(publishedProvinces.length)}
            label="Province pubblicate"
          />
          <StatCard
            value={formatNumber(totalCities)}
            label="Comuni con scuole"
          />
          <StatCard
            value={formatNumber(totalSchools)}
            label="Scuole censite"
          />
        </div>

        {/* Trust note */}
        <div className="mt-4">
          <TrustNote />
        </div>

        {/* Featured provinces */}
        {featuredProvinces.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">
              Province in evidenza
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Le province con il maggior numero di scuole censite.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredProvinces.map((province) => (
                <ProvinceCard key={province.slug} province={province} />
              ))}
            </div>
          </section>
        )}

        {/* All provinces grouped by region */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            Tutte le province per regione
          </h2>
          <div className="mt-6 space-y-10">
            {sortedRegionEntries.map(([regionSlug, provinces]) => {
              const region = allRegions.find((r) => r.slug === regionSlug);
              const regionName = region?.name ?? regionSlug;
              const sortedProvinces = provinces.sort((a, b) =>
                a.name.localeCompare(b.name, "it"),
              );

              return (
                <div key={regionSlug}>
                  <h3 className="text-lg font-semibold text-text border-b border-border pb-2">
                    {regionName}
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {sortedProvinces.map((province) => (
                      <ProvinceCard
                        key={province.slug}
                        province={province}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-text">
            Domande frequenti sulle province italiane
          </h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </section>
    </div>
  );
}
