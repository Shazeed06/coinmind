import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Editorial Standards & How We Ensure Accuracy · CoinMind" },
  description:
    "How CoinMind researches, writes, reviews and updates its finance calculators and guides — the official sources we use and our corrections policy.",
  alternates: { canonical: "/editorial-standards" },
  openGraph: { url: "/editorial-standards" },
};

const SOURCES: { label: string; href: string; what: string }[] = [
  { label: "Reserve Bank of India (RBI)", href: "https://www.rbi.org.in", what: "repo rate, banking and small-savings rules" },
  { label: "Income Tax Department, Govt. of India", href: "https://www.incometax.gov.in", what: "tax slabs, deductions and rebates" },
  { label: "AMFI", href: "https://www.amfiindia.com", what: "mutual fund and SIP data" },
  { label: "EPFO", href: "https://www.epfindia.gov.in", what: "EPF interest and contribution rules" },
  { label: "SEBI", href: "https://www.sebi.gov.in", what: "investor-protection and market rules" },
  { label: "National Savings Institute / India Post", href: "https://www.nsiindia.gov.in", what: "PPF, NSC and post-office scheme rates" },
];

export default function EditorialStandardsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Editorial Standards",
    url: `${site.url}/editorial-standards`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <span className="text-ink">Editorial standards</span>
      </nav>

      <header className="mt-6">
        <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Editorial standards &amp; how we ensure accuracy
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          {site.name} publishes money and AI tools that people use to make real
          decisions. That is a responsibility we take seriously. Here is exactly
          how our content is created, checked and kept up to date.
        </p>
      </header>

      <article className="article mt-10">
        <h2>How we build our calculators</h2>
        <p>
          Every calculator on {site.name} runs on the published, standard formula
          for that calculation — for example, the future-value formula for SIPs,
          the reducing-balance formula for EMIs, and the official income-tax slabs
          for the current financial year. The maths runs privately in your
          browser; we don&apos;t guess or approximate. Where a calculator shows a
          worked example, the numbers come from the same formula the tool uses, so
          the example and the calculator never disagree.
        </p>

        <h2>The sources we check against</h2>
        <p>
          Rates and rules change, so we verify our figures against primary,
          official sources rather than second-hand blogs:
        </p>
        <ul>
          {SOURCES.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="text-forest underline underline-offset-2">
                {s.label}
              </a>{" "}
              — {s.what}.
            </li>
          ))}
        </ul>

        <h2>How our guides are written and reviewed</h2>
        <p>
          Our guides are researched from primary sources, written in plain
          English, and reviewed for factual accuracy before publishing. We use AI
          to help with research and first drafts — as many modern publishers do —
          but a person edits, fact-checks and approves every page. We do not
          publish thin, auto-generated pages: if a page doesn&apos;t add something
          genuinely useful, we don&apos;t ship it.
        </p>

        <h2>When we update pages</h2>
        <p>
          Tax slabs, interest rates and scheme rules are reviewed whenever the
          government or RBI announces a change — for example, around the Union
          Budget and RBI monetary-policy meetings — and the affected calculators
          and guides are updated promptly.
        </p>

        <h2>Educational, not financial advice</h2>
        <p>
          Everything on {site.name} is educational information to help you
          understand your options. It is not personalised financial, tax or
          investment advice, and we are not a SEBI-registered adviser. For a
          decision that materially affects your money, confirm the current figures
          and consider speaking to a qualified professional. See our full{" "}
          <Link href="/disclaimer" className="text-forest underline underline-offset-2">disclaimer</Link>.
        </p>

        <h2>Corrections</h2>
        <p>
          If you spot something that looks wrong, please tell us at{" "}
          <a href={`mailto:${site.email}`} className="text-forest underline underline-offset-2">{site.email}</a>{" "}
          — we check every report and fix genuine errors quickly. You can read
          more about who we are on our{" "}
          <Link href="/about" className="text-forest underline underline-offset-2">About page</Link>.
        </p>
      </article>

      <div className="mt-12 mb-8 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft">
        <strong className="text-ink">Independence:</strong> our tools are free and
        our reviews are based on hands-on research and public information. We may
        add affiliate links in future; if we do, they will never change our
        ratings or recommendations.
      </div>
    </div>
  );
}
