import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import TipCalculator from "@/components/calc/TipCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "tip-calculator")!;
export const metadata = calcMeta("tip-calculator", CALC.title + " - Split the Bill & Tip Fairly", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="tip-calculator"
      title="Tip Calculator"
      subtitle="Work out the tip, the total, and each person's share in seconds."
      calculator={<TipCalculator />}
      intro="A tip calculator takes the mental maths out of the end of a meal. Enter your bill, choose how generous you want to be, and tell it how many people are splitting the cheque. It instantly shows the tip amount, the grand total, and exactly what each person owes. Handy for restaurants, bars, taxis, salons and food delivery, whether you're paying in dollars, pounds or rupees."
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
              Most people tip on the pre-tax bill, though some tip on the total.
              Either is fine, it&apos;s your call. If you&apos;re paying in
              cash, rounding the total up to a clean number is a common and
              welcome way to leave a little extra.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How much should I tip?",
          a: "In the US, 15-20% is standard for sit-down restaurant service, with 20%+ for exceptional service. In the UK, tipping is more modest at around 10-12.5% (and often already added as a 'service charge'). In India, tipping is optional and a token 5-10% is generous. Cafés, delivery and taxis usually warrant less than full table service.",
        },
        {
          q: "How do I split a bill with tip?",
          a: "Add the tip to the bill to get the total, then divide by the number of people. This calculator does it for you. Set 'Split between N people' and it shows both the per-person total and each person's share of the tip. For an even split this is exact; if people ordered very differently, you may prefer to split by what each person actually had.",
        },
        {
          q: "What is the typical tip percentage by country?",
          a: "United States: 15-20% expected at restaurants. United Kingdom: around 10-12.5%, and not always expected. India: optional, roughly 5-10%. Much of continental Europe rounds up or tips 5-10% since service is often included. Japan and some other countries don't have a tipping culture at all. Always check local norms.",
        },
        {
          q: "Should I tip on the pre-tax or post-tax amount?",
          a: "Traditionally you tip on the pre-tax subtotal, but tipping on the full total is common and no one will mind a slightly larger tip. Enter whichever figure you prefer as the bill amount and the calculator handles the rest.",
        },
        {
          q: "Is a service charge the same as a tip?",
          a: "Not always. Many UK and European restaurants add a discretionary service charge (often 12.5%) to the bill. If that's there, an additional tip is optional. Check your receipt before adding more so you don't tip twice.",
        },
        {
          q: "How much should I tip in India?",
          a: "Tipping in India is genuinely optional rather than expected. At a sit-down restaurant, 5 to 10% of the bill is generous, and many people simply round up. Check the bill first: some restaurants already add a service charge, which is separate from GST and which you are not obliged to pay. For a ₹2,000 meal, ₹100 to ₹200 is a normal tip. Cash left on the table usually reaches the staff more reliably than a card add-on.",
        },
        {
          q: "How do I work out a 15% or 20% tip in my head?",
          a: "Find 10% first by moving the decimal point one place left. On a ₹1,240 bill, 10% is ₹124. Halve that to get 5%, which is ₹62, so a 15% tip is ₹186. For 20%, just double the 10% figure to ₹248. The same trick works in any currency, and it gets you close enough that rounding to a clean number costs almost nothing.",
        },
        {
          q: "How much should I tip for food delivery and taxis?",
          a: "Delivery riders and drivers are usually tipped less than table service. In the US, roughly 10 to 15% of the order or a couple of dollars minimum is common for delivery, and 10 to 15% for a taxi. In India, ₹20 to ₹50 for a delivery or rounding a cab fare up to the nearest ₹50 is normal and appreciated. Bad weather, a heavy order or several flights of stairs are all good reasons to add more.",
        },
        {
          q: "Do I tip for haircuts, spas and hotel staff?",
          a: "In the US these are usually tipped: around 15 to 20% for a hairdresser or spa treatment, a few dollars per bag for a porter, and a small amount per night for housekeeping. In the UK the figures are lower and often optional. In India a token amount, say ₹50 to ₹100 for a haircut or per bag, is customary rather than expected. Enter the service cost as the bill above and pick the percentage that fits local norms.",
        },
      ]}
    />
  );
}
