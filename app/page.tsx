import { Hero } from "@/components/hero/Hero";
import { FeatureEvent } from "@/components/sections/FeatureEvent";
import { RecentEvents } from "@/components/sections/RecentEvents";
import { TeamSection } from "@/components/sections/TeamSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import {
  allEvents,
  featuredEvent,
  formatEventMonth,
  highlightEvent,
} from "@/data/events";
import { ChapterStats } from "@/components/sections/ChapterStats";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ChapterStats
        stats={[
          { value: allEvents.length, label: "sessions" },
          // Confirmed by the chapter; update as attendance grows.
          { value: 400, suffix: "+", label: "students" },
          {
            value: new Set(
              allEvents.flatMap((e) => (e.speaker ? [e.speaker.name] : [])),
            ).size,
            label: "speakers",
          },
        ]}
      />

      {highlightEvent ? (
        <FeatureEvent
          id="highlight"
          heading={
            <>
              Highlight of <em>{formatEventMonth(highlightEvent.date)}</em>.
            </>
          }
          event={highlightEvent}
          backdrop="/images/brand/highlight-canopy.jpg"
        />
      ) : null}

      <FeatureEvent
        id="happening"
        heading="Happening this month."
        event={featuredEvent}
      />
      <RecentEvents />
      <TeamSection />
      <ClosingCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            // Every form students actually type, so searches for any of them
            // resolve to this chapter rather than one at another college.
            alternateName: [
              "CSI SRMIST Vadapalani",
              "CSI SRM Vadapalani",
              "CSI Student Chapter SRM",
              "Computer Society of India SRMIST Vadapalani",
            ],
            url: site.url,
            logo: `${site.url}/images/brand/csi-emblem.png`,
            image: `${site.url}/images/brand/og.jpg`,
            description: site.description,
            address: {
              "@type": "PostalAddress",
              streetAddress: "SRMIST Vadapalani Campus",
              addressLocality: "Chennai",
              addressRegion: "Tamil Nadu",
              postalCode: "600026",
              addressCountry: "IN",
            },
            parentOrganization: {
              "@type": "CollegeOrUniversity",
              name: "SRM Institute of Science and Technology, Vadapalani Campus",
              url: "https://srmistvdp.edu.in/",
            },
            memberOf: {
              "@type": "Organization",
              name: "Computer Society of India",
              url: "https://csi-india.org/",
              foundingDate: "1965",
            },
            sameAs: [site.socials.linkedin, site.socials.instagram],
          }),
        }}
      />
    </>
  );
}
