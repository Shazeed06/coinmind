import type { Metadata } from "next";
import CropImage from "@/components/tools/CropImage";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Crop Image - Free Online Photo Cropper Tool" },
  description:
    "Free image cropper: drag the crop box or type X, Y, width and height, use 1:1, 4:3 or 16:9 presets, then download as JPG, PNG or WebP. All in your browser.",
  alternates: { canonical: "/tools/crop-image" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/crop-image",
    title: "Crop Image - Free Online Photo Cropper Tool",
    description:
      "Crop photos with a draggable box or exact pixel values and aspect-ratio presets. 100% private - nothing is uploaded.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Crop Image tool",
      },
    ],
  },
};

const faqData = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. The cropper works entirely in your browser using the HTML Canvas API. The image is decoded, cut to your selection and re-encoded on your own device. It is never uploaded or seen by anyone.",
  },
  {
    q: "How do I crop to an exact size?",
    a: "Type the crop box's X and Y position and its width and height into the number fields. Every value is in pixels of the original image, so you can crop to an exact region without dragging.",
  },
  {
    q: "How do the aspect-ratio presets work?",
    a: "Pick 1:1, 4:3 or 16:9 and the crop box locks to that shape, perfect for square profile pictures, standard photos or widescreen thumbnails. Choose Free to crop to any proportions you like.",
  },
  {
    q: "Does cropping reduce the image quality?",
    a: "Cropping itself is lossless. It simply keeps the pixels inside your selection. The only quality change comes from the output format: PNG stays pixel-perfect, while JPG and WebP re-encode at high quality.",
  },
  {
    q: "Can I crop on my phone?",
    a: "Yes. The crop box supports touch, so you can drag it and its corners on a phone or tablet, or use the number fields if you prefer precise values. Everything still runs locally on your device.",
  },
  {
    q: "What image formats can I upload?",
    a: "The tool accepts JPG, PNG, WebP, GIF, BMP and most common raster image formats that modern browsers can decode and render onto a canvas.",
  },
  {
    q: "Can I undo a crop after downloading?",
    a: "No. The downloaded file is a new image containing only the cropped region. Always keep your original photo, and use this tool on a copy if you think you might want to revert later.",
  },
  {
    q: "Is there a maximum file size or resolution I can crop?",
    a: "The tool sets no fixed limit. The real ceiling is your device memory, because the whole image is decoded into a canvas inside the browser. Photos from a phone or a DSLR are comfortable on any modern machine, while a huge panorama or a scan of many tens of megapixels may feel slow on an older phone.",
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
        name: "Crop Image",
        item: `${site.url}/tools/crop-image`,
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
        title="Crop Image"
        description="Trim a photo to just the part you want: drag the crop box, snap to a 1:1, 4:3 or 16:9 ratio, or type exact pixel values, all in your browser with nothing uploaded."
        howToUse={[
          {
            step: "Upload your image",
            detail:
              "Drag and drop an image onto the upload area, or click to browse your device. The tool supports JPG, PNG, WebP, GIF, BMP and most common raster formats.",
          },
          {
            step: "Choose an aspect ratio preset",
            detail:
              "Pick 1:1 for a perfect square, 4:3 for standard photo proportions, or 16:9 for widescreen thumbnails and banners. Select Free to crop to any shape without restrictions.",
          },
          {
            step: "Drag the crop box",
            detail:
              "Click and drag the crop box to reposition it over the part of the image you want to keep. Drag any corner handle inward or outward to resize the selection area.",
          },
          {
            step: "Fine-tune with pixel values",
            detail:
              "For pixel-perfect precision, type exact X, Y, width and height values in the number fields. Each value is in pixels of the original image, and the crop box snaps to those coordinates instantly.",
          },
          {
            step: "Select your output format",
            detail:
              "Choose JPG for smaller file sizes ideal for web use, PNG for pixel-perfect lossless quality, or WebP for a modern balance of small size and high fidelity.",
          },
          {
            step: "Download your cropped image",
            detail:
              "Click the download button. The tool extracts only the pixels inside your selection, encodes a fresh image file in your chosen format, and saves it to your device, all processed locally in your browser.",
          },
        ]}
        whenToUse={[
          {
            scenario: "Making a profile picture or avatar",
            detail:
              "Crop a headshot or portrait to a clean 1:1 square for social media profiles, professional resumes, team pages, or ID photos, with the aspect ratio locked perfectly.",
          },
          {
            scenario: "Removing unwanted background or distractions",
            detail:
              "Cut out photobombers, cluttered edges, empty sky, or distracting objects from the borders of an otherwise great photo.",
          },
          {
            scenario: "Creating a thumbnail or hero image",
            detail:
              "Crop a wide photo to an exact 16:9 region for a YouTube thumbnail, blog header, or social media preview card that fits platform requirements precisely.",
          },
        ]}
        howItWorks="The cropper uses the HTML Canvas API running entirely in your browser. When you load an image, it is drawn onto an invisible canvas at its original resolution. The crop box defines a rectangular region. X and Y mark the top-left corner in pixels, and width and height set the dimensions of the selection. When you download, the tool draws only the pixels inside that region onto a new canvas sized to match the crop, then exports it in your chosen format. Because everything is done client-side with no server involved, your image never leaves your device, and the tool works offline once loaded."
        tips={[
          "Lock an aspect ratio before you start dragging. It saves time when you need a specific shape and the box stays perfectly proportioned as you resize.",
          "Use the pixel input fields for batch consistency. If you need several images cropped to the exact same dimensions, type the values instead of dragging by hand.",
          "Export as PNG if you plan to do further edits. PNG is lossless so no quality is lost before you apply additional adjustments in another tool.",
          "Check the output dimensions shown above the download button. Those pixel values are exactly what you will get in the saved file.",
          "For very large images, crop to the rough area first and then use the resize tool separately. This gives you finer control over the final pixel dimensions and file size.",
        ]}
        faqs={faqData}
        relatedTools={[
          { label: "Resize Image", href: "/tools/resize-image" },
          { label: "Rotate & Flip Image", href: "/tools/rotate-image" },
          { label: "Image Converter", href: "/tools/image-converter" },
          { label: "Compress Image", href: "/tools/compress-image" },
        ]}
      >
        <CropImage />
      </ToolPageLayout>
    </>
  );
}
