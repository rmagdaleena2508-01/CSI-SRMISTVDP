import { asset } from "@/lib/asset";

/**
 * Art-directed sky. A tall crop for phones, a wide crop for laptops — chosen by
 * <picture>, so only one file is ever downloaded. Plain <img> rather than
 * next/image: the two crops are already sized and compressed, and skipping the
 * optimizer keeps the largest paint on its shortest path.
 */
export function SkyBackdrop() {
  return (
    <div
      aria-hidden
      className="intro-sky pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={asset("/images/brand/sky-wide.jpg")}
          width={1920}
          height={1280}
        />
        <img
          src={asset("/images/brand/sky-tall.jpg")}
          alt=""
          width={1080}
          height={2348}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-[50%_40%]"
        />
      </picture>

      {/* Legibility scrim — deepens the sky behind the headline only. */}
      <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-navy/50 via-navy/20 to-transparent" />
      {/* Hand-off into the page's ivory. */}
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-ivory via-ivory/70 to-transparent" />
    </div>
  );
}
