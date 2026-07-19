"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

// Post Office MIS (Monthly Income Scheme) — 5-year term, interest paid out
// MONTHLY as a simple payout; the principal is returned at maturity.
const TERM_YEARS = 5;

export default function PostOfficeMisCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(7.4);

  const valid = principal > 0 && rate > 0;

  const { monthly, annual, totalInterest } = useMemo(() => {
    if (!valid) return { monthly: NaN, annual: NaN, totalInterest: NaN };
    const yearlyInterest = (principal * rate) / 100;
    return {
      monthly: yearlyInterest / 12,
      annual: yearlyInterest,
      totalInterest: yearlyInterest * TERM_YEARS,
    };
  }, [principal, rate, valid]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Deposit details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Investment amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={900000}
            step={10000}
            prefix={sym}
            hint="Maximum ₹9 lakh in a single account (₹15 lakh in a joint account)."
          />
          <Field
            label="Interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={15}
            step={0.1}
            suffix="%"
            hint="Current rate, set and revised by the government each quarter — edit it to match today's figure."
          />
          <Stat label="Term" value={`${TERM_YEARS} years (fixed)`} accent="ink" />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Monthly income
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(monthly, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">paid every month</p>

        {valid && (
          <div className="mt-6">
            <Donut
              primary={principal}
              secondary={totalInterest}
              primaryLabel="Invested"
              secondaryLabel="Interest over 5 yrs"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat
            label="Monthly income"
            value={valid ? formatCurrency(monthly, currency) : "—"}
            accent="forest"
          />
          <Stat
            label="Annual income"
            value={valid ? formatCurrency(annual, currency) : "—"}
            accent="brass"
          />
          <Stat
            label="Total interest (5 yrs)"
            value={valid ? formatCurrency(totalInterest, currency) : "—"}
            accent="brass"
          />
          <Stat
            label="Maturity (principal back)"
            value={valid ? formatCurrency(principal, currency) : "—"}
            accent="ink"
          />
        </div>

        {valid ? (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            You receive{" "}
            <strong className="text-ink">{formatCurrency(monthly, currency)}</strong>{" "}
            every month as income, and your{" "}
            {formatCurrency(principal, currency)} principal is returned in full
            when the 5-year term ends.
          </p>
        ) : (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            Enter an investment amount and interest rate greater than zero to see
            your Post Office MIS monthly income.
          </p>
        )}

        <p className="mt-3 text-xs text-ink-faint leading-relaxed">
          The Post Office Monthly Income Scheme pays a fixed monthly payout for 5
          years and returns your principal at maturity. Interest is a simple
          payout, not compounded, and is fully taxable in your hands.
        </p>
      </div>
    </div>
  );
}
