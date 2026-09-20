import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import RetirementCalculator from "@/components/calc/RetirementCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "retirement")!;
export const metadata = calcMeta(
  "retirement",
  "Retirement Calculator India – How Much You Need to Retire",
  CALC.blurb
);

export default function Page() {
  return (
    <CalcPage
      slug="retirement"
      title="Retirement Calculator"
      subtitle="Find the corpus you need to retire comfortably and the monthly SIP to get there in time."
      calculator={<RetirementCalculator />}
      sources={[
        { label: "Reserve Bank of India – Inflation Data", href: "https://www.rbi.org.in" },
        { label: "PFRDA / NPS Trust", href: "https://www.npstrust.org.in" },
        { label: "EPFO", href: "https://www.epfindia.gov.in" },
      ]}
      intro="Retirement planning is the most important financial calculation most people never make. This retirement calculator for India helps you estimate: how large a corpus you need to sustain your desired lifestyle after you stop working, accounting for inflation; and what monthly investment (SIP) is required from today to reach that target by your planned retirement age. The calculator accounts for India's typical inflation rates and lets you adjust all assumptions."
      how={{
        heading: "How retirement corpus is calculated",
        body: (
          <>
            <p>
              The calculation has two stages. First, we compute your inflation-adjusted annual expenses at retirement age:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Future Expenses = Current Expenses × (1 + inflation)^years_to_retire
            </p>
            <p>
              Then we find the corpus needed to fund those expenses for your retirement horizon using the present value of an annuity formula, assuming a post-retirement return:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Corpus = Future Annual Expenses × [1 − (1+r)^−n] / r
            </p>
            <p>
              Finally, the required monthly SIP to accumulate that corpus by retirement is calculated using the future value of an annuity formula.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How much money do I need to retire in India?",
          a: "It depends on your current age, planned retirement age, desired monthly expenses in retirement, and life expectancy. A common rule: you need a corpus 25× your annual expenses (the 4% withdrawal rule). For India, where inflation historically averages 5-6%, you may need 28-30× for a 30-year retirement.",
        },
        {
          q: "What return should I assume for retirement planning?",
          a: "For long-term equity-heavy portfolios, a 10-12% pre-retirement return and 6-8% post-retirement return (from a balanced portfolio) are reasonable assumptions. Always use conservative estimates for something as important as retirement.",
        },
        {
          q: "At what age should I start planning?",
          a: "As early as possible. Starting at 25 vs 35 roughly halves the required monthly investment for the same corpus, because money compounds for 10 extra years.",
        },
        {
          q: "Does this calculator account for EPF and NPS?",
          a: "Not automatically. But you can enter your target corpus net of what EPF/NPS will provide, or set the calculator's 'current savings' to the current value of your EPF + NPS to get the remaining gap.",
        },
        {
          q: "What about inflation in retirement?",
          a: "The post-retirement return assumption should ideally exceed inflation. A real return (return minus inflation) of 2-4% is a conservative assumption for a balanced post-retirement portfolio.",
        },
      ]}
    />
  );
}
