import type { Metadata } from "next";
import Link from "next/link";
import StopwatchTimer from "@/components/tools/StopwatchTimer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Online Stopwatch & Countdown Timer — Free Tool" },
  description:
    "Free online stopwatch and countdown timer. Time laps with a precise stopwatch, or set a countdown timer with an alarm beep — all in your browser.",
  alternates: { canonical: "/tools/stopwatch-timer" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/stopwatch-timer`,
    title: "Online Stopwatch & Countdown Timer — Free Tool",
    description:
      "A precise stopwatch with lap times plus a countdown timer with an alarm — free, private and instant, right in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Stopwatch and Timer tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is this online stopwatch accurate?",
    a: "Yes. The stopwatch is driven by your browser's high-resolution performance clock and updates on every animation frame, so it stays accurate to a hundredth of a second even if the page redraws.",
  },
  {
    q: "Will the countdown timer make a sound when it ends?",
    a: "Yes. When the countdown reaches zero it plays a short beep using the Web Audio API and flashes a clear “Time’s up!” message. Make sure your device isn’t muted to hear the alarm.",
  },
  {
    q: "Does the timer keep running if I switch tabs?",
    a: "The countdown is based on a fixed end time, so even if the browser slows the page in a background tab, the remaining time is recalculated from the clock and stays correct when you return.",
  },
  {
    q: "Can I record lap times on the stopwatch?",
    a: "Yes. Press Lap while the stopwatch runs to record a split. Each lap shows both the individual lap time and the total elapsed time, and the fastest and slowest laps are highlighted.",
  },
  {
    q: "Do I need to install anything or sign up?",
    a: "No. Everything runs in your browser with no sign-up, no download and no data sent anywhere. Open the page and start timing straight away.",
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
        name: "Stopwatch & Timer",
        item: `${site.url}/tools/stopwatch-timer`,
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
        <span className="text-ink">Stopwatch &amp; Timer</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Stopwatch &amp; Timer
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          A precise online stopwatch with lap times and a countdown timer with
          an alarm &mdash; free, private and right in your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <StopwatchTimer />
      </div>

      {/* Quick answer */}
      <section className="mt-10 max-w-3xl rounded-2xl border border-line bg-paper-2 p-5 sm:p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-brass">
          Quick answer
        </h2>
        <p className="mt-2 text-ink-soft leading-relaxed">
          Switch to the <strong className="text-ink">Stopwatch</strong> tab and
          press Start to count up &mdash; use Lap to record splits. Switch to the{" "}
          <strong className="text-ink">Countdown Timer</strong> tab, set hours,
          minutes and seconds, then press Start; when it hits zero the tool beeps
          and flashes &ldquo;Time&rsquo;s up!&rdquo;. Nothing is uploaded &mdash;
          it all runs on your device.
        </p>
      </section>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl article">
        <h2>A stopwatch and a countdown timer in one</h2>
        <p>
          This free tool combines the two things people time most often. The{" "}
          <strong>stopwatch</strong> counts upward from zero and is perfect for
          workouts, cooking, experiments, presentations or any activity where you
          want to know exactly how long something took. The{" "}
          <strong>countdown timer</strong> counts down from a time you choose and
          rings an alarm at zero &mdash; ideal for study sessions, HIIT intervals,
          steeping tea, or keeping meetings on track.
        </p>

        <h2>How the timing stays accurate</h2>
        <p>
          The stopwatch reads your browser&rsquo;s high-resolution monotonic
          clock rather than the wall clock, so it can&apos;t drift when the
          system time changes and it resolves down to hundredths of a second. The
          countdown timer stores a fixed finish time and works out the remaining
          time from that on every frame. Because the maths is anchored to a single
          target, the timer self-corrects &mdash; even if a background tab is
          throttled, it shows the right time the moment you switch back.
        </p>

        <h2>Lap times, splits and the alarm</h2>
        <p>
          On the stopwatch, pressing <strong>Lap</strong> stores the moment
          without stopping the clock. Each row lists the split for that lap and
          the running total, and the quickest and slowest laps are marked so you
          can spot your best effort at a glance. On the countdown timer, the alarm
          is a short beep generated with the Web Audio API together with a visual
          flash, so you&rsquo;ll notice the end of the timer whether or not your
          sound is on.
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
            href="/tools/countdown-to-date"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Countdown to Date
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Count down the days, hours and seconds to any future date.
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
