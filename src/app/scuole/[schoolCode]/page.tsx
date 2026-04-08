import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumb";
import FactGrid from "@/components/FactGrid";
import SourceBadge from "@/components/SourceBadge";
import AvailabilityPill from "@/components/AvailabilityPill";
import NearbySchools from "@/components/NearbySchools";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import GatedLink from "@/components/GatedLink";

import { getSchool, getSchoolsIndex, getSchoolsForCompare, getComparePresets, getCity, getProvince, getRegion, getSchoolType } from "@/lib/data";
import { isPublished, filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, schoolSchema, faqSchema } from "@/lib/schema";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const schools = getSchoolsIndex();
  return filterPublished(schools).map((s) => ({
    schoolCode: s.schoolCode,
  }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ schoolCode: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { schoolCode } = await params;
  const school = getSchool(schoolCode);
  if (!school || !isPublished(school)) return {};

  return buildMetadata({
    title: school.metaTitle,
    description: school.metaDescription,
    path: `/scuole/${school.schoolCode}`,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function SchoolDetailPage({ params }: PageProps) {
  const { schoolCode } = await params;
  const school = getSchool(schoolCode);

  if (!school || !isPublished(school)) {
    notFound();
  }

  const city = getCity(school.citySlug);
  const province = getProvince(school.provinceSlug);
  const region = getRegion(school.regionSlug);
  const schoolType = getSchoolType(school.schoolTypeSlug);

  // ---- Breadcrumb items ---------------------------------------------------
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Regioni", href: "/regioni" },
    { label: school.regionName, href: region && isPublished(region) ? `/regioni/${school.regionSlug}` : undefined },
    { label: "Province", href: "/province" },
    { label: school.provinceName, href: province && isPublished(province) ? `/province/${school.provinceSlug}` : undefined },
    { label: "Comuni", href: "/comuni" },
    { label: school.cityName, href: city && isPublished(city) ? `/comuni/${school.citySlug}` : undefined },
    { label: school.name },
  ];

  const breadcrumbLd = breadcrumbItems.map((item) => ({
    name: item.label,
    url: item.href ?? `/scuole/${school.schoolCode}`,
  }));

  // ---- Key facts ----------------------------------------------------------
  const facts = [
    { label: "Indirizzo", value: school.address.full },
    { label: "Telefono", value: school.contacts.phone },
    { label: "Email", value: school.contacts.email },
    { label: "PEC", value: school.contacts.pec },
    { label: "Sito web", value: school.contacts.websiteUrl },
    { label: "Stato giuridico", value: school.legalStatus },
  ];

  // ---- Source availability sections ---------------------------------------
  const sourceEntries: { label: string; available: boolean; url: string | null }[] = [
    { label: "Didattica", available: school.availability.hasDidattica, url: school.source.didatticaUrl },
    { label: "Servizi", available: school.availability.hasServizi, url: school.source.serviziUrl },
    { label: "Finanza", available: school.availability.hasFinanza, url: school.source.finanzaUrl },
    { label: "PTOF", available: school.availability.hasPtof, url: school.source.ptofUrl },
    { label: "RAV", available: school.availability.hasRav, url: school.source.ravUrl },
    { label: "Rendicontazione sociale", available: school.availability.hasRendicontazioneSociale, url: school.source.rendicontazioneSocialeUrl },
    { label: "Edilizia", available: school.availability.hasEdilizia, url: school.source.ediliziaUrl },
    { label: "PON", available: school.availability.hasPon, url: school.source.ponUrl },
  ];

  // ---- Compare presets that include this school ---------------------------
  const allPresets = filterPublished(getComparePresets());
  const relatedPresets = allPresets.filter((p) =>
    p.schoolCodes.includes(school.schoolCode),
  );

  // ---- Nearby schools -----------------------------------------------------
  const nearbySchools = school.nearbySchoolCodes.length > 0
    ? getSchoolsForCompare(school.nearbySchoolCodes)
        .filter((s) => isPublished(s))
        .map((s) => ({
          schoolCode: s.schoolCode,
          name: s.name,
          schoolTypeLabel: s.schoolTypeLabel,
          cityName: s.cityName,
          publishedAt: s.publishedAt,
        }))
    : [];

  // ---- FAQ items ----------------------------------------------------------
  const faqItems = [
    {
      question: `Dove si trova ${school.name}?`,
      answer: `${school.name} si trova in ${school.address.full}, nel comune di ${school.cityName}, provincia di ${school.provinceName} (${school.provinceSigla}), regione ${school.regionName}.`,
    },
    {
      question: `Quali contatti ufficiali ha ${school.name}?`,
      answer: `I contatti ufficiali di ${school.name} includono: ${school.contacts.phone ? `telefono ${school.contacts.phone}` : "telefono non disponibile"}, ${school.contacts.email ? `email ${school.contacts.email}` : "email non disponibile"}, ${school.contacts.pec ? `PEC ${school.contacts.pec}` : "PEC non disponibile"}. Tutti i dati provengono da Scuola in Chiaro / MIM.`,
    },
    {
      question: `Come verificare i dati di ${school.name}?`,
      answer: `Puoi verificare tutti i dati di ${school.name} direttamente sul portale ufficiale Scuola in Chiaro del Ministero dell'Istruzione e del Merito (MIM). Il codice meccanografico della scuola e ${school.schoolCode}. Ogni informazione su Scuolario rimanda alla fonte ufficiale.`,
    },
    {
      question: `Con quali scuole simili posso confrontare ${school.name}?`,
      answer: relatedPresets.length > 0
        ? `Puoi confrontare ${school.name} con altre scuole simili nelle sezioni di confronto dedicate. Sono disponibili ${relatedPresets.length} confronti preimpostati che includono questa scuola.`
        : `Al momento non sono disponibili confronti preimpostati per ${school.name}. Puoi esplorare i confronti disponibili nella sezione Confronta del sito.`,
    },
  ];

  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLd data={schoolSchema(school)} />
      <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
      <JsonLd data={faqSchema(faqItems)} />
        {/* ----------------------------------------------------- Breadcrumb */}
        <div className="bg-bg border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* =========================================================== */}
        {/* 1. Identity header                                          */}
        {/* =========================================================== */}
        <section className="bg-gradient-to-b from-primary/5 to-bg py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                {school.schoolCode}
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-0.5 text-xs font-semibold text-secondary">
                {school.schoolTypeLabel}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
              {school.h1}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <GatedLink
                href={`/comuni/${school.citySlug}`}
                publishedAt={city?.publishedAt ?? null}
                className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                {school.cityName}
              </GatedLink>
              <GatedLink
                href={`/province/${school.provinceSlug}`}
                publishedAt={province?.publishedAt ?? null}
                className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                {school.provinceName} ({school.provinceSigla})
              </GatedLink>
              <GatedLink
                href={`/regioni/${school.regionSlug}`}
                publishedAt={region?.publishedAt ?? null}
                className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                {school.regionName}
              </GatedLink>
            </div>

            {/* Primary CTA */}
            <div className="mt-6">
              <a
                href={school.source.officialOverviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
              >
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
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Apri fonte ufficiale
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* 2. Key facts grid                                           */}
        {/* =========================================================== */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text">Dati principali</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Informazioni di base da Scuola in Chiaro / MIM.
            </p>
            <div className="mt-5">
              <FactGrid facts={facts} />
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* 3. Official-source sections                                 */}
        {/* =========================================================== */}
        <section className="bg-surface py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text">Sezioni ufficiali disponibili</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Disponibilita delle sezioni informative sul portale Scuola in Chiaro / MIM.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {sourceEntries.map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-center justify-between rounded-lg border border-border bg-bg p-4"
                >
                  <AvailabilityPill available={entry.available} label={entry.label} />
                  {entry.available && entry.url && (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Apri &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Services summary */}
            {school.servicesSummary && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text">Riepilogo servizi</h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border border-border bg-bg p-4">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">Laboratori digitali</dt>
                    <dd className="mt-1 text-sm font-medium text-text">
                      {school.servicesSummary.hasDigitalLabs ? "Presenti" : "Non presenti"}
                    </dd>
                  </div>
                  {school.servicesSummary.digitalDeviceCount !== null && (
                    <div className="rounded-lg border border-border bg-bg p-4">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted">Dispositivi digitali</dt>
                      <dd className="mt-1 text-sm font-medium text-text">
                        {school.servicesSummary.digitalDeviceCount}
                      </dd>
                    </div>
                  )}
                  {school.servicesSummary.connectivityPoints !== null && (
                    <div className="rounded-lg border border-border bg-bg p-4">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted">Punti di connettivita</dt>
                      <dd className="mt-1 text-sm font-medium text-text">
                        {school.servicesSummary.connectivityPoints}
                      </dd>
                    </div>
                  )}
                  <div className="rounded-lg border border-border bg-bg p-4">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">Spazi innovativi</dt>
                    <dd className="mt-1 text-sm font-medium text-text">
                      {school.servicesSummary.hasInnovativeLearningSpaces ? "Presenti" : "Non presenti"}
                    </dd>
                  </div>
                  {school.servicesSummary.serviceNotes.length > 0 && (
                    <div className="rounded-lg border border-border bg-bg p-4 sm:col-span-2">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted">Note sui servizi</dt>
                      <dd className="mt-1 text-sm text-text-secondary">
                        {school.servicesSummary.serviceNotes.join("; ")}
                      </dd>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Documents summary */}
            {school.documentsSummary && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text">Documenti disponibili</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  <AvailabilityPill available={school.documentsSummary.hasRav} label="RAV" />
                  <AvailabilityPill available={school.documentsSummary.hasPtof} label="PTOF" />
                  <AvailabilityPill available={school.documentsSummary.hasRendicontazioneSociale} label="Rendicontazione sociale" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================== */}
        {/* 4. Compare module                                           */}
        {/* =========================================================== */}
        {relatedPresets.length > 0 && (
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-text">Confronta con altre scuole</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Confronti preimpostati che includono {school.name}.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPresets.map((preset) => (
                  <GatedLink
                    key={preset.slug}
                    href={`/confronta/${preset.slug}`}
                    publishedAt={preset.publishedAt}
                    className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                      {preset.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {preset.schoolCodes.length} scuole a confronto
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

        {/* =========================================================== */}
        {/* 5. Nearby schools                                           */}
        {/* =========================================================== */}
        {nearbySchools.length > 0 && (
          <section className="bg-surface py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <NearbySchools schools={nearbySchools} />
            </div>
          </section>
        )}

        {/* =========================================================== */}
        {/* 6. Source methodology note                                   */}
        {/* =========================================================== */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-border bg-bg p-6">
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
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">Nota sulla metodologia</h3>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                    Questa scheda riassume dati ufficiali pubblici disponibili su Scuola in Chiaro / MIM.
                    Non esprimiamo giudizi di qualita ne assegniamo punteggi. Ogni informazione
                    e collegata alla fonte ufficiale per una verifica diretta.
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <SourceBadge label="Scuola in Chiaro" url={school.source.officialOverviewUrl} />
                    <TrustNote date={school.lastSourceCheckAt} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* 7. FAQ                                                      */}
        {/* =========================================================== */}
        <section className="bg-surface py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text">Domande frequenti</h2>
            <div className="mt-5">
              <FAQ items={faqItems} />
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* 8. NO score/rating badge -- explicitly omitted              */}
        {/* =========================================================== */}

        {/* =========================================================== */}
        {/* Related links                                               */}
        {/* =========================================================== */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text">Esplora ancora</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <GatedLink
                href={`/comuni/${school.citySlug}`}
                publishedAt={city?.publishedAt ?? null}
                className="inline-flex items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                Scuole a {school.cityName}
              </GatedLink>
              <GatedLink
                href={`/province/${school.provinceSlug}`}
                publishedAt={province?.publishedAt ?? null}
                className="inline-flex items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                Scuole in provincia di {school.provinceName}
              </GatedLink>
              <GatedLink
                href={`/tipologie/${school.schoolTypeSlug}`}
                publishedAt={schoolType?.publishedAt ?? null}
                className="inline-flex items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                {school.schoolTypeLabel} in Italia
              </GatedLink>
              <Link
                href="/confronta"
                className="inline-flex items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                Confronta scuole
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* 10. Ad slot below related links                             */}
        {/* =========================================================== */}
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <AdSlot slot="school-detail-bottom" />
        </div>
    </>
  );
}
