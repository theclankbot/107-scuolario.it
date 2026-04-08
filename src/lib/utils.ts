// ---------------------------------------------------------------------------
// Scuolario -- General-purpose utility functions
// ---------------------------------------------------------------------------

/**
 * Format a number using Italian locale conventions (dot as thousands
 * separator, comma as decimal separator).
 *
 * ```ts
 * formatNumber(1234)    // "1.234"
 * formatNumber(1234.5)  // "1.234,5"
 * ```
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("it-IT").format(n);
}

/**
 * Convert arbitrary text into a URL-friendly slug.
 *
 * - Lowercases the string
 * - Normalises Unicode accents (e.g. "citta" from "citta")
 * - Strips non-alphanumeric characters
 * - Collapses whitespace / hyphens into a single hyphen
 * - Trims leading / trailing hyphens
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s-]/g, "")   // remove non-alphanumeric
    .replace(/[\s-]+/g, "-")         // collapse whitespace / hyphens
    .replace(/^-+|-+$/g, "");        // trim leading / trailing hyphens
}

/**
 * Retrieve a deeply nested value from an object using a dot-separated path.
 *
 * ```ts
 * getNestedValue({ address: { full: "Via Roma 1" } }, "address.full")
 * // => "Via Roma 1"
 * ```
 *
 * Returns `undefined` when any segment along the path does not exist.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => {
    if (current === null || current === undefined) return undefined;
    return current[key];
  }, obj);
}

/**
 * Truncate a string to `maxLen` characters, appending an ellipsis when the
 * text is shortened. The truncation is word-aware: it will not cut in the
 * middle of a word when possible.
 */
export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;

  // Try to break at the last space before maxLen.
  const trimmed = text.slice(0, maxLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  const breakPoint = lastSpace > 0 ? lastSpace : maxLen;

  return `${text.slice(0, breakPoint)}...`;
}
