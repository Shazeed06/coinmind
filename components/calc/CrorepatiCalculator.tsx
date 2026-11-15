"use client";

import { useState, useMemo, useCallback } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { CurrencyToggle, Field, Stat, Donut } from "./shared";
import Link from "next/link";

const TARGET_PRESETS = [
  { label: "₹50 Lakh", val: 5000000 },
  { label: "₹1 Crore", val: 10000000 },
  { label: "₹2 Crore", val: 20000000 },
  { label: "₹5 Crore", val: 50000000 },
];

const TENURE_PRESETS = [
  { label: "5 Yrs", val: 5 },
  { label: "7 Yrs", val: 7 },
  { label: "10 Yrs", val: 10 },
  { label: "15 Yrs", val: 15 },
  { label: "20 Yrs", val: 20 },
];

function solveRequiredSip(target: number, annualRate: number, years: number, stepUpPct: number) {
  const n = years * 12;
  const i = annualRate / 100 / 12;

  if (stepUpPct === 0) {
    // Standard flat SIP formula: FV = P * (( (1+i)^n - 1 ) / i) * (1+i)
    if (i === 0) {
      const p = target / n;
      return { requiredMonthly: Math.round(p), totalInvested: Math.round(target), gains: 0 };
    }
    const factor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const p = target / factor;
    const invested = p * n;
    return { requiredMonthly: Math.round(p), totalInvested: Math.round(invested), gains: Math.round(target - invested) };
  }

  // Step-up SIP: binary search for initial monthly P
  let low = 100;
  let high = target;
  let bestP = low;

  for (let iter = 0; iter < 40; iter++) {
    const mid = (low + high) / 2;
    let fv = 0;
    let currentP = mid;
    for (let month = 1; month <= n; month++) {
      if (month > 1 && (month - 1) % 12 === 0) {
        currentP *= 1 + stepUpPct / 100;
      }
      fv += currentP * Math.pow(1 + i, n - month + 1);
    }

    if (fv >= target) {
      bestP = mid;
      high = mid;
    } else {
      low = mid;
    }
  }

  // Calculate actual total invested
  let totalInvested = 0;
  let currentP = bestP;
  for (let month = 1; month <= n; month++) {
    if (month > 1 && (month - 1) % 12 === 0) {
      currentP *= 1 + stepUpPct / 100;
    }
    totalInvested += currentP;
  }

  return {
    requiredMonthly: Math.round(bestP),
    totalInvested: Math.round(totalInvested),
    gains: Math.max(0, Math.round(target - totalInvested)),
  };
}

function computeMilestones(
  initialP: number,
  annualRate: number,
  years: number,
  stepUpPct: number,
  target: number
) {
  const n = years * 12;
  const i = annualRate / 100 / 12;
  let corpus = 0;
  let currentP = initialP;
  let cumInvested = 0;
  const yearlyRoadmap: { year: number; monthlySip: number; invested: number; corpus: number }[] = [];

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      corpus = (corpus + currentP) * (1 + i);
      cumInvested += currentP;
    }
    yearlyRoadmap.push({
      year,
      monthlySip: Math.round(currentP),
      invested: Math.round(cumInvested),
      corpus: Math.round(corpus),
    });
    if (stepUpPct > 0) {
      currentP *= 1 + stepUpPct / 100;
    }
  }

  return yearlyRoadmap;
}

export default function CrorepatiCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [targetCorpus, setTargetCorpus] = useState(10000000); // 1 Crore default
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [stepUp, setStepUp] = useState(10);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const { requiredMonthly, totalInvested, gains } = useMemo(() => {
    return solveRequiredSip(targetCorpus, returnRate, years, stepUp);
  }, [targetCorpus, returnRate, years, stepUp]);

  const roadmap = useMemo(() => {
    return computeMilestones(requiredMonthly, returnRate, years, stepUp, targetCorpus);
  }, [requiredMonthly, returnRate, years, stepUp, targetCorpus]);

  const wealthMultiplier = totalInvested > 0 ? (targetCorpus / totalInvested).toFixed(1) : "1.0";

  const handleCopy = useCallback(() => {
    const text = `₹1 Crore Goal Plan (CoinMind Crorepati Calculator):
Target Corpus: ${formatCurrency(targetCorpus, currency)}
Time Horizon: ${years} Years | Expected Return: ${returnRate}% p.a.
Annual Step-Up: ${stepUp}%
Required Starting Monthly SIP: ${formatCurrency(requiredMonthly, currency)}
Your Total Investment: ${formatCurrency(totalInvested, currency)}
Wealth Generated (Gains): ${formatCurrency(gains, currency)}
Compounding Multiplier: ${wealthMultiplier}x
Create your goal roadmap at https://coinmind.in/calculators/crorepati-calculator`;
    navigator.clipboard.writeText(text);
  }, [targetCorpus, years, returnRate, stepUp, requiredMonthly, totalInvested, gains, wealthMultiplier, currency]);

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
      {/* Input Configuration */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl text-ink">Crorepati Blueprint</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        {/* Target Corpus */}
        <div className="mt-5 space-y-3">
          <Field
            label="Target Wealth Corpus"
            value={targetCorpus}
            onChange={setTargetCorpus}
            min={1000000}
            max={100000000}
            step={500000}
            prefix="₹"
            hint="The target lump sum amount you want to accumulate."
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-ink-faint mr-1">Quick:</span>
            {TARGET_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setTargetCorpus(p.val)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  targetCorpus === p.val
                    ? "bg-forest text-white"
                    : "bg-paper-2 text-ink-soft hover:bg-paper-3 hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tenure Horizon */}
        <div className="mt-6 space-y-3">
          <Field
            label="Time Horizon (Years to reach goal)"
            value={years}
            onChange={setYears}
            min={3}
            max={30}
            step={1}
            suffix="yrs"
            hint="Number of years you can stay invested consistently."
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-ink-faint mr-1">Preset:</span>
            {TENURE_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setYears(p.val)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  years === p.val
                    ? "bg-forest text-white"
                    : "bg-paper-2 text-ink-soft hover:bg-paper-3 hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expected Returns */}
        <div className="mt-6">
          <Field
            label="Expected Annual Return (%)"
            value={returnRate}
            onChange={setReturnRate}
            min={8}
            max={22}
            step={0.5}
            suffix="%"
            hint="Nifty 50 historical 15-year CAGR is ~12-13%; Flexi/Mid-cap funds average ~14-15%."
          />
        </div>

        {/* Annual Step-Up Boost */}
        <div className="mt-6">
          <Field
            label="Annual Step-Up Increase (%)"
            value={stepUp}
            onChange={setStepUp}
            min={0}
            max={25}
            step={1}
            suffix="%"
            hint="Increasing SIP by 10% each year with salary hikes lowers your starting monthly burden significantly."
          />
        </div>

        {/* Toggle Year Roadmap */}
        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
          <span className="text-xs text-ink-faint">
            View exact year-by-year compounding progression
          </span>
          <button
            type="button"
            onClick={() => setShowRoadmap(!showRoadmap)}
            className="text-xs font-medium text-forest hover:underline"
          >
            {showRoadmap ? "Hide Year Roadmap" : "Show Year Roadmap →"}
          </button>
        </div>

        {/* Roadmap Table */}
        {showRoadmap && (
          <div className="mt-4 max-h-64 overflow-y-auto rounded-xl border border-line">
            <table className="w-full text-xs">
              <thead className="bg-paper-2 sticky top-0">
                <tr className="text-ink-faint font-semibold uppercase tracking-wider">
                  <th className="p-2 text-left">Year</th>
                  <th className="p-2 text-right">Monthly SIP</th>
                  <th className="p-2 text-right">Total Invested</th>
                  <th className="p-2 text-right">Corpus Built</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {roadmap.map((r) => (
                  <tr key={r.year} className="hover:bg-paper-2 transition-colors">
                    <td className="p-2 font-medium text-ink">Year {r.year}</td>
                    <td className="p-2 text-right text-ink-soft">
                      {formatCurrency(r.monthlySip, currency)}
                    </td>
                    <td className="p-2 text-right text-ink-soft">
                      {formatCurrency(r.invested, currency)}
                    </td>
                    <td className="p-2 text-right font-semibold text-forest">
                      {formatCompact(r.corpus, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Output Summary Card */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">
              Required Monthly SIP
            </p>
            <span className="rounded-md bg-forest/10 px-2 py-0.5 text-xs font-semibold text-forest">
              {years} Years Goal
            </span>
          </div>

          <p className="mt-2 font-display text-3xl sm:text-4xl font-600 text-forest break-words">
            {formatCurrency(requiredMonthly, currency)}
          </p>
          <p className="text-xs text-ink-faint mt-0.5">
            {stepUp > 0 ? `Starting monthly SIP (stepped up by ${stepUp}% yearly)` : "Fixed monthly SIP throughout tenure"}
          </p>

          {/* Visual Donut Breakdown */}
          <div className="mt-6">
            <Donut
              primary={totalInvested}
              secondary={gains}
              primaryLabel="Your Principal"
              secondaryLabel="Wealth Generated"
              size={170}
            />
          </div>

          {/* Stats Breakdown */}
          <div className="mt-5 space-y-1">
            <Stat
              label="Target Goal"
              value={formatCompact(targetCorpus, currency)}
              accent="forest"
            />
            <Stat
              label="Total Money Invested"
              value={formatCompact(totalInvested, currency)}
              accent="ink"
            />
            <Stat
              label="Estimated Gains (Returns)"
              value={formatCompact(gains, currency)}
              accent="brass"
            />
            <Stat
              label="Wealth Multiplier"
              value={`${wealthMultiplier}x your investment`}
              accent="forest"
            />
          </div>

          {/* Golden Rule Insight */}
          <div className="mt-5 rounded-xl border border-line bg-card p-3.5 text-xs leading-relaxed text-ink-soft">
            <strong className="text-ink font-semibold block mb-1">
              ⚡ The Compounding Secret:
            </strong>
            Notice how out of {formatCompact(targetCorpus, currency)}, your pocket only invests{" "}
            <span className="font-semibold text-ink">{formatCompact(totalInvested, currency)}</span>.
            The remaining <span className="font-semibold text-forest">{formatCompact(gains, currency)}</span> is
            generated purely by compounding returns!
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-line flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-2 text-xs font-medium text-ink-soft hover:text-forest hover:border-forest transition-colors"
          >
            📋 Copy SIP plan
          </button>
          <Link
            href="/calculators/step-up-sip"
            className="inline-flex items-center gap-1.5 rounded-lg bg-forest/10 px-3 py-2 text-xs font-semibold text-forest hover:bg-forest/20 transition-colors ml-auto"
          >
            Step-Up SIP Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}
