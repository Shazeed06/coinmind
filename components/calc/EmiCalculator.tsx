"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function EmiCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const e =
      r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = e * n;
    return { emi: e, totalInterest: total - principal, totalPayment: total };
  }, [principal, rate, years]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Loan details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={50000000}
            step={50000}
            prefix={sym}
          />
          <Field
            label="Interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={4}
            max={24}
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
            suffix="yrs"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Monthly EMI
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(emi, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">per month for {years * 12} months</p>

        <div className="mt-6">
          <Donut
            primary={principal}
            secondary={totalInterest}
            primaryLabel="Principal"
            secondaryLabel="Interest"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Principal amount" value={formatCurrency(principal, currency)} accent="ink" />
          <Stat label="Total interest" value={formatCurrency(totalInterest, currency)} accent="brass" />
          <Stat label="Total payment" value={formatCurrency(totalPayment, currency)} accent="forest" />
        </div>
      </div>
    </div>
  );
}
