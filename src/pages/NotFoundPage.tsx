import {
  HiOutlineArrowLeft,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import notFoundImage from "@/assets/404.png";
import Button from "@/share/components/Button/Button";
import { appConstants } from "@/share/constants/appConstants";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-page text-text-strong">
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid-line)_1px,transparent_1px)] bg-[length:26px_26px]" />

      <div className="relative mx-auto grid min-h-svh w-full max-w-7xl grid-cols-[1.05fr_0.95fr] items-center gap-10 px-12 py-10 max-[960px]:grid-cols-1 max-[960px]:gap-6 max-[960px]:px-6 max-[560px]:px-4">
        <section
          className="relative flex min-h-[560px] items-center justify-center max-[960px]:min-h-[340px]"
          aria-label="404 illustration">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] font-heading text-[300px] font-bold leading-none text-primary-200/80 max-[960px]:text-[170px] max-[560px]:text-[124px]">
            404
          </span>
          <img
            src={notFoundImage}
            alt="Engrow pencil looking confused"
            className="relative z-10 h-[430px] w-auto object-contain drop-shadow-[0_24px_30px_rgba(0,53,72,0.18)] max-[960px]:h-[280px] max-[560px]:h-[224px]"
          />
        </section>

        <section className="flex flex-col items-start gap-8 max-[960px]:mx-auto max-[960px]:max-w-2xl max-[960px]:items-center max-[960px]:text-center">
          <div className="flex flex-col gap-5">
            <p className="m-0 font-sans text-sm font-bold uppercase leading-5 tracking-normal text-brand-dark">
              404 - Page not found
            </p>
            <h1 className="m-0 max-w-[560px] font-heading text-[58px] font-bold leading-[62px] text-text-strong max-[1100px]:text-[50px] max-[1100px]:leading-[54px] max-[560px]:text-[38px] max-[560px]:leading-[42px]">
              This page slipped out of the draft.
            </h1>
            <p className="m-0 max-w-[520px] text-lg leading-8 text-text-main max-[560px]:text-base max-[560px]:leading-7">
              The link may be broken, moved, or no longer available. Head back
              to your workspace and keep building stronger English writing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 max-[560px]:w-full max-[560px]:flex-col">
            <Button
              to={appConstants.HOME}
              className="h-12 px-6 font-heading text-base leading-6 max-[560px]:w-full"
              iconLeft={<HiOutlineArrowLeft aria-hidden="true" />}>
              Back to home
            </Button>
            <Button
              to={appConstants.LOGIN}
              variant="secondary"
              className="h-12 px-6 font-heading text-base leading-6 max-[560px]:w-full"
              iconLeft={<HiOutlineArrowRightOnRectangle aria-hidden="true" />}>
              Sign in
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
