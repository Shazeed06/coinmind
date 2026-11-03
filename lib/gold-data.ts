// Per-city gold rate data for programmatic SEO pages.
// adj24K: city-specific addition to the base 24K price (₹ per 10g).
// South/West India typically runs ₹100-300 higher than Delhi.

export type GoldCity = {
  slug: string;
  name: string;
  state: string;
  adj24K: number; // ₹ per 10g added to the API base price
};

export const GOLD_CITIES: GoldCity[] = [
  { slug: "mumbai",            name: "Mumbai",            state: "Maharashtra",    adj24K: 0   },
  { slug: "delhi",             name: "Delhi",             state: "Delhi",          adj24K: 100 },
  { slug: "chennai",           name: "Chennai",           state: "Tamil Nadu",     adj24K: 280 },
  { slug: "kolkata",           name: "Kolkata",           state: "West Bengal",    adj24K: 160 },
  { slug: "bangalore",         name: "Bangalore",         state: "Karnataka",      adj24K: 220 },
  { slug: "hyderabad",         name: "Hyderabad",         state: "Telangana",      adj24K: 190 },
  { slug: "pune",              name: "Pune",              state: "Maharashtra",    adj24K: 50  },
  { slug: "ahmedabad",         name: "Ahmedabad",         state: "Gujarat",        adj24K: 130 },
  { slug: "jaipur",            name: "Jaipur",            state: "Rajasthan",      adj24K: 140 },
  { slug: "lucknow",           name: "Lucknow",           state: "Uttar Pradesh",  adj24K: 180 },
  { slug: "chandigarh",        name: "Chandigarh",        state: "Punjab",         adj24K: 110 },
  { slug: "bhopal",            name: "Bhopal",            state: "Madhya Pradesh", adj24K: 150 },
  { slug: "surat",             name: "Surat",             state: "Gujarat",        adj24K: 110 },
  { slug: "nagpur",            name: "Nagpur",            state: "Maharashtra",    adj24K: 100 },
  { slug: "kochi",             name: "Kochi",             state: "Kerala",         adj24K: 270 },
  { slug: "patna",             name: "Patna",             state: "Bihar",          adj24K: 200 },
  { slug: "indore",            name: "Indore",            state: "Madhya Pradesh", adj24K: 140 },
  { slug: "thiruvananthapuram",name: "Thiruvananthapuram",state: "Kerala",         adj24K: 280 },
  { slug: "visakhapatnam",     name: "Visakhapatnam",     state: "Andhra Pradesh", adj24K: 200 },
  { slug: "coimbatore",        name: "Coimbatore",        state: "Tamil Nadu",     adj24K: 290 },
  { slug: "vadodara",          name: "Vadodara",          state: "Gujarat",        adj24K: 120 },
  { slug: "guwahati",          name: "Guwahati",          state: "Assam",          adj24K: 230 },
  { slug: "noida",             name: "Noida",             state: "Uttar Pradesh",  adj24K: 110 },
  { slug: "dehradun",          name: "Dehradun",          state: "Uttarakhand",    adj24K: 160 },
  { slug: "jodhpur",           name: "Jodhpur",           state: "Rajasthan",      adj24K: 150 },
];

export const GOLD_CITY_SLUGS = GOLD_CITIES.map((c) => c.slug);

export function getGoldCity(slug: string): GoldCity | undefined {
  return GOLD_CITIES.find((c) => c.slug === slug);
}

export type GoldRateResult = {
  price24K_10g: number;  // INR per 10g, base before city adj
  usdInr: number;
  fetchedAt: string;     // ISO string
  source: "live" | "fallback";
};

// Fallback values when the API is unavailable (approximate Nov 2026 rates).
// 24K gold approx ₹8,000–9,000 per gram → ₹80,000–90,000 per 10g.
const FALLBACK_PRICE_24K_10G = 85000;
const FALLBACK_USD_INR = 84.5;

export async function fetchGoldRate(): Promise<GoldRateResult> {
  try {
    const [metalsRes, fxRes] = await Promise.all([
      fetch("https://api.metals.live/v1/spot", { next: { revalidate: 21600 } }),
      fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 21600 } }),
    ]);

    if (!metalsRes.ok || !fxRes.ok) throw new Error("API error");

    const metalsData = await metalsRes.json();
    const fxData = await fxRes.json();

    // metals.live returns [{ gold: 2654.44, silver: 31.41, ... }]
    const goldUsdOz: number = Array.isArray(metalsData)
      ? metalsData[0]?.gold
      : metalsData?.gold;

    const usdInr: number = fxData?.rates?.INR;

    if (!goldUsdOz || !usdInr) throw new Error("Missing fields");

    // 1 troy oz = 31.1035 grams
    const pricePerGram = goldUsdOz / 31.1035;
    const price24K_10g = Math.round(pricePerGram * 10 * usdInr);

    return {
      price24K_10g,
      usdInr,
      fetchedAt: new Date().toISOString(),
      source: "live",
    };
  } catch {
    return {
      price24K_10g: FALLBACK_PRICE_24K_10G,
      usdInr: FALLBACK_USD_INR,
      fetchedAt: new Date().toISOString(),
      source: "fallback",
    };
  }
}

export function computeCityRates(base24K_10g: number, adj24K: number) {
  const p24K_10g = base24K_10g + adj24K;
  const p22K_10g = Math.round(p24K_10g * (22 / 24));
  const p18K_10g = Math.round(p24K_10g * (18 / 24));

  const perGram = (p: number) => Math.round(p / 10);
  const for5g = (p: number) => Math.round(p / 2);
  const for8g = (p: number) => Math.round((p / 10) * 8);
  const for100g = (p: number) => p * 10;
  const withGst = (p: number) => Math.round(p * 1.03);

  return {
    "24K": {
      "1g":   { base: perGram(p24K_10g), gst: withGst(perGram(p24K_10g)) },
      "5g":   { base: for5g(p24K_10g),   gst: withGst(for5g(p24K_10g))   },
      "8g":   { base: for8g(p24K_10g),   gst: withGst(for8g(p24K_10g))   },
      "10g":  { base: p24K_10g,           gst: withGst(p24K_10g)           },
      "100g": { base: for100g(p24K_10g),  gst: withGst(for100g(p24K_10g)) },
    },
    "22K": {
      "1g":   { base: perGram(p22K_10g), gst: withGst(perGram(p22K_10g)) },
      "5g":   { base: for5g(p22K_10g),   gst: withGst(for5g(p22K_10g))   },
      "8g":   { base: for8g(p22K_10g),   gst: withGst(for8g(p22K_10g))   },
      "10g":  { base: p22K_10g,           gst: withGst(p22K_10g)           },
      "100g": { base: for100g(p22K_10g),  gst: withGst(for100g(p22K_10g)) },
    },
    "18K": {
      "1g":   { base: perGram(p18K_10g), gst: withGst(perGram(p18K_10g)) },
      "5g":   { base: for5g(p18K_10g),   gst: withGst(for5g(p18K_10g))   },
      "8g":   { base: for8g(p18K_10g),   gst: withGst(for8g(p18K_10g))   },
      "10g":  { base: p18K_10g,           gst: withGst(p18K_10g)           },
      "100g": { base: for100g(p18K_10g),  gst: withGst(for100g(p18K_10g)) },
    },
  };
}
