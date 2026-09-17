import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
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
    <>
      {/* Phones and tablets get the usual page header. On laptops the title
          moves into the library itself, beside the stack, so the albums and
          the button that opens them share one screen. */}
      <div className="lg:hidden">
        <PageHeader
          eyebrow="Photo library"
          title="Every session. Its own record."
          lead="Swipe to pick an album. The poster is the cover and the photos are inside."
        />
      </div>

      <section className="container-editorial pt-section pb-band lg:pt-24">
        <Reveal>
          <AlbumShelf albums={photoAlbums} />
        </Reveal>
      </section>

      <ClosingCTA />
    </>
  );
}
