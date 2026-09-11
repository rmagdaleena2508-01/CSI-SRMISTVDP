import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LinkedinIcon } from "@/components/ui/icons";
import { SkyBackdrop } from "./SkyBackdrop";
import { CSIMark } from "./CSIMark";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <SkyBackdrop />

      <div className="container-editorial flex flex-1 flex-col justify-center pt-[clamp(5.25rem,11vh,7rem)] pb-[clamp(1rem,2vh,2rem)]">
        <div className="flex justify-center">
          <h1 className="font-display text-hero max-w-[16ch] text-center font-normal text-balance text-white sm:max-w-[24ch]">
            Where curious <span className="inter-accent">students</span>{" "}
            <span>
              build <span className="script-accent text-white">community</span>{" "}
              and <span className="script-accent text-white">technology</span>{" "}
              together.
            </span>
          </h1>
        </div>

        <p className="text-lead mx-auto mt-6 max-w-[46ch] text-center text-white/85 text-pretty">
          Workshops, conversations and hands-on learning from the CSI Student
          Chapter at SRMIST Vadapalani.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/events"
            className="group inline-flex h-11 w-56 items-center justify-center gap-2 rounded-full bg-cream px-6 text-[0.9375rem] sm:h-13 sm:px-7 sm:text-base font-medium tracking-[-0.01em] text-navy shadow-[0_12px_30px_-16px_rgba(10,26,64,0.8)] transition-colors duration-300 hover:bg-white"
          >
            Explore Events
            <ArrowRight
              size={17}
              strokeWidth={1.7}
              aria-hidden
              className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-0.5"
            />
          </Link>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-56 items-center justify-center gap-2 rounded-full bg-navy/85 px-6 text-[0.9375rem] sm:h-13 sm:px-7 sm:text-base font-medium tracking-[-0.01em] text-cream ring-1 ring-white/25 backdrop-blur-[2px] transition-colors duration-300 hover:bg-navy"
          >
            <LinkedinIcon size={16} strokeWidth={1.7} />
            Follow on LinkedIn
          </a>
        </div>

        <div className="relative mt-10">
          <div className="flex h-full items-center justify-center">
            <CSIMark />
          </div>
        </div>
      </div>

      <div className="container-editorial pointer-events-none relative z-10 pb-[clamp(1.5rem,3vh,2.75rem)]">
        <div className="flex items-end justify-between gap-6">
          <div className="pointer-events-auto hidden max-w-[42ch] sm:block">
            <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
              Est. 1965 · Student Chapter
            </p>
            <p className="mt-2.5 text-[0.875rem] leading-relaxed text-navy/75">
              The Computer Society of India is the country&rsquo;s oldest body
              of computing professionals. This is its student chapter at SRMIST
              Vadapalani.
            </p>
          </div>

          <AnchorLink
            id="happening"
            className="pointer-events-auto hidden shrink-0 items-center gap-2 text-[0.8125rem] tracking-[0.02em] text-navy/70 transition-colors hover:text-navy sm:inline-flex"
          >
            <span className="link-underline">Scroll</span>
            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-full ring-1 ring-navy/20"
            >
              <ArrowRight
                size={13}
                strokeWidth={1.7}
                className="rotate-90"
                aria-hidden
              />
            </span>
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
