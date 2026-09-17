import { site } from "@/data/site";

/** The confirmed facts about joining, set in one quiet line under a button. */
export function TrustLine({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <ul
      // Stacked on phones, where a wrapped line would start with a stray dot.
      className={`flex flex-col items-center gap-1 text-[0.8125rem] tracking-[-0.005em] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2.5 ${
        tone === "light" ? "font-medium text-white" : "text-slate-blue"
      } ${className}`}
    >
      {site.trust.map((fact, i) => (
        <li key={fact} className="flex items-center gap-2.5">
          {i > 0 ? (
            <span aria-hidden className="hidden sm:inline">
              &middot;
            </span>
          ) : null}
          {fact}
        </li>
      ))}
    </ul>
  );
}
