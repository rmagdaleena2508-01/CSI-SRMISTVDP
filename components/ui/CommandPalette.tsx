"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, CornerDownLeft } from "lucide-react";
import { getLenis } from "@/lib/lenis";
import { searchSite, type SearchItem } from "@/lib/search";

const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * Search across every session, person, insight and question on the site.
 *
 * The index is built from the same data files the pages render, so it ships
 * inside the page rather than calling a server: the site is a static export
 * with nothing to call, and the whole chapter's content is a few kilobytes of
 * text. Opening is Cmd+K, or Ctrl+K on Windows.
 */
export function CommandPalette() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = searchSite(query);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // The page must not scroll underneath the panel. Lenis drives scrolling on
  // laptops, so it is stopped as well as the document being locked.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const go = useCallback(
    (item: SearchItem) => {
      close();
      router.push(item.href);
    },
    [close, router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!results.length) return;
      const next =
        e.key === "ArrowDown"
          ? (active + 1) % results.length
          : (active - 1 + results.length) % results.length;
      setActive(next);
      listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
      return;
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="glass glass-orb grid size-11 place-items-center rounded-full text-navy backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 ease-[var(--ease-editorial)] active:scale-95"
      >
        <Search size={17} strokeWidth={1.8} aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-100 flex items-start justify-center px-5 pt-[12vh]">
            <motion.div
              className="absolute inset-0 bg-navy/45"
              onClick={close}
              aria-hidden
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              style={{ backdropFilter: "blur(6px)" }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search"
              className="glass-panel relative w-full max-w-[34rem] overflow-hidden rounded-panel backdrop-blur-3xl"
              initial={reduced ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
              animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.28, ease }}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-navy/10 px-5">
                <Search
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden
                  className="shrink-0 text-slate-blue"
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder="Search sessions, people, insights"
                  aria-label="Search sessions, people, insights"
                  className="h-14 w-full bg-transparent text-[1rem] text-navy outline-none placeholder:text-slate-blue"
                />
                <kbd className="hidden shrink-0 rounded-md bg-navy/8 px-2 py-1 text-[0.6875rem] text-slate-blue sm:block">
                  esc
                </kbd>
              </div>

              {query.trim() ? (
                results.length ? (
                  <ul
                    ref={listRef}
                    className="max-h-[55vh] overflow-y-auto p-2"
                  >
                    {results.map((item, i) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => go(item)}
                          onMouseEnter={() => setActive(i)}
                          aria-current={i === active}
                          className={`flex w-full items-center gap-3 rounded-card px-3 py-2.5 text-left transition-colors duration-150 ${
                            i === active ? "bg-navy/8" : ""
                          }`}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.9375rem] text-navy">
                              {item.title}
                            </span>
                            {item.subtitle ? (
                              <span className="block truncate text-[0.8125rem] text-slate-blue">
                                {item.subtitle}
                              </span>
                            ) : null}
                          </span>
                          <span className="shrink-0 text-eyebrow font-medium tracking-[0.14em] text-slate-blue uppercase">
                            {item.group}
                          </span>
                          {i === active ? (
                            <CornerDownLeft
                              size={14}
                              strokeWidth={1.8}
                              aria-hidden
                              className="shrink-0 text-slate-blue"
                            />
                          ) : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-5 py-8 text-center text-[0.9375rem] text-slate-blue">
                    Nothing matches “{query}”.
                  </p>
                )
              ) : (
                <p className="px-5 py-8 text-center text-[0.9375rem] text-slate-blue">
                  Type to search every session, person and insight.
                </p>
              )}

              <p
                aria-live="polite"
                className="sr-only"
              >{`${results.length} results`}</p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
