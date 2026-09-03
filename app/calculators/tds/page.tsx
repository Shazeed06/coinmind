import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import TdsCalculator from "@/components/calc/TdsCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "tds")!;
export const metadata = calcMeta("tds", CALC.title + " - Tax Deducted at Source", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="tds"
      title="TDS Calculator"
      subtitle="Estimate the tax deducted at source on a payment and see the net amount the recipient receives."
      calculator={<TdsCalculator />}
      intro="TDS (Tax Deducted at Source) is tax that the payer deducts before releasing a payment and deposits with the government on the recipient's behalf. It applies to interest, professional fees, rent, contractor payments, commission and more, each governed by its own section of the Income Tax Act with a set rate. This TDS calculator online takes a payment type and amount and instantly shows the rate that applies, the tax to be deducted and the net amount actually paid, so both the deductor and the recipient know exactly where they stand."
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
              fees (194J) and rent on land or buildings (194I), 1-2% for
              contractor payments (194C) and 5% for commission (194H).{" "}
              <strong>Salary</strong> (Section 192) is different. It is
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
          a: "A TDS calculator is an online tool that works out the tax deducted at source on a payment. You pick the payment type (such as interest, rent, professional fees, contractor payment or commission) and enter the amount, and it shows the applicable TDS rate, the tax deducted and the net amount the recipient receives.",
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
        {
          q: "How do I claim a TDS refund?",
          a: "You claim it by filing your income tax return. If the tax deducted across the year exceeds your actual liability, the excess is refunded to your pre-validated bank account after the return is processed. First check that every deduction appears in your Form 26AS and Annual Information Statement, because you can only claim credit for TDS the deductor has actually reported against your PAN. If an entry is missing, ask the deductor to correct their TDS return.",
        },
        {
          q: "Can I avoid TDS using Form 15G or Form 15H?",
          a: "Yes, if your total income for the year falls below the taxable limit. Form 15H is for people aged 60 and above, and Form 15G for everyone else who qualifies. You submit it to the bank or payer at the start of the financial year, and they then release the payment without deducting TDS. It is a declaration, not a loophole: filing one when your income is in fact taxable can attract penalties, so use it only when you genuinely qualify.",
        },
        {
          q: "What is TDS on the purchase of property?",
          a: "Section 194IA requires the buyer, not the seller, to deduct TDS at 1% when buying immovable property above the notified value threshold, currently ₹50 lakh. It is deposited using Form 26QB, and the buyer issues Form 16B to the seller. No TAN is needed, but the seller's PAN is essential, since Section 206AA pushes the rate to 20% without it. Agricultural land is excluded. Verify the current threshold and rate with the Income Tax Department.",
        },
        {
          q: "What is the TDS rate and threshold on rent?",
          a: "Two sections apply. Section 194I covers businesses and others liable to audit, deducting 10% on rent for land or buildings above an annual threshold, and a lower rate on plant and machinery. Section 194IB covers individuals and HUFs not under audit who pay a high monthly rent, requiring a smaller deduction once a year or when the tenancy ends, filed through Form 26QC. Confirm the current thresholds with the Income Tax Department before deducting.",
        },
      ]}
      sources={[
        { label: "Income Tax Department", href: "https://www.incometax.gov.in" },
      ]}
    />
  );
}
