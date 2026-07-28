import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "SIP Investment Guide — Systematic Investment Plans Explained" },
  description: "Complete SIP guide: calculator, step-up SIP, goal SIP, SWP, and tax on mutual fund SIPs. Learn how SIP works, how much to invest, and which strategy fits your goal.",
  alternates: { canonical: `${site.url}/sip` },
};

export default function Page() {
  return (
    <HubPage
      title="SIP & Systematic Investment Plans"
      description="Everything you need to know about SIP investing in India. Calculate returns, compare strategies, understand taxation, and find the right SIP for your financial goals."
      badge="SIP Hub"
      sections={[
        {
          title: "SIP Calculators",
          columns: 3,
          links: [
            { title: "SIP Calculator", href: "/calculators/sip", desc: "Calculate monthly SIP returns with step-up and LTCG tax impact" },
            { title: "Goal SIP Calculator", href: "/calculators/goal-sip", desc: "Find the exact SIP needed for ₹1 crore or any financial goal" },
            { title: "Step-Up SIP Calculator", href: "/calculators/step-up-sip", desc: "Compare flat vs step-up SIP returns side-by-side" },
            { title: "Lumpsum Calculator", href: "/calculators/lumpsum", desc: "Project one-time investment growth with CAGR" },
            { title: "SWP Calculator", href: "/calculators/swp", desc: "Plan monthly withdrawals from your mutual fund corpus" },
            { title: "Mutual Fund Returns Calculator", href: "/calculators/mutual-fund-returns", desc: "Project lumpsum MF returns with CAGR" },
          ],
        },
        {
          title: "SIP Guides & Strategies",
          columns: 2,
          links: [
            { title: "SIP vs Lumpsum: Which is Better?", href: "/blog/sip-vs-lumpsum", desc: "The real math comparing SIP and lump sum investing for different market conditions" },
            { title: "How Much SIP for ₹1 Crore?", href: "/blog/crorepati-sip", desc: "The exact monthly SIP amount needed to reach ₹1 crore at different time horizons" },
            { title: "Best SIP Strategies", href: "/sip/step-up-sip-benefits", desc: "Smart SIP strategies: step-up, value averaging, and goal-based investing" },
            { title: "SIP for Beginners", href: "/sip/sip-for-beginners", desc: "Step-by-step guide to starting your first SIP in India" },
            { title: "SIP Taxation Guide", href: "/sip/sip-taxation", desc: "How SIP capital gains are taxed — LTCG, STCG, and grandfathering explained" },
            { title: "SIP Mistakes to Avoid", href: "/sip/sip-mistakes", desc: "Common SIP investing mistakes that cost you returns and how to avoid them" },
          ],
        },
        {
          title: "SIP by Amount",
          columns: 4,
          links: [
            { title: "₹1,000 SIP Monthly", href: "/sip-returns/1000-sip-for-1-year", desc: "Returns from ₹1,000 monthly SIP" },
            { title: "₹2,000 SIP Monthly", href: "/sip-returns/2000-sip-for-1-year", desc: "Returns from ₹2,000 monthly SIP" },
            { title: "₹3,000 SIP Monthly", href: "/sip-returns/3000-sip-for-1-year", desc: "Returns from ₹3,000 monthly SIP" },
            { title: "₹5,000 SIP Monthly", href: "/sip-returns/5000-sip-for-1-year", desc: "Returns from ₹5,000 monthly SIP" },
            { title: "₹10,000 SIP Monthly", href: "/sip-returns/10000-sip-for-1-year", desc: "Returns from ₹10,000 monthly SIP" },
            { title: "₹15,000 SIP Monthly", href: "/sip-returns/15000-sip-for-1-year", desc: "Returns from ₹15,000 monthly SIP" },
            { title: "₹20,000 SIP Monthly", href: "/sip-returns/20000-sip-for-1-year", desc: "Returns from ₹20,000 monthly SIP" },
            { title: "₹25,000 SIP Monthly", href: "/sip-returns/25000-sip-for-1-year", desc: "Returns from ₹25,000 monthly SIP" },
            { title: "₹30,000 SIP Monthly", href: "/sip-returns/30000-sip-for-1-year", desc: "Returns from ₹30,000 monthly SIP" },
            { title: "₹50,000 SIP Monthly", href: "/sip-returns/50000-sip-for-1-year", desc: "Returns from ₹50,000 monthly SIP" },
          ],
        },
        {
          title: "SIP by Duration",
          columns: 3,
          links: [
            { title: "SIP for 1 Year", href: "/sip-returns/1-lakh-sip-for-1-year", desc: "SIP returns over 1 year horizon" },
            { title: "SIP for 3 Years", href: "/sip-returns/1-lakh-sip-for-3-years", desc: "SIP returns over 3 year horizon" },
            { title: "SIP for 5 Years", href: "/sip-returns/1-lakh-sip-for-5-years", desc: "SIP returns over 5 year horizon" },
            { title: "SIP for 10 Years", href: "/sip-returns/1-lakh-sip-for-10-years", desc: "SIP returns over 10 year horizon" },
            { title: "SIP for 15 Years", href: "/sip-returns/1-lakh-sip-for-15-years", desc: "SIP returns over 15 year horizon" },
            { title: "SIP for 20 Years", href: "/sip-returns/1-lakh-sip-for-20-years", desc: "SIP returns over 20 year horizon" },
          ],
        },
        {
          title: "Related Calculators",
          columns: 3,
          links: [
            { title: "CAGR Calculator", href: "/calculators/cagr", desc: "Calculate compound annual growth rate" },
            { title: "Compound Interest Calculator", href: "/calculators/compound-interest", desc: "See compounding across daily/monthly/yearly periods" },
            { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Find the corpus and monthly SIP needed for retirement" },
            { title: "FD Calculator", href: "/calculators/fd", desc: "Compare FD returns against SIP" },
            { title: "PPF Calculator", href: "/calculators/ppf", desc: "PPF vs SIP return comparison" },
            { title: "NPS Calculator", href: "/calculators/nps", desc: "NPS vs SIP for retirement" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 4,
          links: [
            { title: "SIP Definition", href: "/glossary/sip", desc: "What is a Systematic Investment Plan" },
            { title: "Mutual Fund", href: "/glossary/mutual-fund", desc: "How mutual funds work" },
            { title: "NAV", href: "/glossary/nav", desc: "Net Asset Value explained" },
            { title: "Rupee Cost Averaging", href: "/glossary/rupee-cost-averaging", desc: "How SIP reduces market timing risk" },
            { title: "CAGR", href: "/glossary/cagr", desc: "Compound Annual Growth Rate" },
            { title: "Expense Ratio", href: "/glossary/expense-ratio", desc: "What mutual funds charge you" },
            { title: "ELSS", href: "/glossary/elss", desc: "Tax-saving mutual funds" },
            { title: "LTCG Tax", href: "/glossary/long-term-capital-gains", desc: "Long-term capital gains tax on mutual funds" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Mutual Funds", href: "/mutual-funds" },
        { title: "Investing", href: "/investing" },
        { title: "Retirement", href: "/retirement" },
        { title: "Tax", href: "/income-tax" },
      ]}
    />
  );
}
