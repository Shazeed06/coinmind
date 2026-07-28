import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ABOUT } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = ABOUT;

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.author.name,
      jobTitle: site.author.role,
      description: site.author.bio,
      url: `${site.url}/about`,
      worksFor: { "@type": "Organization", name: site.name, url: site.url },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LegalPage pill="About" title={`About ${site.name}`}>
        <h2>Why we exist</h2>
        <p>
          Good financial information is either buried in dense PDFs or wrapped in
          marketing designed to sell you a product. Meanwhile, AI is changing how
          we all work, and it&apos;s hard to know which tools are worth your time.
          {" "}
          {site.name} exists to cut through both: free, accurate calculators for
          the numbers that matter, and honest reviews of the AI tools worth your
          time.
        </p>

        <h2>Who we serve</h2>
        <p>
          Our readers are in India, the United States, the United Kingdom and
          around the world. That&apos;s why our calculators support the rupee,
          dollar and pound, and why our guides explain concepts rather than
          assuming you already know them.
        </p>

        <h2 id="author">About the author</h2>
        <p>
          {site.name} is founded and edited by <strong>{site.author.name}</strong>,
          who is pursuing the Chartered Accountancy (CA) Final. He started{" "}
          {site.name} to build the finance calculators and clear money guidance he
          wished existed — genuinely free, accurate, and free of jargon or a sales
          pitch. Every calculator&apos;s formula and every guide is checked for
          accuracy against official sources before it&apos;s published.
        </p>

        <h2 id="editorial">Our editorial standards</h2>
        <p>
          Every guide and review is original and editorially reviewed. We aim for
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
      </LegalPage>
    </>
  );
}
