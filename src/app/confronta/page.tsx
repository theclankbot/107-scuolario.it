import Link from "next/link";

import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import TrustNote from "@/components/TrustNote";

import { getComparePresets, getSiteConfig } from "@/lib/data";
import { filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Confronta scuole con dati ufficiali | Scuolario",
  description:
    "Confronta scuole italiane fianco a fianco con dati ufficiali da Scuola in Chiaro / MIM. Nessuna classifica inventata: solo campi reali e verificabili.",
  path: "/confronta",
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CompareIndexPage() {
  const config = getSiteConfig();
  const allPresets = getComparePresets();
  const presets = filterPublished(allPresets);

  // Group presets by city slug
  const presetsByCity = new Map<string, typeof presets>();
  for (const preset of presets) {
    const key = preset.citySlug || "_other";
    const group = presetsByCity.get(key) ?? [];
    group.push(preset);
    presetsByCity.set(key, group);
  }

  // Group presets by school type slug
  const presetsByType = new Map<string, typeof presets>();
  for (const preset of presets) {
    const key = preset.schoolTypeSlug || "_other";
    const group = presetsByType.get(key) ?? [];
    group.push(preset);
    presetsByType.set(key, group);
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Confronta" },
  ];

  const breadcrumbLd = [
    { name: "Home", url: "/" },
    { name: "Confronta", url: "/confronta" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
      <JsonLd
        data={collectionPageSchema(
          "Confronta scuole con dati ufficiali",
          "Confronta scuole italiane fianco a fianco con dati ufficiali da Scuola in Chiaro / MIM.",
          "/confronta",
        )}
      />

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
              Confronta scuole con dati ufficiali
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-text-secondary leading-relaxed">
              Scegli uno dei confronti preimpostati per visualizzare fianco a fianco
              i dati ufficiali di scuole nella stessa citta o della stessa tipologia.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------- Comparison rules */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold text-text">Come funziona il confronto</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  <span>
                    <strong className="text-text">Nessuna classifica.</strong> Non assegniamo punteggi ne ranking.
                    Il confronto mostra solo campi ufficiali, fianco a fianco.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  <span>
                    <strong className="text-text">Campi comparabili.</strong> Confrontiamo solo dati omogenei:
                    scuole nella stessa citta o della stessa tipologia sugli stessi campi.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  <span>
                    <strong className="text-text">Fonte ufficiale.</strong> Tutti i dati provengono da
                    Scuola in Chiaro / MIM e sono verificabili sulla fonte originale.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------ Presets grouped by city */}
        {presetsByCity.size > 0 && (
          <section className="bg-surface py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-text">Confronti per citta</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Scuole della stessa citta confrontate sugli stessi campi.
              </p>

              <div className="mt-6 space-y-8">
                {Array.from(presetsByCity.entries()).map(([citySlug, cityPresets]) => (
                  <div key={citySlug}>
                    {citySlug !== "_other" && (
                      <h3 className="mb-3 text-lg font-semibold text-text capitalize">
                        {/* Use the first preset title to infer city name -- the title typically includes it */}
                        {citySlug.replace(/-/g, " ")}
                      </h3>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {cityPresets.map((preset) => (
                        <Link
                          key={preset.slug}
                          href={`/confronta/${preset.slug}`}
                          className="group block rounded-lg border border-border bg-bg p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <h4 className="text-base font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                            {preset.title}
                          </h4>
                          <p className="mt-2 text-sm text-text-secondary">
                            {preset.schoolCodes.length} scuole &middot; {preset.fields.length} campi a confronto
                          </p>
                          <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                            Vedi confronto &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------ Presets grouped by type */}
        {presetsByType.size > 0 && (
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-text">Confronti per tipologia</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Scuole della stessa tipologia confrontate sugli stessi campi.
              </p>

              <div className="mt-6 space-y-8">
                {Array.from(presetsByType.entries()).map(([typeSlug, typePresets]) => (
                  <div key={typeSlug}>
                    {typeSlug !== "_other" && (
                      <h3 className="mb-3 text-lg font-semibold text-text capitalize">
                        {typeSlug.replace(/-/g, " ")}
                      </h3>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {typePresets.map((preset) => (
                        <Link
                          key={preset.slug}
                          href={`/confronta/${preset.slug}`}
                          className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <h4 className="text-base font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                            {preset.title}
                          </h4>
                          <p className="mt-2 text-sm text-text-secondary">
                            {preset.schoolCodes.length} scuole &middot; {preset.fields.length} campi a confronto
                          </p>
                          <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                            Vedi confronto &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---- Empty state ---- */}
        {presets.length === 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <p className="text-lg text-text-secondary">
                Nessun confronto disponibile al momento. Torna presto per nuovi contenuti.
              </p>
            </div>
          </section>
        )}

        {/* ---- Trust note ---- */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <TrustNote date={config.lastDataRefreshAt} />
          </div>
        </section>

        {/* ---- Ad slot ---- */}
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <AdSlot slot="compare-index-bottom" />
        </div>
    </>
  );
}
