"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

const UNITS = [
  { label: "Years", value: "years" as const },
  { label: "Months", value: "months" as const },
];

export default function RdCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [unit, setUnit] = useState<"years" | "months">("years");
  const [tenure, setTenure] = useState(5);

  const months = unit === "years" ? Math.round(tenure * 12) : Math.round(tenure);
  const valid = monthly > 0 && months > 0;

  const { maturity, invested, interest } = useMemo(() => {
    if (!valid) return { maturity: NaN, invested: NaN, interest: NaN };
    const inv = monthly * months;
    // RD maturity with quarterly compounding — every monthly installment
    // compounds each quarter until the deposit matures.
    const i = rate / 400; // quarterly rate as a decimal
    const n = months / 3; // number of quarters
    const m =
      rate === 0
        ? inv
        : (monthly * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3));
    return { maturity: m, invested: inv, interest: m - inv };
  }, [monthly, rate, months, valid]);

  const sym = currencyMeta[currency].symbol;

  const switchUnit = (u: "years" | "months") => {
    if (u === unit) return;
    if (u === "months") setTenure((t) => Math.min(360, Math.max(1, Math.round(t * 12))));
    else setTenure((t) => Math.max(1, Math.round(t / 12)));
    setUnit(u);
  };

  const tenureLabel =
    unit === "years"
      ? `${tenure} ${tenure === 1 ? "year" : "years"}`
      : `${months} ${months === 1 ? "month" : "months"}`;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Deposit details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Monthly deposit"
            value={monthly}
            onChange={setMonthly}
            min={100}
            max={1000000}
            step={500}
            prefix={sym}
          />
          <Field
            label="Interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={15}
            step={0.1}
            suffix="%"
          />
          <Field
            label="Tenure"
            value={tenure}
            onChange={setTenure}
            min={1}
            max={unit === "years" ? 30 : 360}
            step={1}
            suffix={unit === "years" ? "yrs" : "mo"}
          />
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">Tenure in</p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              {UNITS.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  onClick={() => switchUnit(u.value)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    unit === u.value ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Maturity value
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(maturity, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">after {tenureLabel}</p>

        {valid && (
          <div className="mt-6">
            <Donut
              primary={invested}
              secondary={interest > 0 ? interest : 0}
              primaryLabel="Invested"
              secondaryLabel="Interest earned"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat
            label="Total invested"
            value={valid ? formatCurrency(invested, currency) : "—"}
            accent="ink"
          />
          <Stat
            label="Total interest"
            value={valid ? formatCurrency(interest, currency) : "—"}
            accent="brass"
          />
          <Stat
            label="Maturity value"
            value={valid ? formatCurrency(maturity, currency) : "—"}
            accent="forest"
          />
        </div>

        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          Most banks and post offices compound RD interest quarterly. Rates and
          rules vary by provider &ndash; confirm the current rate before you open
          an account.
        </p>
      </div>
    </div>
  );
}
