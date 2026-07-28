import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Retirement Planning India — NPS, PPF, EPF & SWP Guide 2026" },
  description: "Plan a comfortable retirement in India. Calculate your retirement corpus, compare NPS vs PPF vs EPF, plan SWP income, and build a pension that lasts 30+ years.",
  alternates: { canonical: `${site.url}/retirement` },
};

export default function Page() {
  return (
    <HubPage
      title="Retirement Planning"
      description="Retire with confidence. Calculate the corpus you need, choose the right retirement vehicles, and plan a sustainable withdrawal strategy for your post-work life."
      badge="Retirement Hub"
      sections={[
        {
          title: "Retirement Calculators",
          columns: 2,
          links: [
            { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Corpus needed and monthly SIP to get there" },
            { title: "NPS Calculator", href: "/calculators/nps", desc: "Pension corpus, tax-free lump sum, and monthly annuity" },
            { title: "PPF Calculator", href: "/calculators/ppf", desc: "15-year tax-free retirement savings vehicle" },
            { title: "EPF Calculator", href: "/calculators/epf", desc: "Employee Provident Fund corpus at retirement" },
            { title: "SWP Calculator", href: "/calculators/swp", desc: "Plan monthly withdrawals from retirement corpus" },
            { title: "Step-Up SIP Calculator", href: "/calculators/step-up-sip", desc: "Top-up SIP strategy for retirement goals" },
          ],
        },
        {
          title: "Retirement Strategies",
          columns: 2,
          links: [
            { title: "FIRE in India", href: "/blog/fire-retire-early-india", desc: "The real corpus you need for financial independence in India" },
            { title: "NPS Explained", href: "/blog/nps-explained", desc: "Complete guide to NPS tiers, tax benefits, and returns" },
            { title: "PPF vs FD vs NPS", href: "/blog/ppf-vs-fd-vs-nps", desc: "Where should you save for retirement?" },
            { title: "How Much for Retirement?", href: "/blog/how-much-retirement-corpus", desc: "Calculating your retirement number the right way" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "NPS", href: "/glossary/nps", desc: "National Pension System" },
            { title: "PPF", href: "/glossary/ppf", desc: "Public Provident Fund" },
            { title: "EPF", href: "/glossary/epf", desc: "Employee Provident Fund" },
            { title: "Annuity", href: "/glossary/annuity", desc: "Regular pension payments explained" },
            { title: "SWP", href: "/glossary/systematic-withdrawal-plan", desc: "Systematic Withdrawal Plan" },
            { title: "4% Rule", href: "/glossary/4-percent-rule", desc: "Safe withdrawal rate for retirement" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Investing", href: "/investing" },
        { title: "Savings", href: "/savings" },
        { title: "Tax", href: "/income-tax" },
        { title: "Financial Independence", href: "/financial-independence" },
      ]}
    />
  );
}
