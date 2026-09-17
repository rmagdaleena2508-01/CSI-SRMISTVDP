import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamCard } from "@/components/team/TeamCard";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The student office bearers and faculty leadership behind the CSI Student Chapter at SRMIST Vadapalani.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Office bearers, 2026–27"
        title="The people behind it."
        lead="They plan the sessions, run the room and hand the chapter on each year, guided by faculty."
      />

      <section
        aria-label="Student leadership"
        className="container-editorial pt-section pb-band"
      >
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 border-t border-navy/12 pt-10 sm:grid-cols-2 sm:gap-y-14 sm:pt-14 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((member, i) => (
            <Reveal
              as="li"
              key={`${member.role}-${i}`}
              index={i % 4}
              className="h-full"
            >
              <TeamCard member={member} />
            </Reveal>
          ))}
        </ul>
      </section>

      <ClosingCTA />
    </>
  );
}
