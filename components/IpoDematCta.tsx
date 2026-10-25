import Link from "next/link";

// Shared "how to act on this IPO" block. IPO pages are the site's top
// search-click earners, and applying for an IPO needs a demat + trading
// account - so this funnels that intent into the demat/trading explainers,
// the how-to guide and a broker comparison.
export default function IpoDematCta() {
  return (
    <section className="rounded-2xl border border-brand/20 bg-brand/5 p-5 sm:p-6">
      <h2 className="text-base font-bold text-text mb-1.5">
        Before you apply: you need a demat account
      </h2>
      <p className="text-sm text-text-muted leading-relaxed">
        You can only apply for an IPO through a{" "}
        <Link href="/glossary/demat-account" className="text-brand font-medium hover:underline">
          demat account
        </Link>
        , which holds the shares, paired with a{" "}
        <Link href="/glossary/trading-account" className="text-brand font-medium hover:underline">
          trading account
        </Link>{" "}
        that places the order. Most brokers open both together, online and often free.
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <Link href="/blog/how-to-open-demat-account" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
          How to open a demat account
        </Link>
        <Link href="/blog/groww-vs-zerodha-vs-angel-one-2026" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
          Compare brokers: Groww vs Zerodha
        </Link>
        <Link href="/glossary/ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
          What is an IPO?
        </Link>
      </div>
    </section>
  );
}
