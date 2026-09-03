import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import GstCalculator from "@/components/calc/GstCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "gst")!;
export const metadata = calcMeta("gst", CALC.title + " - Add or Remove GST (5%, 12%, 18%, 28%)", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="gst"
      title="GST Calculator"
      subtitle="Add or remove GST in seconds, at any rate, with the CGST/SGST split."
      calculator={<GstCalculator />}
      intro="Goods and Services Tax (GST) is India's unified indirect tax, replacing the older patchwork of VAT, service tax and excise with a single levy collected at each stage of the supply chain. Whether you are a business issuing invoices, a freelancer quoting a client, or a shopper checking whether a restaurant bill adds up, this GST calculator handles both directions: add GST to a base price to get the invoice total, or work backward to find the base price and tax hidden inside a GST-inclusive amount. It also splits the tax into CGST and SGST for sales within a state, or shows it as IGST for inter-state supplies, so your invoice lines match what the law expects."
      how={{
        heading: "How GST is calculated",
        body: (
          <>
            <p>To <strong>add</strong> GST, multiply the base price by the rate:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">GST = base × rate% ; Total = base + GST</p>
            <p>To <strong>remove</strong> GST from an inclusive amount:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">Base = total × 100 / (100 + rate)</p>
            <p>For sales within a state, GST is split equally into CGST and SGST. For inter-state sales, a single IGST applies.</p>
          </>
        ),
      }}
      faqs={[
        { q: "What are the GST rate slabs in India?", a: "The main slabs are 5%, 12%, 18% and 28%. Essentials attract lower rates while luxury and 'sin' goods attract the highest. A few items are exempt or zero-rated." },
        { q: "What's the difference between CGST, SGST and IGST?", a: "For a sale within the same state, GST splits into CGST (central) and SGST (state) equally. For a sale between states, a single IGST applies at the full rate." },
        { q: "How do I find the price before GST?", a: "Use 'Remove GST' mode and enter the final GST-inclusive amount. The calculator extracts the original base price and the tax portion." },
        { q: "Who needs to charge GST?", a: "Businesses above the turnover threshold must register for and charge GST. Thresholds differ for goods and services and by state. Check the current rules for your case." },
        { q: "How do I calculate 18% GST on Rs 1,000?", a: "To add GST, multiply the base by the rate: Rs 1,000 x 18% = Rs 180, so the invoice total is Rs 1,180. For a sale within one state that Rs 180 is shown as Rs 90 CGST and Rs 90 SGST; for an inter-state sale it appears as a single Rs 180 IGST line. To go the other way, base = total x 100 / (100 + rate), so an inclusive Rs 1,180 works back to Rs 1,000 base and Rs 180 tax." },
        { q: "What is input tax credit and who can claim it?", a: "Input tax credit lets a registered business set off the GST it paid on purchases against the GST it collects on sales, so tax is effectively paid only on the value it adds. To claim it you need a valid tax invoice from a registered supplier, the goods or services must actually have been received, and the supplier must have reported the invoice so it appears in your GSTR-2B. Blocked categories exist, so check the credit rules on gst.gov.in." },
        { q: "Is GST included in the MRP?", a: "Yes. Maximum Retail Price on a packaged product is inclusive of all taxes, including GST, so a retailer cannot legally add GST on top of the MRP. If you want to know the pre-tax value of something bought at MRP, use the Remove GST mode with the applicable rate. Restaurants, hotels and services are different: they usually quote a pre-tax price and add GST separately on the bill." },
        { q: "Do GST rates change, and how do I check the current rate?", a: "Yes. The GST Council meets periodically and has revised both the rate slabs and the classification of individual goods and services several times since GST began, so a rate that was correct last year may not be correct today. Always confirm the rate for your specific HSN or SAC code on the official portal at gst.gov.in or with your tax adviser before issuing an invoice, and treat any rate you enter into this calculator as your own input." },
      ]}
    />
  );
}
