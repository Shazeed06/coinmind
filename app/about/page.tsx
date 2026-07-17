import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Who is behind CoinMind, why we build free financial calculators and AI tool reviews, and the editorial standards we hold ourselves to.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-8">
      <header className="pt-14">
        <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          About {site.name}
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          We build tools and write guides that help ordinary people make
          confident decisions about money and technology — without the jargon,
          the sales pitch, or the paywall.
        </p>
      </header>

      <div className="article mt-10">
        <h2>Why we exist</h2>
        <p>
          Good financial information is either buried in dense PDFs or wrapped in
          marketing designed to sell you a product. Meanwhile, AI is changing how
          we all work, and it&apos;s hard to know which tools are worth your time.
          {" "}
          {site.name} exists to cut through both: free, accurate calculators for
          the numbers that matter, and honest reviews of the AI tools we actually
          use.
        </p>

        <h2>Who we serve</h2>
        <p>
          Our readers are in India, the United States, the United Kingdom and
          around the world. That&apos;s why our calculators support the rupee,
          dollar and pound, and why our guides explain concepts rather than
          assuming you already know them.
        </p>

        <h2 id="editorial">Our editorial standards</h2>
        <p>
          Every guide and review is written and checked by people. We aim for
          accuracy over hype, we say when we&apos;re unsure, and we update
          content when facts change. Where we earn affiliate commissions, it
          never influences our ratings — and we tell you.
        </p>
        <p>
          Nothing on this site is personalised financial advice. We give you the
          tools and the context; the decisions, and any professional advice you
          seek, remain yours.
        </p>

        <h2>How we make money</h2>
        <p>
          {site.name} is free to use. We fund the site through advertising and
          occasional affiliate links. This lets us keep every tool free and
          available to everyone, with no account required.
        </p>
      </div>
    </div>
  );
}
