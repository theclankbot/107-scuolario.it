import type { Metadata } from "next";
import { getRegions } from "@/lib/data";
import { filterPublished } from "@/lib/publication";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import RegionCard from "@/components/RegionCard";
import StatCard from "@/components/StatCard";
import TrustNote from "@/components/TrustNote";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

const PAGE_PATH = "/regioni";
const PAGE_TITLE = "Regioni d'Italia: trova scuole per territorio";
const PAGE_DESCRIPTION =
  "Esplora tutte le 20 regioni italiane per trovare scuole pubbliche e paritarie. Naviga per territorio e scopri le scuole della tua zona con dati ufficiali dal Ministero dell'Istruzione.";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `${PAGE_TITLE} | Scuolario`,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Regioni" },
];

const breadcrumbLd = [
  { name: "Home", url: "/" },
  { name: "Regioni", url: PAGE_PATH },
];

const faqItems = [
  {
    question: "Quante regioni ci sono in Italia?",
    answer:
      "L'Italia e suddivisa in 20 regioni, di cui 5 a statuto speciale (Sicilia, Sardegna, Valle d'Aosta, Trentino-Alto Adige e Friuli-Venezia Giulia) e 15 a statuto ordinario. Ogni regione ha le proprie province e comuni con scuole di ogni ordine e grado.",
  },
  {
    question: "Come posso trovare le scuole della mia regione?",
    answer:
      "Seleziona la tua regione dalla griglia sottostante. Verrai reindirizzato alla pagina dedicata con l'elenco delle province, i comuni principali e le tipologie di scuole presenti nel territorio regionale.",
  },
  {
    question: "I dati sulle scuole sono aggiornati?",
    answer:
      "I dati provengono da Scuola in Chiaro, il portale ufficiale del Ministero dell'Istruzione e del Merito (MIM). Vengono aggiornati periodicamente per garantire affidabilita e completezza delle informazioni.",
  },
  {
    question: "Posso confrontare scuole di regioni diverse?",
    answer:
      "Si, Scuolario offre strumenti di confronto che permettono di comparare scuole anche tra regioni diverse. Visita la sezione Confronta per scoprire le opzioni disponibili.",
  },
];

export default function RegioniPage() {
  const allRegions = getRegions();
  const publishedRegions = filterPublished(allRegions);

  const totalSchools = publishedRegions.reduce(
    (sum, r) => sum + (r.publishedSchoolCount ?? 0),
    0,
  );
  const totalProvinces = publishedRegions.reduce(
    (sum, r) => sum + (r.publishedProvinceCount ?? 0),
    0,
  );
  const totalCities = publishedRegions.reduce(
    (sum, r) => sum + (r.publishedCityCount ?? 0),
    0,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD structured data */}
        <JsonLd
          data={collectionPageSchema(PAGE_TITLE, PAGE_DESCRIPTION, PAGE_PATH)}
        />
        <JsonLd data={breadcrumbSchema(breadcrumbLd)} />
        <JsonLd data={faqSchema(faqItems)} />

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page header */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {PAGE_TITLE}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Esplora le scuole italiane partendo dal territorio. Seleziona una
            delle 20 regioni per navigare tra province, comuni e istituti
            scolastici. Ogni regione offre una panoramica completa delle scuole
            presenti, con dati ufficiali dal Ministero dell&apos;Istruzione e
            del Merito.
          </p>
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard value={formatNumber(allRegions.length)} label="Regioni" />
          <StatCard
            value={formatNumber(totalProvinces)}
            label="Province pubblicate"
          />
          <StatCard
            value={formatNumber(totalCities)}
            label="Comuni pubblicati"
          />
          <StatCard
            value={formatNumber(totalSchools)}
            label="Scuole pubblicate"
          />
        </div>

        {/* Trust note */}
        <div className="mt-4">
          <TrustNote />
        </div>

        {/* Region grid */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            Tutte le regioni italiane
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allRegions
              .sort((a, b) => a.name.localeCompare(b.name, "it"))
              .map((region) => (
                <RegionCard key={region.slug} region={region} />
              ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-text">
            Domande frequenti sulle regioni italiane
          </h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </section>
    </div>
  );
}
