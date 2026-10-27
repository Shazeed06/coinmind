import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import AiGuidePage, { GuideH2 } from "@/components/AiGuidePage";

const slug = "what-is-mcp";
const title = "What is MCP (Model Context Protocol)? A Simple Guide";
const description =
  "MCP, the Model Context Protocol, explained in plain English: what it is, why it matters, how it works (hosts, clients, servers), who supports it, and whether it's safe — updated for 2026.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "what is mcp", "model context protocol", "mcp explained", "mcp ai", "mcp protocol",
    "how does mcp work", "mcp vs api", "mcp servers", "anthropic mcp", "mcp model context protocol",
  ],
  alternates: { canonical: `/ai-tools/${slug}` },
  openGraph: {
    type: "article", url: `${site.url}/ai-tools/${slug}`, siteName: site.name, locale: "en_IN",
    title: "What is MCP (Model Context Protocol)?", description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const faqs = [
  { q: "What is MCP in simple terms?", a: "MCP (Model Context Protocol) is an open standard that lets AI apps like Claude or ChatGPT connect to outside data and tools — your files, a database, GitHub, Slack, the web — through one common interface. It's often described as a 'USB-C port for AI': one standard plug instead of a different cable for every device." },
  { q: "Who created MCP and when?", a: "Anthropic (the maker of Claude) created and open-sourced MCP in November 2024. In December 2025 it was donated to the Agentic AI Foundation under the Linux Foundation, co-founded with Block and OpenAI, so it is now a vendor-neutral standard." },
  { q: "Is MCP the same as an API?", a: "No. An API is a specific connection to one service. MCP is a standard way for an AI to discover and use many tools at runtime without custom code for each one. It turns the 'N models × M tools' integration problem into 'N + M' — you build one MCP server per system and any MCP-compatible AI can use it." },
  { q: "Which AI apps support MCP?", a: "A growing list: Claude (desktop, web and Claude Code), ChatGPT and the OpenAI API, Google, and development tools like Visual Studio Code and Cursor. Because MCP is an open standard, you build a connection once and it works across all of them." },
  { q: "Is MCP safe to use?", a: "MCP connections are not automatically secure. A malicious server can hide harmful instructions in its tool descriptions ('tool poisoning'), so only connect servers you control or trust from reputable providers, and approve the consent screen for each one. For sensitive data, prefer self-hosted or official connectors." },
];

const sources = [
  { label: "Anthropic — Introducing the Model Context Protocol", href: "https://www.anthropic.com/news/model-context-protocol" },
  { label: "modelcontextprotocol.io — official docs", href: "https://modelcontextprotocol.io" },
];

export default function Page() {
  return (
    <AiGuidePage
      slug={slug}
      eyebrow="AI explained"
      title={title}
      intro="MCP — the Model Context Protocol — is the technology that lets AI assistants stop guessing and start working with your real data and tools. It is one of the most important shifts in AI since chatbots themselves, and it is now an open industry standard. Here is what it is, why everyone is talking about it, and how it actually works — no jargon."
      date="2026-10-27"
      faqs={faqs}
      sources={sources}
    >
      <section>
        <GuideH2>What is MCP?</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          <strong className="text-ink">MCP (Model Context Protocol) is an open standard for connecting AI applications to external systems</strong> — data sources like your files or a database, tools like a search engine or calculator, and workflows like a saved prompt. Using MCP, an AI app such as Claude or ChatGPT can reach out to those systems to fetch information and get things done, instead of relying only on what it memorised during training.
        </p>
        <p className="mt-4 leading-relaxed text-ink-soft">
          The analogy everyone uses is a <strong className="text-ink">&ldquo;USB-C port for AI.&rdquo;</strong> Just as USB-C is one standard plug for chargers, drives and monitors, MCP is one standard way to plug an AI into any tool or data source — so you don&rsquo;t need a different custom connector for every single one.
        </p>
      </section>

      <section>
        <GuideH2>Why MCP matters</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Before MCP, every AI app had to be wired to every tool separately. If you had <strong className="text-ink">N</strong> AI apps and <strong className="text-ink">M</strong> tools, that was up to <strong className="text-ink">N × M</strong> custom integrations to build and maintain — a combinatorial mess.
        </p>
        <p className="mt-4 leading-relaxed text-ink-soft">
          MCP collapses that into <strong className="text-ink">N + M</strong>: you build one MCP server per tool, and every MCP-compatible AI can use it with no extra code. Build once, connect everywhere. That single idea is why MCP was adopted across the industry within a year.
        </p>
      </section>

      <section>
        <GuideH2>How MCP works</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          MCP uses a simple client–server design with three roles:
        </p>
        <ul className="mt-4 space-y-3 text-ink-soft">
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Host</strong> — the AI app you use (Claude Desktop, ChatGPT, Cursor, VS Code). It runs the model and decides when to call a tool.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Client</strong> — the part inside the host that speaks MCP and manages a connection to one server.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Server</strong> — a small program that exposes a system (your files, GitHub, a database) to the AI through the standard protocol.</span></li>
        </ul>
        <p className="mt-5 leading-relaxed text-ink-soft">
          A server can offer three kinds of things: <strong className="text-ink">tools</strong> (actions the AI can run, like &ldquo;search&rdquo; or &ldquo;create a row&rdquo;), <strong className="text-ink">resources</strong> (data it can read, like a file or record), and <strong className="text-ink">prompts</strong> (reusable templates). Messages travel as JSON-RPC, over a local <code className="rounded bg-paper-2 px-1.5 py-0.5 text-[13px]">stdio</code> connection on your own machine or over HTTP for remote servers.
        </p>
      </section>

      <section>
        <GuideH2>Who supports MCP</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          MCP is backed by a broad ecosystem. AI assistants including <strong className="text-ink">Claude</strong> and <strong className="text-ink">ChatGPT</strong>, Google&rsquo;s tooling, and developer tools like <strong className="text-ink">Visual Studio Code</strong> and <strong className="text-ink">Cursor</strong> all support it. Anthropic created it in November 2024 and donated it to the Linux Foundation&rsquo;s Agentic AI Foundation in December 2025, making it a neutral standard rather than one company&rsquo;s product.
        </p>
      </section>

      <section>
        <GuideH2>Is MCP safe?</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          MCP makes connections easy, but it does not make them safe by default. A malicious or compromised server can describe its tools with hidden instructions the AI then follows — a risk known as <strong className="text-ink">tool poisoning</strong> — and local servers run code on your machine. The rules of thumb: only connect servers you control or trust from reputable providers, approve the consent screen for each new connection, and keep sensitive systems on self-hosted or official connectors.
        </p>
        <p className="mt-5 leading-relaxed text-ink-soft">
          Ready to see it in action? Read{" "}
          <Link href="/ai-tools/mcp-use-cases" className="font-semibold text-brand hover:underline">what modern MCP can do — use cases, popular servers and how to connect</Link>, or see{" "}
          <Link href="/ai-tools/claude-for-finance" className="font-semibold text-brand hover:underline">how to use Claude for personal finance</Link>.
        </p>
      </section>
    </AiGuidePage>
  );
}
