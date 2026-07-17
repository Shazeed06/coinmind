"use client";

import { useMemo, useState } from "react";
import { Field, Stat } from "./shared";

type Unit = "metric" | "imperial";
type Sex = "male" | "female";

const LB_PER_KG = 2.2046226218;

// Classic ideal body weight formulas. Each gives a base weight (kg) at 5 ft
// (60 inches) plus an increment per inch of height above 5 ft.
const FORMULAS = [
  { key: "robinson", label: "Robinson (1983)", male: { base: 52, per: 1.9 }, female: { base: 49, per: 1.7 } },
  { key: "miller", label: "Miller (1983)", male: { base: 56.2, per: 1.41 }, female: { base: 53.1, per: 1.36 } },
  { key: "devine", label: "Devine (1974)", male: { base: 50, per: 2.3 }, female: { base: 45.5, per: 2.3 } },
  { key: "hamwi", label: "Hamwi (1964)", male: { base: 48, per: 2.7 }, female: { base: 45.5, per: 2.2 } },
] as const;

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [sex, setSex] = useState<Sex>("male");
  // Metric height
  const [cm, setCm] = useState(170);
  // Imperial height
  const [ft, setFt] = useState(5);
  const [inch, setInch] = useState(8);

  const result = useMemo(() => {
    let meters = 0;
    let inches = 0;
    if (unit === "metric") {
      meters = cm / 100;
      inches = cm / 2.54;
    } else {
      inches = ft * 12 + inch;
      meters = inches * 0.0254;
    }
    if (!(meters > 0) || !(inches > 0)) return null;

    const rows = FORMULAS.map((f) => {
      const coeff = f[sex];
      const kg = coeff.base + coeff.per * (inches - 60);
      return { key: f.key, label: f.label, kg };
    });

    const values = rows.map((r) => r.kg).filter((v) => Number.isFinite(v) && v > 0);
    if (values.length === 0) return null;

    const low = Math.min(...values);
    const high = Math.max(...values);
    const healthyLow = 18.5 * meters * meters;
    const healthyHigh = 24.9 * meters * meters;
    return { rows, low, high, healthyLow, healthyHigh };
  }, [unit, sex, cm, ft, inch]);

  const isImperial = unit === "imperial";
  const weightUnit = isImperial ? "lb" : "kg";
  const fmtWeight = (w: number) => {
    const v = isImperial ? w * LB_PER_KG : w;
    return `${v.toFixed(1)} ${weightUnit}`;
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Your details</h2>
          <div
            role="group"
            aria-label="Unit system"
            className="inline-flex rounded-lg border border-line-strong bg-card p-0.5"
          >
            <button
              type="button"
              aria-pressed={unit === "metric"}
              onClick={() => setUnit("metric")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                unit === "metric" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              Metric
            </button>
            <button
              type="button"
              aria-pressed={unit === "imperial"}
              onClick={() => setUnit("imperial")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                unit === "imperial" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-7">
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">Sex</p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              <button
                type="button"
                aria-pressed={sex === "male"}
                onClick={() => setSex("male")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  sex === "male" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                aria-pressed={sex === "female"}
                onClick={() => setSex("female")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  sex === "female" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {unit === "metric" ? (
            <Field label="Height" value={cm} onChange={setCm} min={120} max={220} step={1} suffix="cm" />
          ) : (
            <>
              <Field label="Height (feet)" value={ft} onChange={setFt} min={3} max={8} step={1} suffix="ft" />
              <Field label="Height (inches)" value={inch} onChange={setInch} min={0} max={11} step={1} suffix="in" />
            </>
          )}
        </div>

        <p className="mt-7 rounded-xl bg-paper-2 border border-line p-4 text-sm text-ink-soft leading-relaxed">
          These formulas estimate a healthy weight from height alone and don&apos;t account for build,
          muscle, age or body composition. They&apos;re a rough guide, not a target &mdash; consult a
          doctor or dietitian for advice tailored to you.
        </p>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        {result ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">
              Ideal weight range
            </p>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {fmtWeight(result.low)} &ndash; {fmtWeight(result.high)}
            </p>
            <p className="mt-1 text-sm text-ink-faint">across four established formulas</p>

            <div className="mt-6">
              {result.rows.map((r) => (
                <Stat key={r.key} label={r.label} value={fmtWeight(r.kg)} accent="ink" />
              ))}
              <Stat
                label="Healthy weight (BMI 18.5–24.9)"
                value={`${fmtWeight(result.healthyLow)} – ${fmtWeight(result.healthyHigh)}`}
                accent="brass"
              />
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
            <p className="font-display text-lg font-600 text-ink">Enter your height</p>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">
              Add a valid height and choose your sex to see your ideal weight range.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
