import type { Metadata } from "next";
import GratuityCalculator from "@/components/calc/GratuityCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Gratuity Calculator — How Much Gratuity Will You Get?" },
  description:
    "Free gratuity calculator for India. Work out the gratuity payable based on your last drawn salary and years of service, under the Gratuity Act.",
  alternates: { canonical: "/calculators/gratuity" },
  openGraph: { url: "/calculators/gratuity" },
};

export default function Page() {
  return (
    <CalcPage
      slug="gratuity"
      title="Gratuity Calculator"
      subtitle="Find out the gratuity you're entitled to when you leave your job."
      calculator={<GratuityCalculator />}
      sources={[{ label: "Ministry of Labour & Employment", href: "https://labour.gov.in" }]}
      intro="Gratuity is a lump sum an employer pays you as a thank-you for long service, usually when you resign or retire after at least five years. In India it's governed by the Payment of Gratuity Act. This calculator shows what you're owed based on your salary and tenure."
      how={{
        heading: "How gratuity is calculated",
        body: (
          <>
            <p>For employees covered by the Gratuity Act, the formula is:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">Gratuity = (15 / 26) × last salary × years of service</p>
            <p>
              The <strong>last salary</strong> is your most recent basic pay plus dearness allowance. <strong>26</strong> is the assumed number of working days in a month, and <strong>15</strong> represents 15 days&apos; wages for each completed year of service.
            </p>
          </>
        ),
      }}
      faqs={[
        { q: "When am I eligible for gratuity?", a: "Generally after completing five years of continuous service with the same employer. Exceptions apply in cases of death or disability, where the five-year rule is waived." },
        { q: "Is gratuity taxable?", a: "For covered employees, gratuity up to ₹20 lakh is tax-free. Amounts above that ceiling may be taxable depending on your category — this calculator caps at ₹20 lakh." },
        { q: "How are part-years counted?", a: "Service beyond six months in the final year is usually rounded up to a full year. For example, 10 years and 7 months counts as 11 years." },
        { q: "Does it include bonuses or HRA?", a: "No. Only basic salary and dearness allowance are used in the calculation — not HRA, bonuses or other allowances." },
        { q: "What is the gratuity formula?", a: "For employees covered by the Payment of Gratuity Act, gratuity = (15 / 26) × last drawn salary × years of service. The 15 represents 15 days' wages for every completed year, 26 is the assumed number of working days in a month, and the last drawn salary is your final basic pay plus dearness allowance." },
      ]}
    />
  );
}
