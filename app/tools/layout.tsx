import type { Metadata } from "next";
import { TOOLS } from "@/lib/seo";

// app/tools/page.tsx is a client component ("use client") and therefore cannot
// export metadata itself. This server layout supplies it for /tools.
// Every tool sub-page exports its own metadata, which wins over this.
export const metadata: Metadata = TOOLS;

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
