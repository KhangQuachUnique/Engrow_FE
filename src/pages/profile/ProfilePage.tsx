import AccountProfileSummary from "@/features/account/components/AccountProfileSummary";
import { accountProfileMock } from "@/features/account/mock/accountProfileMock";
import RecentEssaysPanel from "@/features/essays/components/RecentEssaysPanel";
import BandProgressChart from "@/features/progress/components/BandProgressChart";

export default function ProfilePage() {
  return (
    <div className="bg-[linear-gradient(180deg,#f3fbff_0%,#f8fcff_52%,#ffffff_100%)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-10">
        <AccountProfileSummary profile={accountProfileMock} />

        <div className="flex min-w-0 flex-col gap-6">
          <section className="rounded-3xl border border-white bg-white/80 px-7 py-6 shadow-[0_12px_34px_rgba(58,190,249,0.08)] backdrop-blur-[2px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-heading text-xs font-bold uppercase text-brand">
                  IELTS Writing profile
                </p>
                <h1 className="mt-1 font-heading text-3xl font-bold leading-tight text-text-strong">
                  Keep your writing practice on track
                </h1>
                <p className="mt-2 max-w-2xl font-heading text-sm font-semibold leading-6 text-text-muted">
                  Review essay feedback, vocabulary habits, and band movement in one place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-80">
                <div className="rounded-2xl bg-primary-50 px-4 py-3">
                  <p className="font-heading text-xs font-bold text-text-muted">
                    Target band
                  </p>
                  <p className="mt-1 font-heading text-2xl font-bold text-brand-dark">
                    7.5
                  </p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_8px_22px_rgba(58,190,249,0.08)]">
                  <p className="font-heading text-xs font-bold text-text-muted">
                    Weekly focus
                  </p>
                  <p className="mt-1 font-heading text-sm font-bold text-text-strong">
                    Cohesion
                  </p>
                </div>
              </div>
            </div>
          </section>

          <RecentEssaysPanel />
          <BandProgressChart points={accountProfileMock.bandProgress} />
        </div>
      </div>
    </div>
  );
}
