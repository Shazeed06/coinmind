"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { Field, Stat } from "./shared";

const RATES = [5, 12, 18, 28];

export default function GstCalculator() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { base, gst, total } = useMemo(() => {
    if (mode === "add") {
      const g = (amount * rate) / 100;
      return { base: amount, gst: g, total: amount + g };
    }
    // remove: amount is GST-inclusive
    const b = (amount * 100) / (100 + rate);
    return { base: b, gst: amount - b, total: amount };
  }, [amount, rate, mode]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">GST details</h2>
        <div className="mt-5">
          <p className="text-sm font-medium text-ink-soft mb-2.5">Mode</p>
          <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
            <button type="button" onClick={() => setMode("add")} className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${mode === "add" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}>
              Add GST
            </button>
            <button type="button" onClick={() => setMode("remove")} className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${mode === "remove" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}>
              Remove GST
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-7">
          <Field label={mode === "add" ? "Amount (before GST)" : "Amount (incl. GST)"} value={amount} onChange={setAmount} min={100} max={10000000} step={100} prefix="₹" />
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">GST rate</p>
            <div className="flex flex-wrap gap-2">
              {RATES.map((rr) => (
                <button key={rr} type="button" onClick={() => setRate(rr)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${rate === rr ? "bg-forest text-white" : "border border-line-strong bg-card text-ink-soft hover:border-forest"}`}>
                  {rr}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Total amount</p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">{formatCurrency(total)}</p>
        <div className="mt-6">
          <Stat label="Base amount" value={formatCurrency(base)} accent="ink" />
          <Stat label={`GST (${rate}%)`} value={formatCurrency(gst)} accent="brass" />
          <Stat label="Total (incl. GST)" value={formatCurrency(total)} accent="forest" />
        </div>
        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          For intra-state sales, GST splits equally into <strong className="text-ink">CGST {rate / 2}%</strong> and <strong className="text-ink">SGST {rate / 2}%</strong>. For inter-state, it&apos;s a single <strong className="text-ink">IGST {rate}%</strong>.
        </div>
      </div>
    </div>
  );
}
