// Programmatic-SEO data + pure math for the "SIP of ₹X per month" landing pages
// (app/sip/[slug]). The future-value maths here MUST match
// components/calc/SipCalculator.tsx exactly so the numbers shown on these pages
// agree with the interactive calculator embedded on them.

// Monthly SIP amounts (in ₹) we generate a landing page for. Chosen to match the
// round numbers people actually search for ("5000 sip for 20 years", etc.).
export const SIP_AMOUNTS: number[] = [
  500, 1000, 1500, 2000, 2500, 3000, 5000, 7000, 10000, 15000, 20000, 25000,
  50000,
];

// 5000 -> "5000-per-month"
export function sipSlug(monthly: number): string {
  return `${monthly}-per-month`;
}

// Pre-computed slug list — also imported by app/sitemap.ts to list these pages.
export const SIP_SLUGS: string[] = SIP_AMOUNTS.map(sipSlug);

// "5000-per-month" -> 5000, but only for amounts we actually generate. Any other
// slug (typos, arbitrary numbers) returns null so the page can call notFound().
export function parseSipSlug(slug: string): number | null {
  const match = /^(\d+)-per-month$/.exec(slug);
  if (!match) return null;
  const monthly = Number(match[1]);
  return SIP_AMOUNTS.includes(monthly) ? monthly : null;
}

// Future value of a monthly SIP with monthly compounding:
//   FV = P × [ ((1 + i)^n − 1) / i ] × (1 + i)
// where i = annualRate / 12 / 100 and n = years × 12.
// This mirrors the formula in SipCalculator.tsx line-for-line, including the
// i === 0 guard, so both surfaces always produce the same corpus.
export function sipFutureValue(
  monthly: number,
  annualRatePct: number,
  years: number
): number {
  const n = years * 12;
  const i = annualRatePct / 100 / 12;
  return i === 0
    ? monthly * n
    : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}
