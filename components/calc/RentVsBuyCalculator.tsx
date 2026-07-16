"use client";

import { useMemo, useState } from "react";
import { Currency, currencyMeta, formatCurrency } from "@/lib/format";
import { Field, CurrencyToggle, Stat } from "./shared";

// Safe power that never returns NaN/Infinity for our bounded inputs.
function safePow(base: number, exp: number) {
  const v = Math.pow(base, exp);
  return Number.isFinite(v) ? v : 0;
}

export default function RentVsBuyCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [price, setPrice] = useState(8000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [rent, setRent] = useState(25000);
  const [rentGrowth, setRentGrowth] = useState(7);
  const [appreciation, setAppreciation] = useState(6);
  const [investReturn, setInvestReturn] = useState(8);
  const [stayYears, setStayYears] = useState(10);

  const result = useMemo(() => {
    const years = Math.max(1, Math.round(stayYears));
    const dp = Math.min(1, Math.max(0, downPct / 100));
    const down = price * dp;
    const loan = Math.max(0, price - down);

    // --- BUY path ---
    const rMonthly = rate / 100 / 12;
    const n = Math.max(1, Math.round(tenure * 12)); // total loan months
    const stayMonths = Math.round(years * 12);
    const paidMonths = Math.min(stayMonths, n); // you stop paying once loan ends

    // Standard EMI (reducing balance); handle zero-rate cleanly.
    const emi =
      rMonthly === 0
        ? loan / n
        : (loan * rMonthly * safePow(1 + rMonthly, n)) /
          (safePow(1 + rMonthly, n) - 1);

    // Outstanding balance after `paidMonths` instalments.
    let outstanding: number;
    if (rMonthly === 0) {
      outstanding = Math.max(0, loan - emi * paidMonths);
    } else {
      const grow = safePow(1 + rMonthly, paidMonths);
      outstanding = Math.max(0, loan * grow - emi * ((grow - 1) / rMonthly));
    }
    if (paidMonths >= n) outstanding = 0; // loan fully cleared within stay

    const emisPaid = emi * paidMonths;

    // Simple maintenance estimate: ~1% of home price per year (owner's cost).
    const maintenance = price * 0.01 * years;

    const homeValueEnd = price * safePow(1 + appreciation / 100, years);
    const buyNetWorth = homeValueEnd - outstanding;
    const buyOutflow = down + emisPaid + maintenance;

    // --- RENT path ---
    // Total rent paid, growing annually. Rent is level within each year.
    const g = rentGrowth / 100;
    let totalRent = 0;
    let yearlyRent = rent * 12;
    for (let y = 0; y < years; y++) {
      totalRent += yearlyRent;
      yearlyRent *= 1 + g;
    }

    // The renter invests: (a) the down payment saved upfront, plus
    // (b) each month the surplus when EMI + maintenance exceeds that year's rent.
    const rInvest = investReturn / 100 / 12;
    const maintPerMonth = price * 0.01 * (1 / 12); // owner's monthly upkeep

    // (a) Down payment invested for the whole stay.
    let corpus = down * safePow(1 + rInvest, stayMonths);

    // (b) Monthly surplus invested; rent steps up each year.
    let monthlyRent = rent;
    for (let y = 0; y < years; y++) {
      const ownerMonthlyCost = emi + maintPerMonth;
      const surplus = Math.max(0, ownerMonthlyCost - monthlyRent);
      if (surplus > 0) {
        for (let mo = 0; mo < 12; mo++) {
          const monthsLeft = stayMonths - (y * 12 + mo) - 1;
          corpus += surplus * safePow(1 + rInvest, Math.max(0, monthsLeft));
        }
      }
      monthlyRent *= 1 + g;
    }

    const rentNetWorth = corpus;

    // --- Verdict: compare end net worth ---
    const diff = buyNetWorth - rentNetWorth;
    const buyWins = diff >= 0;

    return {
      emi,
      buyNetWorth,
      buyOutflow,
      homeValueEnd,
      outstanding,
      totalRent,
      rentNetWorth,
      diff: Math.abs(diff),
      buyWins,
      years,
    };
  }, [
    price,
    downPct,
    rate,
    tenure,
    rent,
    rentGrowth,
    appreciation,
    investReturn,
    stayYears,
  ]);

  const sym = currencyMeta[currency].symbol;

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl font-600 text-ink">Your numbers</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>
        <div className="mt-6 space-y-7">
          <Field
            label="Home price"
            value={price}
            onChange={setPrice}
            min={0}
            max={200000000}
            step={100000}
            prefix={sym}
          />
          <Field
            label="Down payment"
            value={downPct}
            onChange={setDownPct}
            min={5}
            max={50}
            step={5}
            suffix="%"
          />
          <Field
            label="Home loan rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={5}
            max={15}
            step={0.1}
            suffix="%"
          />
          <Field
            label="Loan tenure"
            value={tenure}
            onChange={setTenure}
            min={5}
            max={30}
            step={1}
            suffix="yr"
          />
          <Field
            label="Current monthly rent"
            value={rent}
            onChange={setRent}
            min={0}
            max={2000000}
            step={1000}
            prefix={sym}
          />
          <Field
            label="Annual rent increase"
            value={rentGrowth}
            onChange={setRentGrowth}
            min={0}
            max={15}
            step={1}
            suffix="%"
          />
          <Field
            label="Home appreciation (p.a.)"
            value={appreciation}
            onChange={setAppreciation}
            min={0}
            max={15}
            step={1}
            suffix="%"
          />
          <Field
            label="Return on savings (p.a.)"
            value={investReturn}
            onChange={setInvestReturn}
            min={0}
            max={15}
            step={1}
            suffix="%"
          />
          <Field
            label="Years you'll stay"
            value={stayYears}
            onChange={setStayYears}
            min={1}
            max={30}
            step={1}
            suffix="yr"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          {result.buyWins ? "Buying looks better by" : "Renting looks better by"}
        </p>
        <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
          {formatCurrency(result.diff, currency)}
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          in net worth after {result.years} year{result.years === 1 ? "" : "s"}
        </p>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            If you buy
          </p>
          <Stat
            label="Net worth (home − loan left)"
            value={formatCurrency(result.buyNetWorth, currency)}
            accent="forest"
          />
          <Stat
            label="Total cash paid out"
            value={formatCurrency(result.buyOutflow, currency)}
            accent="ink"
          />
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            If you rent &amp; invest
          </p>
          <Stat
            label="Total rent paid"
            value={formatCurrency(result.totalRent, currency)}
            accent="brass"
          />
          <Stat
            label="Investment corpus"
            value={formatCurrency(result.rentNetWorth, currency)}
            accent="forest"
          />
        </div>

        <p className="mt-6 text-xs text-ink-faint leading-relaxed">
          Estimate only, not advice. The result swings heavily on your
          assumptions &mdash; home appreciation, investment return and how long
          you stay. Buying assumes roughly 1% of the price a year in maintenance;
          renting assumes you invest the down payment and any monthly saving.
        </p>
      </div>
    </div>
  );
}
