import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/share/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  className,
  iconLeft,
  iconRight,
  type = "button",
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  const baseClass = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-[18px] border font-bold transition duration-150",
    "disabled:cursor-not-allowed disabled:opacity-65",
  );

  const variantClass =
    variant === "primary"
      ? cn(
          "border-brand bg-brand text-white",
          "hover:not-disabled:bg-primary-hover hover:not-disabled:shadow-[0_12px_24px_rgba(58,190,249,0.24)]",
          "active:not-disabled:translate-y-px",
        )
      : cn(
          "border-border-subtle bg-white text-text-strong",
          "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
          "hover:not-disabled:border-brand/50",
        );

  return (
    <button
      type={type}
      className={cn(baseClass, variantClass, className)}
      {...buttonProps}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
