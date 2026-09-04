import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import RetirementCalculator from "@/components/calc/RetirementCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "retirement")!;
export const metadata = calcMeta("retirement", CALC.title + " - How Much Do You Need to Retire?", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="retirement"
      title="Retirement Calculator"
      subtitle="Find out how big a nest egg you need, and what to invest each month to build it."
      calculator={<RetirementCalculator />}
      intro="Retirement planning comes down to two numbers: how much you will need on the day you retire, and how much to invest each month to get there. This retirement calculator bridges the two. It takes your current age, the age you want to stop working, what you spend every month today and the return you expect to earn, then projects your expenses forward at your assumed inflation rate so the target reflects tomorrow's prices rather than today's. From that it estimates the retirement corpus needed to fund your post-retirement years, and works backward to the monthly SIP required to build it. Change any input and every figure updates instantly, which makes it easy to see how retiring five years earlier, or starting five years sooner, reshapes the number you have to hit."
      how={{
        heading: "How the calculation works",
        body: (
          <>
            <p>First we inflate your current monthly expenses to what they&apos;ll be at retirement. Then we estimate the corpus needed to fund those expenses for your remaining years, using a return that stays ahead of inflation.</p>
            <p>Finally we compute the monthly SIP required to build that corpus by your retirement age, using standard future-value maths. Adjust any input and every number updates instantly.</p>
          </>
        ),
      }}
      faqs={[
        { q: "Why does inflation matter so much?", a: "At 6% inflation, expenses double roughly every 12 years. What costs ₹50,000 a month today could cost far more by the time you retire. Ignoring inflation is the most common retirement-planning mistake." },
        { q: "What return should I assume?", a: "During your working years, a diversified equity-heavy portfolio might target 10-12%. After retirement, people usually shift to safer assets, so the calculator uses your return net of inflation to stay realistic." },
        { q: "Is this a guarantee?", a: "No. It's a planning estimate based on your assumptions. Review it every couple of years and adjust as your income, goals and markets change." },
        { q: "What if I start late?", a: "The later you start, the more you must invest each month, which is exactly why starting early matters so much. Try moving your current age down to see the difference." },
        { q: "How much corpus do I need to retire in India?", a: "A common rule of thumb is 25 to 30 times your expected annual expenses at the time you retire, not your expenses today. If you expect to spend ₹1,00,000 a month at 60, that is ₹12 lakh a year, pointing to a corpus of roughly ₹3 crore to ₹3.6 crore. Indian inflation and long retirements push most planners toward the higher end. The calculator above does this properly by inflating your current spending forward first, so use its figure rather than the shortcut." },
        { q: "What is the 4 percent withdrawal rule?", a: "It says you can withdraw about 4% of your corpus in the first year of retirement, then raise that rupee amount with inflation each year, and the money should last around 30 years. Four percent is simply the inverse of the 25x rule. It came from US market history, and many Indian advisers suggest a more conservative 3 to 3.5% given higher inflation and longer life expectancy here. Treat it as a sanity check, not a guarantee." },
        { q: "Are EPF and NPS enough to retire on?", a: "For most people, no. EPF contributions are a percentage of basic salary, which is typically around half of CTC, so the corpus it builds rarely replaces your full lifestyle. NPS adds to it and offers the extra ₹50,000 deduction under Section 80CCD(1B) in the old regime, but at least 40% of the Tier 1 corpus must buy an annuity. Treat both as the floor of your plan and fill the gap with equity mutual funds through a SIP." },
        { q: "When should I start planning for retirement?", a: "As early as your first salary, because the cost of waiting compounds. Someone investing ₹10,000 a month from 25 to 60 puts in the same total as someone investing ₹23,000 a month from 45 to 60, but ends with a far larger corpus because the early money has 35 years to grow rather than 15. If you are starting late, the fix is a higher monthly amount plus annual step-ups. Move your current age in the calculator to see the gap for yourself." },
      ]}
    />
  );
}
