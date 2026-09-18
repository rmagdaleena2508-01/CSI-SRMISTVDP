import { Img as Image } from "@/components/ui/Img";
import { LinkedinIcon } from "@/components/ui/icons";
import type { TeamMember } from "@/data/team";
import { WriteIn } from "@/components/ui/WriteIn";

export function TeamCard({ member }: { member: TeamMember }) {
  const pending = !member.name;

  return (
    <article className="group flex h-full flex-col">
      <div className="metal-frame relative aspect-[4/5] overflow-hidden rounded-card bg-sky-100 shadow-card">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center bg-sky-50">
            <Image
              src="/images/brand/csi-glyph.svg"
              unoptimized
              alt=""
              width={72}
              height={72}
              loading="lazy"
              className="opacity-25"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1 pt-5">
        <span className="inter-accent text-eyebrow font-medium tracking-[0.16em] text-slate-blue uppercase">
          {member.role}
        </span>

        {/* The name writes itself in, like a signature, as the card comes
            into view. */}
        <WriteIn
          as="h3"
          className={`script-accent text-[1.375rem] leading-tight font-normal ${
            pending ? "text-slate-blue" : "text-navy"
          }`}
        >
          {member.name ?? "Announcing soon"}
        </WriteIn>

        {member.detail ? (
          <p className="text-[0.875rem] leading-snug text-slate-blue">
            {member.detail}
          </p>
        ) : null}

        {member.quote ? (
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-slate-blue">
            &ldquo;{member.quote}&rdquo;
          </p>
        ) : null}

        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="mt-3 inline-flex size-9 items-center justify-center rounded-full ring-1 ring-navy/12 text-navy/70 transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <LinkedinIcon size={16} strokeWidth={1.6} />
          </a>
        ) : null}
      </div>
    </article>
  );
}
