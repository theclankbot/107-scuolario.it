import GatedLink from "./GatedLink";

interface GuideCardProps {
  guide: {
    slug: string;
    title: string;
    intro?: string;
    publishedAt: string | null;
  };
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <GatedLink
      href={`/guide/${guide.slug}`}
      publishedAt={guide.publishedAt}
      className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
        {guide.title}
      </h3>
      {guide.intro && (
        <p className="mt-2 text-sm text-text-secondary line-clamp-3 leading-relaxed">
          {guide.intro}
        </p>
      )}
      <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
        Leggi la guida &rarr;
      </span>
    </GatedLink>
  );
}
