import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { formatCurrency } from "@/lib/format";
import { SIP_AMOUNTS, sipSlug } from "@/lib/pseo-sip";
import {
  SIP_YEARS,
  SIP_YEAR_SLUGS,
  SIP_HEADLINE_RATE,
  sipYearSlug,
  parseSipYearSlug,
  projectSip,
  rateScenarios,
  delayCost,
} from "@/lib/pseo-sip-years";
import SipCalculator from "@/components/calc/SipCalculator";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { IconArrow, IconCalculator, IconCheck } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return SIP_YEAR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSipYearSlug(slug);
  if (!parsed) return {};

  const { monthly, years } = parsed;
  const p = projectSip(monthly, years, SIP_HEADLINE_RATE);
  const amt = formatCurrency(monthly);

  const title = `${amt} SIP for ${years} Years — What You Actually Get`;
  const description = `An ${amt} monthly SIP for ${years} years grows to about ${formatCurrency(p.corpus)} at ${SIP_HEADLINE_RATE}% — you invest ${formatCurrency(p.invested)}. Full returns table at 8-15%.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/sip-returns/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/sip-returns/${slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: `${amt} SIP for ${years} Years: ${formatCurrency(p.corpus)}`,
      description: `What an ${amt} monthly SIP really returns over ${years} years, at 8%, 10%, 12% and 15% — plus what starting late costs you.`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${amt} SIP for ${years} years`,
        },
      ],
    },
  };
}

function Row({
  label,
  value,
  accent,
  strong,
}: {
  label: string;
  value: string;
  accent?: "forest" | "brass" | "ink";
  strong?: boolean;
}) {
  const color =
    accent === "forest"
      ? "text-forest"
      : accent === "brass"
        ? "text-brass"
        : "text-ink";
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${
        strong ? "" : "border-b border-line last:border-0"
      }`}
    >
      <span
        className={`text-sm ${strong ? "font-semibold text-ink" : "text-ink-soft"}`}
      >
        {label}
      </span>
      <span
        className={`font-display font-600 ${strong ? "text-2xl" : "text-lg"} ${color}`}
      >
        {value}
      </span>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSipYearSlug(slug);
  if (!parsed) notFound();

  const { monthly, years } = parsed;
  const p = projectSip(monthly, years, SIP_HEADLINE_RATE);
  const scenarios = rateScenarios(monthly, years);
  const delays = delayCost(monthly, years);
  const amt = formatCurrency(monthly);

  const quickAnswer = `An ${amt} monthly SIP held for ${years} years grows to roughly ${formatCurrency(p.corpus)} if it earns ${SIP_HEADLINE_RATE}% a year. You would have invested ${formatCurrency(p.invested)} of your own money, so about ${formatCurrency(p.gain)} of that total is growth — ${p.multiple.toFixed(2)} times what you put in. At a more conservative 8% the same SIP reaches about ${formatCurrency(scenarios[0].corpus)}, which is why the rate you assume matters more than any other input.`;

  const faqs: { q: string; a: string }[] = [
    {
      q: `How much will I get from an ${amt} SIP in ${years} years?`,
      a: `At an assumed ${SIP_HEADLINE_RATE}% annual return, about ${formatCurrency(p.corpus)}, against ${formatCurrency(p.invested)} invested. The honest range matters though: at 8% it is roughly ${formatCurrency(scenarios[0].corpus)} and at 15% roughly ${formatCurrency(scenarios[3].corpus)}. Nobody can tell you which you will get.`,
    },
    {
      q: `Is ${SIP_HEADLINE_RATE}% a realistic return to assume?`,
      a: `It is a common planning assumption for Indian equity funds over long periods, not a promise or a guarantee. Actual returns are not smooth — a period that averages ${SIP_HEADLINE_RATE}% will still contain years with double-digit losses. If you are planning something you cannot afford to miss, run the numbers at 8% or 10% instead and treat anything above that as upside.`,
    },
    {
      q: `How much of the ${formatCurrency(p.corpus)} is my own money?`,
      a: `${formatCurrency(p.invested)} is your own contribution and ${formatCurrency(p.gain)} is growth. Over ${years} years, growth is ${((p.gain / p.corpus) * 100).toFixed(0)}% of the final figure. That proportion rises sharply with time, which is the entire argument for starting early rather than investing more.`,
    },
    {
      q: `What if I stop the SIP partway through?`,
      a: `The units you already bought stay invested and keep compounding, but the instalments you skip are gone from the calculation permanently. Stopping during a market fall is the most expensive version of this, because those are precisely the months when your fixed amount buys the most units.`,
    },
    {
      q: `Will I have to pay tax on the maturity amount?`,
      a: `You pay tax on the gains when you redeem, not on the full amount, and equity fund gains held over a year are taxed as long-term capital gains. Our capital gains calculator works out the figure for your own holding, and the rules are summarised in our capital gains glossary entry.`,
    },
    {
      q: `Should I increase the SIP amount each year instead?`,
      a: `Usually yes, and it changes the outcome substantially. A step-up SIP that rises with your salary reaches a far larger corpus than a flat one for very little extra pain, since each increase comes out of a raise rather than your current budget. Our step-up SIP calculator shows the difference for your own numbers.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${amt} SIP for ${years} Years`,
        description: quickAnswer,
        image: [`${site.url}/opengraph-image`],
        author: {
          "@type": "Person",
          name: site.author.name,
          jobTitle: site.author.credential,
          url: `${site.url}/about#author`,
        },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        datePublished: "2026-07-24",
        dateModified: "2026-07-24",
        mainEntityOfPage: `${site.url}/sip-returns/${slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
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
            name: `${amt} SIP for ${years} years`,
            item: `${site.url}/sip-returns/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/calculators/sip" className="hover:text-forest">
          SIP Calculator
        </Link>
        <span>/</span>
        <span className="text-ink">
          {amt} for {years}y
        </span>
      </nav>

      <header className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> Monthly SIP · {years}-year
          horizon
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          {amt} SIP for {years} Years
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          What an {amt} monthly SIP actually grows to over {years} years — at
          four different return rates, not one optimistic guess.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Quick answer
        </p>
        <p className="mt-2 text-forest-deep leading-relaxed text-[1.05rem]">
          {quickAnswer}
        </p>
      </section>

      <section className="mt-10">
        <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Estimated corpus at {SIP_HEADLINE_RATE}%
          </p>
          <p className="mt-1 font-display text-5xl font-600 text-forest break-words">
            {formatCurrency(p.corpus)}
          </p>
          <p className="mt-1 text-sm text-ink-faint">
            {formatCurrency(p.invested)} invested · {formatCurrency(p.gain)}{" "}
            growth · {p.multiple.toFixed(2)}x
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink">
          {amt} SIP for {years} years at different returns
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          The return rate is the one input nobody can know in advance, so here is
          the whole range rather than a single figure. Your invested amount stays{" "}
          {formatCurrency(p.invested)} in every row — only the growth changes.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full text-sm min-w-[30rem]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="px-4 py-3 font-semibold text-ink">Annual return</th>
                <th className="px-4 py-3 font-semibold text-ink">Final corpus</th>
                <th className="px-4 py-3 font-semibold text-ink">Growth</th>
                <th className="px-4 py-3 font-semibold text-ink">Multiple</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr
                  key={s.rate}
                  className={`border-b border-line last:border-0 ${
                    s.rate === SIP_HEADLINE_RATE ? "bg-forest-soft/40" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                    {s.rate}%
                    {s.rate === SIP_HEADLINE_RATE ? " (shown above)" : ""}
                  </td>
                  <td className="px-4 py-3 font-display font-600 text-forest whitespace-nowrap">
                    {formatCurrency(s.corpus)}
                  </td>
                  <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                    {formatCurrency(s.gain)}
                  </td>
                  <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                    {s.multiple.toFixed(2)}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The differentiator: cost of delay */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          What waiting costs you
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          This is the number that actually changes behaviour, and almost nobody
          publishes it. Same {amt} a month, same {SIP_HEADLINE_RATE}% return,
          same {years}-year finish line — you just start later.
        </p>
        <div className="mt-5 rounded-2xl border border-line bg-card p-6">
          <Row
            label="Start today"
            value={formatCurrency(p.corpus)}
            accent="forest"
          />
          {delays.map((d) => (
            <Row
              key={d.delay}
              label={`Start ${d.delay} years from now`}
              value={`${formatCurrency(d.corpus)}  (−${formatCurrency(d.lost)})`}
              accent="brass"
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-faint leading-relaxed">
          Delaying by {delays[0].delay} years costs about{" "}
          {formatCurrency(delays[0].lost)} — far more than the{" "}
          {formatCurrency(monthly * delays[0].delay * 12)} of instalments you
          skipped. The gap is the compounding those early years would have done,
          and it cannot be made up later by investing more.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Change the numbers yourself
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Set your own amount, rate and duration.
        </p>
        <div className="mt-6">
          <SipCalculator />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Before you rely on this figure
        </h2>
        <div className="mt-3 space-y-4 text-ink-soft leading-relaxed">
          <p>
            The projection assumes you never miss an instalment, the return is
            steady, and you do not withdraw along the way. Real investing is
            none of those things. Treat {formatCurrency(p.corpus)} as the shape
            of the outcome, not a figure to plan a commitment around.
          </p>
          <p>
            Two things also reduce what reaches you. The fund&rsquo;s{" "}
            <Link
              href="/glossary/expense-ratio"
              className="text-forest underline underline-offset-2"
            >
              expense ratio
            </Link>{" "}
            is deducted before the return you see, so a fund charging 1.5% a year
            needs to earn that much more just to match a cheaper one. And gains
            are taxable when you redeem — see{" "}
            <Link
              href="/glossary/capital-gains"
              className="text-forest underline underline-offset-2"
            >
              capital gains
            </Link>{" "}
            and the{" "}
            <Link
              href="/calculators/capital-gains"
              className="text-forest underline underline-offset-2"
            >
              capital gains calculator
            </Link>
            .
          </p>
          <p>
            If your income will rise over these {years} years, a{" "}
            <Link
              href="/calculators/step-up-sip"
              className="text-forest underline underline-offset-2"
            >
              step-up SIP
            </Link>{" "}
            reaches a meaningfully larger corpus for very little extra strain.
            And if you are working backwards from a target amount instead of a
            monthly one, the{" "}
            <Link
              href="/calculators/goal-sip"
              className="text-forest underline underline-offset-2"
            >
              goal SIP calculator
            </Link>{" "}
            tells you the instalment you need. For how a SIP works at all, start
            with our <Link href="/glossary/sip" className="text-forest underline underline-offset-2">SIP explainer</Link> or the guide on{" "}
            <Link
              href="/blog/sip-vs-lumpsum"
              className="text-forest underline underline-offset-2"
            >
              SIP vs lump sum
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-12">
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

      {/* Sibling links on both axes — keeps all 91 pages interlinked */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          {amt} SIP over other durations
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {SIP_YEARS.filter((y) => y !== years).map((y) => (
            <Link
              key={y}
              href={`/sip-returns/${sipYearSlug(monthly, y)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              <IconCheck className="h-3.5 w-3.5 text-forest" />
              {y} years
            </Link>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl font-600 text-ink">
          Other monthly amounts for {years} years
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {SIP_AMOUNTS.filter((m) => m !== monthly).map((m) => (
            <Link
              key={m}
              href={`/sip-returns/${sipYearSlug(m, years)}`}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              {formatCurrency(m)}/mo
            </Link>
          ))}
        </div>

        <Link
          href={`/sip/${sipSlug(monthly)}`}
          className="mt-6 inline-flex items-center gap-2 text-forest font-medium hover:underline"
        >
          See the full 3&ndash;30 year table for {amt} a month
          <IconArrow className="h-4 w-4" />
        </Link>
      </section>

      <div className="mt-12">
        <AuthorReviewBox
          sources={[{ label: "AMFI", href: "https://www.amfiindia.com" }]}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft leading-relaxed">
        <strong className="text-ink">A note on accuracy:</strong> these are
        projections from a fixed-rate formula, not forecasts. Mutual fund
        returns are not guaranteed and past performance does not indicate future
        results; your actual corpus depends on the fund you choose, its costs,
        the sequence of returns you happen to get, and whether you stay invested
        through the bad years. This is general educational information, not
        investment advice.
      </div>
    </div>
  );
}
