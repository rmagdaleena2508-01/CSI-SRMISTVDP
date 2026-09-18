import { LinkedinIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TrustLine } from "@/components/ui/TrustLine";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";

/**
 * The last band on every page: one line, the main button, and the facts about
 * joining repeated from the hero.
 */
export function ClosingCTA() {
  return (
    <section
      aria-labelledby="closing-heading"
      className="theme-fixed relative isolate overflow-hidden bg-navy text-cream"
    >
      {/* Rolling hills, laptops and up. A phone shows so narrow a slice of the
          photo that the hills stop reading as a landscape, so it keeps the navy
          band instead. Navy also stays underneath while the photo loads. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- a backdrop
            that needs the base-path prefix, already sized and compressed */}
        <img
          src={asset("/images/brand/hills.jpg")}
          alt=""
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[50%_70%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/25 via-45% to-navy/5" />
      </div>

      {/* Phones: a single soft horizon glow over navy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full opacity-40 md:hidden"
        style={{
          background:
            "radial-gradient(closest-side, rgba(150,192,221,0.55), rgba(18,38,92,0))",
        }}
      />

      <div className="container-editorial py-band">
        <Reveal className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <h2
            id="closing-heading"
            className="display-heading sky-text text-display font-semibold text-balance"
            style={
              {
                "--sky": `url(${asset("/images/brand/sky-wide.jpg")})`,
              } as React.CSSProperties
            }
          >
            Be part of what&rsquo;s next.
          </h2>
          <p className="text-lead mt-6 max-w-[46ch] text-white text-pretty [text-shadow:0_1px_14px_rgba(18,38,92,0.55)]">
            Follow the chapter on LinkedIn, catch the next session and bring a
            friend who would enjoy it.
          </p>
          <Button
            href={site.join.href}
            variant="light"
            className="mt-10 w-full sm:w-auto"
          >
            <LinkedinIcon size={16} strokeWidth={1.7} />
            {site.join.label}
          </Button>
          <TrustLine
            tone="light"
            className="mt-5 [text-shadow:0_1px_2px_rgba(18,38,92,0.6),0_0_14px_rgba(18,38,92,0.55)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
