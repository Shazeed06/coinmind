// Programmatic-SEO helpers for the "₹X LPA in-hand salary" landing pages.
//
// The computation here is a PURE replica of
// components/calc/TakeHomeSalaryCalculator.tsx (India, new regime, FY 2026-27)
// so every generated page matches the interactive calculator exactly:
// Basic = 50% of CTC, employer PF 12% of basic, gratuity 4.81% of basic,
// employee PF 12% of basic, professional tax ₹2,400/yr, ₹75,000 standard
// deduction and the Section 87A rebate that zeroes tax up to ₹12L taxable.
// Keep these in sync if the calculator changes.
//
// NOTE ON INTENT — these pages answer "what lands in my bank account each
// month", which is deliberately a DIFFERENT question from /income-tax/[slug]
// ("how much tax do I pay"). The two clusters cross-link rather than overlap.

type Slab = [upto: number, rate: number];

// New regime slabs FY 2026-27 — identical to the calculator.
const SLABS: Slab[] = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Infinity, 0.3],
];

/** New-regime tax including 4% cess, with the Section 87A rebate. */
function newRegimeTax(taxable: number): number {
  if (taxable <= 1200000) return 0; // Section 87A rebate
  let tax = 0;
  let lower = 0;
  for (const [upto, rate] of SLABS) {
    if (taxable > lower) {
      tax += (Math.min(taxable, upto) - lower) * rate;
      lower = upto;
    } else break;
  }
  return tax * 1.04; // + 4% health & education cess
}

/**
 * The CTC values (in lakh per annum) that get their own landing page.
 * Chosen from real Google autocomplete demand for "<X> lpa in hand salary",
 * which surfaces both whole and half steps from 3 LPA up to 40+ LPA.
 */
export const INHAND_LPA: number[] = [
  // Half-steps below 10 LPA — autocomplete shows heavy demand for 3.5, 4.5,
  // 6.5 etc., which the round-number-only competitors do not cover.
  2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
  10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
  17.5, 18, 18.5, 19, 19.5, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34,
  35, 36, 38, 40, 42, 45, 48, 50, 55, 60, 65, 70, 75, 80, 90, 100,
];

const LAKH = 100000;

/** 12 → "12-lpa", 16.5 → "16.5-lpa". */
export function lpaSlug(lpa: number): string {
  return `${Number(lpa.toFixed(1))}-lpa`;
}

/** Reverse of lpaSlug — returns null for anything not in INHAND_LPA. */
export function parseLpaSlug(slug: string): number | null {
  const m = /^(\d+(?:\.\d+)?)-lpa$/.exec(slug);
  if (!m) return null;
  const value = Number(m[1]);
  if (!Number.isFinite(value)) return null;
  return INHAND_LPA.includes(value) ? value : null;
}

/** 12 → "12 LPA", 16.5 → "16.5 LPA". */
export function lpaLabel(lpa: number): string {
  return `${Number(lpa.toFixed(1))} LPA`;
}

export type InHandBreakdown = {
  ctc: number;
  basic: number;
  employerPF: number;
  gratuity: number;
  gross: number;
  employeePF: number;
  profTax: number;
  taxableIncome: number;
  tax: number;
  totalDeductions: number;
  netAnnual: number;
  monthly: number;
  takeHomePct: number;
};

/**
 * CTC → in-hand, replicating TakeHomeSalaryCalculator.tsx exactly.
 * `basicPct` is exposed so the page can show how the answer moves when a
 * company structures basic differently — the single biggest reason two
 * "in-hand salary" sites quote different numbers for the same CTC.
 */
export function computeInHand(lpa: number, basicPct = 50): InHandBreakdown {
  const ctc = lpa * LAKH;
  const basic = (ctc * basicPct) / 100;
  const employerPF = 0.12 * basic;
  const gratuity = 0.0481 * basic;
  const gross = ctc - employerPF - gratuity;
  const employeePF = 0.12 * basic;
  const profTax = 2400;
  const taxableIncome = Math.max(0, gross - 75000);
  const tax = newRegimeTax(taxableIncome);
  const totalDeductions = employeePF + profTax + tax;
  const netAnnual = gross - totalDeductions;
  return {
    ctc,
    basic,
    employerPF,
    gratuity,
    gross,
    employeePF,
    profTax,
    taxableIncome,
    tax,
    totalDeductions,
    netAnnual,
    monthly: netAnnual / 12,
    takeHomePct: ctc > 0 ? (netAnnual / ctc) * 100 : 0,
  };
}

/**
 * Monthly in-hand across the common basic-salary structures (40 / 45 / 50 /
 * 55 / 60% of CTC). Publishing this openly is the whole point: rival pages
 * quote a single number without saying which structure it assumes, which is
 * why they disagree by thousands of rupees for the same CTC.
 */
export function basicPctScenarios(
  lpa: number
): { basicPct: number; monthly: number; tax: number }[] {
  return [40, 45, 50, 55, 60].map((basicPct) => {
    const r = computeInHand(lpa, basicPct);
    return { basicPct, monthly: r.monthly, tax: r.tax };
  });
}

/** Slugs for every generated page — consumed by the sitemap and IndexNow. */
export const INHAND_SLUGS: string[] = INHAND_LPA.map(lpaSlug);
