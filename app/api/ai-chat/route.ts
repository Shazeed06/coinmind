// AI backend for CoinMind — powers the Money Assistant AND the AI tools
// (summariser, paraphraser, grammar, email/cover-letter, name & caption gen).
//
// Provider priority (first key that exists wins):
//   1. DEEPSEEK_API_KEY — DeepSeek (paid, very cheap). platform.deepseek.com/api_keys
//   2. GROQ_API_KEY     — free, fast, reliable. console.groq.com/keys
//   3. GEMINI_API_KEY   — Google Gemini (free tier unreliable). aistudio.google.com/apikey
//
// DeepSeek & Groq are OpenAI-compatible; Gemini uses its own REST shape.
// Keys stay server-side; the browser never sees them.
//
// POST body: { messages: [{role,content}], system?: string }
// Tools pass their own `system` instruction; the Money Assistant omits it and
// gets the default finance/AI persona below.

export const dynamic = "force-dynamic";
// DeepSeek can occasionally be slow under load; give the request headroom
// (Vercel Hobby allows up to 60s) so real users don't hit a function timeout.
export const maxDuration = 60;

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

// ---- OpenAI-compatible providers (DeepSeek, Groq) ------------------------
async function callOpenAICompatible(
  endpoint: string,
  key: string,
  models: string[],
  messages: Msg[],
  system: string
): Promise<string | null> {
  const body = (model: string) =>
    JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.6,
      max_tokens: 1500,
    });

  for (const model of models) {
    try {
      const res = await fetch(endpoint, {
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

// ---- Gemini (Google's own REST shape) ------------------------------------
async function callGemini(
  key: string,
  messages: Msg[],
  system: string
): Promise<string | null> {
  const models = [
    "gemini-flash-latest",
    "gemini-2.0-flash-001",
    "gemini-2.0-flash-lite",
  ];
  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: { temperature: 0.6, maxOutputTokens: 1500 },
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
  const deepseekKey = env("DEEPSEEK_API_KEY", "deepseek_api_key");
  const groqKey = env("GROQ_API_KEY", "groq_api_key");
  const geminiKey = env("GEMINI_API_KEY", "gemini_api_key");

  if (!deepseekKey && !groqKey && !geminiKey) {
    return Response.json(
      {
        error: "not_configured",
        reply:
          "The AI isn't switched on yet. Add a DEEPSEEK_API_KEY (or a free GROQ_API_KEY) in the site's environment variables to enable it.",
      },
      { status: 200 }
    );
  }

  let messages: Msg[] = [];
  let system = SYSTEM;
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
    // Tools supply their own system instruction (summarise, rewrite, etc.).
    if (typeof body?.system === "string" && body.system.trim()) {
      system = body.system.trim().slice(0, 4000);
    }
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Basic abuse guards: cap history + message length (generous for tool inputs).
  messages = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 8000),
  }));
  if (!messages.length) {
    return Response.json({ error: "empty" }, { status: 400 });
  }

  // Try providers in priority order until one returns a reply.
  let reply: string | null = null;
  if (deepseekKey) {
    reply = await callOpenAICompatible(
      "https://api.deepseek.com/chat/completions",
      deepseekKey,
      ["deepseek-chat"],
      messages,
      system
    );
  }
  if (!reply && groqKey) {
    reply = await callOpenAICompatible(
      "https://api.groq.com/openai/v1/chat/completions",
      groqKey,
      ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
      messages,
      system
    );
  }
  if (!reply && geminiKey) reply = await callGemini(geminiKey, messages, system);

  if (reply) return Response.json({ reply });

  return Response.json(
    {
      error: "upstream",
      reply: "The AI is very busy right now — please try again in a moment.",
    },
    { status: 200 }
  );
}
