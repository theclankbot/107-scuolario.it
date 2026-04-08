import Breadcrumb from "@/components/Breadcrumb";
import GuideCard from "@/components/GuideCard";
import TrustNote from "@/components/TrustNote";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

import { getGuides, getSiteConfig } from "@/lib/data";
import { filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = buildMetadata({
  title: "Guide pratiche per cercare e confrontare scuole | Scuolario",
  description:
    "Guide pratiche per orientarsi tra le scuole italiane. Consigli per cercare, confrontare e scegliere la scuola giusta con dati ufficiali da Scuola in Chiaro / MIM.",
  path: "/guide",
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function GuidesIndexPage() {
  const config = getSiteConfig();
  const allGuides = getGuides();
  const guides = filterPublished(allGuides);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Guide" },
  ];

  const breadcrumbLd = [
    { name: "Home", url: "/" },
    { name: "Guide", url: "/guide" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
      <JsonLd
        data={collectionPageSchema(
          "Guide pratiche per cercare e confrontare scuole",
          "Guide pratiche per orientarsi tra le scuole italiane con dati ufficiali da Scuola in Chiaro / MIM.",
          "/guide",
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
              Guide pratiche per cercare e confrontare scuole
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-text-secondary leading-relaxed">
              Approfondimenti e consigli per orientarsi nel sistema scolastico italiano,
              dalla ricerca della scuola al confronto tra opzioni diverse.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- Guide grid */}
        {guides.length > 0 ? (
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <p className="text-lg text-text-secondary">
                Nessuna guida disponibile al momento. Torna presto per nuovi contenuti.
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
          <AdSlot slot="guides-index-bottom" />
        </div>
    </>
  );
}
