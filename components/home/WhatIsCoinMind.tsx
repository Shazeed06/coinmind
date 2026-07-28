import Link from "next/link";
import { calculators, posts } from "@/lib/data";
import { IconCheck, IconArrow } from "@/components/icons";

const liveCalcs = calculators.filter((c) => c.live);

export default function WhatIsCoinMind() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">About</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
            More Than a Calculator Website
          </h2>
          <div className="mt-6 space-y-4 text-sm text-ink-soft leading-relaxed">
            <p>
              CoinMind is India&apos;s personal finance knowledge platform. We combine{" "}
              <strong className="text-ink">{liveCalcs.length} free financial calculators</strong>,{" "}
              <strong className="text-ink">{posts.length} expert-written guides</strong>, and{" "}
              <strong className="text-ink">AI-powered planning tools</strong> into one place, so you can learn, calculate, compare, and plan every financial decision with confidence.
            </p>
            <p>
              Most finance websites either give you a calculator or an article. We give you both — plus the context to understand what the numbers mean for your life. Whether you are calculating an{" "}
              <Link href="/calculators/emi" className="text-forest underline underline-offset-2">EMI</Link>, planning a{" "}
              <Link href="/calculators/sip" className="text-forest underline underline-offset-2">SIP</Link>, comparing{" "}
              <Link href="/tax-regime-break-even" className="text-forest underline underline-offset-2">tax regimes</Link>, or learning about{" "}
              <Link href="/blog/mutual-funds-beginners-india" className="text-forest underline underline-offset-2">mutual funds</Link> — you get the tool and the knowledge together.
            </p>
            <p>
              CoinMind exists because financial literacy should not require a paid subscription, a sign-up form, or a finance degree. Every calculator is free. Every guide is original and fact-checked. No hidden charges, no upsells, no data collection.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "RBI-aligned formulas", "Expert-reviewed content", "Updated after every Budget",
              "Privacy-first (no data leaves your browser)", "No login required", "100% free — forever",
            ].map((s) => (
              <span key={s} className="flex items-center gap-2 text-sm text-ink"><IconCheck className="h-4 w-4 text-forest shrink-0" />{s}</span>
            ))}
          </div>
          <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:gap-2.5 transition-all">
            Learn more about CoinMind <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-paper-2 rounded-2xl border border-line p-6 sm:p-8">
          <p className="text-sm font-semibold text-ink">Built for India, Used Worldwide</p>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            CoinMind serves readers in India, the United States, and the United Kingdom with region-aware calculators, currency support (₹, $, £), and locally relevant financial content. Our calculators handle Indian income tax slabs, US mortgage calculations, and UK tax scenarios.
          </p>
          <div className="mt-5 space-y-3">
            {[
              { n: "India", d: "Income tax, SIP, EMI, PPF, NPS, GST" },
              { n: "United States", d: "Mortgage, 401(k), capital gains, sales tax" },
              { n: "United Kingdom", d: "Mortgage, income tax, VAT, stamp duty" },
            ].map((r) => (
              <div key={r.n} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                <span className="text-sm font-medium text-ink">{r.n}</span>
                <span className="text-xs text-ink-faint">{r.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
