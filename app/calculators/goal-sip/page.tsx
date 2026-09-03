import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import GoalSipCalculator from "@/components/calc/GoalSipCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "goal-sip")!;
export const metadata = calcMeta("goal-sip", "SIP for 1 Crore - Goal SIP & Crorepati Calculator", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="goal-sip"
      title="Goal SIP Calculator"
      subtitle="Find the exact monthly SIP you need to hit ₹1 crore, or any money goal."
      calculator={<GoalSipCalculator />}
      intro="A Goal SIP calculator works in reverse. Instead of guessing your final corpus, you set a target, say ₹1 crore, and it tells you the exact monthly SIP needed to get there. The magic ingredient is time: start early and compounding does the heavy lifting, so your monthly amount stays surprisingly small. Later starts demand far bigger contributions for the same goal."
      how={{
        heading: "How the goal SIP is calculated",
        body: (
          <>
            <p>
              A normal SIP calculator asks &ldquo;I invest ₹X monthly. What will
              I have?&rdquo; A goal (reverse) SIP calculator flips it: &ldquo;I
              want a target amount. How much must I invest monthly?&rdquo; It
              rearranges the same future-value formula to solve for the monthly
              amount.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Monthly SIP = FV ÷ [ ((1 + i)ⁿ − 1) / i × (1 + i) ]
            </p>
            <p>
              Here <strong>FV</strong> is your target, <strong>i</strong> is the
              monthly return (annual return ÷ 12), and <strong>n</strong> is the
              number of months. Starting earlier slashes the monthly amount
              dramatically because your money spends more years compounding. To
              reach ₹1 crore at 12% returns you&apos;d need roughly ₹2,000/month
              over 30 years, about ₹5,000/month over 25 years, but nearly
              ₹10,000/month over 20 years: same goal, same returns, only the head
              start changes.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How much SIP do I need to become a crorepati?",
          a: "At an assumed 12% annual return, roughly ₹2,000/month for 30 years, ₹5,000/month for 25 years, or ₹10,000/month for 20 years grows to ₹1 crore. The longer your timeline, the smaller the monthly amount. Enter your own target and years above for an exact figure.",
        },
        {
          q: "How much should I invest monthly to reach ₹1 crore in 15 years?",
          a: "To reach ₹1 crore in 15 years at 12% returns, you'd need to invest around ₹20,000 per month. Shorter timeframes need much bigger SIPs because compounding has less time to work. Extending your goal by even 5 years cuts the monthly amount sharply.",
        },
        {
          q: "Is ₹1 crore enough to retire on?",
          a: "It depends on your age, expenses and inflation. ₹1 crore today has strong buying power, but 20-30 years of inflation can erode it, so many people now aim for ₹3-5 crore for a comfortable retirement. Use this as a starting goal and recalculate as your needs become clearer.",
        },
        {
          q: "What return should I assume for my SIP?",
          a: "For equity mutual funds, 11-12% is a reasonable long-term assumption based on historical Indian market performance, though returns are never guaranteed. Use 10% to stay conservative and 8% for debt-heavy portfolios. Run the calculator at a couple of rates to see the range.",
        },
        {
          q: "How much SIP do I need for Rs 50 lakh in 10 years?",
          a: "At an assumed 12% annual return, a monthly SIP of roughly Rs 21,500 grows to about Rs 50 lakh over 10 years, of which around Rs 25.8 lakh is your own contribution and the rest is growth. Stretch the same goal to 15 years and the monthly amount falls to around Rs 10,000, because compounding has five more years to work. Enter Rs 50,00,000 as your target above to test other return assumptions.",
        },
        {
          q: "Should I increase my SIP every year?",
          a: "A step-up or top-up SIP raises your monthly contribution by a set percentage each year, typically 5% to 10%, so your investing keeps pace with salary increases and inflation. It lets you start with a much smaller amount than a flat SIP needs for the same target, and most fund houses and platforms let you set the annual increase once and forget it. If your income grows, stepping up is usually the least painful way to close a goal gap.",
        },
        {
          q: "How are SIP returns taxed in India?",
          a: "Each SIP instalment is treated as a separate purchase with its own holding period, and redemptions follow first-in-first-out. For equity funds, units held more than 12 months attract long-term capital gains tax at 12.5% on gains above the Rs 1,25,000 annual exemption, while units held 12 months or less are taxed at 20%. Debt funds are taxed at your slab rate. Rates change with each Budget, so verify on incometax.gov.in.",
        },
        {
          q: "What happens if I miss a SIP instalment or want to pause?",
          a: "Fund houses do not usually charge a penalty for a missed instalment, but your bank may levy a mandate failure charge, and several consecutive failures can cause the SIP to be cancelled. Most platforms let you formally pause a SIP for a few months instead, which keeps the mandate alive. Pausing delays your goal, so when cash flow recovers, consider stepping the amount up to make back the shortfall.",
        },
      ]}
    />
  );
}
