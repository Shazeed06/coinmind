import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui";
import { GLOSSARY } from "@/lib/glossary";
import { ArrowRight } from "lucide-react";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const terms = GLOSSARY.slice(0, 12);

export default function FinanceGlossary() {
  return (
    <Section variant="white">
      <SectionHeader
        eyebrow="Glossary"
        title="A–Z Finance Terms"
        subline="Plain-English definitions of key finance and AI terms."
      />
      <div className="flex flex-wrap gap-1.5 justify-center mb-8">
        {ALPHABETS.map((l) => (
          <button key={l} className="w-8 h-8 rounded-input text-xs font-medium text-text-muted hover:text-brand hover:bg-brand/10 transition-colors">
            {l}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {terms.map((t) => (
          <Link key={t.slug} href={`/glossary/${t.slug}`} className="card card-h-full p-4">
            <p className="text-sm font-semibold text-text">{t.term}</p>
            <p className="text-xs text-text-muted mt-1 line-clamp-2">{t.short}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/glossary" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
          Browse full glossary <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
