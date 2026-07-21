import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions for using CoinMind's free calculators, tools and content — what you can expect from us, and the limits of our educational information.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-8">
      <header className="pt-14">
        <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 14 July 2026</p>
      </header>

      <div className="article mt-10">
        <p>
          Welcome to {site.name}. By accessing or using this website, you agree
          to these Terms of Service. If you do not agree, please do not use the
          site.
        </p>

        <h2>Use of the website</h2>
        <p>
          {site.name} provides free financial calculators, tool reviews and
          informational content. You may use the site for your personal,
          lawful purposes. You agree not to misuse the site, attempt to disrupt
          it, scrape it at scale, or use it in any way that violates applicable
          laws.
        </p>

        <h2>No professional advice</h2>
        <p>
          All content and tools are for information and education only and do not
          constitute financial, investment, tax or legal advice. Please see our{" "}
          <a href="/disclaimer">Disclaimer</a> for full details.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content, design, calculators and branding on this site are owned by
          {" "}
          {site.name} unless otherwise stated, and are protected by applicable
          laws. You may share links to our pages, but you may not copy, reproduce
          or republish substantial content without permission.
        </p>

        <h2>Third-party links and ads</h2>
        <p>
          This site may display advertising and contain links to third-party
          websites, including affiliate links. We are not responsible for the
          content, products or practices of third parties. Advertising is served
          by partners such as Google, subject to their own terms and policies.
        </p>

        <h2>Availability</h2>
        <p>
          We aim to keep the site available and accurate but provide it &ldquo;as
          is&rdquo; without warranties of any kind. We may update, change or
          remove features at any time without notice.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {site.name} shall not be liable
          for any direct, indirect or consequential loss arising from your use of
          the site or reliance on its content or tools.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may revise these terms from time to time. Continued use of the site
          after changes means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email <strong>{site.email}</strong>.
        </p>
      </div>
    </div>
  );
}
