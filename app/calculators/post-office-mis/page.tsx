import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import PostOfficeMisCalculator from "@/components/calc/PostOfficeMisCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "post-office-mis")!;
export const metadata = calcMeta("post-office-mis", CALC.title + " - Monthly Income Scheme", CALC.blurb);

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
              government each quarter; you can edit it to match
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
        {
          q: "Can I close a Post Office MIS account before 5 years?",
          a: "Yes, but not immediately and not without a cost. Premature closure is not allowed in the first year. Close it after that and a percentage of your deposit is deducted as a penalty, with a higher deduction if you close in the earlier years and a smaller one closer to maturity. The monthly payouts you have already received are yours to keep. Confirm the current deduction percentages with India Post before you break the account.",
        },
        {
          q: "How is the MIS monthly income paid out?",
          a: "The interest is credited every month from the date the account is opened, not lumped together. You can have it paid into a post office savings account or an ECS transfer to your bank account, which is what most people set up. If you never draw a monthly payout it simply sits in the linked savings account earning the savings rate, so the money does not compound at the MIS rate. Your ₹9 lakh principal is returned in full at maturity.",
        },
        {
          q: "Can I extend Post Office MIS after 5 years?",
          a: "There is no automatic renewal that keeps paying the same rate. At the end of the 5-year term the principal is returned, and if you want to continue the income you open a fresh MIS account at whatever rate the government has notified for that quarter. That reinvestment risk is the main drawback of MIS as a long-term income plan, since the rate you get in five years may be higher or lower than today's.",
        },
        {
          q: "Post Office MIS or SCSS: which gives better monthly income?",
          a: "SCSS usually carries the higher rate but is restricted to people aged 60 and above (with limited exceptions from 55), pays quarterly rather than monthly, and allows up to ₹30 lakh. MIS is open to any adult, pays every month, and caps at ₹9 lakh single or ₹15 lakh joint. Interest is taxable in both. If you are a senior wanting maximum income, SCSS first; if you want a genuine monthly cheque or are under 60, MIS. Compare both at the current notified rates.",
        },
      ]}
    />
  );
}
