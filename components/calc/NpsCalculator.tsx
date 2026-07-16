"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function NpsCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [monthly, setMonthly] = useState(10000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [rate, setRate] = useState(10);
  const [annuityPct, setAnnuityPct] = useState(40);
  const [annuityRate, setAnnuityRate] = useState(6);

  const {
    months,
    invested,
    corpus,
    returns,
    lumpSum,
    annuityCorpus,
    pension,
    valid,
  } = useMemo(() => {
    const n = Math.round((retireAge - currentAge) * 12);
    if (n <= 0) {
      return {
        months: 0,
        invested: 0,
        corpus: 0,
        returns: 0,
        lumpSum: 0,
        annuityCorpus: 0,
        pension: 0,
        valid: false,
      };
    }
    const i = rate / 12 / 100;
    // Future value of a monthly SIP contributed at the start of each month.
    const fv =
      i > 0
        ? monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
        : monthly * n;
    const inv = monthly * n;
    const annuityCorp = fv * (annuityPct / 100);
    const lump = fv - annuityCorp;
    const pen = annuityCorp * (annuityRate / 12 / 100);
    return {
      months: n,
      invested: inv,
      corpus: fv,
      returns: fv - inv,
      lumpSum: lump,
      annuityCorpus: annuityCorp,
      pension: pen,
      valid: true,
    };
  }, [monthly, currentAge, retireAge, rate, annuityPct, annuityRate]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Pension details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Monthly contribution"
            value={monthly}
            onChange={setMonthly}
            min={0}
            max={200000}
            step={500}
            prefix={sym}
          />
          <Field
            label="Current age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={60}
            step={1}
            suffix="yr"
          />
          <Field
            label="Retirement age"
            value={retireAge}
            onChange={setRetireAge}
            min={40}
            max={75}
            step={1}
            suffix="yr"
          />
          <Field
            label="Expected return (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={15}
            step={0.5}
            suffix="%"
          />
          <Field
            label="Annuity portion at retirement"
            value={annuityPct}
            onChange={setAnnuityPct}
            min={40}
            max={100}
            step={5}
            suffix="%"
            hint="NPS rules require at least 40% of the corpus to buy an annuity."
          />
          <Field
            label="Expected annuity return (p.a.)"
            value={annuityRate}
            onChange={setAnnuityRate}
            min={1}
            max={10}
            step={0.5}
            suffix="%"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Estimated monthly pension
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(pension, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          {valid
            ? `from age ${retireAge}, on a ${annuityPct}% annuity`
            : "Retirement age must be above your current age."}
        </p>

        <div className="mt-6">
          <Donut
            primary={invested}
            secondary={returns}
            primaryLabel="Invested"
            secondaryLabel="Returns"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Total invested" value={formatCurrency(invested, currency)} accent="ink" />
          <Stat
            label={`Total corpus at ${valid ? retireAge : 60}`}
            value={formatCurrency(corpus, currency)}
            accent="forest"
          />
          <Stat
            label="Lump sum (tax-free portion)"
            value={formatCurrency(lumpSum, currency)}
            accent="brass"
          />
          <Stat
            label="Pension wealth (annuity)"
            value={formatCurrency(annuityCorpus, currency)}
            accent="ink"
          />
        </div>
      </div>
    </div>
  );
}
