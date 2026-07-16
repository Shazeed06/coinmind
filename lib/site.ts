// Central site configuration — change brand/domain here once, reflects everywhere.

export const site = {
  name: "CoinMind",
  tagline: "Smarter money decisions, powered by AI",
  // Canonical host. Vercel currently serves www as primary (coinmind.in 308→www),
  // so www is the canonical to keep GSC verification, sitemap and canonicals
  // consistent. coinmind.in still works and redirects here.
  url: "https://www.coinmind.in",
  // ⚠️ Set up this mailbox (e.g. free email forwarding from your domain provider,
  // or Zoho Mail) so the address actually receives mail before applying to AdSense.
  email: "hello@coinmind.in",
  description:
    "Free SIP, EMI, income tax & FD calculators, honest AI tool reviews and daily finance & AI news — for smarter money decisions in India, the US & UK.",
  locale: "en",
  authorName: "The CoinMind Team",
  // Analytics, Tag Manager & Search Console (CoinMind live accounts):
  gaId: "G-1ZQB0YPJCS", // GA4 Measurement ID
  // GTM container GTM-5MMG4KLC exists but is EMPTY (no tags yet). Loading an
  // empty container adds nothing and makes crawlers (Ahrefs) flag "broken JS".
  // Re-enable by pasting the ID back the moment you add a real tag in the GTM UI.
  gtmId: "",
  googleVerification: "-S3tJnGDGCsP1TZH2m4Pf22meQCkexKzN-u0LfpyBDY", // GSC HTML-tag token
  // IndexNow key (Bing/Yandex/Naver instant indexing — also feeds ChatGPT Search
  // via Bing's index). The key file lives at /<key>.txt in public/.
  indexNowKey: "50d24150aec21af2e12f5995d1758905",
} as const;

export type NavItem = {
  label: string;
  href: string;
  desc?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Calculators", href: "/calculators", desc: "SIP, EMI, tax, FD & more" },
  { label: "Free Tools", href: "/tools", desc: "Resume, PDF & image tools" },
  { label: "Ask AI", href: "/ai-assistant", desc: "Free AI money assistant" },
  { label: "AI Tools", href: "/ai-tools", desc: "Reviews & comparisons" },
  { label: "News", href: "/news", desc: "Daily finance & AI updates" },
  { label: "Guides", href: "/blog", desc: "How-to & money tips" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Calculators",
    items: [
      { label: "SIP Calculator", href: "/calculators/sip" },
      { label: "EMI Calculator", href: "/calculators/emi" },
      { label: "Income Tax Calculator", href: "/calculators/income-tax" },
      { label: "FD Calculator", href: "/calculators/fd" },
      { label: "All calculators", href: "/calculators" },
    ],
  },
  {
    title: "Free Tools",
    items: [
      { label: "Resume Builder", href: "/resume-builder" },
      { label: "Compress Image", href: "/tools/compress-image" },
      { label: "Image to PDF", href: "/tools/image-to-pdf" },
      { label: "Merge PDF", href: "/tools/merge-pdf" },
      { label: "All free tools", href: "/tools" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "AI Tools Directory", href: "/ai-tools" },
      { label: "Finance & AI News", href: "/news" },
      { label: "Guides & How-tos", href: "/blog" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
