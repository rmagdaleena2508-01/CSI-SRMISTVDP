import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Page transitions. Moving between pages is a transition in the App Router, so
 * wrapping each page in <ViewTransition> lets the browser's View Transitions
 * API crossfade the old page into the new one. Named elements inside (event
 * posters) fly from their spot on one page to their spot on the next. The
 * header is pinned in CSS so it stays still while the content changes.
 * Browsers without View Transitions, and reduced motion, simply swap pages.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}
