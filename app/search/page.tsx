import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: { absolute: "Search · CoinMind" },
  description: "Search CoinMind's calculators, tools, guides, glossary terms and AI tool reviews.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchClient />;
}
