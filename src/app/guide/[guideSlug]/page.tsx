import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

import { getGuides, getGuide, getSiteConfig } from "@/lib/data";
import { isPublished, filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const guides = getGuides();
  return filterPublished(guides).map((g) => ({
    guideSlug: g.slug,
  }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ guideSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const guide = getGuide(guideSlug);
  if (!guide || !isPublished(guide)) return {};

  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guide/${guide.slug}`,
    ogType: "article",
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function GuideDetailPage({ params }: PageProps) {
  const { guideSlug } = await params;
  const guide = getGuide(guideSlug);

  if (!guide || !isPublished(guide)) {
    notFound();
  }

  const config = getSiteConfig();

  // Other published guides for related links
  const allGuides = filterPublished(getGuides());
  const otherGuides = allGuides
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3);

  // ---- Breadcrumb ---------------------------------------------------------
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Guide", href: "/guide" },
    { label: guide.title },
  ];

  const breadcrumbLd = [
    { name: "Home", url: "/" },
    { name: "Guide", url: "/guide" },
    { name: guide.title, url: `/guide/${guide.slug}` },
  ];

  // ---- FAQ ----------------------------------------------------------------
  const faqItems = [
    {
      question: `Di cosa parla la guida "${guide.title}"?`,
      answer: guide.intro,
    },
    {
      question: "Da dove provengono le informazioni di questa guida?",
      answer:
        "Le informazioni di questa guida si basano sui dati ufficiali disponibili su Scuola in Chiaro / MIM, il portale del Ministero dell'Istruzione e del Merito. Ogni riferimento e verificabile sulla fonte ufficiale.",
    },
    {
      question: "Come posso usare questa guida per scegliere una scuola?",
      answer:
        "Questa guida fornisce informazioni pratiche e criteri oggettivi per orientarti nella scelta. Ti consigliamo di consultare le schede delle singole scuole su Scuolario e verificare i dati direttamente sul portale ufficiale Scuola in Chiaro.",
    },
    {
      question: "Dove posso trovare altre guide utili?",
      answer:
        "Puoi consultare tutte le guide disponibili nella sezione Guide di Scuolario. Pubblichiamo regolarmente nuove guide per aiutarti a orientarti nel sistema scolastico italiano.",
    },
  ];

  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
      <JsonLd
        data={collectionPageSchema(
          guide.title,
          guide.metaDescription,
          `/guide/${guide.slug}`,
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
              {guide.h1}
            </h1>
          </div>
        </section>

        {/* ---- Article body ---- */}
        <article className="py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Intro summary */}
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-base text-text-secondary leading-relaxed">
                {guide.intro}
              </p>
            </div>

            {/* Numbered sections */}
            {guide.sections.length > 0 && (
              <div className="mt-10 space-y-10">
                {guide.sections.map((section, index) => (
                  <section key={index}>
                    <h2 className="flex items-start gap-3 text-xl font-bold text-text">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <span>{section.heading}</span>
                    </h2>
                    <div className="mt-3 pl-11">
                      <p className="text-base text-text-secondary leading-relaxed whitespace-pre-line">
                        {section.body}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Source references */}
            {guide.sourceUrls.length > 0 && (
              <div className="mt-10 rounded-lg border border-border bg-bg p-5">
                <h3 className="text-sm font-semibold text-text">Fonti e riferimenti</h3>
                <ul className="mt-2 space-y-1">
                  {guide.sourceUrls.map((url, index) => (
                    <li key={index}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary/80 transition-colors break-all"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        {/* ---- Related route links ---- */}
        <section className="bg-surface py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text">Esplora Scuolario</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/comuni"
                className="inline-flex items-center rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                Cerca per comune
              </Link>
              <Link
                href="/regioni"
                className="inline-flex items-center rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                Sfoglia per regione
              </Link>
              <Link
                href="/tipologie"
                className="inline-flex items-center rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                Tipologie di scuola
              </Link>
              <Link
                href="/confronta"
                className="inline-flex items-center rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                Confronta scuole
              </Link>
            </div>

            {/* Other guides */}
            {otherGuides.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text">Altre guide</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {otherGuides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guide/${g.slug}`}
                      className="group block rounded-lg border border-border bg-bg p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <h4 className="text-base font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                        {g.title}
                      </h4>
                      {g.intro && (
                        <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                          {g.intro}
                        </p>
                      )}
                      <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                        Leggi la guida &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="py-10">
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
          <AdSlot slot="guide-detail-bottom" />
        </div>
    </>
  );
}
