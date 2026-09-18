import Link from "next/link";
import { Img as Image } from "@/components/ui/Img";
import { site } from "@/data/site";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Chapter",
    links: [
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Team", href: "/team" },
      { label: "Insights", href: "/insights" },
      { label: "Photo library", href: "/gallery" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "LinkedIn", href: site.socials.linkedin },
      { label: "Instagram", href: site.socials.instagram },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "DM on LinkedIn", href: site.socials.linkedin },
      { label: "FAQ", href: "/about#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="container-editorial flex flex-col gap-12 py-band">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/brand/csi-emblem.png"
                alt=""
                width={40}
                height={40}
                // The emblem is navy line work; in dark mode it sits on a
                // white disc so it stays visible.
                className="rounded-full dark:bg-white dark:p-0.5"
              />
              <div>
                <p className="text-[1.0625rem] leading-tight font-semibold tracking-[-0.02em] text-navy">
                  {site.name}
                </p>
                <p className="text-[0.8125rem] text-slate-blue">
                  {site.institution}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-slate-blue text-pretty">
              {site.tagline}
            </p>
          </div>

          {/* Two columns on phones, three side by side from laptops up. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[0.875rem] font-semibold tracking-[-0.01em] text-navy">
                  {column.title}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const cls =
                      "link-underline text-[0.9375rem] text-slate-blue hover:text-navy";
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cls}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={cls}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-navy/10 pt-8 sm:flex-row sm:justify-between sm:gap-6">
          <p className="text-[0.8125rem] tracking-[-0.005em] text-slate-blue">
            &copy; {new Date().getFullYear()} Computer Society of India, SRMIST
            Vadapalani Student Chapter. All rights reserved.
          </p>
          <p className="text-[0.8125rem] tracking-[-0.005em] text-slate-blue">
            {site.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
