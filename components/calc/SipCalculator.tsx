"use client";

import { useMemo, useState, useCallback } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

type Frequency = "monthly" | "quarterly";
const FREQ_MAP: Record<Frequency, number> = { monthly: 12, quarterly: 4 };

function computeSip(p: number, annualRate: number, years: number, freq: Frequency) {
  const periodsPerYear = FREQ_MAP[freq];
  const n = years * periodsPerYear;
  const i = annualRate / 100 / periodsPerYear;
  if (i === 0) return { fv: p * n, invested: p * n, gains: 0 };
  const fv = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = p * n;
  return { fv, invested, gains: fv - invested };
}

function computeStepUpSip(p: number, annualRate: number, years: number, stepUpPct: number, freq: Frequency) {
  const periodsPerYear = FREQ_MAP[freq];
  const n = years * periodsPerYear;
  const i = annualRate / 100 / periodsPerYear;
  let totalInvested = 0;
  let fv = 0;
  let monthlyP = p;
  for (let period = 1; period <= n; period++) {
    if (freq === "monthly" && period > 1 && (period - 1) % 12 === 0) {
      monthlyP *= (1 + stepUpPct / 100);
    } else if (freq === "quarterly" && period > 1 && (period - 1) % 4 === 0) {
      monthlyP *= (1 + stepUpPct / 100);
    }
    totalInvested += monthlyP;
    fv += monthlyP * Math.pow(1 + i, n - period + 1);
  }
  return { fv, invested: totalInvested, gains: fv - totalInvested };
}

function computeYearTable(p: number, annualRate: number, years: number, stepUpPct: number, freq: Frequency) {
  const periodsPerYear = FREQ_MAP[freq];
  const rows: { year: number; annualSip: number; cumInvested: number; corpus: number }[] = [];
  const i = annualRate / 100 / periodsPerYear;
  let monthlyP = p;
  let cumInvested = 0;
  let corpus = 0;
  for (let year = 1; year <= years; year++) {
    let yearInvested = 0;
    for (let period = 1; period <= periodsPerYear; period++) {
      yearInvested += monthlyP;
      cumInvested += monthlyP;
      corpus = (corpus + monthlyP) * (1 + i);
      if (freq === "monthly" && stepUpPct > 0 && period % 12 === 0) {
        monthlyP *= (1 + stepUpPct / 100);
      } else if (freq === "quarterly" && stepUpPct > 0 && period % 4 === 0) {
        monthlyP *= (1 + stepUpPct / 100);
      }
    }
    rows.push({ year, annualSip: Math.round(yearInvested), cumInvested: Math.round(cumInvested), corpus: Math.round(corpus) });
  }
  return rows;
}

export default function SipCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const [stepUp, setStepUp] = useState(0);
  const [freq, setFreq] = useState<Frequency>("monthly");
  const [showTable, setShowTable] = useState(false);

  const sym = currencyMeta[currency].symbol;

  const { invested, future, gains, ltcgTax, afterTax, realValue, yearRows } = useMemo(() => {
    const invRate = 6.5;
    const ltcgRate = 12.5;
    const ltcgExempt = 125000;

    const result = stepUp > 0
      ? computeStepUpSip(monthly, rate, years, stepUp, freq)
      : computeSip(monthly, rate, years, freq);

    const capGain = Math.max(0, result.gains);
    const taxable = Math.max(0, capGain - ltcgExempt);
    const tax = taxable * (ltcgRate / 100);
    const after = result.fv - tax;
    const real = result.fv / Math.pow(1 + invRate / 100, years);
    const rows = computeYearTable(monthly, rate, years, stepUp, freq);
    return {
      invested: Math.round(result.invested),
      future: Math.round(result.fv),
      gains: Math.round(result.gains),
      ltcgTax: Math.round(tax),
      afterTax: Math.round(after),
      realValue: Math.round(real),
      yearRows: rows,
    };
  }, [monthly, rate, years, stepUp, freq]);

  const handleCopy = useCallback(() => {
    const text = `SIP Calculator Results:
Monthly: ${sym}${monthly} | Return: ${rate}% | Tenure: ${years}y | Step-up: ${stepUp}%
Invested: ${formatCurrency(invested, currency)}
Maturity: ${formatCurrency(future, currency)}
Returns: ${formatCurrency(gains, currency)}
LTCG Tax: ${formatCurrency(ltcgTax, currency)}
After Tax: ${formatCurrency(afterTax, currency)}
Real Value: ${formatCurrency(realValue, currency)}`;
    navigator.clipboard.writeText(text);
  }, [monthly, rate, years, stepUp, freq, invested, future, gains, ltcgTax, afterTax, realValue, currency, sym]);

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl text-ink">Your investment</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          {(["monthly", "quarterly"] as const).map((f) => (
            <button key={f} type="button" aria-pressed={freq === f} onClick={() => setFreq(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${freq === f ? "bg-forest text-white" : "bg-paper-2 text-ink-soft hover:text-ink"}`}>
              {f === "monthly" ? "Monthly" : "Quarterly"}
            </button>
          ))}
          <button type="button" onClick={() => setShowTable(!showTable)}
            className="ml-auto text-xs font-medium text-forest hover:underline">
            {showTable ? "Hide table" : "Year table"}
          </button>
        </div>

        <div className="mt-5 space-y-6">
          <Field label={`${freq === "monthly" ? "Monthly" : "Quarterly"} investment`} value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix={sym} />
          <Field label="Expected return rate (p.a.)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%"
            hint="Equity funds historically returned 10-14%. Use 10-12% for large-cap planning." />
          <Field label="Time period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="yrs" />
          <Field label="Annual step-up (%)" value={stepUp} onChange={setStepUp} min={0} max={30} step={1} suffix="%"
            hint="Increase SIP by this % each year. 10% matches typical salary hikes. Set 0 for flat SIP." />
        </div>

        {showTable && yearRows.length > 0 && (
          <div className="mt-6 max-h-72 overflow-y-auto rounded-xl border border-line">
            <table className="w-full text-xs">
              <thead className="bg-paper-2 sticky top-0">
                <tr className="text-ink-faint font-semibold uppercase tracking-wider">
                  <th className="p-2 text-left">Year</th>
                  <th className="p-2 text-right">Annual invest</th>
                  <th className="p-2 text-right">Cumulative</th>
                  <th className="p-2 text-right">Corpus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {yearRows.map((r) => (
                  <tr key={r.year} className="hover:bg-paper-2 transition-colors">
                    <td className="p-2 font-medium text-ink">{r.year}</td>
                    <td className="p-2 text-right text-ink-soft">{sym}{r.annualSip.toLocaleString("en-IN")}</td>
                    <td className="p-2 text-right text-ink-soft">{sym}{r.cumInvested.toLocaleString("en-IN")}</td>
                    <td className="p-2 text-right font-semibold text-forest">{sym}{r.corpus.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Projected value</p>
        <p className="mt-1 font-display text-3xl sm:text-4xl font-600 text-forest break-words">
          {formatCompact(future, currency)}
        </p>
        <p className="text-sm text-ink-faint">{formatCurrency(future, currency)}</p>

        <div className="mt-5">
          <Donut primary={invested} secondary={gains} primaryLabel="Invested" secondaryLabel="Est. returns" size={170} />
        </div>

        <div className="mt-5 space-y-1">
          <Stat label="Total invested" value={formatCurrency(invested, currency)} accent="ink" />
          <Stat label="Est. returns" value={formatCurrency(gains, currency)} accent="brass" />
          <Stat label="Maturity value" value={formatCurrency(future, currency)} accent="forest" />
          {stepUp > 0 && <Stat label="Step-up boost" value={`${stepUp}% yearly`} accent="ink" />}
          <Stat label="LTCG tax (est.)" value={formatCurrency(ltcgTax, currency)} accent="ink" />
          <Stat label="After tax" value={formatCurrency(afterTax, currency)} accent="forest" />
          <Stat label="Inflation-adjusted" value={formatCurrency(realValue, currency)} accent="ink" />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-2 text-xs font-medium text-ink-soft hover:text-forest hover:border-forest transition-colors">
            Copy results
          </button>
        </div>
      </div>
    </div>
  );
}
