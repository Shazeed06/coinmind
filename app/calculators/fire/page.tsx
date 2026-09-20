import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import FireCalculator from "@/components/calc/FireCalculator";

export const metadata = calcMeta(
  "fire",
  "FIRE Calculator India – Financial Independence Retire Early",
  "Calculate your FIRE number and see if you're on track to retire early in India. Uses the 4% rule with inflation-adjusted projections."
);

export default function Page() {
  return (
    <CalcPage
      slug="fire"
      title="FIRE Calculator"
      subtitle="Calculate your Financial Independence number and the monthly investment needed to retire early."
      calculator={<FireCalculator />}
      sources={[
        { label: "Bengen (1994) – Determining Withdrawal Rates Using Historical Data", href: "https://www.rbi.org.in" },
        { label: "Reserve Bank of India – Inflation Data", href: "https://www.rbi.org.in" },
        { label: "SEBI – Investor Education", href: "https://investor.sebi.gov.in" },
      ]}
      intro="FIRE — Financial Independence, Retire Early — is a movement built on one idea: accumulate a large enough investment portfolio that you can live off the returns indefinitely, without needing a salary. The key number is your 'FIRE corpus': typically 25 times your annual expenses (based on the 4% safe withdrawal rate). This calculator takes your current age, target retirement age, monthly expenses, inflation, investment return, and existing savings to tell you: (1) how large a corpus you need at FIRE date, (2) whether your current savings pace gets you there, and (3) how much more to invest monthly if there is a gap."
      how={{
        heading: "How the FIRE number is calculated",
        body: (
          <>
            <p>
              The 4% rule, from William Bengen&apos;s 1994 research on US historical returns, says a retiree can withdraw 4% of their portfolio annually with low risk of running out of money over a 30-year period. The inverse — 25× annual expenses — becomes the target corpus:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              FIRE Number = Annual Expenses at FIRE date × 25
            </p>
            <p>
              Annual expenses are first inflation-adjusted to the FIRE date using your specified inflation rate. Then your projected corpus is calculated from current savings growing at the expected return, plus the future value of monthly SIP investments.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Projected Corpus = FV(current savings) + FV(monthly SIP)
            </p>
            <p>
              If the projected corpus falls short, the calculator shows the additional monthly investment needed to close the gap.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Is the 4% rule valid for India?",
          a: "The 4% rule was derived from US historical data. For India, where inflation has historically been higher (5-7% vs 2-3% in the US), a more conservative withdrawal rate of 3-3.5% (implying a corpus of 28-33× expenses) may be more appropriate for very long retirements. This calculator uses 25× as the baseline but you can adjust expenses to stress-test.",
        },
        {
          q: "What is the difference between FIRE types?",
          a: "Lean FIRE: minimal lifestyle, 20-25× expenses, typically achieved faster. Regular FIRE: comfortable lifestyle, 25-28× expenses. Fat FIRE: generous, travel-heavy lifestyle, 33×+ expenses. Coast FIRE: stop investing but keep working; let the existing corpus grow to the FIRE number on its own.",
        },
        {
          q: "Should I include EPF and NPS in my current savings?",
          a: "Yes — EPF and NPS are investments that compound and contribute to your retirement corpus. Include their current balance in 'current savings'. However, note that EPF is accessible only at 58 (or with restrictions before), so for early retirement before 58, account for the liquidity mismatch.",
        },
        {
          q: "What happens to my FIRE corpus if markets fall?",
          a: "Sequence of returns risk — a market downturn early in retirement — is the biggest FIRE risk. Mitigation strategies include: holding 2-3 years of expenses in FD/liquid funds, a dynamic withdrawal strategy (spend less when markets fall), and part-time income in early retirement (Barista FIRE).",
        },
        {
          q: "How does inflation affect FIRE planning?",
          a: "Inflation is doubly important: it increases your future expenses (raising the FIRE number) and erodes the real value of your savings if returns don't exceed it. Always use a real return (return minus inflation) of at least 2-3% for long-term planning.",
        },
      ]}
    />
  );
}
