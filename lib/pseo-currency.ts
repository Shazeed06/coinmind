// Programmatic-SEO data for the "X to INR" currency landing pages.
// One entry per pair drives /currency/[slug] (see app/currency/[slug]/page.tsx).
// Slugs are lowercase "from-to-to" (e.g. "usd-to-inr"). PAIR_SLUGS is what the
// sitemap should iterate to list every generated page.

export type CurrencyPair = { from: string; to: string };

// Currency code → full display name. Used in titles, copy and JSON-LD.
export const NAMES: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  AED: "UAE Dirham",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  SGD: "Singapore Dollar",
  JPY: "Japanese Yen",
  CNY: "Chinese Yuan",
  CHF: "Swiss Franc",
  NZD: "New Zealand Dollar",
  ZAR: "South African Rand",
  SAR: "Saudi Riyal",
  MYR: "Malaysian Ringgit",
  INR: "Indian Rupee",
};

// High-volume "<currency> to INR" searches — the core of the section.
const TO_INR_FROM = [
  "USD", "EUR", "GBP", "AED", "CAD", "AUD", "SGD",
  "JPY", "CNY", "CHF", "NZD", "ZAR", "SAR", "MYR",
] as const;

// A few popular reverse pairs (Indians searching what a rupee amount is worth).
const FROM_INR_TO = ["USD", "EUR", "GBP"] as const;

export const CURRENCY_PAIRS: CurrencyPair[] = [
  ...TO_INR_FROM.map((from) => ({ from, to: "INR" })),
  ...FROM_INR_TO.map((to) => ({ from: "INR", to })),
];

export function pairSlug({ from, to }: CurrencyPair): string {
  return `${from}-to-${to}`.toLowerCase();
}

// Full slug list — iterate this in the sitemap and in generateStaticParams.
export const PAIR_SLUGS: string[] = CURRENCY_PAIRS.map(pairSlug);

// Parse a slug back to a pair, but only if it's a known/allowed pair.
// Unknown or malformed slugs return null so the page can call notFound().
export function parsePairSlug(slug: string): CurrencyPair | null {
  const match = /^([a-z]{3})-to-([a-z]{3})$/.exec(slug.toLowerCase());
  if (!match) return null;
  const from = match[1].toUpperCase();
  const to = match[2].toUpperCase();
  const known = CURRENCY_PAIRS.some((p) => p.from === from && p.to === to);
  return known ? { from, to } : null;
}
