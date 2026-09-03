import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import SalesTaxCalculator from "@/components/calc/SalesTaxCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "sales-tax")!;
export const metadata = calcMeta("sales-tax", CALC.title + " - Add or Remove Tax", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="sales-tax"
      title="Sales Tax & VAT Calculator"
      subtitle="Add tax to a net price or extract the tax from a gross total, at any rate."
      calculator={<SalesTaxCalculator />}
      intro="This sales tax and VAT calculator works both ways. In 'Add tax' mode it takes a net (pre-tax) amount and shows the tax and the gross total, perfect for pricing and quotes. In 'Remove tax' mode it takes a tax-inclusive total and extracts the underlying net amount and the tax within it, handy for expenses, receipts and bookkeeping. Set any rate, so it covers US sales tax, UK VAT at 20%, and EU VAT rates alike."
      how={{
        heading: "How the tax is calculated",
        body: (
          <>
            <p>
              Adding tax multiplies the net amount by the tax rate and adds it
              on. Removing tax reverses this by dividing the gross total by one
              plus the rate:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              add: total = net × (1 + rate ÷ 100) · remove: net = total ÷ (1 +
              rate ÷ 100)
            </p>
            <p>
              For example, adding 20% VAT to a $100 net price gives $20 of tax
              and a $120 total. Working backwards, a $120 gross total at 20%
              contains $20 of VAT and a $100 net amount. Note you divide
              by 1.20, not simply take 20% off. This is the correct way to
              extract VAT from a receipt.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How do I add sales tax to a price?",
          a: "Multiply the net price by the tax rate to get the tax, then add it on. At a 7% sales tax rate, a $50 item has $3.50 of tax for a $53.50 total. Set 'Add tax' mode above, enter your amount and rate, and the calculator shows the tax and total instantly.",
        },
        {
          q: "How do I remove VAT from a gross total?",
          a: "Divide the tax-inclusive total by 1 plus the rate as a decimal. To strip 20% VAT from a £120 total, divide by 1.20 to get a £100 net amount and £20 of VAT. Choosing 'Remove tax' mode does this extraction for you, useful for expenses and accounting.",
        },
        {
          q: "Does this work as a VAT calculator for the UK and EU?",
          a: "Yes. VAT is a percentage tax just like US sales tax, so this add tax calculator works for any rate: UK VAT at 20%, reduced 5% rates, or any EU country's standard rate. Just type the rate you need and switch between adding and removing tax.",
        },
        {
          q: "How is this different from a GST calculator?",
          a: "The maths is identical. GST, VAT and sales tax are all percentage-based consumption taxes. If you specifically need Indian GST with CGST/SGST/IGST splits and the 5/12/18/28% slabs, use our dedicated GST calculator linked from the tool above.",
        },
        {
          q: "What is the VAT fraction and how do I use it?",
          a: "The VAT fraction is a shortcut for pulling tax out of a gross total in one multiplication. At a 20% rate it is 1/6, so a 120 gross total contains 120 ÷ 6 = 20 of VAT. At a 5% rate the fraction is 1/21. It gives the same answer as dividing by 1 plus the rate and then subtracting, just in fewer steps, which is why bookkeepers use it when working through a pile of receipts by hand.",
        },
        {
          q: "How do I work out the tax rate from the net and gross amounts?",
          a: "Divide the tax by the net amount and multiply by 100. If a receipt shows a 250 net figure and a 300 total, the tax is 50, so the rate is (50 ÷ 250) × 100 = 20%. You can also divide the gross by the net and subtract 1: 300 ÷ 250 = 1.2, so the rate is 20%. Always divide by the net figure, never by the gross, or you will understate the rate.",
        },
        {
          q: "Is the sales tax rate the same across the United States?",
          a: "No. There is no federal sales tax in the US. Each state sets its own rate, and counties and cities frequently add local rates on top, so the combined figure at the till varies from zero in a handful of states to around 10% in some cities. Rates also differ by product category, with groceries and prescription medicines often exempt or reduced. Enter the exact combined rate for your location rather than a state average.",
        },
        {
          q: "Should sales tax or VAT be charged on shipping?",
          a: "It varies by jurisdiction. Many US states treat delivery charges as taxable when the goods themselves are taxable, while a few exempt separately stated shipping. In the UK and EU, postage charged as part of a supply of goods usually takes the VAT rate of the goods being sent. If shipping is taxable, add it to the net amount before you calculate, then run the combined figure through the add tax mode above.",
        },
      ]}
    />
  );
}
