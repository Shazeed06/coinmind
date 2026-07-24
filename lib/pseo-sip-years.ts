// Programmatic SEO for "₹X SIP for N years" — the second axis on the SIP
// cluster. /sip/[amount]-per-month already covers the amount axis and shows a
// 5-30 year table; these pages answer the far more specific query people
// actually type ("5000 sip returns in 10 years") with one duration in focus.
//
// Competitor evidence: sipplan.in ranks for this query shape on a ~24-page
// site, and page 1 for these long-tails contains no large incumbents.
//
// The future-value maths is imported from lib/pseo-sip.ts, which is itself a
// replica of components/calc/SipCalculator.tsx — so the amount pages, the
// duration pages and the interactive calculator can never disagree.

import { SIP_AMOUNTS, sipFutureValue } from "./pseo-sip";

/** Durations (years) that get their own page for each amount. */
export const SIP_YEARS: number[] = [3, 5, 10, 15, 20, 25, 30];

/**
 * The return rates shown on every page. Publishing a range rather than a
 * single number is deliberate: equity returns are not a promise, and rival
 * pages quoting one figure imply a certainty that does not exist.
 */
export const SIP_RATES: number[] = [8, 10, 12, 15];

/** The rate used for the headline figure and the meta description. */
export const SIP_HEADLINE_RATE = 12;

/** 5000, 10 → "5000-per-month-for-10-years" */
export function sipYearSlug(monthly: number, years: number): string {
  return `${monthly}-per-month-for-${years}-years`;
}

export type SipYearParams = { monthly: number; years: number };

/** Reverse of sipYearSlug — null unless both values are in our curated lists. */
export function parseSipYearSlug(slug: string): SipYearParams | null {
  const m = /^(\d+)-per-month-for-(\d+)-years$/.exec(slug);
  if (!m) return null;
  const monthly = Number(m[1]);
  const years = Number(m[2]);
  if (!SIP_AMOUNTS.includes(monthly)) return null;
  if (!SIP_YEARS.includes(years)) return null;
  return { monthly, years };
}

export type SipProjection = {
  monthly: number;
  years: number;
  rate: number;
  invested: number;
  corpus: number;
  gain: number;
  /** Gain as a multiple of what was invested, e.g. 1.93x. */
  multiple: number;
};

export function projectSip(
  monthly: number,
  years: number,
  rate: number
): SipProjection {
  const invested = monthly * years * 12;
  const corpus = sipFutureValue(monthly, rate, years);
  return {
    monthly,
    years,
    rate,
    invested,
    corpus,
    gain: corpus - invested,
    multiple: invested > 0 ? corpus / invested : 0,
  };
}

/** The rate table shown on each page. */
export function rateScenarios(monthly: number, years: number): SipProjection[] {
  return SIP_RATES.map((r) => projectSip(monthly, years, r));
}

/**
 * The cost of starting late: what the same SIP would be worth if begun 3 and 5
 * years from now instead of today, at the headline rate. This is the single
 * most persuasive number on the page and nobody in this SERP publishes it.
 */
export function delayCost(
  monthly: number,
  years: number
): { delay: number; corpus: number; lost: number }[] {
  const base = projectSip(monthly, years, SIP_HEADLINE_RATE).corpus;
  return [3, 5].map((delay) => {
    const shorter = Math.max(0, years - delay);
    const corpus = sipFutureValue(monthly, SIP_HEADLINE_RATE, shorter);
    return { delay, corpus, lost: base - corpus };
  });
}

/** Every generated slug — consumed by the sitemap and IndexNow. */
export const SIP_YEAR_SLUGS: string[] = SIP_AMOUNTS.flatMap((m) =>
  SIP_YEARS.map((y) => sipYearSlug(m, y))
);
