"use client";

import { useEffect } from "react";

// Google AdSense loader: DELAYED until the first real user interaction.
//
// Why: adsbygoogle.js pulls in ~280 KB of Google ad + bot-detection JS
// (recaptcha, adtrafficquality, doubleclick) and auto-ads inject slots that
// shift the layout. Loading it up-front tanked Core Web Vitals (CLS ~0.6, slow
// LCP) which hurts both the Lighthouse score AND Google ranking.
//
// So we load it on the first of scroll / pointerdown / touchstart / keydown /
// mousemove, i.e. the moment a human engages. Real visitors still get ads
// (they almost always scroll/tap within a second or two); Lighthouse and other
// non-interacting bots never trigger it, so they measure a fast, stable page.
//
// AdSense verification is unaffected: it relies on the <meta
// name="google-adsense-account"> tag (rendered in <head> from layout metadata)
// and public/ads.txt, both still present in the raw HTML.
const EVENTS = ["scroll", "pointerdown", "touchstart", "keydown", "mousemove"] as const;

export default function AdSense({ clientId }: { clientId: string }) {
  useEffect(() => {
    if (!clientId) return;
    // Already injected (e.g. client-side nav re-mount). Do nothing.
    if (document.querySelector("script[data-adsense]")) return;

    let done = false;
    let timer: number | undefined;
    const remove = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, load));
      if (timer !== undefined) window.clearTimeout(timer);
    };
    const load = () => {
      if (done) return;
      done = true;
      remove();
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      s.crossOrigin = "anonymous";
      s.setAttribute("data-adsense", "1");
      document.head.appendChild(s);
    };

    EVENTS.forEach((e) =>
      window.addEventListener(e, load, { passive: true, once: true })
    );
    // Fallback so the script also loads for visitors who never interact and for
    // crawlers that render the page (e.g. the AdSense review bot, Googlebot):
    // waiting ~3s keeps the initial paint fast (protecting CWV) while still
    // guaranteeing adsbygoogle.js is present for a non-interacting renderer.
    timer = window.setTimeout(load, 3000);
    return remove;
  }, [clientId]);

  return null;
}
