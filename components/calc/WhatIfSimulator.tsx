"use client";

import { useMemo, useState, useEffect } from "react";
import { formatCurrency, formatCompact } from "@/lib/format";

function Field({
  label, value, onChange, min, max, step, prefix, suffix,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; prefix?: string; suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-ink-soft">{label}</span>
        <span className="text-sm font-semibold text-ink tabular-nums">
          {prefix}{value.toLocaleString("en-IN")}{suffix}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-forest h-2 rounded-full"
      />
    </div>
  );
}

function calcFIRE(monthlyInvest: number, returnPct: number, years: number, currentPortfolio: number) {
  const r = returnPct / 100 / 12;
  const n = years * 12;
  const fvSIP = r === 0
    ? monthlyInvest * n
    : monthlyInvest * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const fvCurrentPortfolio = currentPortfolio * Math.pow(1 + r, n);
  return fvSIP + fvCurrentPortfolio;
}

function calcYearsToFIRE(monthlyInvest: number, returnPct: number, fireNumber: number, currentPortfolio: number): number {
  const r = returnPct / 100 / 12;
  for (let months = 1; months <= 600; months++) {
    const fvSIP = r === 0
      ? monthlyInvest * months
      : monthlyInvest * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const fvPortfolio = currentPortfolio * Math.pow(1 + r, months);
    if (fvSIP + fvPortfolio >= fireNumber) return months / 12;
  }
  return 50;
}

export default function WhatIfSimulator() {
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(60000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(20);
  const [currentPortfolio, setCurrentPortfolio] = useState(500000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  // What-if adjustments
  const [extraSavings, setExtraSavings] = useState(0);
  const [expenseReduction, setExpenseReduction] = useState(0);
  const [returnBoost, setReturnBoost] = useState(0);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const inc = sp.get("inc"); if (inc && !isNaN(+inc)) setMonthlyIncome(+inc);
    const exp = sp.get("exp"); if (exp && !isNaN(+exp)) setMonthlyExpenses(+exp);
    const ret = sp.get("ret"); if (ret && !isNaN(+ret)) setExpectedReturn(+ret);
    const yrs = sp.get("yrs"); if (yrs && !isNaN(+yrs)) setYears(+yrs);
    const pf = sp.get("pf"); if (pf && !isNaN(+pf)) setCurrentPortfolio(+pf);
    const wr = sp.get("wr"); if (wr && !isNaN(+wr)) setWithdrawalRate(+wr);
    const es = sp.get("es"); if (es && !isNaN(+es)) setExtraSavings(+es);
    const er = sp.get("er"); if (er && !isNaN(+er)) setExpenseReduction(+er);
    const rb = sp.get("rb"); if (rb && !isNaN(+rb)) setReturnBoost(+rb);
  }, []);

  useEffect(() => {
    const sp = new URLSearchParams();
    sp.set("inc", String(monthlyIncome));
    sp.set("exp", String(monthlyExpenses));
    sp.set("ret", String(expectedReturn));
    sp.set("yrs", String(years));
    sp.set("pf", String(currentPortfolio));
    sp.set("wr", String(withdrawalRate));
    if (extraSavings > 0) sp.set("es", String(extraSavings));
    if (expenseReduction > 0) sp.set("er", String(expenseReduction));
    if (returnBoost > 0) sp.set("rb", String(returnBoost));
    window.history.replaceState(null, "", `${window.location.pathname}?${sp}`);
  }, [monthlyIncome, monthlyExpenses, expectedReturn, years, currentPortfolio, withdrawalRate, extraSavings, expenseReduction, returnBoost]);

  const base = useMemo(() => {
    const monthly = monthlyIncome - monthlyExpenses;
    const annualExpenses = monthlyExpenses * 12;
    const fireNumber = annualExpenses / (withdrawalRate / 100);
    const corpus = calcFIRE(monthly, expectedReturn, years, currentPortfolio);
    const yearsToFire = calcYearsToFIRE(monthly, expectedReturn, fireNumber, currentPortfolio);
    const passiveIncome = corpus * (withdrawalRate / 100) / 12;
    return { monthly, fireNumber, corpus, yearsToFire, passiveIncome };
  }, [monthlyIncome, monthlyExpenses, expectedReturn, years, currentPortfolio, withdrawalRate]);

  const whatif = useMemo(() => {
    const newExpenses = monthlyExpenses - expenseReduction;
    const monthly = monthlyIncome - newExpenses + extraSavings;
    const newReturn = expectedReturn + returnBoost;
    const annualExpenses = newExpenses * 12;
    const fireNumber = annualExpenses / (withdrawalRate / 100);
    const corpus = calcFIRE(monthly, newReturn, years, currentPortfolio);
    const yearsToFire = calcYearsToFIRE(monthly, newReturn, fireNumber, currentPortfolio);
    const passiveIncome = corpus * (withdrawalRate / 100) / 12;
    const hasChange = extraSavings > 0 || expenseReduction > 0 || returnBoost > 0;
    return { monthly, fireNumber, corpus, yearsToFire, passiveIncome, hasChange };
  }, [monthlyIncome, monthlyExpenses, expectedReturn, years, currentPortfolio, withdrawalRate, extraSavings, expenseReduction, returnBoost]);

  const currentSavingsRate = Math.round(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100);

  return (
    <div className="space-y-6">
      {/* Current situation */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl text-ink mb-5">Your current situation</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Monthly income (take-home)" value={monthlyIncome} onChange={setMonthlyIncome} min={20000} max={1000000} step={5000} prefix="₹" />
          <Field label="Monthly expenses (all costs)" value={monthlyExpenses} onChange={setMonthlyExpenses} min={10000} max={500000} step={2000} prefix="₹" />
          <Field label="Current portfolio / savings" value={currentPortfolio} onChange={setCurrentPortfolio} min={0} max={10000000} step={50000} prefix="₹" />
          <Field label="Expected return" value={expectedReturn} onChange={setExpectedReturn} min={5} max={18} step={0.5} suffix="% p.a." />
          <Field label="Planning horizon" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
          <Field label="Safe withdrawal rate" value={withdrawalRate} onChange={setWithdrawalRate} min={2} max={6} step={0.5} suffix="%" />
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-ink-soft">
          <span>Current savings rate:</span>
          <span className={`font-bold text-base ${currentSavingsRate >= 30 ? "text-forest" : currentSavingsRate >= 20 ? "text-brass" : "text-red-500"}`}>
            {currentSavingsRate}%
          </span>
          <span className="text-ink-faint">
            {currentSavingsRate >= 30 ? "Excellent" : currentSavingsRate >= 20 ? "Good" : "Needs improvement"}
          </span>
        </div>
      </div>

      {/* What-if sliders */}
      <div className="rounded-2xl border-2 border-forest/30 bg-forest-soft p-6 sm:p-7">
        <h2 className="font-display text-xl text-forest-deep mb-2">What if I…</h2>
        <p className="text-sm text-forest-deep mb-5 opacity-75">Adjust these sliders to see how small changes compound over time.</p>
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <Field label="Invest extra per month" value={extraSavings} onChange={setExtraSavings} min={0} max={50000} step={500} prefix="₹" />
            <p className="text-xs text-ink-faint mt-1">e.g. skip one OTT, pack lunch</p>
          </div>
          <div>
            <Field label="Cut expenses by" value={expenseReduction} onChange={setExpenseReduction} min={0} max={30000} step={500} prefix="₹" />
            <p className="text-xs text-ink-faint mt-1">reduces FIRE number too</p>
          </div>
          <div>
            <Field label="Improve return by" value={returnBoost} onChange={setReturnBoost} min={0} max={4} step={0.5} suffix="%" />
            <p className="text-xs text-ink-faint mt-1">e.g. FD → index fund</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Base scenario */}
        <div className="rounded-2xl border border-line bg-paper-2 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-4">Current scenario</p>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-ink-faint">Monthly savings</p>
              <p className="font-display text-2xl text-ink">{formatCurrency(base.monthly)}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint">FIRE number (corpus needed)</p>
              <p className="font-display text-2xl text-ink">{formatCompact(base.fireNumber)}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint">Corpus in {years} years</p>
              <p className="font-display text-2xl text-forest">{formatCompact(base.corpus)}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint">Monthly passive income (at {withdrawalRate}% SWR)</p>
              <p className="font-display text-2xl text-brass">{formatCurrency(base.passiveIncome)}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint">Years to FIRE</p>
              <p className="font-display text-2xl text-ink">{base.yearsToFire > 49 ? "50+" : base.yearsToFire.toFixed(1)} years</p>
            </div>
          </div>
        </div>

        {/* What-if scenario */}
        <div className={`rounded-2xl border-2 p-6 ${whatif.hasChange ? "border-forest bg-forest-soft" : "border-dashed border-line bg-card"}`}>
          <p className="text-xs font-bold uppercase tracking-wider text-forest-deep mb-4">
            {whatif.hasChange ? "What-if scenario" : "Adjust sliders above →"}
          </p>
          {whatif.hasChange ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-ink-faint">Monthly savings</p>
                <p className="font-display text-2xl text-ink">{formatCurrency(whatif.monthly)}</p>
                <p className="text-xs text-forest font-medium">+{formatCurrency(whatif.monthly - base.monthly)}/month</p>
              </div>
              <div>
                <p className="text-xs text-ink-faint">FIRE number</p>
                <p className="font-display text-2xl text-ink">{formatCompact(whatif.fireNumber)}</p>
                {whatif.fireNumber < base.fireNumber && (
                  <p className="text-xs text-forest font-medium">−{formatCompact(base.fireNumber - whatif.fireNumber)} lower target</p>
                )}
              </div>
              <div>
                <p className="text-xs text-ink-faint">Corpus in {years} years</p>
                <p className="font-display text-2xl text-forest">{formatCompact(whatif.corpus)}</p>
                <p className="text-xs text-forest font-medium">+{formatCompact(whatif.corpus - base.corpus)} more</p>
              </div>
              <div>
                <p className="text-xs text-ink-faint">Monthly passive income</p>
                <p className="font-display text-2xl text-brass">{formatCurrency(whatif.passiveIncome)}</p>
                <p className="text-xs text-forest font-medium">+{formatCurrency(whatif.passiveIncome - base.passiveIncome)}/month</p>
              </div>
              <div>
                <p className="text-xs text-ink-faint">Years to FIRE</p>
                <p className="font-display text-2xl text-forest">{whatif.yearsToFire > 49 ? "50+" : whatif.yearsToFire.toFixed(1)} years</p>
                {base.yearsToFire - whatif.yearsToFire > 0.1 && (
                  <p className="text-xs text-forest font-bold">
                    {(base.yearsToFire - whatif.yearsToFire).toFixed(1)} years earlier!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <p className="text-sm text-ink-faint text-center">Move the "What if I…" sliders to see how your numbers change.</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-ink-faint text-center">
        Based on {expectedReturn}% p.a. return, {withdrawalRate}% safe withdrawal rate, {years}-year horizon. Returns are not guaranteed.
      </p>
    </div>
  );
}
