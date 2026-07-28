import Link from "next/link";
import { posts } from "@/lib/data";
import { IconArrow } from "@/components/icons";
import CoverArt from "@/components/CoverArt";

const ICON_GUIDES = [
  { label: "How SIP Works", href: "/blog/sip-vs-lumpsum", cat: "Investing" },
  { label: "Tax Saving Guide", href: "/blog/how-to-save-income-tax", cat: "Tax" },
  { label: "Mutual Fund Guide", href: "/blog/mutual-funds-beginners-india", cat: "Investing" },
  { label: "Budget Planning", href: "/blog/50-30-20-budget-rule", cat: "Personal Finance" },
  { label: "Financial Freedom", href: "/blog/fire-retire-early-india", cat: "Personal Finance" },
  { label: "Emergency Fund", href: "/blog/emergency-fund-guide", cat: "Personal Finance" },
  { label: "Gold Investment", href: "/blog/gold-investment-guide-india", cat: "Investing" },
  { label: "Credit Score", href: "/blog/how-to-improve-credit-score", cat: "Credit" },
];

export default function LearningHub() {
  const featured = posts.slice(0, 3);
  return (
    <section className="bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">Learn</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
              Guides That Build Financial Confidence
            </h2>
            <p className="mt-2 text-ink-soft max-w-xl">
              Original, researched, and written in plain English. From beginner basics to advanced strategies.
            </p>
          </div>
          <Link href="/blog" className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:gap-2.5 transition-all">
            All guides <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-line">
                  <CoverArt seed={p.slug} variant={p.art.variant} palette={p.art.palette} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brass">{p.category}</p>
                <h3 className="mt-0.5 font-display text-base font-600 leading-snug text-ink group-hover:text-forest transition-colors">{p.title}</h3>
                <p className="mt-0.5 text-xs text-ink-faint">{p.readMinutes} min read</p>
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Popular Topics</p>
            {ICON_GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className="flex items-center justify-between rounded-xl border border-line bg-card px-4 py-3 transition-all hover:border-forest hover:shadow-sm group">
                <div>
                  <span className="text-xs text-ink-faint">{g.cat}</span>
                  <p className="text-sm font-medium text-ink group-hover:text-forest transition-colors">{g.label}</p>
                </div>
                <IconArrow className="h-4 w-4 shrink-0 text-ink-faint group-hover:text-forest transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
