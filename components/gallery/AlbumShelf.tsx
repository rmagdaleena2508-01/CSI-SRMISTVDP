"use client";

import { useRef, useState } from "react";
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
 * The photo library.
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

  const current = albums[active];
  const open = openIndex === null ? null : albums[openIndex];

  // An album with no photographs yet still opens, on its cover alone.
  const slides = open
    ? open.photos.length
      ? open.photos.map((p) => ({
          src: asset(p.src),
          description: p.caption,
        }))
      : [
          {
            src: asset(open.cover),
            description:
              "Photographs from this session have not been added yet.",
          },
        ]
    : [];

  const openAlbum = (index: number) => setOpenIndex(index);

  return (
    <>
      {/* Laptops and up: the stack. */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          {/* Swiper sets each slide's height itself in vertical mode, so each
              cover takes its size from that height rather than carrying one of
              its own. */}
          <Swiper
            modules={[EffectCoverflow, Mousewheel, Keyboard, A11y]}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            onSlideChange={(s) => setActive(s.activeIndex)}
            direction="vertical"
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={2.9}
            spaceBetween={-96}
            speed={520}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.5,
              // Hands the wheel back to the page once the stack is at its
              // first or last case, so reaching the end of the albums does
              // not trap the page.
              releaseOnEdges: true,
            }}
            keyboard={{ enabled: true }}
            a11y={{ enabled: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 96,
              depth: 110,
              modifier: 1,
              // Held at 1 deliberately: coverflow compounds scale per step
              // away from the centre, so anything below 1 shrank the eighth
              // case to a chip and the stack read as a tunnel.
              scale: 1,
              slideShadows: false,
            }}
            className="h-[46rem] w-[32rem] max-w-full [&_.swiper-slide]:flex [&_.swiper-slide]:items-center [&_.swiper-slide]:justify-start [&_.swiper-slide]:transition-[opacity,filter] [&_.swiper-slide]:duration-500 [&_.swiper-slide:not(.swiper-slide-active)]:opacity-80 [&_.swiper-slide:not(.swiper-slide-active)]:brightness-90"
          >
            {albums.map((album, i) => (
              <SwiperSlide key={album.slug}>
                <button
                  type="button"
                  onClick={() =>
                    i === active ? openAlbum(i) : swiperRef.current?.slideTo(i)
                  }
                  aria-label={
                    i === active
                      ? `Open the album for ${album.title}`
                      : `Bring ${album.title} to the front`
                  }
                  className="block aspect-square h-full cursor-pointer rounded-[0.4rem] focus-visible:outline-none"
                >
                  <span className="relative block size-full overflow-hidden rounded-[0.4rem] shadow-[0_34px_60px_-34px_rgba(18,38,92,0.85)]">
                    <Image
                      src={album.cover}
                      alt={`${album.title} album cover`}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="lg:col-span-5">
          <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
            {current.category}
          </p>
          <h2 className="display-heading text-title mt-4 font-semibold text-navy text-balance">
            {current.title}
          </h2>
          <p className="mt-3 text-[0.9375rem] text-slate-blue">
            {formatEventDate(current.date)} · {countLabel(current.photos.length)}
          </p>
          <button
            type="button"
            onClick={() => openAlbum(active)}
            className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[0.9375rem] font-medium tracking-[-0.01em] text-cream transition-colors duration-300 hover:bg-navy-700"
          >
            Open this album
            <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden />
          </button>
          <p className="mt-5 max-w-[34ch] text-[0.875rem] leading-relaxed text-slate-blue">
            Scroll or drag through the stack, then click the front case to look
            inside.
          </p>
        </div>
      </div>

      {/* Phones and tablets: the same albums as covers you can tap. */}
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:hidden">
        {albums.map((album, i) => (
          <li key={album.slug}>
            <button
              type="button"
              onClick={() => openAlbum(i)}
              className="w-full text-left"
            >
              <div className="relative aspect-square overflow-hidden rounded-[0.4rem] shadow-[0_20px_40px_-28px_rgba(18,38,92,0.8)]">
                <Image
                  src={album.cover}
                  alt={`${album.title} album cover`}
                  fill
                  sizes="(min-width: 640px) 30vw, 44vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[0.9375rem] leading-snug text-navy">
                {album.title}
              </p>
              <p className="mt-1 text-[0.8125rem] text-slate-blue">
                {countLabel(album.photos.length)}
              </p>
            </button>
          </li>
        ))}
      </ul>

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
