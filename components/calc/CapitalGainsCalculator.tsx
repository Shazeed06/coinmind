"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { Field, Stat, Donut } from "./shared";

type Asset = {
  id: string;
  label: string;
  note: string;
};

// FY 2026-27 rules (India). Rates and thresholds change — verify before filing.
const ASSETS: Asset[] = [
  {
    id: "equity",
    label: "Listed equity / equity MF",
    note: "Held over 12 months → LTCG at 12.5% on gains above the ₹1,25,000 yearly exemption. Held 12 months or less → STCG at 20%.",
  },
  {
    id: "debt",
    label: "Debt mutual fund",
    note: "Debt fund gains are added to your income and taxed at your slab rate, with no LTCG benefit, regardless of how long you hold.",
  },
  {
    id: "property",
    label: "Property",
    note: "Held over 24 months → LTCG at 12.5% without indexation (post-2024 rule). Held 24 months or less → STCG added to income at your slab.",
  },
  {
    id: "gold",
    label: "Gold",
    note: "Held over 24 months → LTCG at 12.5% without indexation. Held 24 months or less → STCG added to income at your slab.",
  },
];

const EQUITY_EXEMPTION = 125000;

export default function CapitalGainsCalculator() {
  const [assetId, setAssetId] = useState("equity");
  const [buy, setBuy] = useState(100000);
  const [sell, setSell] = useState(300000);
  const [months, setMonths] = useState(18);

  const asset = ASSETS.find((a) => a.id === assetId) ?? ASSETS[0];

  const result = useMemo(() => {
    const gain = sell - buy;
    const positive = Math.max(0, gain);

    // Debt MF — always taxed at slab, no long/short split.
    if (assetId === "debt") {
      return {
        gain,
        classification: "Taxed at your slab",
        slabBased: true,
        exemption: 0,
        taxable: positive,
        tax: NaN,
        net: NaN,
        rateLabel: "your slab",
      };
    }

    const threshold = assetId === "equity" ? 12 : 24;
    const isLong = months > threshold;

    if (assetId === "equity") {
      if (isLong) {
        const exemption = Math.min(positive, EQUITY_EXEMPTION);
        const taxable = Math.max(0, positive - EQUITY_EXEMPTION);
        const tax = taxable * 0.125;
        return {
          gain,
          classification: "Long-term (LTCG)",
          slabBased: false,
          exemption,
          taxable,
          tax,
          net: sell - tax,
          rateLabel: "12.5%",
        };
      }
      const tax = positive * 0.2;
      return {
        gain,
        classification: "Short-term (STCG)",
        slabBased: false,
        exemption: 0,
        taxable: positive,
        tax,
        net: sell - tax,
        rateLabel: "20%",
      };
    }

    // Property or gold.
    if (isLong) {
      const tax = positive * 0.125;
      return {
        gain,
        classification: "Long-term (LTCG)",
        slabBased: false,
        exemption: 0,
        taxable: positive,
        tax,
        net: sell - tax,
        rateLabel: "12.5%",
      };
    }
    return {
      gain,
      classification: "Short-term (STCG)",
      slabBased: true,
      exemption: 0,
      taxable: positive,
      tax: NaN,
      net: NaN,
      rateLabel: "your slab",
    };
  }, [assetId, buy, sell, months]);

  const hasGain = result.gain > 0;
  const showDonut = hasGain && !result.slabBased;
  const gainKept = showDonut ? result.gain - result.tax : 0;

  return (
    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">
          Sale details
        </h2>
        <p className="mt-1 text-sm text-ink-faint">FY 2026&ndash;27 · India</p>
        <div className="mt-6 space-y-7">
          <div>
            <label
              htmlFor="cg-asset"
              className="text-sm font-medium text-ink-soft"
            >
              Asset type
            </label>
            <select
              id="cg-asset"
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-medium text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/25 transition-colors"
            >
              {ASSETS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Buy price"
            value={buy}
            onChange={setBuy}
            min={0}
            max={50000000}
            step={10000}
            prefix="₹"
          />
          <Field
            label="Sell price"
            value={sell}
            onChange={setSell}
            min={0}
            max={50000000}
            step={10000}
            prefix="₹"
          />
          <Field
            label="Holding period"
            value={months}
            onChange={setMonths}
            min={1}
            max={240}
            step={1}
            suffix="mo"
            hint="Number of months you held the asset before selling."
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Tax on capital gains
        </p>

        {result.slabBased ? (
          <>
            <p className="mt-1 font-display text-3xl font-600 text-forest break-words">
              At your slab
            </p>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              This gain is added to your income and taxed at your slab rate.
              Estimate it with the{" "}
              <Link
                href="/calculators/income-tax"
                className="text-forest underline underline-offset-2"
              >
                income tax calculator
              </Link>
              .
            </p>
          </>
        ) : (
          <>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {hasGain ? formatCurrency(result.tax) : formatCurrency(0)}
            </p>
            <p className="mt-1 text-sm text-ink-faint">
              {result.classification} at {result.rateLabel}
            </p>

            {showDonut && (
              <div className="mt-6">
                <Donut
                  primary={gainKept}
                  secondary={result.tax}
                  primaryLabel="Gain kept"
                  secondaryLabel="Tax"
                  size={190}
                />
              </div>
            )}
          </>
        )}

        <div className="mt-6">
          <Stat
            label="Capital gain"
            value={hasGain ? formatCurrency(result.gain) : formatCurrency(Math.max(0, result.gain))}
            accent="ink"
          />
          <Stat label="Classification" value={result.classification} accent="brass" />
          <Stat
            label="Exemption applied"
            value={result.exemption > 0 ? formatCurrency(result.exemption) : "—"}
            accent="brass"
          />
          <Stat
            label="Taxable gain"
            value={formatCurrency(result.taxable)}
            accent="ink"
          />
          <Stat
            label="Tax payable"
            value={result.slabBased ? "At your slab" : formatCurrency(hasGain ? result.tax : 0)}
            accent="forest"
          />
          <Stat
            label="Net proceeds"
            value={result.slabBased ? "—" : formatCurrency(Number.isFinite(result.net) ? result.net : sell)}
            accent="forest"
          />
        </div>

        <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
          {asset.note}
        </div>

        <p className="mt-3 text-xs text-ink-faint leading-relaxed">
          Estimates based on FY 2026&ndash;27 rules and simplified for guidance
          only &mdash; they ignore surcharge, cess, brokerage and carried-forward
          losses. Rules and rates change often, so verify with the Income Tax
          Department and a SEBI-registered adviser before acting.
        </p>
      </div>
    </div>
  );
}
