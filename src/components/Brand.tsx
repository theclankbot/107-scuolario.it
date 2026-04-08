import clsx from "clsx";

interface BrandProps {
  compact?: boolean;
  className?: string;
}

export default function Brand({ compact = false, className }: BrandProps) {
  return (
    <span className={clsx("inline-flex items-center gap-3", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className={clsx("shrink-0", compact ? "h-8 w-8" : "h-9 w-9")}
      >
        <rect x="8" y="10" width="48" height="44" rx="14" fill="#0F5E9C" />
        <path d="M18 22.5L32 16l14 6.5-14 6.5-14-6.5Z" fill="#F2A65A" />
        <path d="M22 29.5v11.5c0 1.2.7 2.3 1.8 2.8L32 48l8.2-4.2c1.1-.5 1.8-1.6 1.8-2.8V29.5" fill="#FFFFFF" opacity="0.95" />
        <path d="M32 29v19" stroke="#0F5E9C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M25.5 36.5h13" stroke="#0F5E9C" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={clsx("font-bold tracking-tight text-primary", compact ? "text-xl" : "text-lg sm:text-xl")}>
          Scuolario
        </span>
        {!compact && (
          <span className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
            Dati ufficiali scuole Italia
          </span>
        )}
      </span>
    </span>
  );
}