import type { Metadata } from "next";
import { CALCULATORS } from "@/lib/seo";

// app/calculators/page.tsx is a client component ("use client") and therefore
// cannot export metadata itself. This server layout supplies it for
// /calculators. Every calculator sub-page exports its own metadata, which wins.
export const metadata: Metadata = CALCULATORS;

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
