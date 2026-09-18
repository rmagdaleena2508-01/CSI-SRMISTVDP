"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: number; suffix?: string; label: string };

/**
 * One number that counts up from zero the first time it scrolls into view.
 * The final value is what the server renders, so the figure is right before
 * any JavaScript runs; the count only starts once the band is on screen.
 */
function Counter({ value, suffix = "", delay }: Stat & { delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || !inView || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

/** The chapter at a glance, just under the hero. */
export function ChapterStats({ stats }: { stats: Stat[] }) {
  return (
    <section
      aria-label="The chapter in numbers"
      className="container-editorial pt-section"
    >
      <Reveal>
        <dl className="grid grid-cols-3 divide-x divide-navy/10 rounded-card bg-cream px-2 py-6 shadow-card sm:px-6 sm:py-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-2 text-center"
            >
              <dt className="order-2 text-[0.8125rem] text-slate-blue sm:text-[0.9375rem]">
                {stat.label}
              </dt>
              <dd className="display-heading order-1 text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] leading-none font-semibold text-navy">
                <Counter {...stat} delay={i * 0.15} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
