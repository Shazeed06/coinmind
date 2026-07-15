import type { Metadata } from "next";
import GoalSipCalculator from "@/components/calc/GoalSipCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Goal SIP Calculator — Reach ₹1 Crore" },
  description:
    "Free Goal SIP calculator (crorepati calculator): find the exact monthly SIP needed to reach ₹1 crore or any target. Reverse SIP, instant results.",
  alternates: { canonical: "/calculators/goal-sip" },
};

export default function Page() {
  return (
    <CalcPage
      slug="goal-sip"
      title="Goal SIP Calculator"
      subtitle="Find the exact monthly SIP you need to hit ₹1 crore — or any money goal."
      calculator={<GoalSipCalculator />}
      intro="A Goal SIP calculator works in reverse. Instead of guessing your final corpus, you set a target — say ₹1 crore — and it tells you the exact monthly SIP needed to get there. The magic ingredient is time: start early and compounding does the heavy lifting, so your monthly amount stays surprisingly small. Later starts demand far bigger contributions for the same goal."
      how={{
        heading: "How the goal SIP is calculated",
        body: (
          <>
            <p>
              A normal SIP calculator asks &ldquo;I invest ₹X monthly — what will
              I have?&rdquo; A goal (reverse) SIP calculator flips it: &ldquo;I
              want a target amount — how much must I invest monthly?&rdquo; It
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
              ₹10,000/month over 20 years — same goal, same returns, only the head
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
          a: "It depends on your age, expenses and inflation. ₹1 crore today has strong buying power, but 20–30 years of inflation can erode it, so many people now aim for ₹3–5 crore for a comfortable retirement. Use this as a starting goal and recalculate as your needs become clearer.",
        },
        {
          q: "What return should I assume for my SIP?",
          a: "For equity mutual funds, 11–12% is a reasonable long-term assumption based on historical Indian market performance, though returns are never guaranteed. Use 10% to stay conservative and 8% for debt-heavy portfolios. Run the calculator at a couple of rates to see the range.",
        },
      ]}
    />
  );
}
