import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Savings Guide India — FD, PPF, NPS, NSC, SSY & Post Office Schemes" },
  description: "Compare India's best savings schemes: FD, PPF, NPS, NSC, Sukanya Samriddhi, SCSS, and Post Office MIS. Calculate returns, compare tax benefits, and find the right savings plan.",
  alternates: { canonical: `${site.url}/savings` },
};

export default function Page() {
  return (
    <HubPage
      title="Savings & Investment Schemes"
      description="Choose the right savings scheme for your goals. Compare returns, tax benefits, lock-in periods, and risk across all major Indian savings instruments."
      badge="Savings Hub"
      sections={[
        {
          title: "Savings Calculators",
          columns: 3,
          links: [
            { title: "FD Calculator", href: "/calculators/fd", desc: "Fixed deposit maturity with quarterly compounding" },
            { title: "PPF Calculator", href: "/calculators/ppf", desc: "15-year Public Provident Fund maturity" },
            { title: "NPS Calculator", href: "/calculators/nps", desc: "Pension corpus and monthly annuity estimate" },
            { title: "EPF Calculator", href: "/calculators/epf", desc: "Employee Provident Fund maturity at retirement" },
            { title: "NSC Calculator", href: "/calculators/nsc", desc: "National Savings Certificate maturity" },
            { title: "SCSS Calculator", href: "/calculators/scss", desc: "Senior Citizen Savings Scheme quarterly payout" },
            { title: "Sukanya Samriddhi Calculator", href: "/calculators/sukanya-samriddhi", desc: "SSY tax-free corpus for girl child" },
            { title: "Post Office MIS Calculator", href: "/calculators/post-office-mis", desc: "Monthly Income Scheme fixed payout" },
            { title: "Recurring Deposit Calculator", href: "/calculators/rd", desc: "RD maturity with monthly deposits" },
          ],
        },
        {
          title: "FD by Bank",
          columns: 4,
          links: [
            { title: "SBI FD Calculator", href: "/calculators/fd/sbi-fd-rates", desc: "SBI fixed deposit rates and maturity" },
            { title: "HDFC FD Calculator", href: "/calculators/fd/hdfc-fd-rates", desc: "HDFC fixed deposit rates and maturity" },
            { title: "ICICI FD Calculator", href: "/calculators/fd/icici-fd-rates", desc: "ICICI fixed deposit rates and maturity" },
            { title: "Post Office FD Calculator", href: "/calculators/fd/post-office-fd-rates", desc: "Post Office time deposit rates" },
          ],
        },
        {
          title: "Comparisons",
          columns: 2,
          links: [
            { title: "PPF vs FD vs NPS", href: "/blog/ppf-vs-fd-vs-nps", desc: "Returns, tax, lock-in, and who each suits best" },
            { title: "FD vs RD", href: "/blog/fd-vs-rd", desc: "Fixed deposit vs recurring deposit comparison" },
            { title: "PPF vs EPF", href: "/blog/ppf-vs-epf", desc: "Public Provident Fund vs Employee Provident Fund" },
            { title: "Savings Account vs FD", href: "/blog/savings-vs-fd", desc: "Savings account interest vs fixed deposit returns" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "Fixed Deposit", href: "/glossary/fixed-deposit", desc: "What is an FD and how it works" },
            { title: "PPF", href: "/glossary/ppf", desc: "Public Provident Fund explained" },
            { title: "NPS", href: "/glossary/nps", desc: "National Pension System" },
            { title: "EPF", href: "/glossary/epf", desc: "Employee Provident Fund" },
            { title: "Compound Interest", href: "/glossary/compound-interest", desc: "How compounding grows your savings" },
            { title: "Section 80C", href: "/glossary/section-80c", desc: "Tax deductions for savings" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Retirement", href: "/retirement" },
        { title: "Investing", href: "/investing" },
        { title: "Tax", href: "/income-tax" },
        { title: "Budgeting", href: "/budgeting" },
      ]}
    />
  );
}
