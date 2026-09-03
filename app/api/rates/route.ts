// Live exchange rates via a free, no-key API (open.er-api.com, operated by
// Exchange Rate API), cached 1 hour. Proxied server-side so the browser has no
// CORS issues and we control caching.
//
// This is the same upstream that app/currency/[slug]/page.tsx reads, so an
// outage hits both at once. The browser converter therefore cannot "keep
// working" independently of the page, and nothing on the site claims it does.
// What it can do is fall back to the last payload this process fetched
// successfully, returned with stale:true so the UI labels it instead of
// passing it off as live.
export const revalidate = 3600;

const UPSTREAM = "https://open.er-api.com/v6/latest/USD";
const SOURCE = "open.er-api.com";

type Payload = {
  base: string;
  rates: Record<string, number>;
  updated: string | null;
};

// Last successful upstream payload, held in module memory. Best effort only: a
// cold serverless instance starts with nothing, in which case the response is
// the plain "unavailable" error, never an invented number.
let lastGood: Payload | null = null;

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("upstream");
    const data = await res.json();
    if (!data?.rates) throw new Error("no rates");
    lastGood = {
      base: "USD",
      rates: data.rates,
      updated: data.time_last_update_utc || null,
    };
    return Response.json({ ...lastGood, stale: false, source: SOURCE });
  } catch {
    if (lastGood) {
      return Response.json({ ...lastGood, stale: true, source: SOURCE });
    }
    return Response.json(
      { error: "rates_unavailable", source: SOURCE },
      { status: 200 }
    );
  }
}
