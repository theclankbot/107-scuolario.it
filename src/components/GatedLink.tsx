import clsx from "clsx";
import Link from "next/link";
import { isPublished } from "@/lib/publication";

interface GatedLinkProps {
  href: string;
  publishedAt: string | null;
  children: React.ReactNode;
  className?: string;
}

export default function GatedLink({
  href,
  publishedAt,
  children,
  className,
}: GatedLinkProps) {
  if (isPublished({ publishedAt })) {
    return (
      <Link href={href} className={clsx(className)}>
        {children}
      </Link>
    );
  }

  return (
    <span
      className={clsx("cursor-not-allowed text-muted", className)}
      title="Prossimamente"
      aria-label="Prossimamente"
    >
      {children}
    </span>
  );
}
