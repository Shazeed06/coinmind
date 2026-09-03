import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import Link from "next/link";
import StepUpSipCalculator from "@/components/calc/StepUpSipCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "step-up-sip")!;
export const metadata = calcMeta("step-up-sip", CALC.title + " - Top-up SIP Returns", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="step-up-sip"
      title="Step-up SIP Calculator"
      subtitle="See how topping up your SIP a little every year snowballs into a much larger corpus."
      calculator={<StepUpSipCalculator />}
      intro="A step-up SIP (also called a top-up SIP) lets you raise your monthly investment by a fixed percentage every year, usually to match your annual salary hike. Because you invest more in the later years when compounding is most powerful, even a modest annual increase can add a substantial amount to your final corpus. This step-up SIP calculator projects your maturity value and shows exactly how much extra you earn compared with a flat SIP that never increases."
      how={{
        heading: "How the step-up SIP calculator works",
        body: (
          <>
            <p>
              The calculator simulates your investment month by month. Each
              month your running balance earns the monthly rate of return and
              your SIP contribution is added on top:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              balance = balance × (1 + i) + monthly SIP
            </p>
            <p>
              Here <strong>i</strong> is the monthly rate of return (annual rate
              &divide; 12). After every 12 months, your monthly SIP is increased
              by the step-up percentage you choose, so each year&apos;s
              contributions are larger than the last. We total up everything you
              put in to get your invested amount, and the difference between your
              final balance and that total is your estimated returns. Everything
              runs in your browser, so your numbers never leave your device.
            </p>
            <p>
              Prefer a fixed monthly amount? Try the{" "}
              <Link href="/calculators/sip" className="font-semibold text-forest hover:underline">
                SIP calculator
              </Link>
              . Investing toward a specific target instead? The{" "}
              <Link href="/calculators/goal-sip" className="font-semibold text-forest hover:underline">
                goal SIP calculator
              </Link>{" "}
              works out the monthly amount you need.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a step-up SIP?",
          a: "A step-up SIP is a systematic investment plan where you automatically increase your monthly contribution by a set percentage every year, instead of investing the same fixed amount for the entire tenure. It's also called a top-up SIP. The idea is to grow your investing rate as your income grows, so your money works harder over time.",
        },
        {
          q: "Why should I increase my SIP every year?",
          a: "Your income typically rises each year, but inflation also erodes the value of a fixed SIP. Stepping up your SIP keeps your investing in line with your earnings and beats inflation. Crucially, the extra money goes in during the later years when compounding has the biggest effect, so a small annual increase can add a surprisingly large sum to your final corpus.",
        },
        {
          q: "How is a step-up SIP different from a regular SIP?",
          a: "A regular SIP invests the same amount every month for the whole period. A step-up SIP raises that amount by a chosen percentage once a year. For the same starting contribution, a step-up SIP builds a considerably bigger corpus because your total invested amount and your compounding base both keep growing year after year.",
        },
        {
          q: "What is an ideal step-up percentage?",
          a: "A common rule of thumb is to step up your SIP by the same rate as your expected annual salary hike, often around 10%. If you expect faster income growth or want to reach a goal sooner, you can go higher. Even a modest 5-10% annual step-up can meaningfully boost your final corpus without straining your monthly budget.",
        },
        {
          q: "Can I use this calculator outside India?",
          a: "Yes. Switch the currency to USD or GBP and use it for any regular investing plan where you plan to raise your contribution each year, such as increasing a 401(k) deferral or a stocks & shares ISA contribution annually.",
        },
        {
          q: "How much more does a 10% step-up SIP earn than a flat SIP?",
          a: "Considerably more, because you end up investing far more in total. Starting at ₹10,000 a month and stepping up 10% a year, your monthly contribution reaches roughly ₹23,500 by year 10 and about ₹61,000 by year 20, so both the invested amount and the compounding base keep growing. Run the same starting amount, rate and tenure in this calculator with the step-up set to 0% and then to 10% to see the exact gap for your numbers.",
        },
        {
          q: "How do I set up a step-up SIP with my fund house?",
          a: "Most AMCs and platforms offer it as a top-up or step-up option on the SIP registration form, where you choose either a fixed rupee increase or a percentage increase applied every year or half-year. Your bank mandate has to be registered for the highest expected instalment, not the starting one, otherwise later debits fail. If your existing SIP has no top-up flag, you generally cannot add one to it; you register a fresh SIP with the feature enabled.",
        },
        {
          q: "Can I pause, reduce or stop a step-up SIP?",
          a: "Yes. A SIP is not a locked contract: you can pause it for a few months, cancel it, or register a new one at a lower amount, usually with a few working days of notice. Some AMCs let you switch off just the annual top-up and continue at the current instalment. Stopping contributions does not force a redemption, so the units you already hold stay invested and keep compounding, apart from any ELSS lock-in that still applies.",
        },
        {
          q: "How are step-up SIP returns taxed in India?",
          a: "Exactly like any other mutual fund investment, and each instalment is treated as a separate purchase with its own holding period on a first-in first-out basis. So when you redeem, the earliest units may qualify as long-term while your most recent step-up instalments are still short-term. Equity and debt funds are taxed differently and the rules have changed in recent Budgets, so confirm the current rates and thresholds with the Income Tax Department before you redeem.",
        },
      ]}
    />
  );
}
