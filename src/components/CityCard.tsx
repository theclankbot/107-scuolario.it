import GatedLink from "./GatedLink";
import { formatNumber } from "@/lib/utils";

interface CityCardProps {
  city: {
    slug: string;
    name: string;
    provinceName?: string;
    schoolCount?: number;
    publishedAt: string | null;
  };
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <GatedLink
      href={`/comuni/${city.slug}`}
      publishedAt={city.publishedAt}
      className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
        {city.name}
      </h3>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
        {city.provinceName && <span>{city.provinceName}</span>}
        {city.schoolCount != null && (
          <span>
            {formatNumber(city.schoolCount)}{" "}
            {city.schoolCount === 1 ? "scuola" : "scuole"}
          </span>
        )}
      </div>
    </GatedLink>
  );
}
