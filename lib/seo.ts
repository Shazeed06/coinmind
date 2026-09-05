import type { Metadata } from "next";
import { site } from "./site";

type SeoDef = {
  title: string;
  desc: string;
  keywords?: string[];
  ogTitle?: string;
  ogDesc?: string;
  image?: string;
  locale?: string;
};

const BASE = site.url;
const DEF_IMG = "/opengraph-image";

function mk(path: string, d: SeoDef): Metadata {
  const title = d.title;
  const desc = d.desc;
  const canonical = `${BASE}${path}`;
  return {
    title: { absolute: title },
    description: desc,
    keywords: d.keywords,
    alternates: { canonical },
    openGraph: {
      title: d.ogTitle || title,
      description: d.ogDesc || desc,
      url: canonical,
      type: "website",
      siteName: site.name,
      locale: d.locale || "en_IN",
      images: [{ url: d.image || DEF_IMG, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.ogTitle || title,
      description: d.ogDesc || desc,
      images: [d.image || DEF_IMG],
    },
    robots: { index: true, follow: true },
  };
}

// ----------------------- PAGE META -----------------------
//
// Only exports that a page actually imports live here. Calculator and tool
// pages build their metadata inline via calcMeta()/toolMeta() at the top of
// each page file, so per-slug constants for those routes are deliberately not
// kept: two competing title sets for the same URL is how titles drift.

export const HOME = mk("/", {
  title: "CoinMind - Free Personal Finance Calculators for India",
  desc: "Free personal finance calculators for India: SIP, EMI, income tax, FD, PPF, crypto tax and more. Plan investments, compare tax regimes, and save smarter. No sign-up.",
  keywords: ["SIP calculator", "EMI calculator", "income tax calculator", "FD calculator", "PPF calculator", "personal finance India", "free financial calculators", "finance guides"],
});

export function calcMeta(slug: string, title: string, desc: string, category?: string): Metadata {
  return mk(`/calculators/${slug}`, {
    title,
    desc,
    keywords: [`${title.toLowerCase()}`, "free online calculator", "India", ...(category ? [category.toLowerCase()] : [])],
  });
}

export function toolMeta(slug: string, title: string, desc: string): Metadata {
  return mk(`/tools/${slug}`, {
    title,
    desc,
    keywords: [`${title.toLowerCase()}`, "free online tool", "browser tool", "no signup"],
  });
}

// ----------------------- STATIC PAGES -----------------------

export const ABOUT = mk("/about", {
  title: "About CoinMind - Free Finance Calculators & AI Tool Reviews",
  desc: "CoinMind is built by Sahil (CA Final candidate) to make financial calculators, planning tools, and AI reviews genuinely free. No sign-up, no upsell, no jargon.",
  keywords: ["about CoinMind", "free finance calculators", "Sahil", "personal finance India", "finance tools"],
});

export const CALCULATORS = mk("/calculators", {
  title: "Free Financial Calculators India - SIP, EMI, Tax, FD & More",
  desc: "Free financial calculators for India: SIP, EMI, income tax, FD, PPF, NPS, retirement, GST and more. Instant, private, works in INR, USD and GBP. No sign-up.",
  keywords: ["financial calculators", "free calculators India", "SIP calculator", "EMI calculator", "income tax calculator", "investment calculator", "retirement calculator"],
});

export const NEWS = mk("/news", {
  title: "Finance & AI News - Plain-English Explainers",
  desc: "Original, plain-English explainers of the finance and AI news that matters. Updated by CoinMind's editorial team.",
  keywords: ["finance news", "AI news", "personal finance explainers", "market updates India", "AI developments"],
});

export const BLOG = mk("/blog", {
  title: "Personal Finance & AI Blog - Guides, Comparisons & How-Tos",
  desc: "Personal finance and AI guides written for India: investing, mutual funds, income tax, credit scores, side income and AI tools. Jargon-free, updated regularly.",
  keywords: ["personal finance guides", "investing tips India", "mutual funds guide", "tax saving tips", "AI guides", "money management"],
});

export const GLOSSARY = mk("/glossary", {
  title: "Finance Glossary - Investing, Tax & AI Terms Explained",
  desc: "Finance glossary in plain English. Look up SIP, EMI, CAGR, LTCG, NAV, XIRR and AI terms like LLM and neural network, each with an example and a calculator link.",
  keywords: ["finance glossary", "AI glossary", "finance terms", "SIP meaning", "EMI meaning", "CAGR explained", "AI terms"],
});

export const AI_TOOLS = mk("/ai-tools", {
  title: "Best AI Tools 2026 - USA, China & India Compared",
  desc: "Up-to-date directory of 20+ AI tools from the USA, China, and India. Compare ChatGPT, Claude, Gemini, DeepSeek, and more with real pricing and ratings.",
  keywords: ["best AI tools", "AI tools 2026", "ChatGPT vs Claude", "DeepSeek", "AI tools India", "AI tool comparison", "free AI tools"],
});

export const TOOLS = mk("/tools", {
  title: "Free Online Tools - PDF, Image, Text, AI & Calculators",
  desc: "Free online tools that run in your browser: merge and split PDFs, compress and convert images, count words, generate passwords and QR codes, plus AI writing tools.",
  keywords: ["free online tools", "resume builder", "PDF tools", "image compressor", "free utilities", "browser tools"],
});

export const RESUME = mk("/resume-builder", {
  title: "Free Resume Builder - Professional CV & BioData Maker",
  desc: "Create an ATS-friendly resume in minutes with CoinMind's free resume builder. Live preview, one-click PDF download, professional templates. No sign-up.",
  keywords: ["free resume builder", "CV maker", "resume template", "ATS resume", "biodata maker", "resume PDF", "online resume creator"],
});

export const NOT_FOUND: Metadata = {
  title: { absolute: "404 - Page Not Found · CoinMind" },
  description: "The page you are looking for does not exist or has been moved. Browse calculators, tools, or guides to find what you need.",
  robots: { index: false, follow: true },
};

// ----------------------- TOOL PAGES -----------------------
// Every other /tools/* page builds its metadata inline with toolMeta().

export const TOOL_COMPRESS = toolMeta("compress-image", "Compress Image - Shrink JPG, PNG & WebP Free", "Free online image compressor. Reduce JPG, PNG, and WebP file sizes without losing quality. Works in your browser. Nothing is uploaded.");
