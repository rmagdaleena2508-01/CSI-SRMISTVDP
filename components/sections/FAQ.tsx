import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faq } from "@/data/faq";
import { site } from "@/data/site";

/** Native disclosure, so every answer opens without JavaScript. */
export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="container-editorial scroll-mt-24 py-section"
    >
      <SectionHeader id="faq-heading">Questions, answered.</SectionHeader>

      <ul className="mx-auto mt-10 flex max-w-[48rem] flex-col gap-3 sm:mt-14">
        {faq.map((item, i) => (
          <Reveal as="li" key={item.q} index={i % 3}>
            <details className="group metal-frame rounded-card bg-cream shadow-card">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left text-[1.0625rem] font-medium tracking-[-0.015em] text-balance text-navy sm:px-6 [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden
                  className="shrink-0 text-slate-blue transition-transform duration-300 ease-[var(--ease-editorial)] group-open:rotate-45"
                />
              </summary>
              <p className="text-lead max-w-[60ch] px-5 pb-5 text-slate-blue text-pretty sm:px-6">
                {item.a}
              </p>
            </details>
          </Reveal>
        ))}
      </ul>

      <p className="mt-10 text-center text-[0.9375rem] text-slate-blue">
        Still have a question?{" "}
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-navy"
        >
          Message us on LinkedIn
        </a>
        .
      </p>
    </section>
  );
}
