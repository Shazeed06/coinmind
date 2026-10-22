"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { Field, Donut } from "./shared";
import { CheckCircle2, AlertCircle, Info, Building2, Home, Sparkles } from "lucide-react";

export default function HraCalculator() {
  // Input frequency: monthly or annual
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");

  // Monthly values as base state
  const [basicMonthly, setBasicMonthly] = useState(50000);
  const [hraReceivedMonthly, setHraReceivedMonthly] = useState(20000);
  const [rentPaidMonthly, setRentPaidMonthly] = useState(18000);
  const [city, setCity] = useState<"metro" | "nonmetro">("metro");
  const [taxSlab, setTaxSlab] = useState<number>(0.20); // 20% slab default

  // Annual equivalents
  const basicAnnual = basicMonthly * 12;
  const hraReceivedAnnual = hraReceivedMonthly * 12;
  const rentPaidAnnual = rentPaidMonthly * 12;

  // Active values based on period
  const basic = period === "monthly" ? basicMonthly : basicAnnual;
  const hraReceived = period === "monthly" ? hraReceivedMonthly : hraReceivedAnnual;
  const rentPaid = period === "monthly" ? rentPaidMonthly : rentPaidAnnual;

  const handleBasicChange = (val: number) => {
    if (period === "monthly") {
      setBasicMonthly(Math.max(0, val));
    } else {
      setBasicMonthly(Math.max(0, Math.round(val / 12)));
    }
  };

  const handleHraChange = (val: number) => {
    if (period === "monthly") {
      setHraReceivedMonthly(Math.max(0, val));
    } else {
      setHraReceivedMonthly(Math.max(0, Math.round(val / 12)));
    }
  };

  const handleRentChange = (val: number) => {
    if (period === "monthly") {
      setRentPaidMonthly(Math.max(0, val));
    } else {
      setRentPaidMonthly(Math.max(0, Math.round(val / 12)));
    }
  };

  const {
    actualHra,
    cityLimit,
    rentMinusBasic,
    exemptAnnual,
    taxableAnnual,
    exemptMonthly,
    taxableMonthly,
    binding,
    isFullyExempt,
    isRentTooLow,
    taxSavedAnnual,
    taxSavedMonthly,
  } = useMemo(() => {
    const cityPct = city === "metro" ? 0.5 : 0.4;
    const a = hraReceivedAnnual;
    const b = cityPct * basicAnnual;
    const rawC = rentPaidAnnual - 0.1 * basicAnnual;
    const c = Math.max(0, rawC);

    const e = Math.max(0, Math.min(a, b, c));
    const t = Math.max(0, hraReceivedAnnual - e);

    const rentLow = rawC <= 0;
    const fullyExempt = e > 0 && e === a;

    // Identify which statutory rule is binding
    let rule: "actual" | "city" | "rent";
    if (e === a) {
      rule = "actual";
    } else if (e === b) {
      rule = "city";
    } else {
      rule = "rent";
    }

    // Tax saved = exempt * (taxSlab + 4% cess)
    const effectiveTaxRate = taxSlab * 1.04;
    const taxSaved = Math.round(e * effectiveTaxRate);

    return {
      actualHra: a,
      cityLimit: b,
      rentMinusBasic: c,
      exemptAnnual: e,
      taxableAnnual: t,
      exemptMonthly: Math.round(e / 12),
      taxableMonthly: Math.round(t / 12),
      binding: rule,
      isFullyExempt: fullyExempt,
      isRentTooLow: rentLow,
      taxSavedAnnual: taxSaved,
      taxSavedMonthly: Math.round(taxSaved / 12),
    };
  }, [basicAnnual, hraReceivedAnnual, rentPaidAnnual, city, taxSlab]);

  const cityPctLabel = city === "metro" ? "50%" : "40%";

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
      {/* Left Input Form Panel */}
      <div className="rounded-2xl border border-line bg-card p-5 sm:p-7 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <h2 className="font-display text-xl text-ink">Salary &amp; Rent Details</h2>
            <p className="text-xs text-ink-faint mt-0.5">Enter your monthly or annual salary components</p>
          </div>

          {/* Monthly vs Annual Toggle */}
          <div className="inline-flex rounded-lg border border-line-strong bg-paper-2 p-1">
            <button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={`rounded-md px-3.5 py-1 text-xs font-semibold transition-all ${
                period === "monthly"
                  ? "bg-forest text-white shadow-sm"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setPeriod("annual")}
              className={`rounded-md px-3.5 py-1 text-xs font-semibold transition-all ${
                period === "annual"
                  ? "bg-forest text-white shadow-sm"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* City Selector */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-ink flex items-center justify-between mb-2">
            <span>Accommodation City Type</span>
            <span className="text-xs font-normal text-forest">{cityPctLabel} basic limit applies</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCity("metro")}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                city === "metro"
                  ? "border-forest bg-forest-soft/60 ring-2 ring-forest/20 text-ink"
                  : "border-line bg-card hover:border-line-strong text-ink-soft"
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-sm">
                <Building2 className={`h-4 w-4 ${city === "metro" ? "text-forest" : "text-ink-faint"}`} />
                <span>Metro City (50%)</span>
              </div>
              <span className="text-xs text-ink-faint mt-1">Delhi, Mumbai, Kolkata, Chennai</span>
            </button>

            <button
              type="button"
              onClick={() => setCity("nonmetro")}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                city === "nonmetro"
                  ? "border-forest bg-forest-soft/60 ring-2 ring-forest/20 text-ink"
                  : "border-line bg-card hover:border-line-strong text-ink-soft"
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-sm">
                <Home className={`h-4 w-4 ${city === "nonmetro" ? "text-forest" : "text-ink-faint"}`} />
                <span>Non-Metro (40%)</span>
              </div>
              <span className="text-xs text-ink-faint mt-1">Bengaluru, Hyderabad, Pune, etc.</span>
            </button>
          </div>
        </div>

        {/* Sliders and text fields */}
        <div className="mt-6 space-y-6">
          <Field
            label={`Basic Salary + DA (${period === "monthly" ? "per month" : "per year"})`}
            value={basic}
            onChange={handleBasicChange}
            min={0}
            max={period === "monthly" ? 500000 : 6000000}
            step={period === "monthly" ? 2000 : 25000}
            prefix="₹"
            hint={period === "monthly" ? `Annual: ${formatCurrency(basicAnnual, "INR")}` : `Monthly: ${formatCurrency(basicMonthly, "INR")}`}
          />

          <Field
            label={`HRA Received from Employer (${period === "monthly" ? "per month" : "per year"})`}
            value={hraReceived}
            onChange={handleHraChange}
            min={0}
            max={period === "monthly" ? 300000 : 3600000}
            step={period === "monthly" ? 1000 : 15000}
            prefix="₹"
            hint={period === "monthly" ? `Annual: ${formatCurrency(hraReceivedAnnual, "INR")}` : `Monthly: ${formatCurrency(hraReceivedMonthly, "INR")}`}
          />

          <Field
            label={`Actual Rent Paid (${period === "monthly" ? "per month" : "per year"})`}
            value={rentPaid}
            onChange={handleRentChange}
            min={0}
            max={period === "monthly" ? 300000 : 3600000}
            step={period === "monthly" ? 1000 : 15000}
            prefix="₹"
            hint={period === "monthly" ? `Annual: ${formatCurrency(rentPaidAnnual, "INR")}` : `Monthly: ${formatCurrency(rentPaidMonthly, "INR")}`}
          />
        </div>

        {/* Tax Slab for Savings Calculation */}
        <div className="mt-6 pt-5 border-t border-line">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
              Your Income Tax Slab (Old Regime)
            </label>
            <span className="text-xs font-medium text-forest">
              {Math.round(taxSlab * 100)}% (+4% cess)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { rate: 0.05, label: "5% (Up to ₹5L)" },
              { rate: 0.10, label: "10%" },
              { rate: 0.20, label: "20% (₹5L - ₹10L)" },
              { rate: 0.30, label: "30% (Above ₹10L)" },
            ].map((slab) => (
              <button
                key={slab.rate}
                type="button"
                onClick={() => setTaxSlab(slab.rate)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                  taxSlab === slab.rate
                    ? "bg-forest-soft border-forest text-forest font-semibold"
                    : "bg-paper-2 border-line text-ink-soft hover:border-line-strong hover:text-ink"
                }`}
              >
                {slab.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Used to compute your actual take-home tax savings from the HRA exemption.
          </p>
        </div>

        {/* Small Regime Advisory */}
        <div className="mt-6 rounded-xl bg-paper-2 p-3.5 border border-line flex items-start gap-2.5 text-xs text-ink-soft">
          <Info className="h-4 w-4 text-forest shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            HRA exemption under Section 10(13A) is valid under the <strong className="text-ink">Old Tax Regime</strong> only. Under the New Tax Regime, all HRA received is fully taxable.
          </p>
        </div>
      </div>

      {/* Right Result Card Panel */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7 shadow-sm">
          {/* Main Exempt Display */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-soft px-3 py-1 text-xs font-semibold text-forest">
              <Sparkles className="h-3 w-3" />
              Tax-Free Exemption
            </span>
            <span className="text-xs font-medium text-ink-faint">
              Section 10(13A)
            </span>
          </div>

          <div className="mt-3">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
              Total Exempt HRA
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-forest">
                {formatCurrency(exemptAnnual, "INR")}
              </span>
              <span className="text-sm font-medium text-ink-soft">/ year</span>
            </div>
            <p className="text-sm text-ink-faint mt-0.5">
              Equivalent to <strong className="text-ink font-semibold">{formatCurrency(exemptMonthly, "INR")}</strong> per month
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-card p-3.5">
              <p className="text-xs font-medium text-ink-faint uppercase tracking-wider">Taxable HRA</p>
              <p className="mt-1 text-lg font-bold text-brass">
                {formatCurrency(taxableAnnual, "INR")}
              </p>
              <p className="text-xs text-ink-faint mt-0.5">
                {formatCurrency(taxableMonthly, "INR")}/mo added to income
              </p>
            </div>

            <div className="rounded-xl border border-line bg-card p-3.5">
              <p className="text-xs font-medium text-ink-faint uppercase tracking-wider">Est. Tax Saved</p>
              <p className="mt-1 text-lg font-bold text-forest">
                {formatCurrency(taxSavedAnnual, "INR")}
              </p>
              <p className="text-xs text-ink-faint mt-0.5">
                {formatCurrency(taxSavedMonthly, "INR")}/mo saved at {Math.round(taxSlab * 100)}% slab
              </p>
            </div>
          </div>

          {/* Visual Donut Chart */}
          <div className="mt-6 pt-5 border-t border-line">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-soft mb-3">
              <span>HRA Split Breakdown</span>
              <span className="text-forest">
                {hraReceivedAnnual > 0 ? `${Math.round((exemptAnnual / hraReceivedAnnual) * 100)}% Tax-Free` : "0%"}
              </span>
            </div>
            <Donut
              primary={exemptAnnual}
              secondary={taxableAnnual}
              primaryLabel="Tax-Free HRA"
              secondaryLabel="Taxable HRA"
              size={180}
            />
          </div>

          {/* The 3 Statutory Limits Comparison Table */}
          <div className="mt-6 pt-5 border-t border-line">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                The 3 Calculation Limits (Rule 2A)
              </p>
              <span className="text-[11px] text-ink-faint">Lowest is exempt</span>
            </div>

            <div className="space-y-2 mt-3">
              {/* Limit 1: Actual HRA */}
              <div
                className={`p-3 rounded-xl border transition-colors ${
                  binding === "actual" && !isRentTooLow
                    ? "border-forest bg-forest-soft/70 shadow-xs"
                    : "border-line bg-card"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink-soft">1. Actual HRA Received</span>
                  {binding === "actual" && !isRentTooLow && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest">
                      <CheckCircle2 className="h-3 w-3" /> Lowest (Exempt)
                    </span>
                  )}
                </div>
                <p className="text-base font-semibold text-ink mt-0.5">
                  {formatCurrency(actualHra, "INR")}
                </p>
              </div>

              {/* Limit 2: City Limit */}
              <div
                className={`p-3 rounded-xl border transition-colors ${
                  binding === "city" && !isRentTooLow
                    ? "border-forest bg-forest-soft/70 shadow-xs"
                    : "border-line bg-card"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink-soft">
                    2. {cityPctLabel} of Basic Salary ({city === "metro" ? "Metro" : "Non-Metro"})
                  </span>
                  {binding === "city" && !isRentTooLow && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest">
                      <CheckCircle2 className="h-3 w-3" /> Lowest (Exempt)
                    </span>
                  )}
                </div>
                <p className="text-base font-semibold text-ink mt-0.5">
                  {formatCurrency(cityLimit, "INR")}
                </p>
              </div>

              {/* Limit 3: Rent - 10% of Basic */}
              <div
                className={`p-3 rounded-xl border transition-colors ${
                  binding === "rent" || isRentTooLow
                    ? "border-forest bg-forest-soft/70 shadow-xs"
                    : "border-line bg-card"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink-soft">3. Rent Paid − 10% of Basic</span>
                  {(binding === "rent" || isRentTooLow) && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest">
                      <CheckCircle2 className="h-3 w-3" /> Lowest (Exempt)
                    </span>
                  )}
                </div>
                <p className="text-base font-semibold text-ink mt-0.5">
                  {formatCurrency(rentMinusBasic, "INR")}
                </p>
                <span className="text-[11px] text-ink-faint">
                  ({formatCurrency(rentPaidAnnual, "INR")} − {formatCurrency(0.1 * basicAnnual, "INR")})
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Explanation Note */}
          <div className="mt-5 rounded-xl border border-line bg-card p-4 text-xs text-ink-soft leading-relaxed">
            {isRentTooLow ? (
              <div className="flex items-start gap-2 text-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>No exemption available:</strong> Your annual rent ({formatCurrency(rentPaidAnnual, "INR")}) is less than or equal to 10% of your basic salary ({formatCurrency(0.1 * basicAnnual, "INR")}). Under Rule 2A, rent must exceed 10% of basic salary to claim any HRA tax exemption.
                </span>
              </div>
            ) : isFullyExempt ? (
              <div className="flex items-start gap-2 text-forest">
                <CheckCircle2 className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong>100% Tax-Free:</strong> Your entire HRA is exempt from income tax because the actual HRA received ({formatCurrency(actualHra, "INR")}) is the lowest of all three statutory rules.
                </span>
              </div>
            ) : (
              <div>
                <strong>Capping Rule:</strong> Your exemption is capped at{" "}
                <span className="text-forest font-semibold">{formatCurrency(exemptAnnual, "INR")}</span> by{" "}
                {binding === "rent"
                  ? "Rent Paid minus 10% of Basic Salary"
                  : binding === "city"
                    ? `${cityPctLabel} of your basic salary (${city === "metro" ? "Metro" : "Non-Metro"} limit)`
                    : "the actual HRA received from your employer"}
                . The remaining <span className="text-brass font-semibold">{formatCurrency(taxableAnnual, "INR")}</span> is added to your taxable income under the Old Regime.
              </div>
            )}
          </div>
        </div>

        {/* Landlord PAN Advisory Banner if Rent > 1 Lakh */}
        {rentPaidAnnual > 100000 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-semibold text-amber-950">Landlord PAN Required:</strong> Since your total annual rent of{" "}
              {formatCurrency(rentPaidAnnual, "INR")} ({formatCurrency(rentPaidMonthly, "INR")}/month) exceeds{" "}
              <strong>₹1,00,000 per year</strong>, CBDT regulations make it mandatory to submit your landlord&apos;s PAN to your employer (via Form 12BB) to claim HRA tax exemption.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
