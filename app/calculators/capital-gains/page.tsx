import type { Metadata } from "next";
import CapitalGainsCalculator from "@/components/calc/CapitalGainsCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Capital Gains Tax Calculator — LTCG & STCG" },
  description:
    "Free capital gains tax calculator for India. Work out LTCG and STCG on equity, mutual funds, property and gold under FY 2026-27 rules, with tax owed.",
  alternates: { canonical: "/calculators/capital-gains" },
};

export default function Page() {
  return (
    <CalcPage
      slug="capital-gains"
      title="Capital Gains Tax Calculator"
      subtitle="Work out LTCG and STCG on shares, mutual funds, property and gold under FY 2026-27 rules."
      calculator={<CapitalGainsCalculator />}
      intro="Capital gains tax is the tax you pay on the profit made when you sell an asset — shares, mutual funds, property or gold — for more than you paid for it. How much you owe depends on the type of asset and how long you held it, because gains are split into short-term (STCG) and long-term (LTCG), each taxed differently. This capital gains tax calculator applies the FY 2026-27 rules for India to your buy price, sell price and holding period, then shows the gain, whether it is STCG or LTCG, any exemption, the taxable amount, the tax and your net proceeds. It works as an LTCG calculator and STCG calculator in one."
      how={{
        heading: "How capital gains tax is calculated",
        body: (
          <>
            <p>Your capital gain is the sale price minus the purchase cost:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Capital gain = Sale price &minus; Purchase price
            </p>
            <p>
              The holding period then decides the category. For listed equity and
              equity mutual funds, holding for more than 12 months makes the gain{" "}
              <strong>long-term (LTCG)</strong>, taxed at 12.5% on the amount
              above a &#8377;1,25,000 exemption each financial year; 12 months or
              less is <strong>short-term (STCG)</strong>, taxed at 20%. For
              property and gold, the cut-off is 24 months: long-term gains are
              taxed at 12.5% without indexation under the rules that took effect
              in 2024, while short-term gains are added to your income and taxed
              at your slab. Debt mutual fund gains are taxed at your slab rate no
              matter how long you hold them.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a capital gains tax calculator?",
          a: "A capital gains tax calculator is an online tool that estimates the tax on the profit from selling an asset. You enter the asset type, buy price, sell price and holding period, and it classifies the gain as short-term (STCG) or long-term (LTCG), applies the exemption and rate, and shows the tax and net proceeds. This capital gains calculator India tool uses FY 2026-27 rules.",
        },
        {
          q: "What is the difference between STCG and LTCG?",
          a: "Short-term capital gains (STCG) arise when you sell within the holding threshold — 12 months for listed equity, 24 months for property and gold. Long-term capital gains (LTCG) apply beyond that. LTCG usually attracts a lower rate: 12.5% for equity above the ₹1,25,000 exemption, versus 20% STCG on equity.",
        },
        {
          q: "How much LTCG is tax-free on shares?",
          a: "For listed equity and equity mutual funds, long-term capital gains up to ₹1,25,000 in a financial year are exempt. Only the gain above ₹1,25,000 is taxed, at 12.5%. This exemption does not apply to property, gold or debt funds, which follow different rules.",
        },
        {
          q: "How is capital gains tax on property calculated?",
          a: "When you sell property held for more than 24 months, the long-term gain is taxed at 12.5% without indexation under the rules introduced in 2024. Sold within 24 months, the gain is short-term and added to your income at your slab rate. Always confirm the figure with the Income Tax Department and a SEBI-registered adviser, as rules change often.",
        },
      ]}
      sources={[
        { label: "Income Tax Department", href: "https://www.incometax.gov.in" },
      ]}
    />
  );
}
