"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Img as Image } from "@/components/ui/Img";
import { asset } from "@/lib/asset";

/** Furthest the emblem leans toward the pointer, in degrees. */
const MAX_TILT = 14;

/**
 * The chapter emblem, in the sky under the headline. A soft radial lift sits
 * behind it so the fine ring lettering stays readable wherever the clouds fall.
 *
 * On a laptop it leans toward the pointer, wherever the pointer is on the
 * screen, and a patch of light slides across its face on the side facing the
 * pointer, as if it were a metal badge catching the sun. The light is masked
 * to the emblem's own shape, so it never spills onto the sky. After the
 * Tilted Card effect in React Bits, built with Motion. Touch screens and
 * reduced motion get the still emblem.
 */
export function CSIMark() {
  const reduced = useReducedMotion();
  // Pointer position across the window, -0.5 to 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    spring,
  );
  const glowX = useSpring(useTransform(px, [-0.5, 0.5], [15, 85]), spring);
  const glowY = useSpring(useTransform(py, [-0.5, 0.5], [15, 85]), spring);
  const sheen = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.6), rgba(255,255,255,0) 45%)`;

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, px, py]);

  const emblemMask = `url(${asset("/images/brand/csi-emblem.png")}) center / contain no-repeat`;

  return (
    <div className="emblem-stage relative flex justify-center [perspective:900px]">
      <div
        aria-hidden
        className="emblem-glow absolute top-1/2 left-1/2 size-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.8), rgba(255,255,255,0))",
        }}
      />
      <motion.div
        data-easter-egg
        className="relative w-[min(56vw,28vh,15rem)] sm:w-[min(28vw,26vh,17rem)]"
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        {/* Two faces on a card that turns over with the theme: the flat
            emblem in light mode, and in dark mode the card turns around to
            reveal the brushed-metal emblem on its back. */}
        <div className="emblem-flip relative">
          <div className="emblem-face">
            <Image
              src="/images/brand/csi-emblem.png"
              alt="Computer Society of India emblem"
              width={447}
              height={447}
              priority
              className="w-full drop-shadow-[0_18px_40px_rgba(18,38,92,0.28)]"
            />
            {reduced ? null : (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{
                  backgroundImage: sheen,
                  mask: emblemMask,
                  WebkitMask: emblemMask,
                }}
              />
            )}
          </div>
          <div
            aria-hidden
            className="emblem-face emblem-back absolute inset-[4%] rounded-full"
            style={
              {
                "--metal": `url(${asset("/images/brand/csi-emblem-metal.webp")})`,
              } as React.CSSProperties
            }
          />
        </div>
      </motion.div>
    </div>
  );
}
