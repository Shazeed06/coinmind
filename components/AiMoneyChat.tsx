"use client";

import { useRef, useState, useEffect } from "react";
import { IconArrow, IconSparkle } from "@/components/icons";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "How much SIP to reach ₹1 crore in 15 years?",
  "New vs old tax regime — which is better for me?",
  "How do I start investing with ₹5,000 a month?",
  "Best free AI tools for students?",
];

export default function AiMoneyChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([
        ...next,
        { role: "assistant", content: data.reply || "Sorry, please try again." },
      ]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Network issue — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-card overflow-hidden flex flex-col h-[560px]">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-soft text-forest">
              <IconSparkle className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-600 text-ink">
              Ask me anything about money & AI
            </h2>
            <p className="mt-2 text-ink-soft max-w-md">
              Free, instant answers on investing, taxes, saving and AI tools. Try
              one of these:
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-2 w-full max-w-lg">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm rounded-xl border border-line px-3.5 py-2.5 text-ink-soft hover:border-forest hover:text-forest transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-forest text-white"
                  : "bg-paper-2 text-ink"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-paper-2 px-4 py-3 text-sm text-ink-faint">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-line p-3 sm:p-4 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder="Ask about SIP, tax, budgeting, AI tools…"
          className="flex-1 resize-none rounded-xl border border-line-strong bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-forest transition-colors max-h-32"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-white transition-colors hover:bg-forest-deep disabled:opacity-40"
          aria-label="Send"
        >
          <IconArrow className="h-5 w-5" />
        </button>
      </form>

      <p className="px-4 pb-3 text-[11px] text-ink-faint text-center">
        Educational information, not personalised financial advice. Verify figures
        before acting.
      </p>
    </div>
  );
}
