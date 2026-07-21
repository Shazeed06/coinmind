import type { Metadata } from "next";
import Link from "next/link";
import StepUpSipCalculator from "@/components/calc/StepUpSipCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Step-up SIP Calculator — Top-up SIP Returns" },
  description:
    "Free step-up SIP calculator. See how increasing your monthly SIP each year grows your corpus vs a flat SIP. Estimate top-up SIP returns in ₹, $ or £.",
  alternates: { canonical: "/calculators/step-up-sip" },
  openGraph: { url: "/calculators/step-up-sip" },
};

export default function Page() {
  return (
    <CalcPage
      slug="step-up-sip"
      title="Step-up SIP Calculator"
      subtitle="See how topping up your SIP a little every year snowballs into a much larger corpus."
      calculator={<StepUpSipCalculator />}
      intro="A step-up SIP (also called a top-up SIP) lets you raise your monthly investment by a fixed percentage every year — usually to match your annual salary hike. Because you invest more in the later years when compounding is most powerful, even a modest annual increase can add a substantial amount to your final corpus. This step-up SIP calculator projects your maturity value and shows exactly how much extra you earn compared with a flat SIP that never increases."
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
          a: "A common rule of thumb is to step up your SIP by the same rate as your expected annual salary hike — often around 10%. If you expect faster income growth or want to reach a goal sooner, you can go higher. Even a modest 5–10% annual step-up can meaningfully boost your final corpus without straining your monthly budget.",
        },
        {
          q: "Can I use this calculator outside India?",
          a: "Yes. Switch the currency to USD or GBP and use it for any regular investing plan where you plan to raise your contribution each year, such as increasing a 401(k) deferral or a stocks & shares ISA contribution annually.",
        },
      ]}
    />
  );
}
