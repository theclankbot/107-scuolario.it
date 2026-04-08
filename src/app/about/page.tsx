import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Cos'e Scuolario | Chi siamo",
  description:
    "Scopri cos'e Scuolario, la missione del progetto, come funziona la pubblicazione dei dati e cosa non facciamo. Dati ufficiali dal MIM.",
  path: "/about",
});

export default function ChiSiamoPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema(
          "Cos'e Scuolario",
          "Scopri cos'e Scuolario, la missione del progetto e come funziona la pubblicazione dei dati.",
          "/about",
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Chi siamo", url: "/about" },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Chi siamo" },
            ]}
          />

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Cos&apos;e Scuolario
          </h1>

          <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-text">La nostra missione</h2>
              <p className="mt-3">
                Scuolario nasce con un obiettivo semplice: rendere le informazioni sulle scuole italiane
                piu accessibili, organizzate e facili da consultare. I dati ufficiali pubblicati dal
                Ministero dell&apos;Istruzione e del Merito attraverso il portale{" "}
                <a
                  href="https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  Scuola in Chiaro
                </a>{" "}
                sono ricchi e completi, ma non sempre di facile navigazione. Scuolario li raccoglie,
                li organizza per regione, provincia, comune e tipologia, e li presenta in un formato
                pensato per le famiglie, gli studenti e i docenti.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">Cosa facciamo</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Raccogliamo e strutturiamo i dati ufficiali dal portale Scuola in Chiaro / MIM.
                </li>
                <li>
                  Organizziamo le scuole per posizione geografica (regione, provincia, comune) e per
                  tipologia (infanzia, primaria, secondaria di primo e secondo grado, ecc.).
                </li>
                <li>
                  Permettiamo di confrontare piu scuole fianco a fianco su campi oggettivi come
                  servizi, dotazione tecnologica, documenti disponibili e contatti.
                </li>
                <li>
                  Indichiamo chiaramente quali dati sono disponibili e quali mancano per ogni scuola.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">Cosa non facciamo</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Non creiamo classifiche o ranking.</strong> Non assegniamo punteggi di
                  qualita alle scuole. Ogni famiglia ha esigenze diverse e non crediamo che un
                  numero possa riassumere il valore di un istituto.
                </li>
                <li>
                  <strong>Non inventiamo dati.</strong> Se un&apos;informazione non e disponibile dalla
                  fonte ufficiale, lo segnaliamo apertamente anziche riempire il vuoto con stime.
                </li>
                <li>
                  <strong>Non offriamo consulenza scolastica.</strong> Scuolario e uno strumento
                  informativo. Per orientamento personalizzato, consigliamo di rivolgersi agli
                  uffici scolastici territoriali.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">Logica di pubblicazione</h2>
              <p className="mt-3">
                Non tutte le pagine sono immediatamente pubbliche. Ogni entita (regione, provincia,
                comune, scuola, tipologia) ha un campo <code className="rounded bg-bg px-1.5 py-0.5 text-sm font-mono">publishedAt</code> che
                indica la data di pubblicazione. Una pagina viene resa visibile solo quando la data
                di pubblicazione e nel passato e i dati associati hanno superato i controlli di
                qualita minimi. Questo approccio garantisce che le informazioni mostrate siano
                coerenti e verificate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text">Contatti</h2>
              <p className="mt-3">
                Hai domande, suggerimenti o segnalazioni? Scrivici a{" "}
                <a
                  href="mailto:ciao@scuolario.it"
                  className="text-primary underline hover:text-primary/80"
                >
                  ciao@scuolario.it
                </a>
                .
              </p>
            </section>
          </div>
      </div>
    </>
  );
}
