"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "Regioni", href: "/regioni" },
  { label: "Province", href: "/province" },
  { label: "Tipologie", href: "/tipologie" },
  { label: "Confronta", href: "/confronta" },
  { label: "Guide", href: "/guide" },
] as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-text hover:bg-bg focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setOpen((v: boolean) => !v)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      {/* Slide-down panel */}
      <div
        className={clsx(
          "md:hidden absolute left-0 right-0 top-full border-b border-border bg-surface shadow-md transition-all duration-200 ease-in-out",
          open
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden pointer-events-none",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-text hover:bg-bg hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
