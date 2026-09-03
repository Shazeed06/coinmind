// Central site configuration: change brand/domain here once, reflects everywhere.

export const site = {
  name: "CoinMind",
  tagline: "Smarter money decisions, powered by AI",
  // Canonical host. Vercel currently serves www as primary (coinmind.in 308→www),
  // so www is the canonical to keep GSC verification, sitemap and canonicals
  // consistent. coinmind.in still works and redirects here.
  url: "https://www.coinmind.in",
  // ⚠️ Set up this mailbox (e.g. free email forwarding from your domain provider,
  // or Zoho Mail) so the address actually receives mail before applying to AdSense.
  email: "coinmindofficial@gmail.com",
  description:
    "Free personal finance calculators for India: SIP, EMI, income tax, FD, PPF and more. Educational guides, explained clearly. No sign-up.",
  locale: "en",
  authorName: "Sahil",
  // Named author/editor behind the content: E-E-A-T "Who" for a YMYL finance
  // site. CA (Final) is a genuine, relevant finance credential.
  author: {
    firstName: "Sahil",
    lastName: "", // TODO: fill in real last name before AdSense reapplication
    fullName: "Sahil",
    slug: "sahil",
    role: "Founder & Editor",
    credential: "CA (Final) candidate",
    bio: "Sahil is the founder and editor of CoinMind and is pursuing the Chartered Accountancy (CA) Final. He built CoinMind to make finance calculators and money guidance genuinely free, accurate and free of jargon.",
    education: "Pursuing Chartered Accountancy (CA) Final",
    location: "India", // TODO: fill in real city, state
    sebiDisclaimer: "Not a SEBI-registered investment adviser. This site is educational.",
  },
  // Analytics, Tag Manager & Search Console (CoinMind live accounts):
  gaId: "G-1ZQB0YPJCS", // GA4 Measurement ID
  // GTM container GTM-5MMG4KLC exists but is EMPTY (no tags yet). Loading an
  // empty container adds nothing and makes crawlers (Ahrefs) flag "broken JS".
  // Re-enable by pasting the ID back the moment you add a real tag in the GTM UI.
  gtmId: "",
  googleVerification: "-S3tJnGDGCsP1TZH2m4Pf22meQCkexKzN-u0LfpyBDY", // GSC HTML-tag token
  // IndexNow key (Bing/Yandex/Naver instant indexing: also feeds ChatGPT Search
  // via Bing's index). The key file lives at /<key>.txt in public/.
  indexNowKey: "50d24150aec21af2e12f5995d1758905",
  // Google AdSense publisher ID: the FULL client value "ca-pub-XXXXXXXXXXXXXXXX".
  // This switches on the AdSense loader script (for site review + serving ads);
  // the matching line is in public/ads.txt.
  adsenseClientId: "ca-pub-5677983073792236",
} as const;

export type NavItem = {
  label: string;
  href: string;
  desc?: string;
  group?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Calculators", href: "/calculators", desc: "SIP, EMI, tax, FD & more", group: "Finance" },
  { label: "Guides", href: "/blog", desc: "How-to & money tips", group: "Finance" },
  { label: "Glossary", href: "/glossary", desc: "Finance & AI terms", group: "Finance" },
  { label: "Free Tools", href: "/tools", desc: "PDF, image & resume tools", group: "Tools" },
  { label: "AI Tools", href: "/ai-tools", desc: "Reviews & comparisons", group: "AI" },
  { label: "Ask AI", href: "/ai-assistant", desc: "Free AI money assistant", group: "AI" },
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
      { label: "Finance & AI Glossary", href: "/glossary" },
      { label: "Finance & AI News", href: "/news" },
      { label: "Guides & How-tos", href: "/blog" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Editorial Standards", href: "/editorial-standards" },
      { label: "Methodology", href: "/methodology" },
      { label: "Corrections", href: "/corrections" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
