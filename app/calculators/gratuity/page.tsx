import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import GratuityCalculator from "@/components/calc/GratuityCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "gratuity")!;
export const metadata = calcMeta("gratuity", CALC.title + " - How Much Gratuity Will You Get?", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="gratuity"
      title="Gratuity Calculator"
      subtitle="Find out the gratuity you're entitled to when you leave your job."
      calculator={<GratuityCalculator />}
      sources={[{ label: "Ministry of Labour & Employment", href: "https://labour.gov.in" }]}
      intro="Gratuity is a lump sum an employer pays you as a thank-you for long service, usually when you resign, retire or are superannuated after at least five years with the same organisation. In India it is governed by the Payment of Gratuity Act, 1972, which applies to factories, mines, shops and most establishments employing ten or more people, and it sets both the formula and the ceiling on what must be paid. Because gratuity is based on your last drawn basic salary plus dearness allowance rather than your full CTC, the amount often surprises people. This gratuity calculator shows what you are owed based on your salary and completed years of service."
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
        { q: "Is gratuity taxable?", a: "For covered employees, gratuity up to ₹20 lakh is tax-free. Amounts above that ceiling may be taxable depending on your category. This calculator caps at ₹20 lakh." },
        { q: "How are part-years counted?", a: "Service beyond six months in the final year is usually rounded up to a full year. For example, 10 years and 7 months counts as 11 years." },
        { q: "Does it include bonuses or HRA?", a: "No. Only basic salary and dearness allowance are used in the calculation, not HRA, bonuses or other allowances." },
        { q: "What is the gratuity formula?", a: "For employees covered by the Payment of Gratuity Act, gratuity = (15 / 26) × last drawn salary × years of service. The 15 represents 15 days' wages for every completed year, 26 is the assumed number of working days in a month, and the last drawn salary is your final basic pay plus dearness allowance." },
        { q: "How is gratuity calculated if my employer is not covered by the Act?", a: "Establishments outside the scope of the Payment of Gratuity Act may still pay gratuity voluntarily or under the terms of your contract, and the commonly used formula there is (15 / 30) x last drawn salary x completed years of service. Because it divides by 30 days rather than 26, it produces a smaller amount for the same salary and tenure. Part-years are also not rounded up in the same way, so read your appointment letter or company policy carefully." },
        { q: "How soon must an employer pay gratuity, and can it be refused?", a: "Once gratuity becomes payable, the employer is required to pay it within 30 days of the due date, and simple interest is payable on delayed amounts. Gratuity can be forfeited only in narrow circumstances set out in Section 4(6) of the Act, such as termination for wilful damage, riotous conduct or an offence involving moral turpitude committed during employment, and even then only to the extent of the loss caused. If payment is withheld without cause, you can apply to the controlling authority under the Act." },
        { q: "Do contract and fixed-term employees get gratuity?", a: "Employees engaged directly on fixed-term contracts are generally treated like other employees for gratuity, provided they meet the continuous service condition. Workers supplied through a contractor are normally the contractor's employees for this purpose, so the claim lies against the contractor rather than the principal employer. Recent labour code reforms have moved towards pro-rata gratuity for fixed-term employment, so check the rules notified for your state and industry before assuming you do not qualify." },
      ]}
    />
  );
}
