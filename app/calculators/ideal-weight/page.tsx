import type { Metadata } from "next";
import IdealWeightCalculator from "@/components/calc/IdealWeightCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Ideal Weight Calculator — By Height & Sex" },
  description:
    "Free ideal weight calculator. Enter your height and sex to see your ideal body weight from the Robinson, Miller, Devine and Hamwi formulas, plus the healthy BMI range.",
  alternates: { canonical: "/calculators/ideal-weight" },
};

export default function Page() {
  return (
    <CalcPage
      slug="ideal-weight"
      title="Ideal Weight Calculator"
      subtitle="Estimate a healthy body weight for your height and sex using four established medical formulas."
      calculator={<IdealWeightCalculator />}
      intro="An ideal weight calculator estimates a healthy body weight based on your height and sex. Because there is no single agreed formula, this tool runs four widely used ones — Robinson, Miller, Devine and Hamwi — and shows the range they produce, alongside the healthy weight range implied by a normal BMI (18.5 to 24.9). It works in both metric and imperial units. Remember that these formulas rely on height alone and can't see your build, muscle or body composition, so the result is a general guide for education only, not a personal target or medical advice."
      how={{
        heading: "How ideal weight is calculated",
        body: (
          <>
            <p>
              Each formula starts from a base weight at a height of 5 feet (60 inches) and adds a set
              amount for every inch above that — with different constants for men and women. For
              example, the Devine formula uses:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Men: 50 kg + 2.3 kg × (inches over 5 ft)
            </p>
            <p>
              The Robinson, Miller and Hamwi formulas follow the same shape with slightly different
              numbers, which is why they each return a marginally different figure. Taking them
              together as a range is more honest than pretending any single number is the &ldquo;right&rdquo;
              weight. We also show the weight range that corresponds to a healthy BMI for your height,
              which many clinicians consider a more practical target.
            </p>
            <p>
              These estimates are a screening guide only. A healthy weight for you depends on factors
              a formula can&apos;t measure, so use this as a conversation starter with a doctor or
              dietitian rather than a strict goal.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Which ideal weight formula is best?",
          a: "There is no single best formula — Robinson, Miller, Devine and Hamwi all give slightly different results because they were derived from different data. That's why this calculator shows the full range rather than one number, along with the healthy BMI range for your height.",
        },
        {
          q: "Why does the calculator ask for sex?",
          a: "Each formula uses different constants for men and women, because average body composition differs. Selecting your sex applies the correct coefficients so the estimate is more accurate for you.",
        },
        {
          q: "Is ideal body weight the same as a healthy weight?",
          a: "Not exactly. Ideal body weight formulas were originally created for clinical uses like medication dosing, not as personal goals. A healthy weight is a range, not a single figure, and depends on your muscle, frame and overall health — which is why we also show the BMI-based range.",
        },
        {
          q: "Should I try to reach my ideal weight exactly?",
          a: "No. The number is an estimate, and being a little above or below it is completely normal. Focus on overall health — balanced eating, activity and how you feel — rather than hitting a precise figure. Speak to a healthcare professional before making significant changes.",
        },
        {
          q: "Does this work for both metric and imperial?",
          a: "Yes. You can enter your height in centimetres or in feet and inches, and the results are shown in kilograms or pounds to match. The underlying calculation is the same regardless of the units you choose.",
        },
      ]}
    />
  );
}
