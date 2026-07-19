import type { Metadata } from "next";
import DiscountCalculator from "@/components/calc/DiscountCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Discount Calculator — Sale Price & Savings" },
  description:
    "Free discount calculator. Enter an original price and discount % to see the final sale price and how much you save. Percent off made simple.",
  alternates: { canonical: "/calculators/discount" },
};

export default function Page() {
  return (
    <CalcPage
      slug="discount"
      title="Discount Calculator"
      subtitle="See the sale price and exactly how much you save on any percent-off deal."
      calculator={<DiscountCalculator />}
      intro="A discount calculator turns a headline percentage off into the two numbers you actually care about: the final price you pay, and the amount you save. Enter the original price and the discount percentage, and it instantly works out the sale price and your savings. It is the quick answer to 'how much will I save?' on any sale, clearance, coupon or promo code — in store or online, in dollars, pounds or rupees."
      how={{
        heading: "How the discount is calculated",
        body: (
          <>
            <p>
              A discount is simply a percentage taken off the original price. We
              multiply the price by the discount rate to get the saving, then
              subtract it to get the final sale price:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              amount saved = original price × (discount% ÷ 100) · final price =
              original price − amount saved
            </p>
            <p>
              For example, a 25% discount on a $100 item saves you $25 and brings
              the price to $75. Stacked or extra discounts are applied one after
              another, not added together &mdash; an extra 10% off an
              already-reduced price comes off the new lower figure, not the
              original.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How do I calculate a discount?",
          a: "Multiply the original price by the discount percentage divided by 100 to get the amount saved, then subtract that from the original price for the final sale price. For example, 30% off a $80 item is 80 × 0.30 = $24 saved, so you pay $56. This discount calculator does both steps for you instantly.",
        },
        {
          q: "How much will I save with a percent-off deal?",
          a: "Your saving equals the original price times the discount percentage. A 40% off deal on a $150 product saves you $60. Enter your own price and percentage above and the calculator shows the exact savings and the final price you'll pay at the till.",
        },
        {
          q: "How do I work out the sale price after a discount?",
          a: "Subtract the discount amount from the original price. A quick shortcut: if something is 20% off, you pay 80% of the price, so multiply by 0.80. This sale price calculator handles any percentage, so you never have to do the mental maths in the shop.",
        },
        {
          q: "How do stacked or double discounts work?",
          a: "Extra discounts apply to the reduced price, not the original. An item at 50% off then an extra 20% off is not 70% off — the second 20% comes off the already-halved price, giving a total of 60% off. Apply each discount in turn to get the true final price.",
        },
      ]}
    />
  );
}
