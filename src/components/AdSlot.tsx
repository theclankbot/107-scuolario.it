import clsx from "clsx";

interface AdSlotProps {
  slot?: string;
  className?: string;
}

export default function AdSlot({ slot, className }: AdSlotProps) {
  return (
    <div
      className={clsx(
        "flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-border bg-bg text-xs text-muted",
        className,
      )}
      data-ad-slot={slot}
      aria-hidden="true"
    >
      <span>Spazio pubblicitario</span>
    </div>
  );
}
