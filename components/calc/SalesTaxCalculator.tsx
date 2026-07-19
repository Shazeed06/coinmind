"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, CurrencyToggle, Stat } from "./shared";

export default function SalesTaxCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { net, tax, total } = useMemo(() => {
    const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
    const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 0;
    if (mode === "add") {
      const t = (safeAmount * safeRate) / 100;
      return { net: safeAmount, tax: t, total: safeAmount + t };
    }
    // remove: the entered amount is tax-inclusive, so extract the net
    const n = (safeAmount * 100) / (100 + safeRate);
    return { net: n, tax: safeAmount - n, total: safeAmount };
  }, [amount, rate, mode]);

  const sym = currencyMeta[currency].symbol;
  const headline = mode === "add" ? total : net;
  const headlineLabel = mode === "add" ? "Total incl. tax" : "Net excl. tax";

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Tax details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-ink-soft mb-2.5">Mode</p>
          <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                mode === "add"
                  ? "bg-forest text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Add tax
            </button>
            <button
              type="button"
              onClick={() => setMode("remove")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                mode === "remove"
                  ? "bg-forest text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Remove tax
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-7">
          <Field
            label={mode === "add" ? "Amount (before tax)" : "Amount (incl. tax)"}
            value={amount}
            onChange={setAmount}
            min={0}
            max={100000}
            step={10}
            prefix={sym}
          />
          <Field
            label="Tax rate"
            value={rate}
            onChange={setRate}
            min={0}
            max={30}
            step={0.5}
            suffix="%"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          {headlineLabel}
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(headline, currency)}
        </p>

        <div className="mt-6">
          <Stat
            label="Net amount (excl. tax)"
            value={formatCurrency(net, currency)}
            accent="ink"
          />
          <Stat
            label={`Tax (${Number.isFinite(rate) ? rate : 0}%)`}
            value={formatCurrency(tax, currency)}
            accent="brass"
          />
          <Stat
            label="Total (incl. tax)"
            value={formatCurrency(total, currency)}
            accent="forest"
          />
        </div>

        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          Works for <strong className="text-ink">US sales tax</strong> and{" "}
          <strong className="text-ink">UK &amp; EU VAT</strong> alike &mdash;
          just set the rate. Calculating Indian GST?{" "}
          <Link
            href="/calculators/gst"
            className="text-forest font-semibold hover:underline"
          >
            Use the GST calculator
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
