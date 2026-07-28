import type { Metadata } from "next";
import OrganizePdf from "@/components/tools/OrganizePdf";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Organize PDF — Reorder & Delete PDF Pages Free" },
  description:
    "Free organize PDF tool. Reorder pages, remove the ones you don't need and rebuild a clean PDF, in your browser. No upload, no sign-up, private.",
  alternates: { canonical: "/tools/organize-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/organize-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Organize PDF — Reorder & Delete PDF Pages Free",
    description:
      "Reorder pages and remove the ones you don't need, then rebuild a clean PDF — entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Organize PDF tool",
      },
    ],
  },
};

const faqData = [
  {
    q: "Is my PDF uploaded anywhere?",
    a: "No. Reordering and removing pages happens entirely in your browser with JavaScript. Your PDF never leaves your device — nothing is uploaded, stored or shared, which keeps sensitive documents private.",
  },
  {
    q: "How do I reorder the pages?",
    a: "Each page appears as a row in a list. Use the up and down buttons to move a page earlier or later. The new PDF is built in exactly the order shown, top to bottom.",
  },
  {
    q: "Can I get a removed page back?",
    a: "Yes. Removing a page only marks it to be left out — it isn't deleted from your original. Click Undo on that row to restore it any time before you build the new PDF.",
  },
  {
    q: "Do I have to keep at least one page?",
    a: "Yes. A PDF needs at least one page, so the build button stays disabled until at least one page is kept. Restore a page if you've removed them all.",
  },
  {
    q: "Will reordering change the page quality?",
    a: "No. Pages are copied as-is into the new document, so text, images and formatting stay exactly the same. Nothing is re-rendered, re-compressed or downgraded.",
  },
  {
    q: "Can I reorder pages from multiple PDFs at once?",
    a: "No, this tool works with one PDF at a time. If you need to combine pages from several files, use the Merge PDF tool first, then come back here to reorder the combined document.",
  },
  {
    q: "Does this tool work on mobile?",
    a: "Yes — the page list, buttons and thumbnails are fully responsive and work on phones and tablets. All processing still happens locally on your device.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
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
        name: "Organize PDF",
        item: `${site.url}/tools/organize-pdf`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <ToolPageLayout
        title="Organize PDF"
        description="Reorder pages, remove the ones you don't need and rebuild a clean PDF — your document never leaves your device."
        howToUse={[
          {
            step: "Drop your PDF",
            detail:
              "Drag and drop your PDF file onto the upload area, or click to browse and select it from your device. The tool reads all pages instantly in your browser and displays them as individual rows.",
          },
          {
            step: "Review the page list",
            detail:
              "Every page appears as a numbered row with a thumbnail preview. Scroll through to see the current order and quickly spot pages you want to move or remove.",
          },
          {
            step: "Reorder pages",
            detail:
              "Click the up arrow to move a page earlier in the sequence or the down arrow to push it later. The list order from top to bottom becomes the final page order in the rebuilt document.",
          },
          {
            step: "Remove unwanted pages",
            detail:
              "Click the remove button on any page you want to leave out of the final PDF. Removed pages are only marked for exclusion — your original file is never modified, so this is safe and reversible.",
          },
          {
            step: "Restore pages if needed",
            detail:
              "Changed your mind about a removal? Click Undo on any removed page to bring it back into the sequence. You can toggle pages in and out as many times as you like before building.",
          },
          {
            step: "Build and download",
            detail:
              "Once the order looks right and at least one page is kept, click Build new PDF. The tool assembles a fresh PDF document in your browser and triggers the download — all locally on your machine.",
          },
        ]}
        whenToUse={[
          {
            scenario: "Fixing a merged PDF",
            detail:
              "You combined several files into one but the pages ended up in the wrong sequence. Reorder them here in seconds instead of starting the merge over.",
          },
          {
            scenario: "Removing blank or duplicate pages",
            detail:
              "Scanned documents often include blank sheets, scanner artefacts or accidental duplicates between sections. Strip them out cleanly before sharing or archiving.",
          },
          {
            scenario: "Cleaning up a report before sharing",
            detail:
              "Remove internal notes, draft pages or sensitive sections before sending a client-facing PDF. The tool makes it easy to check every page and drop what shouldn't be seen.",
          },
        ]}
        howItWorks="The tool uses the pdf-lib library running entirely in your browser. When you drop a PDF, every page is extracted and displayed as a numbered row with a thumbnail. Reordering changes the index of each page in an internal array, and removing a page toggles a flag without touching your original file. When you click build, the tool copies only the kept pages — in their new order — into a fresh PDF document, then triggers a download. Because everything runs locally, nothing is uploaded to any server, and the tool works even offline once the page has loaded."
        tips={[
          "Work from top to bottom — arrange the first page first, then work your way down. It's less confusing than jumping around the list.",
          "Use remove rather than trying to drag pages out of the way — it's faster, cleaner, and you can always undo any removal with one click.",
          "Check the final page count before building — the button shows exactly how many pages will be in the output so there are no surprises.",
          "Always keep your original file — the tool never modifies your source PDF, but having a backup is good practice for any document you're reorganising.",
          "For large documents with 50+ pages, scroll through the thumbnails quickly first to spot outliers — blank pages, wrong orientation or stray pages — before you start reordering.",
        ]}
        faqs={faqData}
        relatedTools={[
          { label: "Merge PDF", href: "/tools/merge-pdf" },
          { label: "Split PDF", href: "/tools/split-pdf" },
          { label: "Rotate PDF", href: "/tools/rotate-pdf" },
          { label: "Compress PDF", href: "/tools/compress-pdf" },
        ]}
      >
        <OrganizePdf />
      </ToolPageLayout>
    </>
  );
}
