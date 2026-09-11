import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { insights } from "@/data/insights";
import { site } from "@/data/site";

export function InsightsSection() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="scroll-mt-24 border-y border-navy/10 bg-cream py-section"
    >
      <div className="container-editorial">
        <Reveal>
          <h2
            id="insights-heading"
            className="display-heading text-headline max-w-[14ch] font-semibold text-navy text-balance"
          >
            Ideas worth taking with you
          </h2>
        </Reveal>

        <ul className="mt-16 flex flex-col sm:mt-20">
          {insights.map((insight, i) => (
            <Reveal as="li" key={insight.statement} index={i}>
              <article className="grid grid-cols-1 gap-6 border-t border-navy/12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase lg:col-span-3">
                  {insight.source}
                </p>

                <div className="lg:col-span-9">
                  <p className="text-title max-w-[24ch] font-normal tracking-[-0.028em] text-navy text-balance">
                    {insight.statement}
                  </p>
                  <p className="text-lead mt-5 max-w-[58ch] text-slate-blue text-pretty">
                    {insight.detail}
                  </p>
                  <a
                    href={insight.href ?? site.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] text-navy"
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
      </div>
    </section>
  );
}
