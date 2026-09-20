import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Terms of Service · ${site.name}` },
  description: `${site.name} terms of service. Free to use for educational purposes. Calculators are estimates, not financial advice.`,
  alternates: { canonical: `${site.url}/terms` },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    url: `${site.url}/terms`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <h1 className="h1 text-text">Terms of Service</h1>
        <p className="body text-text-muted mt-4">
          Effective date: 1 September 2026. By using {site.name}, you agree to these terms.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="h3 text-text">1. What CoinMind is</h2>
            <p className="body text-text-muted mt-3">
              {site.name} (coinmind.in) provides free financial calculators, educational guides and tools to help Indian users understand personal finance concepts. We are not a financial adviser, investment firm, bank, broker, insurance company or regulated financial services provider.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">2. Educational use only</h2>
            <p className="body text-text-muted mt-3">
              All content, calculators and tools on {site.name} are for <strong>educational and informational purposes only</strong>. They do not constitute financial, investment, tax, legal or professional advice of any kind. Calculator outputs are estimates based on stated formulas and assumptions. They may not reflect your actual financial situation.
            </p>
            <p className="body text-text-muted mt-3">
              For decisions that materially affect your finances, consult a qualified professional. See our full <Link href="/disclaimer" className="text-brand underline underline-offset-2">disclaimer</Link>.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">3. No warranties</h2>
            <p className="body text-text-muted mt-3">
              {site.name} is provided "as is" without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free or that calculator outputs will match your actual financial results. Financial rules change; while we update calculators promptly, there may be brief periods where a rate or rule is outdated.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">4. Limitation of liability</h2>
            <p className="body text-text-muted mt-3">
              {site.name} and its operators shall not be liable for any financial loss, investment decision, tax filing, or any other consequence arising from the use of our calculators, guides or any other content. Use this site at your own risk.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">5. Intellectual property</h2>
            <p className="body text-text-muted mt-3">
              All original content on {site.name} (articles, guides, tool interfaces) is owned by CoinMind. You may share links to our pages freely. You may not reproduce our content wholesale without permission.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">6. Advertising and affiliates</h2>
            <p className="body text-text-muted mt-3">
              {site.name} shows Google AdSense advertisements and contains occasional affiliate links. Our editorial content is not influenced by advertising. See our <Link href="/affiliate-disclosure" className="text-brand underline underline-offset-2">affiliate disclosure</Link>.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">7. Embeddable widgets</h2>
            <p className="body text-text-muted mt-3">
              Calculators made available as embeddable widgets may be embedded on third-party websites for free, with attribution to {site.name} as stated on our <Link href="/widgets" className="text-brand underline underline-offset-2">widgets page</Link>. Attribution must not be removed or obscured.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">8. Governing law</h2>
            <p className="body text-text-muted mt-3">
              These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of India.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">9. Changes</h2>
            <p className="body text-text-muted mt-3">
              We may update these terms. Material changes will be noted with a new effective date. Continued use of the site after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Contact</h2>
            <p className="body text-text-muted mt-3">
              For questions:{" "}
              <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">{site.email}</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
