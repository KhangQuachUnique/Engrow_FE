import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/share/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  action?: ReactNode;
  error?: string;
  icon?: IconType;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ action, className, error, icon: Icon, id, label, ...inputProps }, ref) => {
    const fieldClass = cn("flex flex-col gap-2");

    const labelClass = cn(
      "text-sm font-semibold leading-5 text-text-strong",
      "font-sans",
    );

    const actionRowClass = cn(
      "flex items-center justify-between gap-4",
      "[&_a]:text-sm [&_a]:font-medium [&_a]:leading-5",
      "[&_a]:text-brand [&_a]:no-underline",
    );

    const inputWrapClass = cn("relative");

    const inputClass = cn(
      "h-12 w-full rounded-[18px] border bg-white",
      "border-border-soft px-4 py-[13px]",
      Icon ? "pl-[42px]" : "pl-4",
      "font-sans text-[15px] font-normal text-text-strong",
      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none",
      "placeholder:text-text-muted/40",
      "focus:border-brand/80 focus:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(58,190,249,0.14)]",
      "aria-invalid:border-[rgba(239,68,68,0.75)]",
      "disabled:cursor-not-allowed disabled:opacity-65",
      className,
    );

    const iconClass = cn(
      "pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px]",
      "-translate-y-1/2 text-text-muted",
    );

    const errorClass = cn(
      "font-sans text-[13px] font-medium leading-[18px]",
      "text-red-600",
    );

    return (
      <div className={fieldClass}>
        {action ? (
          <div className={actionRowClass}>
            <label className={labelClass} htmlFor={id}>
              {label}
            </label>
            {action}
          </div>
        ) : (
          <label className={labelClass} htmlFor={id}>
            {label}
          </label>
        )}

        <div className={inputWrapClass}>
          {Icon && <Icon aria-hidden="true" className={iconClass} />}
          <input
            id={id}
            ref={ref}
            aria-invalid={Boolean(error)}
            className={inputClass}
            {...inputProps}
          />
        </div>

        {error && <p className={errorClass}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
