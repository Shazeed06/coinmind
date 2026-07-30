import Link from "next/link";
import { Section, SectionHeader, Card, CardBody, CardFooter } from "@/components/ui";
import { ArrowRight } from "lucide-react";

const COMPARISONS = [
  { a: "SIP", b: "FD", desc: "Market-linked growth vs guaranteed returns.", href: "/blog/sip-vs-lumpsum" },
  { a: "New Tax Regime", b: "Old Tax Regime", desc: "Lower rates with fewer deductions vs higher rates with 80C, HRA.", href: "/calculators/income-tax" },
  { a: "SIP", b: "Lumpsum", desc: "Spread entry vs all-at-once. SIP reduces timing risk.", href: "/blog/sip-vs-lumpsum" },
  { a: "Flat SIP", b: "Step-Up SIP", desc: "Fixed vs annually increasing. Step-up can double your corpus.", href: "/calculators/step-up-sip" },
  { a: "NPS", b: "PPF", desc: "Market-linked pension vs sovereign-guaranteed savings.", href: "/blog/ppf-vs-fd-vs-nps" },
  { a: "Buy", b: "Rent", desc: "Ownership vs flexibility. Buy builds equity.", href: "/calculators/rent-vs-buy" },
];

export default function ComparisonHub() {
  return (
    <Section variant="alt">
      <SectionHeader
        eyebrow="Comparisons"
        title="Side-by-Side Comparisons"
        subline="See how different options stack up — before you decide."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPARISONS.map((c) => (
          <Card key={c.a + c.b} href={c.href}>
            <CardBody>
              <h3 className="text-base font-semibold text-text text-center sm:text-left">{c.a} vs {c.b}</h3>
              <p className="text-sm text-text-muted mt-1 line-clamp-2 text-center sm:text-left">{c.desc}</p>
            </CardBody>
            <CardFooter>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand justify-center sm:justify-start w-full">
                Compare <ArrowRight className="h-4 w-4" />
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
