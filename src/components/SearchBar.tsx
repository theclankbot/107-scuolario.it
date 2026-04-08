"use client";

import { useState, useRef, useCallback } from "react";
import clsx from "clsx";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "Cerca scuole, comuni, province...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query.trim()) {
        // Navigate to search results (can be enhanced later)
        window.location.href = `/cerca?q=${encodeURIComponent(query.trim())}`;
      }
    },
    [query],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <div
        className={clsx(
          "flex items-center rounded-lg border bg-surface transition-shadow",
          focused
            ? "border-primary shadow-sm ring-1 ring-primary/20"
            : "border-border",
        )}
      >
        {/* Search icon */}
        <div className="pointer-events-none pl-3 text-muted">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-2.5 px-3 text-sm text-text placeholder:text-muted focus:outline-none"
          aria-label="Cerca"
        />

        {/* Clear button */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-1 rounded p-1.5 text-muted hover:text-text-secondary transition-colors"
            aria-label="Cancella ricerca"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="mr-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Cerca
        </button>
      </div>
    </form>
  );
}
