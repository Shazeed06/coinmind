import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import NscCalculator from "@/components/calc/NscCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "nsc")!;
export const metadata = calcMeta("nsc", CALC.title + " - National Savings Certificate", CALC.blurb);

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
              and revised by the government each quarter; you can edit it
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
        {
          q: "Is NSC interest taxable?",
          a: "Yes. NSC interest is fully taxable at your slab rate, unlike PPF. The saving grace is timing: interest accrues each year but is only paid at maturity, and the accrued interest for years one to four is treated as reinvested, so it can be claimed afresh under Section 80C. Only the final year's interest has no matching deduction. No TDS is deducted at the post office, so declare the accrued interest yourself each year in your return.",
        },
        {
          q: "NSC or PPF: which is better?",
          a: "They solve different problems. NSC locks money for 5 years and the interest is taxable, but the shorter term suits a medium-term goal. PPF runs 15 years and is EEE, so its interest and maturity value are entirely tax-free, which usually wins for anyone in a higher slab who can wait. Both qualify under the ₹1.5 lakh Section 80C ceiling. Compare the two using this calculator and our PPF calculator with the current notified rates.",
        },
        {
          q: "Can I take a loan against my NSC?",
          a: "You cannot borrow from the certificate itself, but most banks accept NSC as collateral for a secured loan because it is a government-backed instrument. The certificate is pledged to the lender through the post office, and you keep earning interest on it while the loan runs. Terms, margin and the interest charged vary by bank, so ask your branch. This is the usual route when you need cash but do not want to break the 5-year lock-in.",
        },
        {
          q: "What happens to NSC if I do not withdraw it at maturity?",
          a: "The certificate stops being a growing NSC. After the 5-year term ends, the maturity proceeds do not keep earning the NSC rate indefinitely; unclaimed amounts earn only a plain savings-account style rate for a limited period under post office rules. There is no automatic renewal into a fresh certificate, so if you want the money to keep compounding at the NSC rate you have to reinvest it in a new certificate at the rate notified on that date.",
        },
      ]}
    />
  );
}
