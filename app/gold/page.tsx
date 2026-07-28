import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Gold Investment India — SGB, Gold ETFs, Digital Gold Guide 2026" },
  description: "Complete guide to investing in gold in India. Compare Sovereign Gold Bonds, Gold ETFs, digital gold, and physical gold. Returns, tax, safety, and liquidity compared.",
  alternates: { canonical: `${site.url}/gold` },
};

export default function Page() {
  return (
    <HubPage
      title="Gold Investment in India"
      description="Gold has never been more accessible. Compare Sovereign Gold Bonds, Gold ETFs, digital gold, and physical gold across returns, tax, safety, and liquidity. Find the right gold investment for you."
      badge="Gold Hub"
      sections={[
        {
          title: "Gold Investment Guides",
          columns: 2,
          links: [
            { title: "Gold Investment Guide 2026", href: "/blog/gold-investment-guide-india", desc: "SGB vs Gold ETFs vs Digital Gold vs Physical — full comparison" },
            { title: "What are Sovereign Gold Bonds?", href: "/glossary/sovereign-gold-bond", desc: "SGB features, interest, tax benefits, and maturity" },
            { title: "Gold ETFs Explained", href: "/glossary/gold-etf", desc: "How gold exchange-traded funds work" },
            { title: "Digital Gold Guide", href: "/glossary/digital-gold", desc: "Buying and selling gold online" },
            { title: "Gold vs Mutual Funds", href: "/blog/gold-vs-mutual-funds", desc: "Which investment performs better long-term?" },
            { title: "Gold Price Today", href: "/blog/gold-price-today", desc: "Factors affecting gold prices in India" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "Sovereign Gold Bond", href: "/glossary/sovereign-gold-bond", desc: "Government gold bonds explained" },
            { title: "Gold ETF", href: "/glossary/gold-etf", desc: "Gold exchange-traded funds" },
            { title: "Digital Gold", href: "/glossary/digital-gold", desc: "Online gold investment" },
            { title: "Hallmark", href: "/glossary/hallmark", desc: "Gold purity certification" },
            { title: "LTCG on Gold", href: "/glossary/long-term-capital-gains", desc: "Capital gains tax on gold" },
            { title: "Diversification", href: "/glossary/diversification", desc: "Why gold belongs in your portfolio" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Investing", href: "/investing" },
        { title: "ETF & Index Funds", href: "/etf" },
        { title: "Savings", href: "/savings" },
        { title: "Tax", href: "/income-tax" },
      ]}
    />
  );
}
