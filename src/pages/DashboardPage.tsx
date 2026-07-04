export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-10">
      <section className="rounded-[28px] border border-white/70 bg-white/90 p-8 shadow-[0_0_20px_rgba(58,190,249,0.12)]">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.24em] text-brand">
          Dashboard
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-text-strong">
          Layout, header, and footer are wired up.
        </h1>
        <p className="mt-4 max-w-3xl font-heading text-base font-medium leading-7 text-text-main">
          Next we can replace this placeholder body with the profile card, recent essays, and progress chart from the reference.
        </p>
      </section>
    </div>
  );
}
