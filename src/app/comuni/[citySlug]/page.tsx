import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCities,
  getCity,
  getSchoolsByCity,
  getComparePresets,
  getProvince,
  getRegion,
  getSchoolTypes,
} from "@/lib/data";
import { isPublished, filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
} from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import SchoolCard from "@/components/SchoolCard";
import StatCard from "@/components/StatCard";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import GatedLink from "@/components/GatedLink";

// ---------------------------------------------------------------------------
// Static params -- only published cities
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const cities = getCities();
  const published = filterPublished(cities);
  return published.map((city) => ({ citySlug: city.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCity(citySlug);

  if (!city || !isPublished(city)) {
    return buildMetadata({
      title: "Comune non trovato | Scuolario",
      description: "Il comune richiesto non e stato trovato.",
      path: `/comuni/${citySlug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/comuni/${citySlug}`,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;

  // Load city data
  const city = getCity(citySlug);
  if (!city || !isPublished(city)) {
    notFound();
  }

  const province = getProvince(city.provinceSlug);
  const region = getRegion(city.regionSlug);
  const schoolTypes = getSchoolTypes();

  // Load schools for this city
  const schools = getSchoolsByCity(citySlug);

  // Compute summary stats
  const totalSchools = schools.length;
  const uniqueTypes = new Set(schools.map((s) => s.schoolTypeSlug));
  const schoolTypeCount = uniqueTypes.size;
  const stataliCount = schools.filter(
    (s) => s.legalStatus === "statale"
  ).length;
  const paritarieCount = schools.filter(
    (s) => s.legalStatus === "paritaria"
  ).length;

  // School type distribution
  const typeDistribution = new Map<
    string,
    { label: string; count: number }
  >();
  for (const school of schools) {
    const existing = typeDistribution.get(school.schoolTypeSlug);
    if (existing) {
      existing.count += 1;
    } else {
      typeDistribution.set(school.schoolTypeSlug, {
        label: school.schoolTypeLabel,
        count: 1,
      });
    }
  }
  const sortedTypes = Array.from(typeDistribution.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([slug, data]) => ({ slug, ...data }));

  // Compare presets for this city
  const allPresets = getComparePresets();
  const cityPresets = city.comparePresetSlugs
    ? allPresets.filter((p) => city.comparePresetSlugs.includes(p.slug))
    : [];

  const provinceSchoolShare = province?.schoolCount
    ? ((totalSchools / province.schoolCount) * 100).toFixed(1)
    : null;

  const regionSchoolShare = region?.publishedSchoolCount
    ? ((totalSchools / region.publishedSchoolCount) * 100).toFixed(1)
    : null;

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Regioni", url: "/regioni" },
    { name: city.regionName, url: `/regioni/${city.regionSlug}` },
    { name: "Province", url: "/province" },
    { name: city.provinceName, url: `/province/${city.provinceSlug}` },
    { name: city.name, url: `/comuni/${city.slug}` },
  ];

  // FAQ items
  const faqItems = [
    {
      question: `Quante scuole ci sono a ${city.name}?`,
      answer: `A ${city.name} sono presenti ${formatNumber(totalSchools)} scuole tra statali e paritarie, distribuite in ${formatNumber(schoolTypeCount)} diverse tipologie scolastiche. I dati provengono dal portale Scuola in Chiaro del Ministero dell'Istruzione e del Merito.`,
    },
    {
      question: `Quali tipologie di scuole si trovano a ${city.name}?`,
      answer: `Le scuole di ${city.name} comprendono ${sortedTypes.map((t) => t.label).join(", ")}. Ogni tipologia offre percorsi formativi specifici, dalle scuole dell'infanzia fino alle scuole secondarie di secondo grado.`,
    },
    {
      question: `Come posso trovare una scuola specifica a ${city.name}?`,
      answer: `Puoi scorrere l'elenco completo delle scuole di ${city.name} in questa pagina. Ogni scheda mostra nome, tipologia, indirizzo e contatti. Cliccando sulla scheda accedi alla pagina di dettaglio con tutte le informazioni disponibili.`,
    },
    {
      question: `I dati sulle scuole di ${city.name} sono aggiornati?`,
      answer: `I dati delle scuole di ${city.name} sono estratti dal portale ufficiale Scuola in Chiaro del MIM e vengono verificati periodicamente. Per ogni scuola e indicata la fonte ufficiale con link diretto al portale ministeriale.`,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* JSON-LD */}
          <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
          <JsonLd
            data={collectionPageSchema(
              city.h1,
              city.metaDescription,
              `/comuni/${city.slug}`
            )}
          />
          <JsonLd data={faqSchema(faqItems)} />

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Regioni", href: "/regioni" },
              { label: city.regionName, href: `/regioni/${city.regionSlug}` },
              { label: "Province", href: "/province" },
              {
                label: city.provinceName,
                href: `/province/${city.provinceSlug}`,
              },
              { label: city.name },
            ]}
          />

          {/* H1 */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {city.h1}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">
              Elenco completo delle scuole di {city.name} ({city.provinceName}).
              Consulta tipologia, indirizzo e contatti di ogni istituto
              scolastico.
            </p>
          </div>

          {/* Summary StatCards */}
          <section className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                value={formatNumber(totalSchools)}
                label="Scuole totali"
              />
              <StatCard
                value={formatNumber(schoolTypeCount)}
                label="Tipologie scolastiche"
              />
              <StatCard
                value={formatNumber(stataliCount)}
                label="Scuole statali"
              />
              <StatCard
                value={formatNumber(paritarieCount)}
                label="Scuole paritarie"
              />
            </div>
          </section>

          {(province || region) && (
            <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-bold text-text">Contesto territoriale</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {province && (
                  <div className="rounded-xl border border-border bg-bg p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                      Provincia di {province.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {city.name} raccoglie {formatNumber(totalSchools)} scuole su circa {formatNumber(province.schoolCount)} censite nella provincia.
                      {provinceSchoolShare ? ` Questo equivale a circa il ${provinceSchoolShare}% del totale provinciale.` : ""}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Nella directory provinciale risultano {formatNumber(province.publishedCityCount ?? 0)} comuni gia pubblicati e {sortedTypes.length} tipologie attive in questa pagina comunale.
                    </p>
                  </div>
                )}
                {region && (
                  <div className="rounded-xl border border-border bg-bg p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                      Regione {region.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      La regione conta circa {formatNumber(region.publishedSchoolCount ?? 0)} scuole pubblicate e {formatNumber(region.publishedCityCount ?? 0)} comuni gia visibili su Scuolario.
                      {regionSchoolShare ? ` Le scuole di ${city.name} rappresentano circa il ${regionSchoolShare}% delle schede regionali pubblicate.` : ""}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Questa pagina aiuta a capire rapidamente se il comune offre una scelta ampia o piu mirata rispetto al resto del territorio regionale.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          <AdSlot slot="city-detail-top" className="mt-8" />

          {/* School type distribution */}
          {sortedTypes.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-text">
                Distribuzione per tipologia
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Le {formatNumber(totalSchools)} scuole di {city.name} sono
                distribuite nelle seguenti tipologie:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sortedTypes.map((type) => (
                  <div
                    key={type.slug}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
                  >
                    <GatedLink
                      href={`/tipologie/${type.slug}`}
                      publishedAt={schoolTypes.find((schoolType) => schoolType.slug === type.slug)?.publishedAt ?? null}
                      className="text-sm font-medium text-text hover:text-primary transition-colors"
                    >
                      {type.label}
                    </GatedLink>
                    <span className="text-sm font-semibold text-primary">
                      {formatNumber(type.count)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <AdSlot slot="city-detail-mid" className="mt-8" />

          {/* School listing */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-text">
              Tutte le scuole di {city.name}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {formatNumber(totalSchools)} scuole trovate. Ogni scheda mostra
              nome, tipologia, indirizzo, contatti e fonte ufficiale.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {schools.map((school) => (
                <SchoolCard key={school.schoolCode} school={school} />
              ))}
            </div>
            {schools.length === 0 && (
              <p className="py-12 text-center text-sm text-muted">
                Nessuna scuola trovata per questo comune.
              </p>
            )}
          </section>

          <AdSlot slot="city-detail-schools" className="mt-8" />

          {/* Compare CTA rail */}
          {cityPresets.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-text">
                Confronta scuole a {city.name}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Confronti preimpostati per le scuole di {city.name}. Scopri le
                differenze tra istituti della stessa citta.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cityPresets.map((preset) => (
                  <GatedLink
                    key={preset.slug}
                    href={`/confronta/${preset.slug}`}
                    publishedAt={preset.publishedAt}
                    className="rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-sm font-semibold text-text">
                      {preset.title}
                    </h3>
                    <p className="mt-1 text-xs text-text-secondary">
                      {preset.schoolCodes.length} scuole a confronto
                    </p>
                  </GatedLink>
                ))}
              </div>
            </section>
          )}

          {/* Nearby / Related links */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-text">
              Esplora la zona
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <GatedLink
                href={`/province/${city.provinceSlug}`}
                publishedAt={province?.publishedAt ?? null}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text hover:text-primary hover:border-primary transition-colors"
              >
                Provincia di {city.provinceName}
              </GatedLink>
              <GatedLink
                href={`/regioni/${city.regionSlug}`}
                publishedAt={region?.publishedAt ?? null}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text hover:text-primary hover:border-primary transition-colors"
              >
                {city.regionName}
              </GatedLink>
              {sortedTypes.slice(0, 4).map((type) => (
                <GatedLink
                  key={type.slug}
                  href={`/tipologie/${type.slug}`}
                  publishedAt={schoolTypes.find((schoolType) => schoolType.slug === type.slug)?.publishedAt ?? null}
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text hover:text-primary hover:border-primary transition-colors"
                >
                  {type.label}
                </GatedLink>
              ))}
            </div>
          </section>

          <AdSlot slot="city-detail-bottom" className="mt-8" />

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-text">
              Domande frequenti sulle scuole di {city.name}
            </h2>
            <div className="mt-4">
              <FAQ items={faqItems} />
            </div>
          </section>

          {/* Trust note */}
          <div className="mt-10 border-t border-border pt-6">
            <TrustNote />
          </div>
    </div>
  );
}
