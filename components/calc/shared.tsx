"use client";

import { Currency, currencyMeta } from "@/lib/format";

/* Slider + number field combined — the core calculator input. */
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
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink-soft">{label}</label>
        <div className="flex items-center rounded-lg border border-line-strong bg-card px-2.5 py-1.5 focus-within:border-forest transition-colors">
          {prefix && (
            <span className="text-sm text-ink-faint mr-1">{prefix}</span>
          )}
          <input
            type="number"
            value={Number.isFinite(value) ? value : ""}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="w-24 bg-transparent text-right text-sm font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && (
            <span className="text-sm text-ink-faint ml-1">{suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        value={value}
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
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
    <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
      {options.map((c) => (
        <button
          key={c}
          type="button"
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
