import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import WhatIfSimulator from "@/components/calc/WhatIfSimulator";

export const metadata = calcMeta(
  "what-if-simulator",
  "What-If Financial Simulator – See How Small Changes Compound",
  "Interactive financial scenario planner: see how saving ₹5,000 more per month, cutting expenses, or improving returns affects your FIRE timeline and retirement corpus."
);

export default function Page() {
  return (
    <CalcPage
      slug="what-if-simulator"
      title="What-If Financial Simulator"
      subtitle="See how small financial changes — saving more, spending less, or better returns — compound into massive differences over time."
      calculator={<WhatIfSimulator />}
      sources={[
        { label: "SEBI – Investor Education", href: "https://investor.sebi.gov.in" },
        { label: "RBI – Household Finance Survey", href: "https://www.rbi.org.in" },
        { label: "AMFI – SIP & Returns Data", href: "https://www.amfiindia.com" },
      ]}
      intro="The most powerful financial insight most people never grasp: small changes in savings, spending, or investment return compound dramatically over a 15–20 year horizon. Saving ₹5,000 more per month for 20 years at 12% doesn't just add ₹12 lakh — it adds over ₹50 lakh to your corpus. This What-If Simulator lets you see, in real time, how changing any one variable affects your retirement corpus, FIRE timeline, and monthly passive income. Pull the sliders and watch the numbers transform."
      how={{
        heading: "How the What-If Simulator works",
        body: (
          <>
            <p>The simulator calculates two scenarios simultaneously:</p>
            <p><strong>Base scenario:</strong> Uses your current income, expenses, portfolio and return assumption to project your corpus and FIRE timeline.</p>
            <p><strong>What-if scenario:</strong> Applies your adjustments — extra monthly savings, expense cuts, or return improvement — on top of the base to show the compounded impact.</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              FIRE Number = Annual expenses / Safe Withdrawal Rate (4%)
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Corpus = FV(monthly savings, return, years) + FV(current portfolio, return, years)
            </p>
            <p>The 4% safe withdrawal rate (SWR) is based on the Trinity Study: a portfolio with 4% annual withdrawal has historically lasted 30+ years even through major market downturns.</p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is the 4% safe withdrawal rate?",
          a: "The 4% rule says: if you withdraw 4% of your portfolio in year 1 of retirement, then adjust for inflation each year, your portfolio has historically survived 30+ years through bear markets and recessions. It comes from the Trinity Study (1998, Bengen 1994). For India, some advisors use 3–3.5% due to higher inflation and different market dynamics.",
        },
        {
          q: "Why does cutting expenses have a double benefit?",
          a: "Reducing monthly expenses does two things: (1) it frees up more money to invest each month, and (2) it lowers your FIRE number (since you need less corpus to sustain a lower annual withdrawal). A ₹5,000/month expense cut adds ₹5,000 to investments AND reduces the corpus you need by ₹15 lakh (at 4% SWR). This double effect is why frugality is so powerful for FIRE.",
        },
        {
          q: "What does 'improve return by X%' mean in practice?",
          a: "Moving from FDs (6–7%) to a diversified equity index fund (12%) is a 5–6% improvement. Moving from active large-cap funds (10–11%) to a Nifty 50 index fund (12%) is a 1–2% improvement. Over 20 years, 1% extra return can add 15–20% more to your final corpus.",
        },
        {
          q: "How accurate is the FIRE timeline estimate?",
          a: "It assumes a constant return rate, which is a simplification. Real markets are volatile — returns vary year to year. The timeline gives a directional estimate. The key insight is the relative comparison: the what-if scenario reliably shows which changes have the biggest impact, even if the exact year of FIRE depends on market performance.",
        },
        {
          q: "Should I use my gross or net (take-home) income?",
          a: "Use your net take-home salary — the amount that actually hits your bank account after EPF, TDS and other deductions. Similarly, use your actual monthly spend (including all EMIs) as expenses. The goal is to model your real cash flow, not a theoretical gross-minus-taxes number.",
        },
      ]}
    />
  );
}
