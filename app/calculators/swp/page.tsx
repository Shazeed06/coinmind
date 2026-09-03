import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import SwpCalculator from "@/components/calc/SwpCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "swp")!;
export const metadata = calcMeta("swp", CALC.title + " - Systematic Withdrawal Plan", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="swp"
      title="SWP Calculator"
      subtitle="Plan a steady monthly income from your mutual-fund corpus, and see if it lasts."
      calculator={<SwpCalculator />}
      intro="A Systematic Withdrawal Plan (SWP) lets you invest a lump sum in a mutual fund and draw a fixed amount every month, while the money you haven't withdrawn yet stays invested and keeps growing. It's the mirror image of a SIP, and one of the most popular ways Indian investors turn a retirement corpus into a predictable monthly paycheck. This SWP calculator simulates your plan month by month so you can see your total withdrawals, the balance left at the end, and, crucially, whether your corpus can survive the full period at the withdrawal rate you've chosen."
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
          a: "A Systematic Withdrawal Plan lets you redeem a fixed amount from a mutual-fund investment at regular intervals, usually monthly. The rest of your money stays invested and continues to earn returns, so an SWP can provide a steady income stream while still growing the remaining corpus.",
        },
        {
          q: "How is an SWP different from a lump-sum withdrawal?",
          a: "A lump-sum withdrawal takes everything out at once, ending all future growth and often triggering a large tax event in a single year. An SWP spreads withdrawals over time, so the un-withdrawn balance keeps compounding and your capital-gains tax is spread across many years and units.",
        },
        {
          q: "Is SWP income taxable?",
          a: "Yes. Each SWP withdrawal is treated as a partial redemption, and only the gains portion of each withdrawal is taxable as capital gains, not the whole amount. The rate depends on the fund type and how long those units were held. This calculator shows gross figures before tax; consult a tax advisor for your specific situation.",
        },
        {
          q: "Will my money run out?",
          a: "It depends on your withdrawal rate versus your return rate. If you withdraw more than your corpus earns, the balance shrinks every month and will eventually hit zero. This calculator simulates every month and warns you of the exact year your corpus would run out, so you can lower the withdrawal or adjust expectations before committing.",
        },
        {
          q: "Why is SWP popular for retirement income?",
          a: "Retirees often want a dependable monthly payout without cashing out their whole portfolio. An SWP delivers that predictable income while keeping the balance invested for growth and inflation protection, and it's more tax-efficient than dividends because only the gains in each withdrawal are taxed.",
        },
        {
          q: "What is a safe SWP withdrawal rate?",
          a: "A common starting point is to withdraw no more than about 4% of your corpus in the first year, which on ₹1 crore is roughly ₹33,000 a month. Many Indian planners prefer 3 to 3.5% because inflation here has historically run higher. The real test is whether your withdrawal rate sits below your expected return with room to spare. Set the withdrawal too close to the return and one bad market stretch can permanently shrink the corpus.",
        },
        {
          q: "Which type of fund is best for an SWP?",
          a: "It depends on how long the plan must last. For income needed within a few years, debt or conservative hybrid funds reduce the risk that a market fall forces you to sell units cheaply. For a 15 or 20 year drawdown, a balanced advantage or equity-oriented hybrid fund is often used so the corpus keeps growing against inflation. Running an SWP out of a pure equity fund is possible but exposes each monthly redemption to sequence-of-returns risk.",
        },
        {
          q: "Is an SWP better than a fixed deposit for monthly income?",
          a: "Usually on tax, not always on certainty. FD interest is added to your income and taxed at your slab rate, so a 30% slab taxpayer loses a large slice. In an SWP only the gains portion of each withdrawal is taxed, and as capital gains rather than at slab rates, so the effective tax is typically much lower. The trade-off is that FD returns are contractually fixed while an SWP depends on markets and can deplete faster than planned.",
        },
        {
          q: "Can I change or stop my SWP later?",
          a: "Yes. An SWP is an instruction to the fund house, not a locked contract. You can raise or lower the monthly amount, change the withdrawal date, pause it, or cancel it entirely, usually with a few working days of notice. That flexibility is worth using: if markets fall sharply, trimming the withdrawal for a while leaves more units invested to recover. Re-run this calculator at the new amount to see how the revised plan changes the year your corpus runs out.",
        },
      ]}
    />
  );
}
