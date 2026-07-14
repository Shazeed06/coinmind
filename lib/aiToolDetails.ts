// Rich, per-tool content for the dedicated AI tool pages.
// Keyed by `name` which must match the corresponding entry in `aiTools` (data.ts).
// Websites are the official sites (best-known); confirm before adding affiliate links.

export type AiToolDetail = {
  slug: string;
  name: string;
  website: string;
  overview: string;
  useCases: string[];
  hacks: string[];
};

export const aiToolDetails: AiToolDetail[] = [
  /* ------------------------------- USA ------------------------------- */
  {
    slug: "chatgpt",
    name: "ChatGPT",
    website: "https://chatgpt.com",
    overview:
      "ChatGPT is the assistant that took AI mainstream. It handles writing, coding, analysis, images and voice in one place, and has the largest ecosystem of custom GPTs and integrations of any AI tool. For most people, it's the easiest place to start.",
    useCases: [
      "Draft and polish emails, reports and posts",
      "Brainstorm ideas and outlines in seconds",
      "Explain hard topics in simple language",
      "Write, debug and explain code",
      "Analyse an uploaded file, PDF or screenshot",
    ],
    hacks: [
      "Add “think step by step” to get better answers on tricky problems.",
      "Upload a screenshot or file and ask questions about it directly.",
      "Build a Custom GPT with your instructions so you never repeat context.",
      "Use Voice mode for hands-free brainstorming on the go.",
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    website: "https://claude.ai",
    overview:
      "Claude is prized for the most natural writing and careful reasoning, plus a very large context window that lets it read entire books, contracts or codebases in one go. It's the pick for anyone who writes, analyses or codes seriously.",
    useCases: [
      "Long-form writing and heavy editing",
      "Summarising very long documents or reports",
      "Coding across large, multi-file projects",
      "Spreadsheet and data analysis",
      "Nuanced research and reasoning",
    ],
    hacks: [
      "Paste a whole document and ask for a structured summary or critique.",
      "Use Projects to keep files and instructions across many chats.",
      "Ask it to “be a skeptical editor” for genuinely sharper feedback.",
      "Give it 2–3 samples of your writing so it matches your tone.",
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    website: "https://gemini.google.com",
    overview:
      "Gemini is Google's assistant, deeply woven into Search, Android, Gmail and Workspace, and especially strong at multimodal tasks across text, image and video. If you live in Google's apps, it's right there with you.",
    useCases: [
      "Research with fresh, search-connected info",
      "Summarise Gmail threads and Google Docs",
      "Analyse images and video",
      "Draft directly inside Google Workspace",
      "On-the-go help as your Android assistant",
    ],
    hacks: [
      "Use the “Help me write” button inside Docs and Gmail.",
      "Ask for sources when you need to verify a fact.",
      "Upload an image or screenshot for an instant explanation.",
      "It's free on Android — set it as your default assistant.",
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    website: "https://perplexity.ai",
    overview:
      "Perplexity is an AI answer engine that cites live web sources for every answer. It's the tool to reach for when you need facts you can actually verify rather than a confident guess.",
    useCases: [
      "Fact-checked research with real sources",
      "Comparing products before you buy",
      "Academic and finance research",
      "Quick, current-events summaries",
      "Replacing ten open Google tabs",
    ],
    hacks: [
      "Click the cited source links to verify before trusting an answer.",
      "Switch Focus modes (Academic, Finance) for better results.",
      "Ask follow-up questions — it keeps the thread's context.",
      "Use it as your default for anything research-heavy.",
    ],
  },
  {
    slug: "microsoft-copilot",
    name: "Microsoft Copilot",
    website: "https://copilot.microsoft.com",
    overview:
      "Microsoft Copilot brings AI right into Windows and Office. You can draft in Word, analyse in Excel, summarise Outlook threads and get help across the Microsoft ecosystem without leaving your work.",
    useCases: [
      "Summarise a long Outlook email thread",
      "Generate Excel formulas and analysis",
      "Draft and rewrite in Word",
      "Create PowerPoint outlines fast",
      "Everyday Q&A from the Windows sidebar",
    ],
    hacks: [
      "In Excel, describe what you want and let it write the formula.",
      "Summarise a long thread before you reply in Outlook.",
      "It's free on the web and in the Windows taskbar.",
      "The paid enterprise plan keeps your company data private.",
    ],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    website: "https://github.com/features/copilot",
    overview:
      "GitHub Copilot is autocomplete-on-steroids for developers. It suggests whole functions as you type and can chat about your code inside VS Code, JetBrains and more.",
    useCases: [
      "Autocomplete code as you type",
      "Write unit tests automatically",
      "Explain unfamiliar code",
      "Fix bugs via chat",
      "Scaffold boilerplate quickly",
    ],
    hacks: [
      "Write a clear comment describing a function — Copilot fills it in.",
      "Use Copilot Chat to explain or refactor selected code.",
      "The free tier is plenty for students and hobby projects.",
      "Ask it to write tests for the function you just wrote.",
    ],
  },
  {
    slug: "cursor",
    name: "Cursor",
    website: "https://cursor.com",
    overview:
      "Cursor is an AI-first code editor that understands your whole project, not just one file. Its agent mode can build entire features from a description, making it a favourite for developers shipping real software.",
    useCases: [
      "Edit across many files at once",
      "Build a feature end-to-end from a prompt",
      "Refactor a large codebase safely",
      "Debug with full-project context",
      "Learn an unfamiliar codebase quickly",
    ],
    hacks: [
      "Use Agent mode to implement a whole feature from one description.",
      "@-mention files to give it exactly the right context.",
      "Accept changes diff-by-diff so everything stays reviewable.",
      "Start on the free Hobby tier before you pay.",
    ],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    website: "https://midjourney.com",
    overview:
      "Midjourney is still the gold standard for beautiful, artistic AI images, with powerful style and reference controls that designers and marketers rely on for polished visuals.",
    useCases: [
      "Marketing and ad visuals",
      "Concept art and illustration",
      "Social media graphics",
      "Product mockups",
      "Mood boards and brand exploration",
    ],
    hacks: [
      "Add “--ar 16:9” for widescreen or “--ar 9:16” for reels.",
      "Drop a reference image to steer the style.",
      "Name lighting and lens for realism, e.g. “golden hour, 35mm”.",
      "Use style references to keep a consistent brand look.",
    ],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    website: "https://elevenlabs.io",
    overview:
      "ElevenLabs makes the most natural-sounding AI speech available. You can generate realistic voices or clone your own for videos, podcasts and narration in 30+ languages including Hindi.",
    useCases: [
      "Voiceovers for videos and reels",
      "Podcast intros and narration",
      "Audiobook narration",
      "Multilingual dubbing",
      "Text-to-speech for accessibility",
    ],
    hacks: [
      "Clone your own voice from a short, clean sample.",
      "Tune the stability and clarity sliders for more or less expression.",
      "Mix Hindi and English narration in the same project.",
      "Use the free tier to test before committing.",
    ],
  },
  {
    slug: "runway",
    name: "Runway",
    website: "https://runwayml.com",
    overview:
      "Runway offers text-to-video and pro-grade AI editing tools used by real film and ad studios. Turn a prompt or an image into a short video clip in minutes.",
    useCases: [
      "Short video clips from text",
      "B-roll and background footage",
      "AI-assisted video editing",
      "Motion graphics",
      "Ad creatives",
    ],
    hacks: [
      "Start from an image for more control over the output.",
      "Keep prompts short and specific about the motion you want.",
      "Use free starter credits to test the waters.",
      "Pair it with ElevenLabs voice for a finished video.",
    ],
  },
  {
    slug: "grok",
    name: "Grok",
    website: "https://x.ai",
    overview:
      "Grok is xAI's assistant with real-time access to posts on X and a more casual, less-restricted tone. Image generation is built in, and it shines on trending, up-to-the-minute topics.",
    useCases: [
      "Awareness of trending topics on X",
      "Casual, conversational Q&A",
      "Image generation",
      "Summarising live X discussions",
      "Edgier creative writing",
    ],
    hacks: [
      "Ask about trending topics for the freshest, real-time takes.",
      "It's built into X for premium subscribers.",
      "Reach for it when other assistants feel too restrictive.",
      "Great for quick real-time event summaries.",
    ],
  },

  /* ------------------------------ CHINA ------------------------------ */
  {
    slug: "deepseek",
    name: "DeepSeek",
    website: "https://deepseek.com",
    overview:
      "DeepSeek is the open model that shook the industry — frontier-level reasoning, maths and coding at a fraction of the usual cost, and free to use on web and app. A genuine budget powerhouse.",
    useCases: [
      "Hard maths and logic problems",
      "Coding help and debugging",
      "Cheap API for developers",
      "Step-by-step reasoning tasks",
      "Private self-hosting (open weights)",
    ],
    hacks: [
      "Turn on the reasoning/“think” mode for tough problems.",
      "Its API is extremely cheap for building apps.",
      "It's free on web and app — a great budget alternative.",
      "Open weights mean you can run it privately.",
    ],
  },
  {
    slug: "qwen",
    name: "Qwen (Tongyi)",
    website: "https://chat.qwen.ai",
    overview:
      "Qwen is Alibaba's powerful family of open models spanning text, image, audio and video, with strong multilingual support and permissive licensing that developers love.",
    useCases: [
      "Multilingual (especially Asian language) tasks",
      "Building on open-source models",
      "Image and text understanding",
      "Self-hosting for privacy",
      "Coding",
    ],
    hacks: [
      "Excellent for non-English languages.",
      "Open models you can fine-tune and self-host for free.",
      "Try different model sizes to balance speed vs quality.",
      "A strong free option for developers.",
    ],
  },
  {
    slug: "doubao",
    name: "Doubao",
    website: "https://doubao.com",
    overview:
      "Doubao is ByteDance's assistant — one of China's most-used AI apps. It's fast and friendly with very low API pricing at scale, and deeply tied into ByteDance's apps.",
    useCases: [
      "Fast everyday assistant",
      "Content creation",
      "Cheap API at high volume",
      "Chinese-language tasks",
      "Casual chat",
    ],
    hacks: [
      "Very low API cost makes it great for high-volume apps.",
      "Best suited to Chinese-language use cases.",
      "Deeply integrated with ByteDance apps.",
      "Snappy responses for everyday questions.",
    ],
  },
  {
    slug: "kimi",
    name: "Kimi",
    website: "https://kimi.com",
    overview:
      "Kimi, by Moonshot AI, is famous for its extremely long context window. It can read whole books, long reports and big documents in a single conversation — and it's free.",
    useCases: [
      "Analysing very long documents",
      "Reading and summarising research papers",
      "Summarising entire books",
      "Contract and report review",
      "Q&A over large files",
    ],
    hacks: [
      "Upload very long documents it can read in one pass.",
      "A great free option for heavy reading and summarising.",
      "Ask for a structured summary of a long PDF.",
      "Strong on both Chinese and English.",
    ],
  },
  {
    slug: "ernie-bot",
    name: "Ernie Bot",
    website: "https://yiyan.baidu.com",
    overview:
      "Ernie Bot is Baidu's flagship assistant, tightly linked to China's biggest search engine. It offers strong Chinese-language performance and built-in image generation.",
    useCases: [
      "Chinese-language Q&A",
      "Image generation",
      "Search-connected answers",
      "Content drafting",
      "Everyday help",
    ],
    hacks: [
      "It's strongest on Chinese-language tasks.",
      "Image generation is built in.",
      "There's a free tier for casual use.",
      "Connected to Baidu search for local info.",
    ],
  },
  {
    slug: "hunyuan",
    name: "Hunyuan",
    website: "https://hunyuan.tencent.com",
    overview:
      "Hunyuan is Tencent's model powering assistants, image and even 3D generation across the WeChat ecosystem, with open-source variants available for developers.",
    useCases: [
      "Text, image and 3D generation",
      "Apps in the Tencent/WeChat ecosystem",
      "Content creation",
      "Open-source development",
      "Everyday assistant",
    ],
    hacks: [
      "Rare 3D-generation capability among mainstream models.",
      "Open-source variants are available for developers.",
      "Free to use.",
      "Integrated across Tencent and WeChat apps.",
    ],
  },
  {
    slug: "glm",
    name: "GLM (Z.ai)",
    website: "https://z.ai",
    overview:
      "GLM, by Zhipu AI, is a capable model family strong at coding and autonomous agent workflows, with open models developers can build on and an affordable API.",
    useCases: [
      "Coding and development",
      "AI agents and automation",
      "App building",
      "Research",
      "Affordable API projects",
    ],
    hacks: [
      "Strong for agent-style, multi-step tasks.",
      "Open models to build on.",
      "Affordable API for startups.",
      "Solid coding performance.",
    ],
  },
  {
    slug: "minimax",
    name: "MiniMax (Hailuo)",
    website: "https://hailuoai.com",
    overview:
      "MiniMax is best known for Hailuo, one of the strongest and cheapest AI video generators, plus realistic voice and chat — a great value multimodal platform.",
    useCases: [
      "AI video generation (Hailuo)",
      "Realistic voice generation",
      "Short-form and social content",
      "Multimodal apps",
      "Content creation on a budget",
    ],
    hacks: [
      "Hailuo produces high-quality video cheaply.",
      "Free credits let you start right away.",
      "Great for social and short-form video.",
      "Combine video and voice in one platform.",
    ],
  },

  /* ------------------------------ INDIA ------------------------------ */
  {
    slug: "krutrim",
    name: "Krutrim",
    website: "https://krutrim.ai",
    overview:
      "Krutrim, by Ola, is India's own assistant, built to understand and speak many Indian languages. It's made for Indian context and use-cases, and it's free to use.",
    useCases: [
      "Chat in Indian languages",
      "Local, India-specific Q&A",
      "Multilingual help",
      "Everyday assistant",
      "Regional-language content",
    ],
    hacks: [
      "Strong support for a wide range of Indian languages.",
      "Free to use.",
      "Built specifically for Indian users and context.",
      "Handy for regional-language content.",
    ],
  },
  {
    slug: "sarvam-ai",
    name: "Sarvam AI",
    website: "https://sarvam.ai",
    overview:
      "Sarvam AI builds India-first models and voice AI for apps in Indian languages, with open models for developers and a central role in India's sovereign-AI push.",
    useCases: [
      "Building Indic-language apps",
      "Voice AI products",
      "Developer APIs",
      "Regional-language products",
      "Enterprise India solutions",
    ],
    hacks: [
      "Purpose-built for Indian languages and voice.",
      "Open models developers can build on.",
      "Ideal for India-focused products.",
      "Enterprise- and API-focused.",
    ],
  },
  {
    slug: "bharatgpt",
    name: "BharatGPT",
    website: "https://corover.ai",
    overview:
      "BharatGPT, by CoRover, is enterprise-grade Indian conversational AI — voice, video and text in 14+ Indian languages — already used by large public and private services.",
    useCases: [
      "Enterprise chatbots",
      "Government and PSU citizen services",
      "Multilingual customer support",
      "Voice assistants",
      "Sovereign / on-premise deployment",
    ],
    hacks: [
      "Covers 14+ Indian languages.",
      "Trusted by large Indian enterprises.",
      "Offers on-premise / sovereign deployment.",
      "Handles voice, video and text.",
    ],
  },
  {
    slug: "hanooman",
    name: "Hanooman",
    website: "https://hanooman.ai",
    overview:
      "Hanooman is an Indian multilingual AI aimed at everyday users across dozens of Indian languages, with a free consumer app and a focus on education and healthcare.",
    useCases: [
      "Chat in many Indian languages",
      "Education and learning help",
      "Healthcare information",
      "Regional-language content",
      "Everyday assistant",
    ],
    hacks: [
      "Covers a very wide range of Indian languages.",
      "Free consumer app.",
      "Focus on education and healthcare use-cases.",
      "Made for Bharat and regional users.",
    ],
  },
];

export function detailBySlug(slug: string): AiToolDetail | undefined {
  return aiToolDetails.find((d) => d.slug === slug);
}

export function detailByName(name: string): AiToolDetail | undefined {
  return aiToolDetails.find((d) => d.name === name);
}
