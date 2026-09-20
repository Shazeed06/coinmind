import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Official Sources · ${site.name}` },
  description: `The authoritative government and regulatory sources ${site.name} uses to verify all financial calculators, tax rules, interest rates and guides for India.`,
  alternates: { canonical: `${site.url}/sources` },
};

const SOURCES = [
  {
    category: "Income Tax",
    items: [
      {
        name: "Income Tax Department, Government of India",
        url: "https://www.incometaxindia.gov.in",
        purpose: "Tax slabs, rebates, deductions, exemptions, TDS rates, capital gains rules",
        used: ["Income Tax Calculator", "HRA Calculator", "TDS Calculator", "Capital Gains Calculator"],
      },
      {
        name: "Finance Act (Union Budget)",
        url: "https://www.indiabudget.gov.in",
        purpose: "Annual changes to tax rates, slabs and deductions",
        used: ["Income Tax Calculator"],
      },
    ],
  },
  {
    category: "Investments & Mutual Funds",
    items: [
      {
        name: "Association of Mutual Funds in India (AMFI)",
        url: "https://www.amfiindia.com",
        purpose: "SIP methodology, NAV data, fund category definitions",
        used: ["SIP Calculator", "Goal SIP Calculator", "Step-Up SIP Calculator"],
      },
      {
        name: "SEBI",
        url: "https://www.sebi.gov.in",
        purpose: "Mutual fund regulations, capital market rules, investor protection guidelines",
        used: ["SIP Calculator", "Capital Gains Calculator"],
      },
    ],
  },
  {
    category: "Banking & Deposits",
    items: [
      {
        name: "Reserve Bank of India (RBI)",
        url: "https://www.rbi.org.in",
        purpose: "Repo rate, FD interest methodology, EMI amortisation standards, bank lending rates",
        used: ["FD Calculator", "EMI Calculator", "Home Loan Eligibility Calculator", "RD Calculator"],
      },
    ],
  },
  {
    category: "Savings Schemes",
    items: [
      {
        name: "National Savings Institute / India Post",
        url: "https://www.nsiindia.gov.in",
        purpose: "PPF interest rate, NSC, POMIS, Sukanya Samriddhi Yojana rules",
        used: ["PPF Calculator", "NSC Calculator", "Post Office MIS Calculator", "Sukanya Samriddhi Calculator"],
      },
    ],
  },
  {
    category: "Provident Fund & Pension",
    items: [
      {
        name: "Employees' Provident Fund Organisation (EPFO)",
        url: "https://www.epfindia.gov.in",
        purpose: "EPF interest rate, contribution rules, EPS, withdrawal conditions",
        used: ["EPF Calculator"],
      },
      {
        name: "Pension Fund Regulatory and Development Authority (PFRDA) / NPS Trust",
        url: "https://www.npstrust.org.in",
        purpose: "NPS contribution rules, annuity provisions, tier-1 and tier-2 accounts",
        used: ["NPS Calculator"],
      },
    ],
  },
  {
    category: "Tax (Indirect)",
    items: [
      {
        name: "Central Board of Indirect Taxes and Customs (CBIC)",
        url: "https://www.cbic.gov.in",
        purpose: "GST rates, GST calculation methodology, reverse charge, composition scheme",
        used: ["GST Calculator"],
      },
    ],
  },
  {
    category: "Gratuity & Salary",
    items: [
      {
        name: "Payment of Gratuity Act, 1972",
        url: "https://labour.gov.in",
        purpose: "Gratuity eligibility, formula, ceiling",
        used: ["Gratuity Calculator"],
      },
    ],
  },
  {
    category: "Inflation & Macroeconomics",
    items: [
      {
        name: "Ministry of Statistics and Programme Implementation (MoSPI)",
        url: "https://mospi.gov.in",
        purpose: "CPI inflation data, WPI data",
        used: ["Inflation Calculator"],
      },
    ],
  },
];

export default function SourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Official Sources",
    description: "The authoritative sources CoinMind uses to verify financial data.",
    url: `${site.url}/sources`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <h1 className="h1 text-text">Official Sources</h1>
        <p className="body text-text-muted mt-4">
          Every calculator and guide on {site.name} is verified against an official primary source. This page lists every source we use, what we use it for and which tools rely on it. We link directly to the source so you can verify the data yourself.
        </p>
        <p className="body text-text-muted mt-3">
          We do not use other finance websites as primary sources. Official government and regulatory publications are the only basis for the financial rules in our calculators.
        </p>

        <div className="mt-12 space-y-10">
          {SOURCES.map((group) => (
            <section key={group.category}>
              <h2 className="h3 text-text">{group.category}</h2>
              <div className="mt-4 space-y-4">
                {group.items.map((src) => (
                  <div key={src.name} className="card p-5">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand hover:underline"
                    >
                      {src.name} ↗
                    </a>
                    <p className="text-sm text-text-muted mt-2">{src.purpose}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {src.used.map((u) => (
                        <span key={u} className="text-xs bg-bg-alt border border-border rounded-full px-2.5 py-1 text-text-muted">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-card bg-bg-alt border border-border text-sm text-text-muted">
          <p>
            <strong className="text-text">Missing a source?</strong> If you believe a calculator uses an outdated or incorrect source, email us at{" "}
            <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">{site.email}</a>. We investigate every report.
          </p>
          <p className="mt-2">
            Related:{" "}
            <Link href="/methodology" className="text-brand underline underline-offset-2">Calculator methodology</Link>
            {" · "}
            <Link href="/financial-review-process" className="text-brand underline underline-offset-2">Financial review process</Link>
            {" · "}
            <Link href="/corrections" className="text-brand underline underline-offset-2">Corrections log</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
