// The old-vs-new regime break-even grid.
//
// Everyone asks "which tax regime should I pick?" and every answer says "it
// depends on your deductions" without saying WHERE the line falls. This module
// computes that line: for a given gross salary, the exact rupee value of old-
// regime deductions at which the old regime stops costing more than the new one.
//
// Both tax functions are the ones already used by the calculators
// (lib/pseo-tax.ts), so this page can never disagree with the rest of the site.

import { computeNewRegimeTax, computeOldRegimeTax } from "./pseo-tax";

/** Gross salaries the published grid covers. */
export const BREAKEVEN_SALARIES: number[] = [
  600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000,
  1500000, 1600000, 1800000, 2000000, 2500000, 3000000, 4000000, 5000000,
];

/**
 * The realistic ceiling on old-regime deductions for a salaried person:
 * 80C ₹1.5L + 80CCD(1B) NPS ₹50k + 80D health insurance ₹75k (self + senior
 * parents) + home-loan interest ₹2L = ₹4.75L, before any HRA exemption.
 * Break-even values above this are flagged as practically unreachable for
 * someone without significant rent, since HRA is what pushes people past it.
 */
export const REALISTIC_DEDUCTION_CEILING = 475000;

export type BreakEvenRow = {
  gross: number;
  newRegimeTax: number;
  /**
   * Deductions (over and above the old regime's own ₹50,000 standard
   * deduction) needed for the old regime to match the new one. 0 means the old
   * regime already wins with no deductions at all; null means no achievable
   * deduction closes the gap.
   */
  breakEven: number | null;
  /** Old-regime tax if you claim nothing beyond the standard deduction. */
  oldRegimeTaxNoDeductions: number;
  reachable: boolean;
};

/**
 * Binary-search the deduction amount at which old-regime tax falls to the
 * new-regime figure. Old-regime tax is monotonically non-increasing in
 * deductions, so the search is well-behaved. Resolved to the nearest ₹500.
 */
export function breakEvenDeduction(gross: number): number | null {
  const newTax = computeNewRegimeTax(gross).totalTax;
  const oldAtZero = computeOldRegimeTax(gross, 0).totalTax;

  // Old regime already cheaper (or equal) without claiming anything.
  if (oldAtZero <= newTax) return 0;

  // Even wiping out the entire salary cannot get there. Shouldn't happen, but
  // guard rather than loop forever.
  if (computeOldRegimeTax(gross, gross).totalTax > newTax) return null;

  let lo = 0;
  let hi = gross;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (computeOldRegimeTax(gross, mid).totalTax > newTax) lo = mid;
    else hi = mid;
  }
  return Math.ceil(hi / 500) * 500;
}

export function breakEvenRow(gross: number): BreakEvenRow {
  const breakEven = breakEvenDeduction(gross);
  return {
    gross,
    newRegimeTax: computeNewRegimeTax(gross).totalTax,
    breakEven,
    oldRegimeTaxNoDeductions: computeOldRegimeTax(gross, 0).totalTax,
    reachable: breakEven !== null && breakEven <= REALISTIC_DEDUCTION_CEILING,
  };
}

export const BREAKEVEN_GRID: BreakEvenRow[] =
  BREAKEVEN_SALARIES.map(breakEvenRow);
