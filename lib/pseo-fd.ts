// Programmatic-SEO for FD landing pages: "FD on ₹X — maturity at common rates/tenures".
// These pages answer "how much will my FD be worth" for specific amounts.

export type FdBreakdown = {
  principal: number;
  rate: number;
  years: number;
  maturity: number;
  interest: number;
};

function computeFd(principal: number, rate: number, years: number): FdBreakdown {
  const freq = 4; // quarterly compounding (standard for most Indian banks)
  const maturity = principal * Math.pow(1 + rate / 100 / freq, freq * years);
  return { principal, rate, years, maturity, interest: maturity - principal };
}

/** The FD amounts (in rupees) that get their own landing page. */
export const FD_AMOUNTS: number[] = [
  5000, 10000, 25000, 50000, 75000,
  100000, 200000, 300000, 500000, 750000,
  1000000, 2000000, 2500000, 5000000, 10000000,
];

export function fdSlug(amount: number): string {
  if (amount >= 10000000) return `${amount / 10000000}-crore`;
  if (amount >= 100000) return `${amount / 100000}-lakh`;
  return String(amount);
}

export function parseFdSlug(slug: string): number | null {
  const crode = /^(\d+(?:\.\d+)?)-crore$/.exec(slug);
  if (crode) return Number(crode[1]) * 10000000;
  const lakh = /^(\d+(?:\.\d+)?)-lakh$/.exec(slug);
  if (lakh) return Number(lakh[1]) * 100000;
  const n = Number(slug);
  return Number.isFinite(n) && FD_AMOUNTS.includes(n) ? n : null;
}

export function fdLabel(amount: number): string {
  if (amount >= 10000000) return `Rs ${amount / 10000000} Crore`;
  if (amount >= 100000) return `Rs ${amount / 100000} Lakh`;
  return `Rs ${Number(amount).toLocaleString("en-IN")}`;
}

/** Common tenures (years) to show results for. */
export const FD_TENURES = [1, 2, 3, 5, 10];

/** Common interest rates to show. */
export const FD_RATES = [6, 6.5, 7, 7.5, 8];

/** Compute a grid: for each rate × tenure, show the result. */
export function computeGrid(principal: number) {
  const grid: { rate: number; tenure: number; maturity: number; interest: number }[] = [];
  for (const rate of FD_RATES) {
    for (const years of FD_TENURES) {
      const r = computeFd(principal, rate, years);
      grid.push({ rate: r.rate, tenure: r.years, maturity: r.maturity, interest: r.interest });
    }
  }
  return grid;
}

/** Slugs for sitemap. */
export const FD_SLUGS: string[] = FD_AMOUNTS.map(fdSlug);
