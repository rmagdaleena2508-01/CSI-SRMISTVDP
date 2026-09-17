import type { ReactNode } from "react";
import { Img as Image } from "@/components/ui/Img";
import { ArrowRight, CalendarDays, MapPin, Mic } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  albumCoverFor,
  formatEventDate,
  type ChapterEvent,
} from "@/data/events";

/**
 * The large editorial card. Used twice on the home page, for the month's
 * highlight and for what is coming up, so both stay identical when either
 * changes.
 */
export function FeatureEvent({
  event,
  heading,
  id,
  backdrop,
}: {
  event: ChapterEvent;
  heading: ReactNode;
  id: string;
  /** A photograph set around the card, framing it on all sides. */
  backdrop?: string;
}) {
  const meta = [
    { Icon: CalendarDays, value: formatEventDate(event.date) },
    event.venue ? { Icon: MapPin, value: event.venue } : null,
    event.speaker ? { Icon: Mic, value: event.speaker.name } : null,
  ].filter(Boolean) as { Icon: typeof MapPin; value: string }[];

  // The highlight card is green, set against its canopy photograph; the other
  // card keeps the cream editorial look. Every text colour on green is chosen
  // to clear contrast on the darkest and the lightest part of the gradient.
  const green = Boolean(backdrop);
  const tone = green
    ? {
        card: "bg-[radial-gradient(120%_90%_at_100%_0%,rgba(190,242,100,0.28),transparent_55%),linear-gradient(145deg,#0c3b2a_0%,#14553a_48%,#186a42_100%)] text-white",
        eyebrow: "text-lime-200",
        title: "text-white",
        body: "text-emerald-50",
        meta: "text-emerald-50/95",
        poster: "bg-white/6 ring-1 ring-white/15",
      }
    : {
        card: "bg-cream",
        eyebrow: "text-slate-blue",
        title: "text-navy",
        body: "text-slate-blue",
        meta: "text-navy/70",
        poster: "bg-navy/5 ring-1 ring-navy/8",
      };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="container-editorial scroll-mt-24 py-section"
    >
      <SectionHeader
        id={`${id}-heading`}
        link={{ href: "/events", label: "All sessions" }}
        headingClassName={
          backdrop
            ? "leaf-heading"
            : "display-heading text-headline font-semibold text-navy"
        }
      >
        {heading}
      </SectionHeader>

      <Reveal index={1}>
        <div
          className={
            backdrop
              ? "relative isolate mt-10 overflow-hidden rounded-panel p-4 sm:mt-12 sm:p-8 lg:p-14"
              : "mt-10 sm:mt-12"
          }
        >
          {backdrop ? (
            <Image
              src={backdrop}
              alt=""
              fill
              sizes="100vw"
              className="-z-10 object-cover object-center"
            />
          ) : null}
          <article
            className={`metal-frame group grid grid-cols-1 items-center gap-8 rounded-panel ${tone.card} p-5 shadow-card sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-10`}
          >
            <div className="flex flex-col gap-6">
              <span
                className={`text-eyebrow font-medium tracking-[0.18em] uppercase ${tone.eyebrow}`}
              >
                {event.category}
              </span>

              {/* On the highlight card the event can carry its own tagline and
                  bullet points; the event page keeps the full summary. */}
              <h3
                className={`text-title max-w-[20ch] font-semibold text-balance ${tone.title}`}
              >
                {event.title}
              </h3>

              {green && event.highlights ? (
                <div className="flex flex-col gap-4">
                  {event.tagline ? (
                    <p className="text-title text-lime-200 italic text-balance">
                      {event.tagline}
                    </p>
                  ) : null}
                  <ul
                    className={`bullet-copy flex max-w-[52ch] flex-col gap-2 ${tone.body}`}
                  >
                    {event.highlights.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-lime-300"
                        />
                        <span className="text-balance">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p
                  className={`text-lead max-w-[46ch] text-pretty ${tone.body}`}
                >
                  {event.summary}
                </p>
              )}

              <dl
                className={`flex flex-wrap gap-x-7 gap-y-3 text-[0.875rem] ${tone.meta}`}
              >
                {meta.map(({ Icon, value }) => (
                  <div key={value} className="flex items-center gap-2">
                    <Icon size={15} strokeWidth={1.6} aria-hidden />
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              {green ? (
                // Shimmer button: a lime pill in the card's highlight colour,
                // with a spark travelling round its rim and a glint of light
                // sweeping across it now and then, like sun on glass.
                <Button
                  href={`/events/${event.slug}`}
                  variant="shimmer"
                  className="mt-2 w-full sm:w-fit"
                >
                  View event
                  <ArrowRight
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                  />
                </Button>
              ) : (
                <Button
                  href={`/events/${event.slug}`}
                  className="mt-2 w-full sm:w-fit"
                >
                  View event
                  <ArrowRight
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                  />
                </Button>
              )}
            </div>

            {/* The month's highlight shows the event's album cover, the same
                artwork as in the photo library; the other card keeps the
                poster. */}
            <div
              className={`relative overflow-hidden rounded-card ${
                green ? "aspect-square" : `aspect-[4/5] ${tone.poster}`
              }`}
            >
              <Image
                src={green ? albumCoverFor(event) : event.image}
                alt={
                  green
                    ? `${event.title} album cover`
                    : `${event.title} — event poster`
                }
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-contain transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
              />
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
