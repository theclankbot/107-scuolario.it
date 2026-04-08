import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import CompareTable from "@/components/CompareTable";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import GatedLink from "@/components/GatedLink";

import {
  getComparePresets,
  getComparePreset,
  getSchoolsForCompare,
  getSiteConfig,
} from "@/lib/data";
import { isPublished, filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const presets = getComparePresets();
  return filterPublished(presets).map((p) => ({
    compareSlug: p.slug,
  }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ compareSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { compareSlug } = await params;
  const preset = getComparePreset(compareSlug);
  if (!preset || !isPublished(preset)) return {};

  return buildMetadata({
    title: preset.metaTitle,
    description: preset.metaDescription,
    path: `/confronta/${preset.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CompareDetailPage({ params }: PageProps) {
  const { compareSlug } = await params;
  const preset = getComparePreset(compareSlug);

  if (!preset || !isPublished(preset)) {
    notFound();
  }

  const config = getSiteConfig();
  const schools = getSchoolsForCompare(preset.schoolCodes);
  const schoolNames = schools.map((s) => s.name);

  // Related presets: same city or same type, excluding self
  const allPresets = filterPublished(getComparePresets());
  const relatedPresets = allPresets
    .filter(
      (p) =>
        p.slug !== preset.slug &&
        (p.citySlug === preset.citySlug || p.schoolTypeSlug === preset.schoolTypeSlug),
    )
    .slice(0, 6);

  // ---- Breadcrumb ---------------------------------------------------------
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Confronta", href: "/confronta" },
    { label: preset.title },
  ];

  const breadcrumbLd = [
    { name: "Home", url: "/" },
    { name: "Confronta", url: "/confronta" },
    { name: preset.title, url: `/confronta/${preset.slug}` },
  ];

  // ---- FAQ ----------------------------------------------------------------
  const faqItems = [
    {
      question: `Quali scuole vengono confrontate in "${preset.title}"?`,
      answer: `Questo confronto include ${schools.length} scuole: ${schoolNames.join(", ")}. Tutti i dati provengono da Scuola in Chiaro / MIM.`,
    },
    {
      question: "Come vengono scelti i campi del confronto?",
      answer: `I campi del confronto sono selezionati tra quelli ufficiali disponibili per tutte le scuole incluse. In questo confronto vengono mostrati ${preset.fields.length} campi. Non vengono usati punteggi o classifiche.`,
    },
    {
      question: "I dati del confronto sono affidabili?",
      answer:
        "Si. Tutti i dati provengono dal portale ufficiale Scuola in Chiaro del Ministero dell'Istruzione e del Merito (MIM). Ogni valore e verificabile direttamente sulla fonte ufficiale.",
    },
    {
      question: "Posso confrontare altre scuole?",
      answer:
        "Al momento i confronti disponibili su Scuolario sono preimpostati per garantire omogeneita dei dati. Puoi esplorare altri confronti nella pagina Confronta o visitare le schede delle singole scuole per trovare confronti correlati.",
    },
  ];

  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
      <JsonLd
        data={collectionPageSchema(
          preset.title,
          preset.metaDescription,
          `/confronta/${preset.slug}`,
        )}
      />
      <JsonLd data={faqSchema(faqItems)} />

      {/* ----------------------------------------------------- Breadcrumb */}
        <div className="bg-bg border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* ---------------------------------------------------------- Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-bg py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
              {preset.h1}
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-text-secondary leading-relaxed">
              Confronto tra {schools.length} scuole su {preset.fields.length} campi ufficiali.
            </p>
          </div>
        </section>

        {/* -------------------------------------------- Comparison rules note */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text">Regole del confronto</h2>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                    Questo confronto mostra solo dati ufficiali da Scuola in Chiaro / MIM.
                    Non assegniamo punteggi, giudizi di qualita o classifiche.
                    I dati mancanti sono evidenziati come &ldquo;Dato non disponibile&rdquo;.
                  </p>
                  {preset.comparisonNotes.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {preset.comparisonNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- CompareTable */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CompareTable schools={schools} fields={preset.fields} />
          </div>
        </section>

        {/* ---- Individual school links ---- */}
        <section className="bg-surface py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text">Schede delle scuole</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Visita la scheda completa di ogni scuola inclusa nel confronto.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {schools.map((school) => (
                <GatedLink
                  key={school.schoolCode}
                  href={`/scuole/${school.schoolCode}`}
                  publishedAt={school.publishedAt}
                  className="group flex items-center justify-between rounded-lg border border-border bg-bg p-4 transition-shadow hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors line-clamp-1">
                      {school.name}
                    </p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {school.schoolCode} &middot; {school.cityName}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-primary group-hover:text-primary/80 transition-colors">
                    Apri &rarr;
                  </span>
                </GatedLink>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Related presets ---- */}
        {relatedPresets.length > 0 && (
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-text">Confronti correlati</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Altri confronti nella stessa citta o della stessa tipologia.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPresets.map((rp) => (
                  <GatedLink
                    key={rp.slug}
                    href={`/confronta/${rp.slug}`}
                    publishedAt={rp.publishedAt}
                    className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {rp.schoolCodes.length} scuole &middot; {rp.fields.length} campi
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                      Vedi confronto &rarr;
                    </span>
                  </GatedLink>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---- FAQ ---- */}
        <section className="bg-surface py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text">Domande frequenti</h2>
            <div className="mt-5">
              <FAQ items={faqItems} />
            </div>
          </div>
        </section>

        {/* ---- Trust note ---- */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <TrustNote date={config.lastDataRefreshAt} />
          </div>
        </section>

        {/* ---- Ad slot ---- */}
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <AdSlot slot="compare-detail-bottom" />
        </div>
    </>
  );
}
