import type { Metadata } from "next";
import SwpCalculator from "@/components/calc/SwpCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "SWP Calculator — Systematic Withdrawal Plan" },
  description:
    "Free SWP calculator. See how long your mutual-fund corpus lasts, your total withdrawals and remaining balance for any monthly payout and return rate.",
  alternates: { canonical: "/calculators/swp" },
  openGraph: { url: "/calculators/swp" },
};

export default function Page() {
  return (
    <CalcPage
      slug="swp"
      title="SWP Calculator"
      subtitle="Plan a steady monthly income from your mutual-fund corpus — and see if it lasts."
      calculator={<SwpCalculator />}
      intro="A Systematic Withdrawal Plan (SWP) lets you invest a lump sum in a mutual fund and draw a fixed amount every month, while the money you haven't withdrawn yet stays invested and keeps growing. It's the mirror image of a SIP, and one of the most popular ways Indian investors turn a retirement corpus into a predictable monthly paycheck. This SWP calculator simulates your plan month by month so you can see your total withdrawals, the balance left at the end, and — crucially — whether your corpus can survive the full period at the withdrawal rate you've chosen."
      how={{
        heading: "How an SWP is calculated",
        body: (
          <>
            <p>
              Unlike a simple formula, an SWP is easiest to model month by month.
              This calculator runs the following two steps for every month of your
              plan:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              balance = balance × (1 + annualRate/12/100) − monthlyWithdrawal
            </p>
            <p>
              Each month your remaining balance first earns one month of return
              (the annual rate divided by 12), and then your fixed withdrawal is
              taken out. Because the balance keeps compounding on whatever is
              left, early withdrawals hurt the corpus far less than they would if
              the money simply sat in cash. If at any point the balance can no
              longer cover a full withdrawal, the calculator flags the year your
              corpus runs out.
            </p>
            <p>
              Planning the other side of the journey? Use CoinMind&apos;s{" "}
              <strong>SIP</strong> and <strong>retirement</strong> calculators to
              first build the corpus, then come back here to plan how to draw it
              down.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is an SWP?",
          a: "A Systematic Withdrawal Plan lets you redeem a fixed amount from a mutual-fund investment at regular intervals — usually monthly. The rest of your money stays invested and continues to earn returns, so an SWP can provide a steady income stream while still growing the remaining corpus.",
        },
        {
          q: "How is an SWP different from a lump-sum withdrawal?",
          a: "A lump-sum withdrawal takes everything out at once, ending all future growth and often triggering a large tax event in a single year. An SWP spreads withdrawals over time, so the un-withdrawn balance keeps compounding and your capital-gains tax is spread across many years and units.",
        },
        {
          q: "Is SWP income taxable?",
          a: "Yes. Each SWP withdrawal is treated as a partial redemption, and only the gains portion of each withdrawal is taxable as capital gains — not the whole amount. The rate depends on the fund type and how long those units were held. This calculator shows gross figures before tax; consult a tax advisor for your specific situation.",
        },
        {
          q: "Will my money run out?",
          a: "It depends on your withdrawal rate versus your return rate. If you withdraw more than your corpus earns, the balance shrinks every month and will eventually hit zero. This calculator simulates every month and warns you of the exact year your corpus would run out, so you can lower the withdrawal or adjust expectations before committing.",
        },
        {
          q: "Why is SWP popular for retirement income?",
          a: "Retirees often want a dependable monthly payout without cashing out their whole portfolio. An SWP delivers that predictable income while keeping the balance invested for growth and inflation protection, and it's more tax-efficient than dividends because only the gains in each withdrawal are taxed.",
        },
      ]}
    />
  );
}
