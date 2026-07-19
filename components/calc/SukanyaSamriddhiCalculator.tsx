"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function SukanyaSamriddhiCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [yearly, setYearly] = useState(50000);
  const [age, setAge] = useState(5);
  const [rate, setRate] = useState(8.2);

  const valid = yearly > 0;

  const { maturity, invested, interest } = useMemo(() => {
    if (!valid) return { maturity: NaN, invested: NaN, interest: NaN };
    const r = rate / 100;
    // Deposits run for the first 15 years; the account matures 21 years after
    // opening. Each yearly deposit is added at the start of the year and
    // compounds annually all the way to year 21.
    let balance = 0;
    for (let year = 1; year <= 21; year++) {
      if (year <= 15) balance += yearly;
      balance *= 1 + r;
    }
    const inv = yearly * 15;
    return { maturity: balance, invested: inv, interest: balance - inv };
  }, [yearly, rate, valid]);

  const sym = currencyMeta[currency].symbol;
  const showAge = Number.isFinite(age) && age >= 0;
  const ageAtMaturity = age + 21;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Account details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Yearly deposit"
            value={yearly}
            onChange={setYearly}
            min={250}
            max={150000}
            step={1000}
            prefix={sym}
            hint="SSY allows ₹250 to ₹1.5 lakh per financial year."
          />
          <Field
            label="Girl's current age"
            value={age}
            onChange={setAge}
            min={0}
            max={10}
            step={1}
            suffix="yrs"
            hint="An SSY account can be opened any time before she turns 10."
          />
          <Field
            label="Interest rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={6}
            max={9}
            step={0.1}
            suffix="%"
            hint="Current rate, set by the government every quarter — not guaranteed for the full term."
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Maturity value
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(maturity, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          after 21 years{showAge ? `, when she turns ${ageAtMaturity}` : ""}
        </p>

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
          You deposit for 15 years; the account keeps earning interest until it
          matures 21 years after opening. SSY enjoys EEE tax status &ndash;
          deposits qualify under Section 80C, and both the interest and the
          maturity amount are tax-free.
        </p>
      </div>
    </div>
  );
}
