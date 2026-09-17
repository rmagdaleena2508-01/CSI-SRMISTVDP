import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ } from "@/components/sections/FAQ";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "What the Computer Society of India is, what the SRMIST Vadapalani Student Chapter does, and why it exists.",
  alternates: { canonical: "/about" },
};

const blocks = [
  {
    label: "The society",
    title: "India's oldest computing community.",
    body: "CSI started in 1965. It connects working professionals, teachers and students across the country who want to share what they know about computing, through chapters, publications and events.",
  },
  {
    label: "The chapter",
    title: "The campus version, run by students.",
    body: "We bring that idea to SRMIST Vadapalani: workshops, tech talks, guest sessions and industry meet-ups. Students plan them. Students run them. Students show up.",
  },
  {
    label: "Why it exists",
    title: "Curiosity needs somewhere to go.",
    body: "Your syllabus decides what you study. A chapter is where you find out what you actually enjoy, by sitting in a room with people trying things you haven't touched yet.",
  },
  {
    label: "How sessions work",
    title: "Short. Focused. Hands-on.",
    body: "Every session digs into one topic instead of skimming ten. You walk out with something you can use: a working example, a clear picture of how it fits together, or a good reason to go read more.",
  },
  {
    label: "Continuity",
    title: "Names change. The habit stays.",
    body: "Faculty coordinators guide the chapter. Student office bearers run it, then hand it over each year. Everything we put here stays as a record for whoever comes next.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Be curious out loud."
        lead="Build things, ask questions and figure out tech with students learning the same things. We are the Computer Society of India Student Chapter at SRMIST Vadapalani."
      />

      <section className="container-editorial py-section">
        <ul className="flex flex-col">
          {blocks.map((block, i) => (
            <Reveal as="li" key={block.label} index={i % 3}>
              <article className="grid grid-cols-1 gap-4 border-t border-navy/12 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase lg:col-span-3">
                  {block.label}
                </p>
                <div className="lg:col-span-9">
                  <h2 className="display-heading text-title max-w-[22ch] font-semibold text-navy text-balance">
                    {block.title}
                  </h2>
                  <p className="text-lead mt-4 max-w-[60ch] text-slate-blue text-pretty">
                    {block.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="pb-section">
        <FAQ />
      </div>

      <ClosingCTA />
    </>
  );
}
