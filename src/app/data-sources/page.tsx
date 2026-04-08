import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Fonti dati e metodologia",
  description:
    "Scopri da dove provengono i dati di Scuolario, come vengono raccolti, la logica di pubblicazione e la politica sui dati mancanti.",
  path: "/data-sources",
});

const DATA_SOURCES = [
  {
    name: "Scuola in Chiaro / Portale Unica",
    url: "https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro",
    description:
      "Fonte primaria per tutte le informazioni sulle scuole italiane: anagrafica, contatti, servizi, didattica, finanza, documenti (PTOF, RAV, Rendicontazione Sociale) ed edilizia.",
  },
  {
    name: "Ministero dell'Istruzione e del Merito (MIM)",
    url: "https://www.miur.gov.it/",
    description:
      "Portale istituzionale del Ministero. Fonte di riferimento per normative, comunicati e dati aggregati sul sistema scolastico nazionale.",
  },
  {
    name: "Portale Open Data Istruzione",
    url: "https://dati.istruzione.it/opendata/",
    description:
      "Archivio di dataset aperti relativi a scuole, studenti, personale e strutture scolastiche italiane.",
  },
  {
    name: "ISTAT - Istituto Nazionale di Statistica",
    url: "https://www.istat.it/",
    description:
      "Utilizzato come fonte di riferimento per la nomenclatura ufficiale di regioni, province e comuni e per i codici territoriali.",
  },
] as const;

export default function FontiPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema(
          "Fonti dati e metodologia",
          "Da dove provengono i dati di Scuolario e come vengono elaborati.",
          "/data-sources",
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Fonti dati", url: "/data-sources" },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Fonti dati" },
            ]}
          />

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Fonti dati e metodologia
          </h1>

          <div className="mt-8 space-y-8 text-text-secondary leading-relaxed">
            {/* Sources list */}
            <section>
              <h2 className="text-xl font-semibold text-text">Fonti utilizzate</h2>
              <p className="mt-3">
                Scuolario raccoglie e organizza dati provenienti esclusivamente da fonti
                istituzionali italiane. Di seguito l&apos;elenco completo delle fonti utilizzate.
              </p>
              <ul className="mt-4 space-y-4">
                {DATA_SOURCES.map((source) => (
                  <li
                    key={source.url}
                    className="rounded-lg border border-border bg-surface p-4"
                  >
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-primary underline hover:text-primary/80"
                    >
                      {source.name}
                    </a>
                    <p className="mt-1 text-sm">{source.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Discovery method */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                Raccolta dati: ufficiale e fallback
              </h2>
              <p className="mt-3">
                La fonte primaria e sempre il portale <strong>Scuola in Chiaro</strong> del
                Ministero, che fornisce le schede ufficiali di ogni istituto scolastico con i
                relativi sotto-portali (didattica, servizi, finanza, documenti, edilizia, PON).
              </p>
              <p className="mt-3">
                Quando la pagina ufficiale di una scuola risulta temporaneamente non raggiungibile,
                Scuolario conserva l&apos;ultimo dato valido raccolto e lo segna come{" "}
                <em>ultimo aggiornamento</em> con la data di verifica. Non vengono mai generati dati
                sintetici o stimati per colmare lacune.
              </p>
            </section>

            {/* Publication logic */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                Logica di pubblicazione (<code className="rounded bg-bg px-1.5 py-0.5 text-sm font-mono">publishedAt</code>)
              </h2>
              <p className="mt-3">
                Ogni entita nel sistema &mdash; regione, provincia, comune, scuola, tipologia, guida
                &mdash; ha un campo <code className="rounded bg-bg px-1.5 py-0.5 text-sm font-mono">publishedAt</code> che
                indica la data e l&apos;ora in cui la pagina e stata resa pubblica.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Se il campo e nullo</strong>: la pagina non e ancora stata pubblicata e non
                  e raggiungibile dal sito.
                </li>
                <li>
                  <strong>Se la data e nel futuro</strong>: la pagina e programmata ma non ancora
                  visibile.
                </li>
                <li>
                  <strong>Se la data e nel passato</strong>: la pagina e pubblica e navigabile.
                </li>
              </ul>
              <p className="mt-3">
                Questo meccanismo ci permette di pubblicare gradualmente i contenuti man mano che
                superano i controlli di qualita, senza esporre informazioni incomplete o non
                verificate.
              </p>
            </section>

            {/* Missing data policy */}
            <section>
              <h2 className="text-xl font-semibold text-text">Politica sui dati mancanti</h2>
              <p className="mt-3">
                La trasparenza sui limiti dei dati e un principio fondante di Scuolario.
                Quando un&apos;informazione non e disponibile dalla fonte ufficiale, adottiamo il
                seguente approccio:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Il campo viene mostrato come <em>&quot;non disponibile&quot;</em> o{" "}
                  <em>&quot;dato mancante&quot;</em> nella scheda della scuola.
                </li>
                <li>
                  Ogni scuola ha un indicatore di <strong>disponibilita dati</strong> che segnala
                  quali sezioni (didattica, servizi, finanza, documenti, edilizia, PON) hanno
                  informazioni effettivamente presenti.
                </li>
                <li>
                  Non viene mai inventato, stimato o interpolato alcun dato. Se manca, manca.
                </li>
                <li>
                  La lista dei campi mancanti e registrata internamente nel campo{" "}
                  <code className="rounded bg-bg px-1.5 py-0.5 text-sm font-mono">missingFields</code> di
                  ogni scheda scuola per garantire completa tracciabilita.
                </li>
              </ul>
            </section>

            {/* Last update */}
            <section>
              <h2 className="text-xl font-semibold text-text">Frequenza di aggiornamento</h2>
              <p className="mt-3">
                I dati vengono verificati e aggiornati periodicamente. Ogni scheda scuola riporta la
                data dell&apos;ultimo controllo nel campo{" "}
                <code className="rounded bg-bg px-1.5 py-0.5 text-sm font-mono">lastSourceCheckAt</code>.
                L&apos;obiettivo e un aggiornamento almeno mensile per le scuole gia pubblicate.
              </p>
            </section>
          </div>
      </div>
    </>
  );
}
