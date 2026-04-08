import GatedLink from "./GatedLink";
import { formatNumber } from "@/lib/utils";

interface SchoolTypeCardProps {
  type: {
    slug: string;
    label: string;
    schoolCount?: number;
    publishedAt: string | null;
  };
}

export default function SchoolTypeCard({ type }: SchoolTypeCardProps) {
  return (
    <GatedLink
      href={`/tipologie/${type.slug}`}
      publishedAt={type.publishedAt}
      className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
        {type.label}
      </h3>
      {type.schoolCount != null && (
        <p className="mt-2 text-sm text-text-secondary">
          {formatNumber(type.schoolCount)}{" "}
          {type.schoolCount === 1 ? "scuola" : "scuole"}
        </p>
      )}
    </GatedLink>
  );
}
