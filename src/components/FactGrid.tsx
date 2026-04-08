interface Fact {
  label: string;
  value: string | null;
}

interface FactGridProps {
  facts: Fact[];
}

export default function FactGrid({ facts }: FactGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-lg border border-border bg-surface p-4"
        >
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            {fact.label}
          </dt>
          <dd
            className={
              fact.value !== null
                ? "mt-1 text-sm font-medium text-text"
                : "mt-1 text-sm italic text-muted"
            }
          >
            {fact.value ?? "Dato non disponibile"}
          </dd>
        </div>
      ))}
    </div>
  );
}
