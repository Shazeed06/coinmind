"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function MortgageCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [price, setPrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(6.5);

  const loanAmount = Math.max(0, price - downPayment);
  const valid = loanAmount > 0 && years > 0;

  const { monthly, totalInterest, totalPayment } = useMemo(() => {
    if (!valid) return { monthly: NaN, totalInterest: NaN, totalPayment: NaN };
    const n = years * 12;
    const i = rate / 12 / 100;
    const m =
      i === 0
        ? loanAmount / n
        : (loanAmount * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const total = m * n;
    return { monthly: m, totalInterest: total - loanAmount, totalPayment: total };
  }, [loanAmount, rate, years, valid]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Mortgage details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Home price"
            value={price}
            onChange={setPrice}
            min={0}
            max={5000000}
            step={5000}
            prefix={sym}
          />
          <Field
            label="Down payment"
            value={downPayment}
            onChange={setDownPayment}
            min={0}
            max={2500000}
            step={5000}
            prefix={sym}
            hint="A larger deposit shrinks the loan amount and the interest you pay."
          />
          <Field
            label="Loan term"
            value={years}
            onChange={setYears}
            min={5}
            max={40}
            step={1}
            suffix="yrs"
            hint="30 years is the US standard; 25 years is common in the UK."
          />
          <Field
            label="Interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={15}
            step={0.05}
            suffix="%"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Monthly payment
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(monthly, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          {valid
            ? `principal & interest for ${years * 12} months`
            : "enter a price above your down payment"}
        </p>

        {valid && (
          <div className="mt-6">
            <Donut
              primary={loanAmount}
              secondary={totalInterest > 0 ? totalInterest : 0}
              primaryLabel="Principal"
              secondaryLabel="Interest"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat
            label="Loan amount"
            value={valid ? formatCurrency(loanAmount, currency) : "—"}
            accent="ink"
          />
          <Stat
            label="Total interest"
            value={valid ? formatCurrency(totalInterest, currency) : "—"}
            accent="brass"
          />
          <Stat
            label="Total paid"
            value={valid ? formatCurrency(totalPayment, currency) : "—"}
            accent="forest"
          />
        </div>

        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          This covers principal and interest only. Property taxes, home insurance,
          HOA fees and any mortgage insurance are extra and vary by location.
        </p>
      </div>
    </div>
  );
}
