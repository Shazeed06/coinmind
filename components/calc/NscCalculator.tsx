"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

// NSC (National Savings Certificate) — fixed 5-year term, interest compounded
// annually and paid in full at maturity. Maturity = P × (1 + r/100)^5.
const TERM_YEARS = 5;

export default function NscCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.7);

  const valid = principal > 0 && rate > 0;

  const { maturity, interest } = useMemo(() => {
    if (!valid) return { maturity: NaN, interest: NaN };
    const m = principal * Math.pow(1 + rate / 100, TERM_YEARS);
    return { maturity: m, interest: m - principal };
  }, [principal, rate, valid]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Certificate details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Investment amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={10000000}
            step={5000}
            prefix={sym}
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
          Maturity value
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(maturity, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">after {TERM_YEARS} years</p>

        {valid && (
          <div className="mt-6">
            <Donut
              primary={principal}
              secondary={interest}
              primaryLabel="Invested"
              secondaryLabel="Interest earned"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat
            label="Invested amount"
            value={valid ? formatCurrency(principal, currency) : "—"}
            accent="ink"
          />
          <Stat
            label="Total interest"
            value={valid ? formatCurrency(interest, currency) : "—"}
            accent="brass"
          />
          <Stat
            label="Maturity value"
            value={valid ? formatCurrency(maturity, currency) : "—"}
            accent="forest"
          />
        </div>

        {valid ? (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            Your ₹{principal.toLocaleString("en-IN")} grows to{" "}
            <strong className="text-ink">{formatCurrency(maturity, currency)}</strong>{" "}
            at maturity, with interest compounded annually and paid out in full
            after 5 years.
          </p>
        ) : (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            Enter an investment amount and interest rate greater than zero to see
            your NSC maturity value.
          </p>
        )}

        <p className="mt-3 text-xs text-ink-faint leading-relaxed">
          Investments in NSC qualify for a deduction under Section 80C, up to the
          ₹1.5 lakh annual limit. The interest rate is set by the government and
          revised each quarter.
        </p>
      </div>
    </div>
  );
}
