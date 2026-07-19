"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, CurrencyToggle, Stat } from "./shared";

export default function HourlyToSalaryCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [wage, setWage] = useState(25);
  const [hours, setHours] = useState(40);
  const [weeks, setWeeks] = useState(52);

  const { annual, monthly, weekly, daily } = useMemo(() => {
    const safeWage = Number.isFinite(wage) && wage > 0 ? wage : 0;
    const safeHours = Number.isFinite(hours) && hours > 0 ? hours : 0;
    const safeWeeks = Number.isFinite(weeks) && weeks > 0 ? weeks : 0;
    const wk = safeWage * safeHours;
    const yr = wk * safeWeeks;
    return {
      annual: yr,
      monthly: yr / 12,
      weekly: wk,
      daily: wk / 5,
    };
  }, [wage, hours, weeks]);

  const sym = currencyMeta[currency].symbol;
  const valid = Number.isFinite(wage) && wage > 0;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Pay details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Hourly wage"
            value={wage}
            onChange={setWage}
            min={0}
            max={500}
            step={1}
            prefix={sym}
          />
          <Field
            label="Hours per week"
            value={hours}
            onChange={setHours}
            min={1}
            max={80}
            step={1}
            suffix="hr"
          />
          <Field
            label="Weeks worked per year"
            value={weeks}
            onChange={setWeeks}
            min={1}
            max={52}
            step={1}
            suffix="wk"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Annual salary
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(annual, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">gross, before tax</p>

        <div className="mt-6">
          <Stat
            label="Monthly"
            value={valid ? formatCurrency(monthly, currency) : "—"}
            accent="forest"
          />
          <Stat
            label="Weekly"
            value={valid ? formatCurrency(weekly, currency) : "—"}
            accent="brass"
          />
          <Stat
            label="Daily (5-day week)"
            value={valid ? formatCurrency(daily, currency) : "—"}
            accent="ink"
          />
          <Stat
            label="Hourly"
            value={valid ? formatCurrency(wage, currency) : "—"}
            accent="ink"
          />
        </div>

        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          Based on{" "}
          <strong className="text-ink">
            {Number.isFinite(hours) ? hours : 0} hours
          </strong>{" "}
          a week over{" "}
          <strong className="text-ink">
            {Number.isFinite(weeks) ? weeks : 0} weeks
          </strong>{" "}
          a year. These are gross figures &mdash; your take-home pay will be
          lower after tax and deductions.
        </div>
      </div>
    </div>
  );
}
