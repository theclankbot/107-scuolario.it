import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Termini di utilizzo",
  description:
    "Termini e condizioni di utilizzo del sito Scuolario. Regole sull'uso dei contenuti, limitazioni di responsabilita e accesso al servizio.",
  path: "/terms",
  noindex: true,
});

export default function TerminiPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema(
          "Termini di utilizzo",
          "Termini e condizioni di utilizzo di Scuolario.",
          "/terms",
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Termini di utilizzo", url: "/terms" },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Termini di utilizzo" },
            ]}
          />

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Termini di utilizzo
          </h1>

          <p className="mt-4 text-sm text-muted">
            Ultimo aggiornamento: 8 aprile 2026
          </p>

          <div className="mt-8 space-y-8 text-text-secondary leading-relaxed">
            {/* Premessa */}
            <section>
              <h2 className="text-xl font-semibold text-text">1. Premessa</h2>
              <p className="mt-3">
                I presenti Termini di utilizzo (di seguito &quot;Termini&quot;) regolano l&apos;accesso
                e l&apos;utilizzo del sito web Scuolario, raggiungibile all&apos;indirizzo{" "}
                <a
                  href="https://scuolario.it"
                  className="text-primary underline hover:text-primary/80"
                >
                  scuolario.it
                </a>{" "}
                (di seguito &quot;il Sito&quot;). Accedendo al Sito, l&apos;utente accetta
                integralmente i presenti Termini. Se non si accettano i Termini, si prega di non
                utilizzare il Sito.
              </p>
            </section>

            {/* Descrizione del servizio */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                2. Descrizione del servizio
              </h2>
              <p className="mt-3">
                Scuolario e un servizio informativo gratuito che raccoglie, organizza e presenta
                dati pubblici sulle scuole italiane provenienti da fonti istituzionali, in
                particolare dal portale Scuola in Chiaro del Ministero dell&apos;Istruzione e del
                Merito (MIM). Il Sito permette di cercare, consultare e confrontare le schede
                delle scuole per posizione geografica e tipologia.
              </p>
            </section>

            {/* Natura dei dati */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                3. Natura dei dati e limitazioni
              </h2>
              <p className="mt-3">
                I dati presentati su Scuolario provengono da fonti pubbliche istituzionali e
                vengono riprodotti cosi come resi disponibili dalle fonti originarie. Scuolario:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Non garantisce la completezza, l&apos;accuratezza o l&apos;aggiornamento in tempo
                  reale delle informazioni.
                </li>
                <li>
                  Non crea classifiche, punteggi o ranking delle scuole.
                </li>
                <li>
                  Non offre consulenza scolastica o educativa di alcun tipo.
                </li>
                <li>
                  Si impegna a segnalare chiaramente quando un dato non e disponibile o potrebbe
                  non essere aggiornato.
                </li>
              </ul>
              <p className="mt-3">
                Le informazioni presentate hanno scopo puramente informativo e non sostituiscono
                in alcun modo la consultazione diretta delle fonti ufficiali o il contatto con gli
                istituti scolastici.
              </p>
            </section>

            {/* Proprieta intellettuale */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                4. Proprieta intellettuale
              </h2>
              <p className="mt-3">
                Il design, il codice, i testi originali, la grafica e la struttura del Sito sono
                di proprieta di Scuolario e sono protetti dalle leggi sul diritto d&apos;autore.
              </p>
              <p className="mt-3">
                I dati sulle scuole sono di fonte pubblica (Scuola in Chiaro / MIM) e vengono
                ripubblicati a fini informativi. Scuolario non rivendica alcun diritto di proprieta
                sui dati originari delle fonti istituzionali.
              </p>
              <p className="mt-3">
                E vietata la riproduzione sistematica, il download massivo, lo scraping o la
                redistribuzione dei contenuti del Sito senza autorizzazione scritta.
              </p>
            </section>

            {/* Uso consentito */}
            <section>
              <h2 className="text-xl font-semibold text-text">5. Uso consentito</h2>
              <p className="mt-3">L&apos;utente si impegna a:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Utilizzare il Sito esclusivamente per scopi personali, informativi e non
                  commerciali.
                </li>
                <li>
                  Non tentare di accedere a parti non pubbliche del Sito o dei suoi sistemi.
                </li>
                <li>
                  Non utilizzare strumenti automatizzati per accedere al Sito in modo massivo
                  (bot, scraper, crawler non autorizzati).
                </li>
                <li>
                  Non ripubblicare i contenuti del Sito presentandoli come propri.
                </li>
              </ul>
            </section>

            {/* Limitazione di responsabilita */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                6. Limitazione di responsabilita
              </h2>
              <p className="mt-3">
                Il Sito e fornito &quot;cosi com&apos;e&quot; (&quot;as is&quot;) senza garanzie
                di alcun tipo, esplicite o implicite. Scuolario non e responsabile per:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Eventuali errori, omissioni o imprecisioni nei dati presentati.
                </li>
                <li>
                  Decisioni prese dall&apos;utente sulla base delle informazioni trovate sul Sito.
                </li>
                <li>
                  Interruzioni temporanee del servizio dovute a manutenzione, aggiornamenti o
                  problemi tecnici.
                </li>
                <li>
                  Contenuti o servizi offerti da siti terzi eventualmente collegati tramite link.
                </li>
              </ul>
            </section>

            {/* Link esterni */}
            <section>
              <h2 className="text-xl font-semibold text-text">7. Link esterni</h2>
              <p className="mt-3">
                Il Sito puo contenere link a siti web esterni, in particolare ai portali
                istituzionali delle fonti dati. Scuolario non ha alcun controllo sui contenuti di
                tali siti e non se ne assume la responsabilita. L&apos;inclusione di un link non
                implica approvazione o affiliazione.
              </p>
            </section>

            {/* Modifiche */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                8. Modifiche ai termini
              </h2>
              <p className="mt-3">
                Scuolario si riserva il diritto di modificare i presenti Termini in qualsiasi
                momento. Le modifiche saranno effettive dalla data di pubblicazione della versione
                aggiornata su questa pagina. L&apos;uso continuato del Sito dopo la pubblicazione
                delle modifiche costituisce accettazione dei nuovi Termini.
              </p>
            </section>

            {/* Legge applicabile */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                9. Legge applicabile e foro competente
              </h2>
              <p className="mt-3">
                I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia
                relativa all&apos;interpretazione o all&apos;applicazione dei presenti Termini sara
                competente in via esclusiva il Foro di Roma, salvo diversa disposizione
                inderogabile di legge a favore del consumatore.
              </p>
            </section>

            {/* Contatti */}
            <section>
              <h2 className="text-xl font-semibold text-text">10. Contatti</h2>
              <p className="mt-3">
                Per qualsiasi domanda relativa ai presenti Termini, scrivi a{" "}
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
