"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Number to Words — converts any number into English words.         */
/*  Supports the Indian (Lakh / Crore) and International (Million /   */
/*  Billion) systems, plus optional Rupee / Dollar currency wording.  */
/*  100% client-side — nothing is uploaded. BigInt keeps large        */
/*  integers exact and guards against NaN.                            */
/* ------------------------------------------------------------------ */

const ONES = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];

const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
  "Eighty", "Ninety",
];

const INTL_SCALES = [
  "", "Thousand", "Million", "Billion", "Trillion", "Quadrillion",
  "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion",
  "Decillion",
];

/** Words for 0-99. Tens and units are hyphenated, e.g. "Twenty-Three". */
function twoDigitWords(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o === 0 ? TENS[t] : `${TENS[t]}-${ONES[o]}`;
}

/** Words for 0-999, e.g. "One Hundred Twenty-Three". */
function threeDigitWords(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (h) parts.push(`${ONES[h]} Hundred`);
  if (rest) parts.push(twoDigitWords(rest));
  return parts.join(" ");
}

/** Non-negative BigInt → words using the International (thousand grouping). */
function internationalWords(value: bigint): string {
  if (value === 0n) return "Zero";
  const groups: number[] = [];
  let big = value;
  while (big > 0n) {
    groups.push(Number(big % 1000n));
    big /= 1000n;
  }
  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i];
    if (g === 0) continue;
    const scale = i < INTL_SCALES.length ? INTL_SCALES[i] : "";
    parts.push(scale ? `${threeDigitWords(g)} ${scale}` : threeDigitWords(g));
  }
  return parts.join(" ");
}

/** Non-negative BigInt → words using the Indian (Lakh / Crore) system.
 *  The crore group is expanded recursively so arbitrarily large numbers
 *  read correctly, e.g. "One Hundred Twenty-Three Crore Forty-Five Lakh…". */
function indianWords(value: bigint): string {
  if (value === 0n) return "Zero";
  const parts: string[] = [];
  const crore = value / 10000000n; // 10^7 and above
  const lakh = Number((value / 100000n) % 100n); // 10^5 – 10^6
  const thousand = Number((value / 1000n) % 100n); // 10^3 – 10^4
  const hundred = Number(value % 1000n); // 10^0 – 10^2

  if (crore > 0n) parts.push(`${indianWords(crore)} Crore`);
  if (lakh > 0) parts.push(`${twoDigitWords(lakh)} Lakh`);
  if (thousand > 0) parts.push(`${twoDigitWords(thousand)} Thousand`);
  if (hundred > 0) parts.push(threeDigitWords(hundred));
  return parts.join(" ");
}

type System = "indian" | "international";
type Currency = "none" | "inr" | "usd";

type Parsed =
  | { ok: true; negative: boolean; intPart: string; fraction: string }
  | { ok: false };

/** Clean and validate the raw input. Returns exact string parts (no floats,
 *  so precision is never lost) or ok:false so the UI can avoid NaN. */
function parseInput(raw: string): Parsed {
  const cleaned = raw.replace(/[,\s]/g, "");
  if (cleaned === "") return { ok: false };
  if (!/^-?\d*\.?\d*$/.test(cleaned)) return { ok: false };

  const negative = cleaned.startsWith("-");
  const unsigned = negative ? cleaned.slice(1) : cleaned;
  if (unsigned === "" || unsigned === ".") return { ok: false };

  const [intRaw = "", fracRaw = ""] = unsigned.split(".");
  const intPart = intRaw.replace(/^0+(?=\d)/, "") || "0";
  const fraction = fracRaw;
  if (!/^\d*$/.test(intPart) || !/^\d*$/.test(fraction)) return { ok: false };
  return { ok: true, negative, intPart, fraction };
}

/** Spell each decimal digit individually, e.g. "45" → "Four Five". */
function fractionDigitWords(fraction: string): string {
  return fraction
    .split("")
    .map((d) => ONES[Number(d)])
    .join(" ");
}

/** Take the first two decimal places as an integer 0-99 (paise / cents). */
function subUnits(fraction: string): number {
  if (!fraction) return 0;
  return Number((fraction + "00").slice(0, 2));
}

function convert(raw: string, system: System, currency: Currency): string {
  const parsed = parseInput(raw);
  if (!parsed.ok) return "";

  const spell = system === "indian" ? indianWords : internationalWords;
  const intWords = spell(BigInt(parsed.intPart));
  const sign = parsed.negative ? "Minus " : "";

  if (currency === "inr") {
    const paise = subUnits(parsed.fraction);
    const tail = paise > 0 ? ` and ${twoDigitWords(paise)} Paise` : "";
    return `${sign}Rupees ${intWords}${tail} Only`;
  }

  if (currency === "usd") {
    const cents = subUnits(parsed.fraction);
    const tail = cents > 0 ? ` and ${twoDigitWords(cents)} Cents` : "";
    return `${sign}${intWords} Dollars${tail}`;
  }

  // Plain number: read any decimals digit-by-digit after "point".
  const frac = parsed.fraction.replace(/0+$/, "");
  const point = frac ? ` point ${fractionDigitWords(frac)}` : "";
  return `${sign}${intWords}${point}`;
}

const SYSTEMS: { id: System; label: string }[] = [
  { id: "indian", label: "Indian (Lakh / Crore)" },
  { id: "international", label: "International (Million / Billion)" },
];

const CURRENCIES: { id: Currency; label: string }[] = [
  { id: "none", label: "Plain number" },
  { id: "inr", label: "₹ Rupees" },
  { id: "usd", label: "$ Dollars" },
];

export default function NumberToWords() {
  const [raw, setRaw] = useState("");
  const [system, setSystem] = useState<System>("indian");
  const [currency, setCurrency] = useState<Currency>("none");
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => parseInput(raw), [raw]);
  const words = useMemo(
    () => convert(raw, system, currency),
    [raw, system, currency],
  );

  const isEmpty = raw.trim() === "";
  const isInvalid = !isEmpty && !parsed.ok;

  const copy = async () => {
    if (!words) return;
    try {
      await navigator.clipboard.writeText(words);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const clear = () => {
    setRaw("");
    setCopied(false);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-card p-6">
        {/* Number input */}
        <label
          htmlFor="ntw-input"
          className="text-sm font-medium text-ink-soft"
        >
          Enter a number
        </label>
        <input
          id="ntw-input"
          type="text"
          inputMode="decimal"
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            setCopied(false);
          }}
          placeholder="e.g. 123456.78"
          spellCheck={false}
          className="mt-3 w-full rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-lg text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest tabular-nums"
        />

        {/* Number system toggle */}
        <div className="mt-5">
          <p className="text-sm font-medium text-ink-soft">Number system</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SYSTEMS.map((s) => {
              const active = system === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSystem(s.id);
                    setCopied(false);
                  }}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-lg border border-forest bg-forest px-3.5 py-2 text-sm font-semibold text-white transition-colors"
                      : "rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
                  }
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Currency toggle */}
        <div className="mt-4">
          <p className="text-sm font-medium text-ink-soft">Currency mode</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {CURRENCIES.map((c) => {
              const active = currency === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setCurrency(c.id);
                    setCopied(false);
                  }}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-lg border border-forest bg-forest px-3.5 py-2 text-sm font-semibold text-white transition-colors"
                      : "rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Output */}
        <div className="mt-6">
          <p className="text-sm font-medium text-ink-soft">In words</p>
          <div
            aria-live="polite"
            className="mt-2 min-h-[64px] rounded-xl border border-line bg-paper-2 px-4 py-3 text-lg leading-relaxed text-ink"
          >
            {words ? (
              <span>{words}</span>
            ) : isInvalid ? (
              <span className="text-ink-faint">
                Please enter a valid number.
              </span>
            ) : (
              <span className="text-ink-faint">
                Your number in words will appear here.
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <button
            type="button"
            onClick={copy}
            disabled={!words}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={isEmpty}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
