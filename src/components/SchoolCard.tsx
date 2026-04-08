import GatedLink from "./GatedLink";

export interface SchoolCardSchool {
  schoolCode: string;
  name: string;
  schoolTypeLabel?: string;
  cityName?: string;
  address?: { full?: string };
  publishedAt: string | null;
}

interface SchoolCardProps {
  school: SchoolCardSchool;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <GatedLink
      href={`/scuole/${school.schoolCode}`}
      publishedAt={school.publishedAt}
      className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
        {school.name}
      </h3>

      <div className="mt-2 space-y-1 text-sm text-text-secondary">
        {school.schoolTypeLabel && (
          <p className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
              />
            </svg>
            <span>{school.schoolTypeLabel}</span>
          </p>
        )}
        {school.cityName && (
          <p className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span>{school.cityName}</span>
          </p>
        )}
        {school.address?.full && (
          <p className="text-xs text-muted truncate pl-5.5">
            {school.address.full}
          </p>
        )}
      </div>
    </GatedLink>
  );
}
