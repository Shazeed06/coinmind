import type { Metadata } from "next";
import HraCalculator from "@/components/calc/HraCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "HRA Calculator — House Rent Allowance Exemption" },
  description:
    "Free HRA exemption calculator for Indian income tax. See how much of your house rent allowance is tax-free under Section 10(13A) of the old regime.",
  alternates: { canonical: "/calculators/hra" },
};

export default function Page() {
  return (
    <CalcPage
      slug="hra"
      title="HRA Calculator"
      subtitle="See exactly how much of your House Rent Allowance is exempt from income tax."
      calculator={<HraCalculator />}
      intro="House Rent Allowance (HRA) is a component of most salary packages in India, and part of it can be exempt from income tax if you actually pay rent. The exemption is governed by Section 10(13A) of the Income Tax Act and is not simply the full HRA on your payslip — it is the least of three separate limits. This HRA calculator applies all three rules for you, shows which one is capping your exemption, and splits your allowance into its tax-free and taxable parts. Note that HRA exemption is available under the old tax regime only; if you have opted for the new regime, none of your HRA is exempt."
      how={{
        heading: "How HRA exemption is calculated",
        body: (
          <>
            <p>
              Your exempt HRA is the <strong>least</strong> of these three
              amounts:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>The actual HRA you received during the year.</li>
              <li>
                <strong>50%</strong> of your basic salary + DA if you live in a
                metro city (Delhi, Mumbai, Kolkata or Chennai), or{" "}
                <strong>40%</strong> if you live anywhere else.
              </li>
              <li>Rent actually paid minus 10% of your basic salary + DA.</li>
            </ol>
            <p>
              Whichever of these is smallest becomes your exempt HRA (it can
              never go below zero). The rest of your HRA is added to your taxable
              income. If your rent is less than 10% of your basic salary, the
              third rule works out to zero and no exemption is available. Pair
              this with CoinMind&apos;s{" "}
              <a href="/calculators/income-tax" className="text-forest">
                Income Tax Calculator
              </a>{" "}
              and{" "}
              <a href="/calculators/take-home-salary" className="text-forest">
                Take-Home Salary Calculator
              </a>{" "}
              to see the full picture of your in-hand pay.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How is HRA exemption calculated?",
          a: "HRA exemption equals the least of three amounts: the actual HRA received, 50% of basic salary + DA for metro cities (40% for non-metro), and rent paid minus 10% of basic salary + DA. Whichever is lowest is exempt; the balance of your HRA is taxable. The exemption can never be negative.",
        },
        {
          q: "Which cities count as metro for HRA?",
          a: "Only four cities are treated as metros for HRA: Delhi, Mumbai, Kolkata and Chennai. If you live in any of these, you can claim up to 50% of your basic salary + DA; everywhere else in India the limit is 40%. Note that this list is fixed by the Income Tax Act and does not include cities like Bengaluru, Hyderabad or Pune.",
        },
        {
          q: "Can I claim HRA in the new tax regime?",
          a: "No. The HRA exemption under Section 10(13A) is available only under the old tax regime. If you have opted for the new regime, your entire HRA is fully taxable, though the new regime offers lower slab rates in exchange for giving up most exemptions and deductions.",
        },
        {
          q: "Can I claim HRA and a home loan together?",
          a: "Yes, in many cases. If you live in a rented house while paying a home loan on a property elsewhere (or a let-out property), you can claim HRA exemption on the rent and home-loan interest and principal deductions on the loan. The rules are stricter if you rent and own in the same city, so keep genuine documentation.",
        },
        {
          q: "What proof do I need to claim HRA exemption?",
          a: "Keep rent receipts and, ideally, a rent agreement. If your total rent for the year exceeds Rs 1,00,000, you must also report your landlord's PAN to your employer. Paying rent by bank transfer rather than cash makes your claim easier to substantiate if questioned.",
        },
      ]}
    />
  );
}
