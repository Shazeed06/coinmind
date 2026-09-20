import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `Affiliate Disclosure · ${site.name}` },
  description: `How ${site.name} handles affiliate relationships. We earn commissions on some links at no extra cost to you. Affiliates never influence our editorial content.`,
  alternates: { canonical: `${site.url}/affiliate-disclosure` },
};

export default function AffiliateDisclosurePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Affiliate Disclosure",
    url: `${site.url}/affiliate-disclosure`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LegalPage
        pill="Affiliate Disclosure"
        title="Affiliate Disclosure"
        subtitle={`${site.name} is free to use and will always remain free. This page explains how we fund the site — and how our commercial relationships never influence our content.`}
        icon={<ExternalLink className="h-6 w-6 text-[#6b9cff]" />}
      >
        <div className="space-y-10">
          <section>
            <h2 className="h3 text-text">How we make money</h2>
            <p className="body text-text-muted mt-3">
              {site.name} earns revenue through two mechanisms:
            </p>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2">
                <span className="text-brand shrink-0">1.</span>
                <div>
                  <strong className="text-text">Google AdSense:</strong> Advertisements displayed by Google on our pages. We earn a small fee based on impressions and clicks.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand shrink-0">2.</span>
                <div>
                  <strong className="text-text">Affiliate links:</strong> On some pages we include links to third-party financial products or services. If you click a link and make a purchase or sign up, we may earn a commission. This comes at no extra cost to you.
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">How affiliates do NOT influence our content</h2>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not accept payment for editorial coverage, reviews or placement in our calculators or guides.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not rank or recommend products based on commission rate.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not allow advertisers or affiliate partners to review or approve content before publication.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not change our calculator results or recommendations because of an affiliate relationship.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">How we mark affiliate links</h2>
            <p className="body text-text-muted mt-3">
              Affiliate links on {site.name} are marked with an asterisk (*) or a disclosure note near the link. We comply with applicable advertising disclosure requirements.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">What we are not</h2>
            <p className="body text-text-muted mt-3">
              {site.name} is not a financial adviser, broker or regulated financial service. Our affiliate links are to third-party products or services — we do not recommend any specific financial product as suitable for your personal situation. See our full <Link href="/disclaimer" className="text-brand underline underline-offset-2">disclaimer</Link>.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Questions</h2>
            <p className="body text-text-muted mt-3">
              If you have questions about our commercial relationships or suspect a conflict of interest in any content, email us at{" "}
              <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">{site.email}</a>.
            </p>
          </section>
        </div>
      </LegalPage>
    </>
  );
}
