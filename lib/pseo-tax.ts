// Programmatic-SEO helpers for the "Income tax on ₹X salary" landing pages.
//
// The tax computation here follows the New Regime rules for FY 2026-27
// (AY 2027-28): ₹75,000 standard deduction, the 2026-27 new-regime slabs, the
// Section 87A rebate that zeroes tax up to ₹12L taxable income, surcharge with
// marginal relief above ₹50 lakh, and the 4% health & education cess charged on
// tax plus surcharge.
//
// NOTE: components/calc/IncomeTaxCalculator.tsx does not yet model surcharge,
// so above ₹50 lakh of taxable income the interactive calculator understates
// the liability that these pages report. The calculator needs the same
// surcharge and marginal-relief logic added before the two agree again.

type Slab = { upto: number; rate: number };

/**
 * The date a human last checked these slabs, surcharge bands and the standard
 * deduction against the Income Tax Department's published rules. Update this
 * by hand whenever any number in this file changes. It is deliberately NOT a
 * build-time new Date(): a page that rebuilds nightly must not claim it was
 * reviewed nightly.
 */
export const TAX_RULES_REVIEWED = "2026-09-04"; // ISO yyyy-mm-dd

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-09-04" -> "4 September 2026". Used for the visible reviewed line. */
export function formatReviewDate(iso: string = TAX_RULES_REVIEWED): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const month = MONTH_NAMES[Number(m[2]) - 1] ?? m[2];
  return `${Number(m[3])} ${month} ${m[1]}`;
}

// FY 2026-27 (AY 2027-28): New Regime slabs (identical to the calculator).
const NEW_SLABS: Slab[] = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.1 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.2 },
  { upto: 2400000, rate: 0.25 },
  { upto: Infinity, rate: 0.3 },
];

// Old Regime slabs (below 60 yrs), used only for the brief comparison note.
const OLD_SLABS: Slab[] = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 0.05 },
  { upto: 1000000, rate: 0.2 },
  { upto: Infinity, rate: 0.3 },
];

/**
 * Surcharge on the income tax, charged when TOTAL (taxable) income crosses a
 * threshold. It is a percentage of the tax, not of the income, and the 4% cess
 * is applied afterwards on tax plus surcharge.
 *
 * New regime (section 115BAC) caps surcharge at 25%: there is no 37% band.
 */
type SurchargeBand = { above: number; rate: number };

const NEW_SURCHARGE_BANDS: SurchargeBand[] = [
  { above: 5000000, rate: 0.1 }, // above Rs 50 lakh, up to Rs 1 crore
  { above: 10000000, rate: 0.15 }, // above Rs 1 crore, up to Rs 2 crore
  { above: 20000000, rate: 0.25 }, // above Rs 2 crore (new-regime ceiling)
];

// Old regime keeps the two higher bands the new regime dropped.
const OLD_SURCHARGE_BANDS: SurchargeBand[] = [
  { above: 5000000, rate: 0.1 },
  { above: 10000000, rate: 0.15 },
  { above: 20000000, rate: 0.25 },
  { above: 50000000, rate: 0.37 },
];

export type Surcharge = {
  /** Band rate applied, 0-1. Zero when income is at or below Rs 50 lakh. */
  rate: number;
  /** Income level that triggered the band (0 when no surcharge applies). */
  threshold: number;
  /** Surcharge before marginal relief. */
  beforeRelief: number;
  /** Marginal relief deducted from the surcharge (0 when none is due). */
  marginalRelief: number;
  /** Surcharge actually payable. */
  amount: number;
};

const NO_SURCHARGE: Surcharge = {
  rate: 0,
  threshold: 0,
  beforeRelief: 0,
  marginalRelief: 0,
  amount: 0,
};

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

/**
 * Surcharge with MARGINAL RELIEF.
 *
 * Without relief, income one rupee over Rs 50 lakh would attract a full 10%
 * surcharge, so the extra rupee of income would cost roughly Rs 1,08,000 of
 * extra tax. Marginal relief caps the surcharge so that the total of tax plus
 * surcharge never exceeds:
 *
 *   (tax plus surcharge on income exactly at the threshold) + (income above it)
 *
 * At the second and third bands the comparison is against the threshold taxed
 * at the PREVIOUS band's surcharge rate, which is what keeps each boundary
 * continuous rather than only the first one.
 */
function computeSurcharge(
  taxableIncome: number,
  taxAfterRebate: number,
  slabs: Slab[],
  bands: SurchargeBand[]
): Surcharge {
  if (taxAfterRebate <= 0) return NO_SURCHARGE;

  let band: SurchargeBand | null = null;
  let previousRate = 0;
  for (let i = 0; i < bands.length; i++) {
    if (taxableIncome > bands[i].above) {
      band = bands[i];
      previousRate = i > 0 ? bands[i - 1].rate : 0;
    }
  }
  if (!band) return NO_SURCHARGE;

  const beforeRelief = taxAfterRebate * band.rate;

  // Ceiling on tax plus surcharge, measured from the threshold.
  const taxAtThreshold = slabTax(band.above, slabs) * (1 + previousRate);
  const ceiling = taxAtThreshold + (taxableIncome - band.above);
  const marginalRelief = Math.max(
    0,
    taxAfterRebate + beforeRelief - ceiling
  );
  const amount = Math.max(0, beforeRelief - marginalRelief);

  return {
    rate: band.rate,
    threshold: band.above,
    beforeRelief,
    marginalRelief,
    amount,
  };
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
  tax: number; // slab tax after rebate, before surcharge and cess
  surcharge: number; // surcharge payable, after marginal relief
  surchargeRate: number; // band rate applied, 0-1 (0 when none applies)
  surchargeThreshold: number; // income level that triggered the band (0 if none)
  marginalRelief: number; // relief that reduced the surcharge (0 when none)
  cess: number; // 4% health & education cess, on tax PLUS surcharge
  totalTax: number; // tax + surcharge + cess
  inHandMonthly: number; // (gross − totalTax) / 12
  effectiveRate: number; // totalTax / gross, as a percentage (0-100)
};

/**
 * Pure New-Regime tax computation. The Section 87A rebate zeroes tax when
 * taxable income is at or below ₹12,00,000, which (with the ₹75,000 standard
 * deduction) makes salaries up to ₹12.75L tax-free. Above ₹50 lakh of taxable
 * income a surcharge applies on the tax, capped by marginal relief, and the 4%
 * cess is charged on tax plus surcharge.
 */
export function computeNewRegimeTax(gross: number): NewRegimeTax {
  const taxableIncome = Math.max(0, gross - 75000);
  const taxBeforeRebate = slabTax(taxableIncome, NEW_SLABS);
  const rebate = taxableIncome <= 1200000 ? taxBeforeRebate : 0;
  const tax = taxBeforeRebate - rebate;
  const sur = computeSurcharge(taxableIncome, tax, NEW_SLABS, NEW_SURCHARGE_BANDS);
  const cess = (tax + sur.amount) * 0.04;
  const totalTax = tax + sur.amount + cess;
  const inHandMonthly = (gross - totalTax) / 12;
  const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
  return {
    taxableIncome,
    taxBeforeRebate,
    rebate,
    tax,
    surcharge: sur.amount,
    surchargeRate: sur.rate,
    surchargeThreshold: sur.threshold,
    marginalRelief: sur.marginalRelief,
    cess,
    totalTax,
    inHandMonthly,
    effectiveRate,
  };
}

export type SlabRow = {
  from: number;
  to: number;
  rate: number; // 0-1
  amountInSlab: number;
  taxInSlab: number;
};

/**
 * Slab-by-slab breakdown of the New Regime tax for a given taxable income:
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
  taxBeforeRebate: number; // slab tax before the Section 87A rebate
  rebate: number; // Section 87A rebate applied
  tax: number; // slab tax after rebate, before surcharge and cess
  surcharge: number; // surcharge payable, after marginal relief
  surchargeRate: number; // band rate applied, 0-1
  marginalRelief: number;
  cess: number; // 4% cess on tax plus surcharge
  totalTax: number;
  effectiveRate: number;
};

/**
 * Old-Regime tax (below 60): ₹50,000 standard deduction plus any other
 * deductions, Section 87A rebate up to ₹5L taxable income, then surcharge with
 * marginal relief above ₹50 lakh and the 4% cess on tax plus surcharge.
 * Used for the old-vs-new comparison table on each page.
 */
export function computeOldRegimeTax(gross: number, deductions = 0): OldRegimeTax {
  const taxableIncome = Math.max(0, gross - 50000 - deductions);
  const taxBeforeRebate = slabTax(taxableIncome, OLD_SLABS);
  const rebate = taxableIncome <= 500000 ? taxBeforeRebate : 0; // Section 87A
  const tax = taxBeforeRebate - rebate;
  const sur = computeSurcharge(taxableIncome, tax, OLD_SLABS, OLD_SURCHARGE_BANDS);
  const cess = (tax + sur.amount) * 0.04;
  const totalTax = tax + sur.amount + cess;
  const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
  return {
    taxableIncome,
    taxBeforeRebate,
    rebate,
    tax,
    surcharge: sur.amount,
    surchargeRate: sur.rate,
    marginalRelief: sur.marginalRelief,
    cess,
    totalTax,
    effectiveRate,
  };
}

/**
 * Plain-English description of the surcharge band that applied, for page copy
 * so a reader can check the rule rather than trust the number. Returns an empty
 * string when no surcharge is due.
 */
export function surchargeBandLabel(rate: number, threshold: number): string {
  if (rate <= 0) return "";
  const pct = Number((rate * 100).toFixed(0));
  const bandTo =
    threshold === 5000000
      ? " and up to ₹1 crore"
      : threshold === 10000000
        ? " and up to ₹2 crore"
        : threshold === 20000000
          ? ""
          : "";
  const from =
    threshold >= CRORE
      ? `₹${trimNum(threshold / CRORE)} crore`
      : `₹${trimNum(threshold / LAKH)} lakh`;
  return `${pct}% on income above ${from}${bandTo}`;
}

/** Slugs for every generated salary page, consumed by the sitemap. */
export const TAX_SLUGS: string[] = TAX_SALARIES.map(salarySlug);
