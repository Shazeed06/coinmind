import { calculators, posts } from "@/lib/data";
import { site } from "@/lib/site";
import { FAQS } from "@/lib/faqs";

const liveCalcs = calculators.filter((c) => c.live);

export default function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      email: site.email,
      founder: { "@type": "Person", name: site.author.fullName },
    },
    {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      description: site.description,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
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
