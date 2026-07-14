// Shared content data. In production, news/blog can come from a CMS or API;
// kept here as typed data so pages stay clean and the site works offline.

export type Calculator = {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  category: "Investing" | "Loans" | "Tax" | "Savings";
  region: "IN" | "Global";
  live: boolean; // whether an interactive page exists yet
  keywords: string[];
};

export const calculators: Calculator[] = [
  {
    slug: "sip",
    title: "SIP Calculator",
    short: "Grow wealth monthly",
    blurb:
      "See how a monthly SIP compounds over time. Adjust amount, return and duration to project your mutual fund corpus.",
    category: "Investing",
    region: "IN",
    live: true,
    keywords: ["sip calculator", "mutual fund calculator", "sip return calculator"],
  },
  {
    slug: "emi",
    title: "EMI Calculator",
    short: "Home, car & personal loans",
    blurb:
      "Work out your monthly EMI, total interest and full amortisation for any loan amount, rate and tenure.",
    category: "Loans",
    region: "Global",
    live: true,
    keywords: ["emi calculator", "loan calculator", "home loan emi"],
  },
  {
    slug: "income-tax",
    title: "Income Tax Calculator",
    short: "New vs old regime (India)",
    blurb:
      "Estimate your income tax under India's new and old regimes for FY 2025–26 and see which saves you more.",
    category: "Tax",
    region: "IN",
    live: true,
    keywords: ["income tax calculator", "new vs old regime", "tax calculator india"],
  },
  {
    slug: "fd",
    title: "FD Calculator",
    short: "Fixed deposit maturity",
    blurb:
      "Calculate maturity value and interest earned on a fixed deposit with quarterly compounding.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["fd calculator", "fixed deposit calculator", "fd maturity"],
  },
  {
    slug: "lumpsum",
    title: "Lumpsum Calculator",
    short: "One-time investment growth",
    blurb:
      "Project the future value of a one-time investment. Enter an amount, expected return and duration to see how it compounds.",
    category: "Investing",
    region: "Global",
    live: true,
    keywords: ["lumpsum calculator", "one time investment"],
  },
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    short: "The 8th wonder of the world",
    blurb:
      "See how compound interest snowballs your money over time with any principal, rate, duration and compounding frequency.",
    category: "Savings",
    region: "Global",
    live: true,
    keywords: ["compound interest calculator", "compounding"],
  },
  {
    slug: "ppf",
    title: "PPF Calculator",
    short: "15-year tax-free savings",
    blurb:
      "Estimate your PPF maturity with yearly contributions and government-set compounding — a tax-free favourite in India.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["ppf calculator", "public provident fund"],
  },
  {
    slug: "retirement",
    title: "Retirement Calculator",
    short: "How much you'll need",
    blurb:
      "Find the corpus you need to retire comfortably and the monthly investment required to get there in time.",
    category: "Investing",
    region: "Global",
    live: true,
    keywords: ["retirement calculator", "retirement corpus", "retirement planning"],
  },
  {
    slug: "gratuity",
    title: "Gratuity Calculator",
    short: "End-of-service payout",
    blurb:
      "Calculate the gratuity you're owed based on your last drawn salary and total years of service.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["gratuity calculator", "gratuity formula"],
  },
  {
    slug: "gst",
    title: "GST Calculator",
    short: "Add or remove GST",
    blurb:
      "Add GST to a base price or extract GST from an inclusive amount, at any rate — 5%, 12%, 18% or 28%.",
    category: "Tax",
    region: "IN",
    live: true,
    keywords: ["gst calculator", "gst india", "add gst"],
  },
  {
    slug: "swp",
    title: "SWP Calculator",
    short: "Systematic withdrawal",
    blurb: "Plan a monthly income from your investments while the balance keeps growing.",
    category: "Investing",
    region: "IN",
    live: false,
    keywords: ["swp calculator", "systematic withdrawal plan"],
  },
  {
    slug: "hra",
    title: "HRA Calculator",
    short: "House rent allowance exemption",
    blurb: "Work out how much of your HRA is tax-exempt under Indian income tax rules.",
    category: "Tax",
    region: "IN",
    live: false,
    keywords: ["hra calculator", "hra exemption"],
  },
];

export type Region = "USA" | "China" | "India";

export type AiTool = {
  name: string;
  maker: string;
  region: Region;
  category: string;
  tagline: string;
  benefits: string[];
  pricing: string; // human-readable price line (indicative)
  tier: "Free" | "Freemium" | "Paid";
  rating: number; // out of 5
  keywords: string[];
};

// Pricing is indicative (approx. as of 2026) and can change — always confirm on
// the official site. Grouped by the region of the company that makes each tool.
export const aiTools: AiTool[] = [
  /* ------------------------------- USA ------------------------------- */
  {
    name: "ChatGPT",
    maker: "OpenAI",
    region: "USA",
    category: "All-round Assistant",
    tagline: "The most widely used AI assistant for everyday questions, drafting and brainstorming.",
    benefits: [
      "Huge ecosystem of custom GPTs and plugins",
      "Voice, image and file understanding built in",
      "Great free tier for casual use",
    ],
    pricing: "Free · Plus $20/mo · Pro $200/mo",
    tier: "Freemium",
    rating: 4.7,
    keywords: ["chatgpt", "openai", "ai assistant"],
  },
  {
    name: "Claude",
    maker: "Anthropic",
    region: "USA",
    category: "Writing & Analysis",
    tagline: "Thoughtful long-form writing, analysis and coding with a very large context window.",
    benefits: [
      "Best-in-class for nuanced writing and reasoning",
      "Handles long documents and big codebases",
      "Strong at spreadsheets, research and coding",
    ],
    pricing: "Free · Pro $20/mo · Max from $100/mo",
    tier: "Freemium",
    rating: 4.8,
    keywords: ["claude ai", "anthropic", "best ai for writing"],
  },
  {
    name: "Gemini",
    maker: "Google",
    region: "USA",
    category: "Multimodal Assistant",
    tagline: "Google's assistant, deeply tied into Search, Android, Gmail and Workspace.",
    benefits: [
      "Excellent multimodal (text, image, video) understanding",
      "Built into Google apps you already use",
      "Generous free access on mobile",
    ],
    pricing: "Free · Google AI Pro ~$20/mo",
    tier: "Freemium",
    rating: 4.6,
    keywords: ["google gemini", "ai assistant"],
  },
  {
    name: "Perplexity",
    maker: "Perplexity AI",
    region: "USA",
    category: "AI Search",
    tagline: "Answers with live web sources and citations — research you can actually verify.",
    benefits: [
      "Every answer is backed by cited sources",
      "Great for up-to-date research",
      "Focus modes for academic, finance and more",
    ],
    pricing: "Free · Pro $20/mo",
    tier: "Freemium",
    rating: 4.6,
    keywords: ["perplexity ai", "ai search engine"],
  },
  {
    name: "Microsoft Copilot",
    maker: "Microsoft",
    region: "USA",
    category: "Productivity",
    tagline: "AI woven into Windows and Office — draft in Word, analyse in Excel, summarise in Outlook.",
    benefits: [
      "Works right inside Word, Excel, PowerPoint & Teams",
      "Enterprise-grade data protection",
      "Free tier in Windows and the web",
    ],
    pricing: "Free · Copilot Pro $20/mo",
    tier: "Freemium",
    rating: 4.4,
    keywords: ["microsoft copilot", "office ai"],
  },
  {
    name: "GitHub Copilot",
    maker: "GitHub / Microsoft",
    region: "USA",
    category: "Coding",
    tagline: "The autocomplete-on-steroids that suggests whole functions as you type.",
    benefits: [
      "Works in VS Code, JetBrains and more",
      "Free tier for individual developers",
      "Chat and agent modes for bigger tasks",
    ],
    pricing: "Free · Pro $10/mo · Pro+ $39/mo",
    tier: "Freemium",
    rating: 4.6,
    keywords: ["github copilot", "ai coding assistant"],
  },
  {
    name: "Cursor",
    maker: "Anysphere",
    region: "USA",
    category: "Coding",
    tagline: "An AI-first code editor that understands your whole project, not just one file.",
    benefits: [
      "Edits across your entire codebase",
      "Agent mode can build features end to end",
      "Free Hobby tier to try it",
    ],
    pricing: "Free · Pro $20/mo",
    tier: "Freemium",
    rating: 4.6,
    keywords: ["cursor ai", "ai code editor"],
  },
  {
    name: "Midjourney",
    maker: "Midjourney",
    region: "USA",
    category: "Image Generation",
    tagline: "Still the gold standard for beautiful, artistic AI images.",
    benefits: [
      "Unmatched aesthetic quality",
      "Powerful style and reference controls",
      "Active community for inspiration",
    ],
    pricing: "Basic $10/mo · Standard $30/mo",
    tier: "Paid",
    rating: 4.5,
    keywords: ["midjourney", "ai image generator"],
  },
  {
    name: "ElevenLabs",
    maker: "ElevenLabs",
    region: "USA",
    category: "Voice & Audio",
    tagline: "Astonishingly realistic AI voices and voice cloning for videos and podcasts.",
    benefits: [
      "Most natural-sounding AI speech available",
      "Clone a voice from a short sample",
      "Supports 30+ languages including Hindi",
    ],
    pricing: "Free · Starter $5/mo · Creator $22/mo",
    tier: "Freemium",
    rating: 4.5,
    keywords: ["elevenlabs", "ai voice generator"],
  },
  {
    name: "Runway",
    maker: "Runway",
    region: "USA",
    category: "Video Generation",
    tagline: "Text-to-video and powerful AI editing tools used by real film and ad studios.",
    benefits: [
      "Generate video clips from text or images",
      "Pro-grade editing and motion tools",
      "Free tier with starter credits",
    ],
    pricing: "Free · Standard $15/mo",
    tier: "Freemium",
    rating: 4.4,
    keywords: ["runway ai", "ai video generator"],
  },
  {
    name: "Grok",
    maker: "xAI",
    region: "USA",
    category: "Assistant",
    tagline: "Elon Musk's assistant with real-time access to posts on X and a casual tone.",
    benefits: [
      "Live awareness of trending topics on X",
      "Fewer content restrictions than rivals",
      "Image generation included",
    ],
    pricing: "Free (limited) · SuperGrok ~$30/mo",
    tier: "Freemium",
    rating: 4.3,
    keywords: ["grok ai", "xai"],
  },

  /* ------------------------------ CHINA ------------------------------ */
  {
    name: "DeepSeek",
    maker: "DeepSeek",
    region: "China",
    category: "Reasoning & Coding",
    tagline: "The open model that shook the industry — frontier-level reasoning at a tiny cost.",
    benefits: [
      "Top-tier maths, coding and reasoning",
      "Free to use on web and app",
      "Open weights and ultra-cheap API",
    ],
    pricing: "Free app · very low-cost API",
    tier: "Freemium",
    rating: 4.6,
    keywords: ["deepseek", "open source ai"],
  },
  {
    name: "Qwen (Tongyi)",
    maker: "Alibaba",
    region: "China",
    category: "Multimodal & Open Models",
    tagline: "Alibaba's powerful family of open models covering text, image, audio and video.",
    benefits: [
      "Strong open-source models you can self-host",
      "Excellent multilingual support",
      "Free to use, permissive licensing",
    ],
    pricing: "Free · open-source · pay-as-you-go API",
    tier: "Free",
    rating: 4.5,
    keywords: ["qwen", "alibaba ai", "tongyi"],
  },
  {
    name: "Doubao",
    maker: "ByteDance",
    region: "China",
    category: "Assistant",
    tagline: "TikTok-maker ByteDance's assistant — one of China's most-used AI apps.",
    benefits: [
      "Fast, friendly everyday assistant",
      "Very low API pricing at scale",
      "Deep integration with ByteDance apps",
    ],
    pricing: "Free · low-cost API",
    tier: "Free",
    rating: 4.3,
    keywords: ["doubao", "bytedance ai"],
  },
  {
    name: "Kimi",
    maker: "Moonshot AI",
    region: "China",
    category: "Long-context Chat",
    tagline: "Famous for reading huge documents — analyse whole books and reports in one go.",
    benefits: [
      "Extremely long context window",
      "Great for document and file analysis",
      "Free to use",
    ],
    pricing: "Free",
    tier: "Free",
    rating: 4.4,
    keywords: ["kimi ai", "moonshot ai"],
  },
  {
    name: "Ernie Bot",
    maker: "Baidu",
    region: "China",
    category: "Assistant",
    tagline: "Baidu's flagship assistant, tightly linked to China's biggest search engine.",
    benefits: [
      "Strong Chinese-language performance",
      "Built-in image generation",
      "Free tier available",
    ],
    pricing: "Free tier · paid plans",
    tier: "Freemium",
    rating: 4.1,
    keywords: ["ernie bot", "baidu ai"],
  },
  {
    name: "Hunyuan",
    maker: "Tencent",
    region: "China",
    category: "Assistant & Image",
    tagline: "Tencent's model powering assistants, image and 3D generation across WeChat's ecosystem.",
    benefits: [
      "Text, image and 3D generation",
      "Open-source variants available",
      "Free to use",
    ],
    pricing: "Free · open-source options",
    tier: "Free",
    rating: 4.1,
    keywords: ["hunyuan", "tencent ai"],
  },
  {
    name: "GLM (Z.ai)",
    maker: "Zhipu AI",
    region: "China",
    category: "Assistant & Agents",
    tagline: "A capable model family strong at coding and autonomous agent workflows.",
    benefits: [
      "Solid coding and agent abilities",
      "Open models developers can build on",
      "Affordable API",
    ],
    pricing: "Free tier · low-cost API",
    tier: "Freemium",
    rating: 4.3,
    keywords: ["glm", "zhipu ai", "chatglm"],
  },
  {
    name: "MiniMax (Hailuo)",
    maker: "MiniMax",
    region: "China",
    category: "Video, Voice & Chat",
    tagline: "Best known for Hailuo, one of the strongest and cheapest AI video generators.",
    benefits: [
      "High-quality text-to-video (Hailuo)",
      "Realistic voice generation",
      "Free credits to start",
    ],
    pricing: "Free credits · paid plans",
    tier: "Freemium",
    rating: 4.3,
    keywords: ["minimax", "hailuo ai", "ai video"],
  },

  /* ------------------------------ INDIA ------------------------------ */
  {
    name: "Krutrim",
    maker: "Ola Krutrim",
    region: "India",
    category: "Indian Multilingual Assistant",
    tagline: "India's own assistant, built to understand and speak many Indian languages.",
    benefits: [
      "Strong support for Indian languages",
      "Made for Indian context and use-cases",
      "Free to use",
    ],
    pricing: "Free",
    tier: "Free",
    rating: 3.9,
    keywords: ["krutrim", "ola ai", "indian ai"],
  },
  {
    name: "Sarvam AI",
    maker: "Sarvam",
    region: "India",
    category: "Indic Language Models",
    tagline: "India-first models and voice AI for building apps in Indian languages.",
    benefits: [
      "Purpose-built for Indic languages and voice",
      "Open models for developers",
      "Backs India's sovereign AI push",
    ],
    pricing: "API / enterprise · open models",
    tier: "Paid",
    rating: 4.0,
    keywords: ["sarvam ai", "indic llm"],
  },
  {
    name: "BharatGPT",
    maker: "CoRover",
    region: "India",
    category: "Enterprise Conversational AI",
    tagline: "Enterprise-grade Indian conversational AI used by large public and private services.",
    benefits: [
      "Voice, video and text in 14+ Indian languages",
      "Trusted by big Indian enterprises",
      "On-premise / sovereign deployment",
    ],
    pricing: "Enterprise pricing",
    tier: "Paid",
    rating: 3.9,
    keywords: ["bharatgpt", "corover", "indian ai"],
  },
  {
    name: "Hanooman",
    maker: "SML / BharatGPT group",
    region: "India",
    category: "Indic Multilingual",
    tagline: "An Indian multilingual AI aimed at everyday users across dozens of Indian languages.",
    benefits: [
      "Covers a very wide range of Indian languages",
      "Free consumer app",
      "Focus on education and healthcare use-cases",
    ],
    pricing: "Free app",
    tier: "Free",
    rating: 3.8,
    keywords: ["hanooman ai", "indian ai"],
  },
];

export type NewsItem = {
  title: string;
  summary: string;
  category: "Finance" | "AI";
  source: string;
  minutesAgo: number;
  tag: string;
};

// Sample curated items to demonstrate the layout.
// These get replaced by the daily auto-fetch pipeline (RSS/News API + AI summary).
export const news: NewsItem[] = [
  {
    title: "RBI holds repo rate steady as inflation cools",
    summary:
      "India's central bank kept its benchmark rate unchanged, signalling a wait-and-watch stance. Home-loan borrowers see no immediate EMI change; economists expect a possible cut next quarter.",
    category: "Finance",
    source: "Market wire",
    minutesAgo: 42,
    tag: "Rates",
  },
  {
    title: "New AI model raises the bar on reasoning benchmarks",
    summary:
      "A newly released frontier model posts state-of-the-art scores on math and coding evaluations, intensifying competition among the major AI labs and pushing prices down for developers.",
    category: "AI",
    source: "Tech desk",
    minutesAgo: 88,
    tag: "Models",
  },
  {
    title: "Nifty and Sensex end higher on IT and banking strength",
    summary:
      "Benchmark indices closed in the green, led by large-cap IT names. Analysts point to steady global cues and easing bond yields as supportive for equities near term.",
    category: "Finance",
    source: "Market wire",
    minutesAgo: 120,
    tag: "Markets",
  },
  {
    title: "AI agents move from demos to real workplace deployments",
    summary:
      "Enterprises are shifting from experimenting with chatbots to deploying task-completing AI agents in support, finance and operations — with measurable productivity gains reported.",
    category: "AI",
    source: "Tech desk",
    minutesAgo: 150,
    tag: "Agents",
  },
  {
    title: "Gold holds near record as investors seek safety",
    summary:
      "Bullion prices stayed firm amid currency swings and geopolitical uncertainty. Advisors continue to suggest a small gold allocation for diversification rather than timing the metal.",
    category: "Finance",
    source: "Commodities",
    minutesAgo: 190,
    tag: "Commodities",
  },
  {
    title: "Open-source AI tools narrow the gap with paid options",
    summary:
      "The latest open models bring capable, free alternatives for writing, coding and image tasks — a meaningful shift for creators and small businesses watching their budgets.",
    category: "AI",
    source: "Tech desk",
    minutesAgo: 240,
    tag: "Open source",
  },
];

import type { CoverVariant, CoverPalette } from "@/components/CoverArt";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
  keywords: string[];
  art: { variant: CoverVariant; palette: CoverPalette };
};

export const posts: Post[] = [
  {
    slug: "best-ai-tools-for-personal-finance",
    title: "Best AI Tools for Personal Finance in 2026",
    excerpt:
      "From automatic budgeting to smarter expense tracking, here are the AI tools genuinely worth your time — and the ones that are just hype.",
    category: "AI + Money",
    readMinutes: 9,
    date: "Jul 10, 2026",
    keywords: ["best ai tools for finance", "ai budgeting apps"],
    art: { variant: "spark", palette: "forest" },
  },
  {
    slug: "sip-vs-lumpsum",
    title: "SIP vs Lumpsum: Which Actually Builds More Wealth?",
    excerpt:
      "We ran the numbers across market cycles. The answer isn't what most people assume — and it depends heavily on one thing.",
    category: "Investing",
    readMinutes: 7,
    date: "Jul 8, 2026",
    keywords: ["sip vs lumpsum", "mutual fund investing"],
    art: { variant: "chart", palette: "brass" },
  },
  {
    slug: "how-to-improve-credit-score",
    title: "How to Improve Your Credit Score Fast (Real Steps)",
    excerpt:
      "No gimmicks. The specific, ordered actions that move your CIBIL/FICO score — and how long each one takes to show up.",
    category: "Credit",
    readMinutes: 8,
    date: "Jul 5, 2026",
    keywords: ["improve credit score", "cibil score tips"],
    art: { variant: "card", palette: "berry" },
  },
  {
    slug: "work-faster-with-ai",
    title: "How to Work 10x Faster with AI: A Practical Playbook",
    excerpt:
      "The exact workflows professionals use to save hours every week — with copy-paste prompts you can start using today.",
    category: "Productivity",
    readMinutes: 11,
    date: "Jul 2, 2026",
    keywords: ["work faster with ai", "best ai prompts"],
    art: { variant: "nodes", palette: "forest" },
  },
  {
    slug: "how-to-make-money-with-ai",
    title: "How to Make Money with AI in 2026: 7 Realistic Ways",
    excerpt:
      "No get-rich-quick nonsense. Seven genuine ways people are earning with AI right now — and what each one actually takes.",
    category: "AI + Money",
    readMinutes: 12,
    date: "Jul 12, 2026",
    keywords: ["make money with ai", "ai side hustle", "earn money with ai"],
    art: { variant: "coins", palette: "brass" },
  },
  {
    slug: "chatgpt-vs-claude-vs-gemini",
    title: "ChatGPT vs Claude vs Gemini: Which AI Is Best in 2026?",
    excerpt:
      "We put the three biggest AI assistants head to head on writing, coding, research and value — so you know which to actually pay for.",
    category: "AI Tools",
    readMinutes: 10,
    date: "Jul 11, 2026",
    keywords: ["chatgpt vs claude vs gemini", "best ai assistant"],
    art: { variant: "nodes", palette: "deep" },
  },
  {
    slug: "best-free-ai-tools",
    title: "15 Best Free AI Tools You Should Be Using in 2026",
    excerpt:
      "The most useful AI tools that cost nothing — for writing, images, study, coding and getting everyday work done faster.",
    category: "AI Tools",
    readMinutes: 9,
    date: "Jul 9, 2026",
    keywords: ["best free ai tools", "free ai tools 2026"],
    art: { variant: "spark", palette: "berry" },
  },
  {
    slug: "how-to-save-income-tax",
    title: "How to Save Income Tax in India: 10 Legal Ways",
    excerpt:
      "From 80C to NPS to smart use of the new regime — the deductions and moves that genuinely cut your tax bill this year.",
    category: "Tax",
    readMinutes: 11,
    date: "Jul 7, 2026",
    keywords: ["how to save income tax", "80c deductions", "tax saving india"],
    art: { variant: "card", palette: "forest" },
  },
  {
    slug: "emergency-fund-guide",
    title: "How Much Emergency Fund Do You Actually Need?",
    excerpt:
      "The one financial safety net everyone needs before investing — how big it should be, where to keep it, and how to build it fast.",
    category: "Personal Finance",
    readMinutes: 7,
    date: "Jul 4, 2026",
    keywords: ["emergency fund", "how much emergency fund", "rainy day fund"],
    art: { variant: "coins", palette: "forest" },
  },
];
