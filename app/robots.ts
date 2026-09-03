import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      // Allow AI crawlers on blog and glossary for citation/visibility.
      // Block calculators: AI can substitute for the tool directly.
      {
        userAgent: "GPTBot",
        allow: ["/blog/", "/glossary/"],
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        allow: ["/blog/", "/glossary/"],
        disallow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
