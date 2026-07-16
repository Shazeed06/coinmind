"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function SwpCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [corpus, setCorpus] = useState(1000000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const { totalWithdrawn, finalBalance, monthsPaid, exhaustedYear, profit } = useMemo(() => {
    const totalMonths = years * 12;
    const monthlyRate = rate / 100 / 12;
    let balance = corpus;
    let paid = 0;
    let exhausted: number | null = null;

    for (let m = 1; m <= totalMonths; m++) {
      // Grow the remaining balance for the month, then withdraw.
      const grown = balance * (1 + monthlyRate);
      if (grown >= withdrawal) {
        balance = grown - withdrawal;
        paid += 1;
      } else {
        // Corpus can't cover a full withdrawal — pay out whatever is left and stop.
        paid += grown > 0 ? 1 : 0;
        balance = 0;
        exhausted = Math.ceil(m / 12);
        break;
      }
    }

    const withdrawn = withdrawal * paid;
    // Returns earned across the plan = (money withdrawn + money still invested) − money put in.
    const earned = Math.max(withdrawn + balance - corpus, 0);

    return {
      totalWithdrawn: withdrawn,
      finalBalance: balance,
      monthsPaid: paid,
      exhaustedYear: exhausted,
      profit: earned,
    };
  }, [corpus, withdrawal, rate, years]);

  const sym = currencyMeta[currency].symbol;
  const lasts = exhaustedYear === null;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Withdrawal plan</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Total investment"
            value={corpus}
            onChange={setCorpus}
            min={0}
            max={100000000}
            step={50000}
            prefix={sym}
          />
          <Field
            label="Monthly withdrawal"
            value={withdrawal}
            onChange={setWithdrawal}
            min={500}
            max={1000000}
            step={500}
            prefix={sym}
          />
          <Field
            label="Expected return rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={20}
            step={0.5}
            suffix="%"
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

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Total withdrawal
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(totalWithdrawn, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          over {monthsPaid} {monthsPaid === 1 ? "month" : "months"}
        </p>

        <div className="mt-6">
          <Donut
            primary={totalWithdrawn}
            secondary={Math.max(finalBalance, 0)}
            primaryLabel="Total withdrawn"
            secondaryLabel="Remaining balance"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat
            label="Total withdrawal"
            value={formatCurrency(totalWithdrawn, currency)}
            accent="brass"
          />
          <Stat
            label="Final balance"
            value={formatCurrency(finalBalance, currency)}
            accent="forest"
          />
          <Stat
            label="Total profit earned"
            value={formatCurrency(profit, currency)}
            accent="ink"
          />
        </div>

        <div
          className={`mt-5 rounded-xl border p-4 text-sm leading-relaxed ${
            lasts
              ? "border-line bg-card text-ink-soft"
              : "border-brass/40 bg-forest-soft text-ink-soft"
          }`}
        >
          {lasts ? (
            <>
              Your corpus lasts the full {years}-year period and still has{" "}
              <strong className="text-forest">
                {formatCurrency(finalBalance, currency)}
              </strong>{" "}
              left.
            </>
          ) : (
            <>
              <strong className="text-ink">⚠️ Your corpus runs out in year {exhaustedYear}</strong>{" "}
              at this withdrawal rate. Lower your monthly withdrawal or expect a
              higher return to make it last the full {years} years.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
