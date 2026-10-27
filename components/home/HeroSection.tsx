import Link from "next/link";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { calculators, posts } from "@/lib/data";

const CALC_COUNT = calculators.filter((c) => c.live).length;
const GUIDE_COUNT = posts.length;

// A handful of the highest-intent calculators, surfaced as quick jumps right
// under the search box so the hero works as a launcher, not just a banner.
const QUICK = [
  { label: "SIP", href: "/calculators/sip" },
  { label: "Income Tax", href: "/calculators/income-tax" },
  { label: "EMI", href: "/calculators/emi" },
  { label: "FD", href: "/calculators/fd" },
  { label: "PPF", href: "/calculators/ppf" },
  { label: "Retirement", href: "/calculators/retirement" },
];

const STATS = [
  { n: `${CALC_COUNT}+`, l: "Free calculators" },
  { n: `${GUIDE_COUNT}+`, l: "In-depth guides" },
  { n: "RBI · SEBI", l: "Verified formulas" },
];

// A clean, centred, search-first hero. Generous whitespace, one soft blue wash
// in the background, a big headline, and the search + quick jumps as the single
// focal point — the page leads with "find your calculator", not a product shot.
export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eef6fb] via-[#f7fbfd] to-white">
      <div
        className="pointer-events-none absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#2aa7de]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container-main flex flex-col items-center py-20 text-center sm:py-28 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-pill border border-[#d4e7f3] bg-white/80 px-4 py-1.5 text-xs font-medium text-text-muted shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
          100% Free · No sign-up · Made for India
        </span>

        <h1 className="mt-7 max-w-[840px] text-[2.5rem] font-extrabold leading-[1.04] tracking-tight text-text sm:text-[3.5rem] lg:text-[4rem]">
          Free Personal Finance{" "}
          <span className="text-brand">Calculators</span> for India
        </h1>

        <p className="mt-6 max-w-[560px] text-base leading-relaxed text-text-muted sm:text-lg">
          Plan your SIP, income tax, EMI, FD and retirement in seconds — accurate, private and instant. Every tool runs in your browser, with no sign-up.
        </p>

        {/* Search is the hero's focal point. A plain GET form, so it needs no
            client JavaScript and the section stays a server component. */}
        <form
          action="/search"
          method="GET"
          role="search"
          className="relative mt-10 w-full max-w-[600px]"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search calculators, guides and tools
          </label>
          <Search
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            id="hero-search"
            name="q"
            type="search"
            placeholder="Search calculators… SIP, home loan, income tax"
            className="h-14 w-full rounded-full border border-border bg-white pl-[52px] pr-[112px] text-sm text-text shadow-[0_12px_40px_-16px_rgba(42,167,222,0.45)] outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 inline-flex h-10 -translate-y-1/2 items-center gap-1.5 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-medium text-text-muted">Popular:</span>
          {QUICK.map((q) => (
            <Link
              key={q.label}
              href={q.href}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-brand hover:text-brand"
            >
              {q.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/calculators"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(42,167,222,0.6)] transition-opacity hover:opacity-90"
          >
            Explore all calculators <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-7 text-sm font-semibold text-text transition-colors hover:border-brand hover:text-brand"
          >
            Read guides
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-[600px] grid-cols-3 gap-4 border-t border-border pt-8">
          {STATS.map(({ n, l }) => (
            <div key={l}>
              <p className="text-2xl font-extrabold leading-none text-text sm:text-[28px]">{n}</p>
              <p className="mt-1.5 text-xs text-text-muted sm:text-sm">{l}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 inline-flex items-center gap-1.5 text-xs text-text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
          Private by design — every calculation stays in your browser.
        </p>
      </div>
    </section>
  );
}
