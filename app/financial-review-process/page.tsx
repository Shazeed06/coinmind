import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Financial Review Process · ${site.name}` },
  description: `How ${site.name} verifies financial data, formulas and sources for every calculator and guide. Our step-by-step financial accuracy process.`,
  alternates: { canonical: `${site.url}/financial-review-process` },
};

const STEPS = [
  {
    step: "1",
    title: "Identify the primary source",
    body: "Before writing any calculator or guide, we identify the primary official source for the relevant financial rule. For tax calculators this is the Income Tax Act and incometaxindia.gov.in. For EPF it is EPFO. For RBI-related tools it is rbi.org.in. We never use secondary sources (other websites) as the basis for financial rules.",
  },
  {
    step: "2",
    title: "Derive the formula from first principles",
    body: "We derive or verify the formula from the primary source, not from similar calculators online. The formula is documented on our methodology page alongside its source. Where a formula uses standard financial mathematics (e.g., annuity formula), the derivation is stated explicitly.",
  },
  {
    step: "3",
    title: "Cross-check with worked examples",
    body: "Every calculator is tested against independently worked examples. For tax calculators we cross-check against Income Tax Department illustrations. For compound interest tools we verify against standard textbook examples. For loan EMI tools we verify against RBI's published amortisation methodology.",
  },
  {
    step: "4",
    title: "State assumptions and exclusions explicitly",
    body: "Every calculator page states what the tool assumes and what it deliberately excludes. A SIP calculator assumes constant returns and excludes exit loads. A tax calculator excludes surcharge and cess unless stated. This is not boilerplate — it helps users understand where the estimate may differ from their actual situation.",
  },
  {
    step: "5",
    title: "Human review before publication",
    body: `${site.author.fullName} (${site.author.credential}) reviews every calculator and article before it goes live. There is no auto-publish. AI is used as a drafting and research aid; the final content is human-reviewed.`,
  },
  {
    step: "6",
    title: "Trigger-based re-verification",
    body: "Calculators and guides are re-verified after every Union Budget, RBI MPC announcement, SEBI investor regulation, EPFO notification, PFRDA circular or CBIC GST change that affects our tools. We monitor these sources and update within 5 working days of a material change.",
  },
  {
    step: "7",
    title: "Publish the 'Last verified' date",
    body: "Every calculator page shows the date it was last checked against its primary source. This is not the last 'updated' date (which could reflect trivial cosmetic changes) — it is the date a human confirmed the financial data and formula were current and correct.",
  },
  {
    step: "8",
    title: "Log corrections publicly",
    body: "When we find an error — whether discovered internally or reported by a user — we correct it and log it publicly on our corrections page with the date, what was wrong and what was changed. We never silently edit errors away.",
  },
];

export default function FinancialReviewProcessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Financial Review Process",
    url: `${site.url}/financial-review-process`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <h1 className="h1 text-text">Financial Review Process</h1>
        <p className="body text-text-muted mt-4">
          Finance calculators carry real stakes. A wrong tax formula or incorrect interest rate can mislead someone about their retirement savings, their loan cost or their tax liability. This page documents exactly how we verify financial data and keep it current.
        </p>

        <div className="mt-12 space-y-6">
          {STEPS.map((s) => (
            <div key={s.step} className="card p-6 flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                {s.step}
              </div>
              <div>
                <h2 className="font-semibold text-text">{s.title}</h2>
                <p className="text-sm text-text-muted mt-2">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-card bg-bg-alt border border-border">
          <h2 className="font-semibold text-text">Official sources we monitor</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {[
              { name: "Income Tax Department", url: "https://www.incometaxindia.gov.in" },
              { name: "Reserve Bank of India", url: "https://www.rbi.org.in" },
              { name: "SEBI", url: "https://www.sebi.gov.in" },
              { name: "EPFO", url: "https://www.epfindia.gov.in" },
              { name: "PFRDA / NPS Trust", url: "https://www.npstrust.org.in" },
              { name: "National Savings Institute", url: "https://www.nsiindia.gov.in" },
              { name: "CBIC (GST)", url: "https://www.cbic.gov.in" },
              { name: "Finance Ministry", url: "https://www.finmin.nic.in" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-2"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3 text-sm text-text-muted">
          <p>
            Related:{" "}
            <Link href="/methodology" className="text-brand underline underline-offset-2">Calculator methodology</Link>
            {" · "}
            <Link href="/corrections" className="text-brand underline underline-offset-2">Corrections log</Link>
            {" · "}
            <Link href="/editorial-policy" className="text-brand underline underline-offset-2">Editorial policy</Link>
            {" · "}
            <Link href="/sources" className="text-brand underline underline-offset-2">Official sources</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
