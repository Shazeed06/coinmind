"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { Field, Stat } from "./shared";

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(60000);
  const [years, setYears] = useState(10);

  const { gratuity, capped } = useMemo(() => {
    // Formula: (15/26) x last drawn monthly salary (basic + DA) x years of service.
    const g = (15 / 26) * salary * years;
    const CAP = 2000000; // ₹20 lakh tax-free ceiling
    return { gratuity: Math.min(g, CAP), capped: g > CAP };
  }, [salary, years]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your service</h2>
        <p className="mt-1 text-sm text-ink-faint">For employees covered under the Gratuity Act</p>
        <div className="mt-6 space-y-7">
          <Field label="Last drawn monthly salary" value={salary} onChange={setSalary} min={0} max={500000} step={5000} prefix="₹" hint="Basic salary + dearness allowance (DA)." />
          <Field label="Years of service" value={years} onChange={setYears} min={5} max={40} step={1} suffix="yrs" hint="Gratuity is usually payable after 5 years of continuous service." />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Gratuity payable</p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">{formatCurrency(gratuity)}</p>
        {capped && (
          <p className="mt-2 text-sm text-brass">Capped at the ₹20 lakh tax-free limit.</p>
        )}
        <div className="mt-6 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          Formula: <span className="font-mono text-ink">(15 ÷ 26) × last salary × years of service</span>. The 26 represents working days in a month, and 15 is half a month&apos;s wages for each completed year.
        </div>
        <div className="mt-5">
          <Stat label="Monthly salary (basic + DA)" value={formatCurrency(salary)} accent="ink" />
          <Stat label="Years of service" value={`${years} years`} accent="brass" />
          <Stat label="Gratuity amount" value={formatCurrency(gratuity)} accent="forest" />
        </div>
      </div>
    </div>
  );
}
