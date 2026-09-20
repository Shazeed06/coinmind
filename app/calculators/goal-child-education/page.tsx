import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import GoalCalculator from "@/components/calc/GoalCalculator";

export const metadata = calcMeta(
  "goal-child-education",
  "Child Education Planning Calculator – How Much to Save Monthly",
  "Calculate the monthly SIP needed to fund your child's college education in India. Accounts for education inflation (8–10%) and your existing savings."
);

export default function Page() {
  return (
    <CalcPage
      slug="goal-child-education"
      title="Child Education Planning Calculator"
      subtitle="Find the monthly SIP needed to fund your child's higher education — accounting for education inflation of 8–10%."
      calculator={
        <GoalCalculator
          initialGoal={2000000}
          initialYears={15}
          initialReturn={12}
          initialInflation={8}
          initialInflationAdjust={true}
        />
      }
      sources={[
        { label: "AMFI – Mutual Fund SIP Data", href: "https://www.amfiindia.com" },
        { label: "RBI – Consumer Price Index", href: "https://www.rbi.org.in" },
        { label: "MoE – Education Statistics India", href: "https://www.education.gov.in" },
      ]}
      intro="Education is one of the biggest financial goals for Indian parents. The cost of quality higher education in India has been rising at 8–10% per year — much faster than general inflation. A private engineering or medical college that costs ₹20 lakh today could cost ₹50–60 lakh in 15 years. This calculator helps you figure out exactly how much you need to invest every month, starting today, to fully fund your child's education — with no compromises."
      how={{
        heading: "How the child education SIP is calculated",
        body: (
          <>
            <p>The calculator first adjusts the education cost for future inflation:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Future Cost = Today's Cost × (1 + 8%)^years
            </p>
            <p>Any savings you have already set aside for education are grown at the expected return and subtracted from this future cost. The remaining amount is then converted into a monthly SIP using the annuity formula.</p>
            <p>We default to 8% education inflation (vs 6% general CPI) because college fees, coaching, and living expenses have historically risen faster than the overall price index.</p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Why does the calculator use 8% inflation for education?",
          a: "Education costs in India have risen at 8–10% per year over the last decade — significantly faster than the 5–6% general CPI inflation. Private college fees, hostel costs, and coaching institute fees all compound quickly. Using general inflation (6%) underestimates the actual future cost by 20–30% over 15 years.",
        },
        {
          q: "What return should I assume for a 15-year child education goal?",
          a: "For a 15-year horizon, equity mutual funds (Nifty 50 index fund or diversified large-cap) have historically delivered 12–14% CAGR. Since you have a long runway, you can start with 100% equity and gradually shift to debt/FD in the last 3 years as the goal approaches.",
        },
        {
          q: "Should I use a separate plan for my child's education?",
          a: "Yes. Keeping education savings separate from your retirement or emergency fund prevents you from accidentally dipping into it. Use a dedicated SIP in a child-plan mutual fund or simply a large-cap index fund held in a separate folio.",
        },
        {
          q: "What if my child doesn't pursue college right at 18?",
          a: "Extend the goal by 2–3 years (e.g., 17–18 years instead of 15). The extra time significantly reduces the monthly SIP needed and gives your corpus more time to compound. The calculator is flexible — adjust the time horizon as your child's plans become clearer.",
        },
        {
          q: "Is the Sukanya Samriddhi Yojana useful for education?",
          a: "SSY is specifically designed for a girl child and allows partial withdrawal (up to 50%) after the child turns 18, which can be used for education. It currently offers 8.2% tax-free returns — comparable to debt funds but fully government-guaranteed. For a daughter's education goal, SSY + equity SIP together is a strong combination.",
        },
      ]}
    />
  );
}
