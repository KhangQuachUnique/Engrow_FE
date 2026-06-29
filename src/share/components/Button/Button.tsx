import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/share/utils/cn";

interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  loading?: boolean;
  loadingText?: ReactNode;
  variant?: "primary" | "secondary";
}

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<LinkProps, "children" | "className" | "to"> & {
    to: LinkProps["to"];
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button({
  children,
  className,
  iconLeft,
  iconRight,
  isLoading = false,
  loading = false,
  loadingText,
  variant = "primary",
  ...props
}: ButtonProps) {
  const isPending = isLoading || loading;

  const baseClass = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-[18px] border font-bold transition duration-150",
    "disabled:cursor-not-allowed disabled:opacity-65",
    isPending && "cursor-wait opacity-80",
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

  const buttonClass = cn(baseClass, variantClass, className);
  const spinnerClass = cn(
    "h-4 w-4 flex-none animate-spin rounded-full border-2",
    "border-current border-t-transparent",
  );

  const content = (
    <>
      {isPending ? (
        <span aria-hidden="true" className={spinnerClass} />
      ) : (
        iconLeft
      )}
      {isPending && loadingText ? loadingText : children}
      {!isPending && iconRight}
    </>
  );

  if ("to" in props && props.to !== undefined) {
    const { onClick, tabIndex, ...linkProps } = props;

    return (
      <Link
        {...linkProps}
        aria-disabled={isPending || undefined}
        className={buttonClass}
        tabIndex={isPending ? -1 : tabIndex}
        onClick={(event) => {
          if (isPending) {
            event.preventDefault();
            return;
          }

          onClick?.(event);
        }}
      >
        {content}
      </Link>
    );
  }

  const { disabled, type = "button", ...buttonProps } = props;

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || isPending}
      aria-busy={isPending || undefined}
      {...buttonProps}>
      {content}
    </button>
  );
}
