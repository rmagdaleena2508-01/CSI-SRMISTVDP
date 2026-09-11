import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { EventsGrid } from "@/components/events/EventsGrid";
import { recentEvents } from "@/data/events";

export function RecentEvents() {
  return (
    <section
      aria-labelledby="recent-heading"
      className="container-editorial py-section"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-navy/12 pt-8">
          <h2
            id="recent-heading"
            className="display-heading text-headline font-semibold text-navy"
          >
            Recent sessions
          </h2>
          <Link
            href="/events"
            className="link-underline text-[0.9375rem] text-navy/70 hover:text-navy"
          >
            Browse the archive
          </Link>
        </div>
      </Reveal>

      <div className="mt-14">
        <EventsGrid events={recentEvents} />
      </div>
    </section>
  );
}
