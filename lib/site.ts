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
 * Header navigation, grouped into a small number of top-level mega-menus.
 *
 * Each menu drives a rich dropdown: an optional promo card, icon-led category
 * columns, and an optional "popular" list with thumbnails. `href` on a menu is
 * the section landing page, so the trigger stays a real link even without the
 * panel. Column/item `icon` keys resolve against ICONS in components/Header.tsx;
 * items with no icon fall back to a keyword match.
 */
export type NavColumn = {
  heading?: string;
  sub?: string;
  icon?: string;
  items: NavItem[];
};

export type NavPromo = {
  pill: string;
  title: string;
  desc: string;
  cta: NavItem;
};

export type NavPopular = {
  heading: string;
  sub: string;
  viewAllHref: string;
  /** `seed` picks the thumbnail photo (see resolveCoverImageUrl). */
  items: { label: string; href: string; seed: string }[];
};

export type NavMenu = {
  label: string;
  href: string;
  blurb: string;
  columns: NavColumn[];
  footer?: NavItem;
  promo?: NavPromo;
  popular?: NavPopular;
};

export const navMenus: NavMenu[] = [
  {
    label: "Calculators",
    href: "/calculators",
    blurb: "Free, private and instant. Every calculator runs in your browser.",
    promo: {
      pill: "Free & Private",
      title: "Plan your money in minutes",
      desc: "Every calculator runs in your browser. No sign-up, nothing uploaded.",
      cta: { label: "Browse all calculators", href: "/calculators" },
    },
    columns: [
      {
        heading: "Most Used",
        sub: "Start here",
        icon: "calculator",
        items: [
          { label: "SIP Calculator", href: "/calculators/sip", desc: "Monthly mutual fund returns" },
          { label: "EMI Calculator", href: "/calculators/emi", desc: "Home, car and personal loans" },
          { label: "Income Tax Calculator", href: "/calculators/income-tax", desc: "New vs old regime" },
        ],
      },
      {
        heading: "Planning",
        sub: "Plan ahead",
        icon: "lineChart",
        items: [
          { label: "Retirement Calculator", href: "/calculators/retirement", desc: "How much you need" },
          { label: "FIRE Calculator", href: "/calculators/fire", desc: "Retire early planning" },
          { label: "Net Worth Calculator", href: "/calculators/net-worth", desc: "Your financial position" },
          { label: "Goal Calculator", href: "/calculators/goal", desc: "SIP for any target" },
          { label: "Financial Health Score", href: "/calculators/financial-health", desc: "Score across 5 dimensions" },
        ],
      },
      {
        heading: "Savings & Returns",
        sub: "Grow your money",
        icon: "piggy",
        items: [
          { label: "FD Calculator", href: "/calculators/fd", desc: "Fixed deposit maturity" },
          { label: "PPF Calculator", href: "/calculators/ppf", desc: "Tax-free long-term growth" },
          { label: "Lumpsum Calculator", href: "/calculators/lumpsum", desc: "One-time investment" },
          { label: "CAGR Calculator", href: "/calculators/cagr", desc: "Annualised growth rate" },
          { label: "Compound Interest", href: "/calculators/compound-interest", desc: "The power of compounding" },
        ],
      },
    ],
    popular: {
      heading: "Popular Calculators",
      sub: "Most used tools",
      viewAllHref: "/calculators",
      items: [
        { label: "SIP Calculator", href: "/calculators/sip", seed: "sip investing mutual fund" },
        { label: "Income Tax Calculator", href: "/calculators/income-tax", seed: "income tax" },
        { label: "EMI Calculator", href: "/calculators/emi", seed: "home loan emi" },
        { label: "FD Calculator", href: "/calculators/fd", seed: "fixed deposit savings" },
      ],
    },
    footer: { label: "Browse all calculators", href: "/calculators" },
  },
  {
    label: "Learn",
    href: "/blog",
    blurb: "Plain-English money and AI explainers, written for Indian readers.",
    promo: {
      pill: "Learn & Grow",
      title: "Build your financial knowledge",
      desc: "Easy guides, expert insights and practical knowledge to make better financial decisions.",
      cta: { label: "View all guides", href: "/blog" },
    },
    columns: [
      {
        heading: "Investment Basics",
        sub: "Start your financial journey",
        icon: "book",
        items: [
          { label: "Guides", href: "/blog", desc: "How-to articles and comparisons" },
          { label: "Glossary", href: "/glossary", desc: "Finance and AI terms explained" },
          { label: "News", href: "/news", desc: "What changed and why it matters" },
        ],
      },
      {
        heading: "Popular Topics",
        sub: "Deep dive into concepts",
        icon: "barChart",
        items: [
          { label: "Investing", href: "/investing", desc: "Where to put your money" },
          { label: "Income Tax", href: "/income-tax", desc: "Regimes, deductions, filing" },
          { label: "Credit Score", href: "/credit-score", desc: "Check and improve your CIBIL" },
          { label: "Savings", href: "/savings", desc: "FD, RD and safe returns" },
          { label: "Retirement", href: "/retirement", desc: "NPS, EPF and planning" },
        ],
      },
      {
        heading: "Data & Compare",
        sub: "Stay updated & informed",
        icon: "bulb",
        items: [
          { label: "Comparison Engine", href: "/comparisons", desc: "Side-by-side decisions" },
          { label: "Research Hub", href: "/research", desc: "Rate histories & data" },
          { label: "Finance Today", href: "/finance-today", desc: "Live RBI, FD, EPF, tax" },
        ],
      },
    ],
    popular: {
      heading: "Popular Guides",
      sub: "Most read articles",
      viewAllHref: "/blog",
      items: [
        { label: "SIP vs Lump Sum: Which is Better?", href: "/blog/sip-vs-lumpsum", seed: "sip-vs-lumpsum" },
        { label: "How to Save Income Tax in India", href: "/blog/how-to-save-income-tax", seed: "how-to-save-income-tax tax" },
        { label: "Improve Your Credit Score Fast", href: "/blog/how-to-improve-credit-score", seed: "credit-score" },
        { label: "Build an Emergency Fund", href: "/blog/emergency-fund-guide", seed: "emergency fund savings" },
      ],
    },
    footer: { label: "Read the latest guides", href: "/blog" },
  },
  {
    label: "IPO",
    href: "/ipos",
    blurb: "Track upcoming IPOs, check GMP, allotment status and expert reviews.",
    promo: {
      pill: "IPO Watch",
      title: "Track every IPO in one place",
      desc: "GMP, allotment status, dates and expert reviews, updated regularly.",
      cta: { label: "View IPO calendar", href: "/ipos" },
    },
    columns: [
      {
        heading: "Jio IPO 2026",
        sub: "The big one",
        icon: "flame",
        items: [
          { label: "Reliance Jio IPO", href: "/ipos/reliance-jio-ipo", desc: "Opens 21 Oct · ₹1,065-1,119" },
          { label: "Jio IPO GMP Today", href: "/ipos/jio-ipo-gmp-today", desc: "GMP ~₹250 (+22%)" },
          { label: "Jio IPO Allotment Status", href: "/ipos/jio-ipo-allotment-status", desc: "Allotment 26 Oct" },
        ],
      },
      {
        heading: "Browse & Track",
        sub: "Live grey-market data",
        icon: "search",
        items: [
          { label: "Upcoming IPOs", href: "/ipos/upcoming-ipo", desc: "Open, this week & pipeline" },
          { label: "IPO GMP Today", href: "/ipos/ipo-gmp-today", desc: "Live grey market premium" },
          { label: "Best Upcoming IPOs 2026", href: "/ipos/best-upcoming-ipos-2026", desc: "Ranked shortlist" },
          { label: "IPO Allotment Status", href: "/ipos/ipo-allotment-status", desc: "How to check online" },
          { label: "Mainboard vs SME IPO", href: "/ipos/mainboard-vs-sme-ipo", desc: "Which to choose" },
        ],
      },
      {
        heading: "More IPOs",
        sub: "In the pipeline",
        icon: "building",
        items: [
          { label: "NSE IPO 2026", href: "/ipos/nse-ipo", desc: "Listed ₹1,800 · now ~₹1,750" },
          { label: "Zepto IPO", href: "/ipos/zepto-ipo", desc: "₹8,010 Cr · Dates awaited" },
          { label: "OYO IPO", href: "/ipos/oyo-ipo", desc: "₹6,650 Cr · pipeline" },
          { label: "Hero FinCorp IPO", href: "/ipos/hero-fincorp-ipo", desc: "₹3,668 Cr · NBFC" },
          { label: "PhonePe IPO", href: "/ipos/phonepe-ipo", desc: "Est. ₹12,000 Cr+" },
        ],
      },
    ],
    popular: {
      heading: "Most Tracked",
      sub: "Trending IPOs",
      viewAllHref: "/ipos",
      items: [
        { label: "Reliance Jio IPO 2026", href: "/ipos/reliance-jio-ipo", seed: "ipo stock market" },
        { label: "Jio IPO GMP Today", href: "/ipos/jio-ipo-gmp-today", seed: "stock market chart" },
        { label: "Upcoming IPOs This Week", href: "/ipos/upcoming-ipo", seed: "investing stock exchange" },
        { label: "Best Upcoming IPOs 2026", href: "/ipos/best-upcoming-ipos-2026", seed: "investing growth" },
      ],
    },
    footer: { label: "View IPO calendar", href: "/ipos" },
  },
  {
    label: "Tools",
    href: "/tools",
    blurb: "Everyday utilities that work offline in your browser. Nothing is uploaded.",
    promo: {
      pill: "Free Utilities",
      title: "Everyday tools that just work",
      desc: "Documents, images and more, offline in your browser. Nothing is uploaded.",
      cta: { label: "Browse all tools", href: "/tools" },
    },
    columns: [
      {
        heading: "Documents",
        sub: "PDF & invoices",
        icon: "fileText",
        items: [
          { label: "Merge PDF", href: "/tools/merge-pdf", desc: "Join files into one" },
          { label: "Image to PDF", href: "/tools/image-to-pdf", desc: "Photos into a document" },
          { label: "Invoice Generator", href: "/tools/invoice-generator", desc: "Professional invoices" },
        ],
      },
      {
        heading: "Everyday",
        sub: "Daily helpers",
        icon: "wrench",
        items: [
          { label: "Resume Builder", href: "/resume-builder", desc: "ATS-friendly resume" },
          { label: "Compress Image", href: "/tools/compress-image", desc: "Smaller files, same quality" },
          { label: "Budget Planner", href: "/tools/budget-planner", desc: "Track income and spending" },
        ],
      },
    ],
    popular: {
      heading: "Popular Tools",
      sub: "Most used utilities",
      viewAllHref: "/tools",
      items: [
        { label: "Resume Builder", href: "/resume-builder", seed: "resume career salary" },
        { label: "Merge PDF", href: "/tools/merge-pdf", seed: "documents tax paperwork" },
        { label: "Image to PDF", href: "/tools/image-to-pdf", seed: "documents filing" },
        { label: "Compress Image", href: "/tools/compress-image", seed: "ai tech laptop" },
      ],
    },
    footer: { label: "Browse all free tools", href: "/tools" },
  },
  {
    label: "AI",
    href: "/ai-tools",
    blurb: "Hands-on reviews of the AI tools worth your time, plus a free assistant.",
    promo: {
      pill: "AI + Money",
      title: "The AI tools worth your time",
      desc: "Hands-on reviews and a free AI money assistant that speaks plain English.",
      cta: { label: "Compare all AI tools", href: "/ai-tools" },
    },
    columns: [
      {
        heading: "Start Here",
        sub: "Where to begin",
        icon: "bot",
        items: [
          { label: "AI Tool Reviews", href: "/ai-tools", desc: "Pricing, pros and cons" },
          { label: "Ask AI", href: "/ai-assistant", desc: "Free AI money assistant" },
        ],
      },
      {
        heading: "Popular Reviews",
        sub: "Tried & tested",
        icon: "sparkles",
        items: [
          { label: "ChatGPT", href: "/ai-tools/chatgpt", desc: "The default first stop" },
          { label: "Gemini", href: "/ai-tools/gemini", desc: "Best Indic language support" },
          { label: "DeepSeek", href: "/ai-tools/deepseek", desc: "Frontier quality, free" },
        ],
      },
    ],
    popular: {
      heading: "Popular AI Tools",
      sub: "Most read reviews",
      viewAllHref: "/ai-tools",
      items: [
        { label: "ChatGPT Review", href: "/ai-tools/chatgpt", seed: "chatgpt ai" },
        { label: "Gemini Review", href: "/ai-tools/gemini", seed: "gemini ai model" },
        { label: "DeepSeek Review", href: "/ai-tools/deepseek", seed: "deepseek ai coding" },
        { label: "Ask AI Assistant", href: "/ai-assistant", seed: "ai chatbot assistant" },
      ],
    },
    footer: { label: "Compare all AI tools", href: "/ai-tools" },
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
