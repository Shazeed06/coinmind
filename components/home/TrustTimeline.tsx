import { Section, Card, CardBody } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import { ShieldCheck, FileText, Eye, RefreshCw, Lock, CheckCircle } from "lucide-react";

const PRINCIPLES = [
  { icon: ShieldCheck, title: "Source-Verified", desc: "Every formula cross-checked against SEBI, RBI and IT Department publications." },
  { icon: FileText, title: "Expert-Reviewed", desc: "All content reviewed by a CA (Final) candidate for accuracy and relevance." },
  { icon: RefreshCw, title: "Budget-Ready", desc: "Updated within 48 hours of every Union Budget and regulatory change." },
  { icon: Eye, title: "Radically Transparent", desc: "We show the formula behind every calculation, no black boxes." },
  { icon: Lock, title: "Privacy by Design", desc: "Zero data leaves your device. No accounts, no tracking, no storage." },
  { icon: CheckCircle, title: "Commitment Free", desc: "Every tool is free, forever. No upsells, no hidden tiers, no paywalls." },
];

export default function TrustTimeline() {
  return (
    <Section variant="white">
      <SectionIntro
        eyebrow="Trust & Accuracy"
        title="Built on Transparency and Accuracy"
        subline="Six principles that guide everything we build."
      />
      <p className="body text-text-muted text-center max-w-[720px] mx-auto mb-10">
        Financial decisions depend on accurate numbers. Every calculator on CoinMind is built using formulas published by India's regulatory bodies and reviewed by a qualified chartered accountancy candidate. When tax slabs change or RBI updates its rates, we update our tools within 48 hours so your calculations always reflect the latest rules.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRINCIPLES.map((p) => (
          <Card key={p.title}>
            <CardBody>
              {/* Green accent rather than the site-wide blue: this is the one
                  trust/accuracy block on the page, and every other card grid
                  above and below it is a row of blue icons on white. The soft
                  chip also gives the icon a shape so the cards stop reading as
                  identical text blocks. */}
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent mx-auto sm:mx-0">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-text mt-4 text-center sm:text-left">{p.title}</h3>
              <p className="text-sm text-text-muted mt-1.5 leading-relaxed text-center sm:text-left">{p.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
