"use client";

import { useMemo, useState } from "react";
import { EventsGrid } from "./EventsGrid";
import { CalendarClock } from "lucide-react";
import {
  eventCategories,
  upcomingCategories,
  type ChapterEvent,
  type EventCategory,
} from "@/data/events";

const pendingCopy: Partial<Record<EventCategory, string>> = {
  Workshop: "Our next workshops are being planned.",
  Discussion: "Our next discussions are being planned.",
  Industry: "Industry sessions are being lined up for this term.",
};

export function EventsExplorer({ events }: { events: ChapterEvent[] }) {
  const [filter, setFilter] = useState<"All" | EventCategory>("All");

  const pending =
    filter !== "All" && upcomingCategories.includes(filter as EventCategory);

  const visible = useMemo(
    () =>
      filter === "All" ? events : events.filter((e) => e.category === filter),
    [events, filter]
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter sessions by type"
        className="flex flex-wrap gap-2 border-t border-navy/12 pt-8"
      >
        {eventCategories.map((category) => {
          const active = category === filter;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-[0.875rem] tracking-[-0.01em] transition-colors duration-300 ${
                active
                  ? "bg-navy text-cream"
                  : "text-navy/70 ring-1 ring-navy/12 hover:bg-navy/5 hover:text-navy"
              } ${
                // The only category with sessions behind it, so it hovers above
                // the row while something else is selected.
                category === "Knowledge Session" && !active
                  ? "float-cta bg-cream text-navy"
                  : ""
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-14">
        {pending ? (
          <div className="metal-frame flex flex-col items-start gap-5 rounded-[2rem] bg-cream px-8 py-14 sm:px-12 sm:py-16">
            <span className="grid size-12 place-items-center rounded-full bg-sky-100 text-navy">
              <CalendarClock size={20} strokeWidth={1.6} aria-hidden />
            </span>
            <h3 className="display-heading text-title font-semibold text-navy">
              Coming soon
            </h3>
            <p className="text-lead max-w-[46ch] text-slate-blue text-pretty">
              {pendingCopy[filter as EventCategory]} Follow the chapter on
              LinkedIn and Instagram to hear about them first.
            </p>
          </div>
        ) : (
          <EventsGrid events={visible} priorityCount={3} />
        )}
      </div>
    </>
  );
}
