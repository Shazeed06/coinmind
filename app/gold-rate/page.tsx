import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getGoldRates } from "@/lib/gold";
import { formatCurrency } from "@/lib/format";
import AuthorReviewBox from "@/components/AuthorReviewBox";

export const revalidate = 43200; // refresh at most twice a day

export const metadata: Metadata = {
  title: { absolute: "Gold Rate Today in India — 24K & 22K Price (INR)" },
  description:
    "Today's gold rate in India for 24K and 22K per gram and 10 grams, plus the silver rate — in INR, updated daily from live spot prices.",
  alternates: { canonical: "/gold-rate" },
};

const inr = (n: number) => formatCurrency(n, "INR");

export default async function GoldRatePage() {
  const g = await getGoldRates();

  const weights = [1, 8, 10, 100];
  const dateLabel = g.updated
    ? new Date(g.updated).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const faqs = [
    {
      q: "What is the gold rate today in India?",
      a: g.ok
        ? `Today 24K (pure) gold is about ${inr(g.gold24kPerGram)} per gram (${inr(g.gold24kPer10g)} for 10 grams) and 22K (jewellery) gold is about ${inr(g.gold22kPerGram)} per gram. These are indicative prices derived from the international spot rate converted to INR; your local jeweller's rate will differ slightly.`
        : "Gold in India is quoted as 24K (pure, used for coins and investment) and 22K (used for jewellery). This page shows the current per-gram and per-10-gram rate in rupees, derived from the live international spot price.",
    },
    {
      q: "What is the difference between 24K and 22K gold?",
      a: "24K gold is 99.9% pure and is used for coins, bars and investment. 22K gold is about 91.6% pure (the rest is other metals for strength) and is used for jewellery. That is why 22K costs less per gram than 24K — you are paying for less pure gold.",
    },
    {
      q: "Why does the gold rate vary by city?",
      a: "The underlying spot price is the same everywhere, but the final retail rate in Mumbai, Delhi, Chennai, Kolkata or Bengaluru varies with GST, state levies, transport, and each jeweller's making charges and margin. Treat the figures here as the indicative base rate before those local additions.",
    },
    {
      q: "Is this the live gold price?",
      a: "The rate is refreshed from live spot data and is intended as an up-to-date reference. It is not a real-time trading quote, and it excludes GST and jeweller making charges — always confirm the exact rate and final bill with your jeweller before buying.",
    },
  ];

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Gold Rate Today", item: `${site.url}/gold-rate` },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <span className="text-ink">Gold Rate Today</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Gold &amp; Silver · India
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Gold rate today in India
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          The current 24K and 22K gold price per gram and per 10 grams, plus the
          silver rate — in Indian rupees.
        </p>
      </header>

      {/* Quick answer / price cards */}
      {g.ok ? (
        <>
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brass">24K Gold · pure</p>
              <p className="mt-2 font-display text-4xl font-600 text-forest">{inr(g.gold24kPerGram)}<span className="text-lg text-ink-faint font-normal"> /gram</span></p>
              <p className="mt-1 text-sm text-ink-soft">{inr(g.gold24kPer10g)} for 10 grams</p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brass">22K Gold · jewellery</p>
              <p className="mt-2 font-display text-4xl font-600 text-forest">{inr(g.gold22kPerGram)}<span className="text-lg text-ink-faint font-normal"> /gram</span></p>
              <p className="mt-1 text-sm text-ink-soft">{inr(g.gold22kPer10g)} for 10 grams</p>
            </div>
          </section>

          <section className="mt-4 rounded-2xl border border-line bg-paper-2 p-5">
            <p className="text-sm text-ink-soft">
              <strong className="text-ink">Silver:</strong> about {inr(g.silverPerGram)} per gram
              ({inr(g.silverPerKg)} per kg).
            </p>
          </section>

          {/* Weight table — AEO extractable */}
          <section className="mt-8">
            <h2 className="font-display text-2xl font-600 text-ink">Gold price by weight (INR)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[420px] border-collapse text-sm">
                <thead>
                  <tr className="bg-paper-2 text-left">
                    <th className="px-4 py-3 font-600 text-ink">Weight</th>
                    <th className="px-4 py-3 font-600 text-forest">24K</th>
                    <th className="px-4 py-3 font-600 text-ink">22K</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((w) => (
                    <tr key={w} className="border-t border-line">
                      <th scope="row" className="px-4 py-3 font-medium text-ink whitespace-nowrap">{w} gram{w > 1 ? "s" : ""}</th>
                      <td className="px-4 py-3 text-forest font-600 whitespace-nowrap">{inr(g.gold24kPerGram * w)}</td>
                      <td className="px-4 py-3 text-ink-soft whitespace-nowrap">{inr(g.gold22kPerGram * w)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-ink-faint leading-relaxed">
              {dateLabel ? `Spot data as of ${dateLabel}. ` : ""}
              Indicative prices derived from the international spot rate in INR —
              <strong> excluding GST and jeweller making charges</strong>. Local
              city rates vary. Rates via{" "}
              <a href="https://metalpriceapi.com" target="_blank" rel="noopener noreferrer nofollow" className="text-forest underline underline-offset-2">MetalpriceAPI</a>.
            </p>
          </section>
        </>
      ) : (
        <section className="mt-8 rounded-2xl border border-line bg-paper-2 p-6">
          <p className="text-ink-soft leading-relaxed">
            Live gold &amp; silver rates are being set up and will appear here
            shortly. In the meantime: 24K gold is pure gold (used for coins and
            investment) and 22K is the jewellery grade (about 91.6% pure), which
            is why 22K costs less per gram. The final price you pay a jeweller
            also includes GST and making charges on top of the metal rate.
          </p>
        </section>
      )}

      {/* Explainer */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">How the gold rate is set</h2>
        <div className="mt-4 space-y-4 text-ink-soft leading-relaxed">
          <p>
            Gold is traded globally in US dollars per troy ounce (about 31.1
            grams). The India rate you see is that international spot price
            converted into rupees and divided down to a per-gram figure, then
            adjusted for purity — 24K for pure gold and 22K (91.6%) for
            jewellery. Because the base is a global market price, it moves every
            day with the dollar, interest rates and demand.
          </p>
          <p>
            What your local jeweller charges adds a few more layers on top: 3%
            GST on the gold value, GST on making charges, and the jeweller&apos;s
            own making charge and margin — which is why the billed amount is
            higher than the raw metal rate, and why rates differ slightly between
            cities and shops.
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Plan around it</h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Thinking of gold as an investment? Compare it against other options —
          project a{" "}
          <Link href="/calculators/sip" className="text-forest underline underline-offset-2">monthly SIP</Link>,
          a{" "}
          <Link href="/calculators/fd" className="text-forest underline underline-offset-2">fixed deposit</Link>, or{" "}
          <Link href="/calculators/ppf" className="text-forest underline underline-offset-2">PPF</Link>{" "}
          to see how each could grow over the same period.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Frequently asked questions</h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink font-medium list-none">
                {f.q}
                <span className="text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 mb-8 max-w-3xl">
        <AuthorReviewBox
          sources={[
            { label: "MetalpriceAPI (spot data)", href: "https://metalpriceapi.com" },
            { label: "RBI", href: "https://www.rbi.org.in" },
          ]}
        />
      </div>
    </div>
  );
}
