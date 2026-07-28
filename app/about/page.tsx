import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ABOUT } from "@/lib/seo";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = ABOUT;

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.author.fullName,
      jobTitle: site.author.role,
      description: site.author.bio,
      url: `${site.url}/about`,
      worksFor: { "@type": "Organization", name: site.name, url: site.url },
    },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <h1 className="h1 text-text">About {site.name}</h1>
        <p className="body text-text-muted mt-4">
          We build tools and write guides that help ordinary people make confident decisions about money — without the jargon, the sales pitch, or the paywall.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="h3 text-text">Who runs {site.name}</h2>
            <p className="body text-text-muted mt-3">
              {site.name} is founded and edited by{" "}
              <Link href={`/authors/${site.author.slug}`} className="text-brand underline underline-offset-2">
                {site.author.fullName}
              </Link>
              , who is pursuing the Chartered Accountancy (CA) Final. Every calculator, guide and comparison on this site is researched, written and fact-checked by a human. AI is used as a research and drafting aid only — it never publishes content unedited.
            </p>
            <p className="body text-text-muted mt-3">
              We are based in {site.author.location}. This is a self-funded independent project — we do not take investment, sponsorship or paid placement from any financial product or company.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">How we make money</h2>
            <p className="body text-text-muted mt-3">
              {site.name} is free to use and will always remain free. We plan to fund the site through advertising (Google AdSense) and occasional affiliate links. If you click an affiliate link and buy a product, we may earn a small commission at no extra cost to you. This never influences what we recommend or how we rate tools.
            </p>
            <p className="body text-text-muted mt-3">
              Read our{" "}
              <Link href="/affiliate-disclosure" className="text-brand underline underline-offset-2">affiliate disclosure</Link>{" "}
              for full details. We do not accept payment for reviews, ratings or placement. No calculator, tool or article on {site.name} is paywalled or gated behind a sign-up.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">How we ensure accuracy</h2>
            <p className="body text-text-muted mt-3">
              Every calculator uses published, standard formulas verified against official sources — RBI, SEBI, the Income Tax Department, AMFI, EPFO and the National Savings Institute. Read our{" "}
              <Link href="/methodology" className="text-brand underline underline-offset-2">full methodology</Link>{" "}
              to see the formula, source and exclusions for every calculator. When we find an error, we log it publicly on our{" "}
              <Link href="/corrections" className="text-brand underline underline-offset-2">corrections page</Link>.
            </p>
            <p className="body text-text-muted mt-3">
              Content is reviewed after every Union Budget, RBI monetary policy announcement and regulatory change. Our editorial process is documented on our{" "}
              <Link href="/editorial-standards" className="text-brand underline underline-offset-2">editorial standards</Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Get in touch</h2>
            <p className="body text-text-muted mt-3">
              Email us at{" "}
              <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">{site.email}</a>
              . We read every message and respond to genuine enquiries.
            </p>
          </section>

          <div className="p-5 rounded-card bg-bg-alt border border-border flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-brand shrink-0 mt-0.5" />
            <div className="text-sm text-text-muted">
              <p className="font-semibold text-text">{site.author.sebiDisclaimer}</p>
              <p className="mt-1">Everything on {site.name} is educational information to help you understand your options. For decisions that materially affect your money, confirm current figures and consider speaking to a qualified professional. See our{" "}
                <Link href="/disclaimer" className="text-brand underline underline-offset-2">full disclaimer</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
