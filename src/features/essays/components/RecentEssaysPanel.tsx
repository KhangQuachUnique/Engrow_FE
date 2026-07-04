import { HiArrowRight, HiClock, HiSparkles } from "react-icons/hi2";

const RECENT_ESSAYS = [
  {
    band: "7.0",
    date: "Today",
    focus: "Coherence",
    status: "Reviewed",
    task: "Task 2",
    title: "Some people think online learning is better than classroom learning.",
  },
  {
    band: "7.5",
    date: "Yesterday",
    focus: "Vocabulary",
    status: "Improve",
    task: "Task 1",
    title: "The chart shows how students spent time studying English.",
  },
  {
    band: "6.5",
    date: "Jun 28",
    focus: "Grammar range",
    status: "Reviewed",
    task: "Task 2",
    title: "Governments should spend more money on public transport.",
  },
  {
    band: "8.0",
    date: "Jun 24",
    focus: "Task response",
    status: "Strong",
    task: "Task 2",
    title: "Young people are encouraged to work or travel before university.",
  },
] as const;

export default function RecentEssaysPanel() {
  return (
    <section className="min-w-0">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold leading-7 text-text-main">
            Recent writing practice
          </h2>
          <p className="mt-1 font-heading text-sm font-semibold text-text-muted">
            Essays with feedback ready for review.
          </p>
        </div>
        <a
          href="#recent-essays"
          className="inline-flex items-center gap-1 font-heading text-sm font-bold leading-5 text-brand"
        >
          View more
          <HiArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>

      <div id="recent-essays" className="grid gap-4 sm:grid-cols-2">
        {RECENT_ESSAYS.map((essay) => (
          <article
            key={essay.title}
            className="flex min-h-36 flex-col justify-between rounded-2xl border border-white bg-white p-5 shadow-[0_10px_26px_rgba(58,190,249,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(58,190,249,0.13)]"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary-50 px-3 py-1 font-heading text-xs font-bold text-brand-dark">
                  {essay.task}
                </span>
                <span className="font-heading text-lg font-bold text-brand">
                  Band {essay.band}
                </span>
              </div>
              <h3 className="line-clamp-2 font-heading text-sm font-bold leading-5 text-text-strong">
                {essay.title}
              </h3>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2 font-heading text-xs font-bold text-text-muted">
                <HiSparkles
                  aria-hidden="true"
                  className="h-4 w-4 flex-none text-orange-400"
                />
                <span className="truncate">{essay.focus}</span>
              </div>
              <div className="flex items-center gap-2 font-heading text-xs font-bold text-text-muted">
                <HiClock aria-hidden="true" className="h-4 w-4" />
                <span>{essay.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
