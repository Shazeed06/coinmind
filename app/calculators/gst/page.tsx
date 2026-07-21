import type { Metadata } from "next";
import GstCalculator from "@/components/calc/GstCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "GST Calculator — Add or Remove GST (5%, 12%, 18%, 28%)" },
  description:
    "Free GST calculator for India. Add GST to a price or remove GST from an inclusive amount at 5%, 12%, 18% or 28%, with CGST/SGST breakdown.",
  alternates: { canonical: "/calculators/gst" },
  openGraph: { url: "/calculators/gst" },
};

export default function Page() {
  return (
    <CalcPage
      slug="gst"
      title="GST Calculator"
      subtitle="Add or remove GST in seconds, at any rate, with the CGST/SGST split."
      calculator={<GstCalculator />}
      intro="Goods and Services Tax (GST) is India's unified indirect tax. Whether you're a business issuing invoices or a shopper checking a bill, this calculator handles both directions: add GST to a base price, or work backward to find the base price hidden inside a GST-inclusive amount."
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
        { q: "Who needs to charge GST?", a: "Businesses above the turnover threshold must register for and charge GST. Thresholds differ for goods and services and by state — check the current rules for your case." },
      ]}
    />
  );
}
