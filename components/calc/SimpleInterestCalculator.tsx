"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function SimpleInterestCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const { simpleInterest, total, compoundTotal, difference } = useMemo(() => {
    const si = (principal * rate * years) / 100;
    const compound = principal * Math.pow(1 + rate / 100, years);
    return {
      simpleInterest: si,
      total: principal + si,
      compoundTotal: compound,
      difference: compound - (principal + si),
    };
  }, [principal, rate, years]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">The details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Principal amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={100000000}
            step={5000}
            prefix={sym}
          />
          <Field
            label="Interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
          />
          <Field
            label="Time period"
            value={years}
            onChange={setYears}
            min={1}
            max={30}
            step={1}
            suffix="yr"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Total amount
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(total, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">principal + simple interest</p>

        <div className="mt-6">
          <Donut
            primary={principal}
            secondary={simpleInterest}
            primaryLabel="Principal"
            secondaryLabel="Interest"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Principal" value={formatCurrency(principal, currency)} accent="ink" />
          <Stat label="Simple interest earned" value={formatCurrency(simpleInterest, currency)} accent="brass" />
          <Stat label="With compound interest you'd get" value={formatCurrency(compoundTotal, currency)} accent="forest" />
        </div>

        <p className="mt-4 text-xs text-ink-faint leading-relaxed">
          Compounding annually would earn {formatCurrency(difference, currency)} more than
          simple interest over the same period.
        </p>
      </div>
    </div>
  );
}
