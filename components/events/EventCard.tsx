import Link from "next/link";
import { ViewTransition } from "react";
import { Img as Image } from "@/components/ui/Img";
import { ArrowRight } from "lucide-react";
import { formatEventDate, type ChapterEvent } from "@/data/events";

type Props = {
  event: ChapterEvent;
  /** First row above the fold on /events can skip lazy loading. */
  priority?: boolean;
};

export function EventCard({ event, priority = false }: Props) {
  return (
    <article className="group h-full">
      <Link
        href={`/events/${event.slug}`}
        className="flex h-full flex-col rounded-card outline-offset-4"
      >
        {/* Named so the poster flies from this card into the event page's
            hero when the card is opened (see app/template.tsx). */}
        <ViewTransition
          name={`poster-${event.slug}`}
          share="poster-morph"
          default="none"
        >
          <div className="metal-frame relative aspect-[3/4] overflow-hidden rounded-card bg-navy/5 shadow-card">
            <Image
              src={event.image}
              alt={`${event.title} — session photograph`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              className="object-contain transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
            />
          </div>
        </ViewTransition>

        <div className="flex flex-1 flex-col gap-3 px-1 pt-5">
          <span className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
            {event.category}
          </span>
          <h3 className="text-title font-normal text-navy text-balance">
            {event.title}
          </h3>
          <p className="text-lead text-slate-blue text-pretty">
            {event.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-navy/10 pt-4">
            <time
              dateTime={event.date}
              className="text-[0.8125rem] text-slate-blue tabular-nums"
            >
              {formatEventDate(event.date)}
            </time>
            <span className="inline-flex items-center gap-1.5 text-[0.875rem] text-navy">
              View session
              <ArrowRight
                size={15}
                strokeWidth={1.7}
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
