import Link from "next/link";
import { IconArrow } from "@/components/icons";

const COMPARISONS = [
  { a: "FD", b: "SIP", href: "/blog/sip-vs-lumpsum", desc: "Fixed deposits offer guaranteed returns. SIPs in equity can beat inflation. Which suits your goal?", tag: "Popular" },
  { a: "PPF", b: "NPS", href: "/blog/ppf-vs-fd-vs-nps", desc: "PPF is safe with tax-free returns. NPS offers market-linked growth. One may suit you better for retirement.", tag: "Retirement" },
  { a: "Old Regime", b: "New Regime", href: "/tax-regime-break-even", desc: "The old regime rewards deductions. The new regime has lower rates. Find your exact break-even point.", tag: "Tax" },
  { a: "Gold ETFs", b: "SGB", href: "/blog/gold-investment-guide-india", desc: "ETFs offer liquidity. SGBs pay interest. Digital gold offers convenience. Compare the real costs.", tag: "Gold" },
  { a: "UPS", b: "NPS", href: "/blog/ups-vs-nps", desc: "UPS guarantees your pension. NPS lets your corpus grow with markets. Which pension path fits you?", tag: "Pension" },
  { a: "CTC", b: "In-Hand", href: "/blog/ctc-vs-in-hand-salary", desc: "Your offer letter says one number. Your bank account shows another. Understand every deduction.", tag: "Salary" },
];

export default function ComparisonHub() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Compare</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          Side-by-Side Financial Comparisons
        </h2>
        <p className="mt-3 text-ink-soft">Not sure which option is right? We break down the trade-offs clearly.</p>
      </div>

      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {COMPARISONS.map((c) => (
          <Link key={c.href} href={c.href} className="break-inside-avoid group block rounded-2xl border border-line bg-card p-6 transition-all hover:border-forest hover:shadow-lg hover:-translate-y-0.5">
            <span className="inline-flex items-center rounded-full bg-forest-soft px-2.5 py-0.5 text-[11px] font-semibold text-forest mb-3">{c.tag}</span>
            <h3 className="font-display text-xl font-600 text-ink">
              <span className="text-forest">{c.a}</span> vs <span className="text-brass">{c.b}</span>
            </h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{c.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-forest group-hover:gap-2 transition-all">
              Compare <IconArrow className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/blog" className="text-sm font-semibold text-forest hover:underline">
          Browse all comparisons &rarr;
        </Link>
      </div>
    </section>
  );
}
