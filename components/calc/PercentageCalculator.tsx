"use client";

import { useMemo, useState } from "react";

type Mode = "of" | "isWhat" | "change";

const MODES: { id: Mode; label: string }[] = [
  { id: "of", label: "% of a number" },
  { id: "isWhat", label: "X is what % of Y" },
  { id: "change", label: "% change" },
];

const inputClass =
  "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

/* Trim trailing zeros and cap long decimals so results read cleanly. */
function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round((n + Number.EPSILON) * 1e6) / 1e6;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-soft">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 ${inputClass}`}
      />
    </div>
  );
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");

  // Each mode keeps its own pair of inputs so switching tabs never loses data.
  const [ofA, setOfA] = useState("15"); // X (percent)
  const [ofB, setOfB] = useState("200"); // Y (number)

  const [isA, setIsA] = useState("30"); // X (part)
  const [isB, setIsB] = useState("200"); // Y (whole)

  const [chA, setChA] = useState("200"); // from
  const [chB, setChB] = useState("250"); // to

  const parse = (v: string): number | null => {
    if (v.trim() === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const result = useMemo(() => {
    if (mode === "of") {
      const x = parse(ofA);
      const y = parse(ofB);
      if (x === null || y === null) return null;
      const value = (x / 100) * y;
      return {
        display: fmt(value),
        sentence: `${fmt(x)}% of ${fmt(y)} is ${fmt(value)}.`,
        caption: "Result",
      };
    }
    if (mode === "isWhat") {
      const x = parse(isA);
      const y = parse(isB);
      if (x === null || y === null || y === 0) return null;
      const value = (x / y) * 100;
      return {
        display: `${fmt(value)}%`,
        sentence: `${fmt(x)} is ${fmt(value)}% of ${fmt(y)}.`,
        caption: "Percentage",
      };
    }
    // change
    const from = parse(chA);
    const to = parse(chB);
    if (from === null || to === null || from === 0) return null;
    const value = ((to - from) / from) * 100;
    const direction = value > 0 ? "increase" : value < 0 ? "decrease" : "change";
    return {
      display: `${fmt(Math.abs(value))}%`,
      sentence:
        value === 0
          ? `There is no change from ${fmt(from)} to ${fmt(to)}.`
          : `Going from ${fmt(from)} to ${fmt(to)} is a ${fmt(Math.abs(value))}% ${direction}.`,
      caption: value < 0 ? "Decrease" : value > 0 ? "Increase" : "Change",
    };
  }, [mode, ofA, ofB, isA, isB, chA, chB]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <p className="text-sm font-medium text-ink-soft mb-2.5">Calculation</p>
        <div className="inline-flex flex-wrap rounded-lg border border-line-strong bg-card p-0.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                mode === m.id
                  ? "bg-forest text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          {mode === "of" && (
            <>
              <NumberInput label="Percentage (%)" value={ofA} onChange={setOfA} placeholder="e.g. 15" />
              <NumberInput label="Of number" value={ofB} onChange={setOfB} placeholder="e.g. 200" />
            </>
          )}
          {mode === "isWhat" && (
            <>
              <NumberInput label="This number" value={isA} onChange={setIsA} placeholder="e.g. 30" />
              <NumberInput label="Is what % of" value={isB} onChange={setIsB} placeholder="e.g. 200" />
            </>
          )}
          {mode === "change" && (
            <>
              <NumberInput label="From (original value)" value={chA} onChange={setChA} placeholder="e.g. 200" />
              <NumberInput label="To (new value)" value={chB} onChange={setChB} placeholder="e.g. 250" />
            </>
          )}
        </div>

        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          {mode === "of" && "Finds a percentage of a value — useful for tips, discounts and shares."}
          {mode === "isWhat" && "Turns a part-and-whole into a percentage — great for scores and ratios."}
          {mode === "change" && "Measures how much a value rose or fell in percentage terms."}
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          {result ? result.caption : "Result"}
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {result ? result.display : "—"}
        </p>
        <div className="mt-6 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          {result ? (
            result.sentence
          ) : (
            <>Enter both values to see the result. Empty fields and division by zero show <strong className="text-ink">—</strong> instead of an error.</>
          )}
        </div>
      </div>
    </div>
  );
}
