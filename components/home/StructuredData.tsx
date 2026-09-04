import { calculators } from "@/lib/data";
import { site } from "@/lib/site";
import { FAQS } from "@/lib/faqs";

const liveCalcs = calculators.filter((c) => c.live);

// Each entity gets its own <script> tag so every top-level JSON object carries
// an @type. The previous @graph wrapper was valid JSON-LD but caused audit
// tools to flag the typeless container as a missing-@type schema.
export default function StructuredData() {
  // Organization and WebSite are NOT declared here. They are emitted sitewide by
  // components/SiteJsonLd.tsx from the lib/ld.ts helpers, with stable @ids
  // (/#organization, /#website) and the SearchAction. Re-declaring them here
  // gave the homepage two of each for the same entity.
  const entities = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.author.fullName,
      jobTitle: site.author.role,
      description: site.author.bio,
      url: `${site.url}/about`,
      qualifications: site.author.credential,
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Institute of Chartered Accountants of India (ICAI)",
      },
      knowsAbout: ["Personal finance", "Indian income tax", "Mutual funds", "Financial planning"],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${site.name} Calculators`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: `${liveCalcs.length} free financial calculators.`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: site.name,
      description: site.description,
      url: site.url,
      datePublished: "2026-01-01",
      dateModified: "2026-09-04",
      mainEntity: { "@type": "ItemList", itemListElement: liveCalcs.slice(0, 20).map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/calculators/${c.slug}` })) },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return (
    <>
      {entities.map((entity, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entity) }} />
      ))}
    </>
  );
}
