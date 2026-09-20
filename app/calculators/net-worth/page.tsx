import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import NetWorthCalculator from "@/components/calc/NetWorthCalculator";

export const metadata = calcMeta(
  "net-worth",
  "Net Worth Calculator India – Know Your Financial Position",
  "Calculate your net worth instantly by listing your assets and liabilities. Track your financial health with India's simplest net worth tracker."
);

export default function Page() {
  return (
    <CalcPage
      slug="net-worth"
      title="Net Worth Calculator"
      subtitle="List your assets and liabilities to see your true financial position in seconds."
      calculator={<NetWorthCalculator />}
      sources={[
        { label: "Reserve Bank of India – Household Financial Savings", href: "https://www.rbi.org.in" },
        { label: "SEBI – Investor Education", href: "https://investor.sebi.gov.in" },
      ]}
      intro="Your net worth is the single most important number in personal finance — it tells you where you actually stand. It is calculated by adding up everything you own (assets: cash, investments, EPF, real estate, gold) and subtracting everything you owe (liabilities: home loan, car loan, credit card balances). A positive and growing net worth is a sign of financial health; a negative one means your debts exceed your assets. This calculator lets you enter any combination of assets and liabilities to see your net worth instantly — and you can add custom rows to match your own situation."
      how={{
        heading: "How net worth is calculated",
        body: (
          <>
            <p>
              Net worth is straightforward: subtract what you owe from what you own.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Net Worth = Total Assets − Total Liabilities
            </p>
            <p>
              <strong>Assets</strong> include liquid assets (cash, savings accounts, fixed deposits), investment assets (mutual funds, stocks, PPF, NPS, EPF), physical assets (real estate at current market value, gold, vehicles), and any other valuables.
            </p>
            <p>
              <strong>Liabilities</strong> include all outstanding loan balances (home loan, car loan, personal loan, education loan) and revolving credit (credit card outstanding, buy-now-pay-later balances).
            </p>
            <p>
              Use current market values for assets — not purchase price. For real estate, use what you could sell it for today, not what you paid.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a good net worth at my age?",
          a: "A commonly cited benchmark (from Thomas Stanley's research) is: net worth ≈ age × gross annual income / 10. So at age 30 with ₹10 LPA income, a rough target is ₹30 lakh. However, these are rough guidelines — what matters most is that your net worth is positive and growing year over year.",
        },
        {
          q: "Should I include my house in net worth?",
          a: "Yes, but use the current market value and subtract any outstanding home loan. Your home is an asset — but note it is also illiquid. Many financial planners track 'liquid net worth' (excluding primary residence) as a separate metric.",
        },
        {
          q: "Should I include my EPF in net worth?",
          a: "Yes. Your EPF accumulation is your money and should be counted as an asset. You can find the current balance on the EPFO member portal or your payslip.",
        },
        {
          q: "How often should I calculate my net worth?",
          a: "Once a quarter is a good cadence. Annual reviews tied to your birthday or the financial year end (March 31) also work well. The goal is to track the trend over time, not stress about daily fluctuations.",
        },
        {
          q: "What does a negative net worth mean?",
          a: "It means your liabilities exceed your assets. This is common early in life — especially after an education loan or home purchase. The priority should be paying down high-interest debt (personal loans, credit cards) first, while building liquid assets.",
        },
      ]}
    />
  );
}
