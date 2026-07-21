import type { Metadata } from "next";
import TdsCalculator from "@/components/calc/TdsCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "TDS Calculator — Tax Deducted at Source" },
  description:
    "Free TDS calculator to estimate tax deducted at source on interest, professional fees, rent, contractor and commission payments, plus the net amount.",
  alternates: { canonical: "/calculators/tds" },
  openGraph: { url: "/calculators/tds" },
};

export default function Page() {
  return (
    <CalcPage
      slug="tds"
      title="TDS Calculator"
      subtitle="Estimate the tax deducted at source on a payment and see the net amount the recipient receives."
      calculator={<TdsCalculator />}
      intro="TDS (Tax Deducted at Source) is tax that the payer deducts before releasing a payment and deposits with the government on the recipient's behalf. It applies to interest, professional fees, rent, contractor payments, commission and more, each governed by its own section of the Income Tax Act with a set rate. This TDS calculator online takes a payment type and amount and instantly shows the rate that applies, the tax to be deducted and the net amount actually paid — so both the deductor and the recipient know exactly where they stand."
      how={{
        heading: "How TDS is calculated",
        body: (
          <>
            <p>
              For most sections, TDS is a flat percentage of the payment,
              deducted at the time the amount is paid or credited:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              TDS = Payment amount &times; TDS rate for the section
            </p>
            <p>
              For example, a &#8377;1,00,000 professional fee under Section 194J
              at 10% means &#8377;10,000 is deducted and &#8377;90,000 is paid
              out. Common current rates are 10% for interest (194A), professional
              fees (194J) and rent on land or buildings (194I), 1&ndash;2% for
              contractor payments (194C) and 5% for commission (194H).{" "}
              <strong>Salary</strong> (Section 192) is different &mdash; it is
              deducted at your average income-tax slab rate, so use the income
              tax calculator instead. If the recipient has not provided a PAN,
              Section 206AA requires TDS at a higher 20%.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a TDS calculator?",
          a: "A TDS calculator is an online tool that works out the tax deducted at source on a payment. You pick the payment type — such as interest, rent, professional fees, contractor payment or commission — and enter the amount, and it shows the applicable TDS rate, the tax deducted and the net amount the recipient receives.",
        },
        {
          q: "How does the TDS on interest calculator work?",
          a: "TDS on interest under Section 194A is generally 10% of the interest paid, deducted once the interest crosses the annual threshold. On ₹50,000 of interest that is ₹5,000 of TDS, leaving ₹45,000. If the recipient has not given a PAN, the rate rises to 20% under Section 206AA.",
        },
        {
          q: "What is the TDS rate if there is no PAN?",
          a: "Under Section 206AA, if the recipient does not provide a PAN, TDS must be deducted at 20% or the normal section rate, whichever is higher. For most payments that means a flat 20%, which is why sharing a valid PAN with the deductor matters.",
        },
        {
          q: "How does a TDS on salary calculator work?",
          a: "TDS on salary under Section 192 is not a flat rate. The employer estimates your annual income, applies the income-tax slabs, and deducts roughly one-twelfth of the yearly tax each month. Use an income tax calculator to estimate the annual liability, then divide by 12 for the monthly TDS.",
        },
      ]}
      sources={[
        { label: "Income Tax Department", href: "https://www.incometax.gov.in" },
      ]}
    />
  );
}
