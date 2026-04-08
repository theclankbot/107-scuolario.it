interface SourceBadgeProps {
  label?: string;
  url?: string;
}

export default function SourceBadge({
  label = "Fonte ufficiale",
  url,
}: SourceBadgeProps) {
  const badge = (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs font-medium text-secondary">
      <svg
        className="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
      {label}
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        {badge}
      </a>
    );
  }

  return badge;
}
