"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { Field, Stat, Donut } from "./shared";

type Section = {
  id: string;
  label: string;
  code: string;
  rate: number | null; // null → slab-based (salary)
  note: string;
};

// Current common TDS rates — verify against the latest Finance Act / CBDT rules.
const SECTIONS: Section[] = [
  {
    id: "salary",
    label: "Salary",
    code: "192",
    rate: null,
    note: "TDS on salary is deducted at your average income-tax slab rate, not a flat percentage. Use the income tax calculator to work out the yearly liability.",
  },
  {
    id: "interest",
    label: "Interest (194A)",
    code: "194A",
    rate: 10,
    note: "10% on interest from banks, deposits and others. No TDS applies below the annual threshold; a valid PAN keeps you out of the higher no-PAN rate.",
  },
  {
    id: "professional",
    label: "Professional fees (194J)",
    code: "194J",
    rate: 10,
    note: "10% on professional or technical fees. A lower 2% applies to certain technical services and call-centre payments.",
  },
  {
    id: "rent",
    label: "Rent (194I)",
    code: "194I",
    rate: 10,
    note: "10% on rent for land, buildings or furniture; 2% on plant and machinery. TDS starts once annual rent crosses the threshold.",
  },
  {
    id: "contractor",
    label: "Contractor (194C)",
    code: "194C",
    rate: 1,
    note: "1% when the payee is an individual or HUF, 2% for companies and firms. This estimate uses 1% — adjust if the payee is a company.",
  },
  {
    id: "commission",
    label: "Commission (194H)",
    code: "194H",
    rate: 5,
    note: "5% on brokerage or commission. This rate has been revised in recent Budgets, so confirm the current figure before deducting.",
  },
];

export default function TdsCalculator() {
  const [sectionId, setSectionId] = useState("interest");
  const [amount, setAmount] = useState(100000);
  const [hasPan, setHasPan] = useState(true);

  const section = SECTIONS.find((s) => s.id === sectionId) ?? SECTIONS[1];
  const isSalary = section.rate === null;

  const { rate, tds, net } = useMemo(() => {
    if (isSalary || amount <= 0) return { rate: NaN, tds: NaN, net: NaN };
    // Section 206AA: no PAN → deduct at 20% (or the section rate, whichever is higher).
    const base = section.rate as number;
    const r = hasPan ? base : Math.max(base, 20);
    const t = (amount * r) / 100;
    return { rate: r, tds: t, net: amount - t };
  }, [isSalary, amount, hasPan, section]);

  const valid = !isSalary && amount > 0;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Payment details</h2>
        <div className="mt-6 space-y-7">
          <div>
            <label
              htmlFor="tds-section"
              className="text-sm font-medium text-ink-soft"
            >
              Payment type
            </label>
            <select
              id="tds-section"
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-medium text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/25 transition-colors"
            >
              {SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Payment amount"
            value={amount}
            onChange={setAmount}
            min={0}
            max={10000000}
            step={5000}
            prefix="₹"
          />

          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">
              Recipient has PAN?
            </p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              <button
                type="button"
                aria-pressed={hasPan}
                onClick={() => setHasPan(true)}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  hasPan ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                Has PAN
              </button>
              <button
                type="button"
                aria-pressed={!hasPan}
                onClick={() => setHasPan(false)}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  !hasPan ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                No PAN
              </button>
            </div>
            <p className="mt-2 text-xs text-ink-faint leading-relaxed">
              Without a PAN, Section 206AA requires TDS at a higher 20%.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          TDS deducted
        </p>

        {isSalary ? (
          <>
            <p className="mt-1 font-display text-3xl font-600 text-forest break-words">
              Slab-based
            </p>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              TDS on salary (Section 192) is deducted at your average income-tax
              rate across the year, not a flat percentage. Estimate it with the{" "}
              <Link
                href="/calculators/income-tax"
                className="text-forest underline underline-offset-2"
              >
                income tax calculator
              </Link>{" "}
              and divide by 12 for the monthly deduction.
            </p>
          </>
        ) : (
          <>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {valid ? formatCurrency(tds) : "—"}
            </p>
            <p className="mt-1 text-sm text-ink-faint">
              at {Number.isFinite(rate) ? `${rate}%` : "—"} under Section{" "}
              {section.code}
            </p>

            {valid && (
              <div className="mt-6">
                <Donut
                  primary={net}
                  secondary={tds}
                  primaryLabel="Net paid"
                  secondaryLabel="TDS"
                  size={190}
                />
              </div>
            )}

            <div className="mt-6">
              <Stat
                label="Gross payment"
                value={valid ? formatCurrency(amount) : "—"}
                accent="ink"
              />
              <Stat
                label={`TDS rate (${section.code})`}
                value={Number.isFinite(rate) ? `${rate}%` : "—"}
                accent="brass"
              />
              <Stat
                label="TDS amount"
                value={valid ? formatCurrency(tds) : "—"}
                accent="brass"
              />
              <Stat
                label="Net amount after TDS"
                value={valid ? formatCurrency(net) : "—"}
                accent="forest"
              />
            </div>
          </>
        )}

        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          {section.note}
        </div>

        <p className="mt-3 text-xs text-ink-faint leading-relaxed">
          Current common rates, shown for guidance only. TDS rates, thresholds
          and surcharge change with each Budget &mdash; verify with the latest
          Income Tax Department rules before you deduct.
        </p>
      </div>
    </div>
  );
}
