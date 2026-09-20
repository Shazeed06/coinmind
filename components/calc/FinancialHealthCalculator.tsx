"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

interface Section {
  id: string;
  title: string;
  score: number;
  max: number;
  grade: string;
  color: string;
  insight: string;
}

function gradeColor(pct: number) {
  if (pct >= 80) return { text: "text-forest", bg: "bg-forest", label: "A", desc: "Excellent" };
  if (pct >= 60) return { text: "text-lime-600", bg: "bg-lime-500", label: "B", desc: "Good" };
  if (pct >= 40) return { text: "text-brass", bg: "bg-brass", label: "C", desc: "Fair" };
  return { text: "text-red-500", bg: "bg-red-500", label: "D", desc: "Needs work" };
}

export default function FinancialHealthCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(55000);
  const [emergencyFund, setEmergencyFund] = useState(150000);
  const [totalDebt, setTotalDebt] = useState(500000);
  const [monthlyEmi, setMonthlyEmi] = useState(15000);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [totalInvestments, setTotalInvestments] = useState(300000);
  const [hasLifeInsurance, setHasLifeInsurance] = useState(true);
  const [hasHealthInsurance, setHasHealthInsurance] = useState(true);
  const [age, setAge] = useState(32);

  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
  const emergencyMonths = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
  const debtToIncomeRatio = monthlyIncome > 0 ? (monthlyEmi / monthlyIncome) * 100 : 0;
  const investmentToIncome = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0;
  const yearsToRetirement = Math.max(0, 60 - age);
  const fireCoverage = monthlyExpenses > 0 ? totalInvestments / (monthlyExpenses * 12 * 25) * 100 : 0;

  const sections: Section[] = [
    {
      id: "savings",
      title: "Savings Rate",
      score: savingsRate >= 30 ? 25 : savingsRate >= 20 ? 20 : savingsRate >= 10 ? 12 : 5,
      max: 25,
      grade: `${savingsRate.toFixed(1)}% of income`,
      color: gradeColor(savingsRate >= 30 ? 100 : savingsRate >= 20 ? 75 : savingsRate >= 10 ? 50 : 20).text,
      insight: savingsRate >= 30
        ? "Excellent. You're saving more than 30% — a strong financial foundation."
        : savingsRate >= 20
        ? "Good. Aim for 30% to accelerate wealth building."
        : savingsRate >= 10
        ? "Fair. Try to increase savings by cutting discretionary expenses."
        : "Critical. Under 10% savings puts financial goals at risk.",
    },
    {
      id: "emergency",
      title: "Emergency Fund",
      score: emergencyMonths >= 6 ? 20 : emergencyMonths >= 3 ? 14 : emergencyMonths >= 1 ? 7 : 2,
      max: 20,
      grade: `${emergencyMonths.toFixed(1)} months`,
      color: gradeColor(emergencyMonths >= 6 ? 100 : emergencyMonths >= 3 ? 60 : emergencyMonths >= 1 ? 35 : 10).text,
      insight: emergencyMonths >= 6
        ? "Excellent. 6+ months emergency fund provides solid protection."
        : emergencyMonths >= 3
        ? "Good. Aim for 6 months, especially if you have dependents."
        : emergencyMonths >= 1
        ? "Low. Build to at least 3 months expenses in a liquid savings account."
        : "Critical. No emergency fund means any shock becomes a debt spiral.",
    },
    {
      id: "debt",
      title: "Debt Health",
      score: debtToIncomeRatio < 20 ? 20 : debtToIncomeRatio < 35 ? 14 : debtToIncomeRatio < 50 ? 8 : 2,
      max: 20,
      grade: `${debtToIncomeRatio.toFixed(1)}% DTI`,
      color: gradeColor(debtToIncomeRatio < 20 ? 100 : debtToIncomeRatio < 35 ? 60 : debtToIncomeRatio < 50 ? 35 : 10).text,
      insight: debtToIncomeRatio < 20
        ? "Healthy. Your EMIs are well within safe limits."
        : debtToIncomeRatio < 35
        ? "Manageable. Try to reduce high-interest debt aggressively."
        : debtToIncomeRatio < 50
        ? "High. Over 35% DTI strains your cash flow — prioritise repayment."
        : "Danger zone. Over 50% DTI — seek debt restructuring if needed.",
    },
    {
      id: "investing",
      title: "Investment Rate",
      score: investmentToIncome >= 20 ? 20 : investmentToIncome >= 10 ? 14 : investmentToIncome >= 5 ? 8 : 2,
      max: 20,
      grade: `${investmentToIncome.toFixed(1)}% of income`,
      color: gradeColor(investmentToIncome >= 20 ? 100 : investmentToIncome >= 10 ? 60 : investmentToIncome >= 5 ? 35 : 10).text,
      insight: investmentToIncome >= 20
        ? "Excellent. Investing 20%+ of income builds significant long-term wealth."
        : investmentToIncome >= 10
        ? "Good. Try to automate SIP to reach 20% over time."
        : investmentToIncome >= 5
        ? "Low. Start or increase SIP — even ₹500/month compounds meaningfully."
        : "Missing. Invest at least 10% of income for long-term goals.",
    },
    {
      id: "insurance",
      title: "Insurance Coverage",
      score: (hasLifeInsurance ? 7 : 0) + (hasHealthInsurance ? 8 : 0),
      max: 15,
      grade: `${(hasLifeInsurance ? 1 : 0) + (hasHealthInsurance ? 1 : 0)}/2 policies`,
      color: (hasLifeInsurance && hasHealthInsurance) ? "text-forest" : (!hasLifeInsurance && !hasHealthInsurance) ? "text-red-500" : "text-brass",
      insight: hasLifeInsurance && hasHealthInsurance
        ? "Well protected. Term life + health insurance covers your main risks."
        : !hasLifeInsurance && !hasHealthInsurance
        ? "Critical gap. No life or health insurance exposes you to devastating financial risk."
        : !hasHealthInsurance
        ? "Get health insurance now. A single hospitalisation without it can wipe savings."
        : "Get term life insurance if you have dependents. Very affordable at your age.",
    },
  ];

  const totalScore = sections.reduce((s, x) => s + x.score, 0);
  const totalMax = sections.reduce((s, x) => s + x.max, 0);
  const pct = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
  const g = gradeColor(pct);

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="font-display text-lg text-ink mb-5">Your financial snapshot</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          {[
            { label: "Monthly income (₹)", val: monthlyIncome, set: setMonthlyIncome },
            { label: "Monthly expenses (₹)", val: monthlyExpenses, set: setMonthlyExpenses },
            { label: "Emergency fund (₹)", val: emergencyFund, set: setEmergencyFund },
            { label: "Total outstanding debt (₹)", val: totalDebt, set: setTotalDebt },
            { label: "Monthly EMI (₹)", val: monthlyEmi, set: setMonthlyEmi },
            { label: "Monthly investment / SIP (₹)", val: monthlySavings, set: setMonthlySavings },
            { label: "Total investments / savings (₹)", val: totalInvestments, set: setTotalInvestments },
            { label: "Your age", val: age, set: setAge },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-ink-soft mb-1">{label}</label>
              <input
                type="number"
                value={val}
                min={0}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full rounded-lg border border-line bg-paper-2 px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-forest/30"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-ink-soft mb-2">Term life insurance?</label>
            <div className="flex gap-3">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => setHasLifeInsurance(v)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    hasLifeInsurance === v
                      ? "border-forest bg-forest text-white"
                      : "border-line text-ink-soft hover:border-forest"
                  }`}
                >
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-soft mb-2">Health insurance?</label>
            <div className="flex gap-3">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => setHasHealthInsurance(v)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    hasHealthInsurance === v
                      ? "border-forest bg-forest text-white"
                      : "border-line text-ink-soft hover:border-forest"
                  }`}
                >
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overall score */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Score circle */}
          <div className="shrink-0 flex flex-col items-center">
            <div className={`flex items-center justify-center w-24 h-24 rounded-full border-4 ${g.bg.replace("bg-", "border-")} bg-paper-2`}>
              <span className={`font-display text-3xl font-700 ${g.text}`}>{g.label}</span>
            </div>
            <p className={`mt-2 text-sm font-semibold ${g.text}`}>{g.desc}</p>
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-1">Overall Financial Health Score</p>
            <p className="font-display text-4xl text-ink font-600">{totalScore}<span className="text-xl text-ink-faint">/{totalMax}</span></p>
            <div className="mt-3 h-3 rounded-full bg-paper-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${g.bg}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-ink-faint">{pct.toFixed(0)}% — {g.desc}</p>
          </div>
        </div>
      </div>

      {/* Section breakdown */}
      <div className="space-y-4">
        <h2 className="font-display text-lg text-ink">Category breakdown</h2>
        {sections.map((s) => {
          const sPct = (s.score / s.max) * 100;
          const sg = gradeColor(sPct);
          return (
            <div key={s.id} className="rounded-xl border border-line bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={`font-display text-xl font-700 ${sg.text}`}>{sg.label}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{s.title}</p>
                    <p className={`text-xs font-semibold ${sg.text}`}>{s.grade}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-ink-soft">{s.score}/{s.max}</p>
              </div>
              <div className="h-2 rounded-full bg-paper-2 overflow-hidden mb-2">
                <div className={`h-full rounded-full ${sg.bg}`} style={{ width: `${sPct}%` }} />
              </div>
              <p className="text-xs text-ink-soft">{s.insight}</p>
            </div>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="rounded-2xl border border-line bg-card p-5">
        <p className="font-semibold text-ink mb-4 text-sm">Your key numbers</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          {[
            { label: "Savings rate", value: `${savingsRate.toFixed(1)}%` },
            { label: "Debt-to-income", value: `${debtToIncomeRatio.toFixed(1)}%` },
            { label: "Emergency fund", value: `${emergencyMonths.toFixed(1)} mo.` },
            { label: "FIRE coverage", value: `${Math.min(fireCoverage, 100).toFixed(0)}%` },
            { label: "Yrs to retirement", value: `${yearsToRetirement}` },
            { label: "Total investments", value: formatCurrency(totalInvestments) },
          ].map((r) => (
            <div key={r.label}>
              <p className="font-display text-xl text-ink">{r.value}</p>
              <p className="text-xs text-ink-faint">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
