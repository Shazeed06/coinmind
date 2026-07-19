"use client";

import { useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  GPA / CGPA Calculator — 100% client-side.                         */
/*  Add courses (name optional, credits, grade), pick a grading       */
/*  scale, and get a live weighted GPA/CGPA. Nothing is uploaded.     */
/* ------------------------------------------------------------------ */

type Scale = "gpa4" | "cgpa10";

/* Standard unweighted US 4.0 letter-grade → grade-point map. */
const GRADE_SCALE_4: { value: string; points: number }[] = [
  { value: "A+", points: 4.0 },
  { value: "A", points: 4.0 },
  { value: "A-", points: 3.7 },
  { value: "B+", points: 3.3 },
  { value: "B", points: 3.0 },
  { value: "B-", points: 2.7 },
  { value: "C+", points: 2.3 },
  { value: "C", points: 2.0 },
  { value: "C-", points: 1.7 },
  { value: "D+", points: 1.3 },
  { value: "D", points: 1.0 },
  { value: "D-", points: 0.7 },
  { value: "F", points: 0.0 },
];

const GRADE_POINTS_4: Record<string, number> = Object.fromEntries(
  GRADE_SCALE_4.map((g) => [g.value, g.points]),
);

type Row = { id: number; name: string; credits: string; grade: string };

/** Parse a positive number from an input string; blank/invalid → NaN. */
function num(value: string): number {
  const t = value.trim();
  if (t === "") return NaN;
  const n = Number(t);
  return Number.isFinite(n) ? n : NaN;
}

/** Resolve a row's grade to a grade-point on the active scale, or NaN. */
function gradePoint(grade: string, scale: Scale): number {
  if (scale === "gpa4") {
    return grade in GRADE_POINTS_4 ? GRADE_POINTS_4[grade] : NaN;
  }
  const n = num(grade);
  if (!Number.isFinite(n)) return NaN;
  return Math.min(10, Math.max(0, n));
}

/** Only allow digits and a single decimal point in numeric fields. */
function sanitizeNumeric(raw: string): string {
  let cleaned = raw.replace(/[^\d.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot !== -1) {
    cleaned =
      cleaned.slice(0, firstDot + 1) +
      cleaned.slice(firstDot + 1).replace(/\./g, "");
  }
  return cleaned;
}

const inputClass =
  "w-full min-w-0 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-forest";

export default function GpaCalculator() {
  const [scale, setScale] = useState<Scale>("gpa4");
  const idRef = useRef(4);
  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: "", credits: "3", grade: "A" },
    { id: 2, name: "", credits: "4", grade: "B+" },
    { id: 3, name: "", credits: "3", grade: "A-" },
  ]);
  const [cgpaInput, setCgpaInput] = useState("");

  const switchScale = (next: Scale) => {
    if (next === scale) return;
    // Grades are not transferable between scales, so reset each row's grade
    // to a sensible default for the new scale (credits and names are kept).
    const fallback = next === "gpa4" ? "A" : "9";
    setRows((prev) => prev.map((r) => ({ ...r, grade: fallback })));
    setScale(next);
  };

  const updateRow = (id: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        id: idRef.current++,
        name: "",
        credits: "",
        grade: scale === "gpa4" ? "A" : "",
      },
    ]);

  const removeRow = (id: number) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const reset = () => {
    idRef.current = 2;
    setRows([{ id: 1, name: "", credits: "", grade: scale === "gpa4" ? "A" : "" }]);
  };

  const result = useMemo(() => {
    let totalCredits = 0;
    let weighted = 0;
    let counted = 0;
    for (const r of rows) {
      const credits = num(r.credits);
      const gp = gradePoint(r.grade, scale);
      if (!Number.isFinite(credits) || credits <= 0 || !Number.isFinite(gp))
        continue;
      totalCredits += credits;
      weighted += gp * credits;
      counted += 1;
    }
    const gpa = totalCredits > 0 ? weighted / totalCredits : NaN;
    return { totalCredits, counted, gpa };
  }, [rows, scale]);

  const maxScale = scale === "gpa4" ? 4 : 10;
  const hasResult = Number.isFinite(result.gpa);
  const resultLabel = scale === "gpa4" ? "GPA" : "CGPA";

  // CGPA → percentage helper (India, widely-used ×9.5 approximation).
  const cgpaNum = num(cgpaInput);
  const percentage =
    Number.isFinite(cgpaNum) && cgpaNum >= 0
      ? Math.min(10, cgpaNum) * 9.5
      : NaN;

  return (
    <div className="space-y-6">
      {/* Scale toggle */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <p className="text-sm font-medium text-ink-soft mb-2.5">Grading scale</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={scale === "gpa4"}
            onClick={() => switchScale("gpa4")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              scale === "gpa4"
                ? "bg-forest text-white"
                : "border border-line-strong bg-card text-ink-soft hover:border-forest"
            }`}
          >
            GPA (4.0)
          </button>
          <button
            type="button"
            aria-pressed={scale === "cgpa10"}
            onClick={() => switchScale("cgpa10")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              scale === "cgpa10"
                ? "bg-forest text-white"
                : "border border-line-strong bg-card text-ink-soft hover:border-forest"
            }`}
          >
            CGPA (10-point, India)
          </button>
        </div>

        {/* Column headings (desktop) */}
        <div className="mt-6 hidden sm:grid grid-cols-[1fr_7rem_9rem_auto] gap-3 px-1 text-xs font-semibold uppercase tracking-wider text-ink-faint">
          <span>Course / subject (optional)</span>
          <span>Credits</span>
          <span>{scale === "gpa4" ? "Grade" : "Grade point"}</span>
          <span className="sr-only">Remove</span>
        </div>

        {/* Course rows */}
        <div className="mt-2 space-y-3">
          {rows.map((r, i) => (
            <div
              key={r.id}
              className="grid grid-cols-2 sm:grid-cols-[1fr_7rem_9rem_auto] gap-3 items-center"
            >
              <input
                type="text"
                value={r.name}
                onChange={(e) => updateRow(r.id, { name: e.target.value })}
                placeholder={`Course ${i + 1}`}
                aria-label={`Course ${i + 1} name`}
                className={`${inputClass} col-span-2 sm:col-span-1`}
              />
              <input
                type="text"
                inputMode="decimal"
                value={r.credits}
                onChange={(e) =>
                  updateRow(r.id, { credits: sanitizeNumeric(e.target.value) })
                }
                placeholder="Credits"
                aria-label={`Course ${i + 1} credits`}
                className={inputClass}
              />
              {scale === "gpa4" ? (
                <select
                  value={r.grade}
                  onChange={(e) => updateRow(r.id, { grade: e.target.value })}
                  aria-label={`Course ${i + 1} grade`}
                  className="w-full min-w-0 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest"
                >
                  <option value="">Grade…</option>
                  {GRADE_SCALE_4.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.value} ({g.points.toFixed(1)})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  inputMode="decimal"
                  value={r.grade}
                  onChange={(e) =>
                    updateRow(r.id, { grade: sanitizeNumeric(e.target.value) })
                  }
                  placeholder="0–10"
                  aria-label={`Course ${i + 1} grade point`}
                  className={inputClass}
                />
              )}
              <button
                type="button"
                onClick={() => removeRow(r.id)}
                disabled={rows.length <= 1}
                aria-label={`Remove course ${i + 1}`}
                title="Remove course"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong bg-paper-2 text-ink-soft transition-colors hover:border-forest hover:text-forest disabled:cursor-not-allowed disabled:opacity-40 justify-self-end sm:justify-self-auto"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-1.5 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            + Add course
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl border border-line bg-card p-6" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Your {resultLabel}
        </p>
        {hasResult ? (
          <p className="mt-1 font-display text-5xl font-600 text-forest tabular-nums leading-none">
            {result.gpa.toFixed(2)}
            <span className="ml-2 text-2xl font-600 text-ink-soft">
              / {maxScale.toFixed(1)}
            </span>
          </p>
        ) : (
          <p className="mt-1 font-display text-5xl font-600 text-ink-faint leading-none">
            &mdash;
          </p>
        )}
        <p className="mt-3 text-sm text-ink-soft">
          {hasResult ? (
            <>
              Based on{" "}
              <strong className="text-ink">{result.counted}</strong> course
              {result.counted === 1 ? "" : "s"} and{" "}
              <strong className="text-ink">
                {Number.isInteger(result.totalCredits)
                  ? result.totalCredits
                  : result.totalCredits.toFixed(1)}
              </strong>{" "}
              total credits.
            </>
          ) : (
            "Enter credits and a grade for at least one course to see your result."
          )}
        </p>
      </div>

      {/* CGPA → percentage helper */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg font-600 text-ink">
          CGPA to percentage
        </h2>
        <p className="mt-1 text-sm text-ink-faint">
          Widely-used approximation: percentage = CGPA &times; 9.5. Individual
          universities may use their own formula, so treat this as an estimate.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label
              htmlFor="cgpa-pct"
              className="text-sm font-medium text-ink-soft"
            >
              CGPA (10-point)
            </label>
            <input
              id="cgpa-pct"
              type="text"
              inputMode="decimal"
              value={cgpaInput}
              onChange={(e) => setCgpaInput(sanitizeNumeric(e.target.value))}
              placeholder="e.g. 8.4"
              className={`${inputClass} mt-1.5 sm:w-40`}
            />
          </div>
          <div className="rounded-xl bg-card border border-line px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Percentage
            </p>
            <p className="mt-0.5 font-display text-2xl font-600 text-forest tabular-nums">
              {Number.isFinite(percentage) ? `${percentage.toFixed(2)}%` : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
