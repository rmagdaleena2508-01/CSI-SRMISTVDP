"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TeamCard } from "@/components/team/TeamCard";
import { team } from "@/data/team";

/** Matches the gap-8 between cards. */
const GAP = 32;

export function TeamSection({ members = team }: { members?: typeof team }) {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const frame = requestAnimationFrame(sync);
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // One card per press, so the rail advances by a person rather than a
  // viewport — the arrow means "next person".
  const step = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const distance = card
      ? card.getBoundingClientRect().width + GAP
      : el.clientWidth;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const arrow =
    "grid size-10 place-items-center rounded-full ring-1 ring-navy/15 text-navy transition-colors duration-300 hover:bg-navy/5 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <section
      aria-labelledby="team-heading"
      className="container-editorial py-section"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-navy/12 pt-8">
          <div>
            <h2
              id="team-heading"
              className="display-heading text-headline font-semibold text-navy"
            >
              Meet the Team
            </h2>
            <p className="inter-italic mt-2 text-[0.9375rem] text-navy/70">
              of CSI SRMIST VDP Student Chapter
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous member"
              className={arrow}
            >
              <ArrowLeft size={17} strokeWidth={1.7} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Next member"
              className={arrow}
            >
              <ArrowRight size={17} strokeWidth={1.7} aria-hidden />
            </button>
          </div>
        </div>
      </Reveal>

      <ul
        ref={rail}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain pb-2"
      >
        {members.map((member, i) => (
          <li
            key={`${member.role}-${member.name ?? i}`}
            className="w-[76vw] shrink-0 snap-start sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
          >
            <TeamCard member={member} />
          </li>
        ))}
      </ul>
    </section>
  );
}
