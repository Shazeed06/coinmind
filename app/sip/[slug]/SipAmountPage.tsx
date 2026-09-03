import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SipCalculator from "@/components/calc/SipCalculator";
import { formatCurrency } from "@/lib/format";
import { site } from "@/lib/site";
import {
  SIP_AMOUNTS,
  parseSipSlug,
  sipFutureValue,
  sipSlug,
} from "@/lib/pseo-sip";
import { IconArrow, IconCalculator, IconCheck } from "@/components/icons";

// Rendered by app/sip/[slug]/page.tsx for the "<amount>-per-month" slugs.
// Not a route itself, colocated in the route folder alongside SipYearsPage.

// Assumptions used across the copy, the table and the structured data.
const BASE_RATE = 12; // base-case annual return (%)
const LOW_RATE = 10; // conservative
const HIGH_RATE = 14; // optimistic
const DURATIONS = [5, 10, 15, 20, 25, 30]; // years shown in the table

// Present a rupee figure in natural "lakh"/"crore" words for prose and AEO
// answers. It is the SAME underlying number as sipFutureValue(), just phrased
// for readability, so it never disagrees with the calculator.
function lakhCrore(value: number): string {
  if (!Number.isFinite(value)) return "-";
  if (value >= 1e7) {
    const cr = (value / 1e7).toFixed(2).replace(/\.?0+$/, "");
    return `₹${cr} crore`;
  }
  const lakh = (value / 1e5).toFixed(2).replace(/\.?0+$/, "");
  return `₹${lakh} lakh`;
}

// First whole year (within 40) at which a SIP of this amount crosses ₹1 crore at
// the base 12% assumption; null if it never does within 40 years.
function yearsToOneCrore(monthly: number): number | null {
  for (let y = 1; y <= 40; y++) {
    if (sipFutureValue(monthly, BASE_RATE, y) >= 1e7) return y;
  }
  return null;
}

export function amountMetadata(slug: string): Metadata {
  const monthly = parseSipSlug(slug);
  if (monthly === null) return {};

  const amt = formatCurrency(monthly);
  const c15 = sipFutureValue(monthly, BASE_RATE, 15);
  const c20 = sipFutureValue(monthly, BASE_RATE, 20);

  return {
    title: { absolute: `SIP of ${amt} per Month - Returns & Corpus` },
    description: `A ${amt}/month SIP at 12% grows to about ${lakhCrore(
      c15
    )} in 15 years and ${lakhCrore(
      c20
    )} in 20. Full 5-30 year returns table plus a free SIP calculator.`,
    robots: { index: false, follow: true },
    alternates: { canonical: `/sip/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/sip/${slug}`,
      siteName: site.name,
      locale: "en_US",
      title: `SIP of ${amt} per Month - Returns & Corpus`,
      description: `See the projected corpus of a ${amt} monthly SIP at 10%, 12% and 14% over 5 to 30 years.`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${amt} monthly SIP returns`,
        },
      ],
    },
  };
}

export default function SipAmountPage({ slug }: { slug: string }) {
  const monthly = parseSipSlug(slug);
  if (monthly === null) notFound();

  const amt = formatCurrency(monthly);

  // Every figure below flows from the shared sipFutureValue() formula.
  const rows = DURATIONS.map((years) => ({
    years,
    invested: monthly * 12 * years,
    low: sipFutureValue(monthly, LOW_RATE, years),
    base: sipFutureValue(monthly, BASE_RATE, years),
    high: sipFutureValue(monthly, HIGH_RATE, years),
  }));

  const c15 = sipFutureValue(monthly, BASE_RATE, 15);
  const c20 = sipFutureValue(monthly, BASE_RATE, 20);
  const inv15 = monthly * 12 * 15;
  const inv20 = monthly * 12 * 20;
  const growth20 = c20 - inv20;
  const croreYear = yearsToOneCrore(monthly);

  const faqs = [
    {
      q: `How much will a ${amt} SIP be in 20 years?`,
      a: `At an assumed 12% annual return, a ${amt} monthly SIP for 20 years grows to about ${lakhCrore(
        c20
      )} (${formatCurrency(
        c20
      )}). Over those 20 years you actually invest ${formatCurrency(
        inv20
      )}, so roughly ${formatCurrency(
        growth20
      )} of the corpus is estimated growth from compounding. Actual returns vary and are not guaranteed.`,
    },
    {
      q: `Is a ${amt} monthly SIP enough?`,
      a: `It depends entirely on your goal. A ${amt} SIP is a strong, consistent habit. At 12% it can build about ${lakhCrore(
        c15
      )} in 15 years and ${lakhCrore(
        c20
      )} in 20 years. For a large target like ₹1 crore you may need a longer horizon, a higher amount, or a yearly step-up. Match the amount to a specific goal and timeline rather than to a round number.`,
    },
    {
      q: `How long does a ${amt} SIP take to reach ₹1 crore?`,
      a: croreYear
        ? `At an assumed 12% annual return, a ${amt} monthly SIP crosses ₹1 crore in roughly ${croreYear} years if left invested. Increasing the amount each year with a step-up SIP can get you there noticeably sooner.`
        : `At an assumed 12% annual return, a ${amt} monthly SIP takes longer than 40 years to reach ₹1 crore on its own. Raising the amount or adding a yearly step-up makes ₹1 crore far more achievable.`,
    },
    {
      q: `What return should I assume for a ${amt} SIP?`,
      a: `A common long-term assumption for diversified equity mutual funds is 10-12%. This page also shows a conservative 10% and an optimistic 14% column so you can see a realistic range. Returns are never guaranteed and depend on the funds you choose and how markets perform.`,
    },
    {
      q: `What happens if I miss a ${amt} SIP instalment?`,
      a: `The SIP itself is not cancelled by one missed instalment and mutual funds do not charge a penalty for it, though your bank may levy a mandate bounce fee if the debit fails for want of balance. The real cost is arithmetic: that month's ${amt} is simply never invested, so it never compounds. Miss a full year and ${formatCurrency(
        monthly * 12
      )} of contributions drops out of every projection on this page. Most AMCs cancel a SIP after several consecutive failed debits, so pause it deliberately rather than letting it lapse.`,
    },
    {
      q: `Is a ${amt} SIP better than investing a lump sum?`,
      a: `They answer different situations. A SIP suits money that arrives monthly, which is how salaries work, and it spreads your purchase price across high and low markets instead of committing everything at one price. A lump sum invested earlier is exposed to growth for longer, so if you already hold the money it usually wins on paper: the ${formatCurrency(
        inv20
      )} you would contribute over 20 years through a ${amt} SIP would grow to about ${lakhCrore(
        inv20 * Math.pow(1 + BASE_RATE / 100, 20)
      )} at ${BASE_RATE}% if you could invest all of it today, against about ${lakhCrore(
        c20
      )} through the SIP. Almost nobody has that choice, which is why the SIP number is the realistic one.`,
    },
    {
      q: `How is a ${amt} SIP taxed when I redeem?`,
      a: `You are taxed on the gain, not on the amount you withdraw, and only when you actually redeem. Every monthly instalment counts as a separate purchase with its own holding period, so a redemption after 20 years still contains recent units that may be treated as short-term. Equity and debt funds are taxed differently, and the rates and exemption limits are revised in budgets, so check the current rules on the Income Tax Department website or run your own figures through our capital gains calculator rather than assuming a single rate applies to the whole corpus.`,
    },
    {
      q: `Can I pause or stop a ${amt} SIP?`,
      a: `Yes, and there is no exit charge for stopping the instalments. Most fund houses allow a pause of a few months online, and you can cancel the mandate at any time. Stopping the SIP does not redeem anything: the units you already bought stay invested and keep compounding. If money is tight, reducing the ${amt} to a smaller amount usually beats stopping altogether, because restarting a lapsed SIP tends to take longer than people expect.`,
    },
    {
      q: `Should I increase my ${amt} SIP every year?`,
      a: `If your income rises, yes, and it changes the outcome more than switching funds usually does. A step-up SIP raises the instalment by a set percentage each year, so the increase comes out of a raise rather than your current budget. Against the flat ${lakhCrore(
        c20
      )} projected here over 20 years, even a modest annual step-up on the same ${amt} starting point lands materially higher. Our step-up SIP calculator shows the difference for your own increment.`,
    },
    {
      q: `How many funds should a ${amt} monthly SIP be split across?`,
      a: `Fewer than most people assume. Splitting ${amt} across many funds usually buys overlapping holdings rather than diversification, since large diversified equity funds hold many of the same companies. What actually changes your outcome is the cost you pay and whether you keep investing through bad years, not the number of schemes. Check each fund's expense ratio, since it is deducted before the return you see. This is general information, not a recommendation of any particular fund.`,
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
      {
        "@type": "ListItem",
        position: 2,
        name: "SIP Calculator",
        item: `${site.url}/calculators/sip`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${amt} per month SIP`,
        item: `${site.url}/sip/${sipSlug(monthly)}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/calculators/sip" className="hover:text-forest">
          SIP Calculator
        </Link>
        <span>/</span>
        <span className="text-ink">{amt}/month</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> SIP projection
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl text-ink leading-[1.05]">
          SIP of {amt} per Month
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          What a {amt} monthly SIP could grow into over 5 to 30 years, with the
          exact projected corpus at conservative, base and optimistic returns.
        </p>
      </header>

      {/* Quick Answer: AEO / AI-overview target */}
      <section className="mt-8 max-w-3xl">
        <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink leading-relaxed text-[1.05rem]">
            A {amt} monthly SIP at an assumed 12% annual return grows to about{" "}
            <strong className="font-600 text-forest">{lakhCrore(c15)}</strong> in
            15 years, from just {formatCurrency(inv15)} invested. Stretch it to
            20 years and the same SIP could reach about{" "}
            <strong className="font-600 text-forest">{lakhCrore(c20)}</strong> (on{" "}
            {formatCurrency(inv20)} invested). Returns are illustrative and not
            guaranteed.
          </p>
        </div>
      </section>

      {/* Returns table: unique, extractable, great for AI Overviews */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">
          {amt} SIP returns by duration
        </h2>
        <p className="mt-2 text-ink-soft leading-relaxed">
          Projected maturity value of a {amt} monthly SIP at three return
          assumptions. The 12% column is the common base case for long-term
          equity mutual funds; 10% is a cautious estimate and 14% an optimistic
          one.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <caption className="sr-only">
              Projected corpus for a {amt} monthly SIP at 10%, 12% and 14% annual
              returns over 5 to 30 years, alongside the amount invested.
            </caption>
            <thead>
              <tr className="bg-paper-2 text-left">
                <th scope="col" className="px-4 py-3 font-600 text-ink">
                  Duration
                </th>
                <th scope="col" className="px-4 py-3 font-600 text-ink">
                  You invest
                </th>
                <th scope="col" className="px-4 py-3 font-600 text-ink">
                  At 10%
                </th>
                <th scope="col" className="px-4 py-3 font-600 text-forest">
                  At 12%
                </th>
                <th scope="col" className="px-4 py-3 font-600 text-ink">
                  At 14%
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.years} className="border-t border-line">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-ink whitespace-nowrap"
                  >
                    {r.years} years
                  </th>
                  <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                    {formatCurrency(r.invested)}
                  </td>
                  <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                    {formatCurrency(r.low)}
                  </td>
                  <td className="px-4 py-3 font-600 text-forest whitespace-nowrap">
                    {formatCurrency(r.base)}
                  </td>
                  <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                    {formatCurrency(r.high)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Figures assume the amount is invested every month and returns compound
          monthly. They are estimates for illustration only. Actual mutual fund
          returns vary year to year and are not guaranteed.
        </p>
      </section>

      {/* Interactive calculator */}
      <section className="mt-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl text-ink">
            Adjust it yourself
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Change the monthly amount, expected return or time period below to
            see how the projected corpus for your own plan changes. The maths is
            identical to the numbers above.
          </p>
        </div>
        <div className="mt-6">
          <SipCalculator />
        </div>
      </section>

      {/* Explainer */}
      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">
          What a {amt} SIP really means
        </h2>
        <div className="mt-4 space-y-4 text-ink-soft leading-relaxed">
          <p>
            A Systematic Investment Plan (SIP) lets you invest a fixed {amt} in a
            mutual fund every month. Because you invest the same amount whether
            markets are up or down, you buy more units when prices are low and
            fewer when they are high, a habit known as rupee-cost averaging that
            smooths out your average purchase price over time.
          </p>
          <p>
            The reason the later years in the table above jump so sharply is
            compounding: your returns start earning returns of their own. Over 20
            years a {amt} SIP means you contribute {formatCurrency(inv20)} of your
            own money, yet at 12% the projected corpus is about {lakhCrore(c20)},
            roughly {formatCurrency(growth20)} of that is growth stacked on top of
            what you put in. This is exactly why starting a few years earlier
            usually matters more than investing a larger amount later.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft leading-relaxed">
          <strong className="text-ink">Returns are not guaranteed.</strong> The
          figures on this page assume a constant annual return purely for
          illustration. Real mutual funds are subject to market risk and their
          returns vary from year to year: some years are strongly positive,
          others negative. This page is educational information, not investment
          advice. Consider your own goals and risk appetite, or speak to a
          SEBI-registered adviser, before investing.
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">
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

      {/* Related tools */}
      <section className="mt-16 mb-8 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">
          Keep planning
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/calculators/sip"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg text-ink flex items-center gap-2">
              <IconCalculator className="h-5 w-5 text-forest" /> Full SIP
              Calculator
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Try any amount, return and duration in ₹, $ or £ with a full
              breakdown.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/calculators/step-up-sip"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg text-ink flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-forest" /> Step-up SIP
              Calculator
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              See how raising your {amt} SIP a little every year grows the corpus
              even faster.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        {/* Other SIP amounts: sibling internal links so every /sip page has
            incoming links (no orphan pages) and shares link equity. */}
        <div className="mt-8">
          <h3 className="font-display text-lg text-ink">
            Other popular SIP amounts
          </h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {SIP_AMOUNTS.filter((a) => a !== monthly).map((a) => (
              <Link
                key={a}
                href={`/sip/${sipSlug(a)}`}
                className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-forest hover:text-forest"
              >
                {formatCurrency(a)}/mo
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
