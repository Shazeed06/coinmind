import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Budgeting & Money Management India — Free Budget Planner & Guides" },
  description: "Take control of your money. Free budget planner, 50/30/20 rule guide, expense tracking, emergency fund calculator, and money management tips for India.",
  alternates: { canonical: `${site.url}/budgeting` },
};

export default function Page() {
  return (
    <HubPage
      title="Budgeting & Money Management"
      description="Every rupee needs a job. Learn to budget, track expenses, build an emergency fund, and manage your money so it works for you instead of the other way around."
      badge="Budgeting Hub"
      sections={[
        {
          title: "Budgeting Tools",
          columns: 2,
          links: [
            { title: "Budget Planner", href: "/tools/budget-planner", desc: "Track income, expenses, and savings goals" },
            { title: "Are You Rich?", href: "/tools/are-you-rich", desc: "See your income percentile in India" },
            { title: "Net Worth Calculator", href: "/net-worth", desc: "Track your total assets minus liabilities" },
            { title: "Goal Planning", href: "/goal-planning", desc: "Plan and track financial milestones" },
          ],
        },
        {
          title: "Budgeting Guides",
          columns: 2,
          links: [
            { title: "50/30/20 Budget Rule", href: "/blog/50-30-20-budget-rule", desc: "Simple budgeting framework with Indian examples" },
            { title: "Emergency Fund Guide", href: "/blog/emergency-fund-india", desc: "How much emergency savings you need" },
            { title: "Saving Money Tips", href: "/blog/saving-money-tips-india", desc: "Practical saving strategies for Indian households" },
            { title: "Expense Tracking Guide", href: "/blog/expense-tracking", desc: "How to track expenses without spreadsheets" },
          ],
        },
        {
          title: "Related Calculators",
          columns: 3,
          links: [
            { title: "Take-Home Salary Calculator", href: "/calculators/take-home-salary", desc: "Know your real in-hand pay" },
            { title: "Inflation Calculator", href: "/calculators/inflation", desc: "See how inflation affects your budget" },
            { title: "EMI Calculator", href: "/calculators/emi", desc: "Plan your loan EMIs" },
            { title: "Goal SIP Calculator", href: "/calculators/goal-sip", desc: "Save for specific goals" },
            { title: "FD Calculator", href: "/calculators/fd", desc: "Grow your emergency fund" },
            { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Plan your retirement savings" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Savings", href: "/savings" },
        { title: "Salary", href: "/salary" },
        { title: "Investing", href: "/investing" },
        { title: "Financial Independence", href: "/financial-independence" },
      ]}
    />
  );
}
