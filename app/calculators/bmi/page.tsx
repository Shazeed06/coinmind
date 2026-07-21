import type { Metadata } from "next";
import BmiCalculator from "@/components/calc/BmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "BMI Calculator — Body Mass Index (Free)" },
  description:
    "Free BMI calculator. Enter your height and weight (metric or imperial) to find your body mass index, category and healthy weight range.",
  alternates: { canonical: "/calculators/bmi" },
  openGraph: { url: "/calculators/bmi" },
};

export default function Page() {
  return (
    <CalcPage
      slug="bmi"
      title="BMI Calculator"
      subtitle="Check whether your weight sits in a healthy range for your height — in metric or imperial units."
      calculator={<BmiCalculator />}
      intro="Body Mass Index (BMI) is a quick way to see whether your weight is broadly in a healthy range for your height. It divides your weight by the square of your height, giving a single number that falls into one of four bands: underweight, normal, overweight or obese. This BMI calculator works in both metric (cm and kg) and imperial (feet, inches and pounds) units, and also shows the healthy weight range for your height. It is intended for general education only and is not medical advice — for a proper assessment of your health, speak to a qualified healthcare professional."
      how={{
        heading: "How BMI is calculated",
        body: (
          <>
            <p>BMI uses a simple ratio of weight to height:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              BMI = weight (kg) ÷ height (m)²
            </p>
            <p>
              For imperial units the calculator first converts pounds to kilograms and feet and inches
              to metres, so the result is identical either way. The standard adult categories from the
              World Health Organization are:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Underweight</strong> — below 18.5
              </li>
              <li>
                <strong>Normal weight</strong> — 18.5 to 24.9
              </li>
              <li>
                <strong>Overweight</strong> — 25 to 29.9
              </li>
              <li>
                <strong>Obese</strong> — 30 and above
              </li>
            </ul>
            <p>
              BMI is a screening tool, not a diagnosis. It doesn&apos;t distinguish muscle from fat or
              tell you where fat is stored, so very muscular people and older adults can be
              misclassified. Use it alongside other measures and professional advice.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a healthy BMI?",
          a: "For most adults, a BMI between 18.5 and 24.9 is considered the healthy range. Below 18.5 is classed as underweight, 25 to 29.9 as overweight, and 30 or above as obese. These bands are general guidance and can vary by age and ethnicity.",
        },
        {
          q: "Is BMI accurate for everyone?",
          a: "No. BMI is a rough screening measure and doesn't account for muscle mass, bone density, body fat distribution, age or ethnicity. Athletes with high muscle mass may register as overweight while being very fit, and older adults may fall in a healthy band despite low muscle. Treat it as a starting point, not a verdict.",
        },
        {
          q: "How do I lower my BMI safely?",
          a: "Because BMI depends on weight and height, lowering it means reducing body weight gradually through a balanced diet and regular activity. Aim for slow, sustainable changes rather than crash diets, and speak to a doctor or dietitian before starting any significant weight-loss plan.",
        },
        {
          q: "Does BMI work for children?",
          a: "Not in the same way. For children and teenagers, BMI is interpreted using age- and sex-specific percentile charts rather than the fixed adult categories. This calculator is designed for adults, so use a paediatric BMI tool or ask a doctor for anyone under 18.",
        },
        {
          q: "Is this BMI calculator free?",
          a: "Yes. This BMI calculator is completely free, works in metric and imperial units, and stores nothing you enter. It is provided for general educational purposes only and is not a substitute for professional medical advice.",
        },
      ]}
    />
  );
}
