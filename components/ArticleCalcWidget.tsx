"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, BarChart3 } from "lucide-react";

// Compact, live calculator embedded in the article sidebar. The article page
// picks `type` from the post's topic (see getRelatedResources), so each blog
// shows the calculator that matches its subject. Types without a quick formula
// fall back to a CTA card that links to the full calculator.
export type CalcWidgetType = "sip" | "lumpsum" | "fd" | "emi" | "ppf" | "cta";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function sipFV(monthly: number, years: number, rate: number) {
  const n = years * 12;
  const i = rate / 100 / 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}
function lumpFV(amount: number, years: number, rate: number) {
  return amount * Math.pow(1 + rate / 100, years);
}
function fdMaturity(principal: number, years: number, rate: number) {
  const i = rate / 100 / 4;
  return principal * Math.pow(1 + i, 4 * years);
}
function emiMonthly(amount: number, years: number, rate: number) {
  const n = years * 12;
  const i = rate / 100 / 12;
  if (i === 0) return amount / n;
  return (amount * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-text-muted">{label}</span>
      <span className="flex items-center rounded-input border border-line-strong bg-bg px-3 py-2.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-colors">
        {prefix && <span className="mr-1 text-sm text-text-muted">{prefix}</span>}
        <input
          type="number"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-sm font-semibold text-text outline-none"
          aria-label={label}
        />
        {suffix && <span className="ml-1 text-sm text-text-muted">{suffix}</span>}
      </span>
    </label>
  );
}

export default function ArticleCalcWidget({
  type,
  href,
  label,
  desc,
}: {
  type: CalcWidgetType;
  href: string;
  label: string;
  desc: string;
}) {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [monthly, setMonthly] = useState(10000);
  const [oneTime, setOneTime] = useState(120000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  // FD / loan / PPF inputs
  const [principal, setPrincipal] = useState(100000);
  const [fdYears, setFdYears] = useState(5);
  const [fdRate, setFdRate] = useState(7);
  const [loan, setLoan] = useState(2500000);
  const [loanYears, setLoanYears] = useState(20);
  const [loanRate, setLoanRate] = useState(8.5);
  const [ppfYearly, setPpfYearly] = useState(150000);

  const result = useMemo(() => {
    switch (type) {
      case "sip":
        return mode === "sip"
          ? { label: "Estimated Future Value", value: sipFV(monthly, years, rate) }
          : { label: "Estimated Future Value", value: lumpFV(oneTime, years, rate) };
      case "lumpsum":
        return { label: "Estimated Future Value", value: lumpFV(oneTime, years, rate) };
      case "fd":
        return { label: "Maturity Value", value: fdMaturity(principal, fdYears, fdRate) };
      case "ppf":
        return { label: "Maturity Value (15 yrs)", value: sipFV(ppfYearly / 12, 15, 7.1) };
      case "emi":
        return { label: "Monthly EMI", value: emiMonthly(loan, loanYears, loanRate) };
      default:
        return null;
    }
  }, [type, mode, monthly, oneTime, years, rate, principal, fdYears, fdRate, loan, loanYears, loanRate, ppfYearly]);

  // Fallback CTA card for topics without a quick in-sidebar formula.
  if (type === "cta" || !result) {
    return (
      <div className="rounded-card border border-border bg-gradient-to-br from-brand/5 to-transparent p-5 shadow-card">
        <Calculator className="h-8 w-8 text-brand" />
        <p className="mt-3 text-sm font-semibold text-text">Try {label}</p>
        <p className="mt-1 text-xs text-text-muted">{desc}</p>
        <Link href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
          Open Calculator <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-bg p-5 shadow-card">
      <div className="flex items-start gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-soft text-forest">
          <BarChart3 className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-text leading-tight">{label}</p>
          <p className="mt-0.5 text-xs text-text-muted">{desc}</p>
        </div>
      </div>

      {type === "sip" && (
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-input bg-bg-alt p-1">
          {(["sip", "lumpsum"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-md py-1.5 text-xs font-semibold transition-colors ${
                mode === m ? "bg-accent text-white" : "text-text-muted hover:text-text"
              }`}
            >
              {m === "sip" ? "SIP" : "Lump Sum"}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {type === "sip" && mode === "sip" && (
          <NumberField label="Monthly Investment (₹)" value={monthly} onChange={setMonthly} prefix="₹" />
        )}
        {((type === "sip" && mode === "lumpsum") || type === "lumpsum") && (
          <NumberField label="One-Time Investment (₹)" value={oneTime} onChange={setOneTime} prefix="₹" />
        )}
        {(type === "sip" || type === "lumpsum") && (
          <>
            <NumberField label="Investment Period (Years)" value={years} onChange={setYears} suffix="yrs" />
            <NumberField label="Expected Return Rate (% p.a.)" value={rate} onChange={setRate} suffix="%" />
          </>
        )}

        {type === "fd" && (
          <>
            <NumberField label="Deposit Amount (₹)" value={principal} onChange={setPrincipal} prefix="₹" />
            <NumberField label="Tenure (Years)" value={fdYears} onChange={setFdYears} suffix="yrs" />
            <NumberField label="Interest Rate (% p.a.)" value={fdRate} onChange={setFdRate} suffix="%" />
          </>
        )}

        {type === "ppf" && (
          <NumberField label="Yearly Investment (₹)" value={ppfYearly} onChange={setPpfYearly} prefix="₹" />
        )}

        {type === "emi" && (
          <>
            <NumberField label="Loan Amount (₹)" value={loan} onChange={setLoan} prefix="₹" />
            <NumberField label="Tenure (Years)" value={loanYears} onChange={setLoanYears} suffix="yrs" />
            <NumberField label="Interest Rate (% p.a.)" value={loanRate} onChange={setLoanRate} suffix="%" />
          </>
        )}
      </div>

      <div className="mt-4 rounded-card bg-forest-soft/60 p-4">
        <p className="text-xs font-medium text-text-muted">{result.label}</p>
        <p className="mt-0.5 font-display text-2xl font-bold text-forest">
          {inr.format(Math.round(result.value))}
        </p>
      </div>

      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
      >
        Open Full Calculator <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
