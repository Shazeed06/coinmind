"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { Field, Donut, Stat } from "./shared";

// New regime slabs FY 2026-27 (same as the income-tax calculator).
const SLABS: [number, number][] = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Infinity, 0.3],
];

function newRegimeTax(taxable: number): number {
  if (taxable <= 1200000) return 0; // Section 87A rebate
  let tax = 0;
  let lower = 0;
  for (const [upto, rate] of SLABS) {
    if (taxable > lower) {
      tax += (Math.min(taxable, upto) - lower) * rate;
      lower = upto;
    } else break;
  }
  return tax * 1.04; // + 4% cess
}

export default function TakeHomeSalaryCalculator() {
  const [ctc, setCtc] = useState(1200000);
  const [basicPct, setBasicPct] = useState(50);

  const r = useMemo(() => {
    const basic = (ctc * basicPct) / 100;
    const employerPF = 0.12 * basic;
    const gratuity = 0.0481 * basic;
    const gross = ctc - employerPF - gratuity;
    const employeePF = 0.12 * basic;
    const profTax = 2400;
    const taxable = Math.max(0, gross - 75000);
    const tax = newRegimeTax(taxable);
    const deductions = employeePF + profTax + tax;
    const netAnnual = gross - deductions;
    return {
      basic,
      gross,
      employerPF,
      gratuity,
      employeePF,
      profTax,
      tax,
      deductions,
      netAnnual,
      monthly: netAnnual / 12,
    };
  }, [ctc, basicPct]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.95fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your package</h2>
        <p className="mt-1 text-sm text-ink-faint">
          India · new tax regime · FY 2026-27
        </p>
        <div className="mt-6 space-y-7">
          <Field
            label="Annual CTC"
            value={ctc}
            onChange={setCtc}
            min={0}
            max={10000000}
            step={50000}
            prefix="₹"
          />
          <Field
            label="Basic salary (% of CTC)"
            value={basicPct}
            onChange={setBasicPct}
            min={30}
            max={60}
            step={5}
            suffix="%"
            hint="Most Indian companies set basic at 40–50% of CTC. PF & gratuity are calculated on basic."
          />
        </div>

        <div className="mt-7 rounded-xl bg-paper-2 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
            Salary breakdown (annual)
          </p>
          <div className="mt-2">
            <Stat label="Cost to company (CTC)" value={formatCurrency(ctc)} accent="ink" />
            <Stat label="− Employer PF + gratuity" value={formatCurrency(r.employerPF + r.gratuity)} accent="brass" />
            <Stat label="Gross salary" value={formatCurrency(r.gross)} accent="ink" />
            <Stat label="− Your PF (12% of basic)" value={formatCurrency(r.employeePF)} accent="brass" />
            <Stat label="− Professional tax" value={formatCurrency(r.profTax)} accent="brass" />
            <Stat label="− Income tax (+ cess)" value={formatCurrency(r.tax)} accent="brass" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Monthly in-hand
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(r.monthly)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          {formatCurrency(r.netAnnual)} per year
        </p>

        <div className="mt-6">
          <Donut
            primary={r.netAnnual}
            secondary={r.deductions + r.employerPF + r.gratuity}
            primaryLabel="In-hand"
            secondaryLabel="Deductions & contributions"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Annual in-hand" value={formatCurrency(r.netAnnual)} accent="forest" />
          <Stat label="Total deductions" value={formatCurrency(r.deductions)} accent="brass" />
          <Stat label="Take-home %" value={`${((r.netAnnual / ctc) * 100).toFixed(1)}%`} accent="ink" />
        </div>

        <p className="mt-4 text-xs text-ink-faint leading-relaxed">
          Estimate only. Actual pay varies with your salary structure, allowances,
          HRA exemption and chosen tax regime.
        </p>
      </div>
    </div>
  );
}
