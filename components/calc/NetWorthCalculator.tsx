"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";

type Asset = { id: number; label: string; value: number };
type Liability = { id: number; label: string; value: number };

const DEFAULT_ASSETS: Asset[] = [
  { id: 1, label: "Cash & savings", value: 200000 },
  { id: 2, label: "Mutual funds / stocks", value: 500000 },
  { id: 3, label: "EPF / PPF", value: 300000 },
  { id: 4, label: "Real estate (market value)", value: 0 },
  { id: 5, label: "Gold / jewellery", value: 100000 },
];

const DEFAULT_LIABILITIES: Liability[] = [
  { id: 1, label: "Home loan outstanding", value: 0 },
  { id: 2, label: "Car loan outstanding", value: 0 },
  { id: 3, label: "Personal loan", value: 0 },
  { id: 4, label: "Credit card balance", value: 0 },
];

let nextId = 10;

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<Asset[]>(DEFAULT_ASSETS);
  const [liabilities, setLiabilities] = useState<Liability[]>(DEFAULT_LIABILITIES);

  const totals = useMemo(() => {
    const totalAssets = assets.reduce((s, a) => s + (a.value || 0), 0);
    const totalLiabilities = liabilities.reduce((s, l) => s + (l.value || 0), 0);
    const netWorth = totalAssets - totalLiabilities;
    const debtRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
    return { totalAssets, totalLiabilities, netWorth, debtRatio };
  }, [assets, liabilities]);

  const updateAsset = (id: number, value: number) =>
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, value } : a)));

  const updateLiability = (id: number, value: number) =>
    setLiabilities((prev) => prev.map((l) => (l.id === id ? { ...l, value } : l)));

  const addAsset = () =>
    setAssets((prev) => [...prev, { id: ++nextId, label: "Other asset", value: 0 }]);

  const addLiability = () =>
    setLiabilities((prev) => [...prev, { id: ++nextId, label: "Other debt", value: 0 }]);

  const removeAsset = (id: number) => setAssets((prev) => prev.filter((a) => a.id !== id));
  const removeLiability = (id: number) => setLiabilities((prev) => prev.filter((l) => l.id !== id));

  const netWorthColor = totals.netWorth >= 0 ? "text-forest" : "text-red-500";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: inputs */}
      <div className="space-y-6">
        {/* Assets */}
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl text-ink">Assets (what you own)</h2>
          <p className="text-xs text-ink-faint mt-1">Enter current market value</p>
          <div className="mt-5 space-y-3">
            {assets.map((a) => (
              <EntryRow
                key={a.id}
                label={a.label}
                value={a.value}
                onChange={(v) => updateAsset(a.id, v)}
                onRemove={() => removeAsset(a.id)}
              />
            ))}
          </div>
          <button
            onClick={addAsset}
            className="mt-3 text-sm text-forest font-medium hover:underline"
          >
            + Add asset
          </button>
          <div className="mt-4 flex justify-between pt-3 border-t border-line">
            <span className="text-sm font-semibold text-ink">Total assets</span>
            <span className="text-sm font-bold text-forest">{formatCurrency(totals.totalAssets)}</span>
          </div>
        </div>

        {/* Liabilities */}
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl text-ink">Liabilities (what you owe)</h2>
          <p className="text-xs text-ink-faint mt-1">Enter outstanding balances</p>
          <div className="mt-5 space-y-3">
            {liabilities.map((l) => (
              <EntryRow
                key={l.id}
                label={l.label}
                value={l.value}
                onChange={(v) => updateLiability(l.id, v)}
                onRemove={() => removeLiability(l.id)}
              />
            ))}
          </div>
          <button
            onClick={addLiability}
            className="mt-3 text-sm text-forest font-medium hover:underline"
          >
            + Add liability
          </button>
          <div className="mt-4 flex justify-between pt-3 border-t border-line">
            <span className="text-sm font-semibold text-ink">Total liabilities</span>
            <span className="text-sm font-bold text-red-500">{formatCurrency(totals.totalLiabilities)}</span>
          </div>
        </div>
      </div>

      {/* Right: results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7 flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Your net worth</p>
          <p className={`mt-1 font-display text-4xl font-600 break-words ${netWorthColor}`}>
            {formatCurrency(totals.netWorth)}
          </p>
          <p className="mt-1 text-sm text-ink-faint">Assets − Liabilities</p>
        </div>

        <div className="space-y-0 divide-y divide-line">
          <ResultRow label="Total assets" value={formatCurrency(totals.totalAssets)} color="text-forest" />
          <ResultRow label="Total liabilities" value={formatCurrency(totals.totalLiabilities)} color="text-red-500" />
          <ResultRow label="Debt-to-asset ratio" value={`${totals.debtRatio.toFixed(1)}%`} color="text-ink" />
        </div>

        <div className={`rounded-xl p-4 ${totals.netWorth >= 0 ? "bg-forest-soft" : "bg-red-50 dark:bg-red-950/20"}`}>
          <p className={`text-sm font-medium ${totals.netWorth >= 0 ? "text-forest-deep" : "text-red-700 dark:text-red-300"}`}>
            {totals.netWorth >= 0
              ? totals.netWorth >= 1000000
                ? "Strong balance sheet. Keep building and diversifying."
                : "Positive net worth. Focus on growing assets and reducing debt."
              : "Negative net worth. Prioritise paying down high-interest debt."}
          </p>
        </div>

        <p className="text-xs text-ink-faint">
          This is a snapshot at today&apos;s values. Your net worth changes as markets move, loans reduce, and savings grow.
        </p>
      </div>
    </div>
  );
}

function EntryRow({
  label,
  value,
  onChange,
  onRemove,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-ink-soft flex-1 truncate">{label}</span>
      <div className="flex items-center rounded-lg border border-line-strong bg-white dark:bg-bg px-2.5 py-1.5 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/25 transition-colors">
        <span className="text-sm text-ink-faint mr-1">₹</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-24 bg-transparent text-right text-sm font-semibold text-ink outline-none"
          min={0}
          step={10000}
        />
      </div>
      <button
        onClick={onRemove}
        className="text-ink-faint hover:text-red-500 transition-colors text-lg leading-none"
        aria-label="Remove"
      >
        ×
      </button>
    </div>
  );
}

function ResultRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-ink-soft">{label}</span>
      <span className={`font-display text-lg font-600 ${color}`}>{value}</span>
    </div>
  );
}
