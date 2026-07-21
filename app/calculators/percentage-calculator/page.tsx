import type { Metadata } from "next";
import PercentageCalculator from "@/components/calc/PercentageCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Percentage Calculator — % of a Number, Change & More" },
  description:
    "Free percentage calculator. Find X% of a number, work out what percent one number is of another, and calculate percentage increase or decrease instantly.",
  alternates: { canonical: "/calculators/percentage-calculator" },
  openGraph: { url: "/calculators/percentage-calculator" },
};

export default function Page() {
  return (
    <CalcPage
      slug="percentage-calculator"
      title="Percentage Calculator"
      subtitle="Work out percentages, ratios and percentage change in one place — no formulas to remember."
      calculator={<PercentageCalculator />}
      intro="Percentages turn up everywhere: a 20% tip, a 15%-off sale, an exam score, a pay rise, or the return on an investment. This free percentage calculator handles the three questions people ask most — what is X% of a number, what percentage one number is of another, and how much a value has gone up or down. Type your numbers and the answer appears instantly, along with a plain-English sentence so you can see exactly what it means. No sign-up, no app, nothing to install."
      how={{
        heading: "How to calculate a percentage",
        body: (
          <>
            <p>
              A percentage is just a fraction out of 100. Every calculation on
              this page comes down to one of three simple formulas, depending on
              what you already know and what you want to find.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              % of a number: result = (X ÷ 100) × Y
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              X is what % of Y: result = (X ÷ Y) × 100
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              % change from X to Y: result = ((Y − X) ÷ X) × 100
            </p>
            <p>
              For percentage change, a positive result is an increase and a
              negative result is a decrease. For example, going from 200 to 250
              is a 25% increase, while going from 250 to 200 is a 20% decrease —
              the two are not the same, because the starting number is
              different each time.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How do I calculate a percentage of a number?",
          a: "Divide the percentage by 100, then multiply by the number. For example, 15% of 200 is (15 ÷ 100) × 200 = 30. Use the first mode above and it does this for you automatically.",
        },
        {
          q: "How do I find what percentage one number is of another?",
          a: "Divide the first number by the second, then multiply by 100. For example, 30 out of 200 is (30 ÷ 200) × 100 = 15%. Switch to the second mode to calculate this instantly.",
        },
        {
          q: "How do I calculate a percentage increase?",
          a: "Subtract the original value from the new value, divide by the original value, then multiply by 100. Going from 200 to 250 is ((250 − 200) ÷ 200) × 100 = 25% increase. The third mode labels the result as an increase or decrease for you.",
        },
        {
          q: "Why isn't a 25% increase cancelled out by a 25% decrease?",
          a: "Because the base changes. A 25% increase on 200 gives 250, but a 25% decrease on 250 gives 187.5, not 200 — the decrease is applied to a larger number. That's why raising then dropping a value by the same percentage never brings you back to where you started.",
        },
        {
          q: "What happens if I leave a field blank or divide by zero?",
          a: "The calculator shows a dash (—) instead of an error. Percentages that would require dividing by zero — such as asking what percent a number is of zero — have no defined answer, so nothing is shown until you enter valid values.",
        },
      ]}
    />
  );
}
