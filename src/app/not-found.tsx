import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
        Pagina non trovata
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-text sm:text-5xl">
        Questa pagina non e disponibile su Scuolario
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
        L&apos;indirizzo potrebbe essere errato oppure la pagina non e ancora stata
        pubblicata. Su Scuolario rendiamo visibili solo le schede che hanno
        superato i controlli di qualita e verificabilita delle fonti ufficiali.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
        >
          Torna alla home
        </Link>
        <Link
          href="/comuni"
          className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary"
        >
          Sfoglia i comuni
        </Link>
      </div>
    </section>
  );
}