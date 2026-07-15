// AI Money Assistant backend.
//
// Provider priority (first key that exists wins):
//   1. GROQ_API_KEY   — free, fast, reliable. Get one at console.groq.com/keys
//   2. GEMINI_API_KEY — Google Gemini free tier (aistudio.google.com/apikey)
//
// Keys stay server-side; the browser never sees them. Set them in
// Vercel → Settings → Environment Variables, then redeploy.

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SYSTEM = `You are CoinMind's friendly Money & AI assistant on coinmind.in. Help people with personal finance (India + global), investing basics, taxes, budgeting, saving, and choosing/using AI tools. Rules:
- Be clear, concise and practical. Use simple language and short paragraphs or bullet points.
- You give general educational information, NOT personalised financial advice. For big or specific decisions, remind the user to verify figures and consider a qualified professional.
- Where relevant, mention that CoinMind has free calculators (SIP, EMI, income tax, take-home salary, goal/crorepati SIP, etc.) they can use.
- Never invent exact numbers, rates or laws you are unsure about; say what generally applies and suggest confirming current figures.
- If asked something outside money/AI, answer briefly and steer back.`;

type Msg = { role: "user" | "assistant"; content: string };

const env = (...names: string[]) => {
  for (const n of names) {
    const v = process.env[n];
    if (v && v.trim()) return v.trim();
  }
  return "";
};

// ---- Groq (OpenAI-compatible) -------------------------------------------
async function callGroq(key: string, messages: Msg[]): Promise<string | null> {
  const models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
  const body = (model: string) =>
    JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

  for (const model of models) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: body(model),
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content;
        if (reply) return reply;
      }
    } catch {
      /* try next model */
    }
  }
  return null;
}

// ---- Gemini --------------------------------------------------------------
async function callGemini(key: string, messages: Msg[]): Promise<string | null> {
  const models = [
    "gemini-flash-latest",
    "gemini-2.0-flash-001",
    "gemini-2.0-flash-lite",
  ];
  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: { temperature: 0.6, maxOutputTokens: 800 },
  });

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        }
      );
      if (res.ok) {
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text)
          .join("");
        if (reply) return reply;
      }
    } catch {
      /* try next model */
    }
  }
  return null;
}

export async function POST(req: Request) {
  const groqKey = env("GROQ_API_KEY", "groq_api_key");
  const geminiKey = env("GEMINI_API_KEY", "gemini_api_key");

  if (!groqKey && !geminiKey) {
    return Response.json(
      {
        error: "not_configured",
        reply:
          "The AI assistant isn't switched on yet. Add a free GROQ_API_KEY (from console.groq.com/keys) in the site's environment variables to enable it.",
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

  // Prefer Groq (reliable free tier); fall back to Gemini if configured.
  let reply: string | null = null;
  if (groqKey) reply = await callGroq(groqKey, messages);
  if (!reply && geminiKey) reply = await callGemini(geminiKey, messages);

  if (reply) return Response.json({ reply });

  return Response.json(
    {
      error: "upstream",
      reply:
        "The assistant is very busy right now — please try again in a moment.",
    },
    { status: 200 }
  );
}
