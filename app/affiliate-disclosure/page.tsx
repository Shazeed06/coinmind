import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Affiliate Disclosure · CoinMind" },
  description:
    "How CoinMind uses affiliate links: they are clearly marked, we may earn a commission at no cost to you, and they never affect our tools or recommendations.",
  alternates: { canonical: "/affiliate-disclosure" },
  openGraph: { url: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <span className="text-ink">Affiliate disclosure</span>
      </nav>

      <header className="mt-6">
        <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Affiliate disclosure
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Being upfront about how {site.name} makes money is part of earning your
          trust. Here is exactly how affiliate links work on this site.
        </p>
      </header>

      <article className="article mt-10">
        <h2>What affiliate links are</h2>
        <p>
          Some links on {site.name} are affiliate (partner) links. If you click
          one and then sign up for or buy a product — for example, opening a
          demat account, applying for a credit card, or comparing a loan or
          insurance plan — we may earn a small commission. This comes from the
          company, not from you: <strong>you never pay anything extra</strong>,
          and often you get the same or a better deal.
        </p>

        <h2>How we keep it honest</h2>
        <p>
          Affiliate links are always clearly labelled as a &ldquo;partner
          offer&rdquo; or &ldquo;partner link,&rdquo; and they carry the proper{" "}
          <code>rel=&quot;sponsored&quot;</code> tag. We only ever suggest a
          product that is genuinely relevant to the page you are on. Most
          importantly, our calculators, tools and written recommendations are{" "}
          <strong>never influenced by commissions</strong> — the maths is the
          maths, and our reviews are based on merit. If a product is worse, we
          will say so, commission or not. You can read more about how we work in
          our{" "}
          <Link href="/editorial-standards" className="text-forest underline underline-offset-2">
            editorial standards
          </Link>
          .
        </p>

        <h2>Not financial advice</h2>
        <p>
          A partner link is a convenience, not a recommendation to buy. Whether a
          demat account, loan, card or insurance policy is right for you depends
          on your own situation. Everything on {site.name} is educational
          information, not personalised financial advice — please compare options
          and read the terms before signing up. See our full{" "}
          <Link href="/disclaimer" className="text-forest underline underline-offset-2">disclaimer</Link>.
        </p>

        <h2>Why we use them</h2>
        <p>
          {site.name} is free to use with no sign-up. Advertising and affiliate
          commissions are what keep it that way and pay for building new
          calculators and tools. If you find the site useful and choose to use a
          partner link, it genuinely helps — thank you.
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, email us at{" "}
          <a href={`mailto:${site.email}`} className="text-forest underline underline-offset-2">{site.email}</a>.
        </p>
      </article>
      <div className="mb-12" />
    </div>
  );
}
