import type { Metadata } from "next";
import Link from "next/link";
import InflationCalculator from "@/components/calc/InflationCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Inflation Calculator — Future Value of Money" },
  description:
    "Free inflation calculator. See what today's money will cost in the future and how inflation erodes the purchasing power of your savings over time.",
  alternates: { canonical: "/calculators/inflation" },
};

export default function Page() {
  return (
    <CalcPage
      slug="inflation"
      title="Inflation Calculator"
      subtitle="See what today's money will really be worth years from now."
      calculator={<InflationCalculator />}
      intro="Inflation quietly raises the cost of everything you buy, which means the same amount of money buys a little less each year. This inflation calculator shows two things at once: how much a purchase that costs a certain amount today will cost in the future, and how much the buying power of your money will shrink if it just sits in cash. Understanding both is the first step to protecting and growing your wealth."
      how={{
        heading: "How inflation is calculated",
        body: (
          <>
            <p>The calculator uses the compound-growth formula:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Future cost = P × (1 + i)^t
            </p>
            <p>
              Where <strong>P</strong> is today&rsquo;s amount, <strong>i</strong>{" "}
              is the annual inflation rate, and <strong>t</strong> is the number of
              years. The same formula run in reverse &mdash; dividing instead of
              multiplying &mdash; gives the future purchasing power of today&rsquo;s
              money, i.e. what your cash will actually be worth once prices have risen.
            </p>
            <p>
              The gap between these two numbers is why simply holding cash loses value
              over time. To stay ahead, your money needs to earn a return higher than
              inflation &mdash; which is where a{" "}
              <Link href="/calculators/sip" className="text-forest font-semibold hover:underline">
                SIP calculator
              </Link>{" "}
              or an{" "}
              <Link href="/calculators/fd" className="text-forest font-semibold hover:underline">
                FD calculator
              </Link>{" "}
              can help you plan.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is inflation?",
          a: "Inflation is the gradual rise in the general price level of goods and services over time. As prices climb, each unit of currency buys a little less, so your money loses purchasing power even if the number in your account stays the same.",
        },
        {
          q: "How does inflation erode my savings?",
          a: "If your savings grow slower than inflation, their real value falls. For example, at 6% inflation, money left in cash loses roughly half its buying power in about 12 years, even though the balance on paper hasn't dropped a single rupee.",
        },
        {
          q: "What is the average inflation rate in India and the US?",
          a: "India's long-run consumer inflation has averaged around 5-6% per year, while the US has typically averaged closer to 2-3%. Rates vary year to year, so it's wise to test a few different figures in the calculator to see a realistic range.",
        },
        {
          q: "How can I beat inflation?",
          a: "The key is to earn a return greater than the inflation rate. Keeping too much in idle cash guarantees a loss of real value. Investing in assets like equity mutual funds via a SIP, or locking money in a fixed deposit at a rate above inflation, helps your wealth keep pace with or outgrow rising prices.",
        },
        {
          q: "Why do both future cost and purchasing power matter?",
          a: "They answer two different questions. Future cost tells you how much more you'll need to buy the same thing later, which is vital for goal planning. Purchasing power tells you what your existing money will actually be worth, which shows the real cost of not investing.",
        },
      ]}
    />
  );
}
