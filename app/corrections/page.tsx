import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Corrections - Errors Found & Fixed · ${site.name}` },
  description: "A dated public log of errors found on CoinMind and the corrections made.",
  alternates: { canonical: "/corrections" },
};

const CORRECTIONS = [
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
    name: "Corrections",
    description:
      "A dated public log of errors found on CoinMind and the corrections made.",
    url: `${site.url}/corrections`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <h1 className="h1 text-text">Corrections</h1>
        <p className="body text-text-muted mt-4">
          We maintain a public log of errors found on {site.name} and the corrections made. If you spot something that looks wrong, please write to{" "}
          <a href={`mailto:${site.email}`} className="text-brand underline">{site.email}</a>. We check every report.
        </p>

        <div className="mt-12 space-y-6">
          {CORRECTIONS.map((c, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-start gap-4">
                <span className="eyebrow text-text-muted shrink-0 w-24">{c.date}</span>
                <div>
                  <h2 className="text-base font-semibold text-text">{c.title}</h2>
                  <p className="text-sm text-text-muted mt-1">{c.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-card bg-bg-alt border border-border text-sm text-text-muted">
          <p>This log was started on 28 July 2026. Earlier corrections are not recorded individually but were incorporated during regular content reviews.</p>
        </div>
      </div>
    </div>
  );
}
