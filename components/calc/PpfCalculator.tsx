"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatCompact } from "@/lib/format";
import { Field, Donut, Stat } from "./shared";

export default function PpfCalculator() {
  const [yearly, setYearly] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const { maturity, invested, interest } = useMemo(() => {
    const r = rate / 100;
    // Annuity-due: contribution each year, interest compounded yearly.
    const fv = r === 0 ? yearly * years : yearly * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
    const inv = yearly * years;
    return { maturity: fv, invested: inv, interest: fv - inv };
  }, [yearly, rate, years]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your PPF plan</h2>
        <p className="mt-1 text-sm text-ink-faint">India · tax-free under Section 80C</p>
        <div className="mt-6 space-y-7">
          <Field label="Yearly investment" value={yearly} onChange={setYearly} min={500} max={150000} step={5000} prefix="₹" hint="PPF allows ₹500 to ₹1.5 lakh per year." />
          <Field label="Interest rate (p.a.)" value={rate} onChange={setRate} min={5} max={9} step={0.1} suffix="%" hint="The government revises the PPF rate every quarter (currently around 7.1%)." />
          <Field label="Time period" value={years} onChange={setYears} min={15} max={50} step={5} suffix="yrs" hint="PPF has a 15-year lock-in, extendable in blocks of 5 years." />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Maturity value</p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">{formatCompact(maturity)}</p>
        <p className="mt-1 text-sm text-ink-faint">{formatCurrency(maturity)}</p>
        <div className="mt-6">
          <Donut primary={invested} secondary={interest} primaryLabel="Invested" secondaryLabel="Interest" size={190} />
        </div>
        <div className="mt-6">
          <Stat label="Total invested" value={formatCurrency(invested)} accent="ink" />
          <Stat label="Total interest" value={formatCurrency(interest)} accent="brass" />
          <Stat label="Maturity value" value={formatCurrency(maturity)} accent="forest" />
        </div>
      </div>
    </div>
  );
}
