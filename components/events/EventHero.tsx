import { Img as Image } from "@/components/ui/Img";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowLeft } from "lucide-react";
import { formatEventDate, type ChapterEvent } from "@/data/events";

export function EventHero({ event }: { event: ChapterEvent }) {
  const meta = [
    { label: "Date", value: formatEventDate(event.date) },
    { label: "Category", value: event.category },
    event.speaker ? { label: "Speaker", value: event.speaker.name } : null,
    event.venue ? { label: "Venue", value: event.venue } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <header className="container-editorial pt-32 pb-section sm:pt-40">
      <Link
        href="/events"
        className="group inline-flex items-center gap-2 text-[0.875rem] text-navy/65 transition-colors hover:text-navy"
      >
        <ArrowLeft
          size={15}
          strokeWidth={1.7}
          aria-hidden
          className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:-translate-x-0.5"
        />
        <span className="link-underline">All sessions</span>
      </Link>

      <h1 className="display-heading text-display mt-6 max-w-[16ch] font-semibold text-navy text-balance">
        {event.title}
      </h1>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-navy/12 pt-8 sm:grid-cols-4 sm:gap-x-8">
        {meta.map((m) => (
          <div key={m.label} className="flex flex-col gap-2">
            <dt className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
              {m.label}
            </dt>
            <dd className="text-[0.9375rem] leading-snug text-navy sm:text-[1.0625rem]">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <ViewTransition
        name={`poster-${event.slug}`}
        share="poster-morph"
        default="none"
      >
        <div className="metal-frame relative mt-10 aspect-[4/5] overflow-hidden rounded-panel bg-navy/5 shadow-card sm:mt-14 sm:aspect-[16/9]">
          <Image
            src={event.image}
            alt={`${event.title} — photograph from the session`}
            fill
            priority
            sizes="(min-width: 1440px) 88rem, 100vw"
            className="object-contain"
          />
        </div>
      </ViewTransition>
    </header>
  );
}
