import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import GoalCalculator from "@/components/calc/GoalCalculator";

export const metadata = calcMeta(
  "goal-marriage",
  "Marriage Planning Calculator – Monthly SIP for Wedding Savings",
  "Calculate the monthly investment needed to save for a wedding in India. Accounts for ceremony, venue, jewellery and inflation."
);

export default function Page() {
  return (
    <CalcPage
      slug="goal-marriage"
      title="Marriage Planning Calculator"
      subtitle="Find the monthly SIP needed to save for a wedding — whether it's ₹10 lakh or ₹50 lakh."
      calculator={
        <GoalCalculator
          initialGoal={2500000}
          initialYears={7}
          initialReturn={10}
          initialInflation={6}
          initialInflationAdjust={true}
        />
      }
      sources={[
        { label: "AMFI – Mutual Fund SIP Data", href: "https://www.amfiindia.com" },
        { label: "RBI – Inflation Data", href: "https://www.rbi.org.in" },
      ]}
      intro="Indian weddings are one of the largest one-time expenses a family makes. The average urban wedding in India now costs ₹15–30 lakh — and premium weddings can run to ₹50 lakh or more. Starting a dedicated wedding fund early — even with a small monthly SIP — can mean you pay for the entire celebration from your corpus without any debt. This calculator helps you work backwards from the estimated wedding budget to the monthly investment you need to start today."
      how={{
        heading: "How the wedding savings SIP is calculated",
        body: (
          <>
            <p>The calculator adjusts the target wedding budget for inflation over your time horizon:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Future Cost = Today's Budget × (1 + inflation)^years
            </p>
            <p>For a 7-year horizon, balanced hybrid funds (targeting ~10% CAGR) are appropriate — long enough to benefit from some equity upside, but with enough stability to avoid a market crash wiping out the fund just before the wedding.</p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a realistic wedding budget to plan for?",
          a: "For a mid-tier urban wedding in India (2026): venue ₹3–8L, catering ₹2–5L, jewellery ₹2–5L, clothes + make-up ₹1–2L, photographer ₹1–2L, invitations + décor ₹1–2L. Total: ₹10–24L for a decent wedding. A premium wedding easily crosses ₹50L. Use your own family expectations as the input.",
        },
        {
          q: "Should I invest in equity or FD for a 5–7 year wedding goal?",
          a: "For 5–7 years, balanced hybrid funds or large-cap mutual funds are appropriate. Pure equity carries more risk for a goal this close. A 60/40 equity-debt split (or a balanced fund) targeting ~9–10% returns is a reasonable middle ground.",
        },
        {
          q: "Should the bride's family and groom's family both plan separately?",
          a: "Yes. Both sides typically have significant expenses. Each family should have their own dedicated SIP running towards the shared event. Early planning (10+ years) makes it very manageable — even a ₹5,000/month SIP started 10 years before a wedding can build ₹11–12 lakh at 10% returns.",
        },
        {
          q: "What about gold purchases for the wedding?",
          a: "Gold is a separate consideration. Sovereign Gold Bonds (SGBs) earn 2.5% p.a. interest + gold price appreciation and are tax-free on maturity — a better vehicle than physical gold purchases if you are buying gold specifically for a future wedding.",
        },
      ]}
    />
  );
}
