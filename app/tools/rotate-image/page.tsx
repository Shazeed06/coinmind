import type { Metadata } from "next";
import RotateFlipImage from "@/components/tools/RotateFlipImage";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Rotate & Flip Image - Free Online Image Rotator" },
  description:
    "Free tool to rotate an image 90° left or right and flip it horizontally or vertically, with a live preview. Download as JPG, PNG or WebP.",
  alternates: { canonical: "/tools/rotate-image" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/rotate-image",
    title: "Rotate & Flip Image - Free Online Image Rotator",
    description:
      "Rotate images left or right and mirror them horizontally or vertically with a live preview. 100% private - nothing is uploaded.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rotate and Flip Image tool",
      },
    ],
  },
};

const faqData = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. Rotating and flipping happen entirely in your browser using the HTML Canvas API. The image is transformed and re-encoded on your own device, so it is never uploaded, stored or seen by anyone.",
  },
  {
    q: "What's the difference between rotating and flipping?",
    a: "Rotating turns the whole image around its centre in 90° steps. Flipping mirrors it: horizontal flip swaps left and right (like a mirror), while vertical flip swaps top and bottom. You can combine both.",
  },
  {
    q: "Can I fix a sideways photo from my phone?",
    a: "Yes. If a photo imported sideways or upside down, use Rotate left or Rotate right until it looks correct in the live preview, then download. The saved file keeps the corrected orientation.",
  },
  {
    q: "Does rotating an image lose quality?",
    a: "Rotating by 90° or flipping is lossless. The pixels are just rearranged, not resampled. The only quality change comes from the output format: PNG stays pixel-perfect, while JPG and WebP re-encode at high quality.",
  },
  {
    q: "Can I combine a rotation and a flip?",
    a: "Yes. The buttons stack, so you can rotate 90° and then flip horizontally, for example. The preview always shows the final result, and the downloaded file matches exactly what you see.",
  },
  {
    q: "Does rotating or flipping change the file size?",
    a: "Rotating or flipping does not change the number of pixels in the image, so the uncompressed data is the same size. The final file size depends on your chosen output format and its compression settings.",
  },
  {
    q: "Can I rotate or flip multiple images at once?",
    a: "This tool processes one image at a time. For multiple images, run them through one by one. Each takes only a few seconds since all processing happens locally on your device with no upload wait time.",
  },
  {
    q: "Does rotating strip EXIF metadata such as GPS location?",
    a: "Yes. The transformed image is drawn onto a canvas and encoded as a brand-new file, so camera metadata including GPS coordinates, device model, capture time and orientation flags is not carried across. That is helpful before sharing a photo publicly, but it also means the rotated copy loses cataloguing data, so keep your original if you need it.",
  },
  {
    q: "Does it work on a phone without an app?",
    a: "Yes. The Canvas API is built into every current mobile browser, so rotating and flipping work in Chrome, Safari and Firefox on Android and iOS with nothing to install. Tap the upload area to pick a photo from your camera roll, use the rotate and flip buttons, and save the finished file to your downloads.",
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
        name: "Rotate & Flip Image",
        item: `${site.url}/tools/rotate-image`,
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
        title="Rotate & Flip Image"
        description="Straighten a sideways photo or mirror an image in one click: rotate 90° left or right and flip horizontally or vertically, with a live preview and nothing uploaded."
        howToUse={[
          {
            step: "Upload your image",
            detail:
              "Drag and drop an image file onto the upload area, or click to browse your device. A live preview appears immediately showing your image in its current state.",
          },
          {
            step: "Rotate left or right",
            detail:
              "Click Rotate left to turn the image 90 degrees anti-clockwise, or Rotate right for a 90-degree clockwise turn. Click the button multiple times to reach 180 or 270 degrees of rotation.",
          },
          {
            step: "Flip horizontally or vertically",
            detail:
              "Click Flip horizontal to mirror the image left-to-right, like looking in a mirror. Click Flip vertical to mirror it top-to-bottom, creating an upside-down reflection.",
          },
          {
            step: "Check the live preview",
            detail:
              "The preview updates after every single action, so you always see exactly what the saved file will look like before you download. Rotations and flips stack, and the preview reflects the combined result.",
          },
          {
            step: "Choose format and download",
            detail:
              "Select JPG, PNG or WebP as your output format, then click download. The transformed image is encoded as a fresh file and saved to your device. All processing happens in your browser.",
          },
        ]}
        whenToUse={[
          {
            scenario: "Fixing a sideways or upside-down photo",
            detail:
              "A picture from your phone or camera imported in the wrong orientation. Rotate it right-side up in one or two clicks, no need to open editing software.",
          },
          {
            scenario: "Un-mirroring a selfie",
            detail:
              "Front-facing cameras often flip images horizontally by default. Use Flip horizontal to restore the photo so text reads correctly and faces look natural.",
          },
          {
            scenario: "Creating a reflected or symmetrical design",
            detail:
              "Flip an image vertically to produce a water-reflection effect, or flip a graphic element horizontally to create a symmetrical composition for a design project.",
          },
        ]}
        howItWorks="The tool uses the HTML Canvas API to transform your image in the browser. Rotation swaps the canvas width and height and redraws every pixel at the new angle. Flipping mirrors the canvas along the horizontal or vertical axis by applying a canvas transformation matrix. Because 90-degree rotations and flips only rearrange existing pixels (they never resample, interpolate or blend), the transform itself is completely lossless. The only quality consideration is the output format you select: PNG preserves every pixel exactly, while JPG and WebP apply compression that may introduce minor artefacts."
        tips={[
          "Combine rotation and flipping freely. You can rotate 90 degrees right and then flip horizontally. The actions stack, and the live preview always shows the final combined result.",
          "On desktop, rotating right twice is faster than rotating left four times if you need a 180-degree turn, two clicks instead of four.",
          "Export as PNG if you plan to do more edits on the image later. The lossless format means there is no generation loss from repeated saves.",
          "If an image already looks correctly oriented on your device but appears rotated here, check the EXIF orientation metadata. Some cameras and phones store a rotation flag that browsers ignore.",
        ]}
        faqs={faqData}
        relatedTools={[
          { label: "Crop Image", href: "/tools/crop-image" },
          { label: "Resize Image", href: "/tools/resize-image" },
          { label: "Image Converter", href: "/tools/image-converter" },
          { label: "Compress Image", href: "/tools/compress-image" },
        ]}
      >
        <RotateFlipImage />
      </ToolPageLayout>
    </>
  );
}
