"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function SipCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const { invested, future, gains } = useMemo(() => {
    const n = years * 12;
    const i = rate / 100 / 12;
    const fv =
      i === 0
        ? monthly * n
        : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const inv = monthly * n;
    return { invested: inv, future: fv, gains: fv - inv };
  }, [monthly, rate, years]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">
            Your investment
          </h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Monthly investment"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={500000}
            step={500}
            prefix={sym}
          />
          <Field
            label="Expected return rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
            hint="Equity mutual funds have historically returned 10–14% over the long term. Returns are not guaranteed."
          />
          <Field
            label="Time period"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="yrs"
          />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Projected value
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCompact(future, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">{formatCurrency(future, currency)}</p>

        <div className="mt-6">
          <Donut
            primary={invested}
            secondary={gains}
            primaryLabel="Invested"
            secondaryLabel="Est. returns"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Total invested" value={formatCurrency(invested, currency)} accent="ink" />
          <Stat label="Est. returns" value={formatCurrency(gains, currency)} accent="brass" />
          <Stat label="Maturity value" value={formatCurrency(future, currency)} accent="forest" />
        </div>
      </div>
    </div>
  );
}
