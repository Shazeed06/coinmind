"use client";

import { useEffect, useRef } from "react";

type AdSlotProps = {
  /** Unique identifier for this ad unit on the page */
  adUnit: string;
  /** Fixed width + height to reserve space and prevent CLS */
  width?: number;
  height?: number;
  /** Only render ads if the site has an AdSense client ID configured */
  enabled?: boolean;
};

export function AdSlot({ adUnit, width = 728, height = 90, enabled = false }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    try {
      // @ts-expect-error: AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not loaded, skip gracefully */
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="mx-auto my-8 flex items-center justify-center overflow-hidden"
      style={{ width, height, minHeight: height }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width, height }}
        data-ad-client="ca-pub-5677983073792236"
        data-ad-slot={adUnit}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
