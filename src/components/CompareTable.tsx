import type { School } from "@/lib/types";
import { getNestedValue } from "@/lib/utils";

/** Human-readable field labels for known dot-paths. */
const FIELD_LABELS: Record<string, string> = {
  name: "Nome",
  schoolTypeLabel: "Tipologia",
  cityName: "Comune",
  provinceName: "Provincia",
  legalStatus: "Stato giuridico",
  "address.full": "Indirizzo",
  "contacts.phone": "Telefono",
  "contacts.email": "Email",
  "contacts.pec": "PEC",
  "contacts.website": "Sito web",
  "source.scuolaInChiaroUrl": "Scuola in Chiaro",
  "servicesSummary.transport": "Trasporto",
  "servicesSummary.canteen": "Mensa",
  "servicesSummary.afterSchool": "Doposcuola",
  "servicesSummary.disabilitySupport": "Supporto disabilità",
  "financeSummary.perStudentExpense": "Spesa per studente",
};

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "Dato non disponibile";
  if (typeof value === "boolean") return value ? "Si" : "No";
  if (typeof value === "number") return value.toLocaleString("it-IT");
  return String(value);
}

interface CompareTableProps {
  schools: School[];
  fields: string[];
}

export default function CompareTable({ schools, fields }: CompareTableProps) {
  if (schools.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        Nessuna scuola da confrontare.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-bg">
          <tr>
            <th className="sticky left-0 bg-bg px-4 py-3 font-semibold text-text">
              Campo
            </th>
            {schools.map((school) => (
              <th
                key={school.schoolCode}
                className="min-w-[200px] px-4 py-3 font-semibold text-text"
              >
                {school.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface">
          {fields.map((field) => (
            <tr key={field} className="hover:bg-bg/50 transition-colors">
              <td className="sticky left-0 bg-surface px-4 py-3 font-medium text-text whitespace-nowrap">
                {FIELD_LABELS[field] ?? field}
              </td>
              {schools.map((school) => {
                const raw = getNestedValue(
                  school as unknown as Record<string, unknown>,
                  field,
                );
                const display = formatCell(raw);
                const isMissing =
                  raw === null || raw === undefined;
                return (
                  <td
                    key={school.schoolCode}
                    className={
                      isMissing
                        ? "px-4 py-3 text-muted italic"
                        : "px-4 py-3 text-text-secondary"
                    }
                  >
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
