import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AlbumShelf } from "@/components/gallery/AlbumShelf";
import { Reveal } from "@/components/ui/Reveal";
import { photoAlbums } from "@/data/events";

export const metadata: Metadata = {
  title: "Photo library",
  description:
    "Every CSI Student Chapter session as an album — the poster on the cover, the photographs inside.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section className="container-editorial pt-32 pb-section sm:pt-40">
      <Reveal>
        <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
          Photo library
        </p>
        <h1 className="display-heading text-headline mt-6 max-w-[18ch] font-semibold text-navy text-balance">
          Every session, pressed onto its own record.
        </h1>
        <p className="text-lead mt-6 max-w-[52ch] text-slate-blue text-pretty">
          One album per session. The poster is the cover, the photographs are
          inside.
        </p>
      </Reveal>

      <Reveal index={1} className="mt-14 sm:mt-20">
        <AlbumShelf albums={photoAlbums} />
      </Reveal>

      <Link
        href="/#moments"
        className="group mt-16 inline-flex items-center gap-2 text-[0.9375rem] text-navy"
      >
        <ArrowLeft
          size={16}
          strokeWidth={1.7}
          aria-hidden
          className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:-translate-x-0.5"
        />
        <span className="link-underline">Back to the home page</span>
      </Link>
    </section>
  );
}
