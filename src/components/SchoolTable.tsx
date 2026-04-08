import GatedLink from "./GatedLink";

interface SchoolRow {
  schoolCode: string;
  name: string;
  schoolTypeLabel?: string;
  address?: { full?: string };
  contacts?: {
    phone?: string | null;
    email?: string | null;
  };
  sourceUrl?: string;
  publishedAt: string | null;
}

interface SchoolTableProps {
  schools: SchoolRow[];
}

export default function SchoolTable({ schools }: SchoolTableProps) {
  if (schools.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        Nessuna scuola trovata.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-bg">
          <tr>
            <th className="px-4 py-3 font-semibold text-text">Nome scuola</th>
            <th className="px-4 py-3 font-semibold text-text">Tipologia</th>
            <th className="px-4 py-3 font-semibold text-text">Indirizzo</th>
            <th className="px-4 py-3 font-semibold text-text">Contatti</th>
            <th className="px-4 py-3 font-semibold text-text">
              Fonte ufficiale
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface">
          {schools.map((school) => (
            <tr
              key={school.schoolCode}
              className="hover:bg-bg/50 transition-colors"
            >
              {/* Nome */}
              <td className="px-4 py-3">
                <GatedLink
                  href={`/scuole/${school.schoolCode}`}
                  publishedAt={school.publishedAt}
                  className="font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  {school.name}
                </GatedLink>
              </td>
              {/* Tipologia */}
              <td className="px-4 py-3 text-text-secondary">
                {school.schoolTypeLabel ?? (
                  <span className="text-muted">-</span>
                )}
              </td>
              {/* Indirizzo */}
              <td className="px-4 py-3 text-text-secondary">
                {school.address?.full ?? (
                  <span className="text-muted">-</span>
                )}
              </td>
              {/* Contatti */}
              <td className="px-4 py-3 text-text-secondary">
                {school.contacts?.phone || school.contacts?.email ? (
                  <span className="space-y-0.5">
                    {school.contacts.phone && (
                      <span className="block">{school.contacts.phone}</span>
                    )}
                    {school.contacts.email && (
                      <a
                        href={`mailto:${school.contacts.email}`}
                        className="block text-primary hover:text-primary-dark transition-colors"
                      >
                        {school.contacts.email}
                      </a>
                    )}
                  </span>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
              {/* Fonte */}
              <td className="px-4 py-3">
                {school.sourceUrl ? (
                  <a
                    href={school.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-secondary hover:underline"
                  >
                    Fonte ufficiale
                  </a>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
