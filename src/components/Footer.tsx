import Link from "next/link";
import Brand from "./Brand";

const EXPLORE_LINKS = [
  { label: "Regioni", href: "/regioni" },
  { label: "Province", href: "/province" },
  { label: "Comuni", href: "/comuni" },
  { label: "Tipologie", href: "/tipologie" },
] as const;

const RESOURCE_LINKS = [
  { label: "Guide", href: "/guide" },
  { label: "Confronta", href: "/confronta" },
  { label: "Fonti dati", href: "/data-sources" },
] as const;

const INFO_LINKS = [
  { label: "Chi siamo", href: "/about" },
  { label: "Contatti", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Termini", href: "/terms" },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex rounded-md transition-opacity hover:opacity-90"
              aria-label="Scuolario"
            >
              <Brand />
            </Link>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Trova e confronta le scuole italiane. Dati ufficiali, aggiornati e
              facili da consultare.
            </p>
          </div>

          <FooterColumn title="Esplora" links={EXPLORE_LINKS} />
          <FooterColumn title="Risorse" links={RESOURCE_LINKS} />
          <FooterColumn title="Informazioni" links={INFO_LINKS} />
        </div>

        {/* Trust note & copyright */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            Dati da Scuola in Chiaro / MIM &mdash; Ministero dell&apos;Istruzione e del Merito
          </p>
          <p className="text-xs text-muted">
            &copy; {year} Scuolario. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
