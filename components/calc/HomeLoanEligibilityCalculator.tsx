"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

/* Reverse-EMI: given the largest EMI a borrower can afford, work back to the
   loan principal that EMI can service. P = EMI × (1 − (1+r)⁻ⁿ) / r. */
function eligiblePrincipal(emi: number, ratePct: number, tenureYears: number): number {
  if (emi <= 0) return 0;
  const n = tenureYears * 12;
  const r = ratePct / 100 / 12;
  if (r === 0) return emi * n;
  return (emi * (1 - Math.pow(1 + r, -n))) / r;
}

export default function HomeLoanEligibilityCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [income, setIncome] = useState(120000);
  const [obligations, setObligations] = useState(0);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [foir, setFoir] = useState(50);

  const { maxEmi, principal, totalInterest, totalPayment, tooLow } = useMemo(() => {
    const emi = Math.max(0, (income * foir) / 100 - obligations);
    const p = eligiblePrincipal(emi, rate, years);
    const total = emi * years * 12;
    return {
      maxEmi: emi,
      principal: p,
      totalInterest: total - p,
      totalPayment: total,
      tooLow: emi <= 0,
    };
  }, [income, obligations, rate, years, foir]);

  // A couple of alternative tenures to show how eligibility stretches with term.
  const tenureScenarios = useMemo(() => {
    const options = [10, 15, 20, 25, 30];
    return options
      .filter((t) => t !== years)
      .slice(0, 2)
      .map((t) => ({ years: t, amount: eligiblePrincipal(maxEmi, rate, t) }));
  }, [maxEmi, rate, years]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Your income</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Net monthly income"
            value={income}
            onChange={setIncome}
            min={0}
            max={5000000}
            step={5000}
            prefix={sym}
          />
          <Field
            label="Existing monthly EMIs"
            value={obligations}
            onChange={setObligations}
            min={0}
            max={2000000}
            step={1000}
            prefix={sym}
            hint="Car, personal or other loan payments you already make each month."
          />
          <Field
            label="Interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={5}
            max={15}
            step={0.1}
            suffix="%"
          />
          <Field
            label="Loan tenure"
            value={years}
            onChange={setYears}
            min={1}
            max={30}
            step={1}
            suffix="yr"
          />
          <Field
            label="FOIR (income allowed for EMI)"
            value={foir}
            onChange={setFoir}
            min={30}
            max={70}
            step={5}
            suffix="%"
            hint="Fixed obligations to income ratio — the share of income lenders let go toward EMIs."
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Eligible loan amount
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(principal, currency)}
        </p>
        {tooLow ? (
          <p className="mt-1 text-sm text-ink-faint">
            Your existing EMIs use up the income lenders allow — try a higher
            income, lower obligations or a higher FOIR.
          </p>
        ) : (
          <p className="mt-1 text-sm text-ink-faint">
            over {years} years at {rate}% p.a.
          </p>
        )}

        {!tooLow && (
          <div className="mt-6">
            <Donut
              primary={principal}
              secondary={totalInterest}
              primaryLabel="Loan amount"
              secondaryLabel="Interest"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat
            label="Max EMI you can afford"
            value={formatCurrency(maxEmi, currency)}
            accent="ink"
          />
          <Stat
            label="Total interest"
            value={formatCurrency(totalInterest, currency)}
            accent="brass"
          />
          <Stat
            label="Total repayment"
            value={formatCurrency(totalPayment, currency)}
            accent="forest"
          />
        </div>

        {!tooLow && tenureScenarios.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">
              At other tenures
            </p>
            <div className="mt-2">
              {tenureScenarios.map((s) => (
                <Stat
                  key={s.years}
                  label={`Over ${s.years} years`}
                  value={formatCurrency(s.amount, currency)}
                  accent="ink"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
