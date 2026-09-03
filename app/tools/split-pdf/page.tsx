import type { Metadata } from "next";
import SplitPdf from "@/components/tools/SplitPdf";
import { site } from "@/lib/site";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Split PDF - Extract Pages from a PDF Free" },
  description:
    "Free split PDF tool. Extract a page range into a new PDF or split every page into separate files - in your browser. No upload, no sign-up, fully private.",
  alternates: { canonical: "/tools/split-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/split-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Split PDF - Extract Pages from a PDF Free",
    description:
      "Extract a page range or split every page into separate PDFs, entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Split PDF tool",
      },
    ],
  },
};

const howToUse = [
  {
    step: "Add your PDF",
    detail: "Click the drop zone or browse to select the PDF you want to split. The tool reads the file immediately and shows you the total page count so you know what you're working with.",
  },
  {
    step: "Choose your split mode",
    detail: "You have two options. Pick Extract a page range if you want a single new PDF containing a continuous slice of pages. Pick Split into single pages if you want each page saved as its own separate one-page PDF file.",
  },
  {
    step: "Enter the page range (range mode only)",
    detail: "Type the first and last page numbers you want. For example, entering 2 as the first page and 5 as the last page extracts pages 2, 3, 4, and 5 as one new PDF. The tool validates these numbers against the actual page count.",
  },
  {
    step: "Click the split button",
    detail: "Press the split button and wait briefly while your browser copies the requested pages into new PDF documents. For single-page mode, a 10-page PDF will produce 10 separate files.",
  },
  {
    step: "Allow multiple downloads if prompted",
    detail: "When using single-page mode, your browser may ask permission before downloading several files in quick succession. Choose Allow to receive all the individual page PDFs. The range mode downloads just one file, so no prompt appears.",
  },
  {
    step: "Save your extracted PDFs",
    detail: "Each file downloads automatically. Your original PDF remains completely untouched. The split creates new files without modifying the source document in any way.",
  },
];

const whenToUse = [
  {
    scenario: "Extracting a specific chapter or section from a long document",
    detail: "When a 200-page report contains just one 15-page section you need to share with a colleague, extract that range as its own PDF instead of sending the entire file and asking someone to scroll through it.",
  },
  {
    scenario: "Separating individually signed forms from a merged batch",
    detail: "If you received a single PDF containing ten signed forms merged together, splitting each page into its own file gives you ten neat one-page PDFs, one per signatory, that you can file, forward, or archive independently.",
  },
  {
    scenario: "Removing confidential appendices before sharing",
    detail: "A report may contain a public-facing body followed by a confidential appendix with sensitive data. Extract only the pages meant for the recipient and keep the appendix private on your device.",
  },
];

const howItWorksParagraph =
  "When you upload a PDF, this tool reads the entire document using the pdf-lib library running locally in your browser. It then copies only the pages you requested (either a continuous range like pages 3 through 7, or every page individually) into brand-new PDF files. Each new file receives the original page content byte for byte, so text, images, vector graphics, and formatting remain pixel-perfect identical to the source. No data is sent over the internet; all page copying and file creation happens on your own machine. In single-page mode, the tool iterates through the document and creates one download per page. Because pdf-lib works with raw byte streams, the tool functions even when you're offline after the initial page load, and it never stores, caches, or transmits your document to any server.";

const tips = [
  "Always double-check your page range before splitting. Entering the wrong first or last page number is the most common mistake. Verify against the total page count shown after you load the file.",
  "When splitting every page, your browser may block multiple automatic downloads. If only the first file saves, look for a pop-up or icon in the address bar asking permission to download more files and click Allow.",
  "For large documents with hundreds of pages, splitting into single pages may briefly slow down your browser as it creates and downloads many files. Consider working in smaller batches if needed.",
  "Original PDF quality is preserved perfectly. Pages are copied at the byte level, never re-compressed or re-rendered. The output PDFs will look and print exactly like the source.",
  "If you need to split and then reorder pages, first split the file and then use the Merge PDF tool to combine the extracted pages back together in any new order you like.",
];

const faqs = [
  {
    q: "Is my PDF uploaded anywhere?",
    a: "No. Splitting happens entirely in your browser with JavaScript using the pdf-lib library. Your PDF never leaves your device. Nothing is uploaded, stored, or shared, which keeps sensitive documents completely private. The tool works offline too once the page has loaded, so you can split documents without an active internet connection.",
  },
  {
    q: "What is the difference between extracting a range and splitting every page?",
    a: "Extracting a range pulls a continuous slice of pages, say pages 2 through 5, into a single new PDF file with all those pages inside. It's best when you want one document containing a specific section. Splitting every page creates one standalone PDF file per page: a 10-page document produces 10 separate downloads, each containing exactly one page. This is ideal when you need to break a merged batch back into its original individual documents.",
  },
  {
    q: "Why do I get a prompt to allow multiple downloads?",
    a: "When you use single-page split mode, the tool downloads one file per page in rapid succession. Modern browsers consider multiple automatic downloads from one page as potentially unwanted behavior, so they ask for your permission before proceeding. Look for a small pop-up or an icon near the address bar and choose Allow. The range extraction mode downloads only one file, so no permission prompt appears.",
  },
  {
    q: "Can I split a password-protected PDF?",
    a: "The tool attempts to read encrypted PDFs where possible, and many standard password-protected files open without issue. However, files with strong or custom encryption may fail to load. If a file can't be read, remove the password first using a desktop PDF application like Adobe Acrobat or macOS Preview, save an unprotected copy, and then load that copy into the tool.",
  },
  {
    q: "Will the extracted pages lose any quality?",
    a: "No. Pages are copied as-is into the new document. The pdf-lib library reads each page's raw content (text, images, fonts, vector graphics, and annotations) and writes it directly into the output PDF without re-compressing, re-rendering, or converting anything. The extracted pages are pixel-identical to the original.",
  },
  {
    q: "What page numbering should I use, the printed page number or the PDF page number?",
    a: "Always use the PDF page number, which starts counting from the first physical page of the document as page 1. If your document has a cover, table of contents, or Roman-numeral front matter, those pages count too. The printed page number shown on the page (e.g., page 42 of a book) may differ from the PDF page number, so count from the very first page of the file.",
  },
  {
    q: "Is there a limit on file size or page count?",
    a: "There's no fixed limit. Because everything runs locally on your device using only browser memory, the practical limit is determined by your computer's available RAM. Splitting a typical document with a few hundred pages works reliably. Extremely large files with thousands of high-resolution scanned pages may use significant memory, and in that case splitting in smaller batches can help.",
  },
  {
    q: "Can I extract non-consecutive pages such as 1, 4 and 9?",
    a: "Not in one step. Range mode takes a single continuous slice, so pages that are not next to each other need two passes. Split the document into single pages, which gives you one file per page, then use the Merge PDF tool to combine just the pages you want, in whatever order suits you.",
  },
  {
    q: "Can I split a PDF on my phone?",
    a: "Range mode works well on mobile: pick the file, enter the first and last page, and one PDF downloads. Single-page mode is less comfortable because it triggers many downloads at once, and mobile browsers, iOS Safari in particular, often restrict that. If you need every page separately, a desktop browser is the smoother option.",
  },
];

const relatedTools = [
  { label: "Merge PDF", href: "/tools/merge-pdf" },
  { label: "Organize PDF", href: "/tools/organize-pdf" },
  { label: "Image to PDF", href: "/tools/image-to-pdf" },
  { label: "Rotate PDF", href: "/tools/rotate-pdf" },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${site.url}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Split PDF",
        item: `${site.url}/tools/split-pdf`,
      },
    ],
  };

  return (
    <ToolPageLayout
      title="Split PDF"
      description="Extract a page range into a new PDF, or split every page into its own separate file. Choose exactly which pages to keep. Your document never leaves your device."
      howToUse={howToUse}
      whenToUse={whenToUse}
      howItWorks={howItWorksParagraph}
      tips={tips}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <SplitPdf />
    </ToolPageLayout>
  );
}
