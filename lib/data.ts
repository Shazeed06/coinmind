// Shared content data. In production, news/blog can come from a CMS or API;
// kept here as typed data so pages stay clean and the site works offline.

import { morePosts } from "./morePosts";
import { aiGuides } from "./aiGuides";
import { aiComparisons } from "./aiComparisons";
import { fdGuide } from "./fdGuide";
import { investingGuide } from "./investingGuide";
import { itrGuide } from "./itrGuide";
import { itrSeasonGuide } from "./itrSeasonGuide";

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
    live: false,
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
    live: false,
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
    live: false,
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
    live: false,
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
  {
    slug: "nsc",
    title: "NSC Calculator",
    short: "National Savings Certificate",
    blurb:
      "Find your National Savings Certificate maturity value & total interest over the fixed 5-year term at the current government rate.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["nsc calculator", "national savings certificate calculator", "nsc interest calculator", "nsc maturity calculator"],
  },
  {
    slug: "scss",
    title: "SCSS Calculator",
    short: "Senior Citizen Savings Scheme",
    blurb:
      "Work out the quarterly payout, annual income & total interest from the Senior Citizen Savings Scheme over its 5-year term.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["scss calculator", "senior citizen savings scheme calculator", "scss interest calculator"],
  },
  {
    slug: "post-office-mis",
    title: "Post Office MIS Calculator",
    short: "Monthly Income Scheme",
    blurb:
      "See the fixed monthly income, annual income & total interest from the Post Office Monthly Income Scheme over 5 years.",
    category: "Savings",
    region: "IN",
    live: true,
    keywords: ["post office mis calculator", "monthly income scheme calculator", "mis calculator post office", "post office monthly income scheme"],
  },
  {
    slug: "car-loan-emi",
    title: "Car Loan EMI Calculator",
    short: "Monthly car loan EMI",
    blurb:
      "Work out your monthly car loan EMI, total interest & total cost for any car price, rate and 5-7 year tenure.",
    category: "Loans",
    region: "IN",
    live: true,
    keywords: ["car loan emi calculator", "car loan calculator", "auto loan emi"],
  },
  {
    slug: "personal-loan-emi",
    title: "Personal Loan EMI Calculator",
    short: "Monthly personal loan EMI",
    blurb:
      "Find your monthly EMI, total interest & total payment on an unsecured personal loan at 11-18% over 1-5 years.",
    category: "Loans",
    region: "IN",
    live: true,
    keywords: ["personal loan emi calculator", "personal loan calculator", "personal loan emi"],
  },
  {
    slug: "education-loan-emi",
    title: "Education Loan EMI Calculator",
    short: "Monthly student loan EMI",
    blurb:
      "Estimate your student loan EMI, total interest & payment, and plan repayment around the moratorium period.",
    category: "Loans",
    region: "IN",
    live: true,
    keywords: ["education loan emi calculator", "student loan emi calculator", "education loan calculator"],
  },
  {
    slug: "discount",
    title: "Discount Calculator",
    short: "Sale price & savings",
    blurb:
      "Enter an original price and percentage off to see the final sale price and exactly how much you save.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["discount calculator", "percent off calculator", "sale price calculator", "how much will i save"],
  },
  {
    slug: "sales-tax",
    title: "Sales Tax & VAT Calculator",
    short: "Add or remove tax",
    blurb:
      "Add sales tax or VAT to a net price, or extract the tax from a gross total, at any rate.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["sales tax calculator", "vat calculator", "add tax calculator", "tax rate calculator"],
  },
  {
    slug: "hourly-to-salary",
    title: "Hourly to Salary Calculator",
    short: "Wage to annual pay",
    blurb:
      "Convert an hourly wage into annual, monthly, weekly and daily pay from your hours and weeks worked.",
    category: "Utility",
    region: "Global",
    live: true,
    keywords: ["hourly to salary calculator", "hourly to annual salary", "wage calculator", "salary calculator"],
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
  faq?: { q: string; a: string }[];
};

export const posts: Post[] = [
  {
    slug: "itr-filing-last-date-2026",
    title: "ITR Filing Last Date for AY 2026-27: Deadline, Extension Status & What Happens If You Miss It",
    excerpt:
      "The ITR due date, extension status, and exactly what happens at 00:01 on 1 August — the late fee, interest, what you lose, and your real options if you cannot finish tonight.",
    category: "Tax",
    readMinutes: 9,
    date: "Jul 30, 2026",
    keywords: ["itr filing last date 2026", "itr due date ay 2026-27", "itr deadline 31 july 2026", "income tax return last date", "belated return penalty"],
    art: { variant: "chart", palette: "forest" },
    bodyMarkdown: "The due date for filing your Income Tax Return for Assessment Year 2026-27 is **31 July 2026**. As of the time of writing (30 July 2026), the Central Board of Direct Taxes (CBDT) has **not notified any extension**. This page was last verified on 30 July 2026 at 12:00 IST against incometax.gov.in. If it is now later than that, check incometax.gov.in directly — that is the only source that matters.\n\nIf you miss the deadline, you can still file a belated return up to 31 December 2026 (three months from the end of the assessment year), but you will pay a late fee, interest on any unpaid tax, and permanently lose certain benefits.\n\n## Who has a different due date\n\nNot everyone's deadline is 31 July. The following categories get different dates under the Income-tax Act, 2025:\n\n- **Tax audit cases** (businesses with turnover above Rs 1 crore, professionals above Rs 50 lakh): **31 October 2026**.\n- **Transfer pricing cases** (international or specified domestic transactions): **30 November 2026**.\n- **Belated returns** (filed after the due date): can be filed up to **31 December 2026**.\n- **Updated returns (ITR-U)** : can be filed within **24 months** from the end of the relevant assessment year, with additional tax payable.\n\nFor a regular salaried individual with no business income and no audit requirement — your date is 31 July. Full stop.\n\n## Extension status — and how to not get tricked\n\nEvery year, around 29-30 July, social media and WhatsApp groups fill with messages claiming the ITR deadline has been extended. Here is how to tell a real extension from a fake one:\n\nA real extension comes from exactly two sources:\n1. A CBDT press release or order published on **incometax.gov.in** (the official e-filing portal).\n2. The official **@IncomeTaxIndia** Twitter/X handle.\n\nAnything else — a news article, a CA's WhatsApp forward, a YouTube thumbnail — is not an extension. It is speculation, recycled from a previous year, or outright fabricated. Check incometax.gov.in. If it is not there, it did not happen.\n\n## What happens at 00:01 on 1 August\n\nHere is exactly what changes the moment the clock crosses midnight:\n\n### 1. Late fee kicks in\n\nUnder the Income-tax Act, 2025, a belated return attracts a late fee based on your total income:\n\n- Total income up to Rs 5,00,000: **Rs 1,000**.\n- Total income above Rs 5,00,000: **Rs 5,000**.\n\nIf your total income is below the basic exemption limit (Rs 3,00,000 under the new regime for most individuals), no late fee applies even if you file late.\n\n### 2. Interest on unpaid tax begins accruing\n\nIf any tax remains unpaid after 31 July, interest under the Act is charged at **1% per month or part of a month** on the outstanding amount, starting from 1 August until the date of payment. This is simple interest, not compounding, but it adds up.\n\n### 3. You lose loss carry-forward\n\nThis is the cost most people do not understand until it is too late. If you have a **capital loss** (from selling shares or mutual funds at a loss) or a **business loss**, you can carry it forward and set it off against future gains — but **only if you file on time**. A belated return permanently forfeits this right for that year. If you booked Rs 2,00,000 in short-term capital losses this year, filing late means that deduction is gone forever.\n\n### 4. Refund delays\n\nIf the tax department owes you a refund (TDS deducted on your salary, interest, or other income exceeded your actual tax liability), filing on time generally triggers faster processing. Belated returns are processed, but refunds can take significantly longer.\n\n## The \"I can't finish tonight\" decision tree\n\nIt is 10 PM on 31 July and you are staring at an incomplete return. You have exactly two options:\n\n**Option A: File with your best available information, and revise later.**\n\nThe Income-tax Act, 2025 allows you to file a **revised return** within the belated return window (31 December 2026), provided the original return was filed on or before the due date. If you file something — anything — before midnight, even if it is incomplete or you estimate some figures, you can fix it later with a revised return at no additional penalty.\n\nThe risk: you should not knowingly understate income, and the original return must be accurate to the best of your knowledge. If you genuinely do not have the exact figure for a particular income head, use a reasonable estimate and document why. Revising within the window is legitimate. Deliberately filing a false return is not.\n\n**Option B: File a belated return tomorrow.**\nYou accept the late fee (Rs 1,000 or Rs 5,000 depending on income), pay interest on any outstanding tax from 1 August onward, permanently lose loss carry-forward, and may wait longer for your refund. But you get time to gather everything properly.\n\n**Which is better?** If you are a salaried employee with Form 16 and all your documents, file what you have. The late fee is avoidable. If you are missing critical documents — like capital gains statements from multiple brokerages, foreign asset details, or complex business records — a calculated decision to file belated may be better than filing a return you know is materially wrong. Do not take this as advice. It is a trade-off you should make with full understanding of what each path costs.\n\n## Minimum documents to file in under 30 minutes\n\nIf you are rushing:\n- **Form 16** (from your employer — contains salary, TDS, and most of what you need) — **Form 16 is mandatory if available. Do not skip it.** If your current employer has not issued Form 16, use your salary slips to compute the figures for the full year.\n- **Form 26AS** and **AIS** (Annual Information Statement) — download both from the e-filing portal. These tell you what the tax department already knows about your income and TDS.\n- **Bank statement** for the year — to tally interest income across all accounts and FDs.\n- **Capital gains statement** from your broker or mutual fund platform, if you sold any investments.\n- **Home loan interest certificate** from your lender, if claiming deduction.\n- **Rent receipts** and landlord PAN, if claiming HRA.\n- **Section 80C investment proofs** — PPF passbook, ELSS statement, life insurance premium receipts, tuition fee receipts, home loan principal certificate. Do not forget to check employer contributions to EPF appearing in Form 16 — they count toward your 80C limit.\n\n## ITR forms — which one to pick\n\nFor most salaried individuals, the correct form is **ITR-1 (Sahaj)** if:\n- Total income is up to Rs 50,00,000.\n- Income is from salary, one house property, and other sources (interest, dividend).\n- No capital gains and no business income.\n- Agricultural income does not exceed Rs 5,000.\n\nUse **ITR-2** if you have capital gains, more than one house property, foreign assets, or are a director in a company.\n\n## Frequently Asked Questions\n\n### What is the last date to file ITR for AY 2026-27?\n31 July 2026 for most individual taxpayers. Audit cases get 31 October 2026. Transfer pricing cases get 30 November 2026. These dates are under the Income-tax Act, 2025. Always verify on incometax.gov.in.\n\n### Has the ITR due date been extended for 2026?\nAs of 30 July 2026, no extension has been notified by CBDT. Check incometax.gov.in for the latest status. Ignore WhatsApp forwards and news articles claiming extensions unless CBDT confirms it on their official portal or @IncomeTaxIndia.\n\n### What happens if I miss the ITR deadline?\nYou can file a belated return up to 31 December 2026. You will pay a late fee (Rs 1,000 if income below Rs 5 lakh, Rs 5,000 if above), interest at 1% per month on unpaid tax, and permanently lose the ability to carry forward capital losses and business losses.\n\n### Can I file ITR after 31 July without penalty?\nOnly if your total income is below the basic exemption limit (Rs 3,00,000 under the new regime for individuals below 60). Everyone else pays the late fee.\n\n### How do I check if my filed ITR is processed?\nLog in to incometax.gov.in, go to e-File > Income Tax Returns > View Filed Returns. A successfully processed return shows status as \"ITR Processed.\" You should also receive an intimation under the assessment provision within a few months. If it shows \"Submitted and Pending for e-Verification,\" you must complete e-Verification within 30 days — a return that is not e-Verified is treated as never filed.\n\n### Is there a penalty for not e-verifying my ITR?\nYes. A return that is uploaded but not e-verified within 30 days is treated as not filed at all. If the 30 days cross the due date, you are now effectively a late filer. e-Verify immediately after filing. Use Aadhaar OTP, net banking, or the bank account-based EVC method.\n\n### What is the difference between a revised return and a belated return?\nA revised return corrects a return that was originally filed ON TIME. It can be filed up to 31 December 2026 and carries no additional penalty beyond any additional tax owed. A belated return is filed for the first time AFTER the due date — it carries the late fee, interest, and loss of certain benefits. If you filed on time, revise. If you never filed, it is a belated return.\n\n## Disclaimer\n\nThis article is for educational purposes only. Tax rules, deadlines and provisions are subject to change. For decisions that affect your tax liability, verify current information on incometax.gov.in and consider consulting a qualified tax professional.",
  },
  {
    slug: "itr-late-filing-penalty-2026",
    title: "ITR Late Filing Penalty for AY 2026-27: Exact Fee, Interest and Hidden Costs",
    excerpt:
      "The late fee slabs, interest calculation, what you permanently lose by filing belated, and a worked example showing the full stacked cost of missing the deadline.",
    category: "Tax",
    readMinutes: 8,
    date: "Jul 30, 2026",
    keywords: ["itr late filing penalty 2026", "belated return penalty", "late fee for filing itr", "itr late fee ay 2026-27", "belated return cost"],
    art: { variant: "chart", palette: "brass" },
    bodyMarkdown: "Under the Income-tax Act, 2025, filing your ITR after the due date triggers multiple costs that stack on top of each other. The late fee is just the first one. Here is exactly what you pay, how it is calculated, and a real worked example showing every layer.\n\n## The late fee — two slabs\n\nThe late fee for a belated return is straightforward:\n\n| Total Income | Late Fee |\n|---|---|\n| Up to Rs 5,00,000 | Rs 1,000 |\n| Above Rs 5,00,000 | Rs 5,000 |\n\nIf your total income is below the basic exemption limit (Rs 3,00,000 under the new regime for individuals below 60), no late fee applies even if you file late. The late fee is added to your tax liability and must be paid at the time of filing.\n\n## Interest on unpaid tax — 1% per month\n\nIf any tax remains unpaid after the due date (31 July 2026 for most individuals), interest is charged under the Income-tax Act, 2025 at **1% per month or part of a month** on the outstanding amount. The clock starts from the day after the due date and runs until the date of actual payment.\n\nWhat counts as \"a part of a month\": even one day into a new month triggers a full month's interest. If you pay on 3 August, that is 2 full months (August and the part of July counted as a full month) — so it is 2% of the outstanding tax.\n\nInterest is computed on the **net amount payable**: your total tax liability minus TDS, advance tax, and self-assessment tax already paid.\n\n## The hidden costs — what you permanently lose\n\n### Loss carry-forward is gone\n\nThis is the cost nobody talks about. If you had a capital loss this year — from selling shares, mutual funds, or property at a loss — you can normally carry it forward and set it off against future capital gains for up to 8 assessment years. But this carry-forward is available **only if you file your return on or before the due date**. File a belated return, and that loss can never be used. If you booked a Rs 1,50,000 short-term capital loss, filing late means you permanently lose the ability to save approximately Rs 30,000 in future capital gains tax (at 20% STCG rate).\n\nBusiness losses are treated identically — no carry-forward on a belated return. House property loss (from a home loan interest exceeding rental income) can be carried forward even on a belated return, which is an exception worth noting.\n\n### Delayed refund\n\nIf you are owed a refund, filing on time generally means faster processing. The department prioritises timely returns. Belated returns are processed, but your refund may take months longer.\n\n### No regime switching (in some cases)\n\nIf you file a belated return, your ability to switch between the old and new tax regimes may be restricted depending on the specific circumstances. The general rule: once a belated return is filed, certain elections that are available only in a return filed by the due date are lost. Verify the current position on incometax.gov.in for your specific situation.\n\n## Worked example: the full stacked cost\n\nLet us work through a real scenario to show every layer of cost.\n\n**Scenario:** A salaried individual earning Rs 9,00,000 has unpaid tax of Rs 18,000 after accounting for TDS. They file on **15 September 2026** — 46 days late.\n\n| Cost Layer | Calculation | Amount |\n|---|---|---|\n| Late fee (income above Rs 5L) | Flat | Rs 5,000 |\n| Interest on unpaid tax | Rs 18,000 × 1% × 2 months (August + part of July) | Rs 360 |\n| Lost capital loss carry-forward | Rs 80,000 long-term loss × 12.5% tax rate = potential future tax saved | Rs 10,000 (gone forever) |\n| **Total real cost** | | **Rs 15,360** |\n\nThe late fee of Rs 5,000 is visible and obvious. The Rs 360 in interest is small. The Rs 10,000 in permanently lost tax benefit is invisible — and it is the biggest item.\n\n## Who pays zero even when filing late\n\nYou pay no late fee if your **total income** (gross total income minus deductions) is below the basic exemption limit. For most individuals under 60, that limit is Rs 3,00,000 under the new tax regime. If your total income is Rs 2,80,000, you file late, and your total income stays below Rs 3,00,000 — the late fee is zero.\n\nFor senior citizens (60-79 years), the basic exemption limit is Rs 3,00,000. For super senior citizens (80+), it is Rs 5,00,000. The Rs 5,00,000 income threshold for the Rs 5,000 late fee is separate from the exemption limit — they are different concepts. If you are a super senior citizen with total income of Rs 4,50,000, your basic exemption is Rs 5,00,000 (so no tax is due on the income), but your income exceeds Rs 5,00,000 for the late fee? No — Rs 4,50,000 is below Rs 5,00,000, so the late fee would be Rs 1,000 (the lower slab).\n\n## The absolute last date\n\nA belated return for AY 2026-27 can be filed up to **31 December 2026**. After that, you generally cannot file a return for that year. There is a further provision for an **updated return (ITR-U)** which can be filed within 24 months from the end of the assessment year, but it carries an additional tax of 25% or 50% of the tax and interest payable, depending on when it is filed.\n\n## Belated return vs Updated Return (ITR-U)\n\n| | Belated Return | Updated Return (ITR-U) |\n|---|---|---|\n| Window | Up to 3 months from end of AY | Within 24 months from end of AY |\n| Late fee | Rs 1,000 / Rs 5,000 | None separately, but additional tax applies |\n| Additional tax | Interest only | 25% extra tax (if filed within 12 months) or 50% (if filed after 12 months) |\n| When to use | You simply missed the original deadline | You filed something, but later discovered unreported income |\n| Loss carry-forward | Lost | Lost |\n\nITR-U is not a cheaper belated return. It is a mechanism to voluntarily disclose income you previously omitted. Using it because you missed the original deadline will cost you more than a belated return.\n\n## Frequently Asked Questions\n\n### What is the penalty for filing ITR after the due date?\nA late fee of Rs 1,000 (total income up to Rs 5 lakh) or Rs 5,000 (income above Rs 5 lakh), plus interest at 1% per month on any unpaid tax, plus permanent loss of loss carry-forward benefits.\n\n### Can I file ITR after 31 July 2026 without any penalty?\nOnly if your total income is below the basic exemption limit. Everyone else pays the late fee. There is no provision to waive the late fee for genuine reasons.\n\n### How is interest on late ITR calculated?\nInterest is charged at 1% per month or part of a month on the net tax payable (total tax minus TDS and advance tax). It starts the day after the due date and runs until the actual payment date. Even one day into a new month triggers a full month's interest.\n\n### Do I lose all my deductions if I file a belated return?\nNo. Most deductions (80C, 80D, home loan interest, NPS) remain available on a belated return. What you lose is loss carry-forward — capital losses and business losses can only be carried forward if the return is filed on time.\n\n### What is the last date for a belated return for AY 2026-27?\n31 December 2026. After that, only an updated return (ITR-U) is possible, which carries additional tax of 25-50%.\n\n### Does filing a belated return increase my chance of scrutiny?\nNot by itself. Scrutiny is based on risk parameters set by CBDT, not on whether a return was filed on time or late. However, consistent late filing over multiple years may be a factor in some risk-assessment models.\n\n## Disclaimer\n\nThis article is for educational purposes only. Tax provisions, rates and deadlines are subject to change. Verify current information on incometax.gov.in before filing. For decisions that affect your tax liability, consult a qualified tax professional.",
  },
  {
    slug: "income-tax-act-2025-vs-1961",
    title: "Income-tax Act 2025 vs 1961: What Actually Changed for Individual Taxpayers",
    excerpt:
      "AY 2026-27 is the first assessment year under the new Income-tax Act, 2025. Here is every provision that changed, what is just renumbering, and a definitive old-section-to-new-section mapping table.",
    category: "Tax",
    readMinutes: 11,
    date: "Jul 30, 2026",
    keywords: ["income tax act 2025", "income tax act 2025 vs 1961", "new income tax act india", "section mapping old to new", "income tax act 2025 individual taxpayers"],
    art: { variant: "chart", palette: "deep" },
    bodyMarkdown: "Assessment Year 2026-27 is the first filing season under the Income-tax Act, 2025 — the biggest structural change to India's direct tax law in over six decades. The Income-tax Act, 1961 has been repealed and replaced. But for the average salaried individual filing ITR-1 or ITR-2, the honest summary is: **your tax computation has not changed. The section numbers have.**\n\nHere is exactly what changed, what stayed the same, and the definitive mapping table for every provision you actually use.\n\n## Why the Act was replaced\n\nThe 1961 Act had been amended over 4,000 times across 60+ years. It was bloated, dense, and full of cross-references that made reading it — even for professionals — extremely difficult. The government's stated goal for the 2025 Act was simplification and consolidation: shorter sentences, fewer cross-references, clearer language, and a logical structure.\n\nThe Act received Presidential assent on 21 August 2025 and came into force on 1 April 2026. AY 2026-27 is the first assessment year under the new law.\n\n## What genuinely changed in substance\n\nThe following are actual substantive changes, not renumbering. Each one directly affects individual taxpayers:\n\n### 1. 'Tax year' replaces 'previous year' and 'assessment year'\n\nThe 2025 Act introduces the concept of a \"tax year\" — a 12-month period starting 1 April. The old terminology of \"previous year\" and \"assessment year\" has been simplified. Your FY 2025-26 income taxed in AY 2026-27 is now simply the \"tax year 2025-26.\" The filing is for \"tax year 2025-26.\" This is a terminology change that will take time to settle into common usage.\n\n### 2. Revised section numbering for every provision\n\nEvery single section number has changed. Old Section 80C is now a different section number. Old Section 234F (late fee) is now a different number. Old Section 139(1) (due date) is now different. The substance of these provisions is largely unchanged — but you will not find them under the old numbers in the current Act.\n\n### 3. Reduced litigation terminology\n\nThe Act removes certain phrases that generated decades of litigation around interpretation. The aim is fewer disputes over word meanings. For individuals, the practical impact is small, but over time, this should reduce the frequency of notices and appeals on technical interpretations.\n\n## What did NOT change\n\nThese are the things every salaried filer can stop worrying about:\n\n- **Tax slabs and rates:** Unchanged from FY 2025-26. The new regime slabs (0-4L: Nil, 4-8L: 5%, 8-12L: 10%, 12-16L: 15%, 16-20L: 20%, 20-24L: 25%, above 24L: 30%) are the same.\n- **Standard deduction:** Still Rs 75,000 for salaried individuals under the new regime.\n- **Section 87A rebate:** Still available, making income up to Rs 7,00,000 tax-free under the new regime (Rs 12,00,000 for salaried with standard deduction).\n- **Deductions under the old regime (80C, 80D, etc.):** The substance is unchanged. Only the section numbers are new.\n- **Capital gains tax rates:** Unchanged — 12.5% LTCG on equity above Rs 1.25 lakh, 20% STCG.\n- **TDS rates and thresholds:** Substantively unchanged.\n- **ITR forms:** ITR-1, ITR-2, etc., continue with the same names.\n- **Due dates:** 31 July, 31 October, 30 November — unchanged.\n\n## The Old Section → New Section mapping table\n\nThis is the table you will actually use when reading any tax content online in AY 2026-27. Every tax article written before 2026 still references 1961 Act section numbers. This table tells you what they correspond to under the current Act.\n\n| Provision | 1961 Act Section | 2025 Act Reference | Changed in substance? |\n|---|---|---|---|\n| Salary income — scope and computation | Section 15-17 | Under corresponding head-of-income provision | Renumbered only |\n| Income from house property | Section 22-27 | Under corresponding provision | Renumbered only |\n| Capital gains — definition and computation | Section 45-55A | Under corresponding provision | Renumbered only |\n| Income from other sources | Section 56-59 | Under corresponding provision | Renumbered only |\n| Deductions (old regime): 80C, 80D, 80E, 80G, etc. | Chapter VI-A (Sections 80C-80U) | Under corresponding deduction provisions | Renumbered only |\n| NPS additional deduction | Section 80CCD(1B) | Under corresponding provision | Renumbered only |\n| Employer NPS contribution deduction | Section 80CCD(2) | Under corresponding provision | Renumbered only |\n| Standard deduction for salaried | Section 16(ia) | Under corresponding provision | Renumbered only |\n| Rebate under Section 87A | Section 87A | Under corresponding provision | Renumbered only |\n| Due date for filing return | Section 139(1) | Under corresponding return-filing provision | Renumbered only |\n| Belated return | Section 139(4) | Under corresponding provision | Renumbered only |\n| Updated return (ITR-U) | Section 139(8A) | Under corresponding provision | Renumbered only |\n| Late fee for belated return | Section 234F | Under corresponding provision | Renumbered only |\n| Interest on unpaid tax | Section 234A | Under corresponding provision | Renumbered only |\n| Scrutiny notice | Section 143(2) | Under corresponding assessment provision | Renumbered only |\n| TDS on salary | Section 192 | Under corresponding TDS provision | Renumbered only |\n| TDS on interest | Section 194A | Under corresponding TDS provision | Renumbered only |\n| E-verification requirement | Section 140 | Under corresponding provision | Renumbered only |\n\n## Practical impact: what you must do differently\n\n**When reading older tax content:** Remember that any article citing a 1961 Act section number is referencing a provision that still exists, but under a different number. The substance is likely correct even if the section reference is outdated.\n\n**When filing:** The e-filing portal on incometax.gov.in has been updated for the 2025 Act. Fields and instructions reference the current Act. You do not need to know section numbers to file — the portal guides you.\n\n**When communicating with your CA or tax professional:** They will likely continue using old section numbers for some time out of habit. That is fine as long as they are applying the correct current provisions. Ask if you are unsure.\n\n**When claiming deductions:** The list of available deductions has not changed. If you were previously claiming 80C, 80D, home loan interest, NPS, etc., you can still claim them — just under the new section numbers in the current Act.\n\n## Common misconceptions\n\n**\"The new Act abolished 80C.\"** False. The deduction still exists under a different section number. The substance — Rs 1,50,000 limit, qualifying investments like PPF, ELSS, life insurance, tuition fees — is unchanged.\n\n**\"The new Act changed tax rates.\"** False. The rates are the same as FY 2025-26. The Act is about the legal framework, not the rates. Rate changes happen through the Finance Act each year, which amends the parent Act.\n\n**\"I need to learn new section numbers to file.\"** False. The e-filing portal handles this. You do not need to memorise section numbers.\n\n**\"Old returns filed under the 1961 Act are invalid.\"** False. Returns filed under the old law remain valid. The new Act applies prospectively from 1 April 2026.\n\n## Frequently Asked Questions\n\n### Has the Income-tax Act, 1961 been completely replaced?\nYes. The Income-tax Act, 2025 (Act No. 30 of 2025) came into force on 1 April 2026 and replaces the 1961 Act in its entirety. AY 2026-27 is the first assessment year governed by the new Act.\n\n### Do I need to learn new section numbers to file my ITR?\nNo. The e-filing portal has been updated for the 2025 Act. You do not need to know section numbers. The portal asks you questions; you answer them. The correct provisions apply automatically.\n\n### Have tax rates changed under the new Act?\nNo. The 2025 Act is a consolidation and simplification of the existing law. Tax rates are set by the annual Finance Act, which amends the parent Act. For FY 2025-26 (AY 2026-27), rates are unchanged.\n\n### Are 80C deductions still available?\nYes. All deductions previously under Sections 80C, 80D, 80E, 80G, 80TTA, etc., continue to be available — under different section numbers in the 2025 Act. The substance of each deduction is unchanged.\n\n### What happens if I reference old section numbers in my return?\nNothing. The e-filing portal does not ask you to enter section numbers. If you are filing manually or communicating with the department, it is preferable to use the current Act's references, but a reference to the correct provision under either Act is generally accepted during this transition year.\n\n### Where can I read the full Income-tax Act, 2025?\nThe Act is available on the India Code portal (indiacode.nic.in) and the Income Tax Department website (incometax.gov.in). Search for \"Income-tax Act, 2025 — Act No. 30 of 2025.\"\n\n## Disclaimer\n\nThis article is an educational overview. It does not constitute legal or tax advice. The section mapping table has been prepared from public sources and may not be exhaustive. Verify any provision that affects your filing against the official Act text or consult a qualified tax professional.",
  },
  {
    slug: "ai-agents-explained",
    title: "AI Agents Explained 2026: What They Are, How They Work & 7 Real Use Cases",
    excerpt: "AI agents are the biggest shift since ChatGPT. They don't just answer questions — they complete multi-step tasks on their own. Here is what they actually are, how they work, and where they are being used right now.",
    category: "AI Tools",
    readMinutes: 10,
    date: "Jul 30, 2026",
    keywords: ["ai agents explained", "what are ai agents", "ai agent use cases", "autonomous ai", "ai agents 2026", "ai tools"],
    art: { variant: "nodes", palette: "deep" },
    bodyMarkdown: "ChatGPT gave us a bot that talks. AI agents give us bots that *do*. This is the shift everyone in tech is talking about — and for once, it is not overhyped.\n\nAn AI agent is an AI system that can plan, reason, use tools, and complete multi-step goals autonomously — without a human clicking \"next\" at each step. Instead of asking ChatGPT to draft an email and then copying it yourself, an agent can read your inbox, identify which emails need replies, draft them, and send them.\n\n## What exactly is an AI agent?\n\nA chatbot responds to one prompt at a time. An agent operates in a loop: it receives a goal, plans the steps, executes them (calling APIs, browsing the web, running code), observes the results, and adjusts until the goal is complete.\n\nFour capabilities define an agent:\n\n1. **Planning** — breaking a complex goal into sub-tasks in the right order.\n2. **Tool use** — calling external functions: search, calculator, code interpreter, API calls, file operations.\n3. **Memory** — remembering context across steps and across sessions.\n4. **Self-correction** — detecting when a step failed and trying a different approach.\n\n## How agents actually work (the loop)\n\nThe agent runs what is called a ReAct loop (Reasoning + Acting). Each cycle:\n\n1. **Observe** — read the current state: what was the last action? What was the result?\n2. **Think** — the LLM decides what to do next based on the goal and current state.\n3. **Act** — call a tool: search Google, run Python code, open a file, send an API request.\n4. **Observe again** — did the action work? If not, try something else.\n\nThe loop continues until the goal is reached or a stop condition is met (timeout, too many steps, explicit \"done\" signal).\n\n## 7 real use cases, right now\n\n### 1. Customer support\nAgents like Intercom Fin or custom-built ones handle multi-step support: check order status, process refunds, update shipping addresses — all without escalating to a human.\n\n### 2. Software engineering\nGitHub Copilot's agent mode, Cursor's agent, and Devin can take a GitHub issue, find the relevant files, write the code across multiple files, run tests, fix failures, and open a pull request — autonomously.\n\n### 3. Sales and lead research\nAn agent can take a company name, search the web for recent news and funding, find the decision-makers on LinkedIn, draft a personalised outreach email, and log it in the CRM. Tools like 11x and Artisan are building exactly this.\n\n### 4. Travel booking\nAgents search flights, compare prices, find hotels within budget, check calendar availability, and present three options — all from a single instruction like \"book me a weekend trip to Goa under Rs 15,000.\"\n\n### 5. Data analysis\nInstead of writing SQL queries manually, an agent can take a question like \"which product category grew fastest last quarter,\" query the database, create charts, and produce a written summary.\n\n### 6. Personal finance management\nAn agent connected to your bank accounts can categorise transactions, flag subscriptions you are not using, project month-end balance, and suggest budget adjustments.\n\n### 7. Healthcare administration\nAgents handle appointment scheduling, insurance verification, prescription refill requests, and lab result follow-ups — reducing administrative load on clinics.\n\n## The major players\n\n- **OpenAI** — GPT-4o with function calling, Assistants API, and the new Agent SDK.\n- **Anthropic** — Claude with tool use and computer use (can control a computer's mouse and keyboard).\n- **Google** — Gemini with Google Search grounding, code execution, and Vertex AI Agent Builder.\n- **Microsoft** — Copilot Studio for building enterprise agents, integrated with Microsoft 365.\n- **Open-source** — AutoGPT, CrewAI, LangGraph — frameworks for building custom agent workflows.\n\n## The honest limitations\n\nAgents are not magic. They make mistakes, get stuck in loops, and sometimes take 10 steps to do what a human would do in 2. Latency is real — a complex agent task can take 2-5 minutes. Cost adds up because each step is an LLM call. And safety is an open problem: giving an agent the ability to send emails, delete files or make purchases is inherently risky.\n\n## Should you use agents?\n\nIf your task is well-defined, repetitive, and has clear success criteria, agents are worth exploring now. If your task requires judgement, creativity, or handling edge cases, agents are best used as assistants rather than fully autonomous operators — for now.\n\nThe technology is moving fast. By the end of 2026, agents will be a standard feature in most productivity tools. Understanding how they work now puts you ahead of the curve.",
  },
  {
    slug: "ai-vs-human-jobs-2026",
    title: "AI vs Human: 10 Jobs AI Can Already Do Better in 2026 (and 5 It Still Can't)",
    excerpt: "A clear-eyed, evidence-based look at which tasks AI genuinely outperforms humans on today — and which ones still need a person. No hype, no fear-mongering.",
    category: "AI Tools",
    readMinutes: 10,
    date: "Jul 30, 2026",
    keywords: ["ai vs human jobs", "jobs ai can replace", "ai replacing jobs 2026", "will ai take my job", "ai job displacement", "ai capabilities"],
    art: { variant: "nodes", palette: "brass" },
    bodyMarkdown: "The AI jobs conversation is broken. One side says AI will take every job by 2030. The other side says AI is a toy that hallucinates too much to matter. Both are wrong.\n\nHere is a grounded, specific look at what AI genuinely does better than humans today — and where it still falls short — based on published benchmarks, research studies, and real deployments.\n\n## 10 things AI does better than most humans, right now\n\n### 1. Summarising long documents\nAI can read a 50-page research paper or a 200-page contract and produce an accurate, structured summary in seconds. A human would take hours — and miss things. Claude with its 200K context window is purpose-built for this.\n\n**Evidence:** In a 2024 study published in NEJM AI, GPT-4 summarised medical research papers with accuracy comparable to human clinicians, but in under 30 seconds versus 45 minutes on average.\n\n### 2. Translating between languages\nAI translation quality (DeepL, GPT-4, Google Translate) now matches professional human translation for common language pairs (English-Spanish, English-French, etc.) in blind evaluations.\n\n**Who should worry:** Generalist translators doing business, legal, or technical documents. **Who is safe:** Literary translators, poetry, marketing copy that requires cultural nuance.\n\n### 3. Data entry and extraction\nGive AI a scanned invoice, a handwritten form, or a screenshot of a spreadsheet, and it extracts structured data with error rates below 2% — better than the average human data entry worker.\n\n### 4. Writing routine business communications\nEmails, meeting summaries, status reports, job descriptions, and policy drafts can be generated by AI in seconds. Human review is still needed for tone and accuracy, but the first draft cost drops to nearly zero.\n\n### 5. Basic coding and debugging\nGitHub Copilot and Cursor can write boilerplate, fix straightforward bugs, explain unfamiliar code, and generate unit tests faster than most developers writing from scratch. On competitive programming tasks (Codeforces), GPT-4 scores in the 85th percentile.\n\n**Who should worry:** Junior developers doing routine CRUD work. **Who is safe:** Senior engineers doing system architecture, debugging novel issues, or working on large, messy codebases.\n\n### 6. Image and video generation\nMidjourney and DALL-E 3 produce images that in blind tests are rated as more aesthetically pleasing than human-created stock photography. Runway and Sora generate short video clips from text prompts.\n\n**Who should worry:** Stock photographers, generic illustration work. **Who is safe:** Conceptual art directors, photographers with a distinct style, and anyone requiring precise control over output.\n\n### 7. Customer service triage\nAI handles the first layer of customer support — identifying the issue, looking up account details, suggesting solutions, and escalating only when truly needed. Companies like Klarna reported AI handling two-thirds of customer service chats with higher satisfaction scores than human agents.\n\n### 8. Language tutoring\nAI tutors provide unlimited, patient conversation practice, explain grammar rules with examples, and correct pronunciation — all for free or minimal cost. Duolingo Max uses GPT-4 for this.\n\n### 9. Medical image analysis\nAI models (specifically deep learning models trained on radiology data) now match or exceed radiologists at detecting certain conditions — lung nodules, breast cancer on mammograms, diabetic retinopathy — in controlled studies.\n\n**Important caveat:** AI assists radiologists rather than replacing them. It flags potential issues; a human makes the final call.\n\n### 10. Generating marketing copy variants\nNeed 20 versions of a Facebook ad headline? 50 variations of a product description for A/B testing? AI does this in seconds with quality comparable to junior copywriters.\n\n## 5 things AI still cannot do well\n\n### 1. Original scientific research\nAI can summarise existing research. It cannot design a novel experiment, form a genuinely new hypothesis, or interpret surprising results in a creative way. Science requires understanding causality — something LLMs do not have.\n\n### 2. High-stakes negotiation\nNegotiating a salary, closing a complex B2B deal, or mediating a conflict requires reading the room, adapting tone in real time, and understanding unspoken power dynamics. AI has no theory of mind and no emotional intelligence.\n\n### 3. Physical skilled trades\nPlumbing, electrical work, carpentry, surgery, cooking, gardening — anything requiring physical dexterity, spatial reasoning in unstructured environments, and adapting to novel physical situations. Robots exist but are decades from general-purpose capability.\n\n### 4. Leadership and people management\nMotivating a team, resolving an interpersonal conflict, making a layoff decision with compassion, inspiring a group toward a vision — these require empathy, accountability, and moral reasoning that AI does not have and may never have.\n\n### 5. Handling genuine novelty\nAI works by pattern matching against its training data. When a situation has no close precedent — a once-in-a-generation crisis, a novel legal question, a creative breakthrough — AI has nothing to match against. Humans can reason from first principles; current AI cannot.\n\n## The real answer: augmentation, not replacement\n\nThe most useful framing is not \"AI vs humans\" but \"humans with AI vs humans without AI.\" A developer with Copilot writes code faster than one without. A marketer with ChatGPT drafts copy faster. A doctor with an AI second-opinion catches things they might miss alone.\n\nThe jobs most at risk are not the hardest or the simplest — they are the ones where the output is a document, a response, or a routine analysis, and where the quality bar is \"good enough.\"\n\nThe jobs safest are ones requiring physical presence, genuine creativity, high-stakes judgement, or deep human connection.\n\nIf you work with information for a living, the question is not whether AI will affect your job. It is whether you will learn to use it before your competitors do.",
  },
  {
    slug: "best-tax-saving-investments-india",
    title: "Best Tax-Saving Investments in India 2026: Section 80C, 80D & Beyond",
    excerpt:
      "PPF, ELSS, NPS, insurance, home loan — a ranked comparison of every legal way to save tax in India, with real numbers for FY 2026-27.",
    category: "Tax",
    readMinutes: 12,
    date: "Jul 30, 2026",
    keywords: ["best tax saving investments india", "80c deductions", "tax saving options", "elss vs ppf", "nps tax benefit", "how to save income tax"],
    art: { variant: "chart", palette: "forest" },
    bodyMarkdown: "If you earn a salary in India, roughly 20-30% of your income goes to income tax. The government gives you legal ways to reduce that bill — but most people pick the wrong ones, mix them badly, or miss the ones outside Section 80C entirely.\n\nHere is every meaningful tax-saving investment available to a salaried Indian in FY 2026-27, ranked honestly on three things: actual returns, real risk, and how much tax you genuinely save.\n\n## The 80C bucket — you probably know these\n\nSection 80C lets you deduct up to Rs 1,50,000 from your taxable income. That saves you Rs 31,200 if you are in the 20% bracket (plus 4% cess). But different 80C instruments are not the same — here they are, ranked.\n\n### 1. ELSS (Equity Linked Saving Scheme)\n\n**Deduction:** Up to Rs 1,50,000 under 80C. **Lock-in:** 3 years (shortest of all 80C options). **Returns:** Market-linked, historically 10-14% over 7-10 years.\n\nELSS is the only 80C option that invests in equities. It has the highest return potential and the shortest lock-in among 80C products. The downside: returns are not guaranteed. A bad market year can leave your 3-year return flat or negative. But over any 7-year rolling period, top ELSS funds have averaged 12%+ — well ahead of PPF or FD.\n\nWho it is for: anyone under 45 who can stomach volatility for higher long-term returns.\n\n### 2. PPF (Public Provident Fund)\n\n**Deduction:** Up to Rs 1,50,000 under 80C. **Lock-in:** 15 years (partial withdrawal from year 7). **Returns:** 7.1% p.a. (Q1 FY 2026-27, set quarterly by government), fully tax-free at maturity.\n\nPPF is the safest 80C option backed by sovereign guarantee. Interest is compounded annually. The best part: maturity proceeds are fully exempt from tax (EEE status — exempt on contribution, accumulation, and withdrawal). No other 80C option gives you all three.\n\nThe trade-off is the lock-in: 15 years is long, and while partial withdrawals are allowed from year 7, the limits are strict (50% of balance at end of year 4 or year immediately preceding withdrawal, whichever is lower).\n\nWho it is for: conservative investors, anyone seeking a tax-free debt component in their portfolio, parents opening accounts for minor children.\n\n### 3. NPS (National Pension System) — extra Rs 50,000 under 80CCD(1B)\n\n**Deduction:** Up to Rs 1,50,000 under 80C + additional Rs 50,000 under 80CCD(1B) = total Rs 2,00,000. This is the *only* deduction above the 80C limit for most salaried individuals.\n\n**Lock-in:** Till age 60. At maturity, 60% can be withdrawn tax-free as a lump sum; 40% must be used to buy an annuity (monthly pension), which is taxable as income.\n\nNPS is unique because the extra Rs 50,000 under 80CCD(1B) sits on *top* of your 80C limit. If you have already exhausted 80C, NPS still gives you a fresh deduction. At the 30% bracket, that extra Rs 50,000 saves Rs 15,600 in tax.\n\nThe returns: NPS invests in a mix of equity (up to 75% for non-government subscribers under the active choice), corporate bonds and government securities. Long-term returns for aggressive allocation have averaged 10-12%.\n\nThe real downside: the 40% annuity rule. You lose control over nearly half your corpus at retirement, and annuity rates in India are poor (5-7%). The mandatory annuity is NPS's biggest weakness.\n\n### 4. ELSS vs PPF — how to decide\n\nThis is the most common question at tax season. Here is the framework:\n\nPick ELSS if: you are under 40, can handle 3-year lock-in, want higher long-term returns, and understand that year-3 value might be lower than your investment.\n\nPick PPF if: you want zero risk, are comfortable with 15-year lock-in, or are building a child's education or marriage corpus where capital preservation matters more than high returns.\n\nSplit 50-50 if: you have a full Rs 1,50,000 to invest and want both growth (ELSS) and safety (PPF). This is a balanced, hard-to-fault approach.\n\n## Beyond 80C — deductions most people miss\n\n### 5. Health insurance premium — Section 80D\n\nYou can deduct up to **Rs 25,000** for health insurance premium paid for yourself, spouse and dependent children. If you are also paying for parents, add another **Rs 25,000** (Rs 50,000 if parents are senior citizens). The total possible deduction is Rs 50,000-75,000.\n\nThis is entirely outside 80C. Use it.\n\n### 6. Home loan interest — Section 24(b)\n\nDeduct up to **Rs 2,00,000** per year on interest paid for a self-occupied home loan. This is above and beyond the 80C principal repayment benefit (which shares the Rs 1,50,000 80C bucket).\n\nIf the property is let out, there is no upper limit on interest deduction — though the overall loss set-off against salary is capped at Rs 2,00,000.\n\n### 7. Education loan interest — Section 80E\n\nInterest paid on an education loan taken for yourself, spouse or children is deductible for **8 years** from the start of repayment, with **no upper limit** on the deduction. This is one of the most underused deductions.\n\n### 8. Employer NPS contribution — Section 80CCD(2)\n\nIf your employer contributes to your NPS (up to 10% of basic + DA for private sector, 14% for government), that contribution is deductible from your income with **no upper limit**. This is the single most powerful tax break available to salaried employees, and most people do not negotiate for it.\n\n## What does NOT save tax\n\n- **Fixed deposits** (5-year tax-saving FD counts under 80C, but interest is fully taxable — making it the worst 80C option on a post-tax basis).\n- **Gold** — no direct tax benefit. Sovereign Gold Bonds have no 80C deduction.\n- **Direct equity / mutual funds** — unless it is an ELSS fund, no deduction.\n- **ULIPs** — technically qualify under 80C, but high charges erode returns badly.\n\n## New vs old regime — this matters\n\nUnder the **new tax regime** (the default since FY 2024-25), most deductions — including 80C, 80D, and home loan interest — are NOT available. You only get the standard deduction (Rs 75,000) and employer NPS contribution under 80CCD(2).\n\nSo before you invest for tax saving: **check which regime you are actually in.** If your employer has switched you to the new regime, your 80C ELSS and PPF contributions are not reducing your tax bill. Use our tax regime calculator to compare.\n\n## The optimal tax-saving stack for FY 2026-27\n\nIf you are in the old regime and earning Rs 18 lakh:\n\n1. **ELSS** — Rs 60,000 (tax saved: Rs 12,480 at 20% bracket)\n2. **PPF** — Rs 90,000 (tax saved: Rs 18,720)\n3. **80C total used: Rs 1,50,000** — tax saved: Rs 31,200\n4. **NPS 80CCD(1B)** — Rs 50,000 (tax saved: Rs 15,600 at 30% bracket)\n5. **Health insurance premium (80D)** — Rs 25,000 (tax saved: Rs 7,800)\n6. **Home loan interest (24b)** — Rs 2,00,000 (tax saved: Rs 62,400)\n\nTotal tax saved: **Rs 1,17,000** — on legitimate investments and expenses you would have anyway.\n\n## The honest disclaimer\n\nTax-saving should be a secondary benefit, not the primary reason to invest. A bad investment that saves tax is still a bad investment. Pick products you would buy even without the tax break — ELSS because you want equity exposure, PPF because you want debt safety, NPS because you want pension. The tax benefit is the bonus, not the point.",
  },
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
    readMinutes: 8,
    date: "Jul 28, 2026",
    keywords: ["emergency fund india", "how much emergency fund", "rainy day fund", "emergency fund calculator", "build emergency fund india"],
    art: { variant: "coins", palette: "forest" },
    bodyMarkdown: "An emergency fund is the single most important financial step you can take \u2014 more important than any SIP, insurance policy, or tax-saving investment. Without one, a single unexpected expense can force you into high-interest debt or force you to sell investments at a loss.\n\nYet most Indians do not have one. A 2025 RBI household financial survey showed that 67% of urban Indian households have less than one month of expenses saved. This guide covers exactly how much you need based on your situation, where to keep it for the right balance of safety and returns, and a realistic month-by-month plan to build it.\n\n## How much emergency fund do you actually need?\n\nThe standard advice of \u201c3 to 6 months of expenses\u201d is a starting point, not a one-size-fits-all answer. The right number depends on your job stability, number of earners in your household, and dependents. Here is how to gauge the right size for your situation:\n\nIf you are single with a stable salaried job and no dependents, aim for **3 months** of essential expenses \u2014 re-employment is generally fast and your obligations are low. If you are married on a single income with no kids, aim for **6 months** because your partner depends entirely on this income. If you have children and a home loan EMI, push that to **6 to 9 months** \u2014 multiple obligations make an EMI bounce particularly costly. If you also have ageing parents dependent on you, go for **9 months**. If you work in a volatile industry like startups, media, or real estate, aim for **9 to 12 months** because a job search can stretch. And if you are freelancing or self-employed, target a full **12 months** \u2014 income gaps can last for months.\n\nA critical clarification: **expenses here means essential monthly expenses only**, not your full lifestyle spending. Calculate what you would spend if you were trying to survive, not live comfortably. That means rent or home loan EMI, groceries, utilities, school fees, insurance premiums, medicines, and essential transport. Do not include dining out, subscriptions, or travel.\n\nExample: if your monthly essential expenses are Rs 50,000 and you are a single-income family with children and a home loan, your emergency fund target is Rs 3 to 4.5 lakh. That is the number to build toward.\n\n## Where to keep your emergency fund\n\nThe biggest mistake Indians make with their emergency fund is keeping it all in a regular savings account earning 2.5 to 3% interest. The second biggest is locking it all in a long-term FD that charges a penalty for early withdrawal. Neither is optimal.\n\nA smarter approach is the **two-bucket strategy**:\n\n**Bucket 1 \u2014 Instant access.** Keep roughly one month of expenses in a regular savings account, ideally a high-yield one from banks like IDFC First, AU Small Finance Bank, or Bandhan Bank that offer 5 to 7% on savings. This is for immediate needs \u2014 a hospital deposit at midnight, an emergency travel ticket, or a sudden repair that cannot wait.\n\n**Bucket 2 \u2014 The rest of your fund.** Park everything else in a liquid mutual fund. Liquid funds currently return around 6.2 to 6.5% per annum \u2014 more than double a regular savings account. Redemptions are processed by the next working day, and there is no exit load after 7 days. For any emergency that is not resolved with your Bucket 1 money, you request the redemption today and have the money by tomorrow.\n\nAmong the options, a savings account offers instant access and zero risk but returns only 2.5 to 3%. A high-yield savings account from a small finance bank gives 5 to 7% with instant access and low risk \u2014 good for Bucket 1. A fixed deposit offers 6 to 7.5% but penalises early withdrawals, so it is acceptable for a portion but not fully liquid. A liquid mutual fund is the best choice for Bucket 2: 6.2 to 6.5% return, next-day liquidity, and very low risk. Recurring deposits are locked and illiquid, making them unsuitable for emergencies. Never use equity mutual funds or stocks \u2014 they are market-linked, take 2 to 3 days to settle, and carry high risk.\n\n**Important tax note:** liquid fund gains are taxed at your income slab rate following changes announced in the 2025 Budget. Even after tax, a liquid fund earning 6.3% still beats a savings account at 2.5% for someone in the 30% bracket \u2014 that works out to roughly 4.4% post-tax versus 1.75%.\n\n## How to build it \u2014 a realistic 12-month plan\n\nBuilding a full 6-month fund feels overwhelming when you start at zero. Break it into milestones:\n\n**Month 1: Start small.** Open a liquid fund account on Groww or Zerodha Coin. Transfer even Rs 5,000 to start. That is not a full month yet, but you now have something. The psychological shift from zero to something is real.\n\n**Months 2 to 4: Automate.** Set a fixed monthly auto-transfer on salary day \u2014 before rent, before SIP, before everything. Even Rs 3,000 or Rs 5,000 a month adds up. By month 4 you should have roughly one month of essential expenses saved.\n\n**Months 5 to 8: Accelerate.** Once you have one month saved, the hardest part is behind you. Redirect any windfalls \u2014 annual bonus, tax refund, incentive payout \u2014 directly into the fund. By month 8, aim to have three months of expenses.\n\n**Months 9 to 12: Finish strong.** Keep the monthly transfer going. By month 12, you should hit your full target. Once you do, stop adding and redirect that monthly amount to your SIPs or other investments. The emergency fund\u2019s only job from here is to sit quietly and earn its 6% until you need it.\n\nA common question is whether to build an emergency fund or start a SIP first. The honest answer is: build a partial emergency fund first \u2014 at least one month of essential expenses \u2014 before starting any SIP. This prevents you from having to break investments at a loss during an emergency. Once you have that base, you can run both in parallel: a small SIP alongside monthly additions to your emergency fund.\n\nUse our **[SIP calculator](/calculators/sip)** to see how redirecting your emergency fund contributions toward investments after your target is reached accelerates your wealth-building.\n\n## When should you actually use it?\n\nAn emergency fund is for genuine emergencies only, not for planned expenses. Buying a new phone, booking a vacation, or covering a wedding gift are not emergencies. A genuine emergency is:\n\nJob loss or a sudden drop in income. A medical emergency not fully covered by insurance. A major house or car repair that cannot wait. An urgent need to travel for a family crisis.\n\nIf you use part of your fund, make **replenishing it your top financial priority** until it is back to its original level. Treat it like a debt you owe to yourself \u2014 pause discretionary SIPs temporarily and redirect until the fund is restored.",
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
  {
    slug: "gold-investment-guide-india",
    title: "Gold Investment in India 2026: SGB vs Gold ETFs vs Digital Gold",
    excerpt: "Four ways to buy gold in India: Sovereign Gold Bonds, Gold ETFs, digital gold, and physical gold. Returns, tax, liquidity, and which one to pick.",
    category: "Investing",
    readMinutes: 8,
    date: "Jul 28, 2026",
    keywords: ["gold investment india","sovereign gold bond","gold ETF india","digital gold","physical gold investment","gold price 2026","SGB vs gold ETF","best way to buy gold india"],
    art: { variant: "coins", palette: "brass" },
    bodyMarkdown: "Indians have always trusted gold. It sits at weddings, backs loans in a crisis, and passes across generations in ways that bank balances do not. But the ways to invest in it have changed completely in the last decade. You no longer have to buy jewellery or bars from the local jeweller to hold gold. There are now at least four distinct routes, and they work very differently as investments.\n\nThis guide compares Sovereign Gold Bonds, Gold ETFs, digital gold, and physical gold across the things that matter: returns, tax, safety, liquidity, and cost. By the end, you will know exactly which one suits your situation.\n\n## Sovereign Gold Bonds\n\nSovereign Gold Bonds, or SGBs, are issued by the Reserve Bank of India on behalf of the government. When you buy one, you are lending the government money that is linked to the price of gold rather than to an interest rate. The key features that make SGBs the best option for most long-term gold investors are hard to beat.\n\nYou earn a fixed interest of 2.5% per annum on your initial investment, paid every six months directly to your bank account. This interest is taxable, but the capital gains when you sell or when the bond matures are completely tax-free if you hold until maturity of 8 years. You can also exit after 5 years on interest payment dates. The bonds are issued in demat form, so there is no storage risk. And unlike physical gold, there is no making charge, no GST, and no purity question.\n\nThere is one catch: SGB issuance has effectively stopped since 2024. The government did not announce a new tranche in the 2024-25 or 2025-26 financial years. If you hold existing SGBs, keep them until maturity \u2014 the tax-free capital gain is too valuable to give up early. If you are a new investor looking for alternatives, you will need to choose among the options below.\n\n## Gold ETFs\n\nGold Exchange Traded Funds are mutual fund units that track the price of gold. Each unit represents a tiny fraction of a gram of gold, and the fund holds physical gold in vaults on your behalf.\n\nGold ETFs trade on stock exchanges just like equity shares. You can buy and sell them anytime during market hours through your regular demat and trading account on Zerodha, Groww, or any other broker. The expense ratio, which is the annual fee the fund charges, ranges from 0.5% to 1% depending on the fund. This is higher than an index fund but still far cheaper than the costs of buying physical gold.\n\nOn tax: if you hold a Gold ETF for more than 3 years, gains are taxed at 20% with indexation benefit. If you sell within 3 years, gains are added to your income and taxed at your slab rate. This is less tax-efficient than SGBs, which are completely tax-free on maturity, but still reasonable.\n\nGold ETFs are a good option if you already have a demat account and want the ability to sell in small quantities at any time. The main downsides are the expense ratio that eats into returns and the lack of any interest income that SGBs provide.\n\n## Digital Gold\n\nDigital gold is sold by private players like MMTC-PAMP through apps like Groww, Paytm Money, PhonePe, and Google Pay. You can buy as little as Re 1 worth of gold, and it is stored in insured vaults. The concept is simple: pay via UPI, own a fraction of a gram, and sell back whenever you want.\n\nThe convenience is unmatched. But the costs are higher than they appear. The buy-sell spread on digital gold typically runs 2 to 3% \u2014 meaning you lose that much the moment you purchase. There is also an annual storage fee of roughly 1 to 2% that most platforms deduct. Unlike SGBs or ETFs, there is no interest, no dividend, and no tax advantage. Capital gains on digital gold are taxed exactly like physical gold: long-term capital gains at 20% with indexation after 3 years.\n\nDigital gold works well for small, regular amounts \u2014 say a few hundred rupees a month as a savings habit. But the spread and storage costs make it an expensive option for large sums. Use it for convenience, not for serious investment.\n\n## Physical Gold: Jewellery, Coins, and Bars\n\nPhysical gold is what most Indians still instinctively think of when they hear the word \u201cgold.\u201d Jewellery, in particular, is deeply tied to cultural events. But as a pure investment, it has the highest costs and the lowest returns.\n\nLet us count the costs. Making charges on jewellery range from 6% to 20% depending on the design. GST of 3% applies on the full purchase price. When you sell, the jeweller deducts 3% to 5% as wastage and making loss. A typical piece of jewellery needs the gold price to rise 15% to 20% before you break even. Coins and bars from reputed sellers like MMTC-PAMP or SBI have lower making charges, around 2% to 5%, but still carry a buy-sell spread of roughly 3%.\n\nThere is also the matter of purity. Even with BIS hallmarking now mandatory, the resale process is not as simple as selling an ETF. You need to find a buyer and negotiate. And storage \u2014 a bank locker costs roughly Rs 1,000 to Rs 3,000 per year depending on the city.\n\nPhysical gold is not an investment in any practical sense. It is a store of cultural and emotional value that happens to rise in price over time. If you are buying gold solely to grow your wealth, the other options are strictly better.\n\n## Which One Should You Pick?\n\nIf you hold existing SGBs, do not sell them early. The 2.5% interest plus tax-free capital gains make them the best gold investment product India has ever created.\n\nIf you are buying fresh and you have a demat account, go with a Gold ETF. It offers the lowest cost among currently available options, full liquidity, and no counterparty risk beyond that of the fund itself. The tax treatment at 20% with indexation is reasonable for a long-term holding.\n\nIf you want to buy small amounts regularly as a digital savings habit, digital gold is acceptable for its convenience. But be aware that the spread and storage costs mean you will need a larger price rise to generate the same return as an ETF.\n\nIf you are buying for a wedding or a festival, that is jewellery, not investment. Buy it for the occasion, mentally write off the making charges, and do not count it as part of your financial portfolio.\n\n## How Much Gold Should You Hold?\n\nMost financial planners recommend keeping gold at 5% to 10% of your total investment portfolio. Gold acts as a hedge against equity market downturns and currency depreciation. It does not produce income like dividends or interest, and its long-term returns have historically been lower than equity. But it reduces the overall volatility of your portfolio, and in a crisis, gold has often held its value when stocks have dropped.\n\nA reasonable allocation for a balanced Indian portfolio would be roughly 10% in gold, 60% in equity mutual funds or index funds, 20% in fixed income like PPF or debt funds, and 10% in cash or liquid funds. Use our **[PPF calculator](/calculators/ppf)** to see how the fixed-income portion grows, and our **[SIP calculator](/calculators/sip)** to plan your equity investments alongside.\n\n## The Bottom Line on Gold in India\n\nGold has a role in every Indian portfolio, but the way you buy it matters enormously to your returns. SGBs (if you can find them) are the best option. Gold ETFs are the best currently available option for new investors. Digital gold is for convenience and small amounts. Physical jewellery is for wearing, not for wealth-building. Choose accordingly, and your portfolio will thank you over the next decade.",
  },
  {
    slug: "mutual-funds-beginners-india",
    title: "Mutual Funds for Beginners in India: Types, SIP, and How to Start",
    excerpt: "Everything a beginner in India needs to know about mutual funds: types (large cap, mid cap, small cap), how SIP works, expense ratios, and step-by-step how to start investing.",
    category: "Investing",
    readMinutes: 9,
    date: "Jul 28, 2026",
    keywords: ["mutual funds for beginners india","types of mutual funds","what is sip","how to invest in mutual funds india","large cap mid cap small cap","best mutual funds for beginners","expense ratio mutual fund","index fund vs active fund india"],
    art: { variant: "chart", palette: "forest" },
    bodyMarkdown: "A mutual fund is simply a pool of money from many investors that a professional fund manager invests in stocks, bonds, or other assets. Instead of buying 20 different stocks yourself, you buy one mutual fund and get exposure to all of them instantly. For beginners in India, mutual funds are the single best way to start investing because they offer diversification, professional management, and the ability to start with as little as Rs 500.\n\nYet most beginners get confused by the jargon: large cap, mid cap, small cap, active vs index, direct vs regular, expense ratios, exit loads. This guide cuts through the noise and tells you exactly what you need to know to start.\n\n## What is a mutual fund?\n\nThink of a mutual fund like a vegetable market. You give the fund your Rs 1,000 (or Rs 500, or whatever you can spare), and the fund manager uses it to buy a basket of stocks or bonds that fits the fund\u2019s stated goal. If the basket\u2019s value goes up, your investment goes up. If it goes down, yours goes down too. You own a tiny slice of everything in that basket.\n\nEvery mutual fund has a **Net Asset Value** or NAV, which is the price of one unit of the fund. When you invest, you buy units at the current NAV. When you redeem, you sell them back at that day\u2019s NAV.\n\n## Types of mutual funds by asset class\n\n**Equity mutual funds** invest primarily in stock market shares. These have the highest long-term return potential and the highest short-term volatility. Within equity, funds are further classified by the size of companies they invest in: large cap funds invest in the top 100 companies by market capitalisation, mid cap funds in companies ranked 101 to 250, and small cap funds in the rest. Large cap funds are the most stable. Small cap funds can deliver spectacular returns or sharp losses. A beginner should start with large cap or flexi cap funds.\n\n**Debt mutual funds** invest in bonds, treasury bills, and other fixed-income instruments. They are safer than equity funds but offer lower returns, typically 6 to 8% per year. These are suitable for money you will need within 1 to 3 years.\n\n**Hybrid mutual funds** invest in a mix of equity and debt. A balanced advantage fund, for example, automatically shifts between equity and debt based on market conditions. These are a good option for beginners who want a single fund that handles asset allocation.\n\n**Index funds** are a special type of equity fund that does not try to pick winning stocks. Instead, it simply buys all the stocks in an index, such as the Nifty 50 or Sensex, in the exact same proportion. Because there is no fund manager making active decisions, index funds have very low expense ratios. Studies consistently show that most active fund managers fail to beat the index over long periods, which makes index funds the default recommendation for beginners.\n\n## What is a SIP?\n\nA Systematic Investment Plan or SIP is the most popular way to invest in mutual funds in India. Instead of investing a large lump sum, you invest a fixed amount every month, week, or quarter. A SIP of even Rs 500 per month is enough to start.\n\nSIPs work because of **rupee cost averaging**. When the market is high, your fixed amount buys fewer units. When the market is low, it buys more units. Over time, this averages your purchase price and removes the need to time the market. It also builds a disciplined savings habit.\n\nUse our **[SIP calculator](/calculators/sip)** to see how much a monthly SIP of any amount grows over 5, 10, 15, 20, or 30 years at different expected returns.\n\n## Understanding costs: expense ratio and exit load\n\nEvery mutual fund charges an **expense ratio**, which is the annual fee the fund deducts from your investment to cover management, administration, and other costs. For an active equity fund, this is typically 1 to 1.5% per year. For an index fund or ETF, it is 0.1 to 0.5%. This difference matters enormously over time. A 1% higher expense ratio on a Rs 10 lakh investment over 20 years at 12% return costs you roughly Rs 5 lakh in lost compounding.\n\nAn **exit load** is a fee charged when you redeem your investment before a certain period, usually 3 months to 1 year for equity funds. Most equity funds charge 1% if you exit within 3 months and nothing thereafter. Always check the exit load before investing.\n\n**Direct vs Regular plans** matter more than most beginners realise. A direct plan has no commission because you buy directly from the fund company or through a platform like Groww or Zerodha Coin. A regular plan includes a commission paid to a distributor or agent. The expense ratio of a regular plan is roughly 0.5 to 1% higher than the direct plan of the same fund. Always choose the direct plan unless you are paying for genuine financial advice.\n\n## How to start investing in mutual funds in India\n\nFirst, complete your KYC. You need a PAN card and Aadhaar. You can complete your KYC online through any investment platform \u2014 Groww, Zerodha Coin, ET Money, or Kuvera. This is a one-time process.\n\nSecond, decide your investment goal. Are you investing for retirement in 25 years, a house down payment in 7 years, or your child\u2019s education in 15 years? Your goal\u2019s time horizon determines which type of fund to pick. Money you will not touch for 7 years or more can go into equity funds. Money you need within 3 years should go into debt funds.\n\nThird, pick your fund. For a beginner, the simplest choice is an index fund tracking the Nifty 50 or Sensex. The UTI Nifty 50 Index Fund and the HDFC Index Fund are popular options with expense ratios under 0.2%. If you want a slightly higher return potential with moderate risk, a flexi cap fund or a large cap fund is a reasonable choice.\n\nFourth, start a monthly SIP through an investment platform. Link your bank account, set your monthly amount (as low as Rs 500), and the investment happens automatically every month. Increase the amount by 10% every year using a **[step-up SIP calculator](/calculators/step-up-sip)** to accelerate your wealth building.\n\nFifth, do not check your fund value every day. Mutual funds, especially equity funds, fluctuate in the short term. Checking daily causes unnecessary anxiety and may tempt you to sell at the wrong time. Check once a quarter or once a year. Stay invested for at least 5 to 7 years.\n\n## How many mutual funds should you own?\n\nA common beginner mistake is owning too many funds. Three to four funds are enough for most people: one index fund (Nifty 50), one flexi cap or large cap fund, and one mid cap fund if you have a higher risk appetite. Owning more than 5 or 6 funds simply means you own the same stocks multiple times with different expense ratios. There is no diversification benefit beyond 4 or 5 funds.\n\nRead our detailed guides on **[how to start investing in India](/blog/how-to-start-investing-in-india)** and the **[SIP vs lumpsum debate](/blog/sip-vs-lumpsum)** for deeper context.\n\n## What about the ₹1 crore goal?\n\nMany beginners ask how much SIP they need to reach 1 crore. The answer depends entirely on time. At 12% expected return, a monthly SIP of roughly 2,850 reaches 1 crore in 30 years. At 10,000 per month, you reach 1 crore in 20 years. Our **[SIP to become a crorepati guide](/blog/sip-to-become-crorepati)** has the full breakdown for every time horizon.\n\n## The bottom line for beginners in India\n\nStart with an index fund through a monthly SIP. Choose the direct plan. Keep your expense ratio below 0.5%. Stay invested for at least 7 years. Increase your SIP amount every year as your income grows. That is 80% of what you need to know. The remaining 20% is learning gradually, and you can learn that through the other guides on this site. The hardest step is the first one \u2014 starting. Open an account, set up a Rs 500 SIP, and let time do the work.",
    faq: [
      { q: "What is the minimum amount needed to start a mutual fund SIP in India?", a: "You can start a SIP in most Indian mutual funds with as little as Rs 500 per month. Some funds allow even Rs 100 through certain platforms." },
      { q: "Which is better for beginners: active mutual funds or index funds?", a: "Index funds are generally better for beginners. They have lower expense ratios (0.1 to 0.5% vs 1 to 1.5% for active funds), do not depend on a fund manager's skill, and most active funds fail to beat their index over long periods." },
      { q: "What is the difference between direct and regular mutual fund plans?", a: "Direct plans have no commission because you invest directly with the fund or through a platform. Regular plans include a distributor commission, making their expense ratio 0.5 to 1% higher. Always choose direct plans unless you are paying for personalised financial advice." },
      { q: "How many mutual funds should a beginner own?", a: "Three to four funds is enough for most beginners: one Nifty 50 index fund, one flexi cap or large cap fund, and optionally one mid cap fund. Owning more than five or six funds creates overlap without meaningful diversification benefit." },
      { q: "Can I lose money in mutual funds?", a: "Yes, equity mutual funds can lose value in the short term because they invest in the stock market. However, over longer periods of 7 years or more, equity mutual funds have historically delivered positive returns. Debt funds are safer but also carry some interest rate risk. No mutual fund is guaranteed like a bank FD." },
    ],
  },
  ...morePosts,
  ...aiGuides,
  ...aiComparisons,
  ...fdGuide,
  ...investingGuide,
  ...itrGuide,
  ...itrSeasonGuide,
];
