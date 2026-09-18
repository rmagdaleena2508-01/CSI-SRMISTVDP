"use client";

import Link from "next/link";
import { Img as Image } from "@/components/ui/Img";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/icons";
import { navigation, site } from "@/data/site";
import { scrollToTop } from "@/lib/scroll";
import { CollegeCard } from "./CollegeCard";
import { ThemeToggle } from "./ThemeToggle";

/** Seconds between one row unfolding and the next. */
const FOLD_STAGGER = 0.065;
const ROWS = navigation.length + 1;

/** Seconds for the folded rows to close back up, bottom row first. */
const CLOSE_STAGGER = 0.04;
const CLOSE = ROWS * CLOSE_STAGGER + 0.2;

// The glass sheet is a sheet of paper too. It hangs from its top edge, tipped
// back a little, and falls forward to flat while its lower edge travels down
// with the rows. Closing reverses it at the same pace as the rows, so the
// sheet folds up with them instead of vanishing once they are gone.
//
// The lower edge is a CSS variable inside the clip-path. Animating clip-path
// strings directly snapped: the browser rewrites "inset(0% 0% 0% 0%)" to
// "inset(0%)", the two no longer match, and Motion jumps instead of tweening.
// A single percentage always interpolates.
const sheet: Variants = {
  folded: {
    "--sheet-edge": "100%",
    rotateX: -28,
    opacity: 0,
    transition: {
      "--sheet-edge": { duration: CLOSE, ease: [0.55, 0, 0.45, 1] },
      rotateX: { duration: CLOSE, ease: [0.55, 0, 0.45, 1] },
      opacity: { duration: 0.14, delay: CLOSE - 0.14, ease: "linear" },
      staggerChildren: CLOSE_STAGGER,
      staggerDirection: -1,
    },
  },
  open: {
    "--sheet-edge": "0%",
    rotateX: 0,
    opacity: 1,
    transition: {
      "--sheet-edge": {
        duration: ROWS * FOLD_STAGGER + 0.26,
        ease: [0.25, 0.8, 0.3, 1],
      },
      rotateX: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
      opacity: { duration: 0.1, ease: "linear" },
      staggerChildren: FOLD_STAGGER,
      delayChildren: 0.03,
    },
  },
};

const fold: Variants = {
  folded: {
    rotateX: -90,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
  open: {
    rotateX: 0,
    opacity: 1,
    // A touch under-damped, so each row lands like paper flopping flat
    // rather than a panel sliding into place.
    transition: {
      rotateX: { type: "spring", stiffness: 240, damping: 17, mass: 0.8 },
      opacity: { duration: 0.12 },
    },
  },
};

const crease: Variants = {
  folded: { opacity: 1 },
  open: { opacity: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** One panel of the folded strip, hinged on its top edge. */
function Fold({
  index,
  reduced,
  children,
}: {
  index: number;
  reduced: boolean | null;
  children: ReactNode;
}) {
  if (reduced) return <div>{children}</div>;
  // Zigzag lighting: a fold that tips away from you is in shadow, the next
  // one tips toward the light.
  const shade =
    index % 2 === 0
      ? "linear-gradient(180deg, rgba(18,38,92,0.32), rgba(18,38,92,0.06))"
      : "linear-gradient(0deg, rgba(255,255,255,0.75), rgba(255,255,255,0))";
  return (
    <motion.div
      variants={fold}
      className="relative"
      style={{ transformOrigin: "50% 0%", transformPerspective: 700 }}
    >
      {children}
      <motion.span
        aria-hidden
        variants={crease}
        className="pointer-events-none absolute inset-0 rounded-control"
        style={{ background: shade }}
      />
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [collegeOpen, setCollegeOpen] = useState(false);
  const frame = useRef(0);
  const sealRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  // One passive listener, coalesced into a frame, state written only on cross.
  useEffect(() => {
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setScrolled((prev) => {
          const next = window.scrollY > 24;
          return next === prev ? prev : next;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Already on the home route, the router has nothing to do and the page would
  // sit wherever it was, so Home takes it back to the top instead.
  const goHome = (event: React.MouseEvent, href: string) => {
    if (event.metaKey || event.ctrlKey) return;
    if (href === "/" && pathname === "/") {
      event.preventDefault();
      scrollToTop();
      history.replaceState(null, "", "/");
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    // Without motion there is no landing to wait for.
    if (reduced) document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, reduced]);

  const socialLinks = [
    { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="intro-drop container-editorial flex items-center justify-between gap-4 py-4 sm:py-5">
        {/* Wordmark. The seal is its own control, so it sits beside the home
            link rather than inside it — a button nested in an anchor is invalid
            and swallows one of the two actions. */}
        <div
          className={`glass flex items-center gap-2.5 rounded-full p-1.5 backdrop-blur-2xl backdrop-saturate-150 sm:pr-4 ${
            scrolled ? "glass-solid" : ""
          }`}
        >
          <button
            ref={sealRef}
            type="button"
            onClick={() => setCollegeOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={collegeOpen}
            aria-label={`About ${site.institution}`}
            className="grid size-9 place-items-center rounded-full bg-white/90 ring-1 ring-navy/8 transition-transform duration-300 ease-[var(--ease-editorial)] hover:scale-105"
          >
            <Image
              src="/images/brand/srmist-seal.png"
              alt=""
              width={244}
              height={238}
              priority
              className="size-7 object-contain"
            />
          </button>

          <Link
            href="/"
            className="hidden text-[0.9375rem] leading-tight font-medium tracking-[-0.02em] text-navy sm:block"
            aria-label={`${site.name}, ${site.institution} — home`}
          >
            CSI Student Chapter
            <span className="block text-[0.6875rem] font-normal tracking-[0.08em] text-slate-blue uppercase">
              SRMIST Vadapalani
            </span>
          </Link>
        </div>

        {/* Desktop pill navigation */}
        <nav
          aria-label="Primary"
          className={`glass hidden items-center gap-1 rounded-full p-1 backdrop-blur-2xl backdrop-saturate-150 lg:flex ${
            scrolled ? "glass-solid" : ""
          }`}
        >
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => goHome(e, item.href)}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.875rem] tracking-[-0.01em] transition-colors duration-300 ${
                  active
                    ? "bg-navy text-cream"
                    : "text-navy/80 hover:bg-navy/6 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Socials + mobile trigger */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={site.join.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-control bg-navy px-4 text-[0.875rem] font-medium tracking-[-0.01em] whitespace-nowrap text-cream shadow-card transition-colors duration-300 hover:bg-navy-700 sm:px-5"
          >
            <LinkedinIcon
              size={15}
              strokeWidth={1.7}
              className="hidden sm:block"
            />
            {site.join.label}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`glass glass-orb grid size-11 place-items-center rounded-full text-navy backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 ease-[var(--ease-editorial)] active:scale-95 lg:hidden ${
              scrolled ? "glass-solid" : ""
            }`}
          >
            {open ? (
              <X size={19} strokeWidth={1.6} aria-hidden />
            ) : (
              <Menu size={19} strokeWidth={1.6} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel. It unfolds like a strip of paper folded into a
          zigzag: each row hangs off the bottom edge of the one above and
          swings down from edge-on to flat, one after another, so from the
          front the menu drops open in steps. Alternate rows carry a crease
          shadow or a catch of light that clears as they flatten, which is
          what sells the paper. The glass sheet behind is clipped open in step
          with the rows so no empty glass shows below the last one. Closing
          folds the rows back up from the bottom. */}
      <AnimatePresence>
        {open ? (
          <div id="mobile-nav" className="container-editorial lg:hidden">
            <motion.nav
              aria-label="Primary mobile"
              className="glass-panel mt-1 flex flex-col rounded-panel p-3 backdrop-blur-3xl backdrop-saturate-[180%]"
              style={
                reduced
                  ? undefined
                  : ({
                      clipPath:
                        "inset(-1px -1px var(--sheet-edge) -1px round 2rem)",
                      transformOrigin: "50% 0%",
                      transformPerspective: 900,
                    } as React.CSSProperties)
              }
              variants={reduced ? undefined : sheet}
              // Scroll is locked once the sheet has landed. Locking on the tap
              // reflows the page in the same frame the fold starts, which is
              // what made the opening lurch.
              onAnimationComplete={(definition) => {
                if (definition === "open") {
                  document.documentElement.style.overflow = "hidden";
                }
              }}
              initial={reduced ? false : "folded"}
              animate="open"
              exit={reduced ? undefined : "folded"}
            >
              {navigation.map((item, i) => (
                <Fold key={item.label} index={i} reduced={reduced}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      goHome(e, item.href);
                      // Close after the click finishes dispatching. Removing
                      // the panel synchronously takes the anchor away
                      // mid-event, which can drop the navigation that was
                      // supposed to follow it.
                      requestAnimationFrame(() => setOpen(false));
                    }}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-control px-4 py-3.5 text-title font-normal tracking-[-0.02em] transition-colors ${
                      isActive(item.href)
                        ? "bg-navy text-cream"
                        : "text-navy hover:bg-white/45"
                    }`}
                  >
                    {item.label}
                  </Link>
                </Fold>
              ))}
              <Fold index={navigation.length} reduced={reduced}>
                <div className="mt-2 flex gap-2 border-t border-white/50 pt-3">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        requestAnimationFrame(() => setOpen(false))
                      }
                      className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-control bg-white/45 px-4 text-[0.9375rem] text-navy ring-1 ring-white/60 transition-colors hover:bg-white/70"
                    >
                      <Icon size={16} strokeWidth={1.6} />
                      {label}
                    </a>
                  ))}
                </div>
              </Fold>
            </motion.nav>
          </div>
        ) : null}
      </AnimatePresence>
      <CollegeCard
        open={collegeOpen}
        onClose={() => setCollegeOpen(false)}
        origin={sealRef}
      />
    </header>
  );
}
