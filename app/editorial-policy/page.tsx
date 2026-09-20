import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `Editorial Policy · ${site.name}` },
  description: `How ${site.name} researches, writes, reviews and updates financial calculators and guides. Our editorial standards, independence and correction process.`,
  alternates: { canonical: `${site.url}/editorial-policy` },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Editorial Policy",
    url: `${site.url}/editorial-policy`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LegalPage
        pill="Editorial Policy"
        title="Editorial Policy"
        subtitle={`How ${site.name} researches, writes, reviews and updates every calculator and guide. Every formula is documented; every source is cited.`}
        lastUpdated="September 2026"
        icon={<BookOpen className="h-6 w-6 text-[#4ade80]" />}
      >
        <div className="space-y-10">
          <section>
            <h2 className="h3 text-text">Our editorial mission</h2>
            <p className="body text-text-muted mt-3">
              {site.name} exists to give ordinary people clear, accurate tools for understanding their personal finances. We are not a news organisation and we are not a financial adviser. We build calculators and write guides that help users understand financial concepts, run their own numbers and make informed decisions.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">How we research</h2>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Every calculator formula is sourced from a primary official source: the Income Tax Act, RBI guidelines, SEBI circulars, EPFO rules, AMFI data or the relevant government notification.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We verify formulas against the official published source, not other websites or blogs.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Where a formula has standard mathematical derivation (compound interest, annuity), we state the formula explicitly so readers can verify it themselves.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We use AI tools as research and drafting aids. AI-generated content is reviewed for accuracy, completeness and tone before publication. We never publish AI output without human review.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">How we write</h2>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Content is written to be understood by someone with no finance background, without condescending.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We avoid jargon where plain English works equally well. Where jargon is unavoidable, we link to our <Link href="/glossary" className="text-brand underline underline-offset-2">glossary</Link>.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We never exaggerate returns, overstate certainty or present projections as guarantees.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Every calculator page states its formula, assumptions and exclusions explicitly.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">How we review</h2>
            <p className="body text-text-muted mt-3">
              {site.author.fullName} ({site.author.credential}) reviews all calculators and guides personally before publication. There is no anonymous or AI-only review process.
            </p>
            <p className="body text-text-muted mt-3">
              Read more on our{" "}
              <Link href="/financial-review-process" className="text-brand underline underline-offset-2">
                financial review process
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">How we update</h2>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Calculator pages show a "Last verified" date. This is the date a human confirmed the formula and sources were current.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We trigger reviews after every Union Budget, RBI monetary policy announcement, SEBI regulation change, and EPFO/PFRDA notification that affects our calculators.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We monitor official sources (Income Tax Department, RBI, SEBI, EPFO, CBIC) for changes relevant to our tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">Commercial independence</h2>
            <p className="body text-text-muted mt-3">
              {site.name} earns money through Google AdSense and occasional affiliate links. Neither influences what we write, how we rank tools or what our calculators show. We do not accept payment for editorial coverage, reviews or placement.
            </p>
            <p className="body text-text-muted mt-3">
              See our{" "}
              <Link href="/affiliate-disclosure" className="text-brand underline underline-offset-2">
                affiliate disclosure
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Corrections</h2>
            <p className="body text-text-muted mt-3">
              When we find an error, we correct it immediately and log it publicly on our{" "}
              <Link href="/corrections" className="text-brand underline underline-offset-2">corrections page</Link>. We do not silently edit pages to hide errors. If you spot something wrong, email us at{" "}
              <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">{site.email}</a>.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">What we do not do</h2>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not provide personalised investment advice.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not claim SEBI registration or any regulatory approval.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not promise specific financial returns from any investment.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not fabricate credentials, endorsements or official approvals.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not generate thousands of thin pages to inflate rankings.</li>
            </ul>
          </section>
        </div>
      </LegalPage>
    </>
  );
}
