import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import AiGuidePage, { GuideH2, PromptBox } from "@/components/AiGuidePage";

const slug = "mcp-use-cases";
const title = "What Modern MCP Can Do: Use Cases, Servers & How to Connect";
const description =
  "What you can actually do with MCP in 2026 — real use cases, the most popular MCP servers (GitHub, Google Drive, Slack, databases, web), how to connect MCP to Claude and Cursor, and the best prompts to try.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "mcp use cases", "what can mcp do", "mcp servers", "best mcp servers", "how to connect mcp",
    "mcp claude desktop setup", "mcp examples", "connect mcp to claude", "mcp server list", "mcp prompts",
  ],
  alternates: { canonical: `/ai-tools/${slug}` },
  openGraph: {
    type: "article", url: `${site.url}/ai-tools/${slug}`, siteName: site.name, locale: "en_IN",
    title: "What Modern MCP Can Do — Use Cases, Servers & Setup", description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const SERVERS = [
  { name: "Filesystem", does: "Read, write and search files and folders on your computer." },
  { name: "GitHub / Git", does: "Browse repos, read code, open issues and pull requests." },
  { name: "Google Drive", does: "Find and read your Docs, Sheets and files." },
  { name: "Slack", does: "Read channels and messages, post updates." },
  { name: "PostgreSQL / SQLite", does: "Query a database in plain English." },
  { name: "Brave Search / Fetch", does: "Search the live web and read pages." },
  { name: "Puppeteer / Playwright", does: "Control a browser to click, fill forms and scrape." },
  { name: "Memory", does: "Remember facts and preferences across conversations." },
];

const faqs = [
  { q: "What can you actually do with MCP?", a: "Connect an AI to the things you already use: read and edit your files, query a database in plain English, browse GitHub, search the live web, post to Slack, remember context across chats, and automate multi-step workflows. The AI stops guessing and works with your real data." },
  { q: "How do I connect an MCP server to Claude Desktop?", a: "Open Claude Desktop settings, go to Developer → Edit Config, and add the server under 'mcpServers' in claude_desktop_config.json with its command and arguments. Save, restart Claude Desktop, and the server's tools appear. Many servers can also be added from Claude's connector directory with a click." },
  { q: "Do I need to code to use MCP?", a: "No. You can install ready-made servers from the official repository or a connector directory and use them as-is. Coding is only needed if you want to build a custom server for your own private system." },
  { q: "What are the best MCP servers to start with?", a: "Filesystem (read your files), Fetch or Brave Search (live web), GitHub (for developers), and Google Drive (for documents) are the most useful first servers. Add a database or memory server as your needs grow." },
  { q: "Is it free?", a: "The protocol and most open-source servers are free. You still pay for the AI app (for example Claude Pro) and for any paid third-party service a server connects to. Running local servers uses your own machine." },
];

const sources = [
  { label: "modelcontextprotocol.io — reference servers", href: "https://github.com/modelcontextprotocol/servers" },
  { label: "Anthropic — Model Context Protocol", href: "https://www.anthropic.com/news/model-context-protocol" },
];

export default function Page() {
  return (
    <AiGuidePage
      slug={slug}
      eyebrow="AI explained"
      title={title}
      intro="Once you connect MCP, your AI assistant can do far more than chat. It can read your files, query your database, browse the web, work with GitHub and Slack, and run real multi-step tasks. Here's what modern MCP can do, the most popular servers to plug in, how to connect one to Claude or Cursor, and the prompts worth trying first."
      date="2026-10-27"
      faqs={faqs}
      sources={sources}
    >
      <section>
        <GuideH2>What modern MCP can do</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          MCP turns an AI from a clever writer into a capable assistant that acts on your real world. With the right servers connected, you can:
        </p>
        <ul className="mt-4 space-y-2.5 text-ink-soft">
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Work with your own files and data</strong> — &ldquo;summarise every PDF in this folder&rdquo; or &ldquo;find the invoice from March.&rdquo;</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Query a database in plain English</strong> — no SQL needed; the AI writes and runs it.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Search the live web and read pages</strong> — up-to-date answers beyond the model&rsquo;s training cutoff.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Use your business tools</strong> — GitHub, Slack, Google Drive, a CRM — from one chat.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Remember context</strong> across conversations, and automate multi-step workflows end to end.</span></li>
        </ul>
      </section>

      <section>
        <GuideH2>Popular MCP servers</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          These are among the most-used ready-made servers — install one and its tools appear inside your AI app.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-y border-line bg-paper-2 text-left text-ink">
                <th className="px-3 py-2.5 font-semibold">Server</th>
                <th className="px-3 py-2.5 font-semibold">What it lets the AI do</th>
              </tr>
            </thead>
            <tbody className="text-ink-soft">
              {SERVERS.map((s) => (
                <tr key={s.name} className="border-b border-line">
                  <td className="px-3 py-2.5 font-medium text-ink">{s.name}</td>
                  <td className="px-3 py-2.5">{s.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <GuideH2>How to connect MCP to Claude Desktop</GuideH2>
        <ol className="mt-4 space-y-2.5 text-ink-soft">
          <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">1</span><span>Open <strong className="text-ink">Claude Desktop → Settings → Developer → Edit Config</strong>. This opens <code className="rounded bg-paper-2 px-1.5 py-0.5 text-[13px]">claude_desktop_config.json</code>.</span></li>
          <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">2</span><span>Add the server under <code className="rounded bg-paper-2 px-1.5 py-0.5 text-[13px]">mcpServers</code> with its command and arguments.</span></li>
          <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">3</span><span>Save and <strong className="text-ink">restart Claude Desktop</strong>. The server&rsquo;s tools now appear in the chat.</span></li>
          <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">4</span><span>Approve the consent prompt the first time the AI uses it.</span></li>
        </ol>
        <figure className="mt-5 overflow-hidden rounded-2xl border border-line bg-paper-2">
          <figcaption className="border-b border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand">claude_desktop_config.json — example (Filesystem server)</figcaption>
          <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed text-ink">{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/your/folder"]
    }
  }
}`}</pre>
        </figure>
        <p className="mt-4 leading-relaxed text-ink-soft">
          In <strong className="text-ink">Cursor</strong> or <strong className="text-ink">VS Code</strong> the idea is the same — add the server in the MCP settings and it becomes available to the AI. Many servers are also one-click installs from a connector directory, so you may not need to touch the config file at all.
        </p>
      </section>

      <section>
        <GuideH2>Best prompts to try first</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Once a server is connected, these prompts show what it can do:
        </p>
        <PromptBox label="With the Filesystem server" prompt={`Look through the files in my connected folder. List the 5 largest documents, give a one-line summary of each, and flag anything that looks like a duplicate.`} />
        <PromptBox label="With a database server" prompt={`Connect to my database and, in plain English: show total sales by month this year, the top 10 customers by revenue, and any months where sales dropped more than 20% vs the month before. Write and run the SQL, and show it to me.`} />
        <PromptBox label="With a web search / fetch server" prompt={`Search the web for the current RBI repo rate and the latest PPF interest rate, open the official sources, and give me both numbers with the date and a link. Only use official or primary sources.`} />
      </section>

      <section>
        <GuideH2>Stay safe</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Only connect servers you control or trust from reputable providers — a malicious server can hide harmful instructions in its tool descriptions. Approve each new connection deliberately, give file/database servers the narrowest access they need, and keep anything sensitive on self-hosted or official connectors. New to all this? Start with{" "}
          <Link href="/ai-tools/what-is-mcp" className="font-semibold text-brand hover:underline">what MCP is</Link>, then try{" "}
          <Link href="/ai-tools/claude-for-finance" className="font-semibold text-brand hover:underline">Claude for personal finance</Link>.
        </p>
      </section>
    </AiGuidePage>
  );
}
