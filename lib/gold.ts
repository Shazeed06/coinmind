// Gold & silver spot prices in INR, via MetalpriceAPI.
//
// The API KEY is read from the METALPRICE_API_KEY environment variable — set it
// in Vercel (Project → Settings → Environment Variables). It is NEVER hardcoded
// here, because this repo is public and a committed key would be exposed.
//
// NOTE on the free plan: data is delayed ~24h and is "non-commercial use only".
// CoinMind serves ads (commercial), so a paid MetalpriceAPI plan is required for
// compliant, real-time use — the code below works unchanged once you upgrade.
//
// Attribution ("Rates via MetalpriceAPI") is shown on the page as the free plan
// requires it.

const OUNCE_IN_GRAMS = 31.1034768; // one troy ounce

export type GoldRates = {
  ok: boolean;
  base: "INR";
  gold24kPerGram: number;
  gold22kPerGram: number;
  gold24kPer10g: number;
  gold22kPer10g: number;
  silverPerGram: number;
  silverPerKg: number;
  updated: string | null; // ISO timestamp of the upstream data
  reason?: string; // set when ok === false
};

const EMPTY: GoldRates = {
  ok: false,
  base: "INR",
  gold24kPerGram: 0,
  gold22kPerGram: 0,
  gold24kPer10g: 0,
  gold22kPer10g: 0,
  silverPerGram: 0,
  silverPerKg: 0,
  updated: null,
};

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Fetch the latest gold & silver prices and convert to INR per gram / 10g / kg.
 * MetalpriceAPI returns rates as the inverse of the price (rates.XAU = troy
 * ounces of gold per 1 INR), so the INR price per ounce is 1 / rate.
 * Cached for 12 hours to stay well within the free-plan request quota.
 */
export async function getGoldRates(): Promise<GoldRates> {
  const key = process.env.METALPRICE_API_KEY;
  if (!key) return { ...EMPTY, reason: "missing_api_key" };

  try {
    const url =
      `https://api.metalpriceapi.com/v1/latest?api_key=${key}` +
      `&base=INR&currencies=XAU,XAG`;
    const res = await fetch(url, { next: { revalidate: 43200 } });
    if (!res.ok) return { ...EMPTY, reason: "upstream_error" };

    const data = await res.json();
    const xau = data?.rates?.XAU;
    const xag = data?.rates?.XAG;
    if (!data?.success || !xau || !xag) {
      return { ...EMPTY, reason: "bad_response" };
    }

    const inrPerOunceGold = 1 / xau;
    const inrPerOunceSilver = 1 / xag;
    const gold24kPerGram = inrPerOunceGold / OUNCE_IN_GRAMS;
    const gold22kPerGram = gold24kPerGram * (22 / 24);
    const silverPerGram = inrPerOunceSilver / OUNCE_IN_GRAMS;

    return {
      ok: true,
      base: "INR",
      gold24kPerGram: round(gold24kPerGram),
      gold22kPerGram: round(gold22kPerGram),
      gold24kPer10g: round(gold24kPerGram * 10),
      gold22kPer10g: round(gold22kPerGram * 10),
      silverPerGram: round(silverPerGram),
      silverPerKg: round(silverPerGram * 1000),
      updated: data?.timestamp
        ? new Date(data.timestamp * 1000).toISOString()
        : null,
    };
  } catch {
    return { ...EMPTY, reason: "fetch_failed" };
  }
}
