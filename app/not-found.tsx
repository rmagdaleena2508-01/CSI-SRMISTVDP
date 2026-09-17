import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-editorial flex min-h-[70svh] flex-col justify-center py-section">
      <p className="text-eyebrow font-medium tracking-[0.18em] text-slate-blue uppercase">
        404
      </p>
      <h1 className="display-heading text-display mt-5 max-w-[14ch] font-semibold text-navy text-balance">
        Wrong turn. No harm done.
      </h1>
      <p className="text-lead mt-6 max-w-[46ch] text-slate-blue text-pretty">
        Head back home, or open the archive to find the session you were
        after.
      </p>
      <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button href="/">Back home</Button>
        <Button href="/events" variant="secondary">
          Browse sessions
        </Button>
      </div>
    </section>
  );
}
