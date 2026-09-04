import { org, website } from "@/lib/ld";

// Sitewide Organization + WebSite structured data. Helps Google and AI answer
// engines understand who publishes the site, for richer results and citations.
//
// Each entity gets its own <script> tag so every top-level JSON object carries
// an @type. The previous @graph wrapper was valid JSON-LD but caused audit
// tools to flag the typeless container as a missing-@type schema.
export default function SiteJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website()) }}
      />
    </>
  );
}
