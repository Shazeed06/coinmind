import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Corrections - Errors Found & Fixed · ${site.name}` },
  description: "A dated public log of errors found on CoinMind and the corrections made.",
  alternates: { canonical: "/corrections" },
  openGraph: {
    locale: "en_IN",
    title: "Corrections - Errors Found & Fixed",
    description: "A dated public log of errors found on CoinMind and the corrections made.",
    url: `${site.url}/corrections`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corrections - Errors Found & Fixed",
    description: "A dated public log of errors found on CoinMind and the corrections made.",
    images: ["/opengraph-image"],
  },
};

const CORRECTIONS = [
  {
    date: "2026-11-05",
    title: "HRA Exemption Calculator: Updated metro definition & Section 10(13A) limits",
    detail: "Refined the HRA Exemption Calculator to explicitly separate Delhi, Mumbai, Kolkata, and Chennai (50% of basic) from non-metro areas (40% of basic), and added direct guidance clarifying that HRA exemption is exclusively available under the Old Tax Regime.",
  },
  {
    date: "2026-10-24",
    title: "SIP Calculator: Alignment of compounding formula for monthly annuity cashflows",
    detail: "Corrected the milestone table on the SIP calculator page to ensure future value projections account for monthly compounding annuity cashflows rather than an annual lumped balance, matching the interactive calculator's exact mathematical output.",
  },
  {
    date: "2026-09-18",
    title: "Income Tax Calculator: Updated standard deduction to ₹75,000 under New Tax Regime",
    detail: "Updated the default salaried deduction in all income tax calculators and take-home salary projections from ₹50,000 to ₹75,000 in accordance with the revised Finance Act provisions for the New Tax Regime.",
  },
  {
    date: "2026-08-12",
    title: "Capital Gains Tax: Updated equity LTCG rate to 12.5% and ₹1.25 Lakh exemption limit",
    detail: "Updated capital gains calculations across mutual fund and equity calculators to reflect the revised Section 112A long-term capital gains tax rate of 12.5% with the expanded annual exemption limit of ₹1,25,000.",
  },
  {
    date: "2026-07-28",
    title: "Homepage stats: replaced '99.9% Accuracy' with 'Updated July 2026'",
    detail: "The claim '99.9% Accuracy' was not verifiable against a specific metric. Replaced with the verifiable fact 'Updated July 2026' reflecting the last content review date.",
  },
  {
    date: "2026-07-28",
    title: "Homepage stats: 'Expert Guides' changed to 'In-Depth Guides'",
    detail: "'Expert' implies guarantees of specific credentialed review on every article. Changed to 'In-Depth Guides' which accurately describes the content.",
  },
  {
    date: "2026-07-28",
    title: "Removed medical calculators from finance calculator listing",
    detail: "BMI, Calorie, Ideal Weight and Pregnancy Due Date calculators were removed from the calculators listing as they are not personal finance tools and dilute the site's topical focus.",
  },
];

export default function CorrectionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Corrections Policy & Audit Log",
    description:
      "A dated public log of errors found on CoinMind, correction standards, and our editorial verification policy.",
    url: `${site.url}/corrections`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="container-main py-20">
      <div className="max-w-[780px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand bg-brand/10 px-3 py-1 rounded-full">
            Editorial Accountability
          </span>
        </div>
        <h1 className="h1 text-text">Corrections Policy & Public Log</h1>
        <p className="body text-text-muted mt-4 text-base leading-relaxed">
          At {site.name}, accuracy is our fundamental commitment. In financial calculators and tax guides, an inaccurate formula or outdated tax slab can misinform real-world financial planning. When errors occur, we do not quietly edit them away. We acknowledge, document, and correct them in public on this page.
        </p>

        {/* Policy Section */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-border shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-text">Our Correction Standards</h2>
          <div className="space-y-3 text-sm text-text-muted leading-relaxed">
            <p>
              <strong>1. Prompt Resolution:</strong> Any substantive factual error, mathematical discrepancy, or tax law change brought to our attention is reviewed within 24 hours and corrected upon statutory verification.
            </p>
            <p>
              <strong>2. Transparent Logging:</strong> Substantive errors (such as formula revisions, tax slab corrections, or factual misstatements) are permanently logged below with the date of correction, affected component, and explanation.
            </p>
            <p>
              <strong>3. Minor Typographical Fixes:</strong> Minor spelling corrections, grammatical polish, and formatting improvements that do not alter numerical or factual meaning are implemented immediately without requiring an itemized public log entry.
            </p>
            <p>
              <strong>4. Statutory Source Cross-Check:</strong> All financial formula corrections are verified against primary publications from the Reserve Bank of India (RBI), the Securities and Exchange Board of India (SEBI), or the Central Board of Direct Taxes (CBDT).
            </p>
          </div>
        </div>

        {/* How to Report */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h2 className="text-lg font-bold text-text mb-2">How to Report an Error</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            If you identify a calculation discrepancy, an outdated regulation, or a broken source link anywhere on {site.name}, please contact our editorial desk at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">{site.email}</a>{" "}
            or submit details through our <a href="/contact" className="font-semibold text-brand underline">contact form</a>. Please include the URL of the affected page and the specific statutory clause or numerical steps.
          </p>
        </div>

        {/* Public Log */}
        <h2 className="text-2xl font-bold text-text mt-12 mb-6">Chronological Log of Corrections</h2>
        <div className="space-y-4">
          {CORRECTIONS.map((c, i) => (
            <div key={i} className="card p-6 bg-white border border-border rounded-2xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <span className="text-xs font-mono font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-md shrink-0 w-fit">
                  {c.date}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-text">{c.title}</h3>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed">{c.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-card bg-bg-alt border border-border text-sm text-text-muted">
          <p>
            This public audit log was initiated in July 2026. All subsequent material corrections across all calculators, guides, and tools are archived here indefinitely.
          </p>
        </div>
      </div>
    </div>
  );
}
