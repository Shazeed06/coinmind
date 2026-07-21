import type { Metadata } from "next";
import LumpsumCalculator from "@/components/calc/LumpsumCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Lumpsum Calculator — One-Time Investment Returns" },
  description:
    "Free lumpsum investment calculator. See the future value of a one-time investment in mutual funds or any asset, in ₹, $ or £.",
  alternates: { canonical: "/calculators/lumpsum" },
  openGraph: { url: "/calculators/lumpsum" },
};

export default function Page() {
  return (
    <CalcPage
      slug="lumpsum"
      title="Lumpsum Calculator"
      subtitle="See what a single, one-time investment could grow into over the years."
      calculator={<LumpsumCalculator />}
      intro="A lumpsum investment is a one-time deposit — you invest a large amount at once rather than spreading it monthly like an SIP. It's ideal when you receive a bonus, sell an asset, or have savings sitting idle. This calculator shows the projected future value using the power of compounding."
      how={{
        heading: "How lumpsum growth is calculated",
        body: (
          <>
            <p>The calculator uses the compound growth formula:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">FV = P × (1 + r)ⁿ</p>
            <p>
              Where <strong>P</strong> is your investment, <strong>r</strong> is the annual return, and <strong>n</strong> is the number of years. Because returns compound, the growth accelerates the longer you stay invested.
            </p>
          </>
        ),
      }}
      faqs={[
        { q: "Is lumpsum better than SIP?", a: "In a steadily rising market a lumpsum often wins because your full amount is invested for longer. But an SIP reduces timing risk by averaging your entry price. If you have a large idle sum, many advisors suggest staggering it over a few months." },
        { q: "What return should I assume?", a: "For diversified equity funds, 10–12% is a reasonable long-term assumption. For debt, use 6–8%. Plan conservatively so you aren't disappointed." },
        { q: "Are the returns guaranteed?", a: "No. Market investments carry risk and returns vary year to year. This is an illustration based on a constant assumed rate." },
        { q: "Can I use it for USD or GBP?", a: "Yes — switch the currency and use it for any one-time investment anywhere in the world." },
      ]}
    />
  );
}
