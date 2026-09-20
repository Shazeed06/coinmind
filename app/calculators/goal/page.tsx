import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import GoalCalculator from "@/components/calc/GoalCalculator";

export const metadata = calcMeta(
  "goal",
  "Goal SIP Calculator India – How Much to Save for Any Goal",
  "Calculate the monthly SIP needed to reach any financial goal — ₹25L, ₹50L, ₹1 Crore, child education, home, car — adjusted for inflation."
);

export default function Page() {
  return (
    <CalcPage
      slug="goal"
      title="Financial Goal Calculator"
      subtitle="Find the monthly investment needed to reach any goal — house, education, car, or any target amount."
      calculator={<GoalCalculator />}
      sources={[
        { label: "SEBI – Investor Education and Protection Fund", href: "https://investor.sebi.gov.in" },
        { label: "Reserve Bank of India – Inflation Series", href: "https://www.rbi.org.in" },
        { label: "AMFI – Mutual Fund SIP Data", href: "https://www.amfiindia.com" },
      ]}
      intro="Every financial goal — whether it is a house down payment, a child's college education, a wedding, a dream car, or simply building ₹1 crore — can be broken down into a specific monthly investment. This goal-based SIP calculator does exactly that: you tell it the target amount and time horizon, and it tells you the monthly SIP needed, adjusted for inflation if you want. It also accounts for what you have already saved towards the goal, so you only need to invest the remaining amount."
      how={{
        heading: "How the goal SIP is calculated",
        body: (
          <>
            <p>
              First, if inflation adjustment is on, the goal amount is grown to its future equivalent:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Adjusted Goal = Goal × (1 + inflation)^years
            </p>
            <p>
              Any existing savings towards this goal are compounded at the expected return to get their future value, which is subtracted from the adjusted goal:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Remaining Target = Adjusted Goal − FV(current savings)
            </p>
            <p>
              Finally, the monthly SIP that accumulates to the remaining target is found using the future value of an annuity formula:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Monthly SIP = Remaining Target × r / [(1+r)^n − 1] / (1+r)
            </p>
            <p>
              where r is the monthly interest rate and n is the number of months.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Should I turn on inflation adjustment?",
          a: "Yes, for goals more than 2-3 years away. If you are saving for a college education in 15 years that costs ₹20 lakh today, at 6% inflation it will cost ₹48 lakh. Without adjusting for inflation, your savings target is too low. Leave it off only for goals where the cost is fixed today (e.g. a fixed-price booking deposit).",
        },
        {
          q: "What return should I expect?",
          a: "For short goals (1-3 years), use 6-7% (FD/debt fund returns). For medium goals (3-7 years), use 8-10% (balanced hybrid funds). For long goals (7+ years), use 10-12% (equity mutual funds, SIP average). Never use equity for goals under 3 years due to short-term volatility.",
        },
        {
          q: "Can this calculator be used for child education planning?",
          a: "Yes — enter the estimated education cost today, set the time horizon to when your child will start college, and turn on inflation adjustment with 8-10% (education inflation is higher than CPI). This gives you the monthly SIP to start today.",
        },
        {
          q: "What if my goal amount itself keeps changing?",
          a: "That is normal — particularly for real estate. The inflation adjustment feature handles this: it grows your nominal goal at the inflation rate you specify, which approximates how the goal's cost grows over time.",
        },
        {
          q: "Can I use a step-up SIP instead of a fixed SIP?",
          a: "This calculator uses a fixed monthly SIP. For a step-up SIP (where you increase the amount each year), use our Step-Up SIP Calculator — the required starting SIP amount will be lower.",
        },
      ]}
    />
  );
}
