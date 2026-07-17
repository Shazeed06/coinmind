import type { Metadata } from "next";
import Link from "next/link";
import CountdownToDate from "@/components/tools/CountdownToDate";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Countdown to Date — Live Days, Hours & Seconds" },
  description:
    "Free live countdown timer to any date and time. See the days, hours, minutes and seconds remaining until New Year, a birthday or your next big event.",
  alternates: { canonical: "/tools/countdown-to-date" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/countdown-to-date`,
    title: "Countdown to Date — Live Days, Hours & Seconds",
    description:
      "Pick any date and time and watch a live countdown of the days, hours, minutes and seconds remaining — free and private in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Countdown to Date tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "How do I count down to a specific date?",
    a: "Pick your target date and time in the picker, or tap a preset like New Year or Christmas. The tool immediately starts a live countdown showing the days, hours, minutes and seconds remaining.",
  },
  {
    q: "Does the countdown update automatically?",
    a: "Yes. Once you set a date the numbers refresh every second on their own — you never need to reload the page. Leave the tab open to watch the seconds tick down in real time.",
  },
  {
    q: "What happens if the date I choose is in the past?",
    a: "The tool detects it and shows “This date has passed” instead of negative numbers, along with the date you selected. Just pick a future date and time to start counting down again.",
  },
  {
    q: "Which time zone does the countdown use?",
    a: "It uses your own device's local time. The date and time you enter are read in your browser's time zone, so the countdown always matches the clock on your computer or phone.",
  },
  {
    q: "Is my chosen date sent to a server?",
    a: "No. The countdown is calculated entirely in your browser. Nothing you enter is uploaded, stored or shared — it never leaves your device.",
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
        name: "Countdown to Date",
        item: `${site.url}/tools/countdown-to-date`,
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
        <span className="text-ink">Countdown to Date</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Countdown to Date
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Pick any date and time and watch a live countdown of the days, hours,
          minutes and seconds &mdash; updating every second in your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <CountdownToDate />
      </div>

      {/* Quick answer */}
      <section className="mt-10 max-w-3xl rounded-2xl border border-line bg-paper-2 p-5 sm:p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-brass">
          Quick answer
        </h2>
        <p className="mt-2 text-ink-soft leading-relaxed">
          Choose a target date and time in the picker above &mdash; or tap a
          preset such as <strong className="text-ink">New Year</strong> or{" "}
          <strong className="text-ink">Christmas</strong> &mdash; and the big
          number cards immediately show the days, hours, minutes and seconds left,
          refreshing every second. If the date has already gone by, you&rsquo;ll
          see &ldquo;This date has passed&rdquo; instead.
        </p>
      </section>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl article">
        <h2>Count down to the moments that matter</h2>
        <p>
          A countdown turns an abstract date on the calendar into something you
          can feel ticking closer. Use it for the big milestones &mdash; New
          Year, a birthday, a wedding, an exam, a product launch, a holiday or a
          release date &mdash; and keep the tab open to watch the seconds fall.
          Because the presets and the maths are worked out on your own device, the
          countdown is instant and completely private.
        </p>

        <h2>How the live countdown works</h2>
        <p>
          When you pick a date the tool reads it in your browser&rsquo;s local
          time zone and subtracts the current time from it once every second. The
          remaining milliseconds are split into whole days, then the leftover
          hours, minutes and seconds, and shown in the four number cards. Everything
          is derived from your device clock, so the countdown always agrees with
          the time on your phone or computer &mdash; no accounts, no servers and
          nothing to install.
        </p>

        <h2>Presets and past dates</h2>
        <p>
          The quick presets compute their targets on the fly: &ldquo;New
          Year&rdquo; jumps to the first of January next year, &ldquo;Christmas&rdquo;
          rolls forward to December 25th, and the others set handy relative points
          like this time tomorrow or one week from now. If you ever choose a date
          that has already passed, the tool tells you clearly rather than showing
          confusing negative numbers &mdash; just pick a future date to start
          again.
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
            href="/tools/stopwatch-timer"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Stopwatch &amp; Timer
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              A precise stopwatch with laps and a countdown timer with an alarm.
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
