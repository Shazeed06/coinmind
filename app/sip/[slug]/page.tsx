import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SIP_SLUGS, parseSipSlug } from "@/lib/pseo-sip";
import { SIP_YEAR_SLUGS, parseSipYearSlug } from "@/lib/pseo-sip-years";
import SipAmountPage, { amountMetadata } from "./SipAmountPage";
import SipYearsPage, { yearsMetadata } from "./SipYearsPage";

// Single child namespace for the SIP hub. Two slug shapes live here:
//
//   /sip/5000-per-month              → SipAmountPage  (amount axis, 5-30yr table)
//   /sip/5000-per-month-for-10-years → SipYearsPage   (amount × duration)
//
// The second shape used to be its own top-level /sip-returns section. Keeping
// two sibling root sections for one topic split the cluster and duplicated the
// hub; they are now one hub (/sip) with one child namespace, matching the
// /income-tax hub + /income-tax/[slug] pattern used elsewhere on the site.
// /sip-returns/* 301s here (see next.config.ts).
//
// The two parsers are mutually exclusive (parseSipSlug's regex is anchored to
// `<digits>-per-month` and cannot match a `-for-<n>-years` suffix), so a slug
// can never resolve to both pages, and no URL is reachable twice.

// Only curated slugs get a page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...SIP_SLUGS, ...SIP_YEAR_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (parseSipYearSlug(slug)) return yearsMetadata(slug);
  if (parseSipSlug(slug) !== null) return amountMetadata(slug);
  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (parseSipYearSlug(slug)) return <SipYearsPage slug={slug} />;
  if (parseSipSlug(slug) !== null) return <SipAmountPage slug={slug} />;
  notFound();
}
