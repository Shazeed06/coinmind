"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function MutualFundReturnsCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const valid = amount > 0 && years > 0;

  const { future, gains, absReturn, cagr } = useMemo(() => {
    if (!valid) return { future: NaN, gains: NaN, absReturn: NaN, cagr: NaN };
    const fv = amount * Math.pow(1 + rate / 100, years);
    const gain = fv - amount;
    const abs = (gain / amount) * 100;
    const c = (Math.pow(fv / amount, 1 / years) - 1) * 100;
    return { future: fv, gains: gain, absReturn: abs, cagr: c };
  }, [amount, rate, years, valid]);

  const sym = currencyMeta[currency].symbol;
  const fmtPct = (v: number) => (Number.isFinite(v) ? `${v.toFixed(2)}%` : "—");

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Investment details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Invested amount"
            value={amount}
            onChange={setAmount}
            min={0}
            max={50000000}
            step={10000}
            prefix={sym}
          />
          <Field
            label="Expected annual return"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
            hint="Equity funds have historically returned 10–14% over the long run. Returns are not guaranteed."
          />
          <Field
            label="Duration"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="yrs"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Future value
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCompact(future, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          {valid ? formatCurrency(future, currency) : "enter an amount to project growth"}
        </p>

        {valid && (
          <div className="mt-6">
            <Donut
              primary={amount}
              secondary={gains > 0 ? gains : 0}
              primaryLabel="Invested"
              secondaryLabel="Est. returns"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat
            label="Invested amount"
            value={valid ? formatCurrency(amount, currency) : "—"}
            accent="ink"
          />
          <Stat
            label="Total return"
            value={valid ? formatCurrency(gains, currency) : "—"}
            accent="brass"
          />
          <Stat label="Absolute return" value={fmtPct(absReturn)} accent="brass" />
          <Stat label="CAGR" value={fmtPct(cagr)} accent="forest" />
        </div>

        <p className="mt-6 text-sm text-ink-soft leading-relaxed">
          This is the <strong className="text-ink">lumpsum</strong> view for a
          one-time mutual fund investment. Investing a fixed sum every month
          instead? Use the{" "}
          <Link href="/calculators/sip" className="text-forest underline underline-offset-2">
            SIP calculator
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
