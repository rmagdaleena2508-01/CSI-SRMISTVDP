import { EventsGrid } from "@/components/events/EventsGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { allEvents, recentEvents } from "@/data/events";

const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

export function RecentEvents() {
  const count = words[allEvents.length] ?? String(allEvents.length);

  return (
    <section
      aria-labelledby="recent-heading"
      className="container-editorial py-section"
    >
      <SectionHeader
        id="recent-heading"
        link={{ href: "/events", label: "Browse every session" }}
      >
        {count} sessions. One chapter.
      </SectionHeader>

      <div className="mt-10 sm:mt-14">
        <EventsGrid events={recentEvents} />
      </div>
    </section>
  );
}
