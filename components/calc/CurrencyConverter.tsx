"use client";

import { useEffect, useMemo, useState } from "react";

const POPULAR = [
  "USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CNY", "AED", "SGD",
  "CHF", "HKD", "NZD", "ZAR", "SAR", "MYR", "BRL", "RUB", "KRW", "MXN", "THB",
];

const NAMES: Record<string, string> = {
  USD: "US Dollar", INR: "Indian Rupee", EUR: "Euro", GBP: "British Pound",
  JPY: "Japanese Yen", AUD: "Australian Dollar", CAD: "Canadian Dollar",
  CNY: "Chinese Yuan", AED: "UAE Dirham", SGD: "Singapore Dollar",
  CHF: "Swiss Franc", HKD: "Hong Kong Dollar", NZD: "NZ Dollar",
  ZAR: "South African Rand", SAR: "Saudi Riyal", MYR: "Malaysian Ringgit",
  BRL: "Brazilian Real", RUB: "Russian Ruble", KRW: "South Korean Won",
  MXN: "Mexican Peso", THB: "Thai Baht",
};

export default function CurrencyConverter({
  initialFrom = "USD",
  initialTo = "INR",
}: {
  initialFrom?: string;
  initialTo?: string;
} = {}) {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [updated, setUpdated] = useState<string | null>(null);
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((d) => {
        if (d.rates) {
          setRates(d.rates);
          setUpdated(d.updated);
        } else setError(true);
      })
      .catch(() => setError(true));
  }, []);

  const result = useMemo(() => {
    if (!rates || !rates[from] || !rates[to]) return null;
    if (!Number.isFinite(amount)) return null;
    return (amount / rates[from]) * rates[to];
  }, [rates, amount, from, to]);

  const oneUnit = useMemo(() => {
    if (!rates || !rates[from] || !rates[to]) return null;
    return rates[to] / rates[from];
  }, [rates, from, to]);

  const fmt = (v: number, cur: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 2,
    }).format(v);

  const select =
    "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest";

  return (
    <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label className="text-sm font-medium text-ink-soft">Amount</label>
          <div className="mt-1.5 flex gap-2">
            <input
              type="number"
              aria-label="Amount to convert"
              value={Number.isFinite(amount) ? amount : ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <select aria-label="Convert from currency" value={from} onChange={(e) => setFrom(e.target.value)} className={select}>
              {POPULAR.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { setFrom(to); setTo(from); }}
          className="mb-1 grid h-11 w-11 place-items-center rounded-lg border border-line-strong bg-paper-2 text-ink hover:border-forest hover:text-forest transition-colors mx-auto"
          aria-label="Swap currencies"
        >
          ⇄
        </button>

        <div>
          <label className="text-sm font-medium text-ink-soft">Converted to</label>
          <div className="mt-1.5 flex gap-2">
            <div className="flex-1 rounded-lg bg-paper-2 px-3 py-2.5 text-sm font-semibold text-forest truncate">
              {result !== null ? fmt(result, to) : error ? "—" : "…"}
            </div>
            <select aria-label="Convert to currency" value={to} onChange={(e) => setTo(e.target.value)} className={select}>
              {POPULAR.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-paper-2 p-5">
        {error ? (
          <p className="text-sm text-ink-soft">
            Live rates are unavailable right now — please try again shortly.
          </p>
        ) : result !== null ? (
          <>
            <p className="font-display text-3xl font-600 text-forest break-words">
              {fmt(result, to)}
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              1 {from} ({NAMES[from]}) ={" "}
              <strong className="text-ink">{oneUnit?.toFixed(4)} {to}</strong>
            </p>
            {updated && (
              <p className="mt-1 text-xs text-ink-faint">Rates: {updated}</p>
            )}
          </>
        ) : (
          <p className="text-sm text-ink-faint">Loading live rates…</p>
        )}
      </div>
    </div>
  );
}
