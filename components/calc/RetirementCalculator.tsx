"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { Field, CurrencyToggle, Stat } from "./shared";

export default function RetirementCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const r = useMemo(() => {
    const yearsToRetire = Math.max(1, retireAge - age);
    const postYears = Math.max(1, lifeExpectancy - retireAge);

    // Monthly expense at retirement, inflated.
    const futureMonthly = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
    const annualAtRetire = futureMonthly * 12;

    // Real return during retirement (return net of inflation).
    const realRate = (1 + preReturn / 100) / (1 + inflation / 100) - 1;
    const corpus =
      Math.abs(realRate) < 1e-6
        ? annualAtRetire * postYears
        : annualAtRetire * ((1 - Math.pow(1 + realRate, -postYears)) / realRate);

    // Monthly SIP needed to build that corpus by retirement.
    const i = preReturn / 100 / 12;
    const n = yearsToRetire * 12;
    const factor = i === 0 ? n : ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const monthlySip = corpus / factor;

    return { futureMonthly, corpus, monthlySip, yearsToRetire };
  }, [age, retireAge, monthlyExpense, inflation, preReturn, lifeExpectancy]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">About you</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-6">
          <Field label="Current age" value={age} onChange={setAge} min={18} max={59} step={1} suffix="yrs" />
          <Field label="Retirement age" value={retireAge} onChange={setRetireAge} min={40} max={70} step={1} suffix="yrs" />
          <Field label="Monthly expenses (today)" value={monthlyExpense} onChange={setMonthlyExpense} min={0} max={1000000} step={5000} prefix={sym} />
          <Field label="Expected inflation" value={inflation} onChange={setInflation} min={2} max={12} step={0.5} suffix="%" />
          <Field label="Expected return on investments" value={preReturn} onChange={setPreReturn} min={4} max={20} step={0.5} suffix="%" />
          <Field label="Life expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} min={70} max={100} step={1} suffix="yrs" />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Corpus you&apos;ll need</p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">{formatCompact(r.corpus, currency)}</p>
        <p className="mt-1 text-sm text-ink-faint">by age {retireAge}</p>

        <div className="mt-6 rounded-xl bg-forest-soft p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-forest-deep">Start investing monthly</p>
          <p className="mt-1 font-display text-2xl font-600 text-forest-deep">{formatCurrency(r.monthlySip, currency)}</p>
          <p className="mt-1 text-xs text-forest-deep/70">for the next {r.yearsToRetire} years to reach your goal</p>
        </div>

        <div className="mt-5">
          <Stat label="Monthly expense at retirement" value={formatCurrency(r.futureMonthly, currency)} accent="brass" />
          <Stat label="Required corpus" value={formatCurrency(r.corpus, currency)} accent="forest" />
        </div>
      </div>
    </div>
  );
}
