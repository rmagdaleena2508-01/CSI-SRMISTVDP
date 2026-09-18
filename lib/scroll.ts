import { getLenis } from "./lenis";

const DURATION = 520;
/** Nav pill height plus breathing room, so a section never lands under it. */
const OFFSET = 88;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Scrolls to a section on a fixed, short timeline. The browser's own smooth
 * scroll stretches its duration with distance, which makes a jump to a section
 * far down the page feel sluggish; this always takes the same half second.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const start = window.scrollY;
  const target = Math.max(
    0,
    Math.round(el.getBoundingClientRect().top + start - OFFSET),
  );

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, {
      duration: DURATION / 1000,
      easing: easeInOutCubic,
    });
    return true;
  }

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Math.abs(target - start) < 2
  ) {
    window.scrollTo({ top: target, behavior: "instant" });
    return true;
  }

  const began = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - began) / DURATION);
    window.scrollTo({
      top: start + (target - start) * easeInOutCubic(p),
      behavior: "instant",
    });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return true;
}

/** Same timeline, aimed at the top of the page. */
export function scrollToTop() {
  const start = window.scrollY;
  if (start < 2) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: DURATION / 1000, easing: easeInOutCubic });
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  const began = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - began) / DURATION);
    window.scrollTo({
      top: start * (1 - easeInOutCubic(p)),
      behavior: "instant",
    });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export const SCROLL_DURATION = DURATION;
