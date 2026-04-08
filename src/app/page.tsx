import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import RegionCard from "@/components/RegionCard";
import CityCard from "@/components/CityCard";
import SchoolTypeCard from "@/components/SchoolTypeCard";
import StatCard from "@/components/StatCard";
import TrustNote from "@/components/TrustNote";
import GuideCard from "@/components/GuideCard";
import JsonLd from "@/components/JsonLd";
import { getRegions, getCities, getSchoolTypes, getGuides, getSiteConfig, getSchoolsIndex } from "@/lib/data";
import { filterPublished } from "@/lib/publication";
import { formatNumber } from "@/lib/utils";
import { websiteSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Scuolario | Trova scuole in Italia per città, provincia e tipologia",
  description:
    "Cerca e confronta scuole in Italia per città, provincia e tipologia. Dati ufficiali da Scuola in Chiaro / MIM. Nessuna classifica inventata, solo fatti verificabili.",
  path: "/",
});

export default function HomePage() {
  const config = getSiteConfig();
  const regions = getRegions();
  const allCities = getCities();
  const allSchools = getSchoolsIndex();
  const allSchoolTypes = getSchoolTypes();
  const allGuides = getGuides();

  const publishedCities = filterPublished(allCities);
  const publishedSchoolTypes = filterPublished(allSchoolTypes);
  const publishedGuides = filterPublished(allGuides);

  const totalPublishedSchools = filterPublished(allSchools).length;

  const featuredCities = [...publishedCities]
    .sort((a, b) => b.schoolCount - a.schoolCount)
    .slice(0, 12);

  const featuredTypes = [...publishedSchoolTypes]
    .sort((a, b) => b.schoolCount - a.schoolCount)
    .slice(0, 8);

  const guideTeasers = publishedGuides.slice(0, 3);

  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }])} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-bg py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Trova scuole in Italia per città, provincia e tipologia
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Scuolario raccoglie i dati ufficiali del Ministero dell&apos;Istruzione e del
            Merito (Scuola in Chiaro / MIM) e li rende più facili da consultare e
            confrontare.
          </p>

          <div className="mt-8 flex justify-center">
            <SearchBar placeholder="Cerca scuola, codice meccanografico, città o provincia" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/comuni"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
            >
              Inizia dalla tua città
            </Link>
            <Link
              href="/regioni"
              className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary shadow-sm hover:bg-bg transition-colors"
            >
              Sfoglia per regione
            </Link>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={formatNumber(regions.length)} label="Regioni" />
            <StatCard
              value={formatNumber(
                regions.reduce((s, r) => s + r.provinceCount, 0)
              )}
              label="Province"
            />
            <StatCard
              value={formatNumber(publishedCities.length)}
              label="Comuni pubblicati"
            />
            <StatCard
              value={formatNumber(totalPublishedSchools)}
              label="Scuole pubblicate"
            />
          </div>
        </div>
      </section>

      {/* Regions grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text">Tutte le regioni</h2>
          <p className="mt-2 text-text-secondary">
            Seleziona una regione per scoprire le province, i comuni e le scuole
            disponibili.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {regions.map((region) => (
              <RegionCard key={region.slug} region={region} />
            ))}
          </div>
        </div>
      </section>

      {/* Top cities */}
      {featuredCities.length > 0 && (
        <section className="bg-surface py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text">Città in evidenza</h2>
            <p className="mt-2 text-text-secondary">
              I comuni con il maggior numero di scuole già pubblicati su
              Scuolario.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {featuredCities.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/comuni"
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Vedi tutti i comuni &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* School-type shortcuts */}
      {featuredTypes.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text">
              Tipologie di scuola
            </h2>
            <p className="mt-2 text-text-secondary">
              Naviga le scuole italiane per tipologia: infanzia, primaria,
              secondaria e altro.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {featuredTypes.map((type) => (
                <SchoolTypeCard key={type.slug} type={type} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/tipologie"
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Vedi tutte le tipologie &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Perché Scuolario */}
      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text text-center">
            Perché Scuolario?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-text-secondary">
            Un motore di ricerca per le scuole italiane fondato sulla
            trasparenza.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-bg p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text">Dati ufficiali</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Tutte le informazioni provengono da Scuola in Chiaro e dal portale
                Unica del Ministero dell&apos;Istruzione e del Merito. Nessun dato
                inventato.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text">
                Nessuna classifica inventata
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Non assegniamo punteggi o ranking arbitrari. Presentiamo i dati
                così come sono, senza giudizi o classifiche di qualità.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text">
                Confronto su campi reali
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Confronta più scuole fianco a fianco sugli stessi campi ufficiali:
                servizi, tecnologia, documenti, contatti e altro ancora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust note */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <TrustNote date={config.lastDataRefreshAt} />
        </div>
      </section>

      {/* Guide teaser */}
      {guideTeasers.length > 0 && (
        <section className="bg-surface py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text">Guide utili</h2>
            <p className="mt-2 text-text-secondary">
              Approfondimenti e consigli per orientarsi nel sistema scolastico
              italiano.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guideTeasers.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/guide"
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Tutte le guide &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
