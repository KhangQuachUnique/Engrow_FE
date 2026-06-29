import {
  forwardRef,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { HiCheck } from "react-icons/hi2";
import { useDismissibleFieldError } from "@/share/hooks/useDismissibleFieldError";
import { cn } from "@/share/utils/cn";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  description?: ReactNode;
  error?: string;
  label: ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      description,
      error,
      id,
      label,
      onBlur,
      onChange,
      onFocus,
      ...checkboxProps
    },
    ref,
  ) => {
    const { hideError, visibleError } = useDismissibleFieldError(error);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      hideError();
      onChange?.(event);
    };

    const fieldClass = cn("flex flex-col gap-2");

    const rowClass = cn(
      "group flex items-start gap-3 rounded-[18px] border bg-white p-3.5",
      visibleError
        ? "border-red-400/75"
        : "border-border-soft focus-within:border-brand/80",
      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200",
      "focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(58,190,249,0.14)]",
      "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-65",
      className,
    );

    const inputClass = cn("peer sr-only");

    const boxClass = cn(
      "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md",
      "border border-border-soft bg-page text-white transition-all duration-200",
      "peer-checked:border-brand peer-checked:bg-brand",
      "peer-checked:[&>svg]:opacity-100",
      "peer-focus-visible:ring-4 peer-focus-visible:ring-brand/15",
    );

    const labelClass = cn(
      "cursor-pointer font-sans text-sm font-semibold leading-5",
      "text-text-strong peer-disabled:cursor-not-allowed",
    );

    const descriptionClass = cn(
      "m-0 font-sans text-sm font-normal leading-5 text-text-main/75",
    );

    const errorClass = cn(
      "font-sans text-[13px] font-medium leading-[18px] text-red-500",
    );

    return (
      <div className={fieldClass}>
        <label className={rowClass}>
          <input
            id={id}
            ref={ref}
            type="checkbox"
            aria-invalid={Boolean(visibleError)}
            className={inputClass}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={onFocus}
            {...checkboxProps}
          />
          <span aria-hidden="true" className={boxClass}>
            <HiCheck className="h-4 w-4 opacity-0 transition-opacity" />
          </span>
          <span className="flex flex-col gap-1">
            <span className={labelClass}>{label}</span>
            {description && <span className={descriptionClass}>{description}</span>}
          </span>
        </label>

        {visibleError && <p className={errorClass}>{visibleError}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
