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

// ─────────────────────── PAGE META ───────────────────────

export const HOME = mk("/", {
  title: "CoinMind — India's Smartest Free Personal Finance Platform",
  desc: `${site.name} has 46 free calculators (SIP, EMI, income tax, FD, PPF), 44 free tools, and expert guides. Calculate returns, compare options, and build wealth — no sign-up, always free.`,
  keywords: ["SIP calculator", "EMI calculator", "income tax calculator", "FD calculator", "PPF calculator", "personal finance India", "mutual fund calculator", "free financial tools"],
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

// ─────────────────────── STATIC PAGES ───────────────────────

export const ABOUT = mk("/about", {
  title: "About CoinMind — Free Finance Calculators & AI Tool Reviews",
  desc: "CoinMind is built by Sahil (CA Final candidate) to make financial calculators, planning tools, and AI reviews genuinely free. No sign-up, no upsell, no jargon.",
  keywords: ["about CoinMind", "free finance calculators", "Sahil", "personal finance India", "finance tools"],
});

export const CONTACT = mk("/contact", {
  title: "Contact CoinMind — Get in Touch",
  desc: "Have feedback, a correction, or a tool idea? Email coinmindofficial@gmail.com. We respond to every message.",
});

export const PRIVACY = mk("/privacy", {
  title: "Privacy Policy — CoinMind",
  desc: "CoinMind respects your privacy. Calculators run in your browser — we never see the numbers you enter. No tracking, no data storage.",
});

export const TERMS = mk("/terms", {
  title: "Terms of Service — CoinMind",
  desc: "The terms for using CoinMind's free calculators, tools, and content. Educational purposes only — not financial advice.",
});

export const DISCLAIMER = mk("/disclaimer", {
  title: "Disclaimer — CoinMind",
  desc: "CoinMind provides educational tools and information only — not financial, investment, tax, or legal advice. Verify with a qualified professional.",
});

export const AFFILIATE = mk("/affiliate-disclosure", {
  title: "Affiliate Disclosure — CoinMind",
  desc: "CoinMind uses affiliate links. If you click and buy, we may earn a commission at no extra cost. We only recommend tools we have tested.",
});

export const EDITORIAL = mk("/editorial-standards", {
  title: "Editorial Standards & Accuracy — CoinMind",
  desc: "How CoinMind researches, writes, reviews, and updates its calculators, guides, and tool reviews. Every formula is verified against official sources.",
  keywords: ["editorial standards", "fact checking", "financial accuracy", "CoinMind research"],
});

export const CALCULATORS = mk("/calculators", {
  title: "46 Free Financial Calculators — SIP, EMI, Tax, FD & More",
  desc: "Free suite of 46 financial calculators: SIP, EMI, income tax, FD, PPF, NPS, retirement, GST and more. Fast, private, works in INR, USD, GBP. No sign-up.",
  keywords: ["financial calculators", "free calculators India", "SIP calculator", "EMI calculator", "income tax calculator", "investment calculator", "retirement calculator"],
});

export const NEWS = mk("/news", {
  title: "Finance & AI News — Plain-English Explainers",
  desc: "Original, plain-English explainers of the finance and AI news that matters. Updated by CoinMind's editorial team.",
  keywords: ["finance news", "AI news", "personal finance explainers", "market updates India", "AI developments"],
});

export const BLOG = mk("/blog", {
  title: "Finance & AI Guides — How-To & Money Tips",
  desc: "Practical, jargon-free guides on personal finance, investing, mutual funds, income tax, credit, and working smarter with AI. Written for India.",
  keywords: ["personal finance guides", "investing tips India", "mutual funds guide", "tax saving tips", "AI guides", "money management"],
});

export const GLOSSARY = mk("/glossary", {
  title: "Finance & AI Glossary — 100+ Terms Explained Simply",
  desc: "A plain-English glossary of 100+ finance and AI terms. From SIP, EMI, CAGR, and LTCG to LLMs, neural networks, and AI agents. No jargon, no confusion.",
  keywords: ["finance glossary", "AI glossary", "finance terms", "SIP meaning", "EMI meaning", "CAGR explained", "AI terms"],
});

export const AI_ASSISTANT = mk("/ai-assistant", {
  title: "Free AI Money Assistant — Ask Any Finance Question",
  desc: "Ask CoinMind's free AI assistant about investing, taxes, budgeting, SIPs, mutual funds, credit scores, and AI tools. Instant answers with sources.",
  keywords: ["AI finance assistant", "free AI money advisor", "ask AI about money", "finance chatbot India"],
});

export const AI_TOOLS = mk("/ai-tools", {
  title: "Best AI Tools 2026 — USA, China & India Compared",
  desc: "Up-to-date directory of 20+ AI tools from the USA, China, and India. Compare ChatGPT, Claude, Gemini, DeepSeek, and more with real pricing and ratings.",
  keywords: ["best AI tools", "AI tools 2026", "ChatGPT vs Claude", "DeepSeek", "AI tools India", "AI tool comparison", "free AI tools"],
});

export const TOOLS = mk("/tools", {
  title: "44 Free Online Tools — Resume Builder, PDF & Image Utilities",
  desc: "Free browser tools: resume builder, PDF merger, image compressor, converter, meme generator, password generator, QR code creator, and 36 more. No sign-up.",
  keywords: ["free online tools", "resume builder", "PDF tools", "image compressor", "free utilities", "browser tools"],
});

export const RESUME = mk("/resume-builder", {
  title: "Free Resume Builder — Professional CV & BioData Maker",
  desc: "Create an ATS-friendly resume in minutes with CoinMind's free resume builder. Live preview, one-click PDF download, professional templates. No sign-up.",
  keywords: ["free resume builder", "CV maker", "resume template", "ATS resume", "biodata maker", "resume PDF", "online resume creator"],
});

export const REGIME = mk("/tax-regime-break-even", {
  title: "Old vs New Tax Regime — Find Your Break-Even Point (2026)",
  desc: "The exact deduction amount where the old tax regime beats the new one for FY 2026-27. Enter your income and see which regime saves more.",
  keywords: ["old vs new tax regime", "tax regime break even", "income tax comparison India", "which tax regime is better", "tax regime calculator"],
});

export const NOT_FOUND: Metadata = {
  title: { absolute: "404 — Page Not Found · CoinMind" },
  description: "The page you are looking for does not exist or has been moved. Browse calculators, tools, or guides to find what you need.",
  robots: { index: false, follow: true },
};

// ─────────────────────── CALCULATOR PAGES ───────────────────────
// Optimized for CTR: power words, numbers, benefits, freshness

export const CALC_SIP = mk("/calculators/sip", {
  title: "SIP Calculator India — Monthly Returns, Corpus & Tax Impact (2026)",
  desc: "Calculate SIP returns with step-up, LTCG tax, and inflation-adjusted real value. Year-wise growth table. Free, instant, private. No sign-up needed.",
});

export const CALC_EMI = mk("/calculators/emi", {
  title: "EMI Calculator — Home, Car & Personal Loan EMI (2026)",
  desc: "Free EMI calculator. Get monthly payment, total interest, and full amortisation schedule for any loan. Compare 3 loans side-by-side. Instant results.",
});

export const CALC_INCOME_TAX = mk("/calculators/income-tax", {
  title: "Income Tax Calculator India FY 2026-27 — New vs Old Regime",
  desc: "Compare new vs old tax regimes instantly. See exact tax on your salary, Section 87A rebate, and which regime saves more. Updated for FY 2026-27.",
});

export const CALC_FD = mk("/calculators/fd", {
  title: "FD Calculator — Fixed Deposit Maturity & Interest (2026)",
  desc: "Free FD calculator. Find maturity value and interest earned at quarterly compounding. Compare 5 tenures side-by-side. Updated for 2026 bank FD rates.",
});

export const CALC_PPF = mk("/calculators/ppf", {
  title: "PPF Calculator — 15-Year Public Provident Fund Maturity",
  desc: "Free PPF calculator. Estimate your Public Provident Fund maturity with yearly contributions and government-set compounding. Tax-free, zero risk.",
});

export const CALC_RETIREMENT = mk("/calculators/retirement", {
  title: "Retirement Calculator India — Corpus Needed & Monthly SIP",
  desc: "Find the corpus you need to retire comfortably and the exact monthly SIP to get there. Inflation-adjusted. For India's 30-year retirement horizon.",
});

export const CALC_GST = mk("/calculators/gst", {
  title: "GST Calculator India — Add/Remove GST at 5%, 12%, 18%, 28%",
  desc: "Free GST calculator. Add GST to a base price or extract GST from an inclusive amount. Supports all Indian GST rates. Instant, accurate, free.",
});

export const CALC_EPF = mk("/calculators/epf", {
  title: "EPF Calculator — PF Balance, Maturity & Pension Estimate",
  desc: "Free EPF calculator for India. Estimate your Employee Provident Fund corpus at retirement based on salary, contribution rate, and EPF interest rate.",
});

export const CALC_NPS = mk("/calculators/nps", {
  title: "NPS Calculator — Pension Corpus & Monthly Annuity (2026)",
  desc: "Free NPS calculator. Project your National Pension Scheme corpus, tax-free lump sum (60%), and monthly pension from annuity (40%). Updated 2026.",
});

export const CALC_COMPOUND = mk("/calculators/compound-interest", {
  title: "Compound Interest Calculator — Daily, Monthly & Yearly",
  desc: "Free compound interest calculator. See how your money grows with daily, monthly, or yearly compounding. Visual chart and year-by-year table.",
});

export const CALC_CAGR = mk("/calculators/cagr", {
  title: "CAGR Calculator — Compound Annual Growth Rate Online",
  desc: "Free CAGR calculator. Turn start and end values into a smoothed annual growth rate. Works for investments, revenue, and any growth metric.",
});

export const CALC_BMI = mk("/calculators/bmi", {
  title: "BMI Calculator — Body Mass Index (Metric & Imperial)",
  desc: "Free BMI calculator. Enter height and weight in metric or imperial. See your BMI category, healthy weight range, and ideal weight suggestions.",
});

export const CALC_HRA = mk("/calculators/hra", {
  title: "HRA Calculator — House Rent Allowance Exemption India",
  desc: "Free HRA exemption calculator. Work out how much of your House Rent Allowance is tax-exempt under Indian Income Tax rules. Updated FY 2026-27.",
});

export const CALC_GRATUITY = mk("/calculators/gratuity", {
  title: "Gratuity Calculator — How Much Gratuity You Will Get",
  desc: "Free gratuity calculator for India. Calculate gratuity owed based on last drawn salary and years of service under the Payment of Gratuity Act.",
});

export const CALC_TDS = mk("/calculators/tds", {
  title: "TDS Calculator — Tax Deducted at Source (2026 India)",
  desc: "Free TDS calculator. Estimate TDS on salary, interest, rent, professional fees, and commissions. Updated for FY 2026-27 Income Tax rates.",
});

export const CALC_NSC = mk("/calculators/nsc", {
  title: "NSC Calculator — National Savings Certificate Maturity",
  desc: "Free NSC calculator. Find your National Savings Certificate maturity value and total interest over the 5-year term at current government rates.",
});

export const CALC_SCSS = mk("/calculators/scss", {
  title: "SCSS Calculator — Senior Citizen Savings Scheme 2026",
  desc: "Free SCSS calculator. Work out quarterly payout, annual income, and total interest from the Senior Citizen Savings Scheme over its 5-year term.",
});

export const CALC_SSY = mk("/calculators/sukanya-samriddhi", {
  title: "Sukanya Samriddhi Yojana Calculator — SSY Maturity 2026",
  desc: "Free Sukanya Samriddhi Yojana calculator. Estimate the tax-free corpus for your girl child from yearly deposits. SSY interest compounded annually.",
});

export const CALC_MIS = mk("/calculators/post-office-mis", {
  title: "Post Office MIS Calculator — Monthly Income Scheme 2026",
  desc: "Free Post Office MIS calculator. See the fixed monthly payout, annual income, and total interest from the Monthly Income Scheme over 5 years.",
});

export const CALC_CAPITAL_GAINS = mk("/calculators/capital-gains", {
  title: "Capital Gains Tax Calculator — LTCG & STCG India 2026",
  desc: "Free capital gains tax calculator. Work out short-term and long-term gains tax on equity, mutual funds, property, and gold. Updated FY 2026-27.",
});

export const CALC_SIMPLE_INTEREST = mk("/calculators/simple-interest", {
  title: "Simple Interest Calculator — SI Formula & Total Amount",
  desc: "Free simple interest calculator. Work out interest and total repayment with the SI formula. Compare simple vs compound interest side-by-side.",
});

export const CALC_TAKE_HOME = mk("/calculators/take-home-salary", {
  title: "Take-Home Salary Calculator — CTC to In-Hand Pay India",
  desc: "Free take-home salary calculator. Convert your annual CTC into real monthly in-hand pay: PF, professional tax, and income tax all shown.",
});

export const CALC_CURRENCY = mk("/calculators/currency-converter", {
  title: "Currency Converter — Live Exchange Rates (USD, INR, EUR, GBP)",
  desc: "Free currency converter with live mid-market rates. Convert 20+ currencies including USD, INR, EUR, GBP. No sign-up, no hidden fees.",
});

export const CALC_PERCENTAGE = mk("/calculators/percentage-calculator", {
  title: "Percentage Calculator — % of Number, Change & Difference",
  desc: "Free percentage calculator. Find X% of a number, percentage increase/decrease, and what percent one value is of another. Instant, accurate.",
});

export const CALC_INFLATION = mk("/calculators/inflation", {
  title: "Inflation Calculator India — Future Value of Money (2026)",
  desc: "Free inflation calculator. See what today's money will be worth in future and how inflation erodes purchasing power. India-specific CPI data.",
});

export const CALC_DISCOUNT = mk("/calculators/discount", {
  title: "Discount Calculator — Sale Price & Savings Online",
  desc: "Free discount calculator. Enter original price and discount % to see the final sale price and exactly how much you save. Works with any currency.",
});

export const CALC_SALES_TAX = mk("/calculators/sales-tax", {
  title: "Sales Tax & VAT Calculator — Add or Remove Tax",
  desc: "Free sales tax and VAT calculator. Add tax to a net price or extract tax from a gross total at any rate. Supports all global tax rates.",
});

export const CALC_AGE = mk("/calculators/age-calculator", {
  title: "Age Calculator — Exact Age in Years, Months & Days",
  desc: "Free age calculator. Find your exact age in years, months, and days plus total weeks, hours, and countdown to your next birthday.",
});

export const CALC_DATE_DIFF = mk("/calculators/date-difference-calculator", {
  title: "Date Difference Calculator — Days Between Dates Online",
  desc: "Free date difference calculator. Find days, weeks, months, and years between two dates. Add or subtract time from any date.",
});

export const CALC_PREGNANCY = mk("/calculators/pregnancy-due-date", {
  title: "Pregnancy Due Date Calculator — Weeks & Trimester (2026)",
  desc: "Free due date calculator. Estimate your due date from your last menstrual period (LMP) or conception date. See current week and trimester.",
});

export const CALC_CALORIE = mk("/calculators/calorie", {
  title: "Calorie Calculator — Daily Calories (TDEE) for Weight Goals",
  desc: "Free calorie calculator. Estimate your daily maintenance calories (TDEE) using the Mifflin-St Jeor equation. Targets for losing, gaining, or maintaining.",
});

export const CALC_IDEAL_WEIGHT = mk("/calculators/ideal-weight", {
  title: "Ideal Weight Calculator — By Height, Age & Sex",
  desc: "Free ideal weight calculator. See healthy weight range for your height using Robinson, Miller, Devine, and Hamwi formulas. Metric and imperial.",
});

export const CALC_HOURLY = mk("/calculators/hourly-to-salary", {
  title: "Hourly to Salary Calculator — Convert Wage to Annual Pay",
  desc: "Free hourly to salary calculator. Convert hourly wage into annual, monthly, weekly, and daily pay. Works for full-time, part-time, and freelance.",
});

export const CALC_TIP = mk("/calculators/tip-calculator", {
  title: "Tip Calculator — Split the Bill & Tip Fairly",
  desc: "Free tip calculator. Enter your bill, pick a tip %, and split any number of ways. See the tip, total, and per-person share instantly.",
});

export const CALC_GOAL_SIP = mk("/calculators/goal-sip", {
  title: "Goal SIP Calculator — SIP Required for ₹1 Crore & Any Goal",
  desc: "Find the exact monthly SIP needed for any financial goal. Reverse-calculate: enter your target corpus and see the SIP required. The crorepati calculator.",
});

export const CALC_STEP_UP_SIP = mk("/calculators/step-up-sip", {
  title: "Step-Up SIP Calculator — Top-Up SIP Returns & Growth",
  desc: "Free step-up SIP calculator. See how increasing your monthly SIP each year grows your final corpus by 2-3x. Compare flat vs step-up SIP side-by-side.",
});

export const CALC_LUMPSUM = mk("/calculators/lumpsum", {
  title: "Lumpsum Calculator — One-Time Investment Returns & CAGR",
  desc: "Free lumpsum investment calculator. See the future value, total return, and CAGR of a one-time investment. Works for mutual funds, FD, and any asset.",
});

export const CALC_MF_RETURNS = mk("/calculators/mutual-fund-returns", {
  title: "Mutual Fund Returns Calculator — Growth & CAGR (2026)",
  desc: "Free mutual fund returns calculator. Project the future value, total return, and CAGR of a lumpsum mutual fund investment. Updated for 2026.",
});

export const CALC_SWP = mk("/calculators/swp", {
  title: "SWP Calculator — Systematic Withdrawal Plan Income (2026)",
  desc: "Free SWP calculator. See how long your mutual fund corpus lasts with monthly withdrawals. Compare 4%, 6%, and 8% withdrawal rates side-by-side.",
});

export const CALC_HOME_LOAN = mk("/calculators/home-loan-eligibility", {
  title: "Home Loan Eligibility Calculator — How Much Can I Get? (2026)",
  desc: "See how much home loan you qualify for based on your salary, existing EMIs, and lender FOIR limits. Free, instant, no sign-up.",
});

export const CALC_CAR_LOAN = mk("/calculators/car-loan-emi", {
  title: "Car Loan EMI Calculator — Monthly Auto Loan Payment",
  desc: "Free car loan EMI calculator. Work out your monthly car loan payment, total interest, and total cost for any car price and tenure.",
});

export const CALC_PERSONAL_LOAN = mk("/calculators/personal-loan-emi", {
  title: "Personal Loan EMI Calculator — Monthly EMI & Interest",
  desc: "Free personal loan EMI calculator. Find your monthly EMI, total interest, and total payment for unsecured loans at 11-18% over 1-5 years.",
});

export const CALC_EDUCATION_LOAN = mk("/calculators/education-loan-emi", {
  title: "Education Loan EMI Calculator — Student Loan Payment",
  desc: "Free education loan EMI calculator. Estimate your student loan EMI, total interest, and plan repayment around the moratorium period.",
});

export const CALC_MORTGAGE = mk("/calculators/mortgage", {
  title: "Mortgage Calculator — Monthly Payment, Interest & Amortisation",
  desc: "Free mortgage calculator. Estimate monthly home loan payment, total interest, and full amortisation schedule from price, down payment, and rate.",
});

// ─────────────────────── TOOL PAGES ───────────────────────

export const TOOL_COMPRESS = toolMeta("compress-image", "Compress Image — Shrink JPG, PNG & WebP Free", "Free online image compressor. Reduce JPG, PNG, and WebP file sizes without losing quality. Works in your browser — nothing is uploaded.");
export const TOOL_IMG_PDF = toolMeta("image-to-pdf", "Image to PDF — Convert JPG & PNG to PDF Free", "Free image to PDF converter. Convert JPG, PNG, and WebP images to PDF in seconds. All in your browser — no upload needed.");
export const TOOL_MERGE_PDF = toolMeta("merge-pdf", "Merge PDF — Combine PDF Files Online Free", "Free online PDF merger. Combine multiple PDF files into one document. Works in your browser — no upload, no sign-up.");
export const TOOL_IMG_CONVERT = toolMeta("image-converter", "Image Converter — JPG, PNG & WebP Online Free", "Free online image converter. Convert between JPG, PNG, WebP, and more. Fast browser-based conversion with no upload.");
export const TOOL_SPLIT_PDF = toolMeta("split-pdf", "Split PDF — Extract Pages from a PDF Free", "Free online PDF splitter. Extract specific pages from a PDF or split into separate files. All processing is done in your browser.");
export const TOOL_ROTATE_PDF = toolMeta("rotate-pdf", "Rotate PDF — Turn Pages 90° or 180° Free", "Free online PDF rotator. Rotate all pages or selected pages in a PDF. Works in your browser — nothing uploaded.");
export const TOOL_ORGANIZE_PDF = toolMeta("organize-pdf", "Organize PDF — Reorder & Delete Pages Free", "Free online PDF organizer. Reorder, delete, and rearrange pages in a PDF document. All done in your browser.");
export const TOOL_RESIZE = toolMeta("resize-image", "Resize Image — Free Online Image Resizer", "Free online image resizer. Resize JPG, PNG, and WebP images by dimensions or percentage. Works in your browser instantly.");
export const TOOL_CROP = toolMeta("crop-image", "Crop Image — Free Online Photo Cropper", "Free online image cropper. Crop JPG, PNG, and WebP images to any size or aspect ratio. Browser-based, nothing uploaded.");
export const TOOL_ROTATE_IMG = toolMeta("rotate-image", "Rotate & Flip Image — Free Online Image Rotator", "Free online image rotator. Rotate, flip horizontal, or flip vertical any image. Works in your browser with no upload.");
export const TOOL_FAVICON = toolMeta("favicon-generator", "Favicon Generator — Free Favicon Maker", "Free favicon generator. Create favicon icons from any image. Generates all required sizes for desktop and mobile. No sign-up.");
export const TOOL_MEME = toolMeta("meme-generator", "Meme Generator — Free Meme Maker with Text", "Free meme generator. Add custom text to images and create memes instantly. Upload any image or use templates. No sign-up.");
export const TOOL_AI_SUMMARIZE = toolMeta("ai-summarizer", "AI Text Summarizer — Free Summary Generator", "Free AI text summarizer. Paste any article or document and get a concise summary in seconds. Powered by AI, completely free.");
export const TOOL_AI_PARAPHRASE = toolMeta("ai-paraphraser", "AI Paraphrasing Tool — Free Rewriter Online", "Free AI paraphrasing tool. Rewrite any text with different tones and styles. Improve clarity, avoid plagiarism. Completely free.");
export const TOOL_AI_GRAMMAR = toolMeta("ai-grammar-checker", "AI Grammar Checker — Fix Grammar & Spelling Free", "Free AI grammar checker. Fix grammar, spelling, and punctuation errors instantly. Improve your writing with AI. No sign-up needed.");
export const TOOL_AI_EMAIL = toolMeta("ai-email-writer", "AI Email & Cover Letter Writer — Free Online", "Free AI email and cover letter writer. Generate professional emails, cover letters, and messages in seconds. Powered by AI, 100% free.");
export const TOOL_AI_BIZ_NAME = toolMeta("ai-business-name-generator", "AI Business Name Generator — Startup Name Ideas Free", "Free AI business name generator. Get creative, unique business name ideas for your startup or brand. AI-powered, instantly.");
export const TOOL_AI_CAPTION = toolMeta("ai-caption-generator", "Instagram Caption Generator — AI Captions & Hashtags", "Free AI caption generator. Create engaging Instagram captions and relevant hashtags for any post. AI-powered, free, no sign-up.");
export const TOOL_WORD_COUNT = toolMeta("word-counter", "Word Counter — Count Words & Characters Free", "Free online word counter. Count words, characters, sentences, and paragraphs in any text. Instant results as you type.");
export const TOOL_CASE = toolMeta("case-converter", "Case Converter — Change Text Case Online Free", "Free online case converter. Convert text to uppercase, lowercase, title case, sentence case, and more. Instant, browser-based.");
export const TOOL_PASSWORD = toolMeta("password-generator", "Password Generator — Strong Random Passwords Free", "Free password generator. Create secure, random passwords with custom length, numbers, symbols, and complexity. No sign-up.");
export const TOOL_QR = toolMeta("qr-code-generator", "QR Code Generator — Free Custom QR Codes Online", "Free QR code generator. Create custom QR codes with your logo and colors. Download PNG or SVG. No sign-up, unlimited scans.");
export const TOOL_UNIT = toolMeta("unit-converter", "Unit Converter — Length, Weight, Temperature & More", "Free online unit converter. Convert between metric and imperial units for length, weight, temperature, volume, area, and more.");
export const TOOL_INVOICE = toolMeta("invoice-generator", "Free Invoice Generator — Make Invoices Online", "Free online invoice generator. Create professional invoices with your logo and business details. Download as PDF. No sign-up.");
export const TOOL_BUDGET = toolMeta("budget-planner", "Budget Planner — Free Monthly Budget Tool", "Free monthly budget planner. Track income, expenses, and savings goals. See where your money goes and plan better. No sign-up.");
export const TOOL_RICH = toolMeta("are-you-rich", "Are You Rich? Income Percentile Calculator India (2026)", "See where your income ranks among India's population. Compare your salary to percentile brackets. Free, anonymous, instant.");
export const TOOL_NUM_WORDS = toolMeta("number-to-words", "Number to Words Converter — Rupees, Lakh & Crore", "Free number to words converter. Convert numbers to English words. Supports lakh, crore, and rupees format. India-friendly.");
export const TOOL_LOREM = toolMeta("lorem-ipsum-generator", "Lorem Ipsum Generator — Free Placeholder Text", "Free Lorem Ipsum generator. Generate placeholder text for designs, mockups, and layouts. Custom length and paragraph count.");
export const TOOL_DIFF = toolMeta("text-compare", "Text Compare — Free Online Diff Checker", "Free online text comparison tool. Compare two texts and highlight differences side-by-side. Works for code, documents, and any text.");
export const TOOL_DEDUP = toolMeta("remove-duplicate-lines", "Remove Duplicate Lines — Free Online Tool", "Free tool to remove duplicate lines from text. Clean up lists, remove duplicates, and sort alphabetically. Browser-based.");
export const TOOL_JSON = toolMeta("json-formatter", "JSON Formatter & Validator — Free Online Tool", "Free online JSON formatter and validator. Beautify, minify, and validate your JSON. Fix errors with syntax highlighting.");
export const TOOL_BASE64 = toolMeta("base64", "Base64 Encode & Decode — Free Online Tool", "Free online Base64 encoder and decoder. Encode text or files to Base64 and decode Base64 back to text. Works in your browser.");
export const TOOL_URL_ENCODE = toolMeta("url-encode-decode", "URL Encode & Decode — Free Online Tool", "Free online URL encoder and decoder. Encode special characters in URLs and decode URL-encoded strings. Instant, browser-based.");
export const TOOL_STOPWATCH = toolMeta("stopwatch-timer", "Online Stopwatch & Countdown Timer — Free", "Free online stopwatch and countdown timer. Track elapsed time or count down to zero. Works in your browser on any device.");
export const TOOL_COUNTDOWN = toolMeta("countdown-to-date", "Countdown to Date — Live Days, Hours & Seconds", "Free live countdown timer to any date and time. See days, hours, minutes, and seconds remaining. Works on any device.");
export const TOOL_WHEEL = toolMeta("random-wheel", "Random Wheel Picker — Spin to Choose, Free", "Free spinning wheel picker. Enter choices and spin to pick a random winner. Perfect for giveaways, decisions, and games.");
export const TOOL_COIN = toolMeta("coin-flip", "Coin Flip & Dice Roller — Free Online, Heads or Tails", "Free coin flip and dice roller. Flip a coin or roll 1-6 dice. True random results. Works on any device.");
export const TOOL_RANDOM_NUM = toolMeta("random-number-generator", "Random Number Generator — Fair & Free Online", "Free random number generator. Generate random numbers within any range. Perfect for lotteries, games, and giveaways.");
export const TOOL_SCIENTIFIC = toolMeta("scientific-calculator", "Scientific Calculator — Free Online Calculator", "Free online scientific calculator. Trigonometric, logarithmic, exponential functions. Works in your browser on any device.");
export const TOOL_GPA = toolMeta("gpa-calculator", "GPA & CGPA Calculator — Free Online for Students", "Free GPA and CGPA calculator. Calculate your semester GPA and cumulative CGPA. Supports percentage, letter, and point systems.");
export const TOOL_COLOR = toolMeta("color-picker", "Color Picker — HEX, RGB & HSL Converter Online", "Free online color picker. Pick colors from a visual palette and get HEX, RGB, and HSL values. Copy to clipboard instantly.");
export const TOOL_CHAR_COUNT = toolMeta("character-counter", "Character Counter — Count Characters Online Free", "Free online character counter. Count characters, words, sentences, and paragraphs in any text. Works without JavaScript.");
