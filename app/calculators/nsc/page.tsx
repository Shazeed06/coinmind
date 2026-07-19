import type { Metadata } from "next";
import NscCalculator from "@/components/calc/NscCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "NSC Calculator — National Savings Certificate" },
  description:
    "Free NSC calculator. Find your National Savings Certificate maturity value and total interest over the fixed 5-year term at the current rate.",
  alternates: { canonical: "/calculators/nsc" },
};

export default function Page() {
  return (
    <CalcPage
      slug="nsc"
      title="NSC Calculator"
      subtitle="See what your National Savings Certificate grows to over its fixed 5-year term."
      calculator={<NscCalculator />}
      sources={[
        { label: "National Savings Institute / India Post", href: "https://www.nsiindia.gov.in" },
      ]}
      intro="The National Savings Certificate (NSC) is a government-backed, fixed-income savings scheme sold at post offices across India. It has a fixed 5-year term, with interest compounded annually and paid out in full at maturity along with your principal. Because it is a small savings scheme, the interest rate is set by the government and revised each quarter. This NSC calculator turns your investment amount and the current interest rate into a clear maturity value and total interest, so you can see exactly what your national savings certificate will be worth after five years."
      how={{
        heading: "How NSC maturity is calculated",
        body: (
          <>
            <p>
              NSC interest is compounded once a year and paid, together with the
              principal, at the end of the 5-year term. The nsc maturity
              calculator uses the standard compound-interest formula:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Maturity = P &times; (1 + r/100)&#8309;
            </p>
            <p>
              Where <strong>P</strong> is your investment amount and{" "}
              <strong>r</strong> is the annual interest rate (a current rate, set
              and revised by the government each quarter &mdash; you can edit it
              to match today&apos;s figure). For example, &#8377;100,000 at 7.7%
              grows to about &#8377;144,900 after five years. This nsc interest
              calculator also shows the total interest earned over the term.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is an NSC and how does this NSC calculator work?",
          a: "The National Savings Certificate is a fixed 5-year small savings scheme sold at post offices in India. This national savings certificate calculator multiplies your investment by the annually compounded rate over five years to show the maturity value and total interest, so you know what you will receive at the end of the term.",
        },
        {
          q: "What is the current NSC interest rate?",
          a: "The NSC interest rate is a current rate that is set and revised by the government each quarter, so there is no permanently fixed figure. Rather than hard-code a number, this nsc interest calculator lets you enter the latest government-notified rate, which you can verify on the National Savings Institute / India Post source below.",
        },
        {
          q: "Is NSC eligible for a Section 80C tax deduction?",
          a: "Yes. Investments in NSC qualify for a deduction under Section 80C, up to the ₹1.5 lakh annual limit. The interest accrued each year (except the final year) is also treated as reinvested and can be claimed under 80C, which is why NSC is popular for tax-saving.",
        },
        {
          q: "Can I withdraw my NSC before 5 years?",
          a: "NSC has a fixed 5-year lock-in, so premature withdrawal is allowed only in limited cases such as the holder's death, forfeiture by a pledgee, or a court order. This nsc maturity calculator assumes you hold the certificate for the full term, when interest is compounded annually and paid out with the principal.",
        },
      ]}
    />
  );
}
