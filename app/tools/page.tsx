"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, FileText, FileImage, FileCode, Shuffle, WandSparkles, Cpu, Calculator, Clock, Sparkles, Gamepad2, Wrench, Shield, Briefcase, GraduationCap, ArrowRight, Image, FileType, FileDown, FileUp, Scissors, RotateCw, Combine, Crop, PaintBucket, RefreshCw, Hash, TextSelect, Braces, CaseSensitive, Terminal, Key, QrCode, Ruler, Receipt, PiggyBank, DollarSign, Dices, Target, List, Repeat, Percent, BicepsFlexed, Baby, FileOutput } from "lucide-react";
import { Pill, EmptyState } from "@/components/ui";

const ICON_MAP: Record<string, typeof FileText> = {
  "File Text": FileText, "Image": Image, "File Type": FileType, "Workflow": Shuffle,
  "AI": WandSparkles, "Code": FileCode, "Calculator": Calculator, "Clock": Clock,
  "Sparkles": Sparkles, "Game": Gamepad2, "Wrench": Wrench, "Shield": Shield,
  "Business": Briefcase, "Students": GraduationCap, "PDF": FileDown, "Image Convert": RefreshCw,
  "Image Editor": PaintBucket, "Image Utility": Crop, "Text": Hash, "Text Format": TextSelect,
  "Dev": Braces, "Dev Tool": Terminal, "Security": Key, "Utility": QrCode,
  "Convert": Ruler, "Money": DollarSign, "PDF Editor": Scissors, "PDF Tool": Combine,
  "Fun": Dices, "Time": Clock, "Image Generate": Image,
};

type Tool = {
  slug: string; href: string; title: string; blurb: string; tag: string; category: string;
};

const TOOLS: Tool[] = [
  { slug: "resume-builder", href: "/resume-builder", title: "Resume Builder", blurb: "Build a clean, professional CV with live preview and one-click PDF download.", tag: "Careers", category: "Business" },
  { slug: "compress-image", href: "/tools/compress-image", title: "Compress Image", blurb: "Shrink JPG, PNG and WebP file sizes with a quality slider.", tag: "Image", category: "Image" },
  { slug: "image-converter", href: "/tools/image-converter", title: "Image Converter", blurb: "Convert images between JPG, PNG and WebP in one click.", tag: "Image", category: "Image" },
  { slug: "image-to-pdf", href: "/tools/image-to-pdf", title: "Image to PDF", blurb: "Combine JPG and PNG images into a single PDF.", tag: "PDF", category: "PDF" },
  { slug: "merge-pdf", href: "/tools/merge-pdf", title: "Merge PDF", blurb: "Join multiple PDF files into one document.", tag: "PDF", category: "PDF" },
  { slug: "split-pdf", href: "/tools/split-pdf", title: "Split PDF", blurb: "Extract a page range into a new PDF.", tag: "PDF", category: "PDF" },
  { slug: "rotate-pdf", href: "/tools/rotate-pdf", title: "Rotate PDF", blurb: "Turn pages 90, 180 or 270 degrees.", tag: "PDF", category: "PDF" },
  { slug: "organize-pdf", href: "/tools/organize-pdf", title: "Organize PDF", blurb: "Reorder and remove pages from a PDF.", tag: "PDF", category: "PDF" },
  { slug: "resize-image", href: "/tools/resize-image", title: "Resize Image", blurb: "Change image dimensions by pixels or percentage.", tag: "Image", category: "Image" },
  { slug: "crop-image", href: "/tools/crop-image", title: "Crop Image", blurb: "Trim a photo with a draggable crop box.", tag: "Image", category: "Image" },
  { slug: "rotate-image", href: "/tools/rotate-image", title: "Rotate & Flip Image", blurb: "Rotate and flip images with a live preview.", tag: "Image", category: "Image" },
  { slug: "favicon-generator", href: "/tools/favicon-generator", title: "Favicon Generator", blurb: "Turn any logo into favicon PNGs at every size.", tag: "Image", category: "Image" },
  { slug: "image-to-base64", href: "/tools/image-to-base64", title: "Image to Base64", blurb: "Encode any image as a data URI.", tag: "Image", category: "Image" },
  { slug: "ai-summarizer", href: "/tools/ai-summarizer", title: "AI Text Summarizer", blurb: "Paste any article and get an instant AI summary.", tag: "AI", category: "AI" },
  { slug: "ai-paraphraser", href: "/tools/ai-paraphraser", title: "AI Paraphraser", blurb: "Reword and rephrase any text in seconds.", tag: "AI", category: "AI" },
  { slug: "ai-grammar-checker", href: "/tools/ai-grammar-checker", title: "AI Grammar Checker", blurb: "Fix grammar, spelling and punctuation instantly.", tag: "AI", category: "AI" },
  { slug: "ai-email-writer", href: "/tools/ai-email-writer", title: "AI Email Writer", blurb: "Generate ready-to-send emails and cover letters.", tag: "AI", category: "AI" },
  { slug: "ai-business-name-generator", href: "/tools/ai-business-name-generator", title: "AI Business Name Generator", blurb: "Get creative startup name ideas.", tag: "AI", category: "AI" },
  { slug: "ai-caption-generator", href: "/tools/ai-caption-generator", title: "AI Caption Generator", blurb: "Create platform-tuned captions and hashtags.", tag: "AI", category: "AI" },
  { slug: "scientific-calculator", href: "/tools/scientific-calculator", title: "Scientific Calculator", blurb: "Trig, logs, powers, roots - a full scientific calculator.", tag: "Calculators", category: "Calculator" },
  { slug: "gpa-calculator", href: "/tools/gpa-calculator", title: "GPA Calculator", blurb: "Work out GPA and CGPA from your grades.", tag: "Students", category: "Students" },
  { slug: "color-picker", href: "/tools/color-picker", title: "Color Picker", blurb: "Pick colours and get HEX, RGB and HSL values.", tag: "Dev", category: "Dev" },
  { slug: "character-counter", href: "/tools/character-counter", title: "Character Counter", blurb: "Live character, word and line counts.", tag: "Text", category: "Text" },
  { slug: "word-counter", href: "/tools/word-counter", title: "Word Counter", blurb: "Count words, characters, sentences and reading time.", tag: "Text", category: "Text" },
  { slug: "case-converter", href: "/tools/case-converter", title: "Case Converter", blurb: "Change text case - upper, lower, title, camelCase.", tag: "Text", category: "Text" },
  { slug: "number-to-words", href: "/tools/number-to-words", title: "Number to Words", blurb: "Turn numbers into words in Lakh/Crore format.", tag: "Text", category: "Text" },
  { slug: "text-compare", href: "/tools/text-compare", title: "Text Compare", blurb: "Compare two texts side-by-side.", tag: "Text", category: "Text" },
  { slug: "remove-duplicate-lines", href: "/tools/remove-duplicate-lines", title: "Remove Duplicate Lines", blurb: "Delete repeated lines from a list.", tag: "Text", category: "Text" },
  { slug: "json-formatter", href: "/tools/json-formatter", title: "JSON Formatter", blurb: "Beautify, minify and validate JSON.", tag: "Dev", category: "Dev" },
  { slug: "base64", href: "/tools/base64", title: "Base64 Encode/Decode", blurb: "Convert text to and from Base64.", tag: "Dev", category: "Dev" },
  { slug: "url-encode-decode", href: "/tools/url-encode-decode", title: "URL Encode/Decode", blurb: "Percent-encode and decode URLs.", tag: "Dev", category: "Dev" },
  { slug: "password-generator", href: "/tools/password-generator", title: "Password Generator", blurb: "Create strong, random passwords.", tag: "Security", category: "Security" },
  { slug: "qr-code-generator", href: "/tools/qr-code-generator", title: "QR Code Generator", blurb: "Create custom QR codes for any link.", tag: "Utility", category: "Utility" },
  { slug: "unit-converter", href: "/tools/unit-converter", title: "Unit Converter", blurb: "Convert length, weight, temperature, area and more.", tag: "Convert", category: "Convert" },
  { slug: "invoice-generator", href: "/tools/invoice-generator", title: "Invoice Generator", blurb: "Create professional invoices with live preview.", tag: "Business", category: "Business" },
  { slug: "budget-planner", href: "/tools/budget-planner", title: "Budget Planner", blurb: "Plan your month with a 50/30/20 breakdown.", tag: "Money", category: "Business" },
  { slug: "are-you-rich", href: "/tools/are-you-rich", title: "Are You Rich?", blurb: "See your income percentile by country.", tag: "Money", category: "Business" },
  { slug: "stopwatch-timer", href: "/tools/stopwatch-timer", title: "Stopwatch & Timer", blurb: "Precise stopwatch with lap times and countdown.", tag: "Time", category: "Time" },
  { slug: "countdown-to-date", href: "/tools/countdown-to-date", title: "Countdown to Date", blurb: "Count down to any date or event.", tag: "Time", category: "Time" },
];

const CATEGORIES = ["All", "AI", "Image", "PDF", "Text", "Dev", "Business", "Security", "Utility", "Convert", "Time", "Students", "Calculator"] as const;

const CAT_ICONS: Record<string, typeof Sparkles> = {
  AI: WandSparkles, Image, PDF: FileDown, Text: Hash, Dev: FileCode, Business: Briefcase,
  Security: Shield, Utility: Wrench, Convert: Ruler, Time: Clock, Fun: Gamepad2,
  Students: GraduationCap, Calculator: Calculator,
};

function padRow<T>(items: T[], cols: number): (T | null)[] {
  const r = items.length % cols;
  return r === 0 ? items : [...items, ...Array(cols - r).fill(null)];
}

export default function Page() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      if (activeCat !== "All" && t.category !== activeCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.blurb.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeCat, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, Tool[]>();
    const cats = activeCat === "All" ? CATEGORIES.slice(1) : [activeCat];
    for (const cat of cats) {
      const items = filtered.filter((t) => t.category === cat);
      if (items.length) map.set(cat, items);
    }
    return map;
  }, [filtered, activeCat]);

  const resumeTool = TOOLS.find((t) => t.slug === "resume-builder");

  return (
    <div>
      <section className="section-pad bg-white">
        <div className="container-main">
          <Pill>Free Tools</Pill>
          <h1 className="h1 text-text mt-3">Free Online Tools</h1>
          <p className="body text-text-muted mt-3 max-w-[640px]">
            A growing set of free online tools for PDFs, images, text, code and AI: merge and split PDFs,
            compress and convert images, count words, generate passwords and QR codes, build a resume, and
            more. Everything runs in your browser, so your files are never uploaded to a server. No sign-up,
            no watermarks, no limits.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-pill border border-border bg-bg-alt px-4 py-2 text-sm text-text-muted">
            <Shield className="h-4 w-4 text-brand" />
            100% private - your files never leave your device
          </div>
        </div>
      </section>

      {resumeTool && (
        <section className="pb-12 bg-white">
          <div className="container-main">
            <Link href={resumeTool.href} className="card overflow-hidden block hover:border-brand">
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-7 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <Pill>Popular</Pill>
                    <span className="eyebrow text-text-muted">{resumeTool.tag}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-text mt-3">{resumeTool.title}</h2>
                  <p className="text-sm text-text-muted mt-2">{resumeTool.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Open {resumeTool.title} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="md:col-span-5 bg-bg-alt flex items-center justify-center min-h-[200px]">
                  <FileText className="h-16 w-16 text-text-muted/30" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <div className="sticky top-16 sm:top-20 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container-main py-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full h-10 pl-10 pr-4 rounded-input border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? TOOLS.length : TOOLS.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`whitespace-nowrap rounded-pill px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeCat === cat
                      ? "bg-brand text-white"
                      : "bg-bg-alt text-text-muted hover:text-text border border-border"
                  }`}
                >
                  {cat} <span className="ml-1 text-xs opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="section-pad bg-bg-alt">
        <div className="container-main">
          {filtered.length === 0 ? (
            <EmptyState message="No tools match your filters." onClear={() => { setSearch(""); setActiveCat("All"); }} />
          ) : (
            <div className="space-y-16">
              {[...grouped.entries()].map(([cat, items]) => {
                const CatIcon = CAT_ICONS[cat] || Wrench;
                const cols = ["AI", "Image", "PDF", "Text", "Dev", "Business", "Utility", "Convert", "Time", "Fun"].includes(cat) ? 4 : 3;
                return (
                  <section key={cat}>
                    <div className="flex items-center gap-2 mb-6">
                      <CatIcon className="h-5 w-5 text-brand" />
                      <h2 className="text-base font-semibold text-text">{cat}</h2>
                    </div>
                    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                      {(items.length > cols ? padRow(items, cols) : items).map((t, i) => {
                        if (!t) return <div key={`spacer-${i}`} className="hidden sm:block" />;
                        const Icon = ICON_MAP[t.tag] || Wrench;
                        return (
                          <Link key={t.slug} href={t.href} className="card card-h-full p-4">
                            <div className="flex items-start justify-between">
                              <Icon className="h-8 w-8 text-brand" />
                              <span className="eyebrow text-text-muted">{t.tag}</span>
                            </div>
                            <CardBody>
                              <h3 className="text-sm font-semibold text-text mt-2">{t.title}</h3>
                              <p className="text-xs text-text-muted mt-1 line-clamp-2">{t.blurb}</p>
                            </CardBody>
                            <CardFooter>
                              <span className="text-xs font-medium text-brand">Open</span>
                            </CardFooter>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}
function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer pt-3">{children}</div>;
}
