"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { A11y, EffectCoverflow, Keyboard, Mousewheel } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { ArrowUpRight } from "lucide-react";
import { Img as Image } from "@/components/ui/Img";
import { asset } from "@/lib/asset";
import { formatEventDate, type PhotoAlbum } from "@/data/events";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const countLabel = (n: number) =>
  n === 1 ? "1 photograph" : `${n} photographs`;

/**
 * Held apart from the page's own scrolling: while the pointer is over the
 * stack, the wheel belongs to the albums and nothing else moves. React
 * registers its onWheel passively at the root, so preventDefault there is
 * ignored — this has to be attached to the element itself with passive:false.
 */
const stopPageScroll = (e: WheelEvent) => e.preventDefault();

/**
 * The photo library.
 *
 * One stack, centred on the page and sized to the screen, so the covers are
 * large enough to read without zooming. Laptops scroll it vertically, with the
 * wheel or by dragging. Phones swipe it sideways: a vertical stack there
 * filled the screen and swallowed the thumb that was trying to scroll the
 * page, which is why it once needed a separate curved scroller beside it.
 *
 * The stack is Swiper's coverflow effect rather than hand-written pointer
 * tracking. The earlier version moved the active case toward the cursor, which
 * pushed a neighbour under the pointer and flipped the selection back — the
 * cases flickered as the two fought. Here the selection only changes on a real
 * slide change, and Swiper owns the transforms.
 */
export function AlbumShelf({ albums }: { albums: PhotoAlbum[] }) {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  // Both stacks are in the document at once and only hidden by CSS, so the
  // phone one keeps its own index and instance rather than writing over the
  // laptop one's.
  const [phoneActive, setPhoneActive] = useState(0);
  const phoneSwiperRef = useRef<SwiperClass | null>(null);

  // The wheel listener is added to Swiper's own element in onSwiper, so it is
  // taken off again when this leaves the page.
  useEffect(
    () => () => {
      swiperRef.current?.el?.removeEventListener("wheel", stopPageScroll);
    },
    [],
  );

  const open = openIndex === null ? null : albums[openIndex];

  // An album with no photographs yet opens on a friendly placeholder rather
  // than an empty viewer.
  const slides = open
    ? open.photos.length
      ? open.photos.map((p) => ({
          src: asset(p.src),
          description: p.caption,
        }))
      : [
          {
            src: asset("/images/brand/no-photos.jpg"),
            alt: "No photos of this event yet",
          },
        ]
    : [];

  const openAlbum = (index: number) => setOpenIndex(index);

  const details = (
    album: PhotoAlbum,
    index: number,
    layout: "stacked" | "side",
  ) => (
    <div
      className={
        layout === "side"
          ? "relative isolate mt-10 w-full max-w-md overflow-hidden rounded-card px-8 py-8 text-left"
          : "relative isolate mx-auto mt-8 w-full max-w-md overflow-hidden rounded-card px-6 py-7 text-center sm:mt-10 sm:px-8"
      }
    >
      {/* One sheet of crushed paper, fixed behind the titles. It stays put as
          the stack moves from album to album and rocks a third of a degree so
          it reads as paper. Inset past the edges so the corners never swing
          into view. */}
      <span
        aria-hidden
        className="paper-panel absolute -inset-8 -z-10"
        style={
          {
            "--paper": `url(${asset("/images/brand/crushed-paper.jpg")})`,
          } as React.CSSProperties
        }
      />
      <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
        {album.category}
      </p>
      <h2 className="display-heading text-title mt-3 font-semibold text-navy text-balance">
        {album.title}
      </h2>
      <p className="mt-2 text-[0.9375rem] text-slate-blue">
        {formatEventDate(album.date)} ·{" "}
        {/* An empty album still opens on the "no photos yet" picture, so
            it holds one photograph rather than none. */}
        {countLabel(Math.max(1, album.photos.length))}
      </p>
      <button
        type="button"
        onClick={() => openAlbum(index)}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-control bg-navy px-6 text-[0.9375rem] font-medium tracking-[-0.01em] text-cream shadow-card transition-colors duration-300 hover:bg-navy-700 sm:w-auto"
      >
        Open this album
        <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden />
      </button>
    </div>
  );

  const cover = (
    album: PhotoAlbum,
    i: number,
    current: number,
    ref: React.RefObject<SwiperClass | null>,
    sizes: string,
  ) => (
    <button
      type="button"
      onClick={() => (i === current ? openAlbum(i) : ref.current?.slideTo(i))}
      aria-label={
        i === current
          ? `Open the album for ${album.title}`
          : `Bring ${album.title} to the front`
      }
      className="block aspect-square cursor-pointer rounded-[0.5rem] focus-visible:outline-none"
    >
      <span className="relative block size-full overflow-hidden rounded-[0.5rem] shadow-[0_34px_60px_-34px_rgba(18,38,92,0.85)]">
        <Image
          src={album.cover}
          alt={`${album.title} album cover`}
          fill
          sizes={sizes}
          loading={i < 3 ? "eager" : "lazy"}
          className="object-cover"
        />
      </span>
    </button>
  );

  const fade =
    "[&_.swiper-slide]:transition-[opacity,filter] [&_.swiper-slide]:duration-500 [&_.swiper-slide:not(.swiper-slide-active)]:opacity-75 [&_.swiper-slide:not(.swiper-slide-active)]:brightness-90";

  return (
    <>
      {/* Laptops and up: one screen. The title and the current album's
          details sit on the left, the vertical stack on the right, sized to
          the window, so scrolling the stack changes the details beside it
          and "Open this album" is always in view. Nobody has to scroll the
          page between looking at a cover and opening it. */}
      <div className="hidden lg:grid lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-16">
        <div>
          <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
            Photo library
          </p>
          <h1 className="display-heading text-display mt-5 max-w-[14ch] font-semibold text-navy text-balance">
            Every session. Its own record.
          </h1>
          <p className="text-lead mt-5 max-w-[42ch] text-slate-blue text-pretty">
            Scroll the stack to pick an album, then open it. The poster is the
            cover and the photos are inside.
          </p>
          {details(albums[active], active, "side")}
        </div>

        <Swiper
          modules={[EffectCoverflow, Mousewheel, Keyboard, A11y]}
          onSwiper={(s) => {
            swiperRef.current = s;
            s.el.addEventListener("wheel", stopPageScroll, { passive: false });
            // Tells the smooth-scroll layer to leave the wheel to the stack.
            s.el.setAttribute("data-lenis-prevent", "");
          }}
          onSlideChange={(s) => setActive(s.activeIndex)}
          direction="vertical"
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.85}
          spaceBetween={-40}
          speed={520}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.5,
            // Off on purpose: releasing at the ends handed the wheel back to
            // the page mid-gesture, so a trackpad flick scrolled the page while
            // the stack was still moving.
            releaseOnEdges: false,
          }}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 60,
            depth: 120,
            modifier: 1,
            // Held at 1: coverflow compounds scale per step, so anything lower
            // shrank the far covers to chips.
            scale: 1,
            slideShadows: false,
          }}
          className={`h-[min(44rem,calc(100svh-11rem))] w-full [&_.swiper-slide]:flex [&_.swiper-slide]:items-center [&_.swiper-slide]:justify-center [&_.swiper-slide>button]:mx-auto [&_.swiper-slide>button]:h-full ${fade}`}
        >
          {albums.map((album, i) => (
            <SwiperSlide key={album.slug}>
              {cover(album, i, active, swiperRef, "420px")}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Phones and tablets: the same stack, swiped sideways, with the front
          cover about three quarters of the screen wide. */}
      <div className="lg:hidden">
        {/* Clipped at the screen edges: Swiper lays the whole strip out in a
            row, and letting it overflow widened the page on phones. */}
        <div className="-mx-[var(--spacing-gutter)] overflow-x-clip">
          <Swiper
            modules={[EffectCoverflow, A11y]}
            onSwiper={(s) => {
              phoneSwiperRef.current = s;
            }}
            onSlideChange={(s) => setPhoneActive(s.activeIndex)}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1.3}
            spaceBetween={-24}
            speed={460}
            a11y={{ enabled: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 40,
              depth: 110,
              modifier: 1,
              scale: 1,
              slideShadows: false,
            }}
            className={`py-4 [&_.swiper-slide>button]:w-full ${fade}`}
          >
            {albums.map((album, i) => (
              <SwiperSlide key={album.slug}>
                {cover(album, i, phoneActive, phoneSwiperRef, "76vw")}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <p className="mt-3 text-center text-[0.8125rem] text-slate-blue">
          Swipe through the albums, then tap the front one to look inside.
        </p>
        {details(albums[phoneActive], phoneActive, "stacked")}
      </div>

      <Lightbox
        open={openIndex !== null}
        close={() => setOpenIndex(null)}
        slides={slides}
        plugins={[Captions, Counter, Thumbnails, Zoom]}
        captions={{ descriptionTextAlign: "center" }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        thumbnails={{ width: 96, height: 72, border: 0, gap: 10 }}
        carousel={{ finite: true, padding: "36px" }}
        styles={{
          container: { backgroundColor: "rgba(10, 26, 64, 0.94)" },
          thumbnailsContainer: { backgroundColor: "rgba(10, 26, 64, 0.94)" },
        }}
        animation={{ fade: 320, swipe: 420 }}
      />
    </>
  );
}
