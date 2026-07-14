// Central site configuration — change brand/domain here once, reflects everywhere.

export const site = {
  name: "CoinMind",
  tagline: "Smarter money decisions, powered by AI",
  url: "https://coinmind.in",
  // ⚠️ Set up this mailbox (e.g. free email forwarding from your domain provider,
  // or Zoho Mail) so the address actually receives mail before applying to AdSense.
  email: "hello@coinmind.in",
  description:
    "Free financial calculators, AI tool reviews, and daily finance & AI news — built to help you plan investments, loans, taxes and work smarter with AI.",
  locale: "en",
  authorName: "The CoinMind Team",
  // Analytics, Tag Manager & Search Console (CoinMind live accounts):
  gaId: "G-1ZQB0YPJCS", // GA4 Measurement ID
  gtmId: "GTM-5MMG4KLC", // Google Tag Manager container
  googleVerification: "-S3tJnGDGCsP1TZH2m4Pf22meQCkexKzN-u0LfpyBDY", // GSC HTML-tag token
} as const;

export type NavItem = {
  label: string;
  href: string;
  desc?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Calculators", href: "/calculators", desc: "SIP, EMI, tax, FD & more" },
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
