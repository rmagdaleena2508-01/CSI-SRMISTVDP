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
      <PageHeader
        eyebrow="Photo library"
        title="Every session. Its own record."
        lead="Pick an album. The poster is the cover and the photos are inside."
      />

      <section className="container-editorial pt-section pb-band">
        <Reveal>
          <AlbumShelf albums={photoAlbums} />
        </Reveal>
      </section>

      <ClosingCTA />
    </>
  );
}
