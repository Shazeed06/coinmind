import type { Metadata } from "next";
import RotatePdf from "@/components/tools/RotatePdf";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Rotate PDF - Turn PDF Pages 90°, 180° Free" },
  description:
    "Free rotate PDF tool. Turn every page or a single page 90, 180 or 270 degrees, entirely in your browser. No upload, no sign-up, fully private.",
  alternates: { canonical: "/tools/rotate-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/rotate-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Rotate PDF - Turn PDF Pages 90°, 180° Free",
    description:
      "Rotate every page or just one by 90, 180 or 270 degrees, entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rotate PDF tool",
      },
    ],
  },
};

const faqData = [
  {
    q: "Is my PDF uploaded anywhere?",
    a: "No. Rotation happens entirely in your browser with JavaScript. Your PDF never leaves your device. Nothing is uploaded, stored or shared, which keeps sensitive documents private.",
  },
  {
    q: "Can I rotate just one page instead of the whole file?",
    a: "Yes. Choose One page and enter the page number to turn a single page, handy when one scan came in sideways. Choose All pages to rotate the entire document at once.",
  },
  {
    q: "Which way do the pages turn?",
    a: "Rotation is clockwise. 90 degrees turns a portrait page to landscape, 180 degrees flips it upside down, and 270 degrees is the same as turning it 90 degrees anti-clockwise.",
  },
  {
    q: "Does rotating reduce quality or change the text?",
    a: "No. The tool only updates each page's rotation setting, so text stays selectable and images stay sharp. Nothing is re-rendered or re-compressed. The content is untouched.",
  },
  {
    q: "Can I rotate a password-protected PDF?",
    a: "The tool tries to read encrypted PDFs where possible, but files with strong protection may fail to load. If a file can't be read, remove the password first and try again.",
  },
  {
    q: "Can I rotate different pages by different amounts in one go?",
    a: "The tool applies one rotation setting at a time to the pages you select. To rotate page 2 by 90 degrees and page 5 by 180 degrees, run the tool twice on the same file. The rotations stack correctly.",
  },
  {
    q: "Does rotation affect how the PDF prints?",
    a: "Yes. The saved rotation is applied automatically when you print, so pages come out correctly oriented without you having to adjust any printer settings.",
  },
  {
    q: "Will the rotation stick if I email or upload the file?",
    a: "Yes. The rotation is written into the downloaded PDF itself, not remembered by this website, so every viewer, printer and upload portal sees the corrected orientation. That is different from the temporary rotate button in some PDF readers, which only turns the page on screen and reverts the next time the file is opened.",
  },
  {
    q: "Is there a limit on file size or page count?",
    a: "There is no fixed limit. Rotation only touches a small flag on each page rather than the page content, so it is one of the lightest PDF operations and stays fast even on long documents. The practical ceiling is simply the memory needed to hold your file in the browser tab while you work, which is rarely an issue.",
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
        name: "Rotate PDF",
        item: `${site.url}/tools/rotate-pdf`,
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
        title="Rotate PDF"
        description="Turn every page or a single page 90, 180 or 270 degrees and download the corrected file. Your document never leaves your device."
        howToUse={[
          {
            step: "Drop your PDF",
            detail:
              "Drag your PDF file onto the upload area or click to browse. The tool reads the document and shows a page preview with the current orientation of every page.",
          },
          {
            step: "Choose the rotation angle",
            detail:
              "Select 90, 180 or 270 degrees. All rotation is clockwise: 90 turns a portrait page to landscape, 180 flips it completely upside down, and 270 is equivalent to a 90-degree left turn.",
          },
          {
            step: "Pick all pages or a single page",
            detail:
              "Choose All pages to rotate the entire document uniformly in one step. Choose One page and type the page number to correct a single stray page while leaving the rest untouched.",
          },
          {
            step: "Preview the result",
            detail:
              "The preview updates to show how each page will look after rotation. Verify the orientation is correct, especially the page numbers, before you commit the change.",
          },
          {
            step: "Rotate and download",
            detail:
              "Click the rotate button to apply the change. The tool updates each selected page's rotation flag and triggers a download of the corrected PDF. Your original file stays untouched.",
          },
        ]}
        whenToUse={[
          {
            scenario: "Fixing a sideways scan",
            detail:
              "A document was fed into the scanner the wrong way or upside down. Rotate the entire file in one click to make every page readable and properly oriented.",
          },
          {
            scenario: "Correcting a single stray page",
            detail:
              "Page 7 of a 50-page report was scanned in landscape while everything else is portrait. Rotate just that one page without touching the rest of the document.",
          },
          {
            scenario: "Preparing a presentation or slide deck",
            detail:
              "Slides exported in the wrong orientation need a quick 90-degree turn before sharing with colleagues or presenting on a projector.",
          },
        ]}
        howItWorks="Rotation in a PDF is handled by a simple rotation flag stored on each page. The actual content is never re-rendered or reprocessed. This tool uses the pdf-lib library to read your document entirely in your browser, then updates the rotation property for the pages you selected. When you download, the modified PDF retains all original text, images and vector graphics at full quality because only the metadata-level rotation setting has changed. Nothing is uploaded to any server, and the tool works offline once the page has loaded."
        tips={[
          "Check the preview carefully. A single mis-rotated page buried in a long document is easy to miss and awkward to explain later.",
          "Use 270 degrees instead of searching for an anti-clockwise option. Since rotation is clockwise, 270 degrees gives the exact same result as turning 90 degrees left.",
          "Rotating a page 180 degrees is the same as flipping it. If a page is upside down, 180 degrees sets it right-side up in one click.",
          "If a PDF fails to load, check whether it's password-protected. Encrypted files may need the password removed first before the tool can read and modify them.",
        ]}
        faqs={faqData}
        relatedTools={[
          { label: "Organize PDF", href: "/tools/organize-pdf" },
          { label: "Split PDF", href: "/tools/split-pdf" },
          { label: "Merge PDF", href: "/tools/merge-pdf" },
          { label: "Image to PDF", href: "/tools/image-to-pdf" },
        ]}
      >
        <RotatePdf />
      </ToolPageLayout>
    </>
  );
}
