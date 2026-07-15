// AI Money Assistant backend — proxies to Google Gemini (free tier).
// Set GEMINI_API_KEY in the environment (Vercel → Settings → Environment
// Variables). Get a free key at https://aistudio.google.com/apikey.
// The key stays server-side; the browser never sees it.

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SYSTEM = `You are CoinMind's friendly Money & AI assistant on coinmind.in. Help people with personal finance (India + global), investing basics, taxes, budgeting, saving, and choosing/using AI tools. Rules:
- Be clear, concise and practical. Use simple language and short paragraphs or bullet points.
- You give general educational information, NOT personalised financial advice. For big or specific decisions, remind the user to verify figures and consider a qualified professional.
- Where relevant, mention that CoinMind has free calculators (SIP, EMI, income tax, take-home salary, goal/crorepati SIP, etc.) they can use.
- Never invent exact numbers, rates or laws you are unsure about; say what generally applies and suggest confirming current figures.
- If asked something outside money/AI, answer briefly and steer back.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  // Env var names are case-sensitive; accept the conventional upper-case name
  // as well as the lower-case one that was configured on Vercel.
  const key = (
    process.env.GEMINI_API_KEY ||
    process.env.gemini_api_key ||
    ""
  ).trim();
  if (!key) {
    return Response.json(
      {
        error: "not_configured",
        reply:
          "The AI assistant isn't set up yet. Add a free GEMINI_API_KEY (from aistudio.google.com/apikey) in the site's environment variables to switch it on.",
      },
      { status: 200 }
    );
  }

  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Basic abuse guards: cap history + message length.
  messages = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 2000),
  }));
  if (!messages.length) {
    return Response.json({ error: "empty" }, { status: 400 });
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 800 },
        }),
      }
    );

    if (!res.ok) {
      const status = res.status;
      const detail = (await res.text()).slice(0, 600); // temp diagnostic
      const reply =
        status === 429
          ? "The assistant is getting a lot of questions right now — please try again in a minute."
          : "Sorry, the assistant hit a snag. Please try again.";
      return Response.json({ error: "upstream", status, reply, detail }, { status: 200 });
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ||
      "I couldn't generate a reply just now — please try rephrasing.";
    return Response.json({ reply });
  } catch {
    return Response.json(
      { error: "network", reply: "Network issue reaching the assistant. Please try again." },
      { status: 200 }
    );
  }
}
