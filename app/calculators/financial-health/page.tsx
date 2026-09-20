import { calcMeta } from "@/lib/seo";
import CalcPage from "@/components/calc/CalcPage";
import FinancialHealthCalculator from "@/components/calc/FinancialHealthCalculator";

export const metadata = calcMeta(
  "financial-health",
  "Financial Health Score Calculator – Free Checkup 2026",
  "Get your personal financial health score in seconds. Calculates savings rate, emergency fund, debt ratio, investments, and insurance — with actionable insights."
);

export default function Page() {
  return (
    <CalcPage
      slug="financial-health"
      title="Financial Health Score Calculator"
      subtitle="Answer 8 questions and get an instant A–D score across 5 financial health dimensions."
      calculator={<FinancialHealthCalculator />}
      sources={[
        { label: "Reserve Bank of India – Household Financial Savings", href: "https://www.rbi.org.in" },
        { label: "SEBI – Investor Awareness Guidelines", href: "https://investor.sebi.gov.in" },
        { label: "NISM – Financial Literacy Framework", href: "https://www.nism.ac.in" },
      ]}
      intro="Your financial health is more than just your bank balance. This calculator scores you across five dimensions — savings rate, emergency fund coverage, debt burden, investment rate, and insurance protection — and gives you an A–D grade for each, plus personalised insights on what to fix first. Use it as a quick annual checkup to track your progress."
      how={{
        heading: "How the score is calculated",
        body: (
          <>
            <p>Each of the five categories has a maximum points value (totalling 100):</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Savings Rate (25 pts)</strong> — scored on % of income saved (30%+ = full marks)</li>
              <li><strong>Emergency Fund (20 pts)</strong> — scored on months of expenses covered (6+ = full marks)</li>
              <li><strong>Debt Health (20 pts)</strong> — scored on debt-to-income ratio (&lt;20% = full marks)</li>
              <li><strong>Investment Rate (20 pts)</strong> — scored on % of income invested (20%+ = full marks)</li>
              <li><strong>Insurance (15 pts)</strong> — 8 pts for health, 7 pts for term life insurance</li>
            </ul>
            <p>A = 80–100, B = 60–79, C = 40–59, D = below 40.</p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a good financial health score?",
          a: "80+ is excellent, 60–79 is good, 40–59 is fair, and below 40 needs attention. Most Indian salaried professionals in their 30s score in the 40–60 range. Focus first on emergency fund (most neglected), then debt reduction, then increasing investment rate.",
        },
        {
          q: "What savings rate should I aim for?",
          a: "Financial planners recommend 20–30% of take-home income. The average Indian household saves 17–22%, but this includes EPF. Aim for at least 30% for financial independence by 50. Even 10% is better than 0% — automate it via SIP so it happens before you can spend it.",
        },
        {
          q: "How much emergency fund do I need?",
          a: "3–6 months of monthly expenses in a liquid account (savings account or liquid mutual fund). If you're self-employed or have dependents, aim for 9–12 months. Keep it accessible — not in equity or FDs with lock-in periods.",
        },
        {
          q: "What is a healthy debt-to-income ratio?",
          a: "Total EMIs should be under 35–40% of gross monthly income. If your home loan EMI alone exceeds 30% of income, you're stretched. Above 50% DTI, prioritise repayment over new investments (after maintaining emergency fund and insurance).",
        },
        {
          q: "Why is insurance a part of financial health?",
          a: "Insurance is the foundation. A single hospitalisation without health insurance can wipe out years of savings. Term life insurance (if you have dependents) protects your family against income loss — and it costs as little as ₹700–1,500/month for ₹1 crore cover at age 30–35.",
        },
      ]}
    />
  );
}
