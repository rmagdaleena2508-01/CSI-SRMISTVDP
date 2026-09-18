"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const SECRET = "csi";
/** Clicks on the hero emblem, within a couple of seconds, that set it off. */
const CLICKS = 5;
const COLOURS = ["#12265c", "#2b52a8", "#96c0dd", "#fcf9f4", "#bef264"];

/**
 * The hidden feature promised in the v1 launch post. Typing "csi" anywhere on
 * the page (outside a text field), or clicking the CSI emblem in the hero five
 * times, bursts confetti in the chapter's colours from both sides of the
 * screen and shows a short note. canvas-confetti skips the burst for anyone
 * with reduced motion turned on; the note still appears.
 */
export function EasterEgg() {
  const [found, setFound] = useState(false);

  useEffect(() => {
    let typed = "";
    let clicks = 0;
    let clickTimer = 0;
    let hideTimer = 0;

    const celebrate = () => {
      const burst = (x: number, angle: number) =>
        confetti({
          particleCount: 90,
          spread: 70,
          startVelocity: 55,
          angle,
          origin: { x, y: 0.75 },
          colors: COLOURS,
          disableForReducedMotion: true,
          zIndex: 200,
        });
      burst(0, 60);
      burst(1, 120);
      setFound(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setFound(false), 4200);
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      if (
        target instanceof Element &&
        target.closest("input, textarea, select, [contenteditable='true']")
      )
        return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed === SECRET) {
        typed = "";
        celebrate();
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element) || !target.closest("[data-easter-egg]"))
        return;
      clicks += 1;
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => (clicks = 0), 2000);
      if (clicks >= CLICKS) {
        clicks = 0;
        celebrate();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
      window.clearTimeout(clickTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] z-[210] flex justify-center px-5 transition-[opacity,transform] duration-500 ease-[var(--ease-editorial)] ${
        found ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {found ? (
        <p className="rounded-control bg-navy px-5 py-3 text-center text-[0.9375rem] font-medium text-cream shadow-card">
          You found a hidden feature. Welcome to CSI.
        </p>
      ) : null}
    </div>
  );
}
