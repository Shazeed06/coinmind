"use client";

import { useMemo, useState } from "react";
import { Field, Stat } from "./shared";

type Unit = "metric" | "imperial";

const LB_PER_KG = 2.2046226218;
const KG_PER_LB = 0.45359237;

// BMI category with a semantic colour. Underweight (blue) and Normal (green)
// reuse brand tokens; Overweight (amber) and Obese (magenta/berry) use warm
// warning hues so all four bands stay visually distinct.
function categoryFor(bmi: number): { name: string; color: string; bg: string } {
  if (bmi < 18.5)
    return { name: "Underweight", color: "var(--color-forest)", bg: "var(--color-forest-soft)" };
  if (bmi < 25)
    return { name: "Normal weight", color: "var(--color-brass)", bg: "var(--color-brass-soft)" };
  if (bmi < 30) return { name: "Overweight", color: "#b45309", bg: "#f7ead2" };
  return { name: "Obese", color: "var(--color-berry)", bg: "#fbe0ec" };
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  // Metric inputs
  const [cm, setCm] = useState(170);
  const [kg, setKg] = useState(70);
  // Imperial inputs
  const [ft, setFt] = useState(5);
  const [inch, setInch] = useState(8);
  const [lb, setLb] = useState(154);

  const result = useMemo(() => {
    let meters = 0;
    let weightKg = 0;
    if (unit === "metric") {
      meters = cm / 100;
      weightKg = kg;
    } else {
      const totalInches = ft * 12 + inch;
      meters = totalInches * 0.0254;
      weightKg = lb * KG_PER_LB;
    }
    if (!(meters > 0) || !(weightKg > 0)) return null;
    const bmi = weightKg / (meters * meters);
    if (!Number.isFinite(bmi) || bmi <= 0) return null;
    // Healthy weight (kg) for this height at the 18.5–24.9 BMI band.
    const lowKg = 18.5 * meters * meters;
    const highKg = 24.9 * meters * meters;
    return { bmi, low: lowKg, high: highKg };
  }, [unit, cm, kg, ft, inch, lb]);

  const isImperial = unit === "imperial";
  const weightUnit = isImperial ? "lb" : "kg";
  const fmtWeight = (w: number) => {
    const v = isImperial ? w * LB_PER_KG : w;
    return `${v.toFixed(1)} ${weightUnit}`;
  };

  const cat = result ? categoryFor(result.bmi) : null;
  // Marker across a 12–40 BMI scale.
  const markerPct = result
    ? Math.min(100, Math.max(0, ((result.bmi - 12) / 28) * 100))
    : 0;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Your measurements</h2>
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
          {unit === "metric" ? (
            <>
              <Field label="Height" value={cm} onChange={setCm} min={100} max={220} step={1} suffix="cm" />
              <Field label="Weight" value={kg} onChange={setKg} min={20} max={200} step={1} suffix="kg" />
            </>
          ) : (
            <>
              <Field label="Height (feet)" value={ft} onChange={setFt} min={3} max={8} step={1} suffix="ft" />
              <Field label="Height (inches)" value={inch} onChange={setInch} min={0} max={11} step={1} suffix="in" />
              <Field label="Weight" value={lb} onChange={setLb} min={50} max={450} step={1} suffix="lb" />
            </>
          )}
        </div>

        <p className="mt-7 rounded-xl bg-paper-2 border border-line p-4 text-sm text-ink-soft leading-relaxed">
          BMI is a general screening tool, not a diagnosis. It doesn&apos;t account for muscle mass,
          bone density, age or where you carry fat, so athletes and older adults can be misclassified.
          Treat it as a starting point and consult a doctor for a proper assessment.
        </p>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        {result && cat ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">Your BMI</p>
            <div className="mt-1 flex flex-wrap items-end gap-3">
              <span className="font-display text-5xl font-600 text-forest leading-none">
                {result.bmi.toFixed(1)}
              </span>
              <span
                className="mb-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold"
                style={{ color: cat.color, backgroundColor: cat.bg }}
              >
                {cat.name}
              </span>
            </div>

            {/* Category scale */}
            <div className="mt-6" aria-hidden="true">
              <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                <span style={{ width: "23.2%", backgroundColor: "var(--color-forest)" }} />
                <span style={{ width: "23.2%", backgroundColor: "var(--color-brass)" }} />
                <span style={{ width: "17.9%", backgroundColor: "#d99427" }} />
                <span style={{ width: "35.7%", backgroundColor: "var(--color-berry)" }} />
              </div>
              <div className="relative mt-1 h-4">
                <span
                  className="absolute -translate-x-1/2 text-xs leading-none text-ink"
                  style={{ left: `${markerPct}%` }}
                >
                  ▲
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-faint">
                <span>Under</span>
                <span>Normal</span>
                <span>Over</span>
                <span>Obese</span>
              </div>
            </div>

            <div className="mt-6">
              <Stat label="Healthy BMI range" value="18.5 – 24.9" accent="ink" />
              <Stat
                label="Healthy weight for your height"
                value={`${fmtWeight(result.low)} – ${fmtWeight(result.high)}`}
                accent="brass"
              />
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
            <p className="font-display text-lg font-600 text-ink">Enter your details</p>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">
              Add a valid height and weight to see your BMI, category and the healthy weight range
              for your height.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
