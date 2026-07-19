// Shared content data. In production, news/blog can come from a CMS or API;
// kept here as typed data so pages stay clean and the site works offline.

import { morePosts } from "./morePosts";

export type Calculator = {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  category: "Investing" | "Loans" | "Tax" | "Savings" | "Utility" | "Health";
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
      "Estimate your income tax under India's new and old regimes for FY 2026–27 and see which saves you more.",
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
    slug: "goal-sip",
    title: "Goal SIP Calculator",
    short: "Reach ₹1 crore",
    blurb:
      "Reverse SIP: enter a target like ₹1 crore and see the exact monthly SIP needed to reach it. The crorepati calculator.",
    category: "Investing",
    region: "Global",
    live: true,
    keywords: ["goal sip calculator", "crorepati calculator", "how much sip for 1 crore"],
  },
  {
    slug: "take-home-salary",
    title: "Take-Home Salary Calculator",
    short: "CTC to in-hand",
    blurb:
      "Convert your annual CTC into real monthly in-hand pay, with PF, professional tax and new-regime income tax broken down.",
    category: "Tax",
    region: "IN",
    live: true,
    keywords: ["take home salary calculator", "ctc to in hand", "in hand salary calculator india"],
  },
  {
    slug: "currency-converter",
    title: "Currency Converter",
    short: "Live exchange rates",
    blurb:
      "Convert between 20+ currencies (USD, INR, EUR, GBP and more) at live exchange rates — free and instant.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["currency converter", "usd to inr", "exchange rate calculator"],
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    short: "Exact age, instantly",
    blurb:
      "Find your exact age in years, months and days, plus total weeks, days and hours and a countdown to your next birthday.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["age calculator", "how old am i", "date of birth calculator"],
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    short: "Percentages made easy",
    blurb:
      "Find X% of a number, what percent one value is of another, and percentage increase or decrease — instantly and free.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["percentage calculator", "percent calculator", "percentage increase calculator"],
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    short: "Split the bill fairly",
    blurb:
      "Enter your bill, pick a tip %, and split it any number of ways — see the tip, total and per-person share instantly.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["tip calculator", "tip percentage calculator", "bill split calculator"],
  },
  {
    slug: "date-difference-calculator",
    title: "Date Difference Calculator",
    short: "Days between dates",
    blurb:
      "Count days, weeks, months and years between two dates, or add and subtract time from any date.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["date calculator", "days between dates", "date difference calculator"],
  },
  {
    slug: "swp",
    title: "SWP Calculator",
    short: "Systematic withdrawal",
    blurb: "Plan a monthly income from your investments while the balance keeps growing.",
    category: "Investing",
    region: "IN",
    live: true,
    keywords: ["swp calculator", "systematic withdrawal plan"],
  },
  {
    slug: "hra",
    title: "HRA Calculator",
    short: "House rent allowance exemption",
    blurb: "Work out how much of your HRA is tax-exempt under Indian income tax rules.",
    category: "Tax",
    region: "IN",
    live: true,
    keywords: ["hra calculator", "hra exemption"],
  },
  {
    slug: "nps",
    title: "NPS Calculator",
    short: "Pension & corpus estimate",
    blurb:
      "Project your NPS retirement corpus, tax-free lump sum and the monthly pension your annuity can buy at 60.",
    category: "Investing",
    region: "IN",
    live: true,
    keywords: ["nps calculator", "national pension scheme calculator", "nps pension calculator"],
  },
  {
    slug: "epf",
    title: "EPF Calculator",
    short: "Provident fund growth",
    blurb:
      "Project your Employee Provident Fund corpus at retirement from your salary, contribution rate and EPF interest.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["epf calculator", "pf calculator", "employee provident fund calculator"],
  },
  {
    slug: "home-loan-eligibility",
    title: "Home Loan Eligibility Calculator",
    short: "Home loan you can get",
    blurb:
      "Estimate how much home loan you qualify for from your income, existing EMIs and lender FOIR limits.",
    category: "Loans",
    region: "Global",
    live: true,
    keywords: ["home loan eligibility calculator", "how much home loan can i get", "loan eligibility calculator"],
  },
  {
    slug: "step-up-sip",
    title: "Step-up SIP Calculator",
    short: "Top-up SIP returns",
    blurb:
      "See how raising your monthly SIP each year grows your corpus, and the extra you earn versus a flat SIP.",
    category: "Investing",
    region: "Global",
    live: true,
    keywords: ["step up sip calculator", "top up sip calculator", "step up sip returns"],
  },
  {
    slug: "cagr",
    title: "CAGR Calculator",
    short: "Annual growth rate",
    blurb:
      "Turn an investment's start and end value into a smoothed annual growth rate, plus absolute return and total gain.",
    category: "Investing",
    region: "Global",
    live: true,
    keywords: ["cagr calculator", "compound annual growth rate calculator", "cagr formula"],
  },
  {
    slug: "inflation",
    title: "Inflation Calculator",
    short: "Future value of money",
    blurb:
      "See what today's money will cost in future and how inflation erodes your savings' buying power over time.",
    category: "Savings",
    region: "Global",
    live: true,
    keywords: ["inflation calculator", "future value of money calculator", "purchasing power calculator"],
  },
  {
    slug: "simple-interest",
    title: "Simple Interest Calculator",
    short: "Interest & total amount",
    blurb:
      "Work out interest and total repayment with the SI formula, and see how it compares with compound interest.",
    category: "Savings",
    region: "Global",
    live: true,
    keywords: ["simple interest calculator", "simple interest formula", "si calculator"],
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs Buy Calculator",
    short: "Rent or buy a home",
    blurb:
      "Compare buying a home against renting and investing the difference to see which leaves you wealthier.",
    category: "Loans",
    region: "Global",
    live: true,
    keywords: ["rent vs buy calculator", "should i rent or buy a house", "rent or buy calculator"],
  },
  {
    slug: "bmi",
    title: "BMI Calculator",
    short: "Body mass index",
    blurb:
      "Find your body mass index from height and weight (metric or imperial), your category, and the healthy weight range for your height.",
    category: "Health",
    region: "Global",
    live: true,
    keywords: ["bmi calculator", "body mass index calculator", "bmi chart"],
  },
  {
    slug: "ideal-weight",
    title: "Ideal Weight Calculator",
    short: "Healthy weight by height",
    blurb:
      "Estimate a healthy body weight for your height and sex using the Robinson, Miller, Devine and Hamwi formulas.",
    category: "Health",
    region: "Global",
    live: true,
    keywords: ["ideal weight calculator", "ideal body weight", "healthy weight for height"],
  },
  {
    slug: "calorie",
    title: "Calorie Calculator",
    short: "Daily calories (TDEE)",
    blurb:
      "Estimate your daily maintenance calories (TDEE) with the Mifflin-St Jeor equation, plus targets for losing or gaining weight.",
    category: "Health",
    region: "Global",
    live: true,
    keywords: ["calorie calculator", "tdee calculator", "maintenance calories", "bmr calculator"],
  },
  {
    slug: "pregnancy-due-date",
    title: "Pregnancy Due Date Calculator",
    short: "Estimate your due date",
    blurb:
      "Estimate your due date from your last period or conception date, and see how many weeks pregnant you are.",
    category: "Health",
    region: "Global",
    live: true,
    keywords: ["pregnancy due date calculator", "due date calculator", "how many weeks pregnant"],
  },
  {
    slug: "rd",
    title: "RD Calculator",
    short: "Recurring deposit maturity",
    blurb:
      "Find your recurring deposit maturity value and total interest with quarterly compounding — for bank and post office RD plans.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["rd calculator", "recurring deposit calculator", "rd maturity calculator", "post office rd calculator"],
  },
  {
    slug: "sukanya-samriddhi",
    title: "Sukanya Samriddhi Yojana Calculator",
    short: "SSY tax-free girl-child corpus",
    blurb:
      "Estimate the tax-free SSY maturity value for a girl child from yearly deposits, compounded annually to year 21.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["sukanya samriddhi yojana calculator", "ssy calculator", "sukanya samriddhi calculator", "ssy maturity calculator"],
  },
  {
    slug: "mutual-fund-returns",
    title: "Mutual Fund Returns Calculator",
    short: "Lumpsum growth & CAGR",
    blurb:
      "Project the future value, total return and CAGR of a one-time lumpsum mutual fund investment from your amount, expected return and duration.",
    category: "Investing",
    region: "IN",
    live: true,
    keywords: ["mutual fund returns calculator", "mutual fund calculator", "mf return calculator", "mutual fund calculator india"],
  },
  {
    slug: "mortgage",
    title: "Mortgage Calculator",
    short: "Monthly payment & interest",
    blurb:
      "Estimate your monthly home loan payment, total interest and total paid from the home price, down payment, term and interest rate.",
    category: "Loans",
    region: "Global",
    live: true,
    keywords: ["mortgage calculator", "home loan calculator", "mortgage payment calculator", "monthly mortgage calculator"],
  },
  {
    slug: "tds",
    title: "TDS Calculator",
    short: "Tax deducted at source",
    blurb:
      "Estimate TDS on interest, professional fees, rent, contractor and commission payments, and see the net amount after deduction.",
    category: "Tax",
    region: "IN",
    live: true,
    keywords: ["tds calculator", "tds calculator online", "tds on salary calculator", "tds on interest calculator"],
  },
  {
    slug: "capital-gains",
    title: "Capital Gains Tax Calculator",
    short: "LTCG & STCG on your assets",
    blurb:
      "Work out short-term and long-term capital gains tax on equity, mutual funds, property and gold under FY 2026-27 rules.",
    category: "Tax",
    region: "IN",
    live: true,
    keywords: ["capital gains tax calculator", "ltcg calculator", "capital gains calculator india", "stcg calculator"],
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

// Evergreen, original plain-English explainers on finance & AI topics.
// Add new items here when publishing — there is no live auto-fetch pipeline,
// so the page is written to present these honestly (no "updated today" claims).
export const news: NewsItem[] = [
  {
    title: "What an RBI repo-rate pause means for your EMIs and FDs",
    summary:
      "When the RBI leaves its repo rate unchanged, floating-rate home-loan EMIs usually hold steady and fresh fixed-deposit rates tend to plateau. A plain-English explainer on how a rate pause filters through to your borrowing and saving.",
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
    title: "Why the Nifty and Sensex move — and what it means for your SIPs",
    summary:
      "The headline indices rise and fall with corporate earnings, global cues and bond yields. For most SIP investors, day-to-day swings matter far less than staying invested — here's how to think about the noise.",
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
    title: "Should gold be part of your portfolio? How to think about it",
    summary:
      "Gold often holds its value when currencies wobble or markets turn uncertain, which is why advisors suggest a small allocation for diversification rather than trying to time the metal. Here's how to weigh it up.",
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
  // Newer posts store their body as markdown (rendered by ArticleMarkdown).
  // Older posts use the hand-written JSX in the blog [slug] `bodies` record.
  bodyMarkdown?: string;
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
      "Across market cycles, the answer isn't what most people assume — and it depends heavily on one thing.",
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
  {
    slug: "new-tax-regime-fy-2026-27",
    title: "New Tax Regime FY 2026-27: Slabs, Rebate & Who Wins",
    excerpt: "A plain-English guide to India's new income tax regime for FY 2026-27: slabs, the Rs 75,000 standard deduction, the Section 87A rebate, and old vs new.",
    category: "Tax",
    readMinutes: 6,
    date: "Jul 15, 2026",
    keywords: ["new tax regime FY 2026-27","income tax slabs 2026-27","section 87A rebate","standard deduction 75000","old vs new tax regime","Income Tax Act 2025","zero tax up to 12 lakh"],
    art: { variant: "chart", palette: "forest" },
    bodyMarkdown: "If you earn a salary in India, the new tax regime is now the default choice for most people — and for the financial year 2026-27 (assessment year 2027-28), the numbers are worth understanding before you file or before you fill out that investment declaration at work. There's also a bigger structural change happening: the new Income Tax Act, 2025 takes effect from 1 April 2026, replacing the old 1961 law. Here's what actually matters for your wallet.\n\n## The new regime slabs for FY 2026-27\n\nThe new tax regime uses these slabs for FY 2026-27:\n\n- Up to Rs 4,00,000 — Nil\n- Rs 4,00,001 to Rs 8,00,000 — 5%\n- Rs 8,00,001 to Rs 12,00,000 — 10%\n- Rs 12,00,001 to Rs 16,00,000 — 15%\n- Rs 16,00,001 to Rs 20,00,000 — 20%\n- Rs 20,00,001 to Rs 24,00,000 — 25%\n- Above Rs 24,00,000 — 30%\n\nThese are the same slabs that applied in FY 2025-26 — Budget 2026 left them unchanged, so there are no surprises this year. A 4% health and education cess applies on top of the tax you actually pay.\n\nOne point people miss: these are **marginal** rates. If you earn Rs 20 lakh, you don't pay 20% on the whole amount. You pay nothing on the first Rs 4 lakh, 5% on the next slice, 10% on the slice after that, and so on. Your effective rate is always lower than your top slab rate.\n\n## The Rs 75,000 standard deduction\n\nSalaried employees and pensioners get a flat standard deduction of Rs 75,000 under the new regime. You don't need any bills or proof — it's automatic. This is why you'll often hear that income up to Rs 12.75 lakh is tax-free for salaried people: the Rs 75,000 deduction brings a Rs 12.75 lakh salary down to Rs 12 lakh of taxable income, and the rebate (next section) handles the rest.\n\nIf you're not salaried — say you run a business or earn only from other sources — the standard deduction doesn't apply, so your zero-tax ceiling sits at Rs 12 lakh of taxable income rather than Rs 12.75 lakh.\n\n## The Section 87A rebate: zero tax up to Rs 12 lakh\n\nThis is the headline feature. Under the new regime, a resident individual with **taxable income up to Rs 12 lakh** gets a rebate under Section 87A of up to Rs 60,000 — which wipes out the tax entirely. So you compute your tax using the slabs above, and if your taxable income is Rs 12 lakh or below, the rebate cancels it out. You pay nothing.\n\nA crucial distinction: the rebate is **not** the same as an exemption. Your basic exemption is still just Rs 4 lakh. The rebate is a separate benefit that erases the calculated tax for those under the threshold. Cross above Rs 12 lakh of taxable income and the rebate disappears — you then pay tax on everything above Rs 4 lakh per the slabs.\n\nThat would create an ugly cliff (imagine Rs 12,00,001 suddenly attracting Rs 60,000-plus in tax over the person at exactly Rs 12 lakh). To fix this, the law provides **marginal relief**. If your income is only slightly above Rs 12 lakh, your tax is capped at roughly the amount by which you exceed Rs 12 lakh. For example, at Rs 12.1 lakh taxable income the normal tax would be around Rs 61,500, but since you're only Rs 10,000 over the line, marginal relief limits your tax to about Rs 10,000 plus cess. This relief tapers off by around Rs 12.75 lakh, after which you pay full slab tax.\n\nTo see exactly what you'd owe at your income level under both regimes, run the numbers through an [income tax calculator](/calculators/income-tax) rather than estimating by hand.\n\n## Old regime vs new regime: the real trade-off\n\nThe old regime still exists, and it isn't automatically worse. The difference comes down to deductions.\n\nUnder the **new regime**, most popular deductions and exemptions are switched off — Section 80C (PPF, ELSS, life insurance, home loan principal), 80D (health insurance), HRA, LTA, and the like are all disallowed. In exchange you get wider slabs, the Rs 75,000 standard deduction, and the generous rebate.\n\nUnder the **old regime**, the slabs are narrower and rebate is smaller, but you can subtract those deductions from your income. If you genuinely claim large deductions — a home loan, full 80C, health insurance for your family, and significant HRA — the old regime can still come out ahead.\n\nA rough rule of thumb: the more you invest in tax-saving instruments and the higher your HRA, the more likely the old regime wins. If you don't itemise much — you rent little or nothing, don't max out 80C, and want simplicity — the new regime usually gives you a lower bill with zero paperwork.\n\nThe honest answer is that there's no universal winner. Calculate both. For a salaried person with modest deductions, the new regime's zero-tax-up-to-Rs-12.75-lakh math is hard to beat. For someone with a home loan and a full deduction stack, the old regime deserves a proper comparison.\n\n## What changes with the Income Tax Act, 2025\n\nFrom 1 April 2026, the Income Tax Act, 2025 replaces the 1961 Act. It's largely a **simplification and consolidation** exercise — the language is cleaner and the number of sections is sharply reduced — rather than a rewrite of your tax rates. Slabs, the rebate, and the standard deduction carry over as described above.\n\nThe most visible change for ordinary filers is terminology. The old \"Previous Year\" and \"Assessment Year\" pair is replaced by a single **\"Tax Year.\"** For FY 2026-27, the tax year is simply 2026-27. It's meant to reduce confusion about which year you're filing for. Your day-to-day filing experience shouldn't change dramatically, but the forms and portal language will reflect the new law.\n\n## The bottom line\n\nFor FY 2026-27, the new regime keeps things simple: no tax up to Rs 12.75 lakh for most salaried people, unchanged slabs, and an automatic standard deduction. The old regime is worth checking only if you carry meaningful deductions. This is general educational information, not personalised tax advice — for anything complicated, run both scenarios and, if in doubt, talk to a qualified tax professional.",
  },
  {
    slug: "ups-vs-nps",
    title: "UPS vs NPS: Which Pension Scheme Should You Pick?",
    excerpt: "A clear comparison of the Unified Pension Scheme (UPS) and NPS for government employees: guaranteed vs market-linked pension, contributions and payouts.",
    category: "Investing",
    readMinutes: 7,
    date: "Jul 15, 2026",
    keywords: ["UPS vs NPS","Unified Pension Scheme","National Pension System","assured pension government employees","NPS withdrawal rules","50% assured pension"],
    art: { variant: "coins", palette: "brass" },
    bodyMarkdown: "If you are a central government employee in India, you now have a genuine choice to make about how your retirement money works. Since 1 April 2025, the Unified Pension Scheme (UPS) has been available as an option under the broader National Pension System (NPS). The two schemes sit inside the same administrative structure, but they treat risk very differently. One hands you a defined, government-backed monthly pension. The other hands you a market-linked corpus that could be larger or smaller depending on how markets perform. Neither is universally \"better\" — the right answer depends on what you value more: predictability or potential upside.\n\nHere is a balanced, factual look at how each works and how to think about the decision.\n\n## How NPS works\n\nNPS is a market-linked, defined-contribution scheme. You and your employer both put money into your Tier-1 account every month, and that money is invested in a mix of equity, corporate bonds and government securities through professional pension fund managers. Your retirement corpus is simply whatever those contributions grow into over your career.\n\nFor central government employees, the standard split has been 10% of basic pay plus dearness allowance from you, matched by a 14% government contribution. At retirement (age 60 or superannuation), you can withdraw up to 60% of the corpus as a tax-free lump sum, and the remaining 40% must be used to buy an annuity, which pays you a monthly income for life. The size of that annuity depends entirely on how big your corpus grew and the annuity rates available when you exit.\n\nNPS is not limited to government staff. Any Indian citizen aged 18 to 85, including NRIs, can open a Tier-1 account, which makes it the default retirement vehicle for private-sector employees and the self-employed too. The trade-off is clear: strong long-term growth potential, but no promise about the final number.\n\n## How UPS works\n\nUPS is designed to remove that uncertainty for government employees. Instead of a corpus that depends on markets, it offers an **assured payout**: 50% of your average basic pay over the last 12 months before retirement, provided you complete at least 25 years of qualifying service. Serve between 10 and 25 years and you get a proportionate amount. There is also a floor — a minimum assured pension of ₹10,000 per month for anyone who retires with at least 10 years of service.\n\nYour contribution stays the same at 10% of basic pay plus DA. The government matches that 10% and, on top of it, puts in an additional pool contribution of roughly 8.5%, taking the total government support to around 18.5%. That extra pool is what funds the guarantee.\n\nUPS also carries features that mirror the old defined-benefit pension world: dearness relief (inflation adjustment) on your pension, a family pension of 60% of your payout for a surviving spouse, and a lump sum at retirement equal to one-tenth of your last drawn monthly basic pay plus DA for every completed six months of service. Existing NPS employees and eligible past retirees were given until 30 November 2025 to opt in.\n\n## Guaranteed vs market-linked: the core trade-off\n\nThis is the heart of the decision. UPS gives you certainty. You can calculate your pension years in advance because it is tied to your final salary, not to the Sensex. If markets have a bad decade right before you retire, your UPS pension does not care. That protection has real value, especially for people who dislike financial surprises late in life.\n\nNPS gives you exposure. Over long horizons, Indian equity and debt markets have historically delivered returns that can build a corpus larger than what a defined 50% pension would replace — but \"historically\" is not \"guaranteed\". You carry the market risk yourself, and you also carry the flexibility: you decide the asset mix, you keep 60% as a lump sum, and your heirs inherit the remaining corpus in a way that a lifelong annuity or family pension does not always replicate.\n\nPut simply: UPS protects your downside and caps your upside. NPS opens your upside but exposes your downside.\n\n## Who is eligible for what\n\nUPS is only for central government employees covered by NPS, plus certain state governments that choose to adopt it. Private-sector workers, gig workers and the self-employed cannot join UPS — for them, NPS remains the vehicle. So for most readers who are not government staff, this is not actually a choice; NPS is the option on the table.\n\nIf you are a government employee, you genuinely get to pick. And once you opt for UPS, the decision is generally treated as final, so it deserves careful thought rather than a snap choice.\n\n## How to decide\n\nStart with your temperament and your other assets. If a predictable, inflation-linked cheque every month would let you sleep at night, and you do not have a large separate equity portfolio, UPS leans in your favour. If you are comfortable with market ups and downs, expect a long career with strong salary growth, and want the flexibility of a lump sum and inheritable corpus, NPS may suit you better.\n\nIt also helps to run the numbers rather than argue in the abstract. Estimate your likely final basic pay to see what a 50% UPS pension looks like, then model what a market-linked NPS corpus might grow to under conservative and optimistic return assumptions. A [retirement corpus and pension calculator](/calculators/retirement) makes it easy to compare the assured UPS figure against a range of NPS outcomes side by side, so you are choosing between real numbers instead of gut feeling.\n\n## The bottom line\n\nUPS and NPS are not rivals so much as two philosophies of retirement. UPS is about certainty and protection; NPS is about growth and flexibility. For a government employee, the honest answer is that it depends on how much market risk you can stomach and how much you value a guaranteed floor. Look at your full financial picture, model both outcomes, and choose the one whose worst case you can live with comfortably.\n\nThis article is for education only and is not financial advice; confirm the latest rules with official PFRDA and government notifications before deciding.",
  },
  {
    slug: "sip-to-become-crorepati",
    title: "SIP to Become a Crorepati: Monthly Amount Needed",
    excerpt: "How much monthly SIP you need to reach 1 crore at 12% returns over 20, 25, or 30 years, and why starting early cuts your monthly amount so sharply.",
    category: "Investing",
    readMinutes: 5,
    date: "Jul 15, 2026",
    keywords: ["SIP to become crorepati","monthly SIP for 1 crore","how to reach 1 crore with SIP","SIP crore calculator","12 percent SIP returns","mutual fund SIP goal"],
    art: { variant: "chart", palette: "forest" },
    bodyMarkdown: "\"Crorepati\" used to mean genuinely rich. Today, thanks to inflation, 1 crore is more of a solid financial milestone than a life-changing fortune, but it is still a number most people would love to see in their portfolio. The good news is that reaching it through a monthly SIP (Systematic Investment Plan) in equity mutual funds is far more achievable than it sounds, provided you give it time. The bad news, or the honest part, is that \"time\" is the single biggest lever, and most people underestimate just how much difference a few extra years make.\n\nLet's look at the actual numbers.\n\n## How much you need to invest each month\n\nThese figures assume a 12% annual return, which is a common long-term assumption for Indian equity mutual funds. It is not a guarantee, and we'll come back to that. All amounts are rounded to keep them readable.\n\nTo reach 1 crore:\n\n- **In 30 years:** about **2,850 per month**\n- **In 25 years:** about **5,300 per month**\n- **In 20 years:** about **10,000 per month**\n- **In 15 years:** about **20,000 per month**\n- **In 10 years:** about **43,000 per month**\n\nRead that list again slowly, because it contains the whole point of this article. To hit the exact same 1 crore, the person with 30 years needs to set aside roughly 2,850 a month, while the person with 10 years needs about 43,000. That is a 15x difference in monthly effort for the identical goal. The only variable that changed was how early they started.\n\n## Why starting early matters so enormously\n\nThe reason isn't just that you have more months to invest. It's compounding, and specifically the fact that your returns start earning their own returns.\n\nConsider the total money you actually contribute from your pocket:\n\n- Over **30 years** at 2,850/month, you invest about **10.3 lakh** and the market turns it into 1 crore.\n- Over **25 years** at 5,300/month, you invest about **16 lakh**.\n- Over **20 years** at 10,000/month, you invest about **24 lakh**.\n\nThe 30-year investor becomes a crorepati by contributing only around 10 lakh of their own money. The rest, nearly 90 lakh, is growth. The 20-year investor has to put in more than double the actual cash. Time does the heavy lifting that your wallet would otherwise have to do.\n\nThis is why financial writers keep repeating the same slightly annoying advice: the best time to start a SIP was years ago, and the second-best time is this month. Even a modest amount started now will usually beat a much larger amount started five years later. If you're in your twenties, small numbers genuinely work. If you're in your forties, you can still absolutely get there, you'll just need bigger monthly commitments and a bit more patience.\n\n## Setting a goal that you'll actually stick to\n\nA target you abandon in year three is worse than a smaller one you finish. So be realistic on two fronts.\n\nFirst, pick a monthly amount you can sustain even in a bad month, not the maximum you can manage in a good one. A comfortable 4,000 SIP that runs for 25 years uninterrupted beats an ambitious 8,000 that you pause every time expenses spike.\n\nSecond, build in a step-up. Your income will likely rise over the years, and increasing your SIP by even 5-10% annually can dramatically shorten your timeline or push your final corpus well past 1 crore. Many investors start small deliberately, then raise the amount every time they get a hike. You can model different monthly amounts, timelines, and step-up scenarios with a [goal-based SIP calculator](/calculators/goal-sip) to see what combination fits your income today.\n\nA practical way to frame it: decide the goal (1 crore), decide the deadline (say, retirement at a certain age), and let the math tell you the monthly number. If that number feels too high, extend the deadline rather than quitting. An extra five years often cuts the monthly requirement almost in half.\n\n## The honest part about market risk\n\nThat 12% assumption deserves a warning label. It is a long-term average, and averages hide a lot of turbulence. Equity markets do not go up in a smooth line. There will be years where your portfolio is flat or deep in the red, sometimes for uncomfortably long stretches. Some years may deliver 25% and others may deliver -15%. Nobody, including fund managers, can tell you the exact return you'll get.\n\nWhat history suggests is that staying invested across full market cycles has rewarded patient investors, and that SIPs help here specifically because you keep buying during the scary cheap phases, which lowers your average cost. The danger is not market crashes themselves. The real danger is stopping your SIP during a crash, which is exactly when you're buying units at a discount.\n\nSo treat the numbers above as a reasonable planning estimate, not a promise. Your actual crore might arrive a couple of years early or a couple of years late depending on how the market behaves around your finish line. Keep an emergency fund separate so you're never forced to sell investments at a bad time, and don't invest money you'll need within the next three to five years in equity.\n\n## The takeaway\n\nBecoming a crorepati through SIP is not about being a stock-picking genius or earning a huge salary. It's mostly about starting early, choosing an amount you can maintain, and refusing to stop when the market gets ugly. The person who begins a small SIP in their twenties and simply doesn't interfere with it will very often end up ahead of the person who starts big but starts late. Time, consistency, and patience are the real strategy. This is educational information, not personalised financial advice, so consider your own situation or a SEBI-registered advisor before committing.\"",
  },
  {
    slug: "ctc-vs-in-hand-salary",
    title: "CTC vs In-Hand Salary in India: Why They Differ",
    excerpt: "Your CTC is not your take-home pay. Here's every deduction that shrinks the number on your offer letter, and how to estimate your real monthly salary.",
    category: "Personal Finance",
    readMinutes: 6,
    date: "Jul 15, 2026",
    keywords: ["CTC vs in-hand salary","take home salary India","CTC breakup","in-hand salary calculation","employer PF gratuity","professional tax","income tax on salary","net salary India"],
    art: { variant: "coins", palette: "brass" },
    bodyMarkdown: "You get an offer letter that says ₹18,00,000 CTC. You do the mental math: that's ₹1,50,000 a month. Then the first salary hits your account and it's about ₹1,21,000. Nothing went wrong. This gap between the big number on paper and the money you can actually spend is the single most misunderstood thing about Indian salaries, and it catches even experienced professionals off guard when they switch jobs.\n\nLet's break down exactly where the difference goes, item by item, so the next offer letter you read tells you what you'll really earn.\n\n## What CTC actually means\n\nCTC stands for Cost to Company. It is the total amount your employer spends on you in a year, not the amount they pay you. That distinction is everything. CTC includes money that never touches your bank account, money the company sets aside on your behalf, and money that gets deducted before your salary is credited.\n\nA typical CTC has three layers. First, your **gross salary**, which is basic pay plus allowances like HRA, special allowance, and any bonus. Second, **employer contributions** that are counted as your cost but paid into funds, not to you. Third, the deductions that come out of your gross before it lands in your account. Only after peeling away layers two and three do you get your in-hand, or take-home, salary.\n\n## The deductions that shrink your CTC\n\nHere is each piece that separates CTC from what you keep.\n\n**Employer's PF contribution.** Under the EPF Act, your employer contributes 12% of your basic salary to your Provident Fund every month. This is part of your CTC, listed as a cost, but you never see it as spendable cash. If your basic is above ₹15,000, many employers cap this at ₹1,800 a month (12% of ₹15,000), though some contribute 12% of the full basic. Either way, it inflates your CTC without adding to your monthly credit.\n\n**Gratuity.** Companies provision gratuity into your CTC at roughly 4.81% of your basic salary. Gratuity is a lump sum you only receive after completing five years of continuous service, paid using the formula (basic × years × 15) ÷ 26. So this chunk of your CTC is money you cannot touch unless you stay half a decade, and you lose it entirely if you leave before five years.\n\n**Employee's PF contribution.** Now the deductions from your side. You also contribute 12% of your basic to PF. This comes out of your gross salary, reducing your take-home. It is genuinely your money and it grows tax-free, but it is locked away until retirement (with limited early withdrawal). Between the employer's and your own contribution, PF alone can take a meaningful bite out of a basic-heavy salary structure.\n\n**Professional tax.** A small state-level tax deducted monthly. It is capped at ₹2,500 per year total, so at most it costs you around ₹200 a month. States like Maharashtra, Karnataka, West Bengal, and Tamil Nadu levy it; some states like Delhi and Haryana do not charge it at all. Minor, but it is a real deduction.\n\n**Income tax (TDS).** Usually the biggest deduction for higher earners. Your employer deducts tax at source every month based on your projected annual income and your chosen tax regime. Under the new regime, income up to ₹12,00,000 of taxable income is effectively tax-free thanks to the Section 87A rebate, and salaried people also get a ₹75,000 standard deduction. Above that, slab rates apply. The old regime lets you claim deductions like 80C, HRA exemption, and home loan interest, but has higher slab rates. Which regime saves you more depends entirely on your investments and rent, so it is worth checking both.\n\n## Putting it together with a real example\n\nTake a ₹18,00,000 CTC. Suppose the structure is: basic ₹7,50,000, HRA and allowances ₹9,24,000, employer PF ₹90,000, and gratuity provision ₹36,000. That employer PF and gratuity (about ₹1,26,000) is CTC but not gross salary, so your gross is roughly ₹16,74,000 a year, or about ₹1,39,500 a month.\n\nFrom that gross, subtract your own PF (₹7,500 a month), professional tax (₹200), and monthly TDS (roughly ₹10,400 under the new regime, after the ₹75,000 standard deduction). Your in-hand lands somewhere around ₹1,21,000, not the ₹1,50,000 the CTC implied. The exact figure moves with your salary structure and tax choices, which is why estimating it precisely matters before you sign.\n\n## How to estimate your take-home before you accept\n\nNever evaluate an offer on CTC alone. Ask HR for the detailed salary structure, or **salary breakup**, showing basic, allowances, and each employer contribution separately. Two offers with identical CTC can produce very different take-home pay depending on how much is loaded into non-cash components like PF, gratuity, and variable bonus.\n\nThe fastest way to see your real monthly figure is to run the numbers through a [take-home salary calculator](/calculators/take-home-salary), which applies PF, professional tax, and current income tax slabs to convert any CTC into an in-hand estimate. Plug in the structure from your offer, compare the old and new tax regimes, and you will know what actually hits your account.\n\n## How to increase your in-hand salary\n\nUnderstanding CTC vs in-hand is only step one — you can also tilt the gap in your favour. A few practical levers push real money into your account each month without changing your CTC at all.\n\n**Restructure your CTC.** Ask HR whether your package can lean toward tax-friendly components instead of a large, fully taxable special allowance. A bigger HRA share, for instance, is worth more if you genuinely pay rent, because part of it becomes exempt under the old regime. Reimbursements and a well-structured basic can also change how much tax and PF come out.\n\n**Claim HRA and 80C.** If you rent, submit your rent receipts so the HRA exemption lowers your taxable income. Filling the Section 80C limit of ₹1.5 lakh through EPF, PPF, ELSS or life insurance — and adding 80D health-insurance premiums plus the extra ₹50,000 NPS deduction under 80CCD(1B) — shrinks the tax carved out of your salary under the old regime.\n\n**Choose the right regime.** This is often the single biggest lever on CTC vs in-hand. Under the new regime for FY 2026-27, taxable income up to ₹12,00,000 is effectively tax-free thanks to the Section 87A rebate, and salaried people also get a ₹75,000 standard deduction — so if you have few deductions, the new regime can hand you more take-home than the old one. If you claim large HRA, home-loan interest and 80C deductions, the old regime may still win. Run your numbers through the [income tax calculator](/calculators/income-tax) to see which regime leaves more in your pocket, then confirm the monthly effect on the [take-home salary calculator](/calculators/take-home-salary).\n\nNone of these deductions are the company cheating you. PF and gratuity build your long-term savings, and tax is unavoidable. But knowing the split turns a confusing offer letter into a clear decision. When you can look at a CTC and immediately picture the take-home behind it, you negotiate better and you are never surprised on payday. This is educational information, not personalised financial advice, so confirm specifics with your employer and a tax professional for your own situation.",
  },
  {
    slug: "fire-retire-early-india",
    title: "FIRE in India: The Real Corpus You Need",
    excerpt: "How FIRE actually works in India: the 25x rule, why high inflation forces a bigger corpus, the savings rate it takes, and honest next steps.",
    category: "Personal Finance",
    readMinutes: 7,
    date: "Jul 15, 2026",
    keywords: ["FIRE India","financial independence retire early","25x rule","4 percent rule India","retirement corpus India","early retirement savings rate","inflation India retirement"],
    art: { variant: "chart", palette: "forest" },
    bodyMarkdown: "FIRE stands for Financial Independence, Retire Early. The idea is simple: save and invest aggressively for a decade or two, build a corpus big enough that its returns cover your living costs, then stop needing a paycheck. The number that gets thrown around most is \"25 times your annual expenses.\" That number comes from American research, and it needs adjusting before you apply it to a life lived in rupees.\n\nLet me walk through what the corpus actually looks like in India, where the popular math breaks, and what it takes to get there.\n\n## Where 25x comes from\n\nThe 25x figure is the flip side of the 4% rule. If you withdraw 4% of your corpus in year one and adjust that rupee amount for inflation each year after, a portfolio of stocks and bonds historically lasted around 30 years without running dry. Withdraw 4%, and your corpus needs to be 25 times your yearly spending, because 1 divided by 0.04 equals 25.\n\nSay you spend Rs 60,000 a month. That is Rs 7.2 lakh a year. Multiply by 25 and you get Rs 1.8 crore. On paper, once you have Rs 1.8 crore invested, you are financially independent.\n\nThe catch is that the 4% rule was built on US market history and US inflation, which has averaged around 2 to 3%. India is a different animal.\n\n## Why Indian inflation changes the math\n\nInflation in India has run higher and less predictably than in the US. Headline CPI has spent long stretches near 5 to 6%, and the lifestyle inflation that matters to an early retiree, such as private schooling, healthcare, and household help, often climbs faster than the official basket.\n\nTwo things follow from this.\n\nFirst, your expenses will roughly double every 12 to 14 years at 5 to 6% inflation. The Rs 7.2 lakh you spend today becomes Rs 14.4 lakh in your fifties and close to Rs 29 lakh in your sixties, in nominal terms. A corpus that felt huge at 40 can feel thin at 65 if you did not plan for this.\n\nSecond, a flat 4% withdrawal is aggressive for a retirement that might span 40 or 50 years instead of 30. Retire at 40 and you could be drawing down for half a century. Most Indian FIRE planners lean toward a 3 to 3.5% withdrawal rate for safety, which pushes the multiple up. At 3.3%, you need roughly 30x your annual expenses, not 25x.\n\nRun the same Rs 7.2 lakh a year through 30x and the target moves from Rs 1.8 crore to Rs 2.16 crore. The gap between 25x and 30x is the price of India's inflation and a longer runway.\n\n## The savings rate is the real lever\n\nPeople obsess over which mutual fund to pick. The variable that decides when you reach FIRE is your savings rate, meaning the share of your take-home pay you invest rather than spend.\n\nThe relationship is not linear, and it is brutal in a good way. If you save 10% of your income, you are funding a long career. Push your savings rate to 40 or 50%, and the timeline to financial independence collapses, because you are doing two things at once: building the corpus faster and lowering the annual expense number that corpus has to cover. A person who lives on 50% of their income needs a smaller pile than someone who lives on 80% of the same income, and they build that smaller pile in far less time.\n\nFor most salaried Indians chasing FIRE, a savings rate in the 40 to 60% range is what makes early retirement realistic within 12 to 20 years. Below 30%, \"early\" usually means a few years before 60, not retirement at 40.\n\n## Run your own numbers\n\nAverages are useless for your actual decision. Your rent, your city, whether you have kids, and whether you own a home change everything. Before you commit to a target, plug your real expenses, expected return, and inflation assumption into a [retirement corpus calculator](/calculators/retirement) and see what corpus your own life demands. Treat the output as a starting range, not a promise, and rerun it every couple of years as your spending changes.\n\nA sensible way to stress-test the result: assume 5 to 6% inflation, assume equity returns no higher than 10 to 11% over the long run, and use a withdrawal rate of 3 to 3.5% rather than 4%. If the plan still works under those conservative inputs, you have built in a margin of safety.\n\n## Honest steps, not hype\n\nFIRE content online is full of screenshots of huge portfolios and vague promises. Here is the unglamorous version that actually works.\n\nTrack every rupee for three months so you know your true annual expenses. This single number drives your entire target, and most people guess it wrong.\n\nKill high-interest debt first. No investment reliably beats the 15 to 40% you pay on credit cards and personal loans, so clearing that is a guaranteed return.\n\nBuild an emergency fund of six to twelve months of expenses in a liquid instrument before you lock money into long-term equity. Without it, one job loss or medical event forces you to sell investments at the worst time.\n\nAutomate investing into low-cost, diversified equity funds through SIPs, and let time and compounding do the heavy lifting. Do not try to time the market.\n\nSeparately, plan for healthcare. A big medical bill is the classic thing that wrecks an early-retirement corpus, so a solid health insurance policy is part of the plan, not an afterthought.\n\n## A realistic view\n\nFIRE in India is achievable, but the honest version needs a bigger corpus and a higher savings rate than the imported 4% math suggests. Aim closer to 30x your annual expenses, assume inflation will keep gnawing at your number, and treat the savings rate as the thing you actually control. Some people pursue a softer version, sometimes called Coast FIRE or Barista FIRE, where they build enough early that they only need light work later. That is a valid path too.\n\nNone of this is financial advice, and your situation deserves its own numbers and, ideally, a fee-only advisor. But the framework is sound: know your spending, respect inflation, save hard, and let a conservative withdrawal rate keep you safe for the long haul.",
  },
  ...morePosts,
];
