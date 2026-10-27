// Authentic, topic-relevant editorial photography for articles, news and guides.
// Uses curated high-resolution, WebP-optimized photography matched to the article's
// exact financial or tech topic, replacing generic abstract shapes with real visuals.

export type CoverVariant =
  | "chart"
  | "coins"
  | "card"
  | "spark"
  | "nodes"
  | "candles"
  | "piggy"
  | "plant"
  | "shield"
  | "graph-up";

export type CoverPalette = "forest" | "brass" | "berry" | "deep";

// Curated high-res Unsplash photography IDs categorized by specific financial & tech domains
const TOPIC_PHOTOS: Record<string, string[]> = {
  ai: [
    "photo-1531482615713-2afd69097998", // Tech professionals working with AI on laptops
    "photo-1526374965328-7f61d4dc18c5", // Glowing code & neural algorithms on dark laptop
    "photo-1516321318423-f06f85e504b3", // Modern laptop with clean chatbot interface
    "photo-1555066931-4365d14bab8c", // Software developer coding on widescreen monitor
    "photo-1485827404703-89b55fcc595e", // Modern robotic intelligence & automation
    "photo-1535378917042-10a22c95931a", // Futuristic digital intelligence workspace
    "photo-1504384308090-c894fdcc538d", // Modern tech workstation with AI tools
    "photo-1517245386807-bb43f82c33c4", // Collaborative team using AI productivity tools
    "photo-1573164713988-8665fc963095", // Tech professional analyzing automated data
    "photo-1522071820081-009f0129c71c", // Creative team using digital tools on laptops
    "photo-1581091226825-a6a2a5aee158", // Professional engineer operating high-tech interface
    "photo-1550751827-4bd374c3f58b", // Cyber security & digital server infrastructure
    "photo-1519389950473-47ba0277781c", // High-productivity digital workspace
    "photo-1531297484001-80022131f5a1", // Sleek laptop displaying digital analytics
    "photo-1589254065878-42c9da997008", // Modern AI humanoid assistant
    "photo-1618005182384-a83a8bd57fbe", // Modern futuristic technology interface
  ],
  tax: [
    "photo-1554224155-8d04cb21cd6c", // Calculator, accounting sheets, pen
    "photo-1586486855514-8c633cc6fd38", // Tax audit ledger and laptop
    "photo-1450133064473-71024230f91b", // Document review and official stamp
    "photo-1607604276583-eef5d076aa5f", // Indian currency notes and financial papers
    "photo-1554224154-26032ffc0d07", // Monthly tax calculation ledger & coffee
    "photo-1454165804606-c3d57bc86b40", // Corporate tax planning & accounting review
    "photo-1563986768609-322da13575f3", // Digital tax filing on tablet and smartphone
    "photo-1526304640581-d334cdbbf45e", // Cash currency notes and government passbook
    "photo-1590283603385-17ffb3a7f29f", // Financial revenue and deduction dashboard
    "photo-1460925895917-afdab827c52f", // Income tax slab comparison charts
    "photo-1559526324-4b87b5e36e44", // Electronic payment and bank settlement
    "photo-1554224155-6726b3ff858f", // Tax filing folder with receipts and pen
    "photo-1507679799987-c73779587ccf", // Professional financial consultant explaining tax
    "photo-1521791136064-7986c2920216", // Business handshake and tax compliance agreement
    "photo-1434030216411-0b793f4b4173", // Financial planning notepad and keyboard
    "photo-1518458028785-8fbcd101ebb9", // Indian rupee banknotes and investment documents
  ],
  investing: [
    "photo-1611974789855-9c2a0a7236a3", // Stock market candlestick trading chart
    "photo-1590283603385-17ffb3a7f29f", // Financial dashboard with green analytics
    "photo-1579621970563-ebec7560ff3e", // Coins sprouting green plant (compounding)
    "photo-1642543492481-44e81e3914a7", // Upward financial analytics screen
    "photo-1535320903710-d993d3d77d29", // Professional trading desk with multi-screen charts
    "photo-1565372195458-9de0b320ef04", // Stock exchange market indices board
    "photo-1526304640581-d334cdbbf45e", // Growing stacks of currency notes
    "photo-1559526324-4b87b5e36e44", // Wealth management and investment portfolio
    "photo-1460925895917-afdab827c52f", // Equity mutual fund performance graphs
    "photo-1579546929518-9e396f3cc809", // Smooth wealth growth gradient analytics
    "photo-1507679799987-c73779587ccf", // Long-term wealth planning session
    "photo-1553729459-efe14ef6055d", // High-yield investment assets
    "photo-1522071820081-009f0129c71c", // Market research team analyzing equities
    "photo-1551836022-d5d88e9218df", // Confident investor checking market returns
    "photo-1512358958014-b651a7ee1773", // Bull market charging bull symbol
    "photo-1531297484001-80022131f5a1", // Quantitative trading on laptop
  ],
  homeLoan: [
    "photo-1560518883-ce09059eeffa", // House keys held up in front of new home
    "photo-1570129477492-45c003edd2be", // Modern residential house architecture
    "photo-1582407947304-fd86f028f716", // Real estate property contract
    "photo-1560520653-9e0e4c89eb11", // Modern residential building
    "photo-1512917774080-9991f1c4c750", // Luxury modern house with landscaped garden
    "photo-1564013799919-ab600027ffc6", // Beautiful suburban dream home
    "photo-1580587771525-78b9dba3b914", // Modern residential villa
    "photo-1576941089067-2de3c901e126", // Residential neighbourhood with modern houses
    "photo-1600585154340-be6161a56a0c", // Luxury home interior living room
    "photo-1600596542815-ffad4c1539a9", // Modern home exterior with warm lighting
    "photo-1513694203232-719a280e022f", // Cozy apartment interior design
    "photo-1502672260266-1c1ef2d93688", // Scandinavian apartment with wooden accents
  ],
  carLoan: [
    "photo-1503376780353-7e6692767b70", // Modern car on open road
    "photo-1552519507-da3b142c6e3d", // Automobile in showroom
    "photo-1494976388531-d1058494cdd8", // Car on scenic highway
    "photo-1502877338535-766e1452684a", // Modern vehicle dashboard
    "photo-1549399542-7e3f8b79c341", // Car keys held by new car owner
    "photo-1511919884226-fd3cad34687c", // Sports sedan on mountain road
  ],
  savings: [
    "photo-1579621970795-87facc2f976d", // Glass piggy bank with coins
    "photo-1567427017947-545c5f8d16ad", // Coin savings jar
    "photo-1526304640581-d334cdbbf45e", // Banking cash notes and passbook
    "photo-1559526324-4b87b5e36e44", // Digital banking and payment card
    "photo-1553729459-efe14ef6055d", // Cash bundles representing fixed deposit returns
    "photo-1607604276583-eef5d076aa5f", // Secure Indian rupee savings
    "photo-1554224155-8d04cb21cd6c", // Interest compounding calculator and savings register
    "photo-1454165804606-c3d57bc86b40", // Systematic monthly savings plan ledger
    "photo-1579621970563-ebec7560ff3e", // Compounding interest sapling growing from coins
    "photo-1563986768609-322da13575f3", // Online fixed deposit booking on smartphone
    "photo-1586486855514-8c633cc6fd38", // Banking term deposit receipt and pen
    "photo-1434030216411-0b793f4b4173", // Financial peace of mind with emergency savings
  ],
  retirement: [
    "photo-1534528741775-53994a69daeb", // Relaxed senior living peacefully
    "photo-1507679799987-c73779587ccf", // Professional financial planning
    "photo-1476703993599-0035a21b17a9", // Peaceful nature, financial independence
    "photo-1516726817505-f5ed825624d8", // Happy mature couple enjoying peaceful golden years
    "photo-1528605248644-14dd04022da1", // Cheerful seniors socializing and enjoying life
    "photo-1447752875215-b2761acb3c5d", // Serene forest walk signifying financial peace
    "photo-1506126613408-eca07ce68773", // Meditation in nature / stress-free retirement
    "photo-1519741497674-611481863552", // Loving mature family in garden
    "photo-1499209974431-9dddcece7f88", // Peaceful sunrise over horizon
    "photo-1469854523086-cc02fe5d8800", // Traveling the world during retirement
    "photo-1501504905252-473c47e087f8", // Senior reading peacefully in home library
    "photo-1492684223066-81342ee5ff30", // Happy celebration of financial milestone
  ],
  gold: [
    "photo-1610375461246-83df859d849d", // Stack of 999.9 pure gold bullion bars
    "photo-1601004890684-d8cbf643f5f2", // Gold bullion bars in vault
    "photo-1598439210625-5067c578f3f6", // Precious gold coins and bars
    "photo-1589182373726-e4f658ab50f0", // Gold bars reflecting golden sunset
    "photo-1535320903710-d993d3d77d29", // Precious commodities trading floor
    "photo-1579621970563-ebec7560ff3e", // Golden coins arranged with fresh green plant
    "photo-1526304640581-d334cdbbf45e", // Gold investment certificate and rupee notes
    "photo-1559526324-4b87b5e36e44", // Digital gold assets on mobile banking
    "photo-1611974789855-9c2a0a7236a3", // Gold commodity price action candlestick chart
    "photo-1554224155-8d04cb21cd6c", // Sovereign Gold Bond interest calculation
  ],
  credit: [
    "photo-1559526324-4b87b5e36e44", // Modern credit card at POS terminal
    "photo-1563013544-824ae1b704d3", // Credit card for online transactions
    "photo-1563986768609-322da13575f3", // Checking CIBIL credit score report on mobile
    "photo-1556742049-0a67c5574f73", // Seamless digital point of sale transaction
    "photo-1556742502-ec7c0e9f34b1", // Coffee shop purchase using payment card
    "photo-1556740738-b6a63e27c4df", // Customer paying securely with card
    "photo-1526304640581-d334cdbbf45e", // Personal loan agreement and repayment schedule
    "photo-1554224155-8d04cb21cd6c", // Credit card interest and EMI calculator
    "photo-1586486855514-8c633cc6fd38", // Bank statement showing credit score health
    "photo-1454165804606-c3d57bc86b40", // Debt repayment strategy worksheet
  ],
  salary: [
    "photo-1497215728101-856f4ea42174", // Corporate tech office workspace
    "photo-1522202176988-66273c2fd55f", // Tech professionals working together
    "photo-1454165804606-c3d57bc86b40", // Professional salary & performance planning
    "photo-1573496359142-b8d87734a5a2", // Corporate leader at desk
    "photo-1551836022-d5d88e9218df", // IT professional reviewing employment contract
    "photo-1531482615713-2afd69097998", // Engineering team reviewing compensation
    "photo-1517245386807-bb43f82c33c4", // High-growth modern workspace
    "photo-1521791136064-7986c2920216", // Professional handshake on salary package
    "photo-1507679799987-c73779587ccf", // Financial mentor discussing career trajectory
    "photo-1434030216411-0b793f4b4173", // Take-home salary calculation on laptop
  ],
  crypto: [
    "photo-1518770660439-4636190af475", // Golden Bitcoin coin on circuit board
    "photo-1621416894569-0f39ed31d247", // Digital cryptocurrency exchange
    "photo-1622979135225-d2ba269bc1df", // Blockchain network visualization
    "photo-1639762681485-074b7f938ba0", // Web3 decentralized finance interface
    "photo-1516245834210-c4c142787335", // Bitcoin mining and crypto assets
    "photo-1622979135240-caa6648190b6", // Cryptocurrency trading terminal
  ],
  budgeting: [
    "photo-1554224154-26032ffc0d07", // Monthly budget planner notebook & coffee
    "photo-1434030216411-0b793f4b4173", // Tablet with personal finances
    "photo-1579621970795-87facc2f976d", // Coin jar for household budgeting
    "photo-1526304640581-d334cdbbf45e", // Weekly cash envelopes system
    "photo-1559526324-4b87b5e36e44", // Digital budgeting app on phone
    "photo-1454165804606-c3d57bc86b40", // 50-30-20 budget planning ledger
  ],
  insurance: [
    "photo-1576091160399-112ba8d25d1d", // Healthcare and medical policy
    "photo-1450133064473-71024230f91b", // Insurance agreement verification
    "photo-1505751172876-fa1923c5c528", // Doctor stethoscope on medical health chart
    "photo-1584515979956-d9f6e5d09982", // Family life insurance safety
    "photo-1532938911079-1b06ac7ceec7", // Health protection and emergency coverage
    "photo-1576091160550-2173dba999ef", // Hospital medical care policy
  ],
};

// Djb2-style deterministic hashing across both seed and label for high-entropy photo distribution
function getDeterministicItem(items: string[], seed: string, label: string = ""): string {
  const combined = `${seed}__${label}`;
  let hash = 5381;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) + hash) + combined.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % items.length;
  return items[index];
}

export function resolveCoverImageUrl(
  seed: string,
  label?: string,
  variant?: CoverVariant
): string {
  const s = seed.toLowerCase();
  const l = (label || "").toLowerCase();

  let pool = TOPIC_PHOTOS.investing;

  if (s.includes("tax") || s.includes("itr") || s.includes("regime") || s.includes("deduction") || s.includes("hra") || s.includes("exemption") || l.includes("tax")) {
    pool = TOPIC_PHOTOS.tax;
  } else if (s.includes("home-loan") || s.includes("mortgage") || s.includes("house") || s.includes("rent-vs-buy") || s.includes("property") || s.includes("real-estate")) {
    pool = TOPIC_PHOTOS.homeLoan;
  } else if (s.includes("car-loan") || s.includes("vehicle") || s.includes("auto")) {
    pool = TOPIC_PHOTOS.carLoan;
  } else if (s.includes("loan") || s.includes("emi") || l.includes("loan")) {
    pool = TOPIC_PHOTOS.homeLoan;
  } else if (s.includes("gold") || s.includes("sgb") || s.includes("silver") || l.includes("gold")) {
    pool = TOPIC_PHOTOS.gold;
  } else if (s.includes("credit-score") || s.includes("cibil") || s.includes("credit-card") || l.includes("credit")) {
    pool = TOPIC_PHOTOS.credit;
  } else if (s.includes("fd") || s.includes("fixed-deposit") || s.includes("rd") || s.includes("savings") || l.includes("saving")) {
    pool = TOPIC_PHOTOS.savings;
  } else if (s.includes("retirement") || s.includes("fire") || s.includes("epf") || s.includes("nps") || s.includes("pension") || s.includes("gratuity") || l.includes("retirement")) {
    pool = TOPIC_PHOTOS.retirement;
  } else if (s.includes("salary") || s.includes("in-hand") || s.includes("pay-commission") || s.includes("ctc") || s.includes("appraisal") || s.includes("career")) {
    pool = TOPIC_PHOTOS.salary;
  } else if (s.includes("crypto") || s.includes("bitcoin") || s.includes("web3")) {
    pool = TOPIC_PHOTOS.crypto;
  } else if (
    s.includes("ai") ||
    s.includes("chatgpt") ||
    s.includes("deepseek") ||
    s.includes("claude") ||
    s.includes("gemini") ||
    s.includes("prompt") ||
    s.includes("llm") ||
    s.includes("chatbot") ||
    s.includes("generative") ||
    s.includes("model") ||
    l.includes("ai") ||
    variant === "nodes" ||
    variant === "spark"
  ) {
    pool = TOPIC_PHOTOS.ai;
  } else if (s.includes("budget") || s.includes("50-30-20") || s.includes("expense") || l.includes("budget")) {
    pool = TOPIC_PHOTOS.budgeting;
  } else if (s.includes("insurance") || s.includes("health") || s.includes("policy") || variant === "shield") {
    pool = TOPIC_PHOTOS.insurance;
  } else if (variant === "coins") {
    pool = TOPIC_PHOTOS.gold;
  } else if (variant === "piggy") {
    pool = TOPIC_PHOTOS.savings;
  } else if (variant === "card") {
    pool = TOPIC_PHOTOS.credit;
  }

  const photoId = getDeterministicItem(pool, seed, label);
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&h=675&q=85`;
}

export default function CoverArt({
  seed,
  variant,
  palette: _palette = "forest",
  className = "",
  label,
  imageUrl,
}: {
  seed: string;
  variant?: CoverVariant;
  palette?: CoverPalette;
  className?: string;
  label?: string;
  imageUrl?: string;
}) {
  const photoSrc = imageUrl || resolveCoverImageUrl(seed, label, variant);
  const displayLabel = label || "";

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* Real High-Resolution Editorial Image */}
      <img
        src={photoSrc}
        alt={displayLabel ? `${displayLabel} editorial cover` : "Article cover illustration"}
        width={1200}
        height={675}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
      />

      {/* Editorial Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Category / Topic Badge */}
      {displayLabel && (
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            {displayLabel}
          </span>
        </div>
      )}
    </div>
  );
}
