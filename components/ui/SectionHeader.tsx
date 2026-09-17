import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Heading row shared by the home page sections. Centred on phones, where a
 * heading and a link side by side would squeeze both; split left and right
 * from tablets up.
 */
export function SectionHeader({
  id,
  children,
  sub,
  link,
  headingClassName = "display-heading text-headline font-semibold text-navy",
  aside,
}: {
  id: string;
  children: ReactNode;
  sub?: ReactNode;
  link?: { href: string; label: string };
  headingClassName?: string;
  aside?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-4 border-t border-navy/12 pt-8 text-center sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:text-left">
        <div>
          <h2 id={id} className={`${headingClassName} text-balance`}>
            {children}
          </h2>
          {sub ? (
            <p className="inter-italic mt-2 text-[0.9375rem] text-navy/70 text-pretty">
              {sub}
            </p>
          ) : null}
        </div>
        {link ? (
          <Link
            href={link.href}
            className="link-underline text-[0.9375rem] text-navy/70 hover:text-navy"
          >
            {link.label}
          </Link>
        ) : null}
        {aside}
      </div>
    </Reveal>
  );
}
