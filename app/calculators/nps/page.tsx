import type { Metadata } from "next";
import NpsCalculator from "@/components/calc/NpsCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "NPS Calculator — Pension & Corpus Estimate" },
  description:
    "Free NPS calculator. Estimate your retirement corpus, tax-free lump sum and monthly pension from the National Pension System for any contribution and return.",
  alternates: { canonical: "/calculators/nps" },
  openGraph: { url: "/calculators/nps" },
};

export default function Page() {
  return (
    <CalcPage
      slug="nps"
      title="NPS Calculator"
      subtitle="Project your National Pension System corpus and the monthly pension it can buy at retirement."
      calculator={<NpsCalculator />}
      sources={[{ label: "PFRDA", href: "https://www.pfrda.org.in" }]}
      intro="The National Pension System (NPS) is a government-backed retirement scheme where your monthly contributions are invested across equity and debt and compound until you retire. At retirement you can withdraw part of the corpus as a tax-free lump sum, while the rest must buy an annuity that pays you a regular pension. This NPS calculator projects your corpus at 60, the lump sum you can take, and the monthly pension your annuity is likely to generate."
      how={{
        heading: "How your NPS corpus is calculated",
        body: (
          <>
            <p>
              Your contributions grow like a monthly SIP. The calculator uses the
              future-value formula for a series of equal monthly investments:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              FV = P × [((1 + i)^n − 1) / i] × (1 + i)
            </p>
            <p>
              Where <strong>P</strong> is your monthly contribution,{" "}
              <strong>i</strong> is the monthly return (annual return ÷ 12), and{" "}
              <strong>n</strong> is the number of months until retirement. At
              retirement, at least 40% of the corpus buys an annuity and the
              balance can be withdrawn as a lump sum. Your monthly pension is
              estimated from the annuity corpus and the expected annuity rate.
            </p>
            <p>
              NPS suits long horizons and pairs well with other retirement tools —
              compare the outcome against a broader{" "}
              <a href="/calculators/retirement" className="text-forest font-medium hover:underline">
                retirement calculator
              </a>{" "}
              or a debt-only option like the{" "}
              <a href="/calculators/ppf" className="text-forest font-medium hover:underline">
                PPF calculator
              </a>{" "}
              to see how the mix affects your final corpus.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is the National Pension System (NPS)?",
          a: "NPS is a voluntary, long-term retirement savings scheme regulated by PFRDA. You contribute regularly during your working years, the money is invested in a mix of equity and debt, and at retirement you receive a lump sum plus a lifelong pension funded by an annuity.",
        },
        {
          q: "What tax benefits does NPS offer?",
          a: "Under the old regime you can claim up to ₹1.5 lakh under Section 80CCD(1) within the overall 80C limit, plus an extra ₹50,000 under Section 80CCD(1B) that is exclusive to NPS. Employer contributions are additionally deductible under Section 80CCD(2). Benefits depend on your chosen tax regime.",
        },
        {
          q: "Why must 40% of the corpus buy an annuity?",
          a: "Indian NPS rules require you to use at least 40% of your Tier 1 corpus to purchase an annuity, which guarantees a regular pension for life. The remaining 60% can be withdrawn as a lump sum, and that lump-sum portion is currently tax-free.",
        },
        {
          q: "What is the difference between NPS Tier 1 and Tier 2?",
          a: "Tier 1 is the main retirement account with tax benefits and withdrawal restrictions until 60. Tier 2 is an optional, flexible savings account with no lock-in and no extra tax deduction for most subscribers. This calculator models a Tier 1 account.",
        },
        {
          q: "Are the pension and returns shown here guaranteed?",
          a: "No. The corpus depends on the return your investments actually earn, and the pension depends on annuity rates at the time you retire. The figures here are projections to help you plan, not a promise of future value.",
        },
        {
          q: "What is the extra ₹50,000 deduction under Section 80CCD(1B)?",
          a: "Section 80CCD(1B) lets you claim an additional deduction of up to ₹50,000 for your own NPS Tier 1 contributions, over and above the ₹1.5 lakh combined ceiling of Section 80C. It is exclusive to NPS, so it is a common reason people add an NPS account on top of other tax-saving investments. The benefit applies under the old tax regime; confirm the current rules for your regime with PFRDA.",
        },
      ]}
    />
  );
}
