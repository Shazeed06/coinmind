"use client";

import { useState } from "react";
import { Currency, currencyMeta } from "@/lib/format";

/* Slider + number field combined — the core calculator input.
   The text box lets people clear it and type ANY number freely — no minimum,
   no per-keystroke clamping. While focused we keep a free-text "draft"; when it
   loses focus we fall back to the live value so the slider stays in sync. */
export function Field({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft ?? (Number.isFinite(value) ? String(value) : "");

  const handleType = (str: string) => {
    // Keep it a clean number entry (digits + one decimal point), but never clamp.
    const cleaned = str.replace(/[^\d.]/g, "");
    setDraft(cleaned);
    if (cleaned === "" || cleaned === ".") return; // still typing — don't push NaN
    const n = Number(cleaned);
    if (Number.isFinite(n)) onChange(n);
  };

  const handleBlur = () => {
    const n = Number(draft);
    if (draft !== null && draft !== "" && Number.isFinite(n)) onChange(n);
    setDraft(null); // show the committed live value again
  };

  // The slider thumb rests within its range even if the typed value is outside it.
  const sliderValue = Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink-soft">{label}</label>
        <div className="flex items-center rounded-lg border border-line-strong bg-card px-2.5 py-1.5 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/25 transition-colors">
          {prefix && (
            <span className="text-sm text-ink-faint mr-1">{prefix}</span>
          )}
          <input
            type="text"
            inputMode="decimal"
            value={display}
            onFocus={(e) => {
              setDraft(Number.isFinite(value) ? String(value) : "");
              e.target.select();
            }}
            onChange={(e) => handleType(e.target.value)}
            onBlur={handleBlur}
            className="w-28 bg-transparent text-right text-sm font-semibold text-ink outline-none"
            aria-label={label}
          />
          {suffix && (
            <span className="text-sm text-ink-faint ml-1">{suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3"
        aria-label={label}
      />
      {hint && <p className="mt-1.5 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

/* Donut chart (pure SVG, no dependency) showing two-part split. */
export function Donut({
  primary,
  secondary,
  primaryLabel,
  secondaryLabel,
  size = 200,
}: {
  primary: number;
  secondary: number;
  primaryLabel: string;
  secondaryLabel: string;
  size?: number;
}) {
  const total = primary + secondary || 1;
  const r = size / 2 - 16;
  const c = 2 * Math.PI * r;
  const primaryLen = (primary / total) * c;
  const cx = size / 2;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${primaryLabel} versus ${secondaryLabel}`}>
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth="16"
        />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="var(--color-forest)"
          strokeWidth="16"
          strokeDasharray={`${primaryLen} ${c - primaryLen}`}
          strokeDashoffset={c / 4}
          transform={`rotate(-90 ${cx} ${cx})`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />
      </svg>
      <div className="mt-4 flex items-center gap-5">
        <LegendDot color="var(--color-forest)" label={primaryLabel} />
        <LegendDot color="var(--color-brass)" label={secondaryLabel} />
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-xs text-ink-soft">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

/* Currency toggle — INR / USD / GBP for global audience. */
export function CurrencyToggle({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (c: Currency) => void;
}) {
  const options: Currency[] = ["INR", "USD", "GBP"];
  return (
    <div role="group" aria-label="Display currency" className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
      {options.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={value === c}
          onClick={() => onChange(c)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === c
              ? "bg-forest text-white"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {currencyMeta[c].label}
        </button>
      ))}
    </div>
  );
}

/* Result stat row for the summary panel. */
export function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "forest" | "brass" | "ink";
}) {
  const color =
    accent === "forest"
      ? "text-forest"
      : accent === "brass"
        ? "text-brass"
        : "text-ink";
  return (
    <div className="flex items-center justify-between border-b border-line py-3 last:border-0">
      <span className="text-sm text-ink-soft">{label}</span>
      <span className={`font-display text-lg font-600 ${color}`}>{value}</span>
    </div>
  );
}
