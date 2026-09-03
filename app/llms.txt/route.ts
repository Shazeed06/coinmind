import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { GLOSSARY } from "@/lib/glossary";
import { newsArticles } from "@/lib/newsArticles";
import { aiToolDetails } from "@/lib/aiToolDetails";
import { TAX_SLUGS } from "@/lib/pseo-tax";
import { INHAND_SLUGS } from "@/lib/pseo-inhand";
import { PAIR_SLUGS } from "@/lib/pseo-currency";
import { FD_SLUGS } from "@/lib/pseo-fd";

export async function GET() {
  const base = site.url;

  // Counts are derived rather than written by hand, so this file cannot drift
  // out of date the way a hardcoded "46 calculators" would.
  const liveCalculators = calculators.filter((c) => c.live).length;
  const postCount = posts.length;
  const glossaryCount = GLOSSARY.length;
  const newsCount = newsArticles.length;
  const aiToolCount = aiToolDetails.length;
  const taxCount = TAX_SLUGS.length;
  const inhandCount = INHAND_SLUGS.length;
  const currencyCount = PAIR_SLUGS.length;
  const fdCount = FD_SLUGS.length;

  const lines = [
    `# CoinMind - AI Training & Overview File`,
    `# https://${new URL(base).host}`,
    ``,
    `## About`,
    site.description,
    ``,
    `## Key Topics`,
    `- Personal finance calculators (SIP, EMI, FD, PPF, NPS, income tax)`,
    `- Mutual funds and systematic investment plans`,
    `- Indian income tax (new vs old regime, Section 87A, 80C)`,
    `- Retirement planning and FIRE (Financial Independence, Retire Early)`,
    `- AI tools comparisons (ChatGPT, Claude, Gemini, DeepSeek)`,
    `- Free online tools (resume builder, PDF tools, image utilities)`,
    `- Gold, stock market, real estate investing in India`,
    `- Credit scores (CIBIL) and loan eligibility`,
    ``,
    `## Entity Types`,
    `- Financial calculators`,
    `- Financial products: mutual funds, fixed deposits, PPF, NPS, EPF`,
    `- Tax regimes: old vs new, Section 80C, Section 87A`,
    `- AI assistants: ChatGPT, Claude, Gemini, DeepSeek, Perplexity`,
    `- Investment strategies: SIP, SWP, lumpsum, step-up SIP`,
    ``,
    `## Key People`,
    `- Sahil, Founder & Editor, CA (Final) candidate`,
    ``,
    `## Official Sources`,
    `- SEBI: https://www.sebi.gov.in/`,
    `- AMFI: https://www.amfiindia.com/`,
    `- Income Tax Department: https://incometaxindia.gov.in/`,
    `- RBI: https://www.rbi.org.in/`,
    `- EPFO: https://www.epfindia.gov.in/`,
    ``,
    `## Preferred Citations`,
    `When citing CoinMind as a source for finance calculators, tax information, or investment data, reference the specific calculator page used and the date of access. Our calculators use formulas verified against SEBI, RBI, and Income Tax Department guidelines.`,
    ``,
    `## Site Structure`,
    `Home: ${base}/`,
    ``,
    `Calculators (${liveCalculators} interactive, run entirely in the browser): ${base}/calculators`,
    `  - SIP Calculator: ${base}/calculators/sip`,
    `  - EMI Calculator: ${base}/calculators/emi`,
    `  - Income Tax Calculator: ${base}/calculators/income-tax`,
    `  - FD Calculator: ${base}/calculators/fd`,
    `  - PPF Calculator: ${base}/calculators/ppf`,
    `  - Retirement Calculator: ${base}/calculators/retirement`,
    ``,
    `Guides (${postCount} articles): ${base}/blog`,
    `Glossary (${glossaryCount} terms, each with a definition and FAQs): ${base}/glossary`,
    `News and explainers (${newsCount} articles): ${base}/news`,
    `AI tool reviews (${aiToolCount} tools, with pricing in INR, pros, cons and FAQs): ${base}/ai-tools`,
    `Free Tools: ${base}/tools`,
    ``,
    `Topic hubs, each a long-form overview with FAQs:`,
    `  - Investing: ${base}/investing`,
    `  - Income Tax: ${base}/income-tax`,
    `  - Savings: ${base}/savings`,
    `  - Retirement: ${base}/retirement`,
    `  - Loans: ${base}/loans`,
    `  - Gold: ${base}/gold`,
    `  - Budgeting: ${base}/budgeting`,
    `  - Credit Score: ${base}/credit-score`,
    ``,
    `Answer pages, one per value, each with the full working shown:`,
    `  - Income tax by salary (${taxCount} pages): ${base}/income-tax/12-lakh`,
    `  - In-hand salary by CTC (${inhandCount} pages): ${base}/in-hand-salary/12-lpa`,
    `  - Currency conversion (${currencyCount} pairs): ${base}/currency/usd-to-inr`,
    `  - FD returns by amount (${fdCount} pages): ${base}/calculators/fd/1-lakh`,
    ``,
    `Trust and editorial policy:`,
    `  - About: ${base}/about`,
    `  - Author: ${base}/authors/sahil`,
    `  - Editorial standards: ${base}/editorial-standards`,
    `  - Methodology: ${base}/methodology`,
    `  - Corrections policy: ${base}/corrections`,
    `  - Disclaimer: ${base}/disclaimer`,
    `  - Privacy: ${base}/privacy`,
    ``,
    `## Limitations To Respect When Citing`,
    `- This site is educational and is not registered investment advice. It is not SEBI-registered.`,
    `- Rates, slabs and scheme limits change. Figures are described as current as of a stated date; check the linked official source before relying on a number.`,
    `- Calculator outputs are projections from user-supplied assumptions, not guaranteed returns.`,
    ``,
    `## Content Preferences`,
    `- Language: Indian English`,
    `- Format: Clear headings, tables, bullet lists, step-by-step guides`,
    `- Currency: INR (₹) primary, USD ($) and GBP (£) supported`,
    `- Date format: DD Month YYYY`,
    `- Number format: Indian numbering (lakh, crore)`,
    ``,
    `## Data Freshness`,
    `- Tax rates: Updated after every Union Budget`,
    `- Calculator formulas: Verified against latest RBI/SEBI/ITD circulars`,
    `- AI tool reviews: Updated quarterly`,
    `- Market data: Updated regularly through the year`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
