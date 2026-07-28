import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Investing in India — Mutual Funds, Stocks, Gold & ETFs Guide" },
  description: "Learn how to invest in India. Compare mutual funds, stocks, gold, ETFs, and fixed-income options. Free calculators for SIP, lumpsum, SWP, CAGR, and more.",
  alternates: { canonical: `${site.url}/investing` },
};

export default function Page() {
  return (
    <HubPage
      title="Investing in India"
      description="Build wealth that lasts. Whether you are a beginner picking your first mutual fund or an experienced investor diversifying into gold and ETFs, find the tools and guides you need."
      badge="Investing Hub"
      sections={[
        {
          title: "By Investment Type",
          columns: 4,
          links: [
            { title: "SIP Investing", href: "/sip", desc: "Systematic Investment Plans" },
            { title: "Mutual Funds", href: "/mutual-funds", desc: "Equity, debt, hybrid funds" },
            { title: "Stock Market", href: "/stock-market", desc: "Direct equity investing" },
            { title: "Gold", href: "/gold", desc: "SGB, gold ETFs, digital gold" },
            { title: "ETF Investing", href: "/etf", desc: "Exchange Traded Funds" },
            { title: "Index Funds", href: "/index-funds", desc: "Passive Nifty 50 investing" },
            { title: "ELSS Funds", href: "/elss", desc: "Tax-saving equity funds" },
            { title: "Fixed Income", href: "/savings", desc: "FD, bonds, debt funds" },
          ],
        },
        {
          title: "Investment Calculators",
          columns: 3,
          links: [
            { title: "SIP Calculator", href: "/calculators/sip", desc: "Monthly SIP returns with step-up and tax" },
            { title: "Lumpsum Calculator", href: "/calculators/lumpsum", desc: "One-time investment growth" },
            { title: "CAGR Calculator", href: "/calculators/cagr", desc: "Compound annual growth rate" },
            { title: "SWP Calculator", href: "/calculators/swp", desc: "Monthly withdrawals from corpus" },
            { title: "Goal SIP Calculator", href: "/calculators/goal-sip", desc: "SIP needed for any financial goal" },
            { title: "Mutual Fund Returns", href: "/calculators/mutual-fund-returns", desc: "MF lumpsum returns with CAGR" },
            { title: "Compound Interest", href: "/calculators/compound-interest", desc: "Compounding across any frequency" },
            { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Corpus and SIP for retirement" },
            { title: "Inflation Calculator", href: "/calculators/inflation", desc: "Future value adjusted for inflation" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 4,
          links: [
            { title: "SIP", href: "/glossary/sip", desc: "Systematic Investment Plan" },
            { title: "Mutual Fund", href: "/glossary/mutual-fund", desc: "Pooled investment vehicle" },
            { title: "NAV", href: "/glossary/nav", desc: "Net Asset Value" },
            { title: "CAGR", href: "/glossary/cagr", desc: "Compound Annual Growth Rate" },
            { title: "Diversification", href: "/glossary/diversification", desc: "Spreading risk across assets" },
            { title: "Expense Ratio", href: "/glossary/expense-ratio", desc: "What funds charge you" },
            { title: "Asset Allocation", href: "/glossary/asset-allocation", desc: "Split across equity, debt, gold" },
            { title: "LTCG", href: "/glossary/long-term-capital-gains", desc: "Long-term capital gains tax" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "SIP", href: "/sip" },
        { title: "Mutual Funds", href: "/mutual-funds" },
        { title: "Retirement", href: "/retirement" },
        { title: "Financial Independence", href: "/financial-independence" },
      ]}
    />
  );
}
