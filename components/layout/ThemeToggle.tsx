"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { flushSync } from "react-dom";
import { Expand } from "@theme-toggles/react";
import "@theme-toggles/react/styles/expand.css";

/**
 * Light and dark mode. The site always opens in light; this switches the
 * current visit only, so nothing is stored.
 *
 * The icon is the "Expand" toggle from toggles.dev: the sun's rays pull in and
 * it becomes a moon. The page crossfades between themes in about a third of a
 * second using the View Transitions API. The night sky and the metal emblem
 * are fetched quietly once the page is idle, so switching never waits on a
 * download. Browsers without View Transitions, and reduced motion, switch in
 * one step.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  // Warm the dark-mode images once the page has settled, so the first switch
  // has nothing left to load.
  useEffect(() => {
    const warm = () => {
      for (const src of [
        "/images/brand/sky-night.jpg",
        "/images/brand/csi-emblem-metal.webp",
      ]) {
        const img = new Image();
        img.src = asset(src);
      }
    };
    const idle =
      window.requestIdleCallback ??
      ((fn: () => void) => window.setTimeout(fn, 1500));
    const handle = idle(warm);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  const apply = (next: boolean) => {
    flushSync(() => setDark(next));
    const root = document.documentElement;
    if (next) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#0a1330" : "#f7f2e9");
  };

  const toggle = () => {
    const next = !dark;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reduced) {
      apply(next);
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-reveal");
    const transition = document.startViewTransition(() => apply(next));
    transition.finished.finally(() => root.classList.remove("theme-reveal"));
  };

  return (
    <Expand
      toggled={dark}
      onClick={toggle}
      duration={600}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`glass glass-orb grid size-11 shrink-0 place-items-center rounded-full text-navy backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 ease-[var(--ease-editorial)] active:scale-95 [&_svg]:size-5 ${className}`}
    />
  );
}
