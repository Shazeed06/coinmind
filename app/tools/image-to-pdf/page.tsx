import type { Metadata } from "next";
import ImageToPdf from "@/components/tools/ImageToPdf";
import { site } from "@/lib/site";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Image to PDF — Convert JPG & PNG to PDF Free" },
  description:
    "Free image to PDF converter. Combine JPG and PNG images into one PDF right in your browser — no upload, no sign-up, your files stay private.",
  alternates: { canonical: "/tools/image-to-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/image-to-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Image to PDF — Convert JPG & PNG to PDF Free",
    description:
      "Combine JPG and PNG images into a single PDF, entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Image to PDF converter",
      },
    ],
  },
};

const howToUse = [
  {
    step: "Add your images",
    detail: "Click the drop zone or browse to select the JPG or PNG images you want to turn into a PDF. You can add as many as you need — photographs, scanned documents, screenshots, or any combination of formats. Add more images at any time by dragging them onto the zone.",
  },
  {
    step: "Arrange the image order",
    detail: "Each image appears as a card in the list with a small thumbnail preview. Use the up and down arrow buttons on each card to set the exact page order — the image at the top of the list becomes page 1 of your PDF, the next becomes page 2, and so on. Remove any image you don't want with the delete button.",
  },
  {
    step: "Choose the page size and layout",
    detail: "Pick Fit to image to give each page exactly the dimensions of its image — ideal for photos and scans where you want the page to match the content. Or pick A4 or Letter to place each image centred on a standard page size. You can also toggle between portrait and landscape orientation and set a margin if you want a clean white border around each image.",
  },
  {
    step: "Set the image scaling (optional)",
    detail: "By default, images are scaled to fit within the page dimensions while keeping their original aspect ratio. If you want images to fill the entire page edge to edge, choose the fill option — though this may crop parts of images whose aspect ratio doesn't match the selected page size.",
  },
  {
    step: "Click the create PDF button",
    detail: "Press the button and wait a moment while your browser reads each image, scales it according to your page size and margin settings, and embeds it as a page in a brand-new PDF document. The processing happens entirely on your device.",
  },
  {
    step: "Download your PDF",
    detail: "Your browser will prompt you to save the completed PDF. All images are embedded at their full resolution within the PDF, so the document will print and display clearly. Your original image files remain untouched on your device.",
  },
];

const whenToUse = [
  {
    scenario: "Bundling receipts or invoices for expense claims",
    detail: "Take photos of your paper receipts throughout the month, then combine them all into one clean PDF to attach to an expense report or send to accounting. One file instead of twenty separate image attachments makes submission far simpler for everyone involved.",
  },
  {
    scenario: "Creating a scannable ID or document package",
    detail: "When an employer, landlord, or government agency asks for scans of multiple ID documents — passport, driver's licence, utility bill, bank statement — combine them into a single PDF rather than sending half a dozen separate image files. It's more professional and reduces the chance of a file being missed.",
  },
  {
    scenario: "Packaging presentation slides exported as images",
    detail: "If your design tool exports presentation slides as individual PNG or JPG files, combine them into one PDF to share as a read-only handout or to upload to a platform that only accepts PDF uploads. Add margins and choose A4 in landscape for a polished slide-deck look.",
  },
];

const howItWorksParagraph =
  "This tool uses the pdf-lib library to create a valid PDF document directly in your browser. When you add images, each one is read as raw image data. Depending on the page size you selected, the tool either creates a page that precisely matches the image's pixel dimensions (Fit to image mode) or places the image centred on a standard A4 or Letter canvas. It calculates the correct scaling factor so that the image fills the page proportionally without distortion, applies any margin you set, and embeds the image into the PDF using its original resolution. The result is a standards-compliant PDF where each image sits on its own page, exactly as you arranged. Every operation — reading the images, calculating dimensions, assembling the PDF — happens in memory on your device using JavaScript. No files are uploaded or stored on any server, and the tool works offline once the page has loaded.";

const tips = [
  "If your images are in WebP, HEIC, or another format not directly supported by the tool, convert them to JPG or PNG first using the Image Converter and then add the converted files here.",
  "For the smallest PDF file size, use JPG images rather than PNG images as input. JPG images embedded in PDFs produce much smaller documents because the image data is already compressed, whereas PNG images embed their full uncompressed pixel data into the PDF.",
  "When selecting page size, choose Fit to image for scans and photos where you want each page to exactly match the content with no whitespace. Choose A4 or Letter when creating a document meant for printing or when you want a uniform look across all pages regardless of individual image dimensions.",
  "Use the margin setting to add breathing room. A margin of 10–20 mm gives your document a polished, print-ready feel and ensures no content gets clipped by printer margins. If your images are edge-to-edge scans, a small margin prevents accidental cropping.",
  "Check your image order carefully before creating the PDF. Once generated, the page order is fixed. If you need to reorder afterward, you can use the Organize PDF tool to rearrange pages in the finished document.",
];

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. This tool runs entirely in your browser using JavaScript and the pdf-lib library. Your images are read, scaled, and embedded into a new PDF on your own device. Nothing is uploaded, stored, cached on any server, or seen by anyone else — your files stay completely private. The tool also works offline once the page has loaded, so you can create PDFs without an active internet connection.",
  },
  {
    q: "Which image formats are supported?",
    a: "JPG (JPEG) and PNG are fully supported and can be embedded directly. WebP, HEIC, AVIF, BMP, TIFF, and other less common formats are not supported for direct embedding by the pdf-lib library. If you have images in those formats, convert them to JPG or PNG first using the Image Converter tool on this site and then add the converted versions here.",
  },
  {
    q: "Can I control the order of pages in the PDF?",
    a: "Yes. After adding your images, each one appears as a card in the list with a thumbnail preview. Use the up and down arrow buttons to arrange the cards into the exact order you want. The PDF is built following the list order from top to bottom — the image at the top becomes page 1. You can also remove any image from the list if you change your mind without needing to restart.",
  },
  {
    q: "Can I choose the page size?",
    a: "Yes. You have three options. Fit to image creates each page at exactly the dimensions of its image, so photos and scans fill the page edge to edge. A4 (210 × 297 mm) and Letter (8.5 × 11 inches) place each image on a standard-sized page, centred by default. You can also set the page orientation to portrait or landscape and add a margin in millimetres for a clean border around each image.",
  },
  {
    q: "Is there a limit on how many images I can add?",
    a: "There's no fixed limit built into the tool. Because everything runs locally on your device using only browser memory, the practical limit depends on your computer's available RAM. Typical documents with a few dozen standard-resolution images work smoothly. Very large batches of high-resolution photos may use significant memory, and in that case creating the PDF in smaller groups and then merging the resulting PDFs can help manage browser performance.",
  },
  {
    q: "Will the images lose quality when embedded in the PDF?",
    a: "No. Images are embedded at their full original resolution. The pdf-lib library embeds the raw image bytes directly into the PDF container without re-compressing or re-encoding them. The images in the PDF will display and print at the same quality as the original files — no detail is lost during the conversion process.",
  },
  {
    q: "Is it really free?",
    a: "Yes, completely free with no sign-up, no account required, and no watermark on the output PDF. Create as many PDFs as you like, as often as you like. There are no hidden limits, no paid tiers, and no premium features locked behind a subscription. The tool is fully functional for everyone, and your data stays on your device the entire time.",
  },
];

const relatedTools = [
  { label: "Merge PDF", href: "/tools/merge-pdf" },
  { label: "Split PDF", href: "/tools/split-pdf" },
  { label: "Image Converter", href: "/tools/image-converter" },
  { label: "Compress Image", href: "/tools/compress-image" },
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
        name: "Image to PDF",
        item: `${site.url}/tools/image-to-pdf`,
      },
    ],
  };

  return (
    <ToolPageLayout
      title="Image to PDF"
      description="Combine JPG and PNG images into a single PDF document. Reorder your images, choose a page size from Fit to image, A4, or Letter, set orientation and margins, and download — your files never leave your device."
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
      <ImageToPdf />
    </ToolPageLayout>
  );
}
