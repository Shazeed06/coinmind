import { getGoldRates } from "@/lib/gold";

// GET /api/gold — gold & silver prices in INR (per gram / 10g / kg), proxied
// server-side (key stays on the server) and cached. Returns ok:false gracefully
// when the METALPRICE_API_KEY env var isn't set or the upstream is unavailable.
export const revalidate = 43200; // 12 hours

export async function GET() {
  const rates = await getGoldRates();
  return Response.json(rates);
}
