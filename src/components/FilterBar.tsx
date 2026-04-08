"use client";

import { useState, useCallback } from "react";

interface SchoolTypeOption {
  slug: string;
  label: string;
}

interface FilterBarProps {
  schoolTypes: SchoolTypeOption[];
  onFilter: (selectedSlug: string | null) => void;
}

export default function FilterBar({ schoolTypes, onFilter }: FilterBarProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value || null;
      setSelected(value);
      onFilter(value);
    },
    [onFilter],
  );

  const handleReset = useCallback(() => {
    setSelected(null);
    onFilter(null);
  }, [onFilter]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label htmlFor="school-type-filter" className="sr-only">
        Filtra per tipologia
      </label>
      <select
        id="school-type-filter"
        value={selected ?? ""}
        onChange={handleChange}
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
      >
        <option value="">Tutte le tipologie</option>
        {schoolTypes.map((st) => (
          <option key={st.slug} value={st.slug}>
            {st.label}
          </option>
        ))}
      </select>

      {selected && (
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-text-secondary hover:bg-bg transition-colors"
        >
          Rimuovi filtro
        </button>
      )}
    </div>
  );
}
