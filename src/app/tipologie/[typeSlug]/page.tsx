import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSchoolTypes,
  getSchoolType,
  getRegions,
  getCities,
  getComparePresets,
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
import StatCard from "@/components/StatCard";
import GatedLink from "@/components/GatedLink";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const types = getSchoolTypes();
  const published = filterPublished(types);
  return published.map((t) => ({ typeSlug: t.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ typeSlug: string }>;
}): Promise<Metadata> {
  const { typeSlug } = await params;
  const type = getSchoolType(typeSlug);

  if (!type || !isPublished(type)) {
    return buildMetadata({
      title: "Tipologia non trovata | Scuolario",
      description: "La tipologia scolastica richiesta non e stata trovata.",
      path: `/tipologie/${typeSlug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: type.metaTitle,
    description: type.metaDescription,
    path: `/tipologie/${typeSlug}`,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function SchoolTypeDetailPage({
  params,
}: {
  params: Promise<{ typeSlug: string }>;
}) {
  const { typeSlug } = await params;

  // Load school type data
  const type = getSchoolType(typeSlug);
  if (!type || !isPublished(type)) {
    notFound();
  }

  // Load featured regions and cities
  const allRegions = getRegions();
  const allCities = getCities();

  const featuredRegions = (type.featuredRegionSlugs ?? [])
    .map((slug) => allRegions.find((r) => r.slug === slug))
    .filter(Boolean) as typeof allRegions;

  const featuredCities = (type.featuredCitySlugs ?? [])
    .map((slug) => allCities.find((c) => c.slug === slug))
    .filter(Boolean) as typeof allCities;

  // Load compare presets related to this school type
  const allPresets = getComparePresets();
  const typePresets = filterPublished(
    allPresets.filter((p) => p.schoolTypeSlug === typeSlug)
  );

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Tipologie", url: "/tipologie" },
    { name: type.label, url: `/tipologie/${type.slug}` },
  ];

  // FAQ items
  const faqItems = [
    {
      question: `Cosa si studia in un ${type.label}?`,
      answer:
        type.intro ||
        `Il percorso ${type.label} offre una formazione specifica nel proprio ambito disciplinare. Per dettagli sul piano di studi e sulle materie, consulta le schede delle singole scuole disponibili su Scuolario.`,
    },
    {
      question: `Quante scuole di tipo ${type.label} ci sono in Italia?`,
      answer: `In Italia sono censite ${formatNumber(type.schoolCount)} scuole di tipo ${type.label}. I dati provengono dal portale ufficiale Scuola in Chiaro del Ministero dell'Istruzione e del Merito.`,
    },
    {
      question: `Dove posso trovare ${type.label.toLowerCase().startsWith("i") ? "un" : "un"} ${type.label} vicino a me?`,
      answer: `Su Scuolario puoi cercare scuole di tipo ${type.label} filtrando per regione, provincia o comune. In questa pagina trovi le principali citta e regioni con scuole di questo tipo.`,
    },
    {
      question: `Quali sbocchi offre ${type.label.toLowerCase().startsWith("i") ? "un" : "un"} ${type.label}?`,
      answer: `Il diploma di ${type.label} apre diverse possibilita: accesso all'universita, iscrizione a ITS Academy, corsi di formazione professionale o inserimento diretto nel mondo del lavoro. Gli sbocchi specifici dipendono dall'indirizzo scelto.`,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* JSON-LD */}
          <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
          <JsonLd
            data={collectionPageSchema(
              type.h1,
              type.metaDescription,
              `/tipologie/${type.slug}`
            )}
          />
          <JsonLd data={faqSchema(faqItems)} />

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tipologie", href: "/tipologie" },
              { label: type.label },
            ]}
          />

          {/* H1 */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {type.h1}
            </h1>
          </div>

          {/* Summary StatCards */}
          <section className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                value={formatNumber(type.schoolCount)}
                label="Scuole in Italia"
              />
              <StatCard
                value={formatNumber(featuredRegions.length)}
                label="Regioni principali"
              />
              <StatCard
                value={formatNumber(featuredCities.length)}
                label="Citta in evidenza"
              />
              <StatCard
                value={formatNumber(typePresets.length)}
                label="Confronti disponibili"
              />
            </div>
          </section>

          {/* Intro explanation */}
          {type.intro && (
            <section className="mt-8 rounded-lg border border-border bg-surface p-6">
              <h2 className="text-lg font-bold text-text">
                Cos&apos;e il percorso {type.label}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {type.intro}
              </p>
            </section>
          )}

          <AdSlot slot="tipo-detail-top" className="mt-8" />

          {/* Featured regions */}
          {featuredRegions.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-text">
                Regioni con piu scuole di tipo {type.label}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Le regioni con la maggiore concentrazione di scuole{" "}
                {type.label.toLowerCase()}.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {featuredRegions.map((region) => (
                  <GatedLink
                    key={region.slug}
                    href={`/regioni/${region.slug}`}
                    publishedAt={region.publishedAt}
                    className="group rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
                      {region.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {formatNumber(region.publishedSchoolCount)} scuole
                      pubblicate
                    </p>
                  </GatedLink>
                ))}
              </div>
            </section>
          )}

          {/* Featured cities */}
          {featuredCities.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-text">
                Citta con scuole di tipo {type.label}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Principali citta dove trovare istituti di tipo{" "}
                {type.label.toLowerCase()}.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {featuredCities.map((city) => (
                  <GatedLink
                    key={city.slug}
                    href={`/comuni/${city.slug}`}
                    publishedAt={city.publishedAt}
                    className="group rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
                      {city.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-3 text-sm text-text-secondary">
                      <span>{city.provinceName}</span>
                      <span>
                        {formatNumber(city.schoolCount)} scuole
                      </span>
                    </div>
                  </GatedLink>
                ))}
              </div>
            </section>
          )}

          <AdSlot slot="tipo-detail-mid" className="mt-8" />

          {/* Compare presets for this type */}
          {typePresets.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-text">
                Confronti tra scuole di tipo {type.label}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Confronti preimpostati tra istituti dello stesso tipo per
                aiutarti nella scelta.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {typePresets.map((preset) => (
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

          {/* Related guides */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-text">
              Guide e approfondimenti
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Scopri di piu su questa tipologia scolastica e sul sistema
              educativo italiano.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/guide/differenza-liceo-tecnico-professionale"
                className="rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-text hover:text-primary transition-colors">
                  Liceo, tecnico o professionale?
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Le differenze principali tra i tre percorsi della scuola
                  superiore.
                </p>
              </Link>
              <Link
                href="/tipologie"
                className="rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-text hover:text-primary transition-colors">
                  Tutte le tipologie scolastiche
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Elenco completo dei percorsi formativi disponibili in Italia.
                </p>
              </Link>
              <Link
                href="/guide/iscrizioni-scolastiche"
                className="rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-text hover:text-primary transition-colors">
                  Come iscriversi a scuola
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Procedura, documenti e scadenze per le iscrizioni scolastiche.
                </p>
              </Link>
            </div>
          </section>

          <AdSlot slot="tipo-detail-bottom" className="mt-8" />

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-text">
              Domande frequenti: {type.label}
            </h2>
            <div className="mt-4">
              <FAQ items={faqItems} />
            </div>
          </section>
    </div>
  );
}
