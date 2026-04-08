import clsx from "clsx";

interface AvailabilityPillProps {
  available: boolean;
  label: string;
}

export default function AvailabilityPill({
  available,
  label,
}: AvailabilityPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        available
          ? "bg-success/10 text-success"
          : "bg-muted/10 text-muted",
      )}
    >
      <span
        className={clsx(
          "h-1.5 w-1.5 rounded-full",
          available ? "bg-success" : "bg-muted",
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
