import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Contatti",
  description:
    "Contatta il team di Scuolario per domande, suggerimenti o segnalazioni sui dati delle scuole italiane.",
  path: "/contact",
  noindex: true,
});

export default function ContattiPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema(
          "Contatti",
          "Come contattare il team di Scuolario.",
          "/contact",
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contatti", url: "/contact" },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Contatti" },
            ]}
          />

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Contatti
          </h1>

          <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
            <p>
              Hai domande sui dati, suggerimenti per migliorare il sito, o vuoi segnalare
              un&apos;informazione errata? Siamo a disposizione.
            </p>

            <p>
              Scuolario e un progetto indipendente dedicato a rendere piu accessibili le
              informazioni sulle scuole italiane. Apprezziamo ogni segnalazione che ci aiuta a
              migliorare la qualita e la completezza dei dati.
            </p>

            {/* Email block */}
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold text-text">Scrivici</h2>
              <p className="mt-2">
                Puoi raggiungerci via email al seguente indirizzo:
              </p>
              <p className="mt-4">
                <a
                  href="mailto:ciao@scuolario.it"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  ciao@scuolario.it
                </a>
              </p>
            </div>

            <section>
              <h2 className="text-lg font-semibold text-text">Quando scrivirci</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Segnalazione errori:</strong> se noti un dato errato o non aggiornato in
                  una scheda scuola, indicaci il codice meccanografico e il campo interessato.
                </li>
                <li>
                  <strong>Suggerimenti:</strong> idee per nuove funzionalita, miglioramenti
                  all&apos;interfaccia o nuovi tipi di confronto.
                </li>
                <li>
                  <strong>Domande generali:</strong> chiarimenti su come funziona il sito, da dove
                  provengono i dati, o sulla logica di pubblicazione.
                </li>
                <li>
                  <strong>Collaborazioni:</strong> sei un ente, un&apos;associazione o un giornalista
                  e vuoi collaborare? Scrivici.
                </li>
              </ul>
            </section>

            <p className="text-sm text-muted">
              Cerchiamo di rispondere a tutte le email entro 5 giorni lavorativi.
            </p>
          </div>
      </div>
    </>
  );
}
