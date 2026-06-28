import type { ReactNode } from "react";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
  HiOutlineLifebuoy,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import logo from "@/assets/Logo.webp";
import { cn } from "@/share/utils/cn";
import AuthTrustItem from "../components/login/AuthTrustItem";

const FEATURES = [
  {
    description: "Get line-by-line corrections and vocabulary suggestions.",
    icon: HiOutlineChartBar,
    title: "Precision Feedback",
    variant: "primary",
  },
  {
    description: "Monitor your band score improvements over time.",
    icon: HiOutlineArrowTrendingUp,
    title: "Track Progress",
    variant: "secondary",
  },
] as const;

const DEFAULT_TRUST_ITEMS = [
  {
    icon: HiOutlineShieldCheck,
    label: "SECURE",
  },
  {
    icon: HiOutlineLifebuoy,
    label: "24/7 SUPPORT",
  },
] as const;

interface AuthLayoutProps {
  children: ReactNode;
  description: string;
  title: string;
}

export default function AuthLayout({
  children,
  description,
  title,
}: AuthLayoutProps) {
  const pageClass = cn(
    "min-h-svh overflow-hidden bg-page text-text-strong",
    "bg-[linear-gradient(var(--color-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid-line)_1px,transparent_1px)]",
    "bg-[length:26px_26px]",
    "max-[900px]:overflow-auto",
  );

  const shellClass = cn(
    "mx-auto flex min-h-svh w-full max-w-7xl items-center px-12",
    "max-[1100px]:gap-12 max-[1100px]:px-6 max-[1100px]:py-12",
    "max-[900px]:flex-col",
    "max-[560px]:gap-8 max-[560px]:px-4 max-[560px]:py-8",
  );

  const heroClass = cn(
    "flex flex-1 items-center justify-center",
    "max-[900px]:w-full",
  );

  const heroInnerClass = cn(
    "flex w-full max-w-xl flex-col gap-12",
    "max-[900px]:max-w-[480px] max-[900px]:gap-8",
  );

  const copyClass = cn("flex flex-col items-start gap-6");

  const logoClass = cn(
    "h-20 w-[178px] object-contain object-left",
    "drop-shadow-[0_4px_3px_rgba(0,0,0,0.07)]",
  );

  const heroTitleClass = cn(
    "m-0 flex flex-col font-heading text-[60px]",
    "font-bold leading-[60px] tracking-normal",
    "max-[1100px]:text-[52px] max-[1100px]:leading-[54px]",
    "max-[560px]:text-[42px] max-[560px]:leading-[44px]",
  );

  const subtitleClass = cn(
    "m-0 font-sans text-xl font-normal leading-[32.5px]",
    "text-text-main",
    "max-[560px]:[&_br]:hidden",
  );

  const featuresClass = cn("flex flex-col gap-6");

  const featureItemClass = cn("inline-flex items-start gap-4");

  const featureContentClass = cn("flex flex-col gap-1");

  const featureTitleClass = cn(
    "font-heading text-lg font-bold leading-7",
    "text-text-strong",
  );

  const featureDescriptionClass = cn(
    "font-sans text-sm font-normal leading-5",
    "text-text-main/80",
  );

  const panelClass = cn(
    "flex flex-1 items-center justify-center",
    "max-[900px]:w-full",
  );

  const panelStackClass = cn("flex w-full max-w-[460px] flex-col gap-6");

  const cardClass = cn(
    "flex w-full flex-col gap-[26px] rounded-3xl border",
    "border-white/50 bg-white/85 px-9 py-[34px]",
    "shadow-[0_0_20px_-5px_rgba(58,190,249,0.1),0_10px_40px_-10px_rgba(0,102,138,0.1)]",
    "backdrop-blur-[6px]",
    "max-[560px]:gap-6 max-[560px]:px-5 max-[560px]:py-[26px]",
  );

  const cardHeaderClass = cn("flex flex-col gap-2");

  const titleClass = cn(
    "m-0 font-heading text-2xl font-bold leading-8",
    "tracking-normal text-text-strong",
  );

  const descriptionClass = cn(
    "m-0 font-sans text-md font-normal leading-7",
    "text-text-main",
  );

  const trustRowClass = cn(
    "flex items-center justify-center gap-8",
    "max-[560px]:flex-wrap max-[560px]:gap-5",
  );

  return (
    <main className={pageClass}>
      <div className={shellClass}>
        <section className={heroClass} aria-label="English writing assistant">
          <div className={heroInnerClass}>
            <div className={copyClass}>
              <img src={logo} alt="Engrow" className={logoClass} />
              <h1 className={heroTitleClass}>
                <span className="text-brand">Master your</span>
                <span className="text-brand-dark">English Writing</span>
              </h1>
              <p className={subtitleClass}>
                AI-powered analysis and personalized feedback to
                <br />
                elevate your score to the zenith.
              </p>
            </div>

            <div className={featuresClass}>
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                const badgeClass = cn(
                  "inline-flex h-12 w-12 flex-none items-center justify-center",
                  "rounded-[20px] border",
                  feature.variant === "primary"
                    ? "border-brand bg-brand/30"
                    : "border-secondary-soft bg-secondary-soft/30",
                );
                const iconClass = cn(
                  "h-[22px] w-[22px]",
                  feature.variant === "primary"
                    ? "text-brand"
                    : "text-brand-steel",
                );

                return (
                  <div key={feature.title} className={featureItemClass}>
                    <span className={badgeClass}>
                      <Icon aria-hidden="true" className={iconClass} />
                    </span>
                    <span className={featureContentClass}>
                      <strong className={featureTitleClass}>
                        {feature.title}
                      </strong>
                      <small className={featureDescriptionClass}>
                        {feature.description}
                      </small>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={panelClass} aria-label={title}>
          <div className={panelStackClass}>
            <div className={cardClass}>
              <div className={cardHeaderClass}>
                <h2 className={titleClass}>{title}</h2>
                <p className={descriptionClass}>{description}</p>
              </div>

              {children}
            </div>

            <div className={trustRowClass}>
              {DEFAULT_TRUST_ITEMS.map((item) => (
                <AuthTrustItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
