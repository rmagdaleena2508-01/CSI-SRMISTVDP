import Link from "next/link";
import type { ReactNode } from "react";
import { Img as Image } from "@/components/ui/Img";
import { ArrowRight, CalendarDays, MapPin, Mic } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
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
        card: "bg-[radial-gradient(120%_90%_at_100%_0%,rgba(190,242,100,0.28),transparent_55%),linear-gradient(145deg,#0c3b2a_0%,#14553a_48%,#186a42_100%)] text-white shadow-[0_40px_90px_-50px_rgba(8,40,26,0.9)]",
        eyebrow: "text-lime-200",
        title: "text-white",
        body: "text-emerald-50",
        meta: "text-emerald-50/95",
        button: "bg-lime-300 text-[#0c3b2a] font-medium hover:bg-lime-200",
        poster: "bg-white/6 ring-1 ring-white/15",
      }
    : {
        card: "bg-cream",
        eyebrow: "text-slate-blue",
        title: "text-navy",
        body: "text-slate-blue",
        meta: "text-navy/70",
        button: "bg-navy text-cream hover:bg-navy-700",
        poster: "bg-navy/5 ring-1 ring-navy/8",
      };

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
            className={
              backdrop
                ? "leaf-heading"
                : "display-heading text-headline font-semibold text-navy"
            }
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
        <div
          className={
            backdrop
              ? "relative isolate mt-12 overflow-hidden rounded-[2.5rem] p-5 sm:p-8 lg:p-14"
              : "mt-12"
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
            className={`metal-frame group grid grid-cols-1 items-center gap-10 rounded-[2rem] ${tone.card} p-6 transition-shadow duration-500 ease-[var(--ease-editorial)] hover:shadow-[0_40px_90px_-60px_rgba(18,38,92,0.65)] sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-10`}
          >
            <div className="flex flex-col gap-6">
              <span
                className={`text-eyebrow font-medium tracking-[0.18em] uppercase ${tone.eyebrow}`}
              >
                {event.category}
              </span>

              {/* On the highlight card the event can carry its own tagline and
                  bullet points, set in Times New Roman; the event page keeps
                  the full summary. */}
              <h3
                className={`text-headline max-w-[16ch] font-normal ${tone.title} ${
                  green && event.highlights ? "font-times" : ""
                }`}
              >
                {event.title}
              </h3>

              {green && event.highlights ? (
                <div className="font-times flex flex-col gap-4">
                  {event.tagline ? (
                    <p className="text-[1.5rem] leading-snug text-lime-200 italic">
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
                        <span>{point}</span>
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
                // The grass-and-cloud button from the design sheet. The cloud
                // echoes the hero's sky; the label sits clear of it on the
                // grass, in white with a dark green shadow so it reads on the
                // bright blades.
                <Link
                  href={`/events/${event.slug}`}
                  className="grass-button mt-2 inline-flex h-[4.25rem] w-[13.5rem] items-center justify-end gap-2 pr-7 text-[1rem] font-semibold tracking-[-0.01em] text-white"
                  style={
                    {
                      "--grass": `url(${asset("/images/brand/grass-cloud-button.png")})`,
                    } as React.CSSProperties
                  }
                >
                  View Event
                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <Link
                  href={`/events/${event.slug}`}
                  className={`mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] transition-colors duration-300 ${tone.button}`}
                >
                  View Event
                  <ArrowRight
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                  />
                </Link>
              )}
            </div>

            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-3xl ${tone.poster}`}
            >
              <Image
                src={event.image}
                alt={`${event.title} — event poster`}
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
