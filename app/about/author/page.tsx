import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.author.fullName} - Founder & Editor · ${site.name}` },
  description: `${site.author.fullName} is the founder and editor of ${site.name}, pursuing Chartered Accountancy (CA) Final. Learn about the person behind CoinMind's calculators and guides.`,
  alternates: { canonical: `${site.url}/about/author` },
};

export default function AuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.author.fullName,
      jobTitle: site.author.role,
      description: site.author.bio,
      url: `${site.url}/about/author`,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: site.author.education,
      },
      worksFor: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
      knowsAbout: [
        "Personal Finance",
        "Income Tax (India)",
        "Investment Calculators",
        "Mutual Funds",
        "Chartered Accountancy",
      ],
    },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <nav className="text-sm text-text-muted mb-6">
          <Link href="/about" className="hover:text-brand">About</Link>
          <span className="mx-2">›</span>
          <span>Author</span>
        </nav>

        <h1 className="h1 text-text">{site.author.fullName}</h1>
        <p className="body text-brand font-medium mt-2">{site.author.role}, {site.name}</p>

        <p className="body text-text-muted mt-6">{site.author.bio}</p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="h3 text-text">Credentials</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-brand mt-1">▸</span>
                <div>
                  <p className="font-semibold text-text">Chartered Accountancy (CA) Final</p>
                  <p className="text-sm text-text-muted mt-1">
                    The Institute of Chartered Accountants of India (ICAI). CA is one of India's most rigorous professional qualifications, covering financial reporting, taxation, auditing and financial management.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-muted mt-4">
              <strong>Note:</strong> {site.author.sebiDisclaimer} Credentials are stated accurately and without inflation. The CA qualification is in progress (Final stage).
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Editorial responsibility</h2>
            <p className="body text-text-muted mt-3">
              {site.author.fullName} is solely responsible for all content on {site.name}: every calculator formula, every guide, every comparison. AI tools are used as research and drafting aids only. No content is published without human review.
            </p>
            <p className="body text-text-muted mt-3">
              Read the full editorial process on the{" "}
              <Link href="/editorial-policy" className="text-brand underline underline-offset-2">editorial policy</Link>{" "}
              and{" "}
              <Link href="/financial-review-process" className="text-brand underline underline-offset-2">financial review process</Link>{" "}
              pages.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Why CoinMind was built</h2>
            <p className="body text-text-muted mt-3">
              Most Indian personal finance websites either charge for tools, drown calculators in ads, or use vague "AI-powered" formulas with no transparency. {site.name} was built to fix that: every formula is documented, every source is cited, and every tool runs in the browser without login.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Contact</h2>
            <p className="body text-text-muted mt-3">
              For corrections, editorial questions or partnership enquiries:{" "}
              <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">
                {site.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
