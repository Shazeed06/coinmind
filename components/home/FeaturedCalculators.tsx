import Link from "next/link";
import { calculators } from "@/lib/data";
import { IconArrow, IconCalculator, IconChart, IconSparkle } from "@/components/icons";

const liveCalcs = calculators.filter((c) => c.live);

const FEATURED = [
  { slug: "sip", label: "Most Used" },
  { slug: "emi", label: "Trending" },
  { slug: "income-tax", label: "Popular" },
  { slug: "fd", label: "Top Rated" },
  { slug: "retirement", label: "Long-term" },
  { slug: "swp", label: "Popular" },
  { slug: "lumpsum", label: "Best for" },
  { slug: "cagr", label: "Essential" },
];

export default function FeaturedCalculators() {
  const items = FEATURED.map((f) => ({ ...f, calc: liveCalcs.find((c) => c.slug === f.slug) })).filter((f) => f.calc);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Calculators</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          {liveCalcs.length} Free Financial Calculators
        </h2>
        <p className="mt-3 text-ink-soft max-w-2xl mx-auto">
          Every calculator is free, private, and runs in your browser. No sign-up, no data collection, no hidden limits.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.slice(0, 4).map(({ calc, label }, i) => {
          if (!calc) return null;
          const sizes = ["lg:row-span-2 lg:col-span-2", "", "", ""];
          return (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`} className={`group relative rounded-2xl border border-line bg-card p-6 transition-all hover:border-forest hover:shadow-xl hover:shadow-forest/5 ${sizes[i] || ""}`}>
              <span className="inline-flex items-center gap-1 rounded-full bg-forest-soft px-2.5 py-0.5 text-[11px] font-semibold text-forest mb-4">
                <IconSparkle className="h-3 w-3" /> {label}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest mb-4"><IconCalculator className="h-5 w-5" /></span>
              <h3 className="font-display text-lg font-600 text-ink group-hover:text-forest transition-colors">{calc.title}</h3>
              <p className="mt-1.5 text-sm text-ink-faint">{calc.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-forest">Open <IconArrow className="h-3 w-3" /></span>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {items.slice(4).map(({ calc }) => {
          if (!calc) return null;
          return (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="group rounded-2xl border border-line bg-card p-5 transition-all hover:border-forest hover:shadow-lg hover:shadow-forest/5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brass-soft text-brass mb-3"><IconChart className="h-4 w-4" /></span>
              <h3 className="font-display text-base font-600 text-ink group-hover:text-forest transition-colors">{calc.title}</h3>
              <p className="mt-1 text-xs text-ink-faint">{calc.blurb}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link href="/calculators" className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition-all shadow-lg shadow-forest/20">
          Browse All {liveCalcs.length} Calculators <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
