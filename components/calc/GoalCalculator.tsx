"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatCompact } from "@/lib/format";
import { Field, Stat } from "./shared";

const GOAL_PRESETS = [
  { label: "₹25 Lakh", value: 2500000 },
  { label: "₹50 Lakh", value: 5000000 },
  { label: "₹1 Crore", value: 10000000 },
  { label: "₹2 Crore", value: 20000000 },
  { label: "₹5 Crore", value: 50000000 },
];

const PURPOSE_PRESETS = [
  { label: "Emergency Fund", years: 1 },
  { label: "Car Purchase", years: 3 },
  { label: "Down Payment", years: 5 },
  { label: "Child Education", years: 15 },
  { label: "Retirement", years: 25 },
];

export default function GoalCalculator({
  initialGoal = 10000000,
  initialYears = 15,
  initialReturn = 12,
  initialInflation = 6,
  initialInflationAdjust = true,
}: {
  initialGoal?: number;
  initialYears?: number;
  initialReturn?: number;
  initialInflation?: number;
  initialInflationAdjust?: boolean;
} = {}) {
  const [goalAmount, setGoalAmount] = useState(initialGoal);
  const [years, setYears] = useState(initialYears);
  const [expectedReturn, setExpectedReturn] = useState(initialReturn);
  const [inflation, setInflation] = useState(initialInflation);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [inflationAdjust, setInflationAdjust] = useState(initialInflationAdjust);

  const result = useMemo(() => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;

    // Inflation-adjusted goal if enabled
    const adjustedGoal = inflationAdjust
      ? goalAmount * Math.pow(1 + inflation / 100, years)
      : goalAmount;

    // Future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);

    // Remaining target after current savings grow
    const remainingTarget = Math.max(0, adjustedGoal - fvCurrentSavings);

    // Monthly SIP needed
    const monthlySip =
      monthlyRate === 0
        ? remainingTarget / months
        : remainingTarget / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    // Total invested
    const totalInvested = monthlySip * months + currentSavings;
    const wealthGained = adjustedGoal - totalInvested;

    return {
      adjustedGoal,
      monthlySip: Math.max(0, monthlySip),
      totalInvested: Math.max(0, totalInvested),
      wealthGained: Math.max(0, wealthGained),
      fvCurrentSavings,
    };
  }, [goalAmount, years, expectedReturn, inflation, currentSavings, inflationAdjust]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl text-ink">Your goal</h2>

        {/* Goal presets */}
        <div className="mt-4 flex flex-wrap gap-2">
          {GOAL_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setGoalAmount(p.value)}
              className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                goalAmount === p.value
                  ? "bg-forest text-white border-forest"
                  : "border-line text-ink-soft hover:border-forest hover:text-forest"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Purpose presets */}
        <div className="mt-3 flex flex-wrap gap-2">
          {PURPOSE_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setYears(p.years)}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                years === p.years
                  ? "bg-brass text-white border-brass"
                  : "border-line text-ink-faint hover:border-brass hover:text-brass"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          <Field
            label="Goal amount"
            value={goalAmount}
            onChange={setGoalAmount}
            min={100000}
            max={100000000}
            step={100000}
            prefix="₹"
          />
          <Field
            label="Time horizon"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="yrs"
          />
          <Field
            label="Expected annual return"
            value={expectedReturn}
            onChange={setExpectedReturn}
            min={4}
            max={20}
            step={0.5}
            suffix="%"
          />
          <Field
            label="Current savings towards this goal"
            value={currentSavings}
            onChange={setCurrentSavings}
            min={0}
            max={50000000}
            step={50000}
            prefix="₹"
          />

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink-soft">Adjust goal for inflation</label>
            <div className="flex items-center gap-2">
              {inflationAdjust && (
                <span className="text-xs text-ink-faint">{inflation}%</span>
              )}
              <button
                type="button"
                onClick={() => setInflationAdjust(!inflationAdjust)}
                role="switch"
                aria-checked={inflationAdjust}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  inflationAdjust ? "bg-forest" : "bg-line-strong"
                }`}
                style={{ flexShrink: 0 }}
              >
                <span
                  className="inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5"
                  style={{ transform: `translateX(${inflationAdjust ? "22px" : "2px"})` }}
                />
              </button>
            </div>
          </div>
          {inflationAdjust && (
            <Field
              label="Inflation rate"
              value={inflation}
              onChange={setInflation}
              min={2}
              max={12}
              step={0.5}
              suffix="%"
            />
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7 flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">Monthly SIP needed</p>
          <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
            {formatCurrency(result.monthlySip)}
          </p>
          <p className="mt-1 text-xs text-ink-faint">
            per month for {years} years at {expectedReturn}% p.a.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-line">
          <Stat
            label={inflationAdjust ? "Inflation-adjusted goal" : "Goal amount"}
            value={formatCompact(result.adjustedGoal)}
            accent="brass"
          />
          <Stat label="Total amount invested" value={formatCompact(result.totalInvested)} accent="ink" />
          <Stat label="Wealth gained (returns)" value={formatCompact(result.wealthGained)} accent="forest" />
          {currentSavings > 0 && (
            <Stat label="Current savings will grow to" value={formatCompact(result.fvCurrentSavings)} accent="ink" />
          )}
        </div>

        {inflationAdjust && (
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-800 dark:text-amber-200">
            Inflation adjustment: ₹{(goalAmount / 100000).toFixed(0)}L today becomes{" "}
            {formatCompact(result.adjustedGoal)} in {years} years at {inflation}% inflation.
          </div>
        )}

        <p className="text-xs text-ink-faint">
          Projections assume a constant return of {expectedReturn}% p.a. Mutual fund returns vary and are not guaranteed.
        </p>
      </div>
    </div>
  );
}
