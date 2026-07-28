import type { Metadata } from "next";
import { HOME } from "@/lib/seo";
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

export const metadata: Metadata = HOME;

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
