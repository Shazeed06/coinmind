// Auto-injects route-specific JSON-LD structured data based on pathname.
// Rendered in root layout — extends SiteJsonLd with page-level schemas.

import { site } from "@/lib/site";
import {
  breadcrumb, faqPage, howTo, speakable, definedTerm,
  collectionPage, softwareApp, financialProduct, article, webApp,
} from "@/lib/ld";

type Faq = { q: string; a: string };

const FAQS_BY_PATH: Record<string, Faq[]> = {
  "/calculators": [
    { q: "Are CoinMind calculators free?", a: "Yes, every calculator is 100% free. No sign-up, no subscription, no hidden charges." },
    { q: "Do you store my financial data?", a: "No. All calculations run in your browser. We never see, store, or share the numbers you enter." },
    { q: "Which currencies do your calculators support?", a: "Most calculators support INR, USD, and GBP. Select your currency using the toggle." },
    { q: "How accurate are the calculations?", a: "The math is exact given your inputs. But projections (SIP returns, retirement needs) depend on assumptions about future returns and inflation." },
  ],
  "/tools": [
    { q: "Are the tools really free?", a: "Yes, every tool is completely free. No sign-up, no usage limits, no hidden charges." },
    { q: "Do you upload my files to a server?", a: "No. All file processing happens in your browser. Your files never leave your device." },
    { q: "Which tools are available?", a: "We offer 44+ tools: resume builder, PDF tools (merge, split, compress), image tools (resize, crop, convert), AI tools (summarizer, paraphrasing), and utilities (password generator, QR code, unit converter)." },
  ],
  "/ai-tools": [
    { q: "Which AI tools do you compare?", a: "We cover 20+ AI tools from the USA (ChatGPT, Claude, Gemini, Perplexity, Midjourney), China (DeepSeek, Qwen, Doubao, Kimi), and India (Krutrim, Sarvam AI, BharatGPT, Hanooman)." },
    { q: "How do you determine ratings?", a: "Ratings are based on hands-on testing, feature comparison, pricing analysis, and community feedback. Updated quarterly." },
  ],
};

const HOWTO_BY_PATH: Record<string, { name: string; description: string; steps: { name: string; text: string }[] }[]> = {
  "/calculators/sip": [
    {
      name: "How to use the SIP Calculator",
      description: "Calculate your monthly SIP returns in three simple steps.",
      steps: [
        { name: "Enter your SIP amount", text: "Set how much you want to invest each month or quarter." },
        { name: "Set return and tenure", text: "Adjust the expected annual return rate and number of years." },
        { name: "Review your projection", text: "See invested amount, returns, maturity value, tax impact, and year-wise growth." },
      ],
    },
  ],
};

const SPEAKABLE_PATHS = [
  "/", "/calculators/sip", "/calculators/emi", "/calculators/income-tax",
  "/calculators/fd", "/blog", "/glossary", "/ai-tools",
];

function getSpeakableSchemas() {
  return SPEAKABLE_PATHS.map((p) => speakable(p, ["h1", "h2", ".faq-answer"]));
}

function getFaqSchemas() {
  return Object.entries(FAQS_BY_PATH).map(([path, faqs]) => ({
    path,
    schema: faqPage(faqs),
  }));
}

function getHowToSchemas() {
  return Object.entries(HOWTO_BY_PATH).map(([, items]) =>
    items.map((h) => howTo(h.name, h.description, h.steps))
  ).flat();
}

export default function GlobalSeo({ pathname }: { pathname: string }) {
  const schemas: Record<string, unknown>[] = [];

  // Speakable — mark key pages for AI voice/overview consumption
  schemas.push(...getSpeakableSchemas());

  // FAQ schemas — match EXACT path only, not sub-paths
  const faq = FAQS_BY_PATH[pathname];
  if (faq) {
    schemas.push(faqPage(faq));
  }

  // HowTo schemas
  if (HOWTO_BY_PATH[pathname]) {
    schemas.push(...getHowToSchemas());
  }

  // Breadcrumb — auto-generated from path
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0) {
    const crumbs = [{ name: "Home", path: "/" }];
    let acc = "";
    for (const p of parts) {
      acc += `/${p}`;
      const label = p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      crumbs.push({ name: label, path: acc });
    }
    schemas.push(breadcrumb(crumbs));
  }

  // SoftwareApplication for calculator pages
  if (pathname.startsWith("/calculators/") && !pathname.endsWith("/calculators")) {
    const slug = pathname.replace("/calculators/", "");
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " Calculator";
    schemas.push(softwareApp(name, pathname, `Free ${name} — instant, private, no sign-up.`, ["Free", "Instant", "Private", "No sign-up", "Mobile friendly"]));
  }

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}
