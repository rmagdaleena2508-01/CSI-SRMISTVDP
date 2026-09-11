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
      {/* a single soft horizon glow, no gradient noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full opacity-40"
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
          <p className="text-lead mt-8 max-w-[52ch] text-sky-200 text-pretty">
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
                className="metal-frame group flex h-full flex-col justify-between gap-10 rounded-[1.75rem] bg-cream/6 p-8 transition-colors duration-500 hover:bg-cream/10 sm:p-10"
              >
                <div>
                  <span className="grid size-11 place-items-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/15">
                    <c.Icon size={19} strokeWidth={1.6} />
                  </span>
                  <h3 className="text-title mt-7 font-normal tracking-[-0.025em] text-cream">
                    {c.name}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-[1.0625rem] leading-relaxed text-sky-200">
                    {c.copy}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 text-[0.9375rem] text-cream">
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
