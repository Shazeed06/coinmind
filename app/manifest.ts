import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// PWA web app manifest — makes the site installable ("Add to Home Screen") and
// gives search engines/browsers app metadata. Next serves this at
// /manifest.webmanifest and auto-injects <link rel="manifest">.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Free finance calculators, tools & AI`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f6fb",
    theme_color: "#2563eb",
    categories: ["finance", "productivity", "utilities"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
    ],
  };
}
