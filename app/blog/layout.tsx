import type { Metadata } from "next";
import { BLOG } from "@/lib/seo";

// app/blog/page.tsx is a client component ("use client") and therefore cannot
// export metadata itself. This server layout supplies it for /blog.
// Child routes (app/blog/[slug]) export their own generateMetadata, which wins.
export const metadata: Metadata = BLOG;

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
