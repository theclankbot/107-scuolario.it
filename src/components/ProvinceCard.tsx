import GatedLink from "./GatedLink";
import { formatNumber } from "@/lib/utils";

interface ProvinceCardProps {
  province: {
    slug: string;
    name: string;
    sigla: string;
    schoolCount?: number;
    publishedAt: string | null;
    regionSlug?: string;
  };
}

export default function ProvinceCard({ province }: ProvinceCardProps) {
  const href = province.regionSlug
    ? `/regioni/${province.regionSlug}/${province.slug}`
    : `/province/${province.slug}`;

  return (
    <GatedLink
      href={href}
      publishedAt={province.publishedAt}
      className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
          {province.name}
        </h3>
        <span className="inline-flex items-center rounded-full bg-bg px-2 py-0.5 text-xs font-medium text-text-secondary">
          {province.sigla}
        </span>
      </div>
      {province.schoolCount != null && (
        <p className="mt-2 text-sm text-text-secondary">
          {formatNumber(province.schoolCount)}{" "}
          {province.schoolCount === 1 ? "scuola" : "scuole"}
        </p>
      )}
    </GatedLink>
  );
}
