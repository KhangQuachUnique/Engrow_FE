import {
  HiEnvelope,
  HiFire,
  HiMiniArrowUp,
  HiMiniDocumentText,
  HiOutlineAcademicCap,
  HiPhone,
} from "react-icons/hi2";
import Avatar from "@/share/components/Avatar/Avatar";
import type { AccountProfile } from "../types/accountProfile";

interface AccountProfileSummaryProps {
  profile: AccountProfile;
}

export default function AccountProfileSummary({
  profile,
}: AccountProfileSummaryProps) {
  const stats = [
    {
      icon: HiMiniDocumentText,
      label: "Total essays",
      trend: `+${profile.stats.totalEssaysGrowth} this week`,
      value: profile.stats.totalEssays,
    },
    {
      icon: "A",
      label: "Total words",
      trend: `+${profile.stats.totalWordsGrowth} this week`,
      value: profile.stats.totalWords,
    },
  ] as const;

  return (
    <aside className="rounded-[26px] bg-white px-6 py-7 shadow-[0_14px_38px_rgba(58,190,249,0.10)]">
      <div className="flex flex-col items-center">
        <Avatar
          src={profile.avatarUrl}
          name={profile.name}
          fallback="KQ"
          size="xl"
          className="shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        />

        <div className="mt-5 flex w-full items-center justify-center gap-3">
          <h2 className="font-heading text-xl font-bold leading-7 text-text-strong">
            {profile.name}
          </h2>
          <div className="flex items-center gap-1.5 font-heading text-sm font-bold text-text-muted">
            <HiFire aria-hidden="true" className="h-6 w-6 text-orange-500" />
            <span>{profile.streakDays} days</span>
          </div>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 font-heading text-xs font-bold text-brand-dark">
          <HiOutlineAcademicCap aria-hidden="true" className="h-4 w-4" />
          Writing learner
        </div>

        <div className="mt-4 flex w-full flex-col gap-2.5 font-heading text-sm font-bold leading-5 text-text-muted">
          <div className="flex items-center gap-2.5">
            <HiPhone aria-hidden="true" className="h-4.5 w-4.5 flex-none" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <HiEnvelope aria-hidden="true" className="h-4.5 w-4.5 flex-none" />
            <span className="min-w-0 truncate">{profile.email}</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 h-11 w-full max-w-48 rounded-2xl bg-brand px-5 font-heading text-base font-bold text-white transition hover:bg-primary-hover">
          Edit profile
        </button>
      </div>

      <div className="my-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#f6fbff] px-4 py-3">
          <p className="font-heading text-xs font-bold text-text-muted">
            Current band
          </p>
          <p className="mt-1 font-heading text-xl font-bold text-text-strong">
            6.5
          </p>
        </div>
        <div className="rounded-2xl bg-[#fff8f0] px-4 py-3">
          <p className="font-heading text-xs font-bold text-text-muted">
            Best streak
          </p>
          <p className="mt-1 font-heading text-xl font-bold text-orange-500">
            45d
          </p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {["Task 2", "Lexical resource", "Coherence"].map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-primary-100 bg-white px-3 py-1 font-heading text-xs font-bold text-text-muted">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <section
              key={stat.label}
              className="flex min-h-24 items-center justify-between rounded-2xl border border-primary-100/70 bg-white px-5 py-4 shadow-[0_8px_22px_rgba(58,190,249,0.08)]">
              <div>
                <div className="flex items-start gap-2.5">
                  <p className="font-heading text-3xl font-bold leading-none text-text-main">
                    {stat.value}
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-0.5 font-heading text-[11px] font-bold leading-4 text-emerald-500">
                    {stat.trend}
                    <HiMiniArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-1.5 font-heading text-sm font-bold text-text-muted">
                  {stat.label}
                </p>
              </div>
              {typeof Icon === "string" ? (
                <span className="font-heading text-2xl font-medium text-brand">
                  {Icon}
                </span>
              ) : (
                <Icon aria-hidden="true" className="h-7 w-7 text-brand" />
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
