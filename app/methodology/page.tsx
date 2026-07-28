import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Methodology — How Our Calculators Work · ${site.name}` },
  description: "Which formulas CoinMind calculators use, the official sources they reference, what is excluded, and when each was last verified.",
  alternates: { canonical: "/methodology" },
};

const METHODS = [
  {
    name: "SIP Calculator",
    formula: "Future value of annuity: FV = P × [((1+r)^n − 1) / r] × (1+r)",
    source: "Standard financial mathematics; cross-checked against AMFI SIP data",
    excludes: "Exit loads, fund-specific expense ratios, market timing risk",
    lastChecked: "July 2026",
  },
  {
    name: "EMI Calculator",
    formula: "Reducing-balance EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1)",
    source: "Standard amortisation formula used by all Indian banks per RBI guidelines",
    excludes: "Processing fees, prepayment penalties, floating rate changes",
    lastChecked: "July 2026",
  },
  {
    name: "Income Tax Calculator",
    formula: "Marginal slab rates per Income Tax Act, Section 87A rebate, standard deduction",
    source: "Income Tax Department, Government of India — incometaxindia.gov.in",
    excludes: "Surcharge above ₹50L, marginal relief, professional tax, specific deductions beyond standard",
    lastChecked: "July 2026 (FY 2026-27 slabs)",
  },
  {
    name: "FD Calculator",
    formula: "Compound interest: A = P × (1 + r/n)^(n×t) with quarterly compounding",
    source: "RBI guidelines on fixed deposit interest calculation",
    excludes: "TDS on interest above ₹40,000 (₹50,000 for seniors), premature withdrawal penalties",
    lastChecked: "July 2026",
  },
  {
    name: "PPF Calculator",
    formula: "Annual compounding on minimum balance between 5th and last day of month",
    source: "Public Provident Fund Scheme rules, Ministry of Finance / National Savings Institute",
    excludes: "Loan and partial withdrawal rules, interest rate changes (currently 7.1%)",
    lastChecked: "July 2026",
  },
  {
    name: "NPS Calculator",
    formula: "Future value of growing annuity with equity/debt split projections",
    source: "PFRDA guidelines, NPS Trust",
    excludes: "Annuity rates at maturity (varies by provider), tier-2 account features",
    lastChecked: "July 2026",
  },
  {
    name: "GST Calculator",
    formula: "Add: base × (1 + rate/100). Extract: inclusive / (1 + rate/100)",
    source: "Central Board of Indirect Taxes and Customs (CBIC)",
    excludes: "Input tax credit, reverse charge, composition scheme",
    lastChecked: "July 2026",
  },
  {
    name: "EPF Calculator",
    formula: "Annual compounding on monthly contributions at declared EPF interest rate",
    source: "EPFO — epfindia.gov.in",
    excludes: "EPS (pension) component, insurance benefits, withdrawal rules",
    lastChecked: "July 2026",
  },
];

export default function MethodologyPage() {
  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <h1 className="h1 text-text">Calculator Methodology</h1>
        <p className="body text-text-muted mt-4">
          Every calculator on {site.name} runs on a published, standard formula. This page documents which formula each tool uses, the official source we verify against, what the calculator deliberately excludes, and when it was last checked.
        </p>
        <p className="body text-text-muted mt-4">
          All calculations run in your browser using JavaScript. We do not guess, approximate, or use black-box algorithms. Where a calculator shows a worked example, the numbers come from the same formula the tool uses.
        </p>

        <div className="mt-12 space-y-8">
          {METHODS.map((m) => (
            <div key={m.name} className="card p-6">
              <h2 className="text-lg font-semibold text-text">{m.name}</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="eyebrow text-text-muted">Formula</p>
                  <p className="text-text mt-1 font-mono text-xs">{m.formula}</p>
                </div>
                <div>
                  <p className="eyebrow text-text-muted">Official source</p>
                  <p className="text-text mt-1">{m.source}</p>
                </div>
                <div>
                  <p className="eyebrow text-text-muted">Excludes</p>
                  <p className="text-text mt-1">{m.excludes}</p>
                </div>
                <div>
                  <p className="eyebrow text-text-muted">Last verified</p>
                  <p className="text-text mt-1">{m.lastChecked}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-card bg-bg-alt border border-border">
          <h2 className="text-lg font-semibold text-text">Educational use only</h2>
          <p className="body text-text-muted mt-2">
            These calculators are educational tools to help you understand financial concepts. They are not a substitute for professional financial, tax or investment advice. For decisions that materially affect your money, confirm current figures with a qualified professional.
          </p>
        </div>
      </div>
    </div>
  );
}
