"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Img as Image } from "@/components/ui/Img";

const COLLEGE_URL = "https://srmistvdp.edu.in/";

/** Columns in the dissolve grid; rows follow from the card's shape. */
const COLS = 12;
/** Seconds for the pixel front to sweep from the top edge to the bottom. */
const SWEEP = 0.42;
/** Longest random delay added to a single pixel, so rows break up unevenly. */
const JITTER = 0.09;
/** How long a pixel stays solid before it starts to fade. */
const HOLD = 0.1;
const FADE = 0.2;
const TOTAL_MS = (SWEEP + JITTER * 2 + HOLD + FADE) * 1000;

type Pixel = {
  row: number;
  col: number;
  tint: boolean;
  jitterIn: number;
  jitterOut: number;
};

/**
 * The college seal in the navigation opens this. Closing it breaks the card
 * into pixels that sweep away from top to bottom.
 *
 * The technique follows React Bits' Pixel Transition: a grid of solid squares
 * is laid over the content, the content is hidden once the squares cover it,
 * and the squares are then removed. Here the squares arrive row by row with a
 * little random jitter instead of in random order, the card is clipped away
 * just behind the arriving rows, and each square fades and drops a few pixels
 * as it goes, so the card reads as crumbling downwards.
 */
export function CollegeCard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  // Set when a close starts; the grid it holds is what the dissolve draws.
  const [grid, setGrid] = useState<{ rows: number; pixels: Pixel[] } | null>(
    null
  );
  const dissolving = grid !== null;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const requestClose = useCallback(() => {
    if (reduced) {
      onClose();
      return;
    }
    if (timer.current) return;
    const card = cardRef.current;
    const box = card?.getBoundingClientRect();
    const rows = box
      ? Math.max(1, Math.round(box.height / (box.width / COLS)))
      : 14;
    // Random values are drawn once, here, so a re-render mid-dissolve does not
    // reshuffle the pixels.
    const pixels: Pixel[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < COLS; col++) {
        pixels.push({
          row,
          col,
          tint: Math.random() < 0.14,
          jitterIn: Math.random() * JITTER,
          jitterOut: Math.random() * JITTER,
        });
      }
    }
    setGrid({ rows, pixels });
    timer.current = window.setTimeout(() => {
      timer.current = 0;
      // Batched into one render: the dialog unmounts in the same frame the
      // grid is cleared, so the whole card never flashes back.
      onClose();
      setGrid(null);
    }, TOTAL_MS);
  }, [reduced, onClose]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => document.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  // The scroll lock is released once the exit has finished (onExitComplete),
  // not when close is clicked; releasing it mid-fade let the scrollbar pop back
  // in and nudge the hero while the card was still leaving.
  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  const ease = [0.32, 0.72, 0, 1] as const;
  // Closing uses an in-out curve. The opening curve front-loads its change, so
  // on the way out the blur was mostly gone in the first few frames and the
  // hero snapped back into focus instead of easing into it.
  const exitEase = [0.45, 0, 0.2, 1] as const;

  // Opening scales the card up into place. Closing is handled by the pixel
  // dissolve below, so by the time the dialog unmounts nothing is left to see.
  const cardMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.94, y: 12 },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.32, ease },
        },
        exit: { opacity: 0, transition: { duration: 0 } },
      };

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {open ? (
        <div className="fixed inset-0 z-100 grid place-items-center px-5">
          {/* The blur has to animate on its own. Fading the layer's opacity
              leaves backdrop-filter at full strength until the element is
              removed, so the page behind snapped from blurred to sharp on the
              last frame — that snap was the abrupt close. */}
          <motion.div
            className="absolute inset-0 bg-navy/45"
            onClick={requestClose}
            aria-hidden
            style={
              reduced
                ? {
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }
                : undefined
            }
            initial={
              reduced ? undefined : { opacity: 0, backdropFilter: "blur(0px)" }
            }
            animate={
              reduced
                ? undefined
                : dissolving
                  ? {
                      opacity: 0,
                      backdropFilter: "blur(0px)",
                      // Starts once the sweep is under way, so the page comes
                      // back into focus as the last rows fall away.
                      transition: {
                        duration: TOTAL_MS / 1000 - 0.15,
                        delay: 0.15,
                        ease: exitEase,
                      },
                    }
                  : { opacity: 1, backdropFilter: "blur(8px)" }
            }
            exit={
              reduced ? undefined : { opacity: 0, transition: { duration: 0 } }
            }
            transition={{ duration: 0.5, ease }}
          />

          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-label="SRMIST Vadapalani"
            className="relative w-full max-w-sm"
            {...cardMotion}
          >
            {/* The shadow sits on its own layer: the clip that eats the card
                would cut a box-shadow off on the first frame. */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-panel shadow-[0_44px_90px_-34px_rgba(10,26,64,0.7),0_0_0_1px_rgba(18,38,92,0.14)]"
              animate={{ opacity: dissolving ? 0 : 1 }}
              transition={{ duration: SWEEP + JITTER, ease: "linear" }}
            />

            <motion.div
              className="relative rounded-panel p-[5px]"
              initial={false}
              animate={{
                clipPath: dissolving
                  ? "inset(100% 0% 0% 0%)"
                  : "inset(0% 0% 0% 0%)",
              }}
              // Trails the arriving rows by the jitter, so content is only cut
              // away once squares are already sitting over it.
              transition={
                dissolving
                  ? { duration: SWEEP, delay: JITTER, ease: "linear" }
                  : { duration: 0 }
              }
              style={{
                // Brushed-metal rim: a conic sweep so the light appears to travel
                // around the edge instead of running flat across it.
                background:
                  "conic-gradient(from 210deg at 50% 50%, #f8fbff 0deg, #2b52a8 38deg, #d8e9fa 76deg, #12265c 128deg, #9fd0f5 172deg, #1b3a86 218deg, #eaf4ff 262deg, #2b52a8 308deg, #f8fbff 360deg)",
              }}
            >
              <div className="relative overflow-hidden rounded-[calc(var(--radius-panel)-5px)] bg-cream px-8 pt-10 pb-9 ring-1 ring-white/70">
                {/* specular sheen across the top of the card face */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/85 to-transparent"
                />

                <button
                  ref={closeRef}
                  type="button"
                  onClick={requestClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-full bg-navy/6 text-navy/70 transition-colors duration-300 hover:bg-navy/12 hover:text-navy"
                >
                  <X size={16} strokeWidth={1.8} aria-hidden />
                </button>

                <div className="relative flex flex-col items-center gap-7 text-center">
                  <Image
                    src="/images/brand/srmist-seal.png"
                    alt="SRM Institute of Science and Technology"
                    width={244}
                    height={238}
                    className="size-28 object-contain drop-shadow-[0_10px_24px_rgba(18,38,92,0.22)]"
                  />

                  <a
                    href={COLLEGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[1.0625rem] tracking-[-0.015em] text-navy"
                  >
                    <span className="link-underline">
                      Visit our College site
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.7}
                      aria-hidden
                      className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            {grid ? (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-panel"
              >
                {grid.pixels.map((p) => {
                  const arrive = (p.row / grid.rows) * SWEEP + p.jitterIn;
                  return (
                    <motion.span
                      key={`${p.row}-${p.col}`}
                      className={`absolute ${p.tint ? "bg-sky-100" : "bg-cream"}`}
                      style={{
                        left: `${(p.col / COLS) * 100}%`,
                        top: `${(p.row / grid.rows) * 100}%`,
                        // A hair of overlap hides seams between squares.
                        width: `calc(${100 / COLS}% + 1px)`,
                        height: `calc(${100 / grid.rows}% + 1px)`,
                      }}
                      initial={{ opacity: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        y: [0, 0, 0, 10],
                        scale: [1, 1, 1, 0.55],
                      }}
                      transition={{
                        delay: arrive,
                        duration: HOLD + JITTER + FADE,
                        times: [
                          0,
                          0.01,
                          (HOLD + p.jitterOut) / (HOLD + JITTER + FADE),
                          1,
                        ],
                        ease: "easeIn",
                      }}
                    />
                  );
                })}
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
