import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Brand from "./Brand";

const NAV_LINKS = [
  { label: "Regioni", href: "/regioni" },
  { label: "Province", href: "/province" },
  { label: "Tipologie", href: "/tipologie" },
  { label: "Confronta", href: "/confronta" },
  { label: "Guide", href: "/guide" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="rounded-md transition-opacity hover:opacity-90"
          aria-label="Scuolario"
        >
          <Brand compact />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-bg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu (client component) */}
        <MobileMenu />
      </div>
    </header>
  );
}
