import { graph, org, website } from "@/lib/ld";

// Sitewide Organization + WebSite structured data. Helps Google and AI answer
// engines understand who publishes the site, for richer results and citations.
//
// The nodes come from lib/ld.ts so there is exactly ONE definition of each
// entity. This component used to hand-roll its own copy, which silently drifted:
// the copy lost the WebSite SearchAction, and the homepage shipped a second,
// @id-less Organization and WebSite for the same entity. Both duplicates are
// gone; anything that needs to reference these nodes points at their @id
// (/#organization, /#website) instead of restating them.
export default function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph([org(), website()])) }}
    />
  );
}
