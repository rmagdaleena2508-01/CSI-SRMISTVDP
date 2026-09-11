import { Img as Image } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";

type GalleryImage = { src: string; caption?: string };

export function EventGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="gallery-heading" className="py-section">
      <h2
        id="gallery-heading"
        className="display-heading text-headline font-semibold text-navy"
      >
        Event gallery
      </h2>

      <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {images.map(({ src, caption }, i) => (
          <Reveal as="li" key={src} index={i % 3}>
            <figure>
              <div className="metal-frame group relative aspect-[4/3] overflow-hidden rounded-3xl bg-sky-100">
                <Image
                  src={src}
                  // A caption sits beside the image for a sighted reader, so the
                  // alt text carries it rather than repeating a bare count.
                  alt={caption ?? `${title} — photograph ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
                />
              </div>

              {caption ? (
                <figcaption className="inter-accent mt-3 px-1 text-[0.8125rem] leading-snug tracking-[-0.005em] text-slate-blue text-pretty">
                  {caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
