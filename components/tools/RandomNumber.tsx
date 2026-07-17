"use client";

import { useCallback, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Random Number Generator — 100% client-side.                       */
/*  Uses the Web Crypto API (crypto.getRandomValues) with rejection   */
/*  sampling to avoid modulo bias — fairer than Math.random. All      */
/*  generation runs inside the click handler, never during render.    */
/* ------------------------------------------------------------------ */

const MAX_COUNT = 10000;

/** Uniform integer in [0, range) via rejection sampling — no modulo bias. */
function randomIndex(range: number): number {
  if (range <= 0) return 0;
  const maxValid = Math.floor(0x100000000 / range) * range; // 2^32
  const buf = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= maxValid);
  return value % range;
}

/** Uniform integer in the inclusive range [min, max]. */
function randomInt(min: number, max: number): number {
  return min + randomIndex(max - min + 1);
}

/** Parse a free-typed field into an integer, or null if blank/invalid. */
function parseIntOrNull(s: string): number | null {
  const t = s.trim();
  if (t === "" || t === "-") return null;
  if (!/^-?\d+$/.test(t)) return null;
  const v = Number(t);
  return Number.isSafeInteger(v) ? v : null;
}

type Result = { numbers: number[] };

export default function RandomNumber() {
  const [minStr, setMinStr] = useState("1");
  const [maxStr, setMaxStr] = useState("100");
  const [countStr, setCountStr] = useState("5");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [sortResults, setSortResults] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const min = parseIntOrNull(minStr);
  const max = parseIntOrNull(maxStr);
  const count = parseIntOrNull(countStr);

  // Validation — computed on every render, but touches no randomness.
  const error = useMemo(() => {
    if (min === null || max === null || count === null) {
      return "Enter a minimum, a maximum and how many numbers you want.";
    }
    if (min > max) {
      return "The minimum must be less than or equal to the maximum.";
    }
    if (count < 1) return "Ask for at least one number.";
    if (count > MAX_COUNT) {
      return `That's a lot — please ask for ${MAX_COUNT.toLocaleString()} numbers or fewer.`;
    }
    const range = max - min + 1;
    if (!allowDuplicates && count > range) {
      return `There are only ${range.toLocaleString()} unique values between ${min} and ${max}, but you asked for ${count}. Turn on duplicates, or widen the range.`;
    }
    return null;
  }, [min, max, count, allowDuplicates]);

  const generate = useCallback(() => {
    if (error || min === null || max === null || count === null) return;

    let numbers: number[];
    if (allowDuplicates) {
      numbers = Array.from({ length: count }, () => randomInt(min, max));
    } else {
      const range = max - min + 1;
      if (range <= 200000) {
        // Partial Fisher–Yates shuffle over the whole range, take `count`.
        const pool = Array.from({ length: range }, (_, i) => min + i);
        for (let i = 0; i < count; i++) {
          const j = i + randomIndex(range - i);
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        numbers = pool.slice(0, count);
      } else {
        // Huge range, few picks — reject collisions with a Set.
        const seen = new Set<number>();
        while (seen.size < count) seen.add(randomInt(min, max));
        numbers = Array.from(seen);
      }
    }

    if (sortResults) numbers = [...numbers].sort((a, b) => a - b);
    setResult({ numbers });
    setCopied(false);
  }, [error, min, max, count, allowDuplicates, sortResults]);

  const copy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.numbers.join(", "));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (e.g. insecure context) — numbers stay selectable.
    }
  }, [result]);

  const stats = useMemo(() => {
    if (!result || result.numbers.length === 0) return null;
    const nums = result.numbers;
    const sum = nums.reduce((a, b) => a + b, 0);
    return {
      count: nums.length,
      sum,
      min: Math.min(...nums),
      max: Math.max(...nums),
      avg: Math.round((sum / nums.length) * 100) / 100,
    };
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Privacy note */}
      <div className="flex items-start gap-3 rounded-2xl border border-brass-soft bg-brass-soft/50 p-4">
        <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
        <p className="text-sm text-ink-soft">
          <strong className="text-ink">Generated in your browser.</strong> Numbers
          are drawn with the Web Crypto API on your device &mdash; nothing is
          uploaded, logged or sent anywhere.
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <NumberField
            id="rng-min"
            label="Minimum"
            value={minStr}
            onChange={setMinStr}
          />
          <NumberField
            id="rng-max"
            label="Maximum"
            value={maxStr}
            onChange={setMaxStr}
          />
          <NumberField
            id="rng-count"
            label="How many"
            value={countStr}
            onChange={setCountStr}
            min={1}
          />
        </div>

        <div className="mt-5 space-y-3 border-t border-line pt-5">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={() => setAllowDuplicates((v) => !v)}
              className="h-4 w-4"
              style={{ accentColor: "var(--color-forest)" }}
            />
            <span className="text-sm">
              <span className="font-medium text-ink">Allow duplicates</span>
              <span className="ml-2 text-xs text-ink-faint">
                the same number can appear more than once
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={sortResults}
              onChange={() => setSortResults((v) => !v)}
              className="h-4 w-4"
              style={{ accentColor: "var(--color-forest)" }}
            />
            <span className="text-sm font-medium text-ink">
              Sort results ascending
            </span>
          </label>
        </div>

        {error ? (
          <p className="mt-5 rounded-lg border border-berry/30 bg-berry/5 px-4 py-3 text-sm text-berry">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={generate}
          disabled={!!error}
          className="mt-5 w-full rounded-lg bg-forest px-4 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-line bg-paper-2 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              {result.numbers.length} number
              {result.numbers.length === 1 ? "" : "s"}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <IconCopy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={generate}
                className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-card px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
              >
                <IconRefresh className="h-4 w-4" />
                <span className="hidden sm:inline">Again</span>
              </button>
            </div>
          </div>

          <div
            className="mt-4 flex flex-wrap gap-2"
            aria-live="polite"
          >
            {result.numbers.map((num, i) => (
              <span
                key={i}
                className="inline-flex min-w-[2.75rem] items-center justify-center rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm font-semibold text-ink select-all"
              >
                {num}
              </span>
            ))}
          </div>

          {stats && result.numbers.length > 1 && (
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5 sm:grid-cols-4">
              <Stat label="Sum" value={stats.sum.toLocaleString()} />
              <Stat label="Average" value={stats.avg.toLocaleString()} />
              <Stat label="Lowest" value={stats.min.toLocaleString()} />
              <Stat label="Highest" value={stats.max.toLocaleString()} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  min,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-line-strong bg-card px-4 py-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-forest"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-ink-faint">{label}</p>
      <p className="mt-0.5 font-mono text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

/* ------------------------------ icons ------------------------------ */

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconRefresh({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}
