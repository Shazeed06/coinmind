"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, Donut, CurrencyToggle, Stat } from "./shared";

export default function DiscountCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(25);

  const { finalPrice, saved, pct } = useMemo(() => {
    const safePrice = Number.isFinite(price) && price > 0 ? price : 0;
    const safePct =
      Number.isFinite(discount) && discount > 0 ? Math.min(discount, 100) : 0;
    const savedAmount = (safePrice * safePct) / 100;
    return {
      finalPrice: safePrice - savedAmount,
      saved: savedAmount,
      pct: safePct,
    };
  }, [price, discount]);

  const sym = currencyMeta[currency].symbol;
  const valid = Number.isFinite(price) && price > 0;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Sale details</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Original price"
            value={price}
            onChange={setPrice}
            min={0}
            max={10000}
            step={5}
            prefix={sym}
          />
          <Field
            label="Discount"
            value={discount}
            onChange={setDiscount}
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Final price
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {valid ? formatCurrency(finalPrice, currency) : "—"}
        </p>
        <p className="mt-1 text-sm text-ink-faint">after {pct}% off</p>

        {valid && (
          <div className="mt-6">
            <Donut
              primary={finalPrice}
              secondary={saved}
              primaryLabel="You pay"
              secondaryLabel="You save"
              size={190}
            />
          </div>
        )}

        <div className="mt-6">
          <Stat
            label="You save"
            value={valid ? formatCurrency(saved, currency) : "—"}
            accent="brass"
          />
          <Stat
            label="Final price"
            value={valid ? formatCurrency(finalPrice, currency) : "—"}
            accent="forest"
          />
          <Stat label="Discount applied" value={`${pct}%`} accent="ink" />
        </div>

        {valid ? (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            A <strong className="text-ink">{pct}% discount</strong> on{" "}
            {formatCurrency(price, currency)} saves you{" "}
            <strong className="text-ink">
              {formatCurrency(saved, currency)}
            </strong>
            , bringing the price down to {formatCurrency(finalPrice, currency)}.
          </p>
        ) : (
          <p className="mt-6 text-sm text-ink-soft leading-relaxed">
            Enter an original price greater than zero to see your sale price and
            how much you save.
          </p>
        )}
      </div>
    </div>
  );
}
