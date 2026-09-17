import type { ReactNode } from "react";

/** Top of every inner page. Centred on phones, left-aligned from tablets up. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="container-editorial flex flex-col items-center pt-32 pb-section text-center sm:items-start sm:pt-40 sm:text-left">
      <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
        {eyebrow}
      </p>
      <h1 className="display-heading text-display mt-5 max-w-[18ch] font-semibold text-navy text-balance">
        {title}
      </h1>
      {lead ? (
        <p className="text-lead mt-6 max-w-[54ch] text-slate-blue text-pretty">
          {lead}
        </p>
      ) : null}
      {children}
    </section>
  );
}
