// Number & currency formatting helpers used across calculators.

export type Currency = "INR" | "USD" | "GBP";

export const currencyMeta: Record<
  Currency,
  { symbol: string; locale: string; label: string }
> = {
  INR: { symbol: "₹", locale: "en-IN", label: "₹ INR" },
  USD: { symbol: "$", locale: "en-US", label: "$ USD" },
  GBP: { symbol: "£", locale: "en-GB", label: "£ GBP" },
};

export function formatCurrency(value: number, currency: Currency = "INR"): string {
  const { locale } = currencyMeta[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatNumber(value: number, currency: Currency = "INR"): string {
  const { locale } = currencyMeta[currency];
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    Math.round(value)
  );
}

// Compact Indian-style / international readouts (e.g. big corpus values).
export function formatCompact(value: number, currency: Currency = "INR"): string {
  const { locale, symbol } = currencyMeta[currency];
  const compact = new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Math.round(value));
  return `${symbol}${compact}`;
}
