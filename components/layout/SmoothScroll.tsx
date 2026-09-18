"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getLenis, setLenis } from "@/lib/lenis";

/**
 * Smooth scrolling with Lenis. A wheel or trackpad scroll glides to a stop
 * instead of jumping in steps, which also makes every scroll-linked effect on
 * the site (reveals, the shifting metal edges) move smoothly. Touch screens
 * keep their own native scrolling, which already has momentum, and reduced
 * motion keeps the browser's plain scrolling.
 *
 * Anywhere the page locks its scroll (the college card, the phone menu, the
 * photo viewer) sets overflow: hidden on <html> or <body>. Lenis would keep
 * scrolling underneath, so it is paused whenever either one is locked.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.12, wheelMultiplier: 1 });
    setLenis(lenis);

    const locked = () =>
      getComputedStyle(document.documentElement).overflow === "hidden" ||
      getComputedStyle(document.body).overflow === "hidden";
    const syncLock = () => (locked() ? lenis.stop() : lenis.start());
    const observer = new MutationObserver(syncLock);
    observer.observe(document.documentElement, {
      attributeFilter: ["style", "class"],
    });
    observer.observe(document.body, { attributeFilter: ["style", "class"] });

    return () => {
      observer.disconnect();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // A new page starts at the top, without gliding there from the old one.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
