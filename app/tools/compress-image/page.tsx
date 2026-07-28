import type { Metadata } from "next";
import CompressImage from "@/components/tools/CompressImage";
import { site } from "@/lib/site";
import { TOOL_COMPRESS } from "@/lib/seo";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export const metadata: Metadata = TOOL_COMPRESS;

const howToUse = [
  {
    step: "Add your images",
    detail: "Click the drop zone or browse your device to select one or more JPG, PNG, or WebP images. You can add multiple files at once and keep adding more even after the first batch — the tool accepts unlimited images.",
  },
  {
    step: "Choose your output format",
    detail: "Use the format selector to pick JPG, PNG, or WebP as your output format. Keep the original format if you just want a smaller version of the same file type. Switch to WebP or JPG for significantly smaller files, or stay with PNG when you need lossless quality and transparency.",
  },
  {
    step: "Adjust the quality slider",
    detail: "Drag the quality slider to set how much detail the compressed file retains. Start at 70% for a good balance of size and quality on photos. Drop lower for smaller files — the preview updates in real time so you can see exactly how the image will look.",
  },
  {
    step: "Review the preview and file size",
    detail: "The tool shows a live side-by-side or overlay preview of your compressed image alongside the original. Below the preview, you'll see the new estimated file size so you can judge whether the compression is worth it before you download.",
  },
  {
    step: "Compress and compare",
    detail: "The tool processes your images instantly on each quality adjustment — there's no separate compress button to click. Every slider change triggers a re-encode, so you can freely experiment with different quality levels.",
  },
  {
    step: "Download individually or all at once",
    detail: "Each compressed image has its own download button for saving one at a time. If you compressed multiple images, use the Download all button to save every file as a single ZIP or as individual downloads, depending on your browser.",
  },
];

const whenToUse = [
  {
    scenario: "Optimising photos for a website or blog",
    detail: "Large unoptimised images are the biggest cause of slow page loads. Compressing your photos before uploading them to a CMS or static site shrinks page weight dramatically — often by 60–80% — without any visible quality loss to visitors.",
  },
  {
    scenario: "Reducing email attachment size",
    detail: "Most email providers cap attachments at 10–25 MB, and a single unoptimised photo from a modern smartphone can easily hit 5–8 MB. Compress images before attaching them so they send quickly and don't bounce due to size limits.",
  },
  {
    scenario: "Freeing up storage on your device",
    detail: "Photo libraries grow fast — a folder of a few hundred full-resolution JPGs can occupy gigabytes. Batch-compress older photos you want to keep but rarely view at full size, and reclaim significant disk space without deleting anything.",
  },
];

const howItWorksParagraph =
  "This tool uses the HTML Canvas API to decode your original image into raw pixel data, then re-encodes it at the quality level and output format you choose. For JPG and WebP output, the canvas applies lossy compression — it analyses the image and discards fine detail the human eye is unlikely to notice, which is why the file size shrinks so dramatically at moderate quality settings. For PNG output, the canvas uses lossless compression that preserves every pixel exactly, though the size reduction for photographic PNGs is typically modest. All of this processing happens purely in memory on your own device: the image is read, decoded, redrawn, and re-encoded inside your browser's JavaScript engine. Nothing is uploaded, nothing is stored on a server, and the original file on your disk is never modified — the compressed version saves as a brand-new file alongside it.";

const tips = [
  "Start at 70% quality and only go lower if you need further size reduction. At 70%, most photos show no visible difference while cutting file size by half or more. Watch the live preview for blocky artefacts or fuzzy edges before deciding to drop further.",
  "For photographs of people, landscapes, or anything with smooth gradients, prefer WebP output — it typically produces files 25–35% smaller than JPG at the same visual quality, which means you can keep a higher quality setting and still get a small file.",
  "Don't use PNG output for photos. PNG is a lossless format, so re-encoding a photo as PNG barely shrinks it and may even increase the file size. Reserve PNG for screenshots, logos, icons, and any image with sharp text or flat colours where lossless compression actually helps.",
  "Compression and resizing are separate tools. This tool keeps your original pixel dimensions and only reduces the file size. If you also need a physically smaller image, resize it first using the Resize Image tool and then compress the result here.",
  "Batch-compress wisely. Compressing hundreds of high-resolution images at once in a browser tab will use significant RAM. If your browser starts to feel sluggish, work in smaller batches of 20–30 images at a time.",
];

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. This compressor runs entirely in your browser using the HTML Canvas API. Your images are decoded, redrawn, and re-encoded inside your browser's JavaScript engine on your own device. They are never uploaded, stored, cached on a server, or seen by anyone else — they never leave your computer. The tool also works offline once the page has loaded.",
  },
  {
    q: "How much can I shrink a photo?",
    a: "For typical JPG photographs taken with a smartphone or digital camera, setting the quality slider to 70% usually cuts the file size by 40–80% with virtually no visible difference on screen. At 50% quality, savings increase further but you may start noticing subtle blockiness in smooth gradients or fine textures. If you switch output to WebP, you can often get an even smaller file at the same quality setting — typically 25–35% smaller than the JPG equivalent.",
  },
  {
    q: "Why doesn't my PNG get much smaller?",
    a: "PNG is a lossless format, which means it stores every pixel's exact colour without any data being thrown away. Re-encoding a photo as PNG rarely saves more than a few percent because the pixel data is fundamentally the same size. For real savings on photographic images, convert the PNG to JPG or WebP using the format selector — those lossy formats can dramatically shrink photo file sizes. Keep PNG for screenshots, logos, and images with flat colours or sharp text where lossless compression preserves crisp edges.",
  },
  {
    q: "What does the quality slider actually do?",
    a: "For JPG and WebP output, the quality slider controls the compression level applied during encoding. At 100%, the encoder preserves nearly all detail, producing a large file. At lower values, the encoder discards progressively more fine detail — subtle colour variations, texture, and high-frequency patterns — to reduce the file size. The preview updates live with each slider change so you can see exactly how the image will look at any given quality level before you download.",
  },
  {
    q: "Is there a file size or count limit?",
    a: "There's no hard limit built into the tool — you can compress as many images as you like and add more at any time. Because everything runs locally on your device, very large images and very large batches use more of your computer's memory and may slow down browser performance. If you notice lag, try compressing in smaller groups of 20–30 images and closing other browser tabs to free up RAM.",
  },
  {
    q: "Does compressing an image reduce its dimensions?",
    a: "No. This tool keeps the original width and height in pixels unchanged. It only re-encodes the image at a lower quality setting or in a more efficient format to reduce the file size in bytes. The pixel dimensions stay exactly the same, so your photo remains the same physical size on screen. If you want to change the dimensions, use the Resize Image tool instead.",
  },
  {
    q: "Does repeatedly compressing the same image degrade it further?",
    a: "Yes, if you're using lossy formats like JPG or WebP. Every time you open a JPG or WebP, re-encode it, and save it again, a small amount of additional quality is lost — this is called generational loss. To avoid it, always compress from the original uncompressed file rather than re-compressing an already compressed image. PNG compression is lossless, so re-encoding a PNG repeatedly won't degrade it.",
  },
];

const relatedTools = [
  { label: "Image Converter", href: "/tools/image-converter" },
  { label: "Resize Image", href: "/tools/resize-image" },
  { label: "Crop Image", href: "/tools/crop-image" },
  { label: "Image to PDF", href: "/tools/image-to-pdf" },
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
        name: "Compress Image",
        item: `${site.url}/tools/compress-image`,
      },
    ],
  };

  return (
    <ToolPageLayout
      title="Compress Image"
      description="Shrink JPG, PNG, and WebP images with a simple quality slider. Choose your output format, preview the result live, and download optimised files — all in your browser, with nothing uploaded."
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
      <CompressImage />
    </ToolPageLayout>
  );
}
