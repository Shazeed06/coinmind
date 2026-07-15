import { site } from "@/lib/site";

// Sitewide Organization + WebSite structured data. Helps Google and AI answer
// engines understand who publishes the site, for richer results and citations.
export default function SiteJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/icon.svg`,
        },
        description: site.description,
        email: site.email,
        foundingDate: "2026",
        areaServed: ["IN", "US", "GB", "Worldwide"],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
