import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mic } from "lucide-react";
import { EventHero } from "@/components/events/EventHero";
import { EventGallery } from "@/components/events/EventGallery";
import { EventCard } from "@/components/events/EventCard";
import { Reveal } from "@/components/ui/Reveal";
import { SocialCTA } from "@/components/sections/SocialCTA";
import { events, getEvent, relatedEvents } from "@/data/events";
import { site } from "@/data/site";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Session not found" };

  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      type: "article",
      title: event.title,
      description: event.summary,
      publishedTime: event.date,
      url: `${site.url}/events/${event.slug}`,
      images: [{ url: event.image }],
    },
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-headline font-normal text-navy">{title}</h2>
      <ul className="mt-8 flex flex-col">
        {items.map((item, i) => (
          <Reveal as="li" key={item} index={i}>
            <div className="flex gap-6 border-t border-navy/12 py-5">
              <span className="text-[0.8125rem] text-slate-blue tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lead max-w-[58ch] text-navy/85 text-pretty">
                {item}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const related = relatedEvents(slug);

  return (
    <>
      <EventHero event={event} />

      <div className="container-editorial">
        <section className="grid grid-cols-1 gap-10 py-section lg:grid-cols-12 lg:gap-16">
          <h2 className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase lg:col-span-3">
            Summary
          </h2>
          <p className="text-lead max-w-[62ch] text-navy/85 text-pretty lg:col-span-9 lg:text-[1.375rem] lg:leading-[1.5]">
            {event.summary}
          </p>
        </section>

        {event.explored?.length || event.takeaways?.length ? (
          <div className="grid grid-cols-1 gap-16 pb-section lg:grid-cols-2 lg:gap-20">
            {event.explored?.length ? (
              <List title="What we explored" items={event.explored} />
            ) : null}
            {event.takeaways?.length ? (
              <List title="Key takeaways" items={event.takeaways} />
            ) : null}
          </div>
        ) : null}

        {event.quote ? (
          <Reveal>
            <figure className="border-y border-navy/12 py-section">
              <blockquote className="text-headline max-w-[22ch] font-normal text-navy text-balance">
                &ldquo;{event.quote.text}&rdquo;
              </blockquote>
              <figcaption className="text-eyebrow mt-8 font-medium tracking-[0.18em] text-slate-blue uppercase">
                {event.quote.attribution}
              </figcaption>
            </figure>
          </Reveal>
        ) : null}

        {event.speaker ? (
          <Reveal>
            <section
              aria-labelledby="speaker-heading"
              className="flex flex-col gap-8 py-section sm:flex-row sm:items-start sm:gap-12"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sky-100 text-navy ring-1 ring-navy/10">
                <Mic size={20} strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <h2
                  id="speaker-heading"
                  className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase"
                >
                  Speaker
                </h2>
                <p className="text-title mt-4 font-normal tracking-[-0.025em] text-navy">
                  {event.speaker.name}
                </p>
                <p className="text-lead mt-2 text-slate-blue">
                  {event.speaker.role}
                </p>
                <p className="text-lead mt-6 max-w-[52ch] text-navy/75 text-pretty">
                  Sessions at the chapter are led by people doing the work —
                  practitioners, researchers and senior students who bring the
                  problem, not just the slides.
                </p>
              </div>
            </section>
          </Reveal>
        ) : null}

        {event.feedback?.length ? (
          <section
            aria-labelledby="feedback-heading"
            className="border-t border-navy/12 py-section"
          >
            <h2
              id="feedback-heading"
              className="display-heading text-headline font-semibold text-navy"
            >
              What students said
            </h2>

            <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              {event.feedback.map((note, i) => (
                <Reveal as="li" key={note.text} index={i} className="h-full">
                  <figure className="metal-frame flex h-full flex-col justify-between gap-6 rounded-[1.75rem] bg-cream p-8">
                    <blockquote className="text-lead text-navy/85 text-pretty">
                      &ldquo;{note.text}&rdquo;
                    </blockquote>
                    <figcaption className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
                      {note.attribution}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </section>
        ) : null}

        <EventGallery images={event.gallery ?? []} title={event.title} />

        <Reveal>
          <section className="flex flex-wrap items-center justify-between gap-6 border-t border-navy/12 py-14">
            <div>
              <h2 className="text-title font-normal tracking-[-0.025em] text-navy">
                Full event report
              </h2>
              <p className="text-lead mt-2 text-slate-blue">
                {event.reportUrl
                  ? "The complete write-up, with attendance and outcomes."
                  : "The complete write-up is published on our LinkedIn."}
              </p>
            </div>
            <a
              href={event.reportUrl ?? site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-[0.9375rem] text-cream transition-colors hover:bg-navy-700"
            >
              Read the report
              <ArrowUpRight
                size={16}
                strokeWidth={1.7}
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </section>
        </Reveal>

        {related.length > 0 ? (
          <section
            aria-labelledby="related-heading"
            className="border-t border-navy/12 py-section"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2
                id="related-heading"
                className="text-headline font-normal text-navy"
              >
                Related sessions
              </h2>
              <Link
                href="/events"
                className="link-underline text-[0.9375rem] text-navy/70 hover:text-navy"
              >
                All sessions
              </Link>
            </div>

            <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((e, i) => (
                <Reveal as="li" key={e.slug} index={i} className="h-full">
                  <EventCard event={e} />
                </Reveal>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <script
        type="application/ld+json"
        // Event schema helps the session pages surface properly in search.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            startDate: event.date,
            description: event.summary,
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: event.venue ?? site.institution,
            },
            organizer: { "@type": "Organization", name: site.legalName },
            ...(event.speaker
              ? { performer: { "@type": "Person", name: event.speaker.name } }
              : {}),
          }),
        }}
      />

      <SocialCTA />
    </>
  );
}
