// Central site configuration: change brand/domain here once, reflects everywhere.

export const site = {
  name: "CoinMind",
  tagline: "Smarter money decisions, powered by AI",
  // Canonical host. Served on Cloudflare Workers with the apex (coinmind.in) as
  // the primary custom domain; www.coinmind.in 301-redirects to the apex. Apex
  // is the canonical so sitemap, canonicals and OG stay consistent with what
  // actually serves.
  url: "https://coinmind.in",
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
  gtmId: "GTM-5MMG4KLC",
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
  /** Optional lucide icon key (see ICONS in components/Header.tsx). */
  icon?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Calculators", href: "/calculators", desc: "SIP, EMI, tax, FD & more", group: "Finance" },
  { label: "Guides", href: "/blog", desc: "How-to & money tips", group: "Finance" },
  { label: "Glossary", href: "/glossary", desc: "Finance & AI terms", group: "Finance" },
  { label: "Free Tools", href: "/tools", desc: "PDF, image & resume tools", group: "Tools" },
  { label: "AI Tools", href: "/ai-tools", desc: "Reviews & comparisons", group: "AI" },
  { label: "Ask AI", href: "/ai-assistant", desc: "Free AI money assistant", group: "AI" },
];

/**
 * Header navigation. Five clear top-level menus, each with a simple dropdown:
 * a 2-column list of its key links (icon + label + one-line description) and a
 * "View all" link to the section. `icon` keys resolve against ICONS in
 * components/Header.tsx; items without one fall back to a keyword match.
 */
export type NavMenu = {
  label: string;
  href: string;
  items: NavItem[];
};

export const navMenus: NavMenu[] = [
  {
    label: "Calculators",
    href: "/calculators",
    items: [
      { label: "SIP Calculator", href: "/calculators/sip", desc: "Mutual fund returns", icon: "invest" },
      { label: "EMI Calculator", href: "/calculators/emi", desc: "Loan monthly payment", icon: "loan" },
      { label: "Income Tax Calculator", href: "/calculators/income-tax", desc: "New vs old regime", icon: "tax" },
      { label: "FD Calculator", href: "/calculators/fd", desc: "Fixed deposit maturity", icon: "savings" },
      { label: "PPF Calculator", href: "/calculators/ppf", desc: "Tax-free long-term growth", icon: "ppf" },
      { label: "NPS Calculator", href: "/calculators/nps", desc: "Retirement corpus", icon: "retire" },
    ],
  },
  {
    label: "Guides",
    href: "/blog",
    items: [
      { label: "Blog & Articles", href: "/blog", desc: "Guides, how-tos & comparisons", icon: "book", group: "Read" },
      { label: "Finance & AI News", href: "/news", desc: "Latest explainers & updates", icon: "live", group: "Read" },
      { label: "Finance Today", href: "/finance-today", desc: "Live RBI, FD & gold rates", icon: "live", group: "Read" },
      { label: "Glossary", href: "/glossary", desc: "Finance & AI terms explained", icon: "book", group: "Read" },
      { label: "Investing", href: "/investing", desc: "Mutual funds, stocks & gold", icon: "invest", group: "Browse by topic" },
      { label: "Income Tax", href: "/income-tax", desc: "Regimes, deductions & ITR", icon: "tax", group: "Browse by topic" },
      { label: "Savings", href: "/savings", desc: "FD, PPF, RD & schemes", icon: "savings", group: "Browse by topic" },
      { label: "Loans", href: "/loans", desc: "Home, car & personal loans", icon: "loan", group: "Browse by topic" },
      { label: "Retirement", href: "/retirement", desc: "NPS, EPF, pension & FIRE", icon: "retire", group: "Browse by topic" },
      { label: "Credit Score", href: "/credit-score", desc: "Improve your CIBIL", icon: "credit", group: "Browse by topic" },
    ],
  },
  {
    label: "IPO",
    href: "/ipos",
    items: [
      { label: "Reliance Jio IPO", href: "/ipos/reliance-jio-ipo", desc: "Opens 21 Oct 2026", icon: "flame" },
      { label: "Upcoming IPOs", href: "/ipos/upcoming-ipo", desc: "Open & pipeline", icon: "rocket" },
      { label: "IPO GMP Today", href: "/ipos/ipo-gmp-today", desc: "Live grey market premium", icon: "chart" },
      { label: "Allotment Status", href: "/ipos/ipo-allotment-status", desc: "How to check online", icon: "tax" },
      { label: "Best IPOs 2026", href: "/ipos/best-upcoming-ipos-2026", desc: "Ranked shortlist", icon: "target" },
      { label: "Mainboard vs SME", href: "/ipos/mainboard-vs-sme-ipo", desc: "Which to choose", icon: "compare" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    items: [
      { label: "Resume Builder", href: "/resume-builder", desc: "ATS-friendly resume", icon: "resume" },
      { label: "Merge PDF", href: "/tools/merge-pdf", desc: "Join files into one", icon: "fileText" },
      { label: "Image to PDF", href: "/tools/image-to-pdf", desc: "Photos into a document", icon: "fileText" },
      { label: "Compress Image", href: "/tools/compress-image", desc: "Smaller files, same quality", icon: "image" },
      { label: "Invoice Generator", href: "/tools/invoice-generator", desc: "Professional invoices", icon: "tax" },
      { label: "Budget Planner", href: "/tools/budget-planner", desc: "Track income & spending", icon: "budget" },
    ],
  },
  {
    label: "AI",
    href: "/ai-tools",
    items: [
      { label: "AI Tool Reviews", href: "/ai-tools", desc: "Pricing, pros & cons", icon: "star" },
      { label: "Ask AI", href: "/ai-assistant", desc: "Free AI money assistant", icon: "bot" },
      { label: "ChatGPT", href: "/ai-tools/chatgpt", desc: "The default first stop", icon: "sparkles" },
      { label: "Gemini", href: "/ai-tools/gemini", desc: "Best Indic language support", icon: "sparkles" },
      { label: "DeepSeek", href: "/ai-tools/deepseek", desc: "Frontier quality, free", icon: "sparkles" },
    ],
  },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Finance Hubs",
    items: [
      { label: "SIP Hub", href: "/sip" },
      { label: "Investing Hub", href: "/investing" },
      { label: "Income Tax Hub", href: "/income-tax" },
      { label: "Loans Hub", href: "/loans" },
      { label: "Savings Hub", href: "/savings" },
      { label: "Retirement Hub", href: "/retirement" },
      { label: "Gold Hub", href: "/gold" },
      { label: "Budgeting Hub", href: "/budgeting" },
      { label: "Credit Score Hub", href: "/credit-score" },
    ],
  },
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
      { label: "Finance Today", href: "/finance-today" },
      { label: "Finance & AI Glossary", href: "/glossary" },
      { label: "Finance & AI News", href: "/news" },
      { label: "Guides & How-tos", href: "/blog" },
    ],
  },
  {
    title: "Trust & Transparency",
    items: [
      { label: "About the Author", href: "/about/author" },
      { label: "Editorial Policy", href: "/editorial-policy" },
      { label: "Financial Review Process", href: "/financial-review-process" },
      { label: "Official Sources", href: "/sources" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Methodology", href: "/methodology" },
      { label: "Corrections", href: "/corrections" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
