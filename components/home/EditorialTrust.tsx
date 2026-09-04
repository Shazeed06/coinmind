import Link from "next/link";
import { Section, Card, CardBody } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import { CheckCircle, BookOpen, RefreshCw, FileSearch } from "lucide-react";
import { site } from "@/lib/site";

const ITEMS = [
  { icon: CheckCircle, title: "Fact-Checked", desc: "Every number, claim and formula verified against primary sources before publication." },
  { icon: BookOpen, title: "Plain English", desc: "Complex finance concepts explained without jargon. No padding, no fluff." },
  { icon: RefreshCw, title: "Regularly Updated", desc: "Content reviewed every quarter and updated after every Budget and RBI announcement." },
  { icon: FileSearch, title: "Sources Cited", desc: "Every guide, comparison and definition links to its original source: RBI, SEBI, or IT Department." },
];

const TRUST_BADGES = [
  "SEBI Disclaimer Compliant",
  "No Investment Advice",
  "Zero Data Collection",
];

export default function EditorialTrust() {
  return (
    // White, not "alt": FaqSection immediately above is already the alt tint, so
    // two alt bands in a row merged into one 1,364px slab of grey with no seam.
    <Section variant="white">
      <SectionIntro
        eyebrow="Editorial Integrity"
        title="Editorial Standards & Accuracy"
        subline="How we ensure everything on CoinMind is trustworthy."
      />
      <p className="body text-text-muted text-center max-w-[720px] mx-auto mb-10">
        Every guide, comparison, and definition published on CoinMind links back to its original regulatory source. Content is reviewed quarterly, updated within 48 hours of every Union Budget, and written in plain English so that readers at every experience level can understand and act on the information with confidence.
      </p>
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

      {/* Trust signal badges — E-E-A-T: visible compliance and transparency markers */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {TRUST_BADGES.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            {badge}
          </span>
        ))}
      </div>

      {/* External citations — E-E-A-T: contextual links to authoritative regulators */}
      <p className="mt-6 text-center text-xs text-text-muted max-w-2xl mx-auto leading-relaxed">
        Our calculators and guides reference official data from the{" "}
        <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-text">
          Reserve Bank of India (RBI)
        </a>
        ,{" "}
        <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-text">
          Securities and Exchange Board of India (SEBI)
        </a>
        , and the{" "}
        <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-text">
          Income Tax Department
        </a>
        .
      </p>

      {/* Author byline + content date — E-E-A-T: who wrote it, credentials, when updated */}
      <div className="mt-8 border-t border-line pt-6 text-center">
        <p className="text-sm text-text-muted">
          Written by{" "}
          <Link href={`/authors/${site.author.slug}`} className="font-medium text-text underline hover:text-brand">
            {site.author.fullName}
          </Link>
          , {site.author.credential}, {site.author.role} of {site.name}.
          {" "}Based in India.
        </p>
        <p className="text-xs text-text-muted mt-1">
          Last updated: September 2026
        </p>
      </div>
    </Section>
  );
}
