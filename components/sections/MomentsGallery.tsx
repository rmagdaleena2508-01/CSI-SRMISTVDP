import Link from "next/link";
import { ArrowUpRight, Disc3 } from "lucide-react";
import { Img as Image } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";

// All four are landscape, so the composition varies by span and offset rather
// than by cropping a wide photograph into a portrait frame.
const moments = [
  {
    src: "/images/moments/session.jpg",
    alt: "A speaker presenting to a full lab during a CSI session",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/images/moments/lab.jpg",
    alt: "Faculty and students at the start of a session in the CSE lab",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/images/moments/audience.jpg",
    alt: "Members seated through a session in the computer lab",
    ratio: "aspect-[16/10]",
  },
  {
    src: "/images/moments/figma.jpg",
    alt: "Opening an introduction to design and Figma session",
    ratio: "aspect-[4/3]",
  },
];

function Frame({
  src,
  alt,
  ratio,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  ratio: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`metal-frame group relative ${ratio} overflow-hidden rounded-3xl bg-sky-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
      />
    </div>
  );
}

export function MomentsGallery() {
  return (
    <section
      id="moments"
      aria-labelledby="moments-heading"
      className="container-editorial pt-section pb-[clamp(4rem,8vw,7rem)]"
    >
      {/* The way into the photo library, set at the top right where a section
          label would sit. */}
      <div className="mb-8 flex justify-end">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 rounded-full bg-navy/6 py-2 pr-3 pl-4 text-[0.8125rem] tracking-[-0.005em] text-navy transition-colors duration-300 hover:bg-navy/12"
        >
          <Disc3
            size={15}
            strokeWidth={1.7}
            aria-hidden
            className="transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:rotate-180"
          />
          Photo library
          <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:self-end">
          <h2
            id="moments-heading"
            className="display-heading text-headline max-w-[13ch] font-semibold text-navy text-balance"
          >
            Learning looks better in action.
          </h2>
          <p className="text-lead mt-6 max-w-[40ch] text-slate-blue text-pretty">
            A glimpse into the sessions, conversations and experiences happening
            at CSI.
          </p>
        </Reveal>

        <Reveal index={1} className="lg:col-span-7">
          <Frame
            {...moments[0]}
            sizes="(min-width: 1024px) 56vw, 92vw"
          />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-4 lg:col-start-2">
          <Frame
            {...moments[1]}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          />
          {/* deliberate overlap — one only, on wide screens */}
          <div className="pointer-events-none absolute -right-16 -bottom-14 hidden w-60 xl:block">
            <div className="pointer-events-auto rounded-2xl bg-ivory p-1.5 shadow-[0_28px_60px_-40px_rgba(18,38,92,0.7)]">
              <Frame
                {...moments[3]}
                ratio="aspect-[4/3]"
                sizes="240px"
                className="rounded-xl"
              />
            </div>
          </div>
        </Reveal>

        <Reveal index={1} className="lg:col-span-5 lg:col-start-8 lg:mt-20">
          <Frame
            {...moments[2]}
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 46vw, 92vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
