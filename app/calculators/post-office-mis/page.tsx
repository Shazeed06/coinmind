import type { Metadata } from "next";
import PostOfficeMisCalculator from "@/components/calc/PostOfficeMisCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Post Office MIS Calculator — Monthly Income Scheme" },
  description:
    "Free Post Office MIS calculator. Find your Monthly Income Scheme monthly payout, annual income and total interest over the 5-year term.",
  alternates: { canonical: "/calculators/post-office-mis" },
};

export default function Page() {
  return (
    <CalcPage
      slug="post-office-mis"
      title="Post Office MIS Calculator"
      subtitle="See the fixed monthly income you'll earn from the Post Office Monthly Income Scheme."
      calculator={<PostOfficeMisCalculator />}
      sources={[
        { label: "India Post", href: "https://www.indiapost.gov.in" },
      ]}
      intro="The Post Office Monthly Income Scheme (MIS) is a government-backed savings scheme that pays a fixed income every month. It runs for a fixed 5 years and pays interest as a simple monthly payout, with your full principal returned at maturity. Because it is a small savings scheme, the interest rate is set by the government and revised each quarter. This Post Office MIS calculator turns your deposit and the current rate into your monthly income, annual income and total interest over five years, so you can plan around a steady monthly income scheme payout."
      how={{
        heading: "How Post Office MIS income is calculated",
        body: (
          <>
            <p>
              MIS pays a simple (non-compounded) interest payout every month, and
              returns your principal untouched at the end of the 5-year term. The
              mis calculator post office view works out each figure like this:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Monthly income = P &times; r/100 &divide; 12
            </p>
            <p>
              Where <strong>P</strong> is your deposit and <strong>r</strong> is
              the annual interest rate (a current rate, set and revised by the
              government each quarter &mdash; you can edit it to match
              today&apos;s figure). Annual income is P &times; r/100, and total
              interest over the term is that annual figure multiplied by five.
              For example, &#8377;5,00,000 at 7.4% pays about &#8377;3,083 every
              month and &#8377;1,85,000 of interest over five years, with the{" "}
              &#8377;5,00,000 principal returned at maturity.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How does this Post Office MIS calculator work?",
          a: "The post office monthly income scheme pays a fixed monthly payout for five years. This post office mis calculator multiplies your deposit by the annual rate, then divides by twelve to show the monthly income, alongside the annual income and total interest over the term, so you can see the regular income the scheme will provide.",
        },
        {
          q: "What is the maximum I can invest in Post Office MIS?",
          a: "The maximum is ₹9 lakh in a single account and ₹15 lakh in a joint account, which is why this monthly income scheme calculator caps a single-account deposit at ₹9 lakh. The minimum deposit is ₹1,000, in multiples of ₹1,000.",
        },
        {
          q: "What is the current Post Office MIS interest rate?",
          a: "The MIS interest rate is a current rate that is set and revised by the government each quarter, so there is no permanently fixed number. This mis calculator post office tool lets you enter the latest government-notified rate, which you can verify on the India Post source below.",
        },
        {
          q: "Is the monthly income from Post Office MIS taxable?",
          a: "Yes. The monthly interest from the post office monthly income scheme is fully taxable in your hands, and Post Office MIS does not qualify for a Section 80C deduction. Treat the payout shown by this post office mis calculator as a pre-tax figure when planning your income.",
        },
      ]}
    />
  );
}
