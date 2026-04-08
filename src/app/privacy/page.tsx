import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Informativa sulla privacy di Scuolario. Scopri come trattiamo i tuoi dati personali, quali cookie utilizziamo e i tuoi diritti ai sensi del GDPR.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema(
          "Privacy Policy",
          "Informativa sulla privacy di Scuolario ai sensi del GDPR.",
          "/privacy",
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy" },
            ]}
          />

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-muted">
            Ultimo aggiornamento: 8 aprile 2026
          </p>

          <div className="mt-8 space-y-8 text-text-secondary leading-relaxed">
            {/* Titolare */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                1. Titolare del trattamento
              </h2>
              <p className="mt-3">
                Il titolare del trattamento dei dati personali e Scuolario, raggiungibile
                all&apos;indirizzo email{" "}
                <a
                  href="mailto:ciao@scuolario.it"
                  className="text-primary underline hover:text-primary/80"
                >
                  ciao@scuolario.it
                </a>
                .
              </p>
            </section>

            {/* Dati raccolti */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                2. Dati personali raccolti
              </h2>
              <p className="mt-3">
                Scuolario e un sito informativo che non richiede registrazione e non raccoglie dati
                personali identificativi in modo diretto. I dati che possono essere trattati sono:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Dati di navigazione:</strong> indirizzo IP (anonimizzato), tipo di browser,
                  sistema operativo, pagine visitate, data e ora di accesso. Questi dati vengono
                  raccolti automaticamente tramite Vercel Analytics.
                </li>
                <li>
                  <strong>Cookie tecnici:</strong> cookie strettamente necessari al funzionamento del
                  sito e alla memorizzazione delle preferenze (es. consenso cookie).
                </li>
                <li>
                  <strong>Dati forniti volontariamente:</strong> se ci contatti via email, trattiamo
                  il tuo indirizzo email e il contenuto del messaggio esclusivamente per rispondere
                  alla tua richiesta.
                </li>
              </ul>
            </section>

            {/* Finalita */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                3. Finalita del trattamento
              </h2>
              <p className="mt-3">I dati vengono trattati per le seguenti finalita:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Garantire il corretto funzionamento tecnico del sito web.
                </li>
                <li>
                  Analizzare in forma aggregata e anonima il traffico e l&apos;utilizzo del sito per
                  migliorarne contenuti e prestazioni.
                </li>
                <li>
                  Rispondere a comunicazioni ricevute via email.
                </li>
              </ul>
            </section>

            {/* Base giuridica */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                4. Base giuridica del trattamento
              </h2>
              <p className="mt-3">
                Il trattamento dei dati si fonda su:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Legittimo interesse</strong> (Art. 6.1.f GDPR): per i dati tecnici di
                  navigazione necessari al funzionamento e alla sicurezza del sito.
                </li>
                <li>
                  <strong>Consenso</strong> (Art. 6.1.a GDPR): per l&apos;eventuale utilizzo di cookie
                  non strettamente necessari, raccolto tramite il banner cookie.
                </li>
                <li>
                  <strong>Esecuzione di misure precontrattuali</strong> (Art. 6.1.b GDPR): per la
                  gestione delle comunicazioni inviate dall&apos;utente.
                </li>
              </ul>
            </section>

            {/* Cookie */}
            <section>
              <h2 className="text-xl font-semibold text-text">5. Cookie</h2>
              <p className="mt-3">
                Scuolario utilizza i seguenti tipi di cookie:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Cookie tecnici:</strong> necessari per il funzionamento del sito.
                  Includono il cookie di consenso che memorizza la tua scelta riguardo ai cookie.
                </li>
                <li>
                  <strong>Vercel Analytics:</strong> Scuolario utilizza Vercel Analytics per
                  raccogliere dati anonimi sull&apos;utilizzo del sito. Vercel Analytics e progettato
                  per essere rispettoso della privacy e non utilizza cookie di profilazione. I dati
                  raccolti sono aggregati e non permettono l&apos;identificazione personale. Per
                  maggiori informazioni:{" "}
                  <a
                    href="https://vercel.com/docs/analytics/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    Vercel Analytics Privacy Policy
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-3">
                Puoi gestire le preferenze sui cookie tramite il banner presente alla prima visita
                o attraverso le impostazioni del tuo browser.
              </p>
            </section>

            {/* Conservazione */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                6. Conservazione dei dati
              </h2>
              <p className="mt-3">
                I dati di navigazione vengono conservati in forma aggregata e anonima per un periodo
                massimo di 24 mesi. I dati forniti via email vengono conservati per il tempo
                necessario a gestire la richiesta e comunque non oltre 12 mesi dalla chiusura della
                comunicazione.
              </p>
            </section>

            {/* Terze parti */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                7. Condivisione con terze parti
              </h2>
              <p className="mt-3">
                I dati non vengono venduti, ceduti o condivisi con terze parti per finalita di
                marketing. I fornitori di servizi tecnici utilizzati sono:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Vercel Inc.</strong> &mdash; hosting del sito e analytics (sede: USA,
                  conformita garantita tramite Standard Contractual Clauses).
                </li>
              </ul>
            </section>

            {/* Diritti */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                8. I tuoi diritti (GDPR)
              </h2>
              <p className="mt-3">
                Ai sensi del Regolamento UE 2016/679 (GDPR), hai il diritto di:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Accedere ai tuoi dati personali.</li>
                <li>Richiedere la rettifica di dati inesatti.</li>
                <li>Richiedere la cancellazione dei tuoi dati (&quot;diritto all&apos;oblio&quot;).</li>
                <li>Limitare il trattamento dei tuoi dati.</li>
                <li>Opporti al trattamento dei tuoi dati.</li>
                <li>Richiedere la portabilita dei dati.</li>
                <li>Revocare il consenso in qualsiasi momento.</li>
                <li>
                  Presentare reclamo al Garante per la Protezione dei Dati Personali (
                  <a
                    href="https://www.garanteprivacy.it/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    www.garanteprivacy.it
                  </a>
                  ).
                </li>
              </ul>
              <p className="mt-3">
                Per esercitare i tuoi diritti, scrivi a{" "}
                <a
                  href="mailto:ciao@scuolario.it"
                  className="text-primary underline hover:text-primary/80"
                >
                  ciao@scuolario.it
                </a>
                .
              </p>
            </section>

            {/* Modifiche */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                9. Modifiche alla presente informativa
              </h2>
              <p className="mt-3">
                Scuolario si riserva il diritto di aggiornare questa informativa in qualsiasi
                momento. La data di ultimo aggiornamento e indicata in cima alla pagina. Ti
                invitiamo a consultare periodicamente questa pagina per restare informato sulle
                eventuali modifiche.
              </p>
            </section>
          </div>
      </div>
    </>
  );
}
