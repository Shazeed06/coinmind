"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { computeNewRegimeTax, computeOldRegimeTax } from "@/lib/pseo-tax";
import { Field } from "./shared";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1500000);
  const [deductions, setDeductions] = useState(200000);

  const result = useMemo(() => {
    // Both figures come from lib/pseo-tax.ts, the same functions that render the
    // /income-tax/<salary> pages. This component used to carry its own copy of
    // the slabs and a bare 4% cess with no surcharge, so above Rs 50 lakh it
    // disagreed with the breakdown printed directly above it on the same page,
    // understating tax on a Rs 1 crore salary by about Rs 2.66 lakh. One source
    // of truth means the two cannot drift apart again.
    const newRes = computeNewRegimeTax(income);
    const oldRes = computeOldRegimeTax(income, deductions);

    const newTax = newRes.totalTax;
    const oldTax = oldRes.totalTax;
    const better = newTax <= oldTax ? "new" : "old";
    return {
      newTax,
      oldTax,
      newTaxable: newRes.taxableIncome,
      oldTaxable: oldRes.taxableIncome,
      newSurcharge: newRes.surcharge,
      oldSurcharge: oldRes.surcharge,
      better,
      savings: Math.abs(newTax - oldTax),
    };
  }, [income, deductions]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl text-ink">Your income</h2>
        <p className="mt-1 text-sm text-ink-faint">
          FY 2026-27 · India · below 60 years · salaried
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
          {/* At low incomes both regimes come out to the same number, and
              claiming one "saves you ₹0" reads as a broken calculation. */}
          <p className="text-sm text-forest-deep leading-relaxed">
            {result.savings < 1 ? (
              <>
                Both regimes cost you{" "}
                <strong className="font-semibold">{formatCurrency(result.newTax)}</strong>{" "}
                in tax this year, so either one works.
              </>
            ) : (
              <>
                The{" "}
                <strong className="font-semibold">
                  {result.better === "new" ? "New" : "Old"} regime
                </strong>{" "}
                saves you{" "}
                <strong className="font-semibold">
                  {formatCurrency(result.savings)}
                </strong>{" "}
                in tax this year.
              </>
            )}
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
        <h3 className="font-display text-lg text-ink">{title}</h3>
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
