import type Lenis from "lenis";

/**
 * The page's one smooth-scroll instance, set by SmoothScroll once it starts.
 * Null on touch screens, under reduced motion, and before hydration; callers
 * fall back to plain window scrolling then.
 */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
