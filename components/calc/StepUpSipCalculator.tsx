"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function StepUpSipCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [monthly, setMonthly] = useState(5000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const { invested, future, gains, flatFuture, extra } = useMemo(() => {
    const months = years * 12;
    const i = rate / 100 / 12;

    // Step-up SIP: contribution rises by stepUp% after every 12 months.
    let balance = 0;
    let invStepUp = 0;
    let currentSip = monthly;
    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + i) + currentSip;
      invStepUp += currentSip;
      if (m % 12 === 0) currentSip = currentSip * (1 + stepUp / 100);
    }

    // Flat SIP (no top-up) at the same starting amount, for comparison.
    const flat =
      i === 0
        ? monthly * months
        : monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);

    return {
      invested: invStepUp,
      future: balance,
      gains: balance - invStepUp,
      flatFuture: flat,
      extra: balance - flat,
    };
  }, [monthly, stepUp, rate, years]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">
            Your investment
          </h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Monthly SIP amount"
            value={monthly}
            onChange={setMonthly}
            min={0}
            max={1000000}
            step={500}
            prefix={sym}
          />
          <Field
            label="Annual step-up"
            value={stepUp}
            onChange={setStepUp}
            min={0}
            max={25}
            step={1}
            suffix="%"
            hint="How much you increase your monthly SIP each year — ideally in line with your salary hike."
          />
          <Field
            label="Expected return rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={20}
            step={0.5}
            suffix="%"
            hint="Equity mutual funds have historically returned 10–14% over the long term. Returns are not guaranteed."
          />
          <Field
            label="Time period"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="yr"
          />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Total value
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCompact(future, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">{formatCurrency(future, currency)}</p>

        <div className="mt-6">
          <Donut
            primary={invested}
            secondary={gains}
            primaryLabel="Invested"
            secondaryLabel="Est. returns"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Total invested" value={formatCurrency(invested, currency)} accent="ink" />
          <Stat label="Estimated returns" value={formatCurrency(gains, currency)} accent="brass" />
          <Stat label="Total value" value={formatCurrency(future, currency)} accent="forest" />
        </div>

        {/* Step-up vs flat SIP comparison — the headline benefit. */}
        <div className="mt-6 rounded-xl border border-line bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Step-up vs flat SIP
          </p>
          <div className="mt-3">
            <Stat
              label={`Flat SIP (${sym}${monthly.toLocaleString()}/mo, no step-up)`}
              value={formatCurrency(flatFuture, currency)}
              accent="ink"
            />
            <Stat
              label="Extra from stepping up"
              value={`+${formatCurrency(extra, currency)}`}
              accent="forest"
            />
          </div>
          <p className="mt-3 text-xs text-ink-soft leading-relaxed">
            Raising your SIP by {stepUp}% each year grows your corpus by{" "}
            <span className="font-semibold text-forest">
              {formatCompact(extra, currency)}
            </span>{" "}
            more than a flat SIP of the same starting amount.
          </p>
        </div>
      </div>
    </div>
  );
}
