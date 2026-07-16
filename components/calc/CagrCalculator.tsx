"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function CagrCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(200000);
  const [years, setYears] = useState(5);

  const valid = initial > 0 && final > 0 && years > 0;

  const { cagr, absReturn, gain } = useMemo(() => {
    if (!valid) return { cagr: NaN, absReturn: NaN, gain: NaN };
    const c = (Math.pow(final / initial, 1 / years) - 1) * 100;
    const abs = ((final - initial) / initial) * 100;
    return { cagr: c, absReturn: abs, gain: final - initial };
  }, [initial, final, years, valid]);

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
            label="Initial investment"
            value={initial}
            onChange={setInitial}
            min={0}
            max={100000000}
            step={10000}
            prefix={sym}
          />
          <Field
            label="Final value"
            value={final}
            onChange={setFinal}
            min={0}
            max={500000000}
            step={10000}
            prefix={sym}
          />
          <Field
            label="Duration"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="yr"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          CAGR
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {fmtPct(cagr)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">compound annual growth rate</p>

        {valid && (
          <div className="mt-6">
            <Donut
              primary={initial}
              secondary={gain > 0 ? gain : 0}
              primaryLabel="Invested"
              secondaryLabel="Total gain"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat label="Absolute return" value={fmtPct(absReturn)} accent="brass" />
          <Stat
            label="Total gain"
            value={valid ? formatCurrency(gain, currency) : "—"}
            accent="forest"
          />
          <Stat label="Duration" value={`${years} yr`} accent="ink" />
        </div>

        {valid ? (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            Your investment grew at{" "}
            <strong className="text-ink">{fmtPct(cagr)}</strong> per year over{" "}
            {years} {years === 1 ? "year" : "years"}.
          </p>
        ) : (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            Enter an initial investment and final value greater than zero to see
            your CAGR.
          </p>
        )}

        <p className="mt-3 text-xs text-ink-faint leading-relaxed">
          As a rough guide, a long-term CAGR of 10&ndash;15% is considered
          healthy for equity investments, though past returns never guarantee
          future ones.
        </p>
      </div>
    </div>
  );
}
