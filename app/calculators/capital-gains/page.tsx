import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import CapitalGainsCalculator from "@/components/calc/CapitalGainsCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "capital-gains")!;
export const metadata = calcMeta("capital-gains", CALC.title + " - LTCG & STCG", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="capital-gains"
      title="Capital Gains Tax Calculator"
      subtitle="Work out LTCG and STCG on shares, mutual funds, property and gold under FY 2026-27 rules."
      calculator={<CapitalGainsCalculator />}
      intro="Capital gains tax is the tax you pay on the profit made when you sell an asset (shares, mutual funds, property or gold) for more than you paid for it. How much you owe depends on the type of asset and how long you held it, because gains are split into short-term (STCG) and long-term (LTCG), each taxed differently. This capital gains tax calculator applies the FY 2026-27 rules for India to your buy price, sell price and holding period, then shows the gain, whether it is STCG or LTCG, any exemption, the taxable amount, the tax and your net proceeds. It works as an LTCG calculator and STCG calculator in one."
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
          a: "Short-term capital gains (STCG) arise when you sell within the holding threshold: 12 months for listed equity, 24 months for property and gold. Long-term capital gains (LTCG) apply beyond that. LTCG usually attracts a lower rate: 12.5% for equity above the ₹1,25,000 exemption, versus 20% STCG on equity.",
        },
        {
          q: "How much LTCG is tax-free on shares?",
          a: "For listed equity and equity mutual funds, long-term capital gains up to ₹1,25,000 in a financial year are exempt. Only the gain above ₹1,25,000 is taxed, at 12.5%. This exemption does not apply to property, gold or debt funds, which follow different rules.",
        },
        {
          q: "How is capital gains tax on property calculated?",
          a: "When you sell property held for more than 24 months, the long-term gain is taxed at 12.5% without indexation under the rules introduced in 2024. Sold within 24 months, the gain is short-term and added to your income at your slab rate. Always confirm the figure with the Income Tax Department and a SEBI-registered adviser, as rules change often.",
        },
        {
          q: "Can I set off capital losses against capital gains?",
          a: "Yes, within limits. A short-term capital loss can be set off against both short-term and long-term gains, but a long-term capital loss can only be set off against long-term gains. Capital losses can never be set off against salary or business income. Any unabsorbed loss can be carried forward for up to eight assessment years, but only if you file your return by the due date. Keep contract notes as proof.",
        },
        {
          q: "How are debt mutual funds taxed?",
          a: "Gains on specified debt mutual funds are added to your income and taxed at your slab rate regardless of how long you held them, so there is no concessional long-term rate and no Rs 1,25,000 exemption. That makes a debt fund broadly comparable to a fixed deposit on tax, though the tax is deferred until you redeem rather than accruing yearly. Check your fund's equity allocation, since hybrid funds can fall under different rules.",
        },
        {
          q: "How can I save tax on long-term capital gains from property?",
          a: "The Income Tax Act allows reinvestment reliefs. Section 54 exempts the gain if you buy or build another residential house within the prescribed window, and Section 54F offers similar relief when you sell an asset other than a house. Section 54EC lets you park the gain in specified bonds within six months, subject to an investment ceiling of Rs 50 lakh. Conditions and limits are detailed, so verify the current text on incometax.gov.in before you rely on any of them.",
        },
        {
          q: "Do I pay capital gains tax on inherited or gifted assets?",
          a: "You pay nothing at the moment you inherit an asset, but tax arises when you eventually sell it. Your cost of acquisition is generally the price the previous owner paid, and the previous owner's holding period counts towards yours, which often makes the gain long-term straight away. Gifts from specified relatives are similarly not taxed on receipt but carry the donor's cost forward. Keep the original purchase documents.",
        },
      ]}
      sources={[
        { label: "Income Tax Department", href: "https://www.incometax.gov.in" },
      ]}
    />
  );
}
