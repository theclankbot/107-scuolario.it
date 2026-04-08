import GatedLink from "./GatedLink";
import { formatNumber } from "@/lib/utils";

interface RegionCardProps {
  region: {
    slug: string;
    name: string;
    publishedProvinceCount?: number;
    publishedSchoolCount?: number;
    publishedAt: string | null;
  };
}

export default function RegionCard({ region }: RegionCardProps) {
  return (
    <GatedLink
      href={`/regioni/${region.slug}`}
      publishedAt={region.publishedAt}
      className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
        {region.name}
      </h3>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
        {region.publishedProvinceCount != null && (
          <span>
            {formatNumber(region.publishedProvinceCount)}{" "}
            {region.publishedProvinceCount === 1 ? "provincia" : "province"}
          </span>
        )}
        {region.publishedSchoolCount != null && (
          <span>
            {formatNumber(region.publishedSchoolCount)}{" "}
            {region.publishedSchoolCount === 1 ? "scuola" : "scuole"}
          </span>
        )}
      </div>
    </GatedLink>
  );
}
