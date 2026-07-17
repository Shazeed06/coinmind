"use client";

import { useMemo, useState } from "react";
import { Field, Stat } from "./shared";

type Sex = "male" | "female";
type Unit = "metric" | "imperial";

const ACTIVITY = [
  { label: "Sedentary — little or no exercise", value: 1.2 },
  { label: "Light — exercise 1–3 days/week", value: 1.375 },
  { label: "Moderate — exercise 3–5 days/week", value: 1.55 },
  { label: "Active — exercise 6–7 days/week", value: 1.725 },
  { label: "Very active — hard exercise or physical job", value: 1.9 },
];

const LB_PER_KG = 2.20462262;
const CM_PER_IN = 2.54;

export default function CalorieCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [unit, setUnit] = useState<Unit>("metric");
  const [age, setAge] = useState(30);
  // Height and weight are stored in the currently-displayed unit.
  const [height, setHeight] = useState(170); // cm (metric) or inches (imperial)
  const [weight, setWeight] = useState(70); // kg (metric) or lb (imperial)
  const [activity, setActivity] = useState(1.55);

  const switchUnit = (u: Unit) => {
    if (u === unit) return;
    // Convert the stored values so the physical measurement stays the same.
    if (u === "imperial") {
      setHeight(Math.round(height / CM_PER_IN));
      setWeight(Math.round(weight * LB_PER_KG));
    } else {
      setHeight(Math.round(height * CM_PER_IN));
      setWeight(Math.round(weight / LB_PER_KG));
    }
    setUnit(u);
  };

  const result = useMemo(() => {
    const heightCm = unit === "metric" ? height : height * CM_PER_IN;
    const weightKg = unit === "metric" ? weight : weight / LB_PER_KG;

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(heightCm) ||
      !Number.isFinite(weightKg) ||
      age <= 0 ||
      heightCm <= 0 ||
      weightKg <= 0
    ) {
      return { state: "empty" as const };
    }

    // Mifflin-St Jeor equation.
    const bmr =
      10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
    const tdee = bmr * activity;

    if (!Number.isFinite(bmr) || !Number.isFinite(tdee) || tdee <= 0) {
      return { state: "empty" as const };
    }

    // Protein guidance range: 1.6–2.2 g per kg of bodyweight for active adults.
    const proteinLow = Math.round(weightKg * 1.6);
    const proteinHigh = Math.round(weightKg * 2.2);

    return {
      state: "ok" as const,
      bmr,
      tdee,
      mildLoss: tdee - 250,
      loss: tdee - 500,
      gain: tdee + 500,
      proteinLow,
      proteinHigh,
    };
  }, [sex, unit, age, height, weight, activity]);

  const nf = useMemo(() => new Intl.NumberFormat("en-US"), []);
  const cal = (v: number) => `${nf.format(Math.max(0, Math.round(v)))} kcal`;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your details</h2>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-4">
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">Sex</p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              <button
                type="button"
                aria-pressed={sex === "male"}
                onClick={() => setSex("male")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${sex === "male" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}
              >
                Male
              </button>
              <button
                type="button"
                aria-pressed={sex === "female"}
                onClick={() => setSex("female")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${sex === "female" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}
              >
                Female
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">Units</p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              <button
                type="button"
                aria-pressed={unit === "metric"}
                onClick={() => switchUnit("metric")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${unit === "metric" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}
              >
                Metric
              </button>
              <button
                type="button"
                aria-pressed={unit === "imperial"}
                onClick={() => switchUnit("imperial")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${unit === "imperial" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}
              >
                Imperial
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-7">
          <Field
            label="Age"
            value={age}
            onChange={setAge}
            min={15}
            max={100}
            step={1}
            suffix="yrs"
          />
          {unit === "metric" ? (
            <>
              <Field
                label="Height"
                value={height}
                onChange={setHeight}
                min={120}
                max={220}
                step={1}
                suffix="cm"
              />
              <Field
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={30}
                max={200}
                step={1}
                suffix="kg"
              />
            </>
          ) : (
            <>
              <Field
                label="Height"
                value={height}
                onChange={setHeight}
                min={48}
                max={90}
                step={1}
                suffix="in"
              />
              <Field
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={66}
                max={440}
                step={1}
                suffix="lb"
              />
            </>
          )}

          <div>
            <label
              htmlFor="calorie-activity"
              className="text-sm font-medium text-ink-soft"
            >
              Activity level
            </label>
            <select
              id="calorie-activity"
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest"
            >
              {ACTIVITY.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Maintenance calories
        </p>

        {result.state === "empty" ? (
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            Enter your age, height and weight to estimate the calories you burn
            each day and the targets for losing or gaining weight.
          </p>
        ) : (
          <>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {nf.format(Math.round(result.tdee))}{" "}
              <span className="text-lg font-medium text-ink-soft">kcal/day</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              What you need to maintain your current weight.
            </p>

            <div className="mt-6">
              <Stat label="BMR (at rest)" value={cal(result.bmr)} accent="ink" />
              <Stat
                label="Mild weight loss (−250)"
                value={cal(result.mildLoss)}
                accent="brass"
              />
              <Stat
                label="Weight loss (−500)"
                value={cal(result.loss)}
                accent="brass"
              />
              <Stat
                label="Weight gain (+500)"
                value={cal(result.gain)}
                accent="forest"
              />
            </div>

            <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
              A common protein target for active adults is{" "}
              <strong className="text-ink">
                {nf.format(result.proteinLow)}–{nf.format(result.proteinHigh)} g
              </strong>{" "}
              per day (1.6–2.2 g per kg of bodyweight).
            </div>

            <p className="mt-4 text-xs text-ink-faint leading-relaxed">
              These are estimates from the Mifflin-St Jeor equation and can vary
              with body composition, health and genetics. They are not medical
              or nutritional advice — check with a doctor or dietitian before
              changing your diet.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
