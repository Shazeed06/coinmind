import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "CIBIL Score & Credit Score Guide India — Improve Your Credit Health" },
  description: "Learn how credit scores work in India. Check your CIBIL score, understand what affects it, and improve your credit health for better loan approvals and lower interest rates.",
  alternates: { canonical: `${site.url}/credit-score` },
};

export default function Page() {
  return (
    <HubPage
      title="Credit Score & CIBIL"
      description="Your credit score is your financial reputation. Understand how it's calculated, what affects it, and how to improve it for better loan terms and credit card approvals."
      badge="Credit Hub"
      sections={[
        {
          title: "Credit Score Guides",
          columns: 2,
          links: [
            { title: "What is CIBIL Score?", href: "/glossary/cibil-score", desc: "How CIBIL scores are calculated and what they mean" },
            { title: "How to Check CIBIL Score", href: "/blog/how-to-check-cibil-score", desc: "Free ways to check your credit score in India" },
            { title: "How to Improve Credit Score", href: "/blog/improve-credit-score", desc: "10 proven ways to boost your CIBIL score" },
            { title: "Credit Score vs CIBIL Score", href: "/blog/credit-score-vs-cibil", desc: "Understanding the difference between credit bureaus" },
            { title: "Minimum CIBIL for Home Loan", href: "/blog/cibil-home-loan", desc: "What credit score you need for home loan approval" },
            { title: "CIBIL Score for Personal Loan", href: "/blog/cibil-personal-loan", desc: "Credit score requirements for unsecured loans" },
          ],
        },
        {
          title: "Related Calculators",
          columns: 3,
          links: [
            { title: "EMI Calculator", href: "/calculators/emi", desc: "See how EMIs affect your credit utilization" },
            { title: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility", desc: "Check eligibility based on FOIR" },
            { title: "Personal Loan EMI", href: "/calculators/personal-loan-emi", desc: "Calculate personal loan EMIs" },
            { title: "Car Loan EMI", href: "/calculators/car-loan-emi", desc: "Auto loan EMI calculator" },
            { title: "Education Loan EMI", href: "/calculators/education-loan-emi", desc: "Student loan repayment calculator" },
            { title: "Budget Planner", href: "/tools/budget-planner", desc: "Plan payments to improve credit health" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 4,
          links: [
            { title: "CIBIL Score", href: "/glossary/cibil-score", desc: "Credit score explained" },
            { title: "Credit Utilization", href: "/glossary/credit-utilization", desc: "How much credit you use matters" },
            { title: "Credit Report", href: "/glossary/credit-report", desc: "Your credit history summary" },
            { title: "FOIR", href: "/glossary/foir", desc: "Fixed Obligation to Income Ratio" },
            { title: "Default", href: "/glossary/default", desc: "What happens when you miss payments" },
            { title: "EMI", href: "/glossary/emi", desc: "Equated Monthly Installment" },
            { title: "Amortisation", href: "/glossary/amortisation", desc: "How loan payments work" },
            { title: "Secured vs Unsecured Loan", href: "/glossary/secured-vs-unsecured-loan", desc: "Collateral and loan types" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Loans", href: "/loans" },
        { title: "Credit Cards", href: "/credit-cards" },
        { title: "Budgeting", href: "/budgeting" },
        { title: "Salary", href: "/salary" },
      ]}
    />
  );
}
