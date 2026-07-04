import { HiOutlineArrowPath, HiOutlineHome } from "react-icons/hi2";
import serverErrorImage from "@/assets/500.png";
import Button from "@/share/components/Button/Button";
import { appConstants } from "@/share/constants/appConstants";

export default function ServerErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="relative min-h-svh overflow-hidden bg-page text-text-strong">
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid-line)_1px,transparent_1px)] bg-[length:26px_26px]" />
      <div className="absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary-soft/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-svh w-full max-w-7xl grid-cols-[0.9fr_1.1fr] items-center gap-10 px-12 py-10 max-[960px]:grid-cols-1 max-[960px]:gap-6 max-[960px]:px-6 max-[560px]:px-4">
        <section className="flex flex-col items-start gap-8 max-[960px]:mx-auto max-[960px]:max-w-2xl max-[960px]:items-center max-[960px]:text-center">
          <div className="flex flex-col gap-5">
            <p className="m-0 font-sans text-sm font-bold uppercase leading-5 tracking-normal text-brand-dark">
              500 - Server error
            </p>
            <h1 className="m-0 max-w-[560px] font-heading text-[58px] font-bold leading-[62px] text-text-strong max-[1100px]:text-[50px] max-[1100px]:leading-[54px] max-[560px]:text-[38px] max-[560px]:leading-[42px]">
              Something needs a quick repair.
            </h1>
            <p className="m-0 max-w-[520px] text-lg leading-8 text-text-main max-[560px]:text-base max-[560px]:leading-7">
              Our server hit an unexpected issue while preparing your workspace.
              Try again in a moment, or head back home while we get things
              running smoothly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 max-[560px]:w-full max-[560px]:flex-col">
            <Button
              className="h-12 px-6 font-heading text-base leading-6 max-[560px]:w-full"
              iconLeft={<HiOutlineArrowPath aria-hidden="true" />}
              onClick={handleRetry}>
              Try again
            </Button>
            <Button
              to={appConstants.DASHBOARD}
              variant="secondary"
              className="h-12 px-6 font-heading text-base leading-6 max-[560px]:w-full"
              iconLeft={<HiOutlineHome aria-hidden="true" />}>
              Back to home
            </Button>
          </div>
        </section>

        <section
          className="relative flex min-h-[560px] items-center justify-center max-[960px]:min-h-[340px] max-[960px]:order-first"
          aria-label="500 illustration">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] font-heading text-[300px] font-bold leading-none text-primary-200/80 max-[960px]:text-[170px] max-[560px]:text-[124px]">
            500
          </span>
          <img
            src={serverErrorImage}
            alt="Engrow pencil wearing a hard hat near a warning sign"
            className="relative z-10 h-[460px] w-auto object-contain drop-shadow-[0_24px_30px_rgba(0,53,72,0.18)] max-[960px]:h-[300px] max-[560px]:h-[238px]"
          />
        </section>
      </div>
    </main>
  );
}
