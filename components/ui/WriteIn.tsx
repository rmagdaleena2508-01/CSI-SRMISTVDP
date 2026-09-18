"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Writes its text in from left to right, like a pen, the first time it comes
 * into view. The server renders the text plainly, so it is readable without
 * JavaScript; only once this runs in the browser is it hidden ("armed"), and
 * it is written in as soon as it is on screen. Cards waiting off to the side
 * of a rail count as out of view, so their names write in as they slide in.
 */
export function WriteIn({
  as: Tag = "span",
  className = "",
  children,
}: {
  as?: "span" | "h3" | "p";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  // Layout effect, so the text is hidden before the first paint rather than
  // flashing on and then disappearing.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Written straight onto the element: this is a one-way DOM state for CSS,
    // with nothing in React that needs to re-render for it.
    el.dataset.write = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.write = "written";
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    // The parent is watched, not the text itself: the armed text is clipped
    // to nothing, and browsers count a clipped-away element as out of view.
    io.observe(el.parentElement ?? el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`name-write w-fit ${className}`}
    >
      {children}
    </Tag>
  );
}
