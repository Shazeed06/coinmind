"use client";

import { useMemo, useState } from "react";

// 8th Pay Commission salary estimator. The core revision is:
//   New Basic Pay = Current Basic Pay (7th CPC) x Fitment Factor
// The fitment factor is NOT yet finalised by the government; widely reported
// estimates run ~1.83 to 2.86, with unions demanding up to 3.25 (the 7th CPC
// used 2.57). HRA is shown at the current 7th CPC rates (24/18/9% of basic for
// X/Y/Z cities), which may themselves be revised. Everything here is an
// estimate, not an official figure.

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const FITMENT_PRESETS = [
  { v: 1.83, label: "1.83 (low estimate)" },
  { v: 2.28, label: "2.28 (mid estimate)" },
  { v: 2.57, label: "2.57 (7th CPC)" },
  { v: 2.86, label: "2.86 (high estimate)" },
  { v: 3.25, label: "3.25 (union demand)" },
];

const CITY_CLASSES = [
  { id: "X", label: "X - metro (24% HRA)", rate: 0.24 },
  { id: "Y", label: "Y - other city (18% HRA)", rate: 0.18 },
  { id: "Z", label: "Z - small town (9% HRA)", rate: 0.09 },
] as const;

const inputClass =
  "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export default function EighthPayCommissionCalculator() {
  const [basic, setBasic] = useState("25500");
  const [fitment, setFitment] = useState(2.86);
  const [cityId, setCityId] = useState<"X" | "Y" | "Z">("X");

  const result = useMemo(() => {
    const b = Number(basic);
    if (!Number.isFinite(b) || b <= 0) return null;
    const city = CITY_CLASSES.find((c) => c.id === cityId)!;
    const newBasic = b * fitment;
    const hra = newBasic * city.rate;
    const total = newBasic + hra;
    const basicIncrease = newBasic - b;
    const hikePct = (basicIncrease / b) * 100;
    return { newBasic, hra, total, basicIncrease, hikePct };
  }, [basic, fitment, cityId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-ink-soft">
              Current basic pay (7th CPC, ₹/month)
            </label>
            <input
              type="number"
              inputMode="numeric"
              aria-label="Current basic pay"
              value={basic}
              placeholder="e.g. 25500"
              onChange={(e) => setBasic(e.target.value)}
              className={`mt-2 ${inputClass}`}
            />
            <p className="mt-1.5 text-xs text-ink-faint">
              Your basic pay only, not gross. Entry-level (Level 1) starts at ₹18,000.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-ink-soft">
              Expected fitment factor
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {FITMENT_PRESETS.map((f) => (
                <button
                  key={f.v}
                  type="button"
                  onClick={() => setFitment(f.v)}
                  aria-pressed={fitment === f.v}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    fitment === f.v
                      ? "bg-forest text-white"
                      : "border border-line-strong bg-card text-ink-soft hover:border-forest hover:text-forest"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-ink-faint">
              Not yet finalised. Reported estimates run 1.83-2.86; unions demand 3.25.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-ink-soft">City class (for HRA)</label>
            <div className="mt-2 flex flex-col gap-1.5">
              {CITY_CLASSES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCityId(c.id)}
                  aria-pressed={cityId === c.id}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    cityId === c.id
                      ? "bg-forest-soft text-forest"
                      : "border border-line bg-card text-ink-soft hover:border-forest/40"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          Estimate only. New basic = current basic x fitment factor. DA resets to
          0% at implementation, so it is not added here; Transport Allowance and
          other allowances are extra. Final figures depend on the official pay matrix.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Estimated new basic pay
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {result ? inr.format(Math.round(result.newBasic)) : "-"}
        </p>

        {result ? (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-card border border-line px-4 py-3 text-sm">
              <span className="text-ink-soft">Basic pay increase</span>
              <span className="font-semibold text-ink">
                +{inr.format(Math.round(result.basicIncrease))} ({result.hikePct.toFixed(0)}%)
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-card border border-line px-4 py-3 text-sm">
              <span className="text-ink-soft">HRA (estimate)</span>
              <span className="font-semibold text-ink">{inr.format(Math.round(result.hra))}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-forest-soft/60 border border-forest/20 px-4 py-3 text-sm">
              <span className="font-medium text-ink">Basic + HRA (per month)</span>
              <span className="font-display text-lg font-bold text-forest">
                {inr.format(Math.round(result.total))}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
            Enter your current basic pay to see the estimated revised pay.
          </div>
        )}
      </div>
    </div>
  );
}
