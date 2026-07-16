"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

// Share of basic + DA that lands in the EPF account each month.
// Employee puts in 12%; of the employer's 12%, 8.33% is diverted to EPS
// (pension) and only 3.67% flows into EPF. So EPF-eligible = 15.67%.
const EMPLOYEE_RATE = 0.12; // 12%
const EMPLOYER_EPF_RATE = 0.0367; // 3.67%

export default function EpfCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [currentAge, setCurrentAge] = useState(28);
  const [retireAge, setRetireAge] = useState(58);
  const [basic, setBasic] = useState(30000);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [increase, setIncrease] = useState(5);
  const [rate, setRate] = useState(8.25);

  const { corpus, employeeTotal, employerTotal, interestTotal, invalid } =
    useMemo(() => {
      const years = retireAge - currentAge;
      if (years <= 0) {
        return {
          corpus: openingBalance,
          employeeTotal: 0,
          employerTotal: 0,
          interestTotal: 0,
          invalid: true,
        };
      }

      let balance = openingBalance;
      let empSum = 0;
      let emprSum = 0;
      let intSum = 0;
      let yearlyBasic = basic;

      for (let y = 0; y < years; y++) {
        const empMonthly = yearlyBasic * EMPLOYEE_RATE;
        const emprMonthly = yearlyBasic * EMPLOYER_EPF_RATE;
        const yearContribution = (empMonthly + emprMonthly) * 12;

        empSum += empMonthly * 12;
        emprSum += emprMonthly * 12;

        // Interest for the year: full rate on the opening balance plus roughly
        // half-year of interest on the contributions added through the year.
        const interest =
          (balance + yearContribution / 2) * (rate / 100);
        intSum += interest;

        balance = balance + yearContribution + interest;

        // Salary grows for the next year.
        yearlyBasic = yearlyBasic * (1 + increase / 100);
      }

      return {
        corpus: balance,
        employeeTotal: empSum,
        employerTotal: emprSum,
        interestTotal: intSum,
        invalid: false,
      };
    }, [currentAge, retireAge, basic, openingBalance, increase, rate]);

  const sym = currencyMeta[currency].symbol;
  const years = retireAge - currentAge;
  const contributions = employeeTotal + employerTotal + openingBalance;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">EPF details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Current age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={58}
            step={1}
            suffix="yrs"
          />
          <Field
            label="Retirement age"
            value={retireAge}
            onChange={setRetireAge}
            min={40}
            max={60}
            step={1}
            suffix="yrs"
          />
          <Field
            label="Monthly basic salary + DA"
            value={basic}
            onChange={setBasic}
            min={0}
            max={500000}
            step={1000}
            prefix={sym}
          />
          <Field
            label="Current EPF balance"
            value={openingBalance}
            onChange={setOpeningBalance}
            min={0}
            max={50000000}
            step={10000}
            prefix={sym}
          />
          <Field
            label="Annual salary increase"
            value={increase}
            onChange={setIncrease}
            min={0}
            max={15}
            step={1}
            suffix="%"
          />
          <Field
            label="EPF interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={5}
            max={12}
            step={0.05}
            suffix="%"
          />
        </div>
        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          Simplified model: total EPF contribution is taken as 15.67% of basic +
          DA (employee 12% + employer 3.67%). The employer&apos;s remaining 8.33%
          goes to the EPS pension scheme and is not counted in this corpus.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          EPF corpus at retirement
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(corpus, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          {invalid
            ? "Retirement age must be greater than current age."
            : `in ${years} ${years === 1 ? "year" : "years"} · approx ${formatCompact(corpus, currency)}`}
        </p>

        <div className="mt-6">
          <Donut
            primary={contributions}
            secondary={interestTotal}
            primaryLabel="Contributions"
            secondaryLabel="Interest earned"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat
            label="Total your contribution"
            value={formatCurrency(employeeTotal, currency)}
            accent="ink"
          />
          <Stat
            label="Total employer contribution"
            value={formatCurrency(employerTotal, currency)}
            accent="ink"
          />
          <Stat
            label="Total interest earned"
            value={formatCurrency(interestTotal, currency)}
            accent="brass"
          />
          <Stat
            label="EPF corpus at retirement"
            value={formatCurrency(corpus, currency)}
            accent="forest"
          />
        </div>
      </div>
    </div>
  );
}
