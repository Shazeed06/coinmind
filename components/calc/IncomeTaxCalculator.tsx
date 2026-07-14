"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { Field } from "./shared";

type Slab = { upto: number; rate: number };

// FY 2025-26 (AY 2026-27) — New Regime slabs
const NEW_SLABS: Slab[] = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.1 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.2 },
  { upto: 2400000, rate: 0.25 },
  { upto: Infinity, rate: 0.3 },
];

// Old Regime slabs (below 60 yrs)
const OLD_SLABS: Slab[] = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 0.05 },
  { upto: 1000000, rate: 0.2 },
  { upto: Infinity, rate: 0.3 },
];

function slabTax(taxable: number, slabs: Slab[]): number {
  let tax = 0;
  let lower = 0;
  for (const s of slabs) {
    if (taxable > lower) {
      const amt = Math.min(taxable, s.upto) - lower;
      tax += amt * s.rate;
      lower = s.upto;
    } else break;
  }
  return tax;
}

function withCess(tax: number) {
  return tax * 1.04; // 4% health & education cess
}

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1500000);
  const [deductions, setDeductions] = useState(200000);

  const result = useMemo(() => {
    // New regime: ₹75k standard deduction, rebate up to ₹12L taxable
    const newTaxable = Math.max(0, income - 75000);
    let newTax = slabTax(newTaxable, NEW_SLABS);
    if (newTaxable <= 1200000) newTax = 0; // Section 87A rebate
    newTax = withCess(newTax);

    // Old regime: ₹50k standard deduction + user deductions, rebate up to ₹5L
    const oldTaxable = Math.max(0, income - 50000 - deductions);
    let oldTax = slabTax(oldTaxable, OLD_SLABS);
    if (oldTaxable <= 500000) oldTax = 0; // Section 87A rebate
    oldTax = withCess(oldTax);

    const better = newTax <= oldTax ? "new" : "old";
    const savings = Math.abs(newTax - oldTax);
    return { newTax, oldTax, newTaxable, oldTaxable, better, savings };
  }, [income, deductions]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your income</h2>
        <p className="mt-1 text-sm text-ink-faint">
          FY 2025–26 · India · below 60 years · salaried
        </p>
        <div className="mt-6 space-y-7">
          <Field
            label="Gross annual income"
            value={income}
            onChange={setIncome}
            min={300000}
            max={10000000}
            step={50000}
            prefix="₹"
          />
          <Field
            label="Deductions (old regime only)"
            value={deductions}
            onChange={setDeductions}
            min={0}
            max={500000}
            step={10000}
            prefix="₹"
            hint="80C, 80D, home-loan interest, HRA etc. The new regime ignores most of these but has a lower rate structure."
          />
        </div>

        <div className="mt-7 rounded-xl bg-forest-soft p-4 flex items-start gap-3">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-bold">
            ✓
          </span>
          <p className="text-sm text-forest-deep leading-relaxed">
            The{" "}
            <strong className="font-semibold">
              {result.better === "new" ? "New" : "Old"} regime
            </strong>{" "}
            saves you{" "}
            <strong className="font-semibold">
              {formatCurrency(result.savings)}
            </strong>{" "}
            in tax this year.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <RegimeCard
          title="New Regime"
          taxable={result.newTaxable}
          tax={result.newTax}
          recommended={result.better === "new"}
        />
        <RegimeCard
          title="Old Regime"
          taxable={result.oldTaxable}
          tax={result.oldTax}
          recommended={result.better === "old"}
        />
      </div>
    </div>
  );
}

function RegimeCard({
  title,
  taxable,
  tax,
  recommended,
}: {
  title: string;
  taxable: number;
  tax: number;
  recommended: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        recommended
          ? "border-forest bg-paper-2 shadow-[0_16px_36px_-24px_rgba(30,64,175,0.5)]"
          : "border-line bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-600 text-ink">{title}</h3>
        {recommended && (
          <span className="rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-white">
            Recommended
          </span>
        )}
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-faint">
        Total tax payable
      </p>
      <p className="mt-1 font-display text-3xl font-600 text-forest">
        {formatCurrency(tax)}
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        Taxable income: {formatCurrency(taxable)}
      </p>
    </div>
  );
}
