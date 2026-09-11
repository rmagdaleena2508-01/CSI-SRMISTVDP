import Link from "next/link";
import { Img as Image } from "@/components/ui/Img";
import { ArrowRight, CalendarDays, MapPin, Mic } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatEventDate, type ChapterEvent } from "@/data/events";

/**
 * The large editorial card. Used twice on the home page, for the month's
 * highlight and for what is coming up, so both stay identical when either
 * changes.
 */
export function FeatureEvent({
  event,
  heading,
  id,
}: {
  event: ChapterEvent;
  heading: string;
  id: string;
}) {
  const meta = [
    { Icon: CalendarDays, value: formatEventDate(event.date) },
    event.venue ? { Icon: MapPin, value: event.venue } : null,
    event.speaker ? { Icon: Mic, value: event.speaker.name } : null,
  ].filter(Boolean) as { Icon: typeof MapPin; value: string }[];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="container-editorial scroll-mt-24 py-section"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-navy/12 pt-8">
          <h2
            id={`${id}-heading`}
            className="display-heading text-headline font-semibold text-navy"
          >
            {heading}
          </h2>
          <Link
            href="/events"
            className="link-underline text-[0.9375rem] text-navy/70 hover:text-navy"
          >
            All sessions
          </Link>
        </div>
      </Reveal>

      <Reveal index={1}>
        <article className="metal-frame group mt-12 grid grid-cols-1 items-center gap-10 rounded-[2rem] bg-cream p-6 transition-shadow duration-500 ease-[var(--ease-editorial)] hover:shadow-[0_40px_90px_-60px_rgba(18,38,92,0.65)] sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-10">
          <div className="flex flex-col gap-6">
            <span className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
              {event.category}
            </span>

            <h3 className="text-headline max-w-[16ch] font-normal text-navy">
              {event.title}
            </h3>

            <p className="text-lead max-w-[46ch] text-slate-blue text-pretty">
              {event.summary}
            </p>

            <dl className="flex flex-wrap gap-x-7 gap-y-3 text-[0.875rem] text-navy/70">
              {meta.map(({ Icon, value }) => (
                <div key={value} className="flex items-center gap-2">
                  <Icon size={15} strokeWidth={1.6} aria-hidden />
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/events/${event.slug}`}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3 text-[0.9375rem] text-cream transition-colors duration-300 hover:bg-navy-700"
            >
              View Event
              <ArrowRight
                size={16}
                strokeWidth={1.7}
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy/5 ring-1 ring-navy/8">
            <Image
              src={event.image}
              alt={`${event.title} — event poster`}
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-contain transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
            />
          </div>
        </article>
      </Reveal>
    </section>
  );
}
