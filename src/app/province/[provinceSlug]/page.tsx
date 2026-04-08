import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProvinces,
  getProvince,
  getCities,
  getSchoolTypes,
  getComparePresets,
  getSchoolsIndex,
} from "@/lib/data";
import { isPublished, filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import GatedLink from "@/components/GatedLink";
import SchoolTypeCard from "@/components/SchoolTypeCard";
import StatCard from "@/components/StatCard";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

interface PageProps {
  params: Promise<{ provinceSlug: string }>;
}

export async function generateStaticParams() {
  const provinces = getProvinces();
  return filterPublished(provinces).map((p) => ({
    provinceSlug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provinceSlug } = await params;
  const province = getProvince(provinceSlug);

  if (!province || !isPublished(province)) {
    return buildMetadata({
      title: "Provincia non trovata | Scuolario",
      description: "La provincia richiesta non e stata trovata.",
      path: `/province/${provinceSlug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: province.metaTitle,
    description: province.metaDescription,
    path: `/province/${province.slug}`,
  });
}

function buildFaqItems(provinceName: string) {
  return [
    {
      question: `Quante scuole ci sono nella provincia di ${provinceName}?`,
      answer: `Il numero di scuole nella provincia di ${provinceName} e consultabile nella sezione statistiche di questa pagina. I dati includono scuole pubbliche e paritarie di ogni ordine e grado, aggiornati con le informazioni ufficiali del Ministero dell'Istruzione.`,
    },
    {
      question: `Come trovo le scuole di un comune specifico in provincia di ${provinceName}?`,
      answer: `Scorri la tabella dei comuni sottostante per trovare il comune di tuo interesse. Per ogni comune sono indicate le scuole pubblicate e le tipologie principali. Clicca sul nome del comune per accedere alla pagina dedicata con l'elenco completo.`,
    },
    {
      question: `Quali sono le tipologie di scuole piu diffuse in provincia di ${provinceName}?`,
      answer: `Nella sezione "Distribuzione per tipologia" trovi la ripartizione delle scuole per tipo (infanzia, primaria, secondaria di primo e secondo grado, licei, istituti tecnici, ecc.). La tipologia piu comune e indicata anche nelle statistiche in evidenza.`,
    },
    {
      question: `Posso confrontare le scuole della provincia di ${provinceName}?`,
      answer: `Si, sono disponibili confronti predefiniti tra scuole della stessa tipologia e dello stesso comune. Consulta la sezione "Confronti disponibili" in fondo a questa pagina per accedere alle pagine di confronto.`,
    },
  ];
}

export default async function ProvinceDetailPage({ params }: PageProps) {
  const { provinceSlug } = await params;
  const province = getProvince(provinceSlug);

  if (!province || !isPublished(province)) {
    notFound();
  }

  // Load related data
  const allCities = getCities();
  const provinceCities = allCities.filter(
    (c) => c.provinceSlug === provinceSlug,
  );
  const publishedCities = filterPublished(provinceCities);

  const allSchoolTypes = getSchoolTypes();
  const publishedSchoolTypes = filterPublished(allSchoolTypes);

  // Load compare presets related to this province
  const allComparePresets = getComparePresets();
  const provinceComparePresets = filterPublished(
    allComparePresets.filter((cp) => {
      // Match presets whose cities belong to this province
      const presetCity = allCities.find((c) => c.slug === cp.citySlug);
      return presetCity?.provinceSlug === provinceSlug;
    }),
  );

  // Get schools index for featured schools
  const schoolsIndex = getSchoolsIndex();
  const provinceSchools = schoolsIndex.filter(
    (s) => s.provinceSlug === provinceSlug && s.publishedAt !== null,
  );

  // Build page data
  const pagePath = `/province/${province.slug}`;
  const faqItems = buildFaqItems(province.name);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Province", href: "/province" },
    { label: province.name },
  ];

  const breadcrumbLd = [
    { name: "Home", url: "/" },
    { name: "Province", url: "/province" },
    { name: province.name, url: pagePath },
  ];

  // Determine top school type
  const topType =
    province.topSchoolTypes && province.topSchoolTypes.length > 0
      ? province.topSchoolTypes.sort(
          (a, b) => b.schoolCount - a.schoolCount,
        )[0].label
      : "N/D";

  // Build city school type summary for the table
  function getCityTopTypes(city: typeof provinceCities[0]): string {
    if (city.schoolTypeStats && city.schoolTypeStats.length > 0) {
      return city.schoolTypeStats
        .sort((a, b) => b.schoolCount - a.schoolCount)
        .slice(0, 3)
        .map((t) => t.label)
        .join(", ");
    }
    return "-";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD structured data */}
        <JsonLd
          data={collectionPageSchema(
            province.h1,
            province.metaDescription,
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
            {province.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Esplora le scuole della provincia di {province.name} ({province.sigla}).
            Naviga tra i comuni per trovare istituti scolastici di ogni ordine e
            grado, con dati ufficiali e aggiornati dal Ministero
            dell&apos;Istruzione.
          </p>
        </div>

        {/* Summary stat cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            value={formatNumber(publishedCities.length)}
            label="Comuni pubblicati"
          />
          <StatCard
            value={formatNumber(province.schoolCount)}
            label="Scuole censite"
          />
          <StatCard value={topType} label="Tipologia principale" />
          <StatCard
            value={formatNumber(provinceComparePresets.length)}
            label="Confronti disponibili"
          />
        </div>

        {/* Ad slot below summary */}
        <AdSlot slot="province-detail-top" className="mt-8" />

        {/* Trust note */}
        <div className="mt-4">
          <TrustNote />
        </div>

        {/* City table */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            Comuni della provincia di {province.name}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {provinceCities.length}{" "}
            {provinceCities.length === 1 ? "comune" : "comuni"} nella
            provincia, di cui {publishedCities.length} con dati pubblicati.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 pr-4 font-semibold text-text">Comune</th>
                  <th className="pb-3 pr-4 font-semibold text-text text-right">
                    Scuole pubblicate
                  </th>
                  <th className="hidden pb-3 pr-4 font-semibold text-text sm:table-cell">
                    Tipologie principali
                  </th>
                  <th className="pb-3 font-semibold text-text text-right">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {provinceCities
                  .sort((a, b) => a.name.localeCompare(b.name, "it"))
                  .map((city) => (
                    <tr
                      key={city.slug}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="py-3 pr-4 font-medium text-text">
                        {city.name}
                      </td>
                      <td className="py-3 pr-4 text-text-secondary text-right">
                        {formatNumber(city.schoolCount)}
                      </td>
                      <td className="hidden py-3 pr-4 text-text-secondary sm:table-cell">
                        {getCityTopTypes(city)}
                      </td>
                      <td className="py-3 text-right">
                        <GatedLink
                          href={`/comuni/${city.slug}`}
                          publishedAt={city.publishedAt}
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Vedi scuole
                        </GatedLink>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Featured schools strip */}
        {provinceSchools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">
              Scuole in evidenza in provincia di {province.name}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Alcune delle scuole piu consultate nella provincia.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {provinceSchools.slice(0, 6).map((school) => (
                <GatedLink
                  key={school.schoolCode}
                  href={`/scuole/${school.schoolCode}`}
                  publishedAt={school.publishedAt}
                  className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                    {school.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-secondary">
                    <span>{school.schoolTypeLabel}</span>
                    <span>{school.cityName}</span>
                  </div>
                </GatedLink>
              ))}
            </div>
          </section>
        )}

        {/* School type breakdown */}
        {province.topSchoolTypes && province.topSchoolTypes.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">
              Distribuzione per tipologia in provincia di {province.name}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Le tipologie di scuole presenti nella provincia.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {province.topSchoolTypes
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

        {/* Related compare pages */}
        {provinceComparePresets.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">
              Confronti disponibili in provincia di {province.name}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Confronta le scuole della stessa tipologia nello stesso comune.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {provinceComparePresets.slice(0, 8).map((preset) => (
                <GatedLink
                  key={preset.slug}
                  href={`/confronta/${preset.slug}`}
                  publishedAt={preset.publishedAt}
                  className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-primary transition-colors"
                >
                  {preset.title}
                </GatedLink>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-text">
            Domande frequenti sulla provincia di {province.name}
          </h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </section>
    </div>
  );
}
