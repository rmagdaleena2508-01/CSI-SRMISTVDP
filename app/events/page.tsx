import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { allEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, technical discussions, guest sessions and industry interactions hosted by the CSI Student Chapter at SRMIST Vadapalani.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Archive"
        title="Learn from people doing the work."
        lead="Browse every session the chapter has run. Open one to see the poster, the photos and the report."
      />

      <div className="container-editorial pt-section pb-band">
        <EventsExplorer events={allEvents} />
      </div>

      <ClosingCTA />
    </>
  );
}
