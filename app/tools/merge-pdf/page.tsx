import type { Metadata } from "next";
import MergePdf from "@/components/tools/MergePdf";
import { site } from "@/lib/site";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Merge PDF — Combine PDF Files Online Free" },
  description:
    "Free merge PDF tool. Combine multiple PDF files into one, reorder and remove pages, entirely in your browser — no upload, no sign-up, fully private.",
  alternates: { canonical: "/tools/merge-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/merge-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Merge PDF — Combine PDF Files Online Free",
    description:
      "Free online tool to combine multiple PDF files into one document, entirely in your browser — reorder pages, then download. No upload, no sign-up, 100% private.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Merge PDF tool",
      },
    ],
  },
};

const howToUse = [
  {
    step: "Add your PDF files",
    detail: "Click the drop zone or use the file picker to select all the PDFs you want to combine. You can add as many files as you need in one go, and drag additional files onto the zone at any time.",
  },
  {
    step: "Arrange the page order",
    detail: "Each file appears as a card in the list. Use the up and down arrow buttons on each card to set the exact sequence — files at the top of the list appear first in the merged document, files lower down appear later.",
  },
  {
    step: "Remove unwanted files",
    detail: "Click the remove button (the × icon) on any file you decide you don't want. The card disappears immediately and that file won't be included in the merged output.",
  },
  {
    step: "Verify the page count",
    detail: "Each file card shows the number of pages it contains. Scan the list quickly to make sure you haven't accidentally included a file with far more pages than expected, such as a long report when you only meant to add its cover page.",
  },
  {
    step: "Click the merge button",
    detail: "Press the merge button and wait a second or two while your browser reads every page from every file and assembles them into a brand-new PDF document.",
  },
  {
    step: "Download the merged PDF",
    detail: "Your browser will prompt you to save the single combined PDF. The original files on your device remain completely untouched — the merge creates a fresh file without altering the source PDFs.",
  },
];

const whenToUse = [
  {
    scenario: "Combining business documents into one package",
    detail: "When you need to send a contract along with its appendices, terms, signature pages, and cover letter as one tidy file instead of a zip folder full of loose PDFs that the recipient has to open one at a time.",
  },
  {
    scenario: "Joining separately scanned pages",
    detail: "If your scanner or photo app produced one PDF per page — common with mobile scanning apps and some multifunction printers — merge them back into a single document that's far easier to read, print, or archive.",
  },
  {
    scenario: "Bundling academic or research submissions",
    detail: "Students, researchers, and grant applicants often need to submit a single PDF containing the main paper, references, figures, supplementary materials, and cover sheets. Merging avoids the upload platform rejecting multi-file submissions.",
  },
];

const howItWorksParagraph =
  "When you drop your PDF files, this tool reads each document using the pdf-lib library running entirely inside your browser. It copies every page from every source file — preserving text, images, fonts, vector graphics, and formatting exactly as they appear in the originals — and assembles them into a brand-new PDF in the order you arranged. Nothing travels over the network: all processing happens on your device's CPU and memory. The result is a clean, single-file PDF that you download instantly. Because pdf-lib operates directly on the raw byte content of each page, even many password-protected or partially encrypted PDFs can be read and merged successfully. Once the page has loaded, the tool works fully offline as well.";

const tips = [
  "Keep the number of files reasonable — merging dozens of large, image-heavy PDFs in one go can use significant browser memory. If your device starts to slow down, split the job into smaller batches and merge the batches afterward.",
  "Check each PDF's page count shown on its card before merging. A file with an unexpectedly high page count — say a 150-page report when you only intended to include its 2-page executive summary — might be the wrong file.",
  "Remove filler pages like blank separator sheets or duplicate covers before merging rather than after. It's much easier to spot and drop them in the file list than to edit them out of the finished document.",
  "The merge preserves original quality exactly — pages are copied byte for byte, with no re-compression, re-rendering, or downscaling. There's no risk of degraded text, blurry images, or shifted layouts.",
  "If a password-protected PDF won't load, remove its encryption first using any desktop PDF reader (Adobe Acrobat, Preview on Mac, etc.) and then add the unprotected copy to the merge list.",
];

const faqs = [
  {
    q: "Are my PDFs uploaded anywhere?",
    a: "No. Merging happens entirely in your browser with JavaScript using the pdf-lib library. Your PDFs never leave your device — nothing is uploaded, stored, or shared, which keeps sensitive documents completely private. The tool even works offline once the page has loaded, so you can merge files without an active internet connection.",
  },
  {
    q: "Can I reorder the files before merging?",
    a: "Yes. Each PDF appears as a card in the file list with its filename and page count clearly displayed. Use the up and down arrow buttons on each card to move files into the exact order you want. The merged PDF follows the list order from top to bottom, so the file at the top of the list becomes page 1 of the output.",
  },
  {
    q: "What about password-protected PDFs?",
    a: "The tool attempts to read encrypted PDFs where possible, and many password-protected files with standard encryption open without issue. However, files with strong protection, custom encryption schemes, or unusual encoding may fail to load. If a file can't be read, remove the protection first using a desktop PDF application and try adding the unprotected version again.",
  },
  {
    q: "Is there a limit on the number or size of PDFs?",
    a: "There's no fixed limit built into the tool — you can add as many PDFs as you like. Because everything runs locally on your device, the real limit is your computer's available memory. Merging a handful of ordinary text-based documents is quick and reliable. Very large batches of image-heavy or scanned PDFs may use significant RAM, so if your browser becomes sluggish, split the work into smaller groups and merge the results afterward.",
  },
  {
    q: "Will the quality change after merging?",
    a: "No. Pages are copied as-is into the new document. The pdf-lib library reads each page's raw content — text, images, vector graphics, fonts, and annotations — and writes it directly into the output PDF without re-compressing, re-rendering, or converting anything. The merged file is identical to the originals in visual quality and layout.",
  },
  {
    q: "Will the merged PDF retain bookmarks, links, or form fields?",
    a: "Bookmarks, internal page links, and hyperlinks are generally preserved because pdf-lib copies page-level annotations along with the page content. Interactive form fields, embedded JavaScript, and document-level metadata, however, may not carry over consistently since those features depend on cross-page structures that aren't always portable between documents. If your workflow relies on fillable forms or scripts, test a small sample merge first.",
  },
  {
    q: "Is it free to use?",
    a: "Yes, completely free with no sign-up, no account, and no watermark. Merge as many PDFs as you need, as often as you like. There are no hidden limits, paid tiers, or premium features — the tool is fully functional for everyone, forever.",
  },
];

const relatedTools = [
  { label: "Split PDF", href: "/tools/split-pdf" },
  { label: "Organize PDF", href: "/tools/organize-pdf" },
  { label: "Image to PDF", href: "/tools/image-to-pdf" },
  { label: "Compress PDF", href: "/tools/compress-pdf" },
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
        name: "Merge PDF",
        item: `${site.url}/tools/merge-pdf`,
      },
    ],
  };

  return (
    <ToolPageLayout
      title="Merge PDF"
      description="Combine multiple PDF files into one document. Reorder pages, remove the files you don't need, and download a single clean PDF — your files never leave your device."
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
      <MergePdf />
    </ToolPageLayout>
  );
}
