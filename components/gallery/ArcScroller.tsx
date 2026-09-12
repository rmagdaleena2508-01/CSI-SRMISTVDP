"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The curved scroller from the sketch: a notched band, one notch per album,
 * with a thumb you drag up and down to move through the stack.
 *
 * The arc is a segment of a large circle whose centre sits far off to the
 * left, which is what gives a gentle bow rather than a half-round dial. The
 * drag itself is mapped from the pointer's Y position rather than from the
 * angle: a finger travelling straight down the right edge of a phone is what
 * people actually do, and angle-based maths would fight that near the ends.
 */
const VIEW_W = 64;
const VIEW_H = 360;
const CX = -300;
const CY = VIEW_H / 2;
const R_OUT = 356;
const BAND = 34;
const R_IN = R_OUT - BAND;
const SWEEP = 28;

const rad = (deg: number) => (deg * Math.PI) / 180;

const point = (deg: number, r: number) =>
  [CX + r * Math.cos(rad(deg)), CY + r * Math.sin(rad(deg))] as const;

const degForStep = (i: number, count: number) =>
  count <= 1 ? 0 : -SWEEP + (i / (count - 1)) * SWEEP * 2;

function bandPath() {
  const [x1, y1] = point(-SWEEP, R_OUT);
  const [x2, y2] = point(SWEEP, R_OUT);
  const [x3, y3] = point(SWEEP, R_IN);
  const [x4, y4] = point(-SWEEP, R_IN);
  return `M ${x1} ${y1} A ${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${R_IN} ${R_IN} 0 0 0 ${x4} ${y4} Z`;
}

export function ArcScroller({
  count,
  index,
  onIndexChange,
  label = "Scroll through the albums",
}: {
  count: number;
  index: number;
  onIndexChange: (index: number) => void;
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(false);

  // Raised on every arrival at the page, a click through from the home page
  // included. It was remembered per device at first, which meant one dismissal
  // silenced it for good; the scroller is the only way to move the stack here,
  // so the invitation is worth repeating. The timer keeps it out of the effect
  // body and lets the albums land first.
  useEffect(() => {
    const show = window.setTimeout(() => setHint(true), 400);
    const hide = window.setTimeout(() => setHint(false), 6900);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const dismissHint = useCallback(() => setHint(false), []);

  const pick = useCallback(
    (clientY: number) => {
      const box = trackRef.current?.getBoundingClientRect();
      if (!box || count < 2) return;
      const pad = box.height * 0.08;
      const span = Math.max(1, box.height - pad * 2);
      const ratio = Math.min(1, Math.max(0, (clientY - box.top - pad) / span));
      onIndexChange(Math.round(ratio * (count - 1)));
    },
    [count, onIndexChange]
  );

  const thumbDeg = degForStep(index, count);
  const [tx, ty] = point(thumbDeg, (R_IN + R_OUT) / 2);

  return (
    <div
      className="relative flex h-full shrink-0 items-center"
      style={{ width: 64 }}
    >
      {hint ? (
        <div className="pointer-events-none absolute top-1/2 right-full z-10 mr-3 w-44 -translate-y-1/2">
          <div className="relative rounded-2xl bg-white/95 px-4 py-3 text-[0.8125rem] leading-snug text-navy shadow-[0_18px_40px_-22px_rgba(18,38,92,0.8)] ring-1 ring-navy/10">
            Use the arrow mark to scroll to see the albums
            {/* the spur that points at the scroller */}
            <span
              aria-hidden
              className="absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rotate-45 rounded-[3px] bg-white/95 ring-1 ring-navy/10"
            />
          </div>
        </div>
      ) : null}

      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={count}
        aria-valuenow={index + 1}
        aria-orientation="vertical"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          dismissHint();
          pick(e.clientY);
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          pick(e.clientY);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={(e) => {
          if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
          e.preventDefault();
          dismissHint();
          const next = index + (e.key === "ArrowDown" ? 1 : -1);
          onIndexChange(Math.min(count - 1, Math.max(0, next)));
        }}
        className="h-full w-full touch-none select-none focus-visible:outline-none"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id="arc-face" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#f7f8fa" />
              <stop offset="100%" stopColor="#e9ecf1" />
            </linearGradient>
            <linearGradient id="arc-thumb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#eef0f4" />
            </linearGradient>
          </defs>

          <path
            d={bandPath()}
            fill="url(#arc-face)"
            stroke="#cfd4dc"
            strokeWidth={1.5}
          />

          {Array.from({ length: count }, (_, i) => {
            const deg = degForStep(i, count);
            const [x1, y1] = point(deg, R_IN + 8);
            const [x2, y2] = point(deg, R_OUT - 8);
            const on = i === index;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={on ? "#6b7280" : "#b9c0cb"}
                strokeWidth={on ? 2.4 : 1.6}
                strokeLinecap="round"
              />
            );
          })}

          {/* Positioned with the SVG transform attribute, not a CSS one: a CSS
              translate on a group is resolved against that element's own box,
              which left the thumb sitting at the origin however far the
              scroller had travelled. */}
          <g transform={`translate(${tx} ${ty})`}>
            <circle
              r={15}
              fill="url(#arc-thumb)"
              stroke="#aeb6c2"
              strokeWidth={1.5}
              style={{ filter: "drop-shadow(0 4px 8px rgba(18,38,92,0.28))" }}
            />
            {/* the arrow mark the hint refers to */}
            <g
              stroke="#6b7280"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <polyline points="-4.5,-4 0,-8 4.5,-4" />
              <polyline points="-4.5,4 0,8 4.5,4" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
