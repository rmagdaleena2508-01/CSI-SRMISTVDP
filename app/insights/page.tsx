import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { insights } from "@/data/insights";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "One idea worth keeping from each CSI Student Chapter session at SRMIST Vadapalani.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Ideas to keep."
        lead="Take the one line worth remembering from each session. Read the full write-up on LinkedIn."
      />

      <section
        aria-label="Insights"
        className="container-editorial pt-section pb-band"
      >
        <ul className="flex flex-col">
          {insights.map((insight, i) => (
            <Reveal as="li" key={insight.statement} index={i % 3}>
              <article className="grid grid-cols-1 gap-4 border-t border-navy/12 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase text-balance lg:col-span-3">
                  {insight.source}
                </p>

                <div className="lg:col-span-9">
                  <h2 className="text-title max-w-[28ch] font-semibold text-navy text-balance">
                    {insight.statement}
                  </h2>
                  <p className="text-lead mt-4 max-w-[60ch] text-slate-blue text-pretty">
                    {insight.detail}
                  </p>
                  <a
                    href={insight.href ?? site.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] text-navy"
                  >
                    <span className="link-underline">
                      Read the full insight on LinkedIn
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.7}
                      aria-hidden
                      className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <ClosingCTA />
    </>
  );
}
