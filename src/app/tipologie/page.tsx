import type { Metadata } from "next";
import Link from "next/link";
import { getSchoolTypes } from "@/lib/data";
import { filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import SchoolTypeCard from "@/components/SchoolTypeCard";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Tipologie scolastiche italiane | Scuolario",
  description:
    "Esplora tutte le tipologie scolastiche italiane: licei, istituti tecnici, professionali, scuole dell'infanzia e primarie. Trova scuole per percorso di studio.",
  path: "/tipologie",
});

export default function TipologiePage() {
  const allTypes = getSchoolTypes();
  const publishedTypes = filterPublished(allTypes);

  // Group types by school level group for organized display
  const groupedTypes = new Map<string, typeof publishedTypes>();
  for (const type of publishedTypes) {
    const group = type.schoolLevelGroup || "Altro";
    const existing = groupedTypes.get(group) ?? [];
    existing.push(type);
    groupedTypes.set(group, existing);
  }

  // Sort groups for display
  const groupOrder = [
    "Scuola dell'infanzia",
    "Scuola primaria",
    "Scuola secondaria di I grado",
    "Scuola secondaria di II grado",
    "Altro",
  ];
  const sortedGroups = Array.from(groupedTypes.entries()).sort((a, b) => {
    const idxA = groupOrder.indexOf(a[0]);
    const idxB = groupOrder.indexOf(b[0]);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Tipologie", url: "/tipologie" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* JSON-LD */}
          <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
          <JsonLd
            data={collectionPageSchema(
              "Tipologie scolastiche italiane",
              "Elenco completo delle tipologie scolastiche italiane con informazioni dettagliate su ogni percorso formativo.",
              "/tipologie"
            )}
          />

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tipologie" },
            ]}
          />

          {/* Header */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Tipologie scolastiche: cerca scuole per percorso
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">
              Il sistema scolastico italiano comprende diverse tipologie di
              istituti, ognuno con un percorso formativo specifico. Esplora le
              tipologie per trovare le scuole piu adatte alle tue esigenze.
            </p>
          </div>

          {/* Intro section */}
          <section className="mt-8 rounded-lg border border-border bg-surface p-6">
            <h2 className="text-lg font-bold text-text">
              Come funziona il sistema scolastico italiano
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-secondary">
              <p>
                Il percorso scolastico in Italia si articola in diversi livelli:
                scuola dell&apos;infanzia (3-6 anni), scuola primaria (6-11
                anni), scuola secondaria di primo grado (11-14 anni) e scuola
                secondaria di secondo grado (14-19 anni).
              </p>
              <p>
                La scuola secondaria di secondo grado offre la scelta piu ampia:
                <strong> licei</strong> (classico, scientifico, linguistico,
                artistico, delle scienze umane, musicale e coreutico),{" "}
                <strong>istituti tecnici</strong> (settore economico e
                tecnologico) e{" "}
                <strong>istituti professionali</strong> (settore dei servizi e
                dell&apos;industria e artigianato).
              </p>
              <p>
                Ogni tipologia prepara a percorsi post-diploma differenti:
                universita, ITS Academy, formazione professionale o inserimento
                diretto nel mondo del lavoro.
              </p>
            </div>
          </section>

          <AdSlot slot="tipologie-top" className="mt-8" />

          {/* Type card grid -- grouped by level */}
          {sortedGroups.map(([group, types]) => (
            <section key={group} className="mt-10">
              <h2 className="text-xl font-bold text-text">{group}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {types
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((type) => (
                    <SchoolTypeCard key={type.slug} type={type} />
                  ))}
              </div>
            </section>
          ))}

          {/* Flat grid fallback when no groups */}
          {sortedGroups.length === 0 && publishedTypes.length > 0 && (
            <section className="mt-8">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {publishedTypes
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((type) => (
                    <SchoolTypeCard key={type.slug} type={type} />
                  ))}
              </div>
            </section>
          )}

          {publishedTypes.length === 0 && (
            <p className="mt-8 py-12 text-center text-sm text-muted">
              Nessuna tipologia scolastica pubblicata al momento.
            </p>
          )}

          <AdSlot slot="tipologie-mid" className="mt-8" />

          {/* Guide links */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-text">
              Guide per orientarsi nella scelta
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Non sai quale percorso scolastico scegliere? Le nostre guide
              approfondiscono le differenze tra i vari tipi di scuola.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/guide/differenza-liceo-tecnico-professionale"
                className="rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-text hover:text-primary transition-colors">
                  Liceo, tecnico o professionale: quale scegliere?
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Guida completa alle differenze tra i tre percorsi della scuola
                  superiore.
                </p>
              </Link>
              <Link
                href="/guide/tipi-di-liceo"
                className="rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-text hover:text-primary transition-colors">
                  Tutti i tipi di liceo in Italia
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Classico, scientifico, linguistico e gli altri: cosa si studia
                  e dove porta ogni liceo.
                </p>
              </Link>
              <Link
                href="/guide/iscrizioni-scolastiche"
                className="rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-text hover:text-primary transition-colors">
                  Come funzionano le iscrizioni scolastiche
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Tempistiche, documenti e procedura per iscrivere i figli a
                  scuola.
                </p>
              </Link>
            </div>
          </section>

          <AdSlot slot="tipologie-bottom" className="mt-8" />
    </div>
  );
}
