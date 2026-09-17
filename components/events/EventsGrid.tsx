import { Reveal } from "@/components/ui/Reveal";
import { EventCard } from "./EventCard";
import type { ChapterEvent } from "@/data/events";

export function EventsGrid({
  events,
  priorityCount = 0,
}: {
  events: ChapterEvent[];
  priorityCount?: number;
}) {
  if (events.length === 0) {
    return (
      <p className="text-lead py-16 text-slate-blue">
        No sessions in this category yet.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
      {events.map((event, i) => (
        <Reveal as="li" key={event.slug} index={i % 3} className="h-full">
          <EventCard event={event} priority={i < priorityCount} />
        </Reveal>
      ))}
    </ul>
  );
}
