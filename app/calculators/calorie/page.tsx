import type { Metadata } from "next";
import CalorieCalculator from "@/components/calc/CalorieCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Calorie Calculator — Daily Calories (TDEE)" },
  description:
    "Free calorie calculator. Estimate your daily maintenance calories (TDEE) and targets for weight loss or gain using the Mifflin-St Jeor equation.",
  alternates: { canonical: "/calculators/calorie" },
};

export default function Page() {
  return (
    <CalcPage
      slug="calorie"
      title="Calorie Calculator"
      subtitle="Estimate the calories you burn each day and the targets to lose or gain weight."
      calculator={<CalorieCalculator />}
      intro="A calorie calculator estimates how many calories your body uses in a day so you can eat with a goal in mind. It first works out your Basal Metabolic Rate (BMR) — the energy you'd burn at complete rest — then scales it by how active you are to give your Total Daily Energy Expenditure (TDEE), also called your maintenance calories. Eat around that number to hold your weight, a little less to lose, or a little more to gain. It's a starting point for planning, not a strict rule."
      how={{
        heading: "How your daily calories are calculated",
        body: (
          <>
            <p>
              We use the Mifflin-St Jeor equation, the formula most dietitians
              rely on today because it tracks real-world energy needs more
              closely than older equations. It estimates your BMR from your
              weight, height, age and sex:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              BMR = 10 × kg + 6.25 × cm − 5 × age + s
            </p>
            <p>
              Here <strong>s</strong> is +5 for men and −161 for women. Your{" "}
              <strong>TDEE</strong> is then your BMR multiplied by an activity
              factor — from 1.2 for a sedentary lifestyle up to 1.9 for very
              hard daily exercise. To change weight, we adjust from that
              maintenance number: roughly a 500 kcal daily deficit targets about
              0.5 kg (1 lb) of loss per week, and a 500 kcal surplus targets a
              similar gain.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is TDEE and how is it different from BMR?",
          a: "BMR is the energy your body uses at complete rest just to keep you alive. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor, so it includes movement, exercise and digestion. TDEE is your maintenance calories — the number to eat to stay the same weight.",
        },
        {
          q: "How many calories should I eat to lose weight?",
          a: "A moderate deficit of about 500 calories below your maintenance (TDEE) targets roughly half a kilo, or one pound, of loss per week. A smaller 250-calorie cut is gentler and easier to sustain. Avoid dropping below your BMR for long periods without professional guidance.",
        },
        {
          q: "How accurate is this calorie calculator?",
          a: "The Mifflin-St Jeor equation is accurate for most people to within about 10 percent, but it can't account for individual differences in muscle mass, metabolism and health conditions. Treat the result as a well-informed starting point, then adjust based on how your weight actually changes over a few weeks.",
        },
        {
          q: "Which activity level should I choose?",
          a: "Pick the one that matches a typical week, not your best week. 'Sedentary' suits a desk job with little exercise; 'Light' is exercise 1–3 days; 'Moderate' is 3–5 days; 'Active' is 6–7 days; and 'Very active' is hard training or a physically demanding job. When unsure, choose the lower option.",
        },
        {
          q: "Is this medical or nutritional advice?",
          a: "No. This tool gives general estimates for education and planning only. Calorie needs are affected by health conditions, medication, pregnancy and more. Speak with a doctor or registered dietitian before starting a diet or making significant changes to your eating.",
        },
      ]}
    />
  );
}
