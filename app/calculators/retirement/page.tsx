import type { Metadata } from "next";
import RetirementCalculator from "@/components/calc/RetirementCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Retirement Calculator — How Much Do You Need to Retire?" },
  description:
    "Free retirement planning calculator. Find the corpus you need to retire and the monthly investment required to get there, adjusted for inflation.",
  alternates: { canonical: "/calculators/retirement" },
};

export default function Page() {
  return (
    <CalcPage
      slug="retirement"
      title="Retirement Calculator"
      subtitle="Find out how big a nest egg you need — and what to invest each month to build it."
      calculator={<RetirementCalculator />}
      intro="Retirement planning comes down to two numbers: how much you'll need on the day you retire, and how much to invest each month to get there. This calculator factors in inflation (so today's expenses are projected forward) and your investment returns, then works backward to a monthly target."
      how={{
        heading: "How the calculation works",
        body: (
          <>
            <p>First we inflate your current monthly expenses to what they'll be at retirement. Then we estimate the corpus needed to fund those expenses for your remaining years, using a return that stays ahead of inflation.</p>
            <p>Finally we compute the monthly SIP required to build that corpus by your retirement age, using standard future-value maths. Adjust any input and every number updates instantly.</p>
          </>
        ),
      }}
      faqs={[
        { q: "Why does inflation matter so much?", a: "At 6% inflation, expenses double roughly every 12 years. What costs ₹50,000 a month today could cost far more by the time you retire — ignoring inflation is the most common retirement-planning mistake." },
        { q: "What return should I assume?", a: "During your working years, a diversified equity-heavy portfolio might target 10–12%. After retirement, people usually shift to safer assets, so the calculator uses your return net of inflation to stay realistic." },
        { q: "Is this a guarantee?", a: "No. It's a planning estimate based on your assumptions. Review it every couple of years and adjust as your income, goals and markets change." },
        { q: "What if I start late?", a: "The later you start, the more you must invest each month — which is exactly why starting early matters so much. Try moving your current age down to see the difference." },
      ]}
    />
  );
}
