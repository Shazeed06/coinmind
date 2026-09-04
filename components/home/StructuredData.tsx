import { calculators } from "@/lib/data";
import { site } from "@/lib/site";
import { FAQS } from "@/lib/faqs";

const liveCalcs = calculators.filter((c) => c.live);

export default function StructuredData() {
  // Organization and WebSite are NOT declared here. They are emitted sitewide by
  // components/SiteJsonLd.tsx from the lib/ld.ts helpers, with stable @ids
  // (/#organization, /#website) and the SearchAction. Re-declaring them here
  // gave the homepage two of each for the same entity.
  const graph = [
    {
      "@type": "Person",
      name: site.author.fullName,
      jobTitle: site.author.role,
      description: site.author.bio,
      url: `${site.url}/about`,
    },
    {
      "@type": "SoftwareApplication",
      name: `${site.name} Calculators`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: `${liveCalcs.length} free financial calculators.`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    {
      "@type": "CollectionPage",
      name: site.name,
      description: site.description,
      url: site.url,
      mainEntity: { "@type": "ItemList", itemListElement: liveCalcs.slice(0, 20).map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/calculators/${c.slug}` })) },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}
