import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import GoalCalculator from "@/components/calc/GoalCalculator";

export const metadata = calcMeta(
  "goal-car",
  "Car Savings Calculator – Monthly SIP to Buy a Car Without Loan",
  "Calculate how much to save monthly to buy a car in India without a loan. Compare the cost of saving vs taking an auto loan."
);

export default function Page() {
  return (
    <CalcPage
      slug="goal-car"
      title="Car Savings Calculator"
      subtitle="Find the monthly investment needed to buy a car without a loan — and save on interest."
      calculator={
        <GoalCalculator
          initialGoal={1000000}
          initialYears={3}
          initialReturn={7}
          initialInflation={5}
          initialInflationAdjust={true}
        />
      }
      sources={[
        { label: "AMFI – Mutual Fund Returns Data", href: "https://www.amfiindia.com" },
        { label: "RBI – Consumer Loans Data", href: "https://www.rbi.org.in" },
      ]}
      intro="A car is a depreciating asset — it loses value the moment you drive it out of the showroom. Taking a car loan at 9–12% interest to buy something that depreciates 15–20% in the first year is one of the most expensive financial decisions most Indians make. The better approach: save aggressively for 2–3 years in a short-term debt fund or liquid fund, then buy the car outright. This calculator shows you exactly how much to invest monthly to hit your car budget — and you avoid paying ₹1.5–3 lakh in interest."
      how={{
        heading: "How the car savings plan is calculated",
        body: (
          <>
            <p>For a 3-year car goal, we use a conservative 7% return — appropriate for liquid funds, ultra-short-term debt funds, or recurring deposits that won't lose value in a short-term market dip.</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Monthly SIP = Target × r / [(1+r)^n − 1] / (1+r)
            </p>
            <p>Car prices in India tend to rise ~5% per year (new models + import costs), so inflation adjustment is on by default. Adjust the goal amount to your specific car budget.</p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Is it better to save for a car or take a car loan?",
          a: "Saving is almost always better. A ₹10L car loan at 10% for 5 years costs ₹2.75L in interest — plus you pay insurance on a depreciating asset throughout. If you can delay 3 years and save ₹22,000/month at 7%, you'll have ₹10L to buy the same car without any interest cost. The only exception: if you genuinely need the car immediately for work or family needs.",
        },
        {
          q: "What if I want a car in 1–2 years?",
          a: "For a 1–2 year horizon, use only liquid funds or FDs (6–7%). Equity is too volatile for a 1-year goal — a 20% market drop would reduce your corpus significantly right when you need it. Set the expected return to 6–7% in the calculator.",
        },
        {
          q: "Should I save for the full on-road price?",
          a: "Yes — save for the on-road price, which includes ex-showroom price + registration + insurance + accessories. On-road price is typically 15–20% higher than the ex-showroom sticker price. For a ₹10L ex-showroom car, budget ₹11.5–12L.",
        },
        {
          q: "Can I use a recurring deposit (RD) instead of a mutual fund?",
          a: "Yes — an RD at a bank or post office is completely safe and gives ~6.5–7% returns. The downside: RD interest is taxable as per your income slab. A liquid mutual fund (which also targets ~7%) is more tax-efficient if you are in the 30% bracket, since you control when you redeem.",
        },
      ]}
    />
  );
}
