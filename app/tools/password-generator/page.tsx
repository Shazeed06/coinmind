import type { Metadata } from "next";
import Link from "next/link";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Password Generator — Strong Random Passwords" },
  description:
    "Free password generator. Create strong, random passwords in your browser — choose length, symbols, numbers and case. Nothing is ever uploaded or stored.",
  alternates: { canonical: "/tools/password-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/password-generator",
    title: "Password Generator — Strong Random Passwords",
    description:
      "Create strong, random passwords in your browser with the Web Crypto API. 100% private — passwords never leave your device.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Password Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are the passwords sent to a server?",
    a: "No. Every password is generated entirely in your browser using the Web Crypto API. Nothing is uploaded, logged or stored — the passwords never leave your device, and the tool even works offline.",
  },
  {
    q: "How random are the passwords?",
    a: "They use crypto.getRandomValues, the browser's cryptographically secure random number generator, with rejection sampling to avoid statistical bias. That is far stronger than Math.random, which is not safe for passwords.",
  },
  {
    q: "How long should my password be?",
    a: "Aim for at least 16 characters. Length matters more than anything else because each extra character multiplies the number of possible combinations an attacker must try. The strength meter updates live as you change the length.",
  },
  {
    q: "What are ambiguous characters?",
    a: "Characters that are easy to misread, like the letter O and the number 0, or the lowercase l, capital I and number 1. Turn on 'Exclude ambiguous characters' when you might have to type or copy the password by hand.",
  },
  {
    q: "Should I use the same password everywhere?",
    a: "Never. If one site is breached, reused passwords let attackers into your other accounts. Generate a unique password for every account and store them in a reputable password manager.",
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
        name: "Password Generator",
        item: `${site.url}/tools/password-generator`,
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
        <span className="text-ink">Password Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Password Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Create strong, random passwords instantly &mdash; with full control
          over length and character types, all inside your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <PasswordGenerator />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A strong password is <strong className="text-ink">long</strong> and{" "}
            <strong className="text-ink">unpredictable</strong>. Set the length
            to at least 16 characters, keep uppercase, lowercase, numbers and
            symbols switched on, then copy the result. This tool builds each
            password with your browser&apos;s secure random generator, so no two
            are the same and none are ever sent over the internet.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What makes a password strong</h2>
        <p>
          A password is strong when it is hard to guess &mdash; not just by a
          person, but by software that tries billions of combinations per
          second. Two things drive that difficulty:{" "}
          <strong>length</strong> and <strong>variety</strong>. A longer
          password drawn from a bigger pool of characters (upper and lower case
          letters, numbers and symbols) has astronomically more possible
          combinations, which is measured as <em>entropy</em> in bits. The
          strength meter above estimates that entropy live so you can see the
          effect of every change. Predictable choices &mdash; dictionary words,
          names, birthdays, keyboard patterns like{" "}
          <span className="font-mono">qwerty</span> &mdash; slash the real
          strength no matter how the password looks, which is exactly why a
          random generator beats anything you would invent yourself.
        </p>

        <h2>Why length matters most</h2>
        <p>
          Every character you add multiplies the number of possibilities an
          attacker has to work through. Adding one character to a password built
          from about 90 possible symbols makes it roughly ninety times harder to
          crack; adding several makes brute force hopeless. That is why length
          beats clever substitutions like swapping{" "}
          <span className="font-mono">a</span> for{" "}
          <span className="font-mono">@</span>, which attackers&apos; tools
          already expect. A 12-character password is a reasonable floor, 16 is a
          comfortable target for important accounts, and going longer costs you
          nothing when a password manager remembers it for you.
        </p>

        <h2>Never reuse passwords</h2>
        <p>
          Even a perfect password becomes a liability the moment you use it in
          two places. When a website is breached &mdash; and breaches happen
          constantly &mdash; attackers take the leaked email-and-password pairs
          and try them on banks, email and shopping sites in what is called{" "}
          <em>credential stuffing</em>. A unique password per account contains
          the damage to the one site that was breached. The practical way to
          live with dozens of unique passwords is a reputable password manager:
          generate a fresh one here, paste it in when you create or change the
          account, and let the manager store and autofill it from then on.
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
            href="/tools/compress-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Compress Image
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Shrink JPG, PNG and WebP files with a quality slider &mdash; in
              your browser.
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
