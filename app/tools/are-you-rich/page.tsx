import type { Metadata } from "next";
import Link from "next/link";
import IncomePercentile from "@/components/tools/IncomePercentile";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Are You Rich? Income Percentile Calculator" },
  description:
    "See where your income ranks. Enter your salary and country to estimate your income percentile and find out if you're rich by local standards.",
  alternates: { canonical: "/tools/are-you-rich" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/are-you-rich",
    title: "Are You Rich? Income Percentile Calculator",
    description:
      "Enter your income and country to estimate your income percentile — and find out where you rank versus everyone else.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Are You Rich? Income Percentile Calculator",
      },
    ],
  },
};

const faqs = [
  {
    q: "What does an income percentile actually mean?",
    a: "Your income percentile is the share of people who earn less than you. If you're in the 80th percentile, you earn more than roughly 80% of earners in that country — and are in the top 20%. It's a way to see where your salary sits in the bigger picture.",
  },
  {
    q: "How accurate are these numbers?",
    a: "They're deliberately rough. The reference points are round, approximate figures loosely based on public income data for individual pre-tax income. Real distributions differ by source, year and how income is defined, so treat your result as a fun ballpark rather than an exact or official ranking.",
  },
  {
    q: "Does a high income mean I'm rich?",
    a: "Not on its own. Income is what you earn; wealth is what you keep — savings, investments, property and other assets minus debt. Two people on the same salary can have completely different net worth. Cost of living, family size and location matter just as much.",
  },
  {
    q: "Is this based on individual or household income?",
    a: "The estimates are for individual (personal) income, not combined household income. If you want a household comparison, add up everyone's income — but remember these tables are built for single earners, so the ranking will be approximate.",
  },
  {
    q: "Why does the same salary rank differently across countries?",
    a: "Because typical incomes differ hugely between countries. A salary that's top-10% in India might be around the median in the United States once you convert it, simply because average earnings and prices are different. That's why we ask for your country before ranking you.",
  },
];

export default function Page() {
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
      { "@type": "ListItem", position: 2, name: "Tools", item: `${site.url}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Are You Rich?",
        item: `${site.url}/tools/are-you-rich`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-forest">
          Tools
        </Link>
        <span>/</span>
        <span className="text-ink">Are You Rich?</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free &amp; private
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Are You Rich?
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Enter your income and country to estimate your income percentile
          &mdash; and see how you rank against everyone else. Everything runs in
          your browser; nothing is uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <IncomePercentile />
      </div>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl article">
        <h2>What &ldquo;income percentile&rdquo; really means</h2>
        <p>
          An income percentile answers a simple question: out of everyone who
          earns money, what share earns less than you? If your income lands you
          in the 90th percentile, you out-earn about nine in ten people &mdash;
          and sit in the top 10%. It&apos;s a more honest picture than comparing
          yourself to friends or your social feed, because it stacks your salary
          against a whole country rather than a lucky few.
        </p>

        <h2>How this calculator estimates your rank</h2>
        <p>
          We store a small set of reference points for each country &mdash;
          rough, round figures for what income sits at the 25th, 50th, 90th, 99th
          percentile and so on, based on public income data for individual
          pre-tax earnings. When you type a number, we convert it to an annual
          figure and interpolate between those reference points to estimate your
          percentile. Because it&apos;s built from approximate anchors, the
          result is a ballpark: great for a gut check, not for a tax return.
        </p>

        <h2>Income is not the same as wealth</h2>
        <p>
          A big salary and being &ldquo;rich&rdquo; are related but not identical.{" "}
          <strong>Income</strong> is the money that flows in each year;{" "}
          <strong>wealth</strong> is what you&apos;ve accumulated &mdash;
          savings, investments and property, minus any debt. Someone earning a
          top-percentile income who spends it all can have far less wealth than a
          modest earner who has saved for decades. Cost of living matters too: a
          salary that feels comfortable in one city can feel stretched in
          another. Use your percentile as a starting point, then look at what you
          actually keep and grow over time.
        </p>

        <h2>A note on the numbers</h2>
        <p>
          These distributions are intentionally simplified and clearly
          approximate. Official statistics differ by agency, definition and year,
          and household income tells a different story from individual income.
          Nothing here is financial advice or an official statistic &mdash;
          it&apos;s a lighthearted way to see roughly where your income sits.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink font-medium list-none">
                {f.q}
                <span className="text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-link */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          More free tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/calculators/income-tax"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Income Tax Calculator
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Estimate your take-home pay after tax under the latest slabs.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              All tools
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Browse every free, private, browser-based tool on CoinMind.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Browse &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
