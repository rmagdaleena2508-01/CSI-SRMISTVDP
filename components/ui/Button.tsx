import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "glass" | "shimmer";

// Every button on the site: 48px tall, 14px corners, one shadow. Variants only
// change colour, so a button reads the same wherever it sits.
const base =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-control px-6 text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap shadow-card transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-editorial)] active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-cream hover:bg-navy-700",
  secondary:
    "bg-cream text-navy ring-1 ring-navy/15 ring-inset hover:bg-white",
  // On photographs and navy bands.
  light: "bg-cream text-navy hover:bg-white",
  glass:
    "bg-navy/80 text-cream ring-1 ring-white/25 ring-inset backdrop-blur-[2px] hover:bg-navy",
  // The month's highlight only: lime pill with a spark round the rim and a
  // glint across the face (see .shimmer in globals.css).
  shimmer: "shimmer rounded-full bg-[#86c43a]",
};

type Props = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className={cls}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
