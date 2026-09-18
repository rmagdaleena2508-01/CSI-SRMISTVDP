"use client";

import { useEffect } from "react";

/**
 * Marks the visit as "arrived" once the opening sequence has had time to play,
 * so moving back to the home page later shows it straight away (with the page
 * crossfade) instead of replaying the whole entrance.
 */
export function ArrivalMarker() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.documentElement.dataset.arrived = "";
    }, 2000);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
}
