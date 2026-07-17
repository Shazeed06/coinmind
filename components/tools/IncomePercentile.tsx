"use client";

import { useMemo, useState } from "react";
import { formatCurrency, type Currency } from "@/lib/format";

type CountryId = "IN" | "US" | "UK";
type Basis = "annual" | "monthly";

interface Country {
  id: CountryId;
  name: string;
  currency: Currency;
  symbol: string;
  /* [approx. annual income in local currency, percentile of earners].
     These are ROUGH, round estimates loosely based on public income data
     (individual pre-tax income) — not precise figures. They exist to give a
     fun ballpark, not a statistically exact ranking. */
  anchors: [number, number][];
}

const COUNTRIES: Country[] = [
  {
    id: "IN",
    name: "India",
    currency: "INR",
    symbol: "₹",
    anchors: [
      [0, 0],
      [40_000, 10],
      [90_000, 25],
      [200_000, 40],
      [350_000, 50],
      [700_000, 75],
      [1_300_000, 90],
      [2_200_000, 95],
      [5_500_000, 99],
      [12_000_000, 99.9],
    ],
  },
  {
    id: "US",
    name: "United States",
    currency: "USD",
    symbol: "$",
    anchors: [
      [0, 0],
      [8_000, 10],
      [22_000, 25],
      [40_000, 50],
      [70_000, 75],
      [120_000, 90],
      [180_000, 95],
      [400_000, 99],
      [1_000_000, 99.9],
    ],
  },
  {
    id: "UK",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    anchors: [
      [0, 0],
      [8_000, 10],
      [16_000, 25],
      [30_000, 50],
      [45_000, 75],
      [62_000, 90],
      [80_000, 95],
      [180_000, 99],
      [450_000, 99.9],
    ],
  },
];

/* Piecewise-linear lookup: given an annual income, find the approximate
   percentile of earners below it. Monotonic, clamped, and never NaN. */
function percentileForIncome(annual: number, anchors: [number, number][]): number {
  if (!Number.isFinite(annual) || annual <= 0) return 0;
  const top = anchors[anchors.length - 1];
  if (annual >= top[0]) return top[1]; // cap at the highest anchor (never claims 100%)
  for (let i = 0; i < anchors.length - 1; i++) {
    const [x0, p0] = anchors[i];
    const [x1, p1] = anchors[i + 1];
    if (annual >= x0 && annual <= x1) {
      const t = x1 === x0 ? 0 : (annual - x0) / (x1 - x0);
      return p0 + t * (p1 - p0);
    }
  }
  return 0;
}

function verdict(pct: number): { title: string; note: string } {
  if (pct >= 99)
    return {
      title: "The 1% club",
      note: "You out-earn almost everyone in the country by income. Genuinely rare air — though whether you feel rich still depends on savings, assets and where you live.",
    };
  if (pct >= 95)
    return {
      title: "Top-tier earner",
      note: "You're in roughly the top 5% by income. Comfortably high — just remember income isn't the same thing as wealth.",
    };
  if (pct >= 90)
    return {
      title: "High earner",
      note: "You're around the top 10%. You out-earn the vast majority of people in the country.",
    };
  if (pct >= 75)
    return {
      title: "Well above average",
      note: "You out-earn about three in four people. Solidly comfortable on income alone.",
    };
  if (pct >= 50)
    return {
      title: "Above the median",
      note: "You earn more than most people in the country — a healthy place to be.",
    };
  if (pct >= 25)
    return {
      title: "Middle of the pack",
      note: "You're around the middle of the income range. Plenty of room to grow, and your local cost of living matters a lot.",
    };
  return {
    title: "Just getting started",
    note: "You're near the start of the income range here. Early-career, part-time and student incomes often sit around this level.",
  };
}

const selectClass =
  "w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest";

export default function IncomePercentile() {
  const [countryId, setCountryId] = useState<CountryId>("IN");
  const [basis, setBasis] = useState<Basis>("annual");
  const [amount, setAmount] = useState("350000");

  const country = useMemo(
    () => COUNTRIES.find((c) => c.id === countryId) ?? COUNTRIES[0],
    [countryId],
  );

  const handleAmount = (raw: string) => {
    // Digits + a single decimal point only — no minus, no clamping while typing.
    let cleaned = raw.replace(/[^\d.]/g, "");
    const firstDot = cleaned.indexOf(".");
    if (firstDot !== -1) {
      cleaned =
        cleaned.slice(0, firstDot + 1) +
        cleaned.slice(firstDot + 1).replace(/\./g, "");
    }
    setAmount(cleaned);
  };

  const selectCountry = (id: CountryId) => {
    setCountryId(id);
  };

  // Parse the typed amount; blank / partial entries yield NaN.
  const amountNum = useMemo(() => {
    const t = amount.trim();
    if (t === "" || t === ".") return NaN;
    const n = Number(t);
    return Number.isFinite(n) ? n : NaN;
  }, [amount]);

  const annualIncome = useMemo(() => {
    if (!Number.isFinite(amountNum) || amountNum <= 0) return NaN;
    return basis === "monthly" ? amountNum * 12 : amountNum;
  }, [amountNum, basis]);

  const pct = useMemo(
    () => percentileForIncome(annualIncome, country.anchors),
    [annualIncome, country],
  );

  const hasResult = Number.isFinite(annualIncome) && annualIncome > 0;
  const topPct = Math.max(0.1, 100 - pct);

  // Big "more than X%" number — one decimal at the very top so it never rounds to 100.
  const pctLabel = pct >= 99 ? pct.toFixed(1) : String(Math.round(pct));
  const topLabel = topPct < 1 ? topPct.toFixed(1) : String(Math.round(topPct));
  const gaugeFill = Math.max(1, Math.min(100, pct));

  const monthly = basis === "monthly" ? amountNum : annualIncome / 12;
  const v = verdict(pct);

  return (
    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your income</h2>

        <div className="mt-5 space-y-6">
          {/* Country */}
          <div>
            <label
              htmlFor="ip-country"
              className="text-sm font-medium text-ink-soft"
            >
              Country
            </label>
            <select
              id="ip-country"
              value={countryId}
              onChange={(e) => selectCountry(e.target.value as CountryId)}
              className={`mt-1.5 ${selectClass}`}
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Income basis */}
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">
              Income basis
            </p>
            <div
              role="group"
              aria-label="Income basis"
              className="inline-flex rounded-lg border border-line-strong bg-card p-0.5"
            >
              <button
                type="button"
                aria-pressed={basis === "annual"}
                onClick={() => setBasis("annual")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  basis === "annual"
                    ? "bg-forest text-white"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                Annual
              </button>
              <button
                type="button"
                aria-pressed={basis === "monthly"}
                onClick={() => setBasis("monthly")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  basis === "monthly"
                    ? "bg-forest text-white"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="ip-amount"
              className="text-sm font-medium text-ink-soft"
            >
              {basis === "monthly" ? "Monthly income" : "Annual income"} (before
              tax)
            </label>
            <div className="mt-1.5 flex items-center rounded-lg border border-line-strong bg-card px-3 py-2.5 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/25 transition-colors">
              <span className="text-sm text-ink-faint mr-1.5">
                {country.symbol}
              </span>
              <input
                id="ip-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => handleAmount(e.target.value)}
                placeholder="0"
                aria-label={`${basis === "monthly" ? "Monthly" : "Annual"} income in ${country.currency}`}
                className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
              />
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              {hasResult ? (
                <>
                  That&apos;s about{" "}
                  <strong className="text-ink-soft">
                    {formatCurrency(annualIncome, country.currency)}
                  </strong>{" "}
                  a year
                  {basis === "annual" && Number.isFinite(monthly) ? (
                    <>
                      {" "}
                      (
                      {formatCurrency(monthly, country.currency)}/mo)
                    </>
                  ) : null}
                  .
                </>
              ) : (
                <>Enter your income to see where you rank.</>
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-paper-2 border border-line p-4 text-xs text-ink-soft leading-relaxed">
          These reference figures are{" "}
          <strong className="text-ink">rough estimates</strong> of individual
          pre-tax income based on public data. Real distributions vary by source
          and year, so treat the result as a fun ballpark, not an exact ranking.
        </div>
      </div>

      {/* Result card */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Where you rank in {country.name}
        </p>

        {hasResult ? (
          <>
            <p className="mt-2 font-display text-6xl font-600 text-forest leading-none">
              {pctLabel}
              <span className="text-3xl">%</span>
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              You earn more than about{" "}
              <strong className="text-ink">{pctLabel}%</strong> of earners in{" "}
              {country.name} — putting you in the{" "}
              <strong className="text-ink">top {topLabel}%</strong>.
            </p>

            {/* Gauge */}
            <div className="mt-6" aria-live="polite">
              <div className="relative h-3 rounded-full bg-line-strong overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${gaugeFill}%`,
                    background:
                      "linear-gradient(90deg, var(--color-forest), var(--color-brass))",
                    transition: "width 0.5s ease",
                  }}
                />
                <div
                  className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-forest"
                  style={{
                    left: `${gaugeFill}%`,
                    boxShadow: "0 1px 4px rgba(30,64,175,0.4)",
                    transition: "left 0.5s ease",
                  }}
                  aria-hidden="true"
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-ink-faint">
                <span>Lowest</span>
                <span>Median</span>
                <span>Top earners</span>
              </div>
            </div>

            {/* Verdict */}
            <div className="mt-6 rounded-xl bg-card border border-line p-4">
              <p className="font-display text-lg font-600 text-ink">
                {v.title}
              </p>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                {v.note}
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 font-display text-6xl font-600 text-ink-faint leading-none">
              —
            </p>
            <p className="mt-3 text-sm text-ink-faint">
              Enter an income on the left and we&apos;ll estimate your income
              percentile.
            </p>
          </>
        )}

        <p className="mt-6 text-[11px] text-ink-faint leading-relaxed">
          Rough estimate from approximate public income data — not financial
          advice, and not a precise or official statistic. Income is only one
          part of being &ldquo;rich&rdquo;.
        </p>
      </div>
    </div>
  );
}
