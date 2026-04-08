import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegions, getRegion, getProvinces, getCities, getSchoolTypes } from "@/lib/data";
import { isPublished, filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import ProvinceCard from "@/components/ProvinceCard";
import CityCard from "@/components/CityCard";
import SchoolTypeCard from "@/components/SchoolTypeCard";
import StatCard from "@/components/StatCard";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import GatedLink from "@/components/GatedLink";

interface PageProps {
  params: Promise<{ regionSlug: string }>;
}

export async function generateStaticParams() {
  const regions = getRegions();
  return filterPublished(regions).map((r) => ({
    regionSlug: r.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { regionSlug } = await params;
  const region = getRegion(regionSlug);

  if (!region || !isPublished(region)) {
    return buildMetadata({
      title: "Regione non trovata | Scuolario",
      description: "La regione richiesta non e stata trovata.",
      path: `/regioni/${regionSlug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: region.metaTitle,
    description: region.metaDescription,
    path: `/regioni/${region.slug}`,
  });
}

function buildFaqItems(regionName: string) {
  return [
    {
      question: `Quante scuole ci sono in ${regionName}?`,
      answer: `Il numero di scuole in ${regionName} varia in base alle province e ai comuni. Consulta questa pagina per scoprire il totale aggiornato delle scuole pubbliche e paritarie presenti nella regione, suddivise per provincia e tipologia.`,
    },
    {
      question: `Come posso trovare una scuola specifica in ${regionName}?`,
      answer: `Puoi navigare per provincia o per comune utilizzando le sezioni sottostanti. Seleziona la provincia di interesse per visualizzare l'elenco dei comuni e delle scuole disponibili. In alternativa, usa la barra di ricerca per trovare una scuola per nome.`,
    },
    {
      question: `Quali tipologie di scuole sono presenti in ${regionName}?`,
      answer: `In ${regionName} sono presenti scuole di ogni ordine e grado: dall'infanzia alla secondaria di secondo grado, inclusi licei, istituti tecnici e professionali. Consulta la sezione "Distribuzione per tipologia" per una panoramica completa.`,
    },
    {
      question: `I dati delle scuole di ${regionName} sono affidabili?`,
      answer: `Si, tutti i dati provengono da Scuola in Chiaro, il portale ufficiale del Ministero dell'Istruzione e del Merito (MIM). Vengono verificati e aggiornati periodicamente per garantire la massima affidabilita.`,
    },
  ];
}

export default async function RegionDetailPage({ params }: PageProps) {
  const { regionSlug } = await params;
  const region = getRegion(regionSlug);

  if (!region || !isPublished(region)) {
    notFound();
  }

  // Load related data
  const allProvinces = getProvinces();
  const regionProvinces = allProvinces.filter(
    (p) => p.regionSlug === regionSlug,
  );
  const publishedProvinces = filterPublished(regionProvinces);

  const allCities = getCities();
  const regionCities = allCities.filter((c) => c.regionSlug === regionSlug);
  const publishedCities = filterPublished(regionCities);
  const topCities = publishedCities
    .sort((a, b) => b.schoolCount - a.schoolCount)
    .slice(0, 12);

  const allSchoolTypes = getSchoolTypes();
  const publishedSchoolTypes = filterPublished(allSchoolTypes);

  // Build page data
  const pagePath = `/regioni/${region.slug}`;
  const faqItems = buildFaqItems(region.name);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Regioni", href: "/regioni" },
    { label: region.name },
  ];

  const breadcrumbLd = [
    { name: "Home", url: "/" },
    { name: "Regioni", url: "/regioni" },
    { name: region.name, url: pagePath },
  ];

  // Determine top school type labels
  const topTypeLabels =
    region.topSchoolTypes && region.topSchoolTypes.length > 0
      ? region.topSchoolTypes
          .sort((a, b) => b.schoolCount - a.schoolCount)
          .slice(0, 3)
          .map((t) => t.label)
          .join(", ")
      : "N/D";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD structured data */}
        <JsonLd
          data={collectionPageSchema(
            region.h1,
            region.metaDescription,
            pagePath,
          )}
        />
        <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
        <JsonLd data={faqSchema(faqItems)} />

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page header */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {region.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Esplora le scuole della regione {region.name}. Naviga tra province e
            comuni per trovare istituti scolastici di ogni ordine e grado, con
            dati ufficiali e aggiornati dal Ministero dell&apos;Istruzione.
          </p>
        </div>

        {/* Summary stat cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            value={formatNumber(region.publishedProvinceCount)}
            label="Province pubblicate"
          />
          <StatCard
            value={formatNumber(region.publishedCityCount)}
            label="Comuni pubblicati"
          />
          <StatCard
            value={formatNumber(region.publishedSchoolCount)}
            label="Scuole pubblicate"
          />
          <StatCard value={topTypeLabels} label="Tipologie principali" />
        </div>

        {/* Ad slot below summary */}
        <AdSlot slot="region-detail-top" className="mt-8" />

        {/* Trust note */}
        <div className="mt-4">
          <TrustNote />
        </div>

        {/* Province grid */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            Province di {region.name}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {regionProvinces.length}{" "}
            {regionProvinces.length === 1 ? "provincia" : "province"} nella
            regione, di cui {publishedProvinces.length} con dati pubblicati.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {regionProvinces
              .sort((a, b) => a.name.localeCompare(b.name, "it"))
              .map((province) => (
                <ProvinceCard key={province.slug} province={province} />
              ))}
          </div>
        </section>

        {/* Top cities */}
        {topCities.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">
              Principali comuni di {region.name}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              I comuni con il maggior numero di scuole nella regione.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {topCities.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          </section>
        )}

        {/* School type distribution */}
        {region.topSchoolTypes && region.topSchoolTypes.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">
              Distribuzione per tipologia in {region.name}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Le tipologie di scuole piu diffuse nella regione.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {region.topSchoolTypes
                .sort((a, b) => b.schoolCount - a.schoolCount)
                .map((typeStats) => {
                  const fullType = publishedSchoolTypes.find(
                    (t) => t.slug === typeStats.slug,
                  );
                  return (
                    <SchoolTypeCard
                      key={typeStats.slug}
                      type={{
                        slug: typeStats.slug,
                        label: typeStats.label,
                        schoolCount: typeStats.schoolCount,
                        publishedAt: fullType?.publishedAt ?? null,
                      }}
                    />
                  );
                })}
            </div>
          </section>
        )}

        {/* Related compare links */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            Confronta scuole in {region.name}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Scopri i confronti disponibili tra le scuole della regione.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {publishedProvinces.slice(0, 6).map((province) => (
              <GatedLink
                key={province.slug}
                href={`/province/${province.slug}`}
                publishedAt={province.publishedAt}
                className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-primary transition-colors"
              >
                Scuole a {province.name}
              </GatedLink>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-text">
            Domande frequenti su {region.name}
          </h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </section>
    </div>
  );
}
