import Link from "next/link";
import { Section } from "@/components/ui";
import { ArrowRight, Bot, User } from "lucide-react";

export default function AiAssistant() {
  return (
    <Section variant="dark">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 text-white">
          <p className="eyebrow text-white/60">AI Assistant</p>
          <h2 className="h2 text-white mt-3">Get Instant Answers</h2>
          <p className="body text-white/60 mt-4 max-w-[480px]">
            Ask any finance question and get an instant, clear answer — powered by AI, verified for accuracy.
          </p>
          <Link
            href="/ai-assistant"
            className="mt-6 inline-flex items-center gap-2 rounded-pill bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Ask Your Question <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-7 space-y-4">
          {[
            { role: "user", text: "How much SIP do I need for ₹1 crore in 20 years?" },
            { role: "ai", text: "At 12% expected returns, you need approximately ₹10,000 per month. With a 10% annual step-up, start at ₹6,500." },
            { role: "user", text: "Which tax regime saves more for ₹15 lakh salary?" },
          ].map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "ai" ? "" : "flex-row-reverse"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-brand" : "bg-white/10"}`}>
                {msg.role === "ai" ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white/80" />}
              </div>
              <div className={`rounded-card p-4 max-w-[70%] ${msg.role === "ai" ? "bg-white/10 border border-white/10" : "bg-brand border border-brand"}`}>
                <p className={`text-sm ${msg.role === "ai" ? "text-white/80" : "text-white"}`}>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
