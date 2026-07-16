"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, CurrencyToggle, Stat } from "./shared";

export default function InflationCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const { futureCost, purchasingPower, erosion } = useMemo(() => {
    const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;
    const safeRate = Number.isFinite(rate) ? rate : 0;
    const safeYears = Number.isFinite(years) ? Math.max(0, years) : 0;
    const factor = Math.pow(1 + safeRate / 100, safeYears);

    // What the same basket of goods will COST in the future.
    const cost = safeAmount * factor;
    // What today's money will be WORTH (its purchasing power) in the future.
    const power = safeAmount / factor;
    return {
      futureCost: cost,
      purchasingPower: power,
      erosion: safeAmount - power,
    };
  }, [amount, rate, years]);

  const sym = currencyMeta[currency].symbol;
  const yearLabel = years === 1 ? "year" : "years";

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Inflation details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Current amount"
            value={amount}
            onChange={setAmount}
            min={0}
            max={100000000}
            step={10000}
            prefix={sym}
          />
          <Field
            label="Inflation rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={15}
            step={0.5}
            suffix="%"
          />
          <Field
            label="Number of years"
            value={years}
            onChange={setYears}
            min={1}
            max={50}
            step={1}
            suffix="yr"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Future cost
        </p>
        <p className="mt-2 font-display text-4xl font-600 text-forest break-words">
          In {years} {yearLabel}, {formatCurrency(amount, currency)} will cost{" "}
          {formatCurrency(futureCost, currency)}
        </p>
        <p className="mt-2 text-sm text-ink-faint">
          at {Number.isFinite(rate) ? rate : 0}% inflation per year
        </p>

        <div className="mt-6">
          <Stat
            label="Future value / cost"
            value={formatCurrency(futureCost, currency)}
            accent="forest"
          />
          <Stat
            label="Today's money worth then"
            value={formatCurrency(purchasingPower, currency)}
            accent="brass"
          />
          <Stat
            label="Total erosion"
            value={formatCurrency(erosion, currency)}
            accent="ink"
          />
        </div>

        <p className="mt-6 text-sm text-ink-soft leading-relaxed">
          Put simply: what {formatCurrency(amount, currency)} buys today will cost{" "}
          {formatCurrency(futureCost, currency)} in {years} {yearLabel}. And if you
          simply hold that {formatCurrency(amount, currency)} in cash, it will only
          have the buying power of {formatCurrency(purchasingPower, currency)} by then.
        </p>
      </div>
    </div>
  );
}
