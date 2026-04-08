// ---------------------------------------------------------------------------
// Scuolario -- Publication gating utilities
// ---------------------------------------------------------------------------
// Every publishable entity carries a `publishedAt: string | null` field.
// These helpers provide a consistent way to gate rendering so that
// unpublished or future-dated content never leaks to public pages.
// ---------------------------------------------------------------------------

type Publishable = { publishedAt: string | null };

/**
 * Returns `true` when the entity has a non-null `publishedAt` date that is
 * in the past (or exactly now).
 */
export function isPublished(entity: Publishable): boolean {
  if (!entity.publishedAt) return false;
  return new Date(entity.publishedAt) <= new Date();
}

/**
 * Filter an array down to only the items that are currently published.
 */
export function filterPublished<T extends Publishable>(items: T[]): T[] {
  return items.filter(isPublished);
}

/**
 * Determine the publication status of an entity.
 *
 * - `"published"`   -- publishedAt is set and in the past / now.
 * - `"upcoming"`    -- publishedAt is set but in the future.
 * - `"unpublished"` -- publishedAt is null.
 */
export function getPublicationStatus(
  entity: Publishable
): "published" | "upcoming" | "unpublished" {
  if (!entity.publishedAt) return "unpublished";
  return new Date(entity.publishedAt) <= new Date() ? "published" : "upcoming";
}
