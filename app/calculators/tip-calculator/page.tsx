import type { Metadata } from "next";
import TipCalculator from "@/components/calc/TipCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Tip Calculator — Split the Bill & Tip Fairly" },
  description:
    "Free tip calculator. Enter your bill, pick a tip % (10–25%), split between any number of people, and see the tip, total and per-person share instantly.",
  alternates: { canonical: "/calculators/tip-calculator" },
  openGraph: { url: "/calculators/tip-calculator" },
};

export default function Page() {
  return (
    <CalcPage
      slug="tip-calculator"
      title="Tip Calculator"
      subtitle="Work out the tip, the total, and each person's share in seconds."
      calculator={<TipCalculator />}
      intro="A tip calculator takes the mental maths out of the end of a meal. Enter your bill, choose how generous you want to be, and tell it how many people are splitting the cheque — it instantly shows the tip amount, the grand total, and exactly what each person owes. Handy for restaurants, bars, taxis, salons and food delivery, whether you're paying in dollars, pounds or rupees."
      how={{
        heading: "How the tip is calculated",
        body: (
          <>
            <p>
              The tip is a percentage of your bill. We multiply the bill by the
              tip rate, add it back to get the total, then divide by the number
              of people sharing:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              tip = bill × (tip% ÷ 100) · total = bill + tip · per person = total ÷ people
            </p>
            <p>
              Most people tip on the pre-tax bill, though some tip on the total
              — either is fine, it&apos;s your call. If you&apos;re paying in
              cash, rounding the total up to a clean number is a common and
              welcome way to leave a little extra.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How much should I tip?",
          a: "In the US, 15–20% is standard for sit-down restaurant service, with 20%+ for exceptional service. In the UK, tipping is more modest at around 10–12.5% (and often already added as a 'service charge'). In India, tipping is optional and a token 5–10% is generous. Cafés, delivery and taxis usually warrant less than full table service.",
        },
        {
          q: "How do I split a bill with tip?",
          a: "Add the tip to the bill to get the total, then divide by the number of people. This calculator does it for you — set 'Split between N people' and it shows both the per-person total and each person's share of the tip. For an even split this is exact; if people ordered very differently, you may prefer to split by what each person actually had.",
        },
        {
          q: "What is the typical tip percentage by country?",
          a: "United States: 15–20% expected at restaurants. United Kingdom: around 10–12.5%, and not always expected. India: optional, roughly 5–10%. Much of continental Europe rounds up or tips 5–10% since service is often included. Japan and some other countries don't have a tipping culture at all — always check local norms.",
        },
        {
          q: "Should I tip on the pre-tax or post-tax amount?",
          a: "Traditionally you tip on the pre-tax subtotal, but tipping on the full total is common and no one will mind a slightly larger tip. Enter whichever figure you prefer as the bill amount and the calculator handles the rest.",
        },
        {
          q: "Is a service charge the same as a tip?",
          a: "Not always. Many UK and European restaurants add a discretionary service charge (often 12.5%) to the bill — if that's there, an additional tip is optional. Check your receipt before adding more so you don't tip twice.",
        },
      ]}
    />
  );
}
