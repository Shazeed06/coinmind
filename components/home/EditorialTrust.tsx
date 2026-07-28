import Link from "next/link";
import { site } from "@/lib/site";

export default function EditorialTrust() {
  return (
    <section className="bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">Our Standards</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
            Editorial Integrity and Research Standards
          </h2>
          <p className="mt-3 text-ink-soft">
            Every calculator, guide, and comparison on CoinMind follows strict editorial and research standards.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Editorial Policy", body: "All content is original, researched, and written by finance professionals. We never publish AI-generated articles or content written solely for search rankings.", href: "/editorial-standards" },
            { title: "Research Methodology", body: "Our calculators use formulas verified against RBI, SEBI, and Income Tax Department guidelines. Every assumption is documented and explained.", href: "/editorial-standards" },
            { title: "Fact-Checking Process", body: "Every guide is reviewed by our editorial team for accuracy, clarity, and completeness before publication. Corrections are logged transparently.", href: "/editorial-standards" },
            { title: "Review Process", body: `Content is reviewed by ${site.author.name} (${site.author.role}, ${site.author.credential}) and updated after every regulatory change.`, href: "/editorial-standards" },
            { title: "Sources & References", body: "We cite government publications, regulatory filings, and official data sources. All statistics are linked to their original source.", href: "/editorial-standards" },
            { title: "Corrections & Updates", body: "If an error is found, it is corrected promptly with a changelog entry. Readers can report errors through our contact page.", href: "/contact" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="rounded-xl border border-line bg-card p-5 transition-colors hover:border-forest group">
              <h3 className="font-semibold text-ink group-hover:text-forest transition-colors">{item.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{item.body}</p>
              <span className="mt-3 inline-block text-xs font-medium text-forest">Read more &rarr;</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-card p-6 text-center text-sm">
          <p className="text-ink-soft">
            <strong className="text-ink">Last updated:</strong> July 2026 &middot;{" "}
            <strong className="text-ink">Editor:</strong> {site.author.name}, {site.author.role} &middot;{" "}
            <strong className="text-ink">Privacy:</strong>{" "}
            <Link href="/privacy" className="text-forest hover:underline">Privacy Policy</Link> &middot;{" "}
            <Link href="/disclaimer" className="text-forest hover:underline">Disclaimer</Link> &middot;{" "}
            <Link href="/affiliate-disclosure" className="text-forest hover:underline">Affiliate Disclosure</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
