"use client";

import { useEffect, useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type LineItem = {
  id: string;
  description: string;
  qty: string; // kept as string for free typing; parsed safely for totals
  price: string;
};

type InvoiceData = {
  // Your business
  bizName: string;
  bizEmail: string;
  bizAddress: string;
  logoText: string;
  // Bill to
  clientName: string;
  clientAddress: string;
  // Meta
  invoiceNumber: string;
  invoiceDate: string; // yyyy-mm-dd
  dueDate: string; // yyyy-mm-dd
  currency: string; // ISO code, see CURRENCIES
  // Body
  items: LineItem[];
  taxPercent: string; // optional
  notes: string;
};

const STORAGE_KEY = "coinmind-invoice";

const CURRENCIES = [
  { code: "INR", symbol: "₹", locale: "en-IN", label: "₹ Indian Rupee (INR)" },
  { code: "USD", symbol: "$", locale: "en-US", label: "$ US Dollar (USD)" },
  { code: "GBP", symbol: "£", locale: "en-GB", label: "£ British Pound (GBP)" },
  { code: "EUR", symbol: "€", locale: "en-IE", label: "€ Euro (EUR)" },
] as const;

const uid = () => Math.random().toString(36).slice(2, 10);

const emptyItem = (): LineItem => ({
  id: uid(),
  description: "",
  qty: "1",
  price: "",
});

// Safe numeric parse — never returns NaN, guards empty/invalid input.
const num = (v: string): number => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

function currencyOf(code: string) {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

function formatMoney(amount: number, code: string): string {
  const cur = currencyOf(code);
  const safe = Number.isFinite(amount) ? amount : 0;
  return `${cur.symbol}${safe.toLocaleString(cur.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const SAMPLE: InvoiceData = {
  bizName: "Aarav Sharma Design Studio",
  bizEmail: "hello@aaravstudio.com",
  bizAddress: "24 MG Road, Bengaluru, Karnataka 560001, India",
  logoText: "Aarav Studio",
  clientName: "BrightApps Pvt Ltd",
  clientAddress: "5th Floor, Cyber Towers, Hyderabad 500081, India",
  invoiceNumber: "INV-0001",
  invoiceDate: "2026-07-17",
  dueDate: "2026-07-31",
  currency: "INR",
  items: [
    {
      id: uid(),
      description: "Landing page design (5 sections)",
      qty: "1",
      price: "45000",
    },
    {
      id: uid(),
      description: "Logo & brand refresh",
      qty: "1",
      price: "20000",
    },
    {
      id: uid(),
      description: "Design revision rounds",
      qty: "3",
      price: "2500",
    },
  ],
  taxPercent: "18",
  notes:
    "Payment due within 14 days. Bank transfer to A/C 0000 1234 5678, IFSC ABCD0123456. Thank you for your business!",
};

const BLANK: InvoiceData = {
  bizName: "",
  bizEmail: "",
  bizAddress: "",
  logoText: "",
  clientName: "",
  clientAddress: "",
  invoiceNumber: "INV-0001",
  invoiceDate: "",
  dueDate: "",
  currency: "INR",
  items: [emptyItem()],
  taxPercent: "",
  notes: "",
};

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------
const inputCls =
  "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-forest w-full";
const labelCls = "text-sm font-medium text-ink-soft";

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(BLANK);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once. Seed with a sample so the preview looks alive.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<InvoiceData>;
        setData({
          ...BLANK,
          ...parsed,
          items:
            parsed.items && parsed.items.length ? parsed.items : [emptyItem()],
        });
      } else {
        setData(SAMPLE);
      }
    } catch {
      setData(SAMPLE);
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so we never clobber saved data.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full / disabled — ignore, tool still works */
    }
  }, [data, hydrated]);

  // -- field setters --------------------------------------------------------
  function setField<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function updateItem(id: string, patch: Partial<LineItem>) {
    setData((d) => ({
      ...d,
      items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }));
  }
  function addItem() {
    setData((d) => ({ ...d, items: [...d.items, emptyItem()] }));
  }
  function removeItem(id: string) {
    setData((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) }));
  }

  // -- actions --------------------------------------------------------------
  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  function handleClear() {
    if (
      typeof window !== "undefined" &&
      window.confirm(
        "Start over? This clears all the invoice details you've entered on this page."
      )
    ) {
      setData(BLANK);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }

  // -- computed totals (all guarded, never NaN) -----------------------------
  const { subtotal, taxAmount, total } = useMemo(() => {
    const sub = data.items.reduce(
      (acc, it) => acc + num(it.qty) * num(it.price),
      0
    );
    const tax = sub * (num(data.taxPercent) / 100);
    return { subtotal: sub, taxAmount: tax, total: sub + tax };
  }, [data.items, data.taxPercent]);

  const cur = currencyOf(data.currency);
  const taxRate = num(data.taxPercent);
  const hasItems = data.items.some(
    (it) => it.description.trim() || num(it.price) > 0
  );

  return (
    <div className="invoice-generator">
      {/* Print rules — only the preview is visible when printing. */}
      <style>{`
        @media print {
          @page { margin: 14mm; }
          html, body { background: #ffffff !important; }
          body * { visibility: hidden; }
          #invoice-preview, #invoice-preview * { visibility: visible; }
          #invoice-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Action bar */}
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Download PDF
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft hover:border-forest hover:text-forest"
        >
          Clear / Start over
        </button>
        <p className="text-xs text-ink-faint">
          Your details stay in your browser — nothing is uploaded. Use your
          browser&apos;s &ldquo;Save as PDF&rdquo; option in the print dialog.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT — the form                                                  */}
        {/* ---------------------------------------------------------------- */}
        <div className="no-print space-y-6">
          {/* Your business */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-lg font-600 text-ink">
              Your business
            </h2>
            <div className="mt-5 grid gap-4">
              <Labeled label="Business name">
                <input
                  className={inputCls}
                  value={data.bizName}
                  onChange={(e) => setField("bizName", e.target.value)}
                  placeholder="e.g. Aarav Sharma Design Studio"
                />
              </Labeled>
              <div className="grid sm:grid-cols-2 gap-4">
                <Labeled label="Email">
                  <input
                    type="email"
                    className={inputCls}
                    value={data.bizEmail}
                    onChange={(e) => setField("bizEmail", e.target.value)}
                    placeholder="you@business.com"
                  />
                </Labeled>
                <Labeled label="Logo text (optional)">
                  <input
                    className={inputCls}
                    value={data.logoText}
                    onChange={(e) => setField("logoText", e.target.value)}
                    placeholder="Shown large on the invoice"
                  />
                </Labeled>
              </div>
              <Labeled label="Business address">
                <textarea
                  rows={2}
                  className={`${inputCls} resize-y`}
                  value={data.bizAddress}
                  onChange={(e) => setField("bizAddress", e.target.value)}
                  placeholder="Street, city, state, postcode, country"
                />
              </Labeled>
            </div>
          </section>

          {/* Bill to */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-lg font-600 text-ink">Bill to</h2>
            <div className="mt-5 grid gap-4">
              <Labeled label="Client name">
                <input
                  className={inputCls}
                  value={data.clientName}
                  onChange={(e) => setField("clientName", e.target.value)}
                  placeholder="e.g. BrightApps Pvt Ltd"
                />
              </Labeled>
              <Labeled label="Client address">
                <textarea
                  rows={2}
                  className={`${inputCls} resize-y`}
                  value={data.clientAddress}
                  onChange={(e) => setField("clientAddress", e.target.value)}
                  placeholder="Street, city, state, postcode, country"
                />
              </Labeled>
            </div>
          </section>

          {/* Invoice details */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-lg font-600 text-ink">
              Invoice details
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Labeled label="Invoice number">
                  <input
                    className={inputCls}
                    value={data.invoiceNumber}
                    onChange={(e) => setField("invoiceNumber", e.target.value)}
                    placeholder="INV-0001"
                  />
                </Labeled>
                <Labeled label="Currency">
                  <select
                    className={inputCls}
                    value={data.currency}
                    onChange={(e) => setField("currency", e.target.value)}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Labeled>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Labeled label="Invoice date">
                  <input
                    type="date"
                    className={inputCls}
                    value={data.invoiceDate}
                    onChange={(e) => setField("invoiceDate", e.target.value)}
                  />
                </Labeled>
                <Labeled label="Due date">
                  <input
                    type="date"
                    className={inputCls}
                    value={data.dueDate}
                    onChange={(e) => setField("dueDate", e.target.value)}
                  />
                </Labeled>
              </div>
            </div>
          </section>

          {/* Line items */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-600 text-ink">
                Line items
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-forest hover:text-forest"
              >
                + Add item
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {data.items.map((it, i) => {
                const lineTotal = num(it.qty) * num(it.price);
                return (
                  <div
                    key={it.id}
                    className="rounded-xl border border-line bg-paper-2/60 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                        Item {i + 1}
                      </span>
                      {data.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="text-xs font-semibold text-ink-faint hover:text-berry"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="mt-3 grid gap-3">
                      <Labeled label="Description">
                        <input
                          className={inputCls}
                          value={it.description}
                          onChange={(e) =>
                            updateItem(it.id, { description: e.target.value })
                          }
                          placeholder="e.g. Landing page design"
                        />
                      </Labeled>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <Labeled label="Qty">
                          <input
                            inputMode="decimal"
                            className={inputCls}
                            value={it.qty}
                            onChange={(e) =>
                              updateItem(it.id, { qty: e.target.value })
                            }
                            placeholder="1"
                          />
                        </Labeled>
                        <Labeled label={`Unit price (${cur.symbol})`}>
                          <input
                            inputMode="decimal"
                            className={inputCls}
                            value={it.price}
                            onChange={(e) =>
                              updateItem(it.id, { price: e.target.value })
                            }
                            placeholder="0.00"
                          />
                        </Labeled>
                        <div className="col-span-2 sm:col-span-1">
                          <span className={labelCls}>Line total</span>
                          <div className="mt-1.5 rounded-lg border border-line bg-card px-3 py-2.5 text-sm font-semibold text-ink">
                            {formatMoney(lineTotal, data.currency)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tax */}
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Labeled label="Tax rate % (optional)">
                <input
                  inputMode="decimal"
                  className={inputCls}
                  value={data.taxPercent}
                  onChange={(e) => setField("taxPercent", e.target.value)}
                  placeholder="e.g. 18 for GST"
                />
              </Labeled>
            </div>
          </section>

          {/* Notes / terms */}
          <section className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-lg font-600 text-ink">
              Notes &amp; terms
            </h2>
            <p className="mt-1 text-sm text-ink-faint">
              Payment terms, bank details or a thank-you note.
            </p>
            <textarea
              rows={3}
              className={`${inputCls} mt-4 resize-y leading-relaxed`}
              value={data.notes}
              onChange={(e) => setField("notes", e.target.value)}
              placeholder="Payment due within 14 days. Bank transfer to…"
            />
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT — live preview                                             */}
        {/* ---------------------------------------------------------------- */}
        <div className="lg:sticky lg:top-6 self-start">
          <div
            id="invoice-preview"
            className="rounded-2xl border border-line bg-white p-8 sm:p-10 shadow-sm"
          >
            {/* Header */}
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e5e7f2] pb-6">
              <div className="min-w-0">
                <p className="font-display text-[22px] font-700 leading-tight text-[#0f1424]">
                  {data.logoText || data.bizName || "Your Business"}
                </p>
                {data.bizEmail && (
                  <p className="mt-1 text-[12.5px] text-[#3f4661]">
                    {data.bizEmail}
                  </p>
                )}
                {data.bizAddress && (
                  <p className="mt-1 max-w-[240px] whitespace-pre-line text-[12.5px] leading-relaxed text-[#3f4661]">
                    {data.bizAddress}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-display text-[26px] font-700 uppercase tracking-[0.12em] text-[#2563eb]">
                  Invoice
                </p>
                {data.invoiceNumber && (
                  <p className="mt-1 text-[13px] font-semibold text-[#0f1424]">
                    {data.invoiceNumber}
                  </p>
                )}
                <div className="mt-3 space-y-0.5 text-[12px] text-[#3f4661]">
                  {data.invoiceDate && (
                    <p>
                      <span className="text-[#6b7288]">Issued: </span>
                      {formatDate(data.invoiceDate)}
                    </p>
                  )}
                  {data.dueDate && (
                    <p>
                      <span className="text-[#6b7288]">Due: </span>
                      {formatDate(data.dueDate)}
                    </p>
                  )}
                </div>
              </div>
            </header>

            {/* Bill to */}
            {(data.clientName.trim() || data.clientAddress.trim()) && (
              <section className="mt-6">
                <p className="text-[11px] font-700 uppercase tracking-[0.14em] text-[#2563eb]">
                  Bill to
                </p>
                {data.clientName && (
                  <p className="mt-1.5 text-[14px] font-700 text-[#0f1424]">
                    {data.clientName}
                  </p>
                )}
                {data.clientAddress && (
                  <p className="mt-0.5 whitespace-pre-line text-[12.5px] leading-relaxed text-[#3f4661]">
                    {data.clientAddress}
                  </p>
                )}
              </section>
            )}

            {/* Items table */}
            <section className="mt-6">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-[#e5e7f2]">
                    <th className="pb-2 text-[11px] font-700 uppercase tracking-[0.1em] text-[#6b7288]">
                      Description
                    </th>
                    <th className="pb-2 text-right text-[11px] font-700 uppercase tracking-[0.1em] text-[#6b7288]">
                      Qty
                    </th>
                    <th className="pb-2 text-right text-[11px] font-700 uppercase tracking-[0.1em] text-[#6b7288]">
                      Unit price
                    </th>
                    <th className="pb-2 text-right text-[11px] font-700 uppercase tracking-[0.1em] text-[#6b7288]">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hasItems ? (
                    data.items
                      .filter(
                        (it) => it.description.trim() || num(it.price) > 0
                      )
                      .map((it) => (
                        <tr
                          key={it.id}
                          className="border-b border-[#eef0f7] align-top"
                        >
                          <td className="py-2.5 pr-3 text-[13px] text-[#0f1424]">
                            {it.description || "—"}
                          </td>
                          <td className="py-2.5 text-right text-[13px] tabular-nums text-[#3f4661]">
                            {num(it.qty)}
                          </td>
                          <td className="py-2.5 pl-3 text-right text-[13px] tabular-nums text-[#3f4661]">
                            {formatMoney(num(it.price), data.currency)}
                          </td>
                          <td className="py-2.5 pl-3 text-right text-[13px] font-600 tabular-nums text-[#0f1424]">
                            {formatMoney(
                              num(it.qty) * num(it.price),
                              data.currency
                            )}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr className="border-b border-[#eef0f7]">
                      <td
                        colSpan={4}
                        className="py-4 text-center text-[13px] text-[#6b7288]"
                      >
                        Add a line item to see it here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Totals */}
              <div className="mt-4 flex justify-end">
                <div className="w-full max-w-[260px] space-y-1.5 text-[13px]">
                  <div className="flex justify-between text-[#3f4661]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">
                      {formatMoney(subtotal, data.currency)}
                    </span>
                  </div>
                  {taxRate > 0 && (
                    <div className="flex justify-between text-[#3f4661]">
                      <span>Tax ({taxRate}%)</span>
                      <span className="tabular-nums">
                        {formatMoney(taxAmount, data.currency)}
                      </span>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between border-t-2 border-[#e5e7f2] pt-2 text-[15px] font-700 text-[#0f1424]">
                    <span>Total</span>
                    <span className="tabular-nums text-[#2563eb]">
                      {formatMoney(total, data.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Notes */}
            {data.notes.trim() && (
              <section className="mt-6 border-t border-[#e5e7f2] pt-4">
                <p className="text-[11px] font-700 uppercase tracking-[0.14em] text-[#2563eb]">
                  Notes &amp; terms
                </p>
                <p className="mt-1.5 whitespace-pre-line text-[12.5px] leading-relaxed text-[#3f4661]">
                  {data.notes}
                </p>
              </section>
            )}
          </div>

          <p className="no-print mt-3 text-center text-xs text-ink-faint">
            Live preview — this is exactly what your PDF will look like.
          </p>
        </div>
      </div>
    </div>
  );
}
