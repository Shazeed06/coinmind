import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import GoalCalculator from "@/components/calc/GoalCalculator";

export const metadata = calcMeta(
  "goal-house-down-payment",
  "House Down Payment Calculator - Monthly SIP for Home Buying",
  "Calculate the monthly investment needed to save for a house down payment in India. Plan your 20% down payment in 3-7 years."
);

export default function Page() {
  return (
    <CalcPage
      slug="goal-house-down-payment"
      title="House Down Payment Calculator"
      subtitle="Plan your monthly SIP to save the 20% down payment for your home purchase."
      calculator={
        <GoalCalculator
          initialGoal={1500000}
          initialYears={5}
          initialReturn={9}
          initialInflation={6}
          initialInflationAdjust={true}
        />
      }
      sources={[
        { label: "NHB - National Housing Bank Data", href: "https://www.nhb.org.in" },
        { label: "RBI - Housing Loan Statistics", href: "https://www.rbi.org.in" },
        { label: "AMFI - Mutual Fund Returns", href: "https://www.amfiindia.com" },
      ]}
      intro="Buying a home in India typically requires a down payment of 20% of the property value (banks generally lend only 80%). For a ₹75 lakh flat, that means saving ₹15 lakh before you can even approach the bank. Add stamp duty (5-7%) and registration, and the actual upfront cash requirement can be ₹18-20 lakh. Starting a dedicated SIP for the down payment is the most disciplined way to build this corpus - and it keeps you from raiding your emergency fund or retirement savings when the time comes."
      how={{
        heading: "How the down payment SIP is calculated",
        body: (
          <>
            <p>For a 5-year home goal, a balanced approach works best - some equity for growth, some debt for stability:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Target = Down Payment + Stamp Duty + Registration + Buffer
            </p>
            <p>We default to 9% expected return - achievable with a balanced hybrid fund or a 60/40 equity-debt combination over 5 years. Property prices typically rise at 6% p.a. in metro areas, so inflation adjustment is on by default.</p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How much down payment do I need for a home in India?",
          a: "Banks/HFCs lend 75-80% of the property value (LTV). So for a ₹75L property, you need ₹15-18.75L as down payment. Add stamp duty (4-7% of property value depending on state) and registration (1-2%), and total upfront cash is typically 25-30% of the property cost.",
        },
        {
          q: "Should I put more than 20% down?",
          a: "If you can afford it, a higher down payment reduces your home loan EMI burden significantly. But don't deplete your emergency fund or retirement savings to do so. A good rule: down payment from dedicated savings only; never touch your 6-month emergency fund.",
        },
        {
          q: "What investment is appropriate for a 5-year home goal?",
          a: "Balanced hybrid funds (targeting ~9-10% returns) or a combination of equity funds (60%) and short-term debt funds (40%). Pure equity is risky for a 5-year goal - a bear market in year 4 could delay your purchase. Consider switching to pure debt 1-1.5 years before you plan to buy.",
        },
        {
          q: "Should I take a PMAY subsidy?",
          a: "If you are a first-time home buyer with income under ₹18L (PMAY-CLSS), you can get an interest subsidy of up to ₹2.67 lakh on your home loan. Check PMAY eligibility - it doesn't change your down payment requirement but reduces total interest cost significantly.",
        },
        {
          q: "Can I use my EPF for a home purchase?",
          a: "Yes - EPFO allows withdrawal of up to 90% of your EPF balance after 5 years of membership for purchase or construction of a house. However, EPF withdrawal reduces your retirement corpus. Use it only as a top-up, not as the primary source of your down payment.",
        },
      ]}
      extra={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl text-ink">Monthly SIP to build a home down payment</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            These are the monthly SIP amounts needed to reach a down-payment target at a 9% return (a balanced 60/40 equity-debt mix over 3-7 years), before property inflation. Remember the target is more than 20% of the flat price — add stamp duty (4-7%), registration and a small buffer.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-y border-line bg-paper-2 text-left text-ink">
                  <th className="px-3 py-2.5 font-semibold">Down payment + costs</th>
                  <th className="px-3 py-2.5 font-semibold">In 3 years</th>
                  <th className="px-3 py-2.5 font-semibold">In 5 years</th>
                  <th className="px-3 py-2.5 font-semibold">In 7 years</th>
                </tr>
              </thead>
              <tbody className="text-ink-soft">
                <tr className="border-b border-line"><td className="px-3 py-2.5 font-medium text-ink">₹15 lakh</td><td className="px-3 py-2.5">₹36,178</td><td className="px-3 py-2.5">₹19,739</td><td className="px-3 py-2.5">₹12,788</td></tr>
                <tr className="border-b border-line"><td className="px-3 py-2.5 font-medium text-ink">₹20 lakh</td><td className="px-3 py-2.5">₹48,238</td><td className="px-3 py-2.5">₹26,319</td><td className="px-3 py-2.5">₹17,050</td></tr>
                <tr className="border-b border-line"><td className="px-3 py-2.5 font-medium text-ink">₹30 lakh</td><td className="px-3 py-2.5">₹72,357</td><td className="px-3 py-2.5">₹39,479</td><td className="px-3 py-2.5">₹25,575</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-ink-faint">
            As the purchase nears, shift the corpus from equity to debt — a market fall in year 4 of a 5-year plan can delay your purchase. A common rule: move to pure debt or FDs 12-18 months before you intend to buy. Figures assume a 9% return and start-of-month investing.
          </p>
        </div>
      }
    />
  );
}
