import {
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
  HiOutlineCheckBadge,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from "react-icons/hi2";
import Button from "@/share/components/Button/Button";
import {
  homeDiscoverCards,
  homeFeedbackHighlights,
  homeLearningTasks,
  homePendingFeedback,
  homePracticeStats,
  homeWritingTopics,
  homeUnfinishedDrafts,
} from "@/features/home/mock/homeMock";
import { cn } from "@/share/utils/cn";

const taskStateClass = {
  done: "border-emerald-200 bg-emerald-50 text-emerald-600",
  pending: "border-amber-200 bg-amber-50 text-amber-600",
} as const;

const draftStateClass = {
  "in-progress": "border-brand/30 bg-primary-50 text-brand-dark",
  almost: "border-emerald-200 bg-emerald-50 text-emerald-600",
} as const;

const feedbackStateClass = {
  attention: "border-amber-200 bg-amber-50 text-amber-600",
  priority: "border-red-200 bg-red-50 text-red-500",
  review: "border-brand/30 bg-primary-50 text-brand-dark",
} as const;

export default function HomePage() {
  return (
    <div className="bg-[#F7FCFF]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-10">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.72fr)]">
          <article className="relative overflow-hidden rounded-3xl border border-border-subtle bg-white p-8">
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="max-w-2xl space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 font-heading text-xs font-bold uppercase text-brand">
                  <HiOutlineAcademicCap className="h-4 w-4" />
                  Welcome back
                </span>
                <h1 className="font-heading text-4xl font-bold leading-tight text-text-strong sm:text-[46px]">
                  Khang, choose what you want to improve today.
                </h1>
                <p className="max-w-xl font-heading text-base font-normal leading-7 text-text-muted">
                  Practice IELTS writing with guided prompts, clear feedback,
                  and small review tasks that keep your progress visible.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  to="/profile"
                  variant="primary"
                  className="h-12 px-6 text-base">
                  Find a writing topic
                </Button>
                <Button
                  to="/profile"
                  variant="secondary"
                  className="h-12 px-6 text-base">
                  Review feedback
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {homePracticeStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border-subtle bg-[#fbfdfe] px-4 py-3">
                    <p className="font-heading text-xs font-bold text-text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-heading text-2xl font-bold text-text-strong">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-heading text-xs font-bold text-brand-dark">
                      {stat.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="rounded-3xl border border-border-subtle bg-white p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-xl font-bold text-text-strong">
                  Today&apos;s mission
                </p>
                <p className="mt-1 font-heading text-sm font-semibold text-text-muted">
                  A short, focused plan to keep the day moving.
                </p>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-heading text-xs font-bold text-emerald-600">
                2/3 done
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {homeLearningTasks.map((task) => (
                <div
                  key={task.label}
                  className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-[#fbfdfe] px-4 py-3">
                  <span
                    className={cn(
                      "flex h-7 w-7 flex-none items-center justify-center rounded-full border",
                      taskStateClass[task.state],
                    )}>
                    <HiOutlineCheckBadge className="h-4 w-4" />
                  </span>
                  <span className="font-heading text-sm font-semibold text-text-main">
                    {task.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="h-2 overflow-hidden rounded-full bg-border-subtle">
                <div className="h-full w-2/3 rounded-full bg-emerald-500" />
              </div>
              <p className="mt-2 font-heading text-xs font-semibold text-text-muted">
                Finish one more task and you&apos;re done for today.
              </p>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.55fr)]">
          <article className="rounded-3xl border border-border-subtle bg-white p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-heading text-xs font-bold uppercase text-brand">
                  Start here
                </p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-text-strong">
                  Pick a learning path that matches your goal.
                </h2>
              </div>
              <Button
                to="/profile"
                variant="secondary"
                className="h-11 px-5 text-sm">
                Browse all paths
              </Button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {homeDiscoverCards.map((card) => (
                <button
                  key={card.title}
                  type="button"
                  className="group flex min-h-44 flex-col justify-between rounded-2xl border border-border-subtle bg-[#fbfdfe] p-5 text-left transition hover:-translate-y-0.5 hover:border-brand/40 hover:bg-primary-50">
                  <div>
                    <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 font-heading text-xs font-bold text-brand">
                      {card.badge}
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-bold leading-6 text-text-strong">
                      {card.title}
                    </h3>
                    <p className="mt-2 font-heading text-sm font-semibold leading-6 text-text-muted">
                      {card.description}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-brand transition group-hover:translate-x-0.5">
                    Start path
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          </article>

          <aside className="rounded-3xl border border-border-subtle bg-white p-7">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff3d9] text-orange-500">
                <HiOutlineLightBulb className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-xl font-bold text-text-strong">
                  Feedback coach
                </p>
                <p className="mt-1 font-heading text-sm font-semibold leading-6 text-text-muted">
                  Three things to fix before your next essay.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {homeFeedbackHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                  <HiOutlineSparkles className="mt-0.5 h-4 w-4 flex-none text-orange-400" />
                  <p className="font-heading text-sm font-semibold leading-6 text-text-main">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <article className="rounded-3xl border border-border-subtle bg-white p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-xl font-bold text-text-strong">
                  Continue unfinished writing
                </p>
                <p className="mt-1 font-heading text-sm font-semibold text-text-muted">
                  Pick up an essay you already started and finish it without
                  restarting.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 font-heading text-xs font-bold text-brand">
                <HiOutlineClock className="h-4 w-4" />
                Drafts
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {homeUnfinishedDrafts.map((draft) => (
                <article
                  key={draft.title}
                  className="rounded-3xl border border-border-subtle bg-[#fbfdfe] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 font-heading text-xs font-bold",
                          draftStateClass[draft.state],
                        )}>
                        {draft.status}
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-bold text-text-strong">
                        {draft.title}
                      </h3>
                    </div>
                    <span className="font-heading text-xs font-bold text-brand-dark">
                      {draft.effort}
                    </span>
                  </div>
                  <p className="mt-3 font-heading text-sm font-semibold leading-6 text-text-muted">
                    {draft.summary}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                to="/profile"
                variant="primary"
                className="h-11 px-5 text-sm">
                Continue writing
              </Button>
              <Button
                to="/profile"
                variant="secondary"
                className="h-11 px-5 text-sm">
                Open draft list
              </Button>
            </div>
          </article>

          <article className="rounded-3xl border border-border-subtle bg-white p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-heading text-xl font-bold text-text-strong">
                  Unreviewed feedback
                </p>
                <p className="mt-1 font-heading text-sm font-semibold text-text-muted">
                  See what still needs your attention after the last review.
                </p>
              </div>
              <Button
                to="/profile"
                variant="secondary"
                className="h-11 px-5 text-sm">
                View all
                <HiOutlineArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 space-y-3">
              {homePendingFeedback.map((feedback) => (
                <article
                  key={feedback.title}
                  className="rounded-3xl border border-border-subtle bg-[#fbfdfe] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-base font-bold text-text-strong">
                      {feedback.title}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 font-heading text-xs font-bold",
                        feedbackStateClass[feedback.severity],
                      )}>
                      Band {feedback.band}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2 font-heading text-sm font-medium leading-6 text-text-main">
                    <HiOutlineSparkles className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                    <span>{feedback.note}</span>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: HiOutlineDocumentText,
              title: "New to IELTS writing?",
              body: "Follow guided prompts with structure hints before writing full essays.",
              action: "Try guided mode",
            },
            {
              icon: HiOutlineSparkles,
              title: "Need better vocabulary?",
              body: "Review topic phrases from your own essays instead of memorising random lists.",
              action: "Review vocabulary",
            },
            {
              icon: HiOutlineTrophy,
              title: "Chasing band 7.5?",
              body: "Track weak criteria and focus on one improvement target at a time.",
              action: "See progress",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-border-subtle bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-heading text-lg font-bold text-text-strong">
                  {item.title}
                </h2>
                <p className="mt-2 font-heading text-sm font-semibold leading-6 text-text-muted">
                  {item.body}
                </p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-brand">
                  {item.action}
                  <HiOutlineArrowRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </section>

        <section className="rounded-3xl border border-border-subtle bg-white px-8 py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.28em] text-brand">
                Explore topics
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-text-strong">
                Pick a topic to start writing and keep your ideas moving.
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 font-heading text-sm font-bold text-brand-dark">
              <HiOutlineClock className="h-4 w-4" />
              Fresh prompts
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {homeWritingTopics.map((topic) => (
              <button
                key={topic.title}
                type="button"
                className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-border-subtle bg-white text-left transition hover:-translate-y-0.5 hover:border-brand/40">
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={topic.imageUrl}
                    alt={topic.imageAlt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_35%,rgba(0,0,0,0.42)_100%)]" />
                  <span className="absolute bottom-4 left-4 inline-flex rounded-full bg-white/92 px-3 py-1 font-heading text-xs font-bold uppercase tracking-[0.16em] text-text-strong">
                    {topic.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mt-4 font-heading text-lg font-bold leading-7 text-text-strong">
                    {topic.title}
                  </h3>
                  <p className="mt-2 font-heading text-sm font-semibold text-text-muted">
                    {topic.hint}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-brand transition group-hover:translate-x-0.5">
                    Start writing
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
