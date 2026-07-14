import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/calculators",
    "/ai-tools",
    "/news",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/terms",
  ];

  const calcRoutes = calculators
    .filter((c) => c.live)
    .map((c) => `/calculators/${c.slug}`);

  const blogRoutes = posts.map((p) => `/blog/${p.slug}`);

  const all = [...staticRoutes, ...calcRoutes, ...blogRoutes];

  return all.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/news" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/calculators/") ? 0.9 : 0.7,
  }));
}
