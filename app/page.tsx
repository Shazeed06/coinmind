import type { Metadata } from "next";
import { calculators, posts } from "@/lib/data";
import { site } from "@/lib/site";
import StructuredData from "@/components/home/StructuredData";
import HeroSection from "@/components/home/HeroSection";
import WhatIsCoinMind from "@/components/home/WhatIsCoinMind";
import FeaturedCalculators from "@/components/home/FeaturedCalculators";
import FinanceCategories from "@/components/home/FinanceCategories";
import TrustTimeline from "@/components/home/TrustTimeline";
import HowCalculatorsWork from "@/components/home/HowCalculatorsWork";
import AiAssistant from "@/components/home/AiAssistant";
import ComparisonHub from "@/components/home/ComparisonHub";
import LearningHub from "@/components/home/LearningHub";
import FinancialRoadmaps from "@/components/home/FinancialRoadmaps";
import FinanceGlossary from "@/components/home/FinanceGlossary";
import FaqSection from "@/components/home/FaqSection";
import EditorialTrust from "@/components/home/EditorialTrust";
import ClosingCta from "@/components/home/ClosingCta";

const liveCalcs = calculators.filter((c) => c.live);
const CALC_COUNT = liveCalcs.length;
const GUIDE_COUNT = posts.length;
const TOOL_COUNT = 44;

export const metadata: Metadata = {
  title: { absolute: "CoinMind — India's Smartest Personal Finance Platform" },
  description: `${CALC_COUNT} free financial calculators, ${TOOL_COUNT} free tools, ${GUIDE_COUNT} expert guides, and AI-powered resources. Calculate SIP, EMI, income tax, FD, PPF, NPS and more. India's trusted personal finance education platform — no sign-up needed.`,
  alternates: { canonical: "/" },
  openGraph: {
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    title: "CoinMind — India's Smartest Personal Finance Platform",
    description: `${CALC_COUNT} free financial calculators, ${GUIDE_COUNT} expert guides, and AI resources. SIP, EMI, tax, FD, PPF and more.`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <HeroSection />
      <WhatIsCoinMind />
      <FeaturedCalculators />
      <FinanceCategories />
      <TrustTimeline />
      <HowCalculatorsWork />
      <AiAssistant />
      <ComparisonHub />
      <LearningHub />
      <FinancialRoadmaps />
      <FinanceGlossary />
      <FaqSection />
      <EditorialTrust />
      <ClosingCta />
    </>
  );
}
