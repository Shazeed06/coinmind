"use client";

import { useMemo, useState } from "react";
import { Currency, formatCurrency } from "@/lib/format";
import { CurrencyToggle, Stat } from "./shared";

const PRESETS = [10, 15, 18, 20, 25];

const inputClass =
  "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export default function TipCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [bill, setBill] = useState(60);
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(2);

  const { tip, total, perPerson, tipPerPerson } = useMemo(() => {
    const safeBill = Number.isFinite(bill) && bill > 0 ? bill : 0;
    const safePct = Number.isFinite(tipPct) && tipPct > 0 ? tipPct : 0;
    const safePeople =
      Number.isFinite(people) && people >= 1 ? Math.floor(people) : 1;

    const tipAmount = (safeBill * safePct) / 100;
    const totalBill = safeBill + tipAmount;
    return {
      tip: tipAmount,
      total: totalBill,
      perPerson: totalBill / safePeople,
      tipPerPerson: tipAmount / safePeople,
    };
  }, [bill, tipPct, people]);

  const isPreset = PRESETS.includes(tipPct);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Bill details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        <div className="mt-6 space-y-6">
          {/* Bill amount */}
          <div>
            <label
              htmlFor="tip-bill"
              className="text-sm font-medium text-ink-soft"
            >
              Bill amount
            </label>
            <input
              id="tip-bill"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              value={Number.isFinite(bill) ? bill : ""}
              onChange={(e) => setBill(Number(e.target.value))}
              className={`mt-2 ${inputClass}`}
              placeholder="0"
            />
          </div>

          {/* Tip % preset buttons */}
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">Tip %</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTipPct(p)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    tipPct === p
                      ? "bg-forest text-white"
                      : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>

            {/* Custom tip % */}
            <div className="mt-4">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="tip-custom"
                  className="text-sm font-medium text-ink-soft"
                >
                  Custom tip
                </label>
                <div className="flex items-center rounded-lg border border-line-strong bg-card px-2.5 py-1.5 focus-within:border-forest transition-colors">
                  <input
                    id="tip-custom"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step={1}
                    value={Number.isFinite(tipPct) ? tipPct : ""}
                    onChange={(e) =>
                      setTipPct(
                        Math.min(100, Math.max(0, Number(e.target.value)))
                      )
                    }
                    className="w-16 bg-transparent text-right text-sm font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-sm text-ink-faint ml-1">%</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={Number.isFinite(tipPct) ? Math.min(tipPct, 30) : 0}
                onChange={(e) => setTipPct(Number(e.target.value))}
                className="mt-3 w-full"
                aria-label="Custom tip percentage"
              />
              {!isPreset && (
                <p className="mt-1.5 text-xs text-brass font-medium">
                  Custom {tipPct}% tip
                </p>
              )}
            </div>
          </div>

          {/* Split between N people */}
          <div>
            <label
              htmlFor="tip-people"
              className="text-sm font-medium text-ink-soft"
            >
              Split between N people
            </label>
            <input
              id="tip-people"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={Number.isFinite(people) ? people : ""}
              onChange={(e) => setPeople(Math.floor(Number(e.target.value)))}
              className={`mt-2 ${inputClass}`}
              placeholder="1"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Total bill
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(total, currency)}
        </p>

        <div className="mt-6">
          <Stat
            label="Tip amount"
            value={formatCurrency(tip, currency)}
            accent="brass"
          />
          <Stat
            label="Total bill (bill + tip)"
            value={formatCurrency(total, currency)}
            accent="forest"
          />
          <Stat
            label="Per person"
            value={formatCurrency(perPerson, currency)}
            accent="ink"
          />
          <Stat
            label="Tip per person"
            value={formatCurrency(tipPerPerson, currency)}
            accent="ink"
          />
        </div>

        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          Splitting between{" "}
          <strong className="text-ink">
            {Number.isFinite(people) && people >= 1 ? Math.floor(people) : 1}
          </strong>{" "}
          {(Number.isFinite(people) && people >= 1 ? Math.floor(people) : 1) ===
          1
            ? "person"
            : "people"}{" "}
          at a <strong className="text-ink">{Number.isFinite(tipPct) ? tipPct : 0}%</strong> tip.
          Round up to the nearest note if you&apos;re paying in cash.
        </div>
      </div>
    </div>
  );
}
