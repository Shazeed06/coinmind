"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatCompact } from "@/lib/format";
import { Field, Stat } from "./shared";

export default function FireCalculator() {
  const [currentAge, setCurrentAge] = useState(28);
  const [targetAge, setTargetAge] = useState(45);
  const [monthlyExpenses, setMonthlyExpenses] = useState(60000);
  const [inflation, setInflation] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySaving, setMonthlySaving] = useState(40000);

  const result = useMemo(() => {
    const yearsToFire = Math.max(1, targetAge - currentAge);
    // How long retirement lasts (assuming 90 year life)
    const retirementYears = Math.max(1, 90 - targetAge);

    // Inflation-adjusted monthly expense at FIRE date
    const futureMonthly = monthlyExpenses * Math.pow(1 + inflation / 100, yearsToFire);
    const annualExpenses = futureMonthly * 12;

    // FIRE number (25× rule: 4% safe withdrawal rate)
    const fireNumber = annualExpenses * 25;

    // Also compute using more conservative perpetuity approach
    const perpetuityRate = Math.max(0.001, (expectedReturn / 100 - inflation / 100) / (1 + inflation / 100));
    const fireNumberConservative = annualExpenses / perpetuityRate;

    // Projected corpus from current savings + monthly SIP
    const monthlyRate = expectedReturn / 100 / 12;
    const months = yearsToFire * 12;
    const futureCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);
    const futureSip =
      monthlyRate === 0
        ? monthlySaving * months
        : monthlySaving * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const projectedCorpus = futureCurrentSavings + futureSip;

    // Gap
    const gap = fireNumber - projectedCorpus;

    // Additional monthly SIP needed if gap > 0
    const additionalSip =
      gap <= 0
        ? 0
        : monthlyRate === 0
          ? gap / months
          : gap / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    const savingsRate =
      monthlyExpenses + monthlySaving > 0
        ? (monthlySaving / (monthlyExpenses + monthlySaving)) * 100
        : 0;

    const onTrack = projectedCorpus >= fireNumber;

    return {
      fireNumber,
      fireNumberConservative,
      projectedCorpus,
      gap: Math.max(0, gap),
      additionalSip,
      savingsRate,
      futureMonthly,
      yearsToFire,
      retirementYears,
      onTrack,
    };
  }, [
    currentAge,
    targetAge,
    monthlyExpenses,
    inflation,
    expectedReturn,
    currentSavings,
    monthlySaving,
  ]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl text-ink">Your FIRE inputs</h2>
        <p className="mt-1 text-xs text-ink-faint">Financial Independence, Retire Early</p>
        <div className="mt-6 space-y-5">
          <Field label="Current age" value={currentAge} onChange={setCurrentAge} min={18} max={55} step={1} suffix="yrs" />
          <Field label="Target FIRE age" value={targetAge} onChange={setTargetAge} min={25} max={70} step={1} suffix="yrs" />
          <Field label="Monthly expenses (today)" value={monthlyExpenses} onChange={setMonthlyExpenses} min={10000} max={500000} step={5000} prefix="₹" />
          <Field label="Expected inflation" value={inflation} onChange={setInflation} min={2} max={12} step={0.5} suffix="%" />
          <Field label="Expected investment return" value={expectedReturn} onChange={setExpectedReturn} min={6} max={20} step={0.5} suffix="%" />
          <Field label="Current savings / investments" value={currentSavings} onChange={setCurrentSavings} min={0} max={50000000} step={50000} prefix="₹" />
          <Field label="Monthly saving / investing" value={monthlySaving} onChange={setMonthlySaving} min={0} max={500000} step={5000} prefix="₹" />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7 flex flex-col gap-5">
        {/* FIRE number */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">Your FIRE number (25× rule)</p>
          <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
            {formatCompact(result.fireNumber)}
          </p>
          <p className="mt-1 text-xs text-ink-faint">
            Corpus needed at age {targetAge} to retire
          </p>
        </div>

        {/* On track status */}
        <div className={`rounded-xl p-4 ${result.onTrack ? "bg-forest-soft" : "bg-amber-50 dark:bg-amber-950/20"}`}>
          <p className={`text-sm font-semibold ${result.onTrack ? "text-forest-deep" : "text-amber-800 dark:text-amber-200"}`}>
            {result.onTrack
              ? `You are on track. Projected corpus: ${formatCompact(result.projectedCorpus)}`
              : `Gap of ${formatCompact(result.gap)}. Need ${formatCurrency(result.additionalSip)}/month extra.`}
          </p>
        </div>

        <div className="space-y-0 divide-y divide-line">
          <Stat label="Projected corpus at FIRE" value={formatCompact(result.projectedCorpus)} accent="forest" />
          <Stat label="FIRE number (25× rule)" value={formatCompact(result.fireNumber)} accent="brass" />
          <Stat label="Expenses at FIRE date" value={formatCurrency(result.futureMonthly) + "/mo"} accent="ink" />
          <Stat label="Your savings rate" value={`${result.savingsRate.toFixed(1)}%`} accent="ink" />
          <Stat label="Years to FIRE" value={`${result.yearsToFire} yrs`} accent="ink" />
        </div>

        <div className="rounded-xl bg-bg-alt border border-border p-4 text-xs text-ink-faint">
          <p><strong className="text-ink">FIRE types:</strong></p>
          <ul className="mt-2 space-y-1">
            <li><strong>Lean FIRE</strong> — frugal lifestyle, 20-25× expenses</li>
            <li><strong>Regular FIRE</strong> — comfortable lifestyle, 25× expenses</li>
            <li><strong>Fat FIRE</strong> — generous lifestyle, 33× expenses</li>
            <li><strong>Coast FIRE</strong> — invest until corpus grows by itself</li>
          </ul>
        </div>

        <p className="text-xs text-ink-faint">
          Based on the 4% safe withdrawal rate (Bengen, 1994). Actual results depend on market returns, inflation and lifestyle changes.
        </p>
      </div>
    </div>
  );
}
