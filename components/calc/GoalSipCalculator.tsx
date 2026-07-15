"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function GoalSipCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [target, setTarget] = useState(10000000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const { monthly, invested, returns } = useMemo(() => {
    const i = rate / 100 / 12;
    const n = years * 12;
    const factor = i === 0 ? n : ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const m = target / factor;
    const inv = m * n;
    return { monthly: m, invested: inv, returns: target - inv };
  }, [target, rate, years]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Your goal</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Target amount"
            value={target}
            onChange={setTarget}
            min={100000}
            max={100000000}
            step={100000}
            prefix={sym}
            hint="₹1 crore = ₹1,00,00,000. Set whatever goal you're aiming for."
          />
          <Field
            label="Expected return (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
            hint="Equity funds have historically returned 10–14% long term. Returns are not guaranteed."
          />
          <Field
            label="Time to reach goal"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="yrs"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Invest every month
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(monthly, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          to reach {formatCompact(target, currency)} in {years} years
        </p>

        <div className="mt-6">
          <Donut
            primary={invested}
            secondary={returns}
            primaryLabel="You invest"
            secondaryLabel="Growth"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Monthly SIP needed" value={formatCurrency(monthly, currency)} accent="forest" />
          <Stat label="Total you invest" value={formatCurrency(invested, currency)} accent="ink" />
          <Stat label="Growth (returns)" value={formatCurrency(returns, currency)} accent="brass" />
          <Stat label="Target corpus" value={formatCurrency(target, currency)} accent="forest" />
        </div>
      </div>
    </div>
  );
}
