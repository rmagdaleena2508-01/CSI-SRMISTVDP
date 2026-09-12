import { ArrowUpRight } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";

const channels = [
  {
    name: "LinkedIn",
    Icon: LinkedinIcon,
    copy: "Follow us on LinkedIn for insights and learnings from our sessions.",
    cta: "Follow on LinkedIn",
    href: site.socials.linkedin,
  },
  {
    name: "Instagram",
    Icon: InstagramIcon,
    copy: "Follow us on Instagram for event updates, behind-the-scenes moments and everything happening at CSI.",
    cta: "Follow on Instagram",
    href: site.socials.instagram,
  },
];

export function SocialCTA() {
  return (
    <section
      aria-labelledby="social-heading"
      className="relative isolate overflow-hidden bg-navy text-cream"
    >
      {/* Rolling hills, laptops and up. A phone shows so narrow a slice of the
          photo that the hills stop reading as a landscape, so it keeps the navy
          section instead. Navy also stays underneath as the colour shown while
          the photo loads. */}
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
        {/* A light navy tint across the very top only, enough for the
            sky-filled headline to separate from the photo's own sky. It is
            gone by the middle so the hills stay fully visible. */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/15 via-35% to-navy/0 to-55%" />
      </div>

      {/* Phones: the original single soft horizon glow over navy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full opacity-40 md:hidden"
        style={{
          background:
            "radial-gradient(closest-side, rgba(150,192,221,0.55), rgba(18,38,92,0))",
        }}
      />

      <div className="container-editorial py-section">
        <Reveal>
          <h2
            id="social-heading"
            className="display-heading sky-text text-display max-w-[11ch] font-semibold text-balance"
            style={
              {
                "--sky": `url(${asset("/images/brand/sky-wide.jpg")})`,
              } as React.CSSProperties
            }
          >
            Keep learning with CSI
          </h2>
          <p className="text-lead mt-8 max-w-[52ch] text-white text-pretty [text-shadow:0_1px_14px_rgba(18,38,92,0.55)]">
            The event ends. The learning doesn&rsquo;t. We share key takeaways,
            event highlights, opportunities and updates on our social channels.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 lg:gap-8">
          {channels.map((c, i) => (
            <Reveal as="li" key={c.name} index={i}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass group flex h-full flex-col justify-between gap-10 rounded-[1.75rem] p-8 sm:p-10"
              >
                {/* Cream on the navy phone layout, navy on the glass over the
                    photo — neither colour clears contrast on both. */}
                <div className="relative z-2">
                  <span className="grid size-11 place-items-center rounded-full bg-white/12 text-cream ring-1 ring-white/25 md:bg-white/45 md:text-navy md:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_6px_14px_-8px_rgba(18,38,92,0.5)] md:ring-white/70">
                    <c.Icon size={19} strokeWidth={1.6} />
                  </span>
                  <h3 className="text-title mt-7 font-normal tracking-[-0.025em] text-cream md:text-navy">
                    {c.name}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-[1.0625rem] leading-relaxed text-sky-200 md:text-navy/80">
                    {c.copy}
                  </p>
                </div>

                <span className="relative z-2 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-cream md:text-navy">
                  <span className="link-underline">{c.cta}</span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
