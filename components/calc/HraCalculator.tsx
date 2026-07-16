"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { Field, Donut, Stat } from "./shared";

export default function HraCalculator() {
  const [basic, setBasic] = useState(600000);
  const [hraReceived, setHraReceived] = useState(240000);
  const [rentPaid, setRentPaid] = useState(300000);
  const [city, setCity] = useState<"metro" | "nonmetro">("metro");

  const { actualHra, cityLimit, rentMinusBasic, exempt, taxable, binding } =
    useMemo(() => {
      const cityPct = city === "metro" ? 0.5 : 0.4;
      const a = hraReceived;
      const b = cityPct * basic;
      const c = Math.max(0, rentPaid - 0.1 * basic);

      const e = Math.max(0, Math.min(a, b, c));
      const t = Math.max(0, hraReceived - e);

      // Identify which rule is binding (the lowest of the three).
      let rule: "actual" | "city" | "rent";
      if (e === a) rule = "actual";
      else if (e === b) rule = "city";
      else rule = "rent";

      return {
        actualHra: a,
        cityLimit: b,
        rentMinusBasic: c,
        exempt: e,
        taxable: t,
        binding: rule,
      };
    }, [basic, hraReceived, rentPaid, city]);

  const cityPctLabel = city === "metro" ? "50%" : "40%";

  const bindingNote =
    binding === "actual"
      ? "Your exemption is capped by the actual HRA you received."
      : binding === "city"
        ? `Your exemption is capped by ${cityPctLabel} of your basic salary (the ${
            city === "metro" ? "metro" : "non-metro"
          } limit).`
        : "Your exemption is capped by rent paid minus 10% of your basic salary.";

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Salary &amp; rent</h2>

        <div className="mt-5">
          <p className="text-sm font-medium text-ink-soft mb-2.5">City type</p>
          <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
            <button
              type="button"
              onClick={() => setCity("metro")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                city === "metro"
                  ? "bg-forest text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Metro
            </button>
            <button
              type="button"
              onClick={() => setCity("nonmetro")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                city === "nonmetro"
                  ? "bg-forest text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Non-metro
            </button>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Metro = Delhi, Mumbai, Kolkata or Chennai (
            {city === "metro" ? "50%" : "40%"} of basic applies).
          </p>
        </div>

        <div className="mt-6 space-y-7">
          <Field
            label="Basic salary + DA (per year)"
            value={basic}
            onChange={setBasic}
            min={0}
            max={10000000}
            step={50000}
            prefix="₹"
          />
          <Field
            label="HRA received (per year)"
            value={hraReceived}
            onChange={setHraReceived}
            min={0}
            max={5000000}
            step={10000}
            prefix="₹"
          />
          <Field
            label="Total rent paid (per year)"
            value={rentPaid}
            onChange={setRentPaid}
            min={0}
            max={5000000}
            step={10000}
            prefix="₹"
          />
        </div>

        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          HRA exemption is available under the <strong className="text-ink-soft">old tax regime</strong> only. Enter annual figures.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Exempt HRA
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(exempt, "INR")}
        </p>
        <p className="mt-1 text-sm text-ink-faint">tax-free per year</p>

        <div className="mt-6">
          <Donut
            primary={exempt}
            secondary={taxable}
            primaryLabel="Exempt"
            secondaryLabel="Taxable"
            size={190}
          />
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-1">
            Least of these three is exempt
          </p>
          <Stat
            label="Actual HRA received"
            value={formatCurrency(actualHra, "INR")}
            accent={binding === "actual" ? "forest" : "ink"}
          />
          <Stat
            label={`${cityPctLabel} of basic salary`}
            value={formatCurrency(cityLimit, "INR")}
            accent={binding === "city" ? "forest" : "ink"}
          />
          <Stat
            label="Rent paid − 10% of basic"
            value={formatCurrency(rentMinusBasic, "INR")}
            accent={binding === "rent" ? "forest" : "ink"}
          />
          <Stat
            label="Taxable HRA"
            value={formatCurrency(taxable, "INR")}
            accent="brass"
          />
        </div>

        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          {bindingNote} The exempt amount is the <strong className="text-ink">lowest</strong> of the three, floored at zero.
        </div>
      </div>
    </div>
  );
}
