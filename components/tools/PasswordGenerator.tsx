"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Password Generator — 100% client-side.                            */
/*  Randomness comes from the Web Crypto API (crypto.getRandomValues) */
/*  with rejection sampling to avoid modulo bias — never Math.random. */
/* ------------------------------------------------------------------ */

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

/* Visually confusable characters, removed when the option is on. */
const AMBIGUOUS = new Set("O0oIl1|`".split(""));

const MIN_LEN = 4;
const MAX_LEN = 64;
const BATCH_SIZE = 5;

type TypeKey = "upper" | "lower" | "numbers" | "symbols";

type Options = {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
};

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

/** The character sets currently selected, each already ambiguity-filtered. */
function activeSets(opts: Options): string[] {
  const clean = (s: string) =>
    opts.excludeAmbiguous
      ? s
          .split("")
          .filter((c) => !AMBIGUOUS.has(c))
          .join("")
      : s;
  const sets: string[] = [];
  if (opts.upper) sets.push(clean(UPPER));
  if (opts.lower) sets.push(clean(LOWER));
  if (opts.numbers) sets.push(clean(NUMBERS));
  if (opts.symbols) sets.push(clean(SYMBOLS));
  return sets.filter((s) => s.length > 0);
}

/** Generate a single password guaranteeing one char from every active set. */
function makePassword(opts: Options): string {
  const sets = activeSets(opts);
  const pool = sets.join("");
  if (!pool) return "";

  const chars: string[] = [];
  // Seed one character from each selected set (up to the requested length).
  for (const set of sets) {
    if (chars.length >= opts.length) break;
    chars.push(set[randomIndex(set.length)]);
  }
  // Fill the remainder from the combined pool.
  while (chars.length < opts.length) {
    chars.push(pool[randomIndex(pool.length)]);
  }
  // Fisher–Yates shuffle so the guaranteed chars aren't always up front.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

/* Strength buckets — driven by entropy = length x log2(poolSize). */
const STRENGTH = [
  { label: "Weak", color: "#db2777" }, // berry
  { label: "Fair", color: "#d97706" }, // amber (status)
  { label: "Strong", color: "#2563eb" }, // forest
  { label: "Very strong", color: "#16a34a" }, // brass
] as const;

function strengthFor(length: number, poolSize: number) {
  const entropy = poolSize > 1 ? length * Math.log2(poolSize) : 0;
  let level = 0;
  if (entropy >= 80) level = 3;
  else if (entropy >= 60) level = 2;
  else if (entropy >= 40) level = 1;
  return { level, entropy: Math.round(entropy) };
}

export default function PasswordGenerator() {
  const [opts, setOpts] = useState<Options>({
    length: 16,
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [bulk, setBulk] = useState(false);
  const [password, setPassword] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const regenerate = useCallback(() => {
    if (bulk) {
      setList(Array.from({ length: BATCH_SIZE }, () => makePassword(opts)));
    } else {
      setPassword(makePassword(opts));
    }
    setCopied(false);
    setCopiedIdx(null);
  }, [opts, bulk]);

  // Regenerate on mount and whenever any option (or batch mode) changes.
  useEffect(() => {
    regenerate();
  }, [regenerate]);

  // Toggle a character type, blocking the removal of the last active type.
  const toggleType = useCallback((key: TypeKey) => {
    setOpts((o) => {
      const next = { ...o, [key]: !o[key] };
      if (!next.upper && !next.lower && !next.numbers && !next.symbols) {
        return o; // guard: at least one type must stay on
      }
      return next;
    });
  }, []);

  const poolSize = useMemo(
    () => activeSets(opts).join("").length,
    [opts],
  );
  const strength = useMemo(
    () => strengthFor(opts.length, poolSize),
    [opts.length, poolSize],
  );
  const current = STRENGTH[strength.level];

  const copy = useCallback(async (value: string, idx: number | null) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      if (idx === null) setCopied(true);
      else setCopiedIdx(idx);
      window.setTimeout(() => {
        setCopied(false);
        setCopiedIdx(null);
      }, 1600);
    } catch {
      // Clipboard blocked (e.g. insecure context) — the field stays selectable.
    }
  }, []);

  const typeToggles: { key: TypeKey; label: string; hint: string }[] = [
    { key: "upper", label: "Uppercase", hint: "A-Z" },
    { key: "lower", label: "Lowercase", hint: "a-z" },
    { key: "numbers", label: "Numbers", hint: "0-9" },
    { key: "symbols", label: "Symbols", hint: "!@#$" },
  ];

  const activeTypeCount = [
    opts.upper,
    opts.lower,
    opts.numbers,
    opts.symbols,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Privacy note */}
      <div className="flex items-start gap-3 rounded-2xl border border-brass-soft bg-brass-soft/50 p-4">
        <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
        <p className="text-sm text-ink-soft">
          <strong className="text-ink">Generated in your browser.</strong> Every
          password is created on your device with the Web Crypto API. Nothing is
          typed over the network, logged or sent anywhere &mdash; it never leaves
          your browser.
        </p>
      </div>

      {/* Result display */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6">
        {!bulk ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <output
                aria-label="Generated password"
                className="min-w-0 flex-1 break-all rounded-xl border border-line bg-card px-4 py-3.5 font-mono text-lg text-ink select-all"
              >
                {password || (
                  <span className="text-ink-faint">Generating&hellip;</span>
                )}
              </output>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copy(password, null)}
                  className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <IconCopy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={regenerate}
                  aria-label="Generate a new password"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
                >
                  <IconRefresh className="h-4 w-4" />
                  <span className="hidden sm:inline">Regenerate</span>
                </button>
              </div>
            </div>

            {/* Strength meter */}
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Strength
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: current.color }}
                >
                  {current.label}
                </span>
              </div>
              <div
                className="mt-2 flex gap-1.5"
                role="meter"
                aria-label="Password strength"
                aria-valuemin={0}
                aria-valuemax={4}
                aria-valuenow={strength.level + 1}
                aria-valuetext={current.label}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-full transition-colors"
                    style={{
                      background:
                        i <= strength.level
                          ? current.color
                          : "var(--color-line-strong)",
                    }}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-faint">
                About {strength.entropy} bits of entropy from a pool of{" "}
                {poolSize} characters.
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              {BATCH_SIZE} passwords &mdash; pick your favourite
            </p>
            {list.map((pw, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-2.5"
              >
                <code className="min-w-0 flex-1 break-all font-mono text-sm text-ink select-all">
                  {pw}
                </code>
                <button
                  type="button"
                  onClick={() => copy(pw, i)}
                  aria-label={`Copy password ${i + 1}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
                >
                  <IconCopy className="h-3.5 w-3.5" />
                  {copiedIdx === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={regenerate}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
            >
              <IconRefresh className="h-4 w-4" />
              Regenerate all
            </button>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="rounded-2xl border border-line bg-card p-6">
        {/* Length */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="pw-length" className="text-sm font-medium text-ink-soft">
              Length
            </label>
            <span className="font-mono text-sm font-semibold text-ink">
              {opts.length}
            </span>
          </div>
          <input
            id="pw-length"
            type="range"
            min={MIN_LEN}
            max={MAX_LEN}
            step={1}
            value={opts.length}
            onChange={(e) =>
              setOpts((o) => ({ ...o, length: Number(e.target.value) }))
            }
            className="mt-3"
            aria-label="Password length"
          />
          <div className="mt-1.5 flex justify-between text-xs text-ink-faint">
            <span>{MIN_LEN}</span>
            <span>16+ recommended</span>
            <span>{MAX_LEN}</span>
          </div>
        </div>

        {/* Character types */}
        <div className="mt-6">
          <p className="mb-2.5 text-sm font-medium text-ink-soft">
            Include characters
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {typeToggles.map((t) => {
              const on = opts[t.key];
              const isLast = on && activeTypeCount === 1;
              return (
                <label
                  key={t.key}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    on
                      ? "border-forest bg-forest-soft"
                      : "border-line-strong bg-card hover:border-forest"
                  } ${isLast ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={isLast}
                    onChange={() => toggleType(t.key)}
                    className="h-4 w-4"
                    style={{ accentColor: "var(--color-forest)" }}
                  />
                  <span className="flex items-baseline gap-2 text-sm">
                    <span className="font-medium text-ink">{t.label}</span>
                    <span className="font-mono text-xs text-ink-faint">
                      {t.hint}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          {activeTypeCount === 1 && (
            <p className="mt-2 text-xs text-ink-faint">
              At least one character type must stay selected.
            </p>
          )}
        </div>

        {/* Extra options */}
        <div className="mt-4 space-y-3 border-t border-line pt-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={opts.excludeAmbiguous}
              onChange={() =>
                setOpts((o) => ({
                  ...o,
                  excludeAmbiguous: !o.excludeAmbiguous,
                }))
              }
              className="h-4 w-4"
              style={{ accentColor: "var(--color-forest)" }}
            />
            <span className="text-sm">
              <span className="font-medium text-ink">
                Exclude ambiguous characters
              </span>
              <span className="ml-2 font-mono text-xs text-ink-faint">
                O 0 l 1 I |
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={bulk}
              onChange={() => setBulk((b) => !b)}
              className="h-4 w-4"
              style={{ accentColor: "var(--color-forest)" }}
            />
            <span className="text-sm font-medium text-ink">
              Generate a batch of {BATCH_SIZE} at once
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ icons ------------------------------ */

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
