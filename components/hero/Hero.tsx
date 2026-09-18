import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustLine } from "@/components/ui/TrustLine";
import { LinkedinIcon } from "@/components/ui/icons";
import { SkyBackdrop } from "./SkyBackdrop";
import { CSIMark } from "./CSIMark";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { site } from "@/data/site";

const headline: { text: string; style?: "inter" | "script" }[] = [
  { text: "Where" },
  { text: "curious" },
  { text: "students", style: "inter" },
  { text: "build" },
  { text: "community", style: "script" },
  { text: "and" },
  { text: "technology", style: "script" },
  { text: "together." },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <SkyBackdrop />

      <div className="container-editorial flex flex-1 flex-col justify-center pt-[clamp(5.25rem,11vh,7rem)] pb-[clamp(1rem,2vh,2rem)]">
        <div className="flex justify-center">
          {/* The headline builds itself on load: each word rises out of its
              line in turn, and the two script words are written in from left
              to right as if by hand. It is plain CSS, so the text is in the
              HTML from the first byte and never waits on JavaScript. */}
          <h1 className="hero-headline font-display text-hero max-w-[16ch] text-center font-normal text-balance text-white sm:max-w-[24ch]">
            {headline.map((word, i) => (
              <span key={i}>
                <span
                  className={
                    word.style === "script"
                      ? "script-write script-accent text-white"
                      : `word-rise ${word.style === "inter" ? "inter-accent" : ""}`
                  }
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {word.text}
                </span>{" "}
              </span>
            ))}
          </h1>
        </div>

        <p className="intro-rise text-lead mx-auto mt-6 max-w-[40ch] [--d:0.8s] text-center text-white/90 text-pretty">
          Join a session, ask the speaker, take the notes home. Run by the CSI
          Student Chapter at SRMIST Vadapalani.
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            href={site.join.href}
            variant="light"
            className="intro-rise [--d:0.95s]"
          >
            <LinkedinIcon size={16} strokeWidth={1.7} />
            {site.join.label}
          </Button>
          <Button
            href="/events"
            variant="glass"
            className="intro-rise [--d:1.05s]"
          >
            Explore events
            <ArrowRight
              size={16}
              strokeWidth={1.7}
              aria-hidden
              className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-0.5"
            />
          </Button>
        </div>

        <TrustLine
          tone="light"
          className="intro-rise mt-5 [--d:1.1s] [text-shadow:0_1px_2px_rgba(18,38,92,0.6),0_0_14px_rgba(18,38,92,0.55)]"
        />

        <div className="intro-float relative mt-10 [--d:1.15s]">
          <div className="flex h-full items-center justify-center">
            <CSIMark />
          </div>
        </div>
      </div>

      <div className="container-editorial pointer-events-none relative z-10 pb-[clamp(1.5rem,3vh,2.75rem)]">
        <div className="intro-rise flex items-end justify-between gap-6 [--d:1.3s]">
          <div className="pointer-events-auto hidden max-w-[42ch] sm:block">
            <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
              Est. 1965 · Student Chapter
            </p>
            <p className="mt-2.5 text-[0.875rem] leading-relaxed text-navy/75 text-pretty">
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
