"use client";

import { useMemo, useState, useCallback } from "react";
import { formatCurrency } from "@/lib/format";
import { Field, Stat, Donut } from "./shared";

type TxnType = "buy-sell" | "swap" | "gift";

const TXN_TYPES: { id: TxnType; label: string; note: string }[] = [
  {
    id: "buy-sell",
    label: "Buy / Sell",
    note: "You bought crypto with INR and sold it later. Tax applies on the profit at 30% flat.",
  },
  {
    id: "swap",
    label: "Crypto-to-Crypto Swap",
    note: "Swapping one crypto for another is a taxable event. The sell value of the outgoing crypto minus its buy cost is your gain.",
  },
  {
    id: "gift",
    label: "Gift / Airdrop Received",
    note: "Gifted or airdropped crypto has a cost of zero. The entire fair market value at the time of sale is taxable.",
  },
];

const TAX_RATE = 0.30;
const CESS_RATE = 0.04;

export default function CryptoTaxCalculator() {
  const [txnType, setTxnType] = useState<TxnType>("buy-sell");
  const [buyPrice, setBuyPrice] = useState(50000);
  const [sellPrice, setSellPrice] = useState(120000);
  const [quantity, setQuantity] = useState(1);
  const [tdsCredit, setTdsCredit] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const txn = TXN_TYPES.find((t) => t.id === txnType) ?? TXN_TYPES[0];

  const result = useMemo(() => {
    const effectiveBuy = txnType === "gift" ? 0 : buyPrice;
    const totalBuy = effectiveBuy * quantity;
    const totalSell = sellPrice * quantity;
    const profit = totalSell - totalBuy;
    const taxableGain = Math.max(0, profit);
    const tax30 = taxableGain * TAX_RATE;
    const cess = tax30 * CESS_RATE;
    const totalTax = tax30 + cess;
    const netTaxPayable = Math.max(0, totalTax - tdsCredit);
    const effectiveTaxRate = totalSell > 0 ? (totalTax / totalSell) * 100 : 0;
    const netProceeds = totalSell - totalTax;

    return {
      totalBuy,
      totalSell,
      profit,
      taxableGain,
      tax30,
      cess,
      totalTax,
      netTaxPayable,
      effectiveTaxRate,
      netProceeds,
    };
  }, [txnType, buyPrice, sellPrice, quantity, tdsCredit]);

  const hasGain = result.profit > 0;

  const handleCopy = useCallback(() => {
    const text = `Crypto Tax Calculator Results:
Type: ${txn.label}
Buy Price: ${formatCurrency(txnType === "gift" ? 0 : buyPrice)} x ${quantity} = ${formatCurrency(result.totalBuy)}
Sell Price: ${formatCurrency(sellPrice)} x ${quantity} = ${formatCurrency(result.totalSell)}
Profit/Loss: ${formatCurrency(result.profit)}
Taxable Gain: ${formatCurrency(result.taxableGain)}
Tax at 30%: ${formatCurrency(result.tax30)}
Cess at 4%: ${formatCurrency(result.cess)}
Total Tax: ${formatCurrency(result.totalTax)}
TDS Credit: ${formatCurrency(tdsCredit)}
Net Tax Payable: ${formatCurrency(result.netTaxPayable)}
Net Proceeds: ${formatCurrency(result.netProceeds)}
Effective Tax Rate: ${result.effectiveTaxRate.toFixed(2)}%
Legal basis: Section 115BBH, Finance Act 2022`;
    navigator.clipboard.writeText(text);
  }, [txnType, txn.label, buyPrice, sellPrice, quantity, tdsCredit, result]);

  const tableRows = useMemo(() => {
    if (!showTable) return [];
    const effectiveBuy = txnType === "gift" ? 0 : buyPrice;
    return [
      { label: "Buy price per unit", value: formatCurrency(effectiveBuy) },
      { label: "Sell price per unit", value: formatCurrency(sellPrice) },
      { label: "Quantity", value: String(quantity) },
      { label: "Total buy value", value: formatCurrency(result.totalBuy) },
      { label: "Total sell value", value: formatCurrency(result.totalSell) },
      { label: "Profit / Loss", value: formatCurrency(result.profit) },
      { label: "Taxable gain (no loss set-off)", value: formatCurrency(result.taxableGain) },
      { label: "Tax at 30%", value: formatCurrency(result.tax30) },
      { label: "Health & education cess (4%)", value: formatCurrency(result.cess) },
      { label: "Total tax liability", value: formatCurrency(result.totalTax) },
      { label: "TDS credit (Section 194S)", value: formatCurrency(tdsCredit) },
      { label: "Net tax payable", value: formatCurrency(result.netTaxPayable) },
      { label: "Net proceeds after tax", value: formatCurrency(result.netProceeds) },
      { label: "Effective tax rate", value: `${result.effectiveTaxRate.toFixed(2)}%` },
    ];
  }, [showTable, txnType, buyPrice, sellPrice, quantity, tdsCredit, result]);

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl text-ink">Transaction details</h2>
        <p className="mt-1 text-sm text-ink-faint">Section 115BBH &middot; FY 2026-27 &middot; India</p>

        <div className="mt-5 space-y-6">
          <div>
            <label htmlFor="crypto-txn-type" className="text-sm font-medium text-ink-soft">
              Transaction type
            </label>
            <select
              id="crypto-txn-type"
              value={txnType}
              onChange={(e) => setTxnType(e.target.value as TxnType)}
              className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-medium text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/25 transition-colors"
            >
              {TXN_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          {txnType !== "gift" && (
            <Field
              label="Buy price per unit"
              value={buyPrice}
              onChange={setBuyPrice}
              min={0}
              max={50000000}
              step={1000}
              prefix="₹"
            />
          )}

          <Field
            label="Sell price per unit"
            value={sellPrice}
            onChange={setSellPrice}
            min={0}
            max={50000000}
            step={1000}
            prefix="₹"
          />

          <Field
            label="Quantity (units / coins)"
            value={quantity}
            onChange={setQuantity}
            min={0.001}
            max={100000}
            step={0.01}
            hint="Number of coins or tokens traded. Supports decimals."
          />

          <Field
            label="TDS already deducted"
            value={tdsCredit}
            onChange={setTdsCredit}
            min={0}
            max={5000000}
            step={100}
            prefix="₹"
            hint="1% TDS deducted by exchange under Section 194S. Enter 0 if none."
          />
        </div>

        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="mt-5 text-xs font-medium text-forest hover:underline"
        >
          {showTable ? "Hide breakdown" : "Show full breakdown"}
        </button>

        {showTable && tableRows.length > 0 && (
          <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-line">
            <table className="w-full text-xs">
              <thead className="bg-paper-2 sticky top-0">
                <tr className="text-ink-faint font-semibold uppercase tracking-wider">
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {tableRows.map((r) => (
                  <tr key={r.label} className="hover:bg-paper-2 transition-colors">
                    <td className="p-2 text-ink-soft">{r.label}</td>
                    <td className="p-2 text-right font-medium text-ink">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Crypto tax liability
        </p>

        <p className="mt-1 font-display text-3xl sm:text-4xl font-600 text-forest break-words">
          {hasGain ? formatCurrency(result.totalTax) : formatCurrency(0)}
        </p>
        <p className="text-sm text-ink-faint">
          {hasGain
            ? `30% flat tax + 4% cess on ₹${result.taxableGain.toLocaleString("en-IN")} gain`
            : result.profit < 0
              ? "No tax: crypto loss (cannot be set off)"
              : "No gain, no tax"}
        </p>

        {hasGain && (
          <div className="mt-5">
            <Donut
              primary={result.netProceeds}
              secondary={result.totalTax}
              primaryLabel="Net proceeds"
              secondaryLabel="Total tax"
              size={170}
            />
          </div>
        )}

        <div className="mt-5 space-y-1">
          <Stat label="Total buy value" value={formatCurrency(result.totalBuy)} accent="ink" />
          <Stat label="Total sell value" value={formatCurrency(result.totalSell)} accent="ink" />
          <Stat
            label="Profit / Loss"
            value={formatCurrency(result.profit)}
            accent={result.profit >= 0 ? "forest" : "brass"}
          />
          <Stat label="Taxable gain" value={formatCurrency(result.taxableGain)} accent="ink" />
          <Stat label="Tax (30%)" value={formatCurrency(result.tax30)} accent="brass" />
          <Stat label="Cess (4%)" value={formatCurrency(result.cess)} accent="ink" />
          <Stat label="Total tax" value={formatCurrency(result.totalTax)} accent="brass" />
          {tdsCredit > 0 && (
            <Stat label="TDS credit" value={`- ${formatCurrency(tdsCredit)}`} accent="forest" />
          )}
          <Stat label="Net tax payable" value={formatCurrency(result.netTaxPayable)} accent="forest" />
          <Stat label="Net proceeds" value={formatCurrency(result.netProceeds)} accent="forest" />
          <Stat label="Effective tax rate" value={`${result.effectiveTaxRate.toFixed(2)}%`} accent="ink" />
        </div>

        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          {txn.note}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-2 text-xs font-medium text-ink-soft hover:text-forest hover:border-forest transition-colors"
          >
            Copy results
          </button>
        </div>

        <p className="mt-4 text-xs text-ink-faint leading-relaxed">
          As per Section 115BBH of Finance Act 2022. No deduction or set-off
          of any loss is allowed against VDA income. 1% TDS applies on
          transfers above the threshold under Section 194S. Always verify
          with a qualified tax professional before filing.
        </p>
      </div>
    </div>
  );
}
