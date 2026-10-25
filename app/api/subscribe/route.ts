// POST /api/subscribe: adds a newsletter signup to the Resend audience.
//
// Configure with environment variables (set these in Vercel - never commit a
// key):
//   RESEND_API_KEY     - Resend secret API key (re_...)
//   RESEND_AUDIENCE_ID - the audience (contact list) to add subscribers to
//
// Until both are set, the route returns 503 and the form reports that signup is
// not available, rather than silently dropping the email.
export const dynamic = "force-dynamic";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL.test(email)) {
    return Response.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  // The audience id is not a secret, so it defaults to the CoinMind "General"
  // audience and only needs an env override to point at a different list.
  const audienceId =
    process.env.RESEND_AUDIENCE_ID || "5fd941a2-2e8a-4d9b-a06b-060dfd57eff6";
  if (!apiKey) {
    return Response.json(
      { error: "Newsletter signup is not available right now." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      },
    );

    // Resend returns 409 when the contact already exists - that is still a
    // successful subscribe from the visitor's point of view.
    if (res.ok || res.status === 409) {
      return Response.json({ ok: true });
    }

    console.error("Resend subscribe failed", res.status, await res.text());
    return Response.json(
      { error: "Could not subscribe right now. Please try again later." },
      { status: 502 },
    );
  } catch (err) {
    console.error("Resend subscribe error", err);
    return Response.json(
      { error: "Could not subscribe right now. Please try again later." },
      { status: 500 },
    );
  }
}
