"use client";

import { useEffect, useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "@/components/calc/shared";

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------
type Bucket = "needs" | "wants" | "savings";

type Category = {
  id: string;
  name: string;
  amount: number;
  bucket: Bucket;
};

const STORAGE_KEY = "coinmind-budget";

const uid = () => Math.random().toString(36).slice(2, 10);

// Deterministic ids for the seeded rows so server & client render identically
// (custom rows added later use uid(), which only runs on the client).
const SAMPLE_INCOME = 60000;
const SAMPLE_CATEGORIES: Category[] = [
  { id: "d0", name: "Rent / EMI", amount: 18000, bucket: "needs" },
  { id: "d1", name: "Groceries", amount: 8000, bucket: "needs" },
  { id: "d2", name: "Utilities", amount: 3000, bucket: "needs" },
  { id: "d3", name: "Transport", amount: 4000, bucket: "needs" },
  { id: "d4", name: "Dining / Entertainment", amount: 5000, bucket: "wants" },
  { id: "d5", name: "Shopping", amount: 4000, bucket: "wants" },
  { id: "d6", name: "Health", amount: 2000, bucket: "needs" },
  { id: "d7", name: "Subscriptions", amount: 1000, bucket: "wants" },
  { id: "d8", name: "Savings / Investments", amount: 9000, bucket: "savings" },
  { id: "d9", name: "Other", amount: 2000, bucket: "wants" },
];

const BUCKET_LABEL: Record<Bucket, string> = {
  needs: "Need",
  wants: "Want",
  savings: "Save",
};

const BUCKET_COLOR: Record<Bucket, string> = {
  needs: "var(--color-forest)",
  wants: "var(--color-berry)",
  savings: "var(--color-brass)",
};

const num = (v: number) => (Number.isFinite(v) ? v : 0);

// ---------------------------------------------------------------------------
// Compact amount input — free typing, no clamp, never emits NaN.
// (Mirrors the shared Field text behaviour but without a slider, so the
//  expense list stays tidy across many rows.)
// ---------------------------------------------------------------------------
function AmountInput({
  value,
  onChange,
  prefix,
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  prefix: string;
  ariaLabel: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft ?? (value ? String(value) : "");

  const handleType = (str: string) => {
    const cleaned = str.replace(/[^\d.]/g, "");
    setDraft(cleaned);
    if (cleaned === "" || cleaned === ".") {
      onChange(0);
      return;
    }
    const n = Number(cleaned);
    if (Number.isFinite(n)) onChange(n);
  };

  return (
    <div className="flex items-center rounded-lg border border-line-strong bg-card px-2.5 py-1.5 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/25 transition-colors">
      <span className="text-sm text-ink-faint mr-1">{prefix}</span>
      <input
        type="text"
        inputMode="decimal"
        value={display}
        placeholder="0"
        onFocus={(e) => {
          setDraft(value ? String(value) : "");
          e.target.select();
        }}
        onChange={(e) => handleType(e.target.value)}
        onBlur={() => setDraft(null)}
        className="w-24 bg-transparent text-right text-sm font-semibold text-ink outline-none"
        aria-label={ariaLabel}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 50/30/20 bucket bar
// ---------------------------------------------------------------------------
function BucketBar({
  label,
  amount,
  pct,
  ideal,
  bucket,
  currency,
}: {
  label: string;
  amount: number;
  pct: number;
  ideal: number;
  bucket: Bucket;
  currency: Currency;
}) {
  // For savings, more than the ideal is good. For needs/wants, staying at or
  // under the ideal is good.
  const good = bucket === "savings" ? pct >= ideal : pct <= ideal;
  const delta = Math.abs(pct - ideal);
  const status =
    bucket === "savings"
      ? good
        ? "On track"
        : `${delta.toFixed(0)}pp below 20%`
      : good
        ? "Within target"
        : `${delta.toFixed(0)}pp over`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-ink-soft">
          {formatCurrency(amount, currency)} &middot; {pct.toFixed(0)}%
        </span>
      </div>
      <div className="relative mt-2">
        <div className="h-2.5 rounded-full bg-line-strong overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(Math.max(pct, 0), 100)}%`,
              background: BUCKET_COLOR[bucket],
              transition: "width 0.4s ease",
            }}
          />
        </div>
        {/* Ideal marker */}
        <span
          className="absolute top-1/2 -translate-y-1/2 h-3.5 w-0.5 rounded bg-ink/45"
          style={{ left: `${ideal}%` }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-1.5 text-xs">
        <span className="text-ink-faint">Ideal {ideal}% &middot; </span>
        <span className={good ? "text-brass font-medium" : "text-berry font-medium"}>
          {status}
        </span>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Budget Planner
// ---------------------------------------------------------------------------
export default function BudgetPlanner() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [income, setIncome] = useState(SAMPLE_INCOME);
  const [categories, setCategories] = useState<Category[]>(SAMPLE_CATEGORIES);
  const [hydrated, setHydrated] = useState(false);

  // Load saved budget once on mount (falls back to the sample above).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          currency?: Currency;
          income?: number;
          categories?: Category[];
        };
        if (parsed.currency === "INR" || parsed.currency === "USD" || parsed.currency === "GBP") {
          setCurrency(parsed.currency);
        }
        if (Number.isFinite(parsed.income)) setIncome(Number(parsed.income));
        if (Array.isArray(parsed.categories)) {
          setCategories(
            parsed.categories.map((c) => ({
              id: typeof c.id === "string" ? c.id : uid(),
              name: typeof c.name === "string" ? c.name : "",
              amount: Number.isFinite(c.amount) ? Number(c.amount) : 0,
              bucket:
                c.bucket === "needs" || c.bucket === "wants" || c.bucket === "savings"
                  ? c.bucket
                  : "wants",
            }))
          );
        }
      }
    } catch {
      /* corrupt or unavailable storage — keep the sample */
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so we never clobber saved data with the sample.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ currency, income, categories })
      );
    } catch {
      /* storage full / disabled — planner still works */
    }
  }, [currency, income, categories, hydrated]);

  // -- row helpers ----------------------------------------------------------
  const updateRow = (id: string, patch: Partial<Category>) =>
    setCategories((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const removeRow = (id: string) =>
    setCategories((rows) => rows.filter((r) => r.id !== id));

  const addRow = () =>
    setCategories((rows) => [...rows, { id: uid(), name: "", amount: 0, bucket: "wants" }]);

  const reset = () => {
    setCurrency("INR");
    setIncome(SAMPLE_INCOME);
    setCategories(SAMPLE_CATEGORIES);
  };

  // -- live maths -----------------------------------------------------------
  const m = useMemo(() => {
    const inc = num(income);
    const totalExpenses = categories.reduce((s, c) => s + num(c.amount), 0);
    const surplus = inc - totalExpenses;

    const needsTotal = categories
      .filter((c) => c.bucket === "needs")
      .reduce((s, c) => s + num(c.amount), 0);
    const wantsTotal = categories
      .filter((c) => c.bucket === "wants")
      .reduce((s, c) => s + num(c.amount), 0);
    const savingsCat = categories
      .filter((c) => c.bucket === "savings")
      .reduce((s, c) => s + num(c.amount), 0);

    // Any un-earmarked surplus is effectively saved, so it joins the savings
    // bucket for the 50/30/20 comparison (making the three buckets add to 100%).
    const savingsBucket = savingsCat + Math.max(surplus, 0);

    const pct = (v: number) => (inc > 0 ? (v / inc) * 100 : 0);
    const needsPct = pct(needsTotal);
    const wantsPct = pct(wantsTotal);
    const savingsPct = pct(savingsBucket);
    const savingsRate = savingsPct; // % of income going to savings

    let verdict: string;
    if (inc <= 0) {
      verdict = "Enter your monthly income to see how your budget stacks up against 50/30/20.";
    } else if (surplus < 0) {
      verdict = "You are spending more than you earn — this budget is not sustainable yet.";
    } else if (savingsRate >= 20 && needsPct <= 55) {
      verdict = "Great balance — you are saving at least 20% and keeping your needs in check.";
    } else if (savingsRate >= 20) {
      verdict = "Strong savings rate. Your needs run a little high, but you are still putting money away.";
    } else if (savingsRate >= 10) {
      verdict = "A solid start. Trim a few wants to push your savings toward the 20% mark.";
    } else {
      verdict = "Your savings rate is low. Free up room so at least 20% of income goes to savings.";
    }

    return {
      inc,
      totalExpenses,
      surplus,
      needsTotal,
      wantsTotal,
      savingsBucket,
      needsPct,
      wantsPct,
      savingsPct,
      savingsRate,
      verdict,
    };
  }, [income, categories]);

  const sym = currencyMeta[currency].symbol;
  const deficit = m.surplus < 0;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* -------------------------------------------------- inputs card */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Your budget</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        <div className="mt-6">
          <Field
            label="Monthly income"
            value={income}
            onChange={setIncome}
            min={0}
            max={1000000}
            step={1000}
            prefix={sym}
            hint="Your take-home pay after tax each month."
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-medium text-ink-soft">Monthly expenses</p>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold text-ink-faint hover:text-forest transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="mt-3 space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <input
                type="text"
                value={cat.name}
                placeholder="Category"
                onChange={(e) => updateRow(cat.id, { name: e.target.value })}
                aria-label="Category name"
                className="min-w-0 flex-1 rounded-lg border border-line-strong bg-card px-3 py-1.5 text-sm text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/25 transition-colors"
              />
              <select
                value={cat.bucket}
                onChange={(e) => updateRow(cat.id, { bucket: e.target.value as Bucket })}
                aria-label="50/30/20 bucket"
                className="shrink-0 rounded-lg border border-line-strong bg-card px-2 py-1.5 text-xs font-semibold text-ink-soft outline-none focus:border-forest focus:ring-2 focus:ring-forest/25 transition-colors"
              >
                <option value="needs">{BUCKET_LABEL.needs}</option>
                <option value="wants">{BUCKET_LABEL.wants}</option>
                <option value="savings">{BUCKET_LABEL.savings}</option>
              </select>
              <AmountInput
                value={cat.amount}
                onChange={(v) => updateRow(cat.id, { amount: v })}
                prefix={sym}
                ariaLabel={`${cat.name || "Category"} amount`}
              />
              <button
                type="button"
                onClick={() => removeRow(cat.id)}
                aria-label={`Remove ${cat.name || "category"}`}
                className="shrink-0 rounded-lg px-2 py-1.5 text-ink-faint hover:text-berry hover:bg-berry/5 transition-colors"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRow}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-semibold text-forest hover:border-forest transition-colors"
        >
          + Add category
        </button>

        <p className="mt-4 text-xs text-ink-faint">
          Tag each row as a <strong className="text-ink-soft">Need</strong>,{" "}
          <strong className="text-ink-soft">Want</strong> or{" "}
          <strong className="text-ink-soft">Save</strong> to see how your spending
          compares with the 50/30/20 rule.
        </p>
      </div>

      {/* -------------------------------------------------- results card */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          {deficit ? "Over budget by" : "Left to save / spend"}
        </p>
        <p
          className={`mt-1 font-display text-4xl font-600 break-words ${
            deficit ? "text-berry" : "text-forest"
          }`}
        >
          {formatCurrency(Math.abs(m.surplus), currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          {deficit
            ? "expenses exceed your income"
            : "of your income is still unspent each month"}
        </p>

        {deficit && (
          <div className="mt-4 rounded-xl border border-berry/30 bg-berry/5 px-4 py-3 text-sm text-ink-soft">
            <strong className="text-berry">Heads up:</strong> your expenses are{" "}
            {formatCurrency(Math.abs(m.surplus), currency)} more than you earn.
            Trim some wants or grow your income to get back into the black.
          </div>
        )}

        <div className="mt-6">
          <Donut
            primary={Math.max(m.surplus, 0)}
            secondary={m.totalExpenses}
            primaryLabel="Left over"
            secondaryLabel="Expenses"
            size={190}
          />
        </div>

        <div className="mt-6">
          <Stat label="Total income" value={formatCurrency(m.inc, currency)} accent="ink" />
          <Stat
            label="Total expenses"
            value={formatCurrency(m.totalExpenses, currency)}
            accent="brass"
          />
          <Stat
            label={deficit ? "Monthly deficit" : "Monthly surplus"}
            value={formatCurrency(Math.abs(m.surplus), currency)}
            accent={deficit ? "ink" : "forest"}
          />
          <Stat
            label="Savings rate"
            value={`${m.savingsRate.toFixed(0)}%`}
            accent="forest"
          />
        </div>

        {/* 50/30/20 comparison */}
        <div className="mt-7 rounded-xl border border-line bg-card p-5">
          <h3 className="font-display text-base font-600 text-ink">
            50 / 30 / 20 check
          </h3>
          <p className="mt-1 text-xs text-ink-faint">
            Spend 50% on needs, 30% on wants and save 20% of your income.
          </p>
          <div className="mt-5 space-y-4">
            <BucketBar
              label="Needs"
              amount={m.needsTotal}
              pct={m.needsPct}
              ideal={50}
              bucket="needs"
              currency={currency}
            />
            <BucketBar
              label="Wants"
              amount={m.wantsTotal}
              pct={m.wantsPct}
              ideal={30}
              bucket="wants"
              currency={currency}
            />
            <BucketBar
              label="Savings"
              amount={m.savingsBucket}
              pct={m.savingsPct}
              ideal={20}
              bucket="savings"
              currency={currency}
            />
          </div>
          <p className="mt-5 border-t border-line pt-4 text-sm text-ink-soft">
            {m.verdict}
          </p>
        </div>
      </div>
    </div>
  );
}
