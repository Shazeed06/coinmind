"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

const COMPOUNDING = [
  { label: "Quarterly", n: 4 },
  { label: "Monthly", n: 12 },
  { label: "Yearly", n: 1 },
];

export default function FdCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(4);

  const { maturity, interest } = useMemo(() => {
    const m = principal * Math.pow(1 + rate / 100 / freq, freq * years);
    return { maturity: m, interest: m - principal };
  }, [principal, rate, years, freq]);

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
            label="Total investment"
            value={principal}
            onChange={setPrincipal}
            min={100000}
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
          />
          <Field
            label="Time period"
            value={years}
            onChange={setYears}
            min={1}
            max={20}
            step={1}
            suffix="yrs"
          />
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">Compounding frequency</p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              {COMPOUNDING.map((c) => (
                <button
                  key={c.n}
                  type="button"
                  onClick={() => setFreq(c.n)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    freq === c.n ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Maturity value
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(maturity, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">after {years} years</p>

        <div className="mt-6">
          <Donut
            primary={principal}
            secondary={interest}
            primaryLabel="Invested"
            secondaryLabel="Interest earned"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Invested amount" value={formatCurrency(principal, currency)} accent="ink" />
          <Stat label="Interest earned" value={formatCurrency(interest, currency)} accent="brass" />
          <Stat label="Maturity value" value={formatCurrency(maturity, currency)} accent="forest" />
        </div>
      </div>
    </div>
  );
}
