"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { A11y, FreeMode, Keyboard, Mousewheel } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamCard } from "@/components/team/TeamCard";
import { team } from "@/data/team";

import "swiper/css";
import "swiper/css/free-mode";

/**
 * The team rail. Swiper's free mode gives it momentum: flick or drag it and it
 * keeps gliding, slowing to a stop the way an iPhone list does, then settles
 * on the nearest card so nobody is left half in view. It works with a mouse
 * drag, a trackpad swipe and a finger alike. The arrows still step one person
 * at a time.
 */
export function TeamSection({ members = team }: { members?: typeof team }) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = (s: SwiperClass) => {
    setAtStart(s.isBeginning);
    setAtEnd(s.isEnd);
  };

  const arrow =
    "grid size-10 place-items-center rounded-full ring-1 ring-navy/15 text-navy transition-colors duration-300 hover:bg-navy/5 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <section
      aria-labelledby="team-heading"
      className="container-editorial py-section"
    >
      <SectionHeader
        id="team-heading"
        sub={
          <>Office bearers of CSI SRMIST VDP Student Chapter, 2026&ndash;27</>
        }
        aside={
          // Phones swipe the rail, so the arrows only appear from tablets up.
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={atStart}
              aria-label="Previous member"
              className={arrow}
            >
              <ArrowLeft size={17} strokeWidth={1.7} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={atEnd}
              aria-label="Next member"
              className={arrow}
            >
              <ArrowRight size={17} strokeWidth={1.7} aria-hidden />
            </button>
          </div>
        }
      >
        The people behind it.
      </SectionHeader>

      <Swiper
        modules={[FreeMode, Mousewheel, Keyboard, A11y]}
        onSwiper={(s) => {
          swiperRef.current = s;
          sync(s);
        }}
        onSlideChange={sync}
        onProgress={sync}
        onResize={sync}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.9,
          momentumVelocityRatio: 0.9,
          momentumBounceRatio: 0.6,
          // Settle on the nearest card once the glide runs out.
          sticky: true,
        }}
        grabCursor
        speed={500}
        // Sideways trackpad swipes move the rail; vertical wheel scrolling is
        // left to the page.
        mousewheel={{ forceToAxis: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{ enabled: true }}
        slidesPerView={1.28}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 32 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className="mt-10 sm:mt-14"
      >
        {members.map((member, i) => (
          <SwiperSlide
            key={`${member.role}-${member.name ?? i}`}
            className="!h-auto"
          >
            <TeamCard member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
