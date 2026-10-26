import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import GoalCalculator from "@/components/calc/GoalCalculator";

export const metadata = calcMeta(
  "goal-emergency-fund",
  "Emergency Fund Calculator - How Much to Save & Where to Keep It",
  "Calculate your ideal emergency fund size (3-6 months expenses) and the monthly savings needed to build it in India."
);

export default function Page() {
  return (
    <CalcPage
      slug="goal-emergency-fund"
      title="Emergency Fund Calculator"
      subtitle="Find your ideal emergency fund size and the monthly savings to build it quickly - typically in 6-12 months."
      calculator={
        <GoalCalculator
          initialGoal={300000}
          initialYears={1}
          initialReturn={6}
          initialInflation={0}
          initialInflationAdjust={false}
        />
      }
      sources={[
        { label: "RBI - Household Finance Survey", href: "https://www.rbi.org.in" },
        { label: "SEBI - Investor Awareness", href: "https://investor.sebi.gov.in" },
      ]}
      intro="An emergency fund is the foundation of any sound financial plan - it is the money that keeps a job loss, medical emergency, or major repair from becoming a financial catastrophe. Without one, you are forced to take a personal loan at 15-24% interest or liquidate investments (often at a loss) when emergencies happen. The rule of thumb: keep 3-6 months of total expenses (including EMIs) in a safe, liquid account. This calculator helps you build that buffer as quickly as possible."
      how={{
        heading: "How to calculate your emergency fund target",
        body: (
          <>
            <p>Your emergency fund target = Monthly expenses (including all EMIs) × 3 to 6 months:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Target = Monthly expenses × months of cover (3-6)
            </p>
            <p>Since this is a short-term goal (build in 6-12 months), we use 6% return - liquid funds or high-yield savings accounts. Inflation adjustment is off because the amount is fixed, not a future purchase.</p>
            <p className="mt-2 font-medium text-ink">Where to keep it:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Savings account: instant access, ~3-4%</li>
              <li>Liquid mutual fund: T+1 redemption, ~6-7%</li>
              <li>Short-term FD: slightly less liquid, 6.5-7.5%</li>
            </ul>
          </>
        ),
      }}
      faqs={[
        {
          q: "How many months of expenses should my emergency fund cover?",
          a: "3 months if you have a stable government/large-company job, a working spouse, and no dependents. 6 months if you are self-employed, freelance, in a small startup, have dependents, or have existing health conditions. Go up to 9-12 months if your income is highly variable (commission-based sales, seasonal work).",
        },
        {
          q: "Should my emergency fund include EMIs?",
          a: "Yes - in an emergency (like a job loss), you still have to pay your EMIs. Include all fixed monthly obligations: rent/home loan EMI, car loan, personal loan, insurance premiums. Missing these has consequences (NPA, credit score hit, insurance lapse) that compound the original emergency.",
        },
        {
          q: "Can I invest my emergency fund in equity for better returns?",
          a: "No. Equity can fall 30-50% in a market crash - exactly when you are most likely to need your emergency fund. The point of an emergency fund is certainty, not returns. Keep it in liquid funds, FDs, or a high-yield savings account. Safety and instant access matter more than 3-4% extra return.",
        },
        {
          q: "Should I build an emergency fund before investing?",
          a: "Yes - this should be step 1, before SIPs. Exception: if your employer provides adequate term insurance and health insurance, and you have very stable income, you can build the emergency fund and start a small SIP simultaneously. But most people should pause non-compulsory investments until the emergency fund is fully built.",
        },
        {
          q: "Where exactly should I keep my emergency fund in India?",
          a: "Best option: split between a sweep-in FD linked to your savings account (instant liquidation, ~7% return) + a liquid mutual fund (T+1 redemption). Avoid keeping the entire amount in a 0-notice savings account earning 3% - the return is too low for money sitting idle for years.",
        },
      ]}
      extra={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl text-ink">Emergency fund size and how fast to build it</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Your target is simply your total monthly outgo (expenses plus every EMI) multiplied by the months of cover you want. The last column shows the monthly saving needed to reach a 6-month fund within a year, parked in a liquid fund or sweep-in FD at about 6%.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-paper-2 text-left text-ink">
                  <th className="px-3 py-2.5 font-semibold">Monthly expenses</th>
                  <th className="px-3 py-2.5 font-semibold">3-month fund</th>
                  <th className="px-3 py-2.5 font-semibold">6-month fund</th>
                  <th className="px-3 py-2.5 font-semibold">Save/month (6-mo in 1 year)</th>
                </tr>
              </thead>
              <tbody className="text-ink-soft">
                <tr className="border-b border-line"><td className="px-3 py-2.5 font-medium text-ink">₹30,000</td><td className="px-3 py-2.5">₹90,000</td><td className="px-3 py-2.5">₹1,80,000</td><td className="px-3 py-2.5">₹14,519</td></tr>
                <tr className="border-b border-line"><td className="px-3 py-2.5 font-medium text-ink">₹50,000</td><td className="px-3 py-2.5">₹1,50,000</td><td className="px-3 py-2.5">₹3,00,000</td><td className="px-3 py-2.5">₹24,199</td></tr>
                <tr className="border-b border-line"><td className="px-3 py-2.5 font-medium text-ink">₹80,000</td><td className="px-3 py-2.5">₹2,40,000</td><td className="px-3 py-2.5">₹4,80,000</td><td className="px-3 py-2.5">₹38,718</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-ink-faint">
            Aim for 3 months of cover if your income is stable (government or large-company job, working spouse) and 6 months or more if you are self-employed, freelance or the sole earner. If a year feels too aggressive, halve the monthly saving and take two years — the point is that the money exists before you need it, not the exact speed. Keep it in a liquid fund or sweep-in FD, never equity.
          </p>
        </div>
      }
    />
  );
}
