import Link from "next/link";
import { Camera } from "lucide-react";
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
        titleAside={
          // A camera reads as "photos" at a glance, so the way into the
          // photo library can stay this small.
          <Link
            href="/gallery"
            aria-label="Open the photo library"
            title="Photo library"
            className="camera-link group relative grid size-10 shrink-0 place-items-center rounded-full bg-navy/6 text-navy ring-1 ring-navy/10 transition-[background-color,transform] duration-300 ease-[var(--ease-editorial)] hover:-translate-y-0.5 hover:bg-navy/12 sm:size-11"
          >
            {/* On hover the camera takes a picture: it dips as if the shutter
                were pressed and a flash ring pops from the lens. */}
            <span aria-hidden className="camera-flash" />
            <Camera
              size={19}
              strokeWidth={1.7}
              aria-hidden
              className="camera-body"
            />
          </Link>
        }
      >
        {count} sessions. One chapter.
      </SectionHeader>

      <div className="mt-10 sm:mt-14">
        <EventsGrid events={recentEvents} />
      </div>
    </section>
  );
}
