import type { Metadata } from "next";
import { GLOSSARY as GLOSSARY_META } from "@/lib/seo";

// app/glossary/page.tsx is a client component ("use client") and therefore
// cannot export metadata itself. This server layout supplies it for /glossary.
// Child routes (app/glossary/[slug]) export their own generateMetadata, which wins.
export const metadata: Metadata = GLOSSARY_META;

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
