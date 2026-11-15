"use client";

import { useState, useMemo, useCallback } from "react";
import { formatCurrency, formatCompact } from "@/lib/format";
import { Field } from "./shared";
import Link from "next/link";

const SALARY_PRESETS = [
  { label: "₹7.5 Lakh", val: 750000 },
  { label: "₹10 Lakh", val: 1000000 },
  { label: "₹12 Lakh", val: 1200000 },
  { label: "₹15 Lakh", val: 1500000 },
  { label: "₹20 Lakh", val: 2000000 },
];

function calcNewRegimeTax(gross: number, employerNps: number = 0) {
  const stdDeduction = 75000;
  const taxable = Math.max(0, gross - stdDeduction - employerNps);

  // New Regime FY 2025-26 / 2026-27 Slabs:
  // 0 - 3L: 0%
  // 3L - 7L: 5% (max 20,000)
  // 7L - 10L: 10% (max 30,000)
  // 10L - 12L: 15% (max 30,000)
  // 12L - 15L: 20% (max 60,000)
  // Above 15L: 30%
  let tax = 0;
  if (taxable > 1500000) {
    tax += (taxable - 1500000) * 0.30;
    tax += 60000 + 30000 + 30000 + 20000; // 140,000
  } else if (taxable > 1200000) {
    tax += (taxable - 1200000) * 0.20;
    tax += 30000 + 30000 + 20000; // 80,000
  } else if (taxable > 1000000) {
    tax += (taxable - 1000000) * 0.15;
    tax += 30000 + 20000; // 50,000
  } else if (taxable > 700000) {
    tax += (taxable - 700000) * 0.10;
    tax += 20000;
  } else if (taxable > 300000) {
    tax += (taxable - 300000) * 0.05;
  }

  // 87A rebate for New Regime: if taxable <= 700,000 -> full rebate (tax = 0)
  if (taxable <= 700000) {
    tax = 0;
  } else if (taxable > 700000 && taxable <= 727777) {
    // Marginal relief under 115BAC: Tax payable cannot exceed income exceeding 7,00,000
    const excessIncome = taxable - 700000;
    if (tax > excessIncome) {
      tax = excessIncome;
    }
  }

  const cess = tax * 0.04;
  return {
    taxable,
    stdDeduction,
    baseTax: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(tax + cess),
  };
}

function calcOldRegimeTax(
  gross: number,
  sec80c: number,
  sec80ccd: number,
  sec80d: number,
  hra: number,
  homeLoanInterest: number,
  otherDeductions: number
) {
  const stdDeduction = 50000;
  const totalDeductions =
    stdDeduction +
    Math.min(150000, sec80c) +
    Math.min(50000, sec80ccd) +
    Math.min(75000, sec80d) +
    hra +
    Math.min(200000, homeLoanInterest) +
    otherDeductions;

  const taxable = Math.max(0, gross - totalDeductions);

  // Old Regime Slabs:
  // 0 - 2.5L: Nil
  // 2.5L - 5L: 5% (max 12,500)
  // 5L - 10L: 20% (max 100,000)
  // Above 10L: 30%
  let tax = 0;
  if (taxable > 1000000) {
    tax += (taxable - 1000000) * 0.30;
    tax += 100000 + 12500; // 112,500
  } else if (taxable > 500000) {
    tax += (taxable - 500000) * 0.20;
    tax += 12500;
  } else if (taxable > 250000) {
    tax += (taxable - 250000) * 0.05;
  }

  // 87A rebate for Old Regime: if taxable <= 500,000 -> full rebate (tax = 0)
  if (taxable <= 500000) {
    tax = 0;
  }

  const cess = tax * 0.04;
  return {
    taxable,
    totalDeductions,
    baseTax: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(tax + cess),
  };
}

export default function ZeroTaxSalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState(1000000);
  const [sec80c, setSec80c] = useState(150000);
  const [sec80ccd, setSec80ccd] = useState(50000);
  const [sec80d, setSec80d] = useState(50000);
  const [hra, setHra] = useState(200000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(50000);
  const [employerNps, setEmployerNps] = useState(0);

  const newRegime = useMemo(
    () => calcNewRegimeTax(grossSalary, employerNps),
    [grossSalary, employerNps]
  );

  const oldRegime = useMemo(
    () =>
      calcOldRegimeTax(
        grossSalary,
        sec80c,
        sec80ccd,
        sec80d,
        hra,
        homeLoanInterest,
        0
      ),
    [grossSalary, sec80c, sec80ccd, sec80d, hra, homeLoanInterest]
  );

  // Calculate deduction required to reach 0 tax in Old Regime
  // Old regime tax is 0 if taxable <= 5,00,000 => deductions >= gross - 5,00,000
  const oldRegimeRequiredDeductions = Math.max(0, grossSalary - 500000);
  const oldRegimeGap = Math.max(0, oldRegimeRequiredDeductions - oldRegime.totalDeductions);

  // New regime tax is 0 if taxable <= 7,00,000 => gross - 75000 - employerNps <= 700000 => gross <= 7,75,000 + employerNps
  const newRegimeIsZero = newRegime.totalTax === 0;

  const handleCopy = useCallback(() => {
    const text = `Zero Tax Salary Strategy (CoinMind):
Gross Salary: ${formatCurrency(grossSalary, "INR")}
New Regime Tax: ${formatCurrency(newRegime.totalTax, "INR")}
Old Regime Tax: ${formatCurrency(oldRegime.totalTax, "INR")} (Total Deductions: ${formatCurrency(oldRegime.totalDeductions, "INR")})
Zero-Tax Gap (Old Regime): ${oldRegimeGap === 0 ? "Achieved (₹0 Tax!)" : formatCurrency(oldRegimeGap, "INR") + " more needed"}
Recommended Regime: ${newRegime.totalTax <= oldRegime.totalTax ? "New Tax Regime" : "Old Tax Regime"}
Plan your taxes at https://coinmind.in/calculators/zero-tax-salary`;
    navigator.clipboard.writeText(text);
  }, [grossSalary, newRegime, oldRegime, oldRegimeGap]);

  return (
    <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6">
      {/* Controls & Deductions Breakdown */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl text-ink">Salary & Deductions</h2>
          <span className="rounded-md bg-paper-2 px-2.5 py-1 text-xs font-semibold text-ink-soft">
            FY 2026-27 (AY 2027-28)
          </span>
        </div>

        {/* Salary Slider + Presets */}
        <div className="mt-5 space-y-3">
          <Field
            label="Annual Gross Salary (CTC)"
            value={grossSalary}
            onChange={setGrossSalary}
            min={300000}
            max={3000000}
            step={25000}
            prefix="₹"
            hint="Total annual compensation before any deductions or tax."
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-ink-faint mr-1">Presets:</span>
            {SALARY_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setGrossSalary(p.val)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  grossSalary === p.val
                    ? "bg-forest text-white"
                    : "bg-paper-2 text-ink-soft hover:bg-paper-3 hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Old Regime Tax Deductions Accordion */}
        <div className="mt-7 pt-5 border-t border-line">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-ink">
                Old Regime Deductions Checklist
              </h3>
              <p className="text-xs text-ink-faint">
                Adjust your exemptions to reach the magic ₹0 tax threshold.
              </p>
            </div>
            <span className="text-xs font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-md">
              Claimed: {formatCompact(oldRegime.totalDeductions, "INR")}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Standard Deduction Notice */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-paper-2 border border-line">
              <div>
                <span className="font-medium text-ink block">Standard Deduction (Salaried)</span>
                <span className="text-[11px] text-ink-faint">
                  Automatic: ₹50,000 (Old Regime) / ₹75,000 (New Regime)
                </span>
              </div>
              <span className="font-semibold text-ink">₹50,000</span>
            </div>

            {/* Section 80C */}
            <Field
              label="Section 80C (EPF, PPF, ELSS, Life Insurance)"
              value={sec80c}
              onChange={setSec80c}
              min={0}
              max={150000}
              step={5000}
              prefix="₹"
              hint="Max limit: ₹1,50,000 per financial year."
            />

            {/* Section 80CCD(1B) NPS */}
            <Field
              label="Section 80CCD(1B) NPS (Additional Self Contribution)"
              value={sec80ccd}
              onChange={setSec80ccd}
              min={0}
              max={50000}
              step={5000}
              prefix="₹"
              hint="Extra ₹50,000 tax deduction exclusive to Tier-1 NPS."
            />

            {/* Section 80D Health Insurance */}
            <Field
              label="Section 80D (Health Insurance Premium)"
              value={sec80d}
              onChange={setSec80d}
              min={0}
              max={75000}
              step={5000}
              prefix="₹"
              hint="Up to ₹25k for self/family + ₹50k for senior citizen parents."
            />

            {/* HRA Exemption */}
            <Field
              label="HRA Exemption (House Rent Allowance)"
              value={hra}
              onChange={setHra}
              min={0}
              max={400000}
              step={10000}
              prefix="₹"
              hint="Actual rent paid minus 10% of basic salary."
            />

            {/* Home Loan Interest Section 24b */}
            <Field
              label="Section 24(b) (Home Loan Interest)"
              value={homeLoanInterest}
              onChange={setHomeLoanInterest}
              min={0}
              max={200000}
              step={10000}
              prefix="₹"
              hint="Max ₹2,00,000 for self-occupied home."
            />
          </div>
        </div>
      </div>

      {/* Comparison & Verdict Panel */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Verdict Status Card */}
          <div
            className={`rounded-xl border p-4 transition-all ${
              oldRegime.totalTax === 0 || newRegime.totalTax === 0
                ? "border-forest/40 bg-forest/10"
                : "border-brass/30 bg-brass/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {oldRegime.totalTax === 0 || newRegime.totalTax === 0 ? "🎉" : "🎯"}
              </span>
              <div>
                <p className="text-sm font-bold text-ink">
                  {oldRegime.totalTax === 0
                    ? "₹0 Tax Achieved in Old Regime!"
                    : newRegime.totalTax === 0
                    ? "₹0 Tax Achieved in New Regime!"
                    : `Pay Only ${formatCurrency(Math.min(oldRegime.totalTax, newRegime.totalTax), "INR")} Tax`}
                </p>
                <p className="text-xs text-ink-soft mt-0.5">
                  {oldRegime.totalTax === 0
                    ? "Your total deductions bring taxable income below ₹5 Lakh (Sec 87A rebate)."
                    : newRegime.totalTax === 0
                    ? "Your salary is under the ₹7.75 Lakh zero-tax bracket in New Regime."
                    : `You need ${formatCurrency(oldRegimeGap, "INR")} more deductions in Old Regime to reach ₹0 Tax.`}
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {/* New Regime Card */}
            <div
              className={`rounded-xl border p-3.5 transition-all ${
                newRegime.totalTax <= oldRegime.totalTax
                  ? "border-forest bg-card shadow-xs"
                  : "border-line bg-paper"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink">New Regime</span>
                {newRegime.totalTax <= oldRegime.totalTax && (
                  <span className="rounded bg-forest/10 px-1.5 py-0.5 text-[10px] font-bold text-forest">
                    RECOMMENDED
                  </span>
                )}
              </div>
              <p className="mt-2 text-2xl font-display font-bold text-ink">
                {formatCurrency(newRegime.totalTax, "INR")}
              </p>
              <p className="text-[11px] text-ink-faint mt-1">
                Taxable: {formatCompact(newRegime.taxable, "INR")}
              </p>
              <p className="text-[10px] text-ink-faint">Std Ded: ₹75,000</p>
            </div>

            {/* Old Regime Card */}
            <div
              className={`rounded-xl border p-3.5 transition-all ${
                oldRegime.totalTax < newRegime.totalTax
                  ? "border-forest bg-card shadow-xs"
                  : "border-line bg-paper"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink">Old Regime</span>
                {oldRegime.totalTax < newRegime.totalTax && (
                  <span className="rounded bg-forest/10 px-1.5 py-0.5 text-[10px] font-bold text-forest">
                    RECOMMENDED
                  </span>
                )}
              </div>
              <p className="mt-2 text-2xl font-display font-bold text-ink">
                {formatCurrency(oldRegime.totalTax, "INR")}
              </p>
              <p className="text-[11px] text-ink-faint mt-1">
                Taxable: {formatCompact(oldRegime.taxable, "INR")}
              </p>
              <p className="text-[10px] text-ink-faint">
                Deductions: {formatCompact(oldRegime.totalDeductions, "INR")}
              </p>
            </div>
          </div>

          {/* Savings Metric */}
          <div className="mt-5 rounded-xl border border-line bg-card p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between text-ink-soft">
              <span>Tax Difference:</span>
              <span className="font-bold text-forest text-sm">
                Save {formatCurrency(Math.abs(newRegime.totalTax - oldRegime.totalTax), "INR")}
              </span>
            </div>
            <div className="flex items-center justify-between text-ink-soft border-t border-line pt-2">
              <span>Target Deductions for ₹0 Tax:</span>
              <span className="font-semibold text-ink">
                {formatCurrency(oldRegimeRequiredDeductions, "INR")}
              </span>
            </div>
            <div className="flex items-center justify-between text-ink-soft">
              <span>Your Current Deductions:</span>
              <span className="font-semibold text-forest">
                {formatCurrency(oldRegime.totalDeductions, "INR")}
              </span>
            </div>
          </div>

          {/* The Formula Blueprint */}
          <div className="mt-4 rounded-xl bg-paper p-3 text-[11px] text-ink-soft leading-relaxed border border-line">
            <strong className="text-ink font-semibold block mb-0.5">
              📌 The ₹10 Lakh Zero-Tax Formula:
            </strong>
            ₹10L Salary - ₹50k (Std) - ₹1.5L (80C) - ₹50k (NPS) - ₹50k (80D) - ₹2L (HRA) = ₹5,00,000 Net Taxable Income.
            Section 87A rebate covers ₹12,500 tax = <strong>₹0 Total Tax!</strong>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-line flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-2 text-xs font-medium text-ink-soft hover:text-forest hover:border-forest transition-colors"
          >
            📋 Copy tax plan
          </button>
          <Link
            href="/tax-regime-break-even"
            className="inline-flex items-center gap-1.5 rounded-lg bg-forest/10 px-3 py-2 text-xs font-semibold text-forest hover:bg-forest/20 transition-colors ml-auto"
          >
            View Break-Even Analysis →
          </Link>
        </div>
      </div>
    </div>
  );
}
