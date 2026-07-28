import { Section, SectionHeader, Card, CardBody } from "@/components/ui";
import { ShieldCheck, FileText, Eye, RefreshCw, Lock, CheckCircle } from "lucide-react";

const PRINCIPLES = [
  { icon: ShieldCheck, title: "Source-Verified", desc: "Every formula cross-checked against SEBI, RBI and IT Department publications." },
  { icon: FileText, title: "Expert-Reviewed", desc: "All content reviewed by a CA (Final) candidate for accuracy and relevance." },
  { icon: RefreshCw, title: "Budget-Ready", desc: "Updated within 48 hours of every Union Budget and regulatory change." },
  { icon: Eye, title: "Radically Transparent", desc: "We show the formula behind every calculation — no black boxes." },
  { icon: Lock, title: "Privacy by Design", desc: "Zero data leaves your device. No accounts, no tracking, no storage." },
  { icon: CheckCircle, title: "Commitment Free", desc: "Every tool is free, forever. No upsells, no hidden tiers, no paywalls." },
];

export default function TrustTimeline() {
  return (
    <Section variant="white">
      <SectionHeader
        eyebrow="Trust & Accuracy"
        title="Built on Transparency and Accuracy"
        subline="Six principles that guide everything we build."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRINCIPLES.map((p) => (
          <Card key={p.title}>
            <CardBody>
              <p.icon className="h-8 w-8 text-brand mx-auto sm:mx-0" />
              <h3 className="text-base font-semibold text-text mt-3 text-center sm:text-left">{p.title}</h3>
              <p className="text-sm text-text-muted mt-1 text-center sm:text-left">{p.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
