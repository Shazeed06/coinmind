// Live exchange rates via a free, no-key API (open.er-api.com), cached 1 hour.
// Proxied server-side so the browser has no CORS issues and we control caching.
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("upstream");
    const data = await res.json();
    return Response.json({
      base: "USD",
      rates: data.rates || {},
      updated: data.time_last_update_utc || null,
    });
  } catch {
    return Response.json({ error: "rates_unavailable" }, { status: 200 });
  }
}
