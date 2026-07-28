import { Section, SectionHeader, Card, CardBody } from "@/components/ui";
import { CheckCircle, BookOpen, RefreshCw, FileSearch } from "lucide-react";

const ITEMS = [
  { icon: CheckCircle, title: "Fact-Checked", desc: "Every number, claim and formula verified against primary sources before publication." },
  { icon: BookOpen, title: "Plain English", desc: "Complex finance concepts explained without jargon. No padding, no fluff." },
  { icon: RefreshCw, title: "Regularly Updated", desc: "Content reviewed every quarter and updated after every Budget and RBI announcement." },
  { icon: FileSearch, title: "Sources Cited", desc: "Every guide, comparison and definition links to its original source — RBI, SEBI, or IT Department." },
];

export default function EditorialTrust() {
  return (
    <Section variant="alt">
      <SectionHeader
        eyebrow="Editorial Integrity"
        title="Editorial Standards & Accuracy"
        subline="How we ensure everything on CoinMind is trustworthy."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map((item) => (
          <Card key={item.title}>
            <CardBody className="text-center">
              <item.icon className="h-8 w-8 text-brand mx-auto" />
              <h3 className="text-sm font-semibold text-text mt-3">{item.title}</h3>
              <p className="text-sm text-text-muted mt-1">{item.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
