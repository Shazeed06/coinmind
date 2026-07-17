// Programmatic-SEO helpers for the "Income tax on ₹X salary" landing pages.
//
// The tax computation here is a PURE replica of the New Regime logic in
// components/calc/IncomeTaxCalculator.tsx (FY 2026-27 / AY 2027-28) so the
// numbers shown on every generated page MATCH the interactive calculator
// exactly: ₹75,000 standard deduction, the 2026-27 new-regime slabs, the
// Section 87A rebate that zeroes tax up to ₹12L taxable income, and the 4%
// health & education cess. Keep these in sync if the calculator changes.

type Slab = { upto: number; rate: number };

// FY 2026-27 (AY 2027-28) — New Regime slabs (identical to the calculator).
const NEW_SLABS: Slab[] = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.1 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.2 },
  { upto: 2400000, rate: 0.25 },
  { upto: Infinity, rate: 0.3 },
];

// Old Regime slabs (below 60 yrs) — used only for the brief comparison note.
const OLD_SLABS: Slab[] = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 0.05 },
  { upto: 1000000, rate: 0.2 },
  { upto: Infinity, rate: 0.3 },
];

function slabTax(taxable: number, slabs: Slab[]): number {
  let tax = 0;
  let lower = 0;
  for (const s of slabs) {
    if (taxable > lower) {
      const amt = Math.min(taxable, s.upto) - lower;
      tax += amt * s.rate;
      lower = s.upto;
    } else break;
  }
  return tax;
}

/** Annual gross salaries (₹) that get their own landing page. */
export const TAX_SALARIES: number[] = [
  600000, 700000, 800000, 900000, 1000000, 1200000, 1500000, 1800000, 2000000,
  2500000, 3000000, 4000000, 5000000, 7500000, 10000000,
];

const LAKH = 100000;
const CRORE = 10000000;

// Trim a number to a clean slug/label part: "12", "75", "1", "7.5".
function trimNum(n: number): string {
  return String(Number(n.toFixed(2)));
}

/**
 * 1200000 → "12-lakh", 7500000 → "75-lakh", 10000000 → "1-crore".
 * Uses lakh for values below ₹1 crore, crore for ₹1 crore and above.
 */
export function salarySlug(n: number): string {
  if (n >= CRORE) return `${trimNum(n / CRORE)}-crore`;
  return `${trimNum(n / LAKH)}-lakh`;
}

/**
 * Reverse of salarySlug: "12-lakh" → 1200000, "1-crore" → 10000000.
 * Returns null for anything that isn't a valid lakh/crore slug.
 */
export function parseSalarySlug(slug: string): number | null {
  const m = /^(\d+(?:\.\d+)?)-(lakh|crore)$/.exec(slug);
  if (!m) return null;
  const value = Number(m[1]);
  if (!Number.isFinite(value)) return null;
  return Math.round(value * (m[2] === "crore" ? CRORE : LAKH));
}

/** Human-readable amount label: 1200000 → "12 Lakh", 10000000 → "1 Crore". */
export function salaryLabel(n: number): string {
  if (n >= CRORE) return `${trimNum(n / CRORE)} Crore`;
  return `${trimNum(n / LAKH)} Lakh`;
}

export type NewRegimeTax = {
  taxableIncome: number; // gross minus ₹75,000 standard deduction
  taxBeforeRebate: number; // slab tax before the Section 87A rebate
  rebate: number; // Section 87A rebate applied (equals taxBeforeRebate when eligible)
  tax: number; // tax after rebate, before cess
  cess: number; // 4% health & education cess
  totalTax: number; // tax + cess — the number the calculator shows
  inHandMonthly: number; // (gross − totalTax) / 12
  effectiveRate: number; // totalTax / gross, as a percentage (0–100)
};

/**
 * Pure New-Regime tax computation, replicating IncomeTaxCalculator.tsx exactly.
 * The Section 87A rebate zeroes tax when taxable income is ≤ ₹12,00,000, which
 * (with the ₹75,000 standard deduction) makes salaries up to ₹12.75L tax-free.
 */
export function computeNewRegimeTax(gross: number): NewRegimeTax {
  const taxableIncome = Math.max(0, gross - 75000);
  const taxBeforeRebate = slabTax(taxableIncome, NEW_SLABS);
  const rebate = taxableIncome <= 1200000 ? taxBeforeRebate : 0;
  const tax = taxBeforeRebate - rebate;
  const cess = tax * 0.04;
  const totalTax = tax + cess;
  const inHandMonthly = (gross - totalTax) / 12;
  const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
  return {
    taxableIncome,
    taxBeforeRebate,
    rebate,
    tax,
    cess,
    totalTax,
    inHandMonthly,
    effectiveRate,
  };
}

export type SlabRow = {
  from: number;
  to: number;
  rate: number; // 0–1
  amountInSlab: number;
  taxInSlab: number;
};

/**
 * Slab-by-slab breakdown of the New Regime tax for a given taxable income —
 * returns only the slabs that actually apply. Powers the per-salary tax table
 * so every page has genuinely unique, useful content (not a doorway page).
 */
export function newRegimeSlabBreakdown(taxableIncome: number): SlabRow[] {
  const rows: SlabRow[] = [];
  let lower = 0;
  for (const s of NEW_SLABS) {
    if (taxableIncome > lower) {
      const to = Math.min(taxableIncome, s.upto);
      const amountInSlab = to - lower;
      rows.push({
        from: lower,
        to,
        rate: s.rate,
        amountInSlab,
        taxInSlab: amountInSlab * s.rate,
      });
      lower = s.upto;
    } else break;
  }
  return rows;
}

export type OldRegimeTax = {
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
};

/**
 * Old-Regime tax (below 60), matching the calculator: ₹50,000 standard
 * deduction plus any other deductions, rebate up to ₹5L taxable, 4% cess.
 * Used for a brief, honest old-vs-new comparison on each page.
 */
export function computeOldRegimeTax(gross: number, deductions = 0): OldRegimeTax {
  const taxableIncome = Math.max(0, gross - 50000 - deductions);
  let tax = slabTax(taxableIncome, OLD_SLABS);
  if (taxableIncome <= 500000) tax = 0; // Section 87A rebate
  const totalTax = tax * 1.04;
  const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
  return { taxableIncome, totalTax, effectiveRate };
}

/** Slugs for every generated salary page — consumed by the sitemap. */
export const TAX_SLUGS: string[] = TAX_SALARIES.map(salarySlug);
