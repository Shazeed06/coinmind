import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/lib/data";
import { IconArrow, IconCalculator } from "@/components/icons";

export const metadata: Metadata = {
  title: "Free Financial Calculators — SIP, EMI, Tax, FD & More",
  description:
    "A free suite of financial calculators: SIP, EMI, income tax, fixed deposit, PPF, retirement and more. Fast, private and works in ₹, $ and £.",
  alternates: { canonical: "/calculators" },
};

const categories = ["Investing", "Loans", "Tax", "Savings"] as const;

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="pt-14 pb-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> Calculators
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Financial calculators that just work
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Free, private and instant. Plan investments, size a loan, or estimate
          your tax — with support for the Indian rupee, US dollar and British
          pound.
        </p>
      </header>

      {categories.map((cat) => {
        const items = calculators.filter((c) => c.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="mb-12">
            <h2 className="font-display text-2xl font-600 text-ink border-b border-line pb-3">
              {cat}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) =>
                c.live ? (
                  <Link
                    key={c.slug}
                    href={`/calculators/${c.slug}`}
                    className="group rounded-2xl border border-line bg-card p-5 transition-all hover:border-forest hover:shadow-[0_16px_36px_-24px_rgba(30,64,175,0.4)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-soft text-forest transition-colors group-hover:bg-forest group-hover:text-white">
                        <IconCalculator className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-medium text-ink-faint">
                        {c.region === "IN" ? "India" : "Global"}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-600 text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {c.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                      Open{" "}
                      <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ) : (
                  <div
                    key={c.slug}
                    className="rounded-2xl border border-dashed border-line-strong bg-paper-2/50 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-ink-faint">
                        <IconCalculator className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold text-ink-faint">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-600 text-ink-soft">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-faint">
                      {c.blurb}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
