import {
  forwardRef,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { useDismissibleFieldError } from "@/share/hooks/useDismissibleFieldError";
import { cn } from "@/share/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  action?: ReactNode;
  error?: string;
  label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      action,
      className,
      error,
      id,
      label,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      rows = 5,
      ...textareaProps
    },
    ref,
  ) => {
    const { hideError, visibleError } = useDismissibleFieldError(error);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      hideError();
      onChange?.(event);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      event,
    ) => {
      const isEditingKey =
        event.key === "Backspace" ||
        event.key === "Delete" ||
        (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey);

      if (isEditingKey) {
        hideError();
      }

      onKeyDown?.(event);
    };

    const fieldClass = cn("flex flex-col gap-2");

    const labelClass = cn(
      "font-sans text-sm font-semibold leading-5 text-text-strong",
    );

    const actionRowClass = cn(
      "flex items-center justify-between gap-4",
      "[&_a]:text-sm [&_a]:font-medium [&_a]:leading-5",
      "[&_a]:text-brand [&_a]:no-underline",
    );

    const textareaClass = cn(
      "min-h-[132px] w-full resize-y rounded-[18px] border bg-white",
      visibleError
        ? "border-red-400/75 focus:border-red-400/80 focus:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(239,68,68,0.14)]"
        : "border-border-soft focus:border-brand/80 focus:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(58,190,249,0.14)]",
      "px-4 py-3.5 font-sans text-[15px] font-normal leading-6",
      "text-text-strong shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
      "outline-none placeholder:text-text-muted/40",
      "disabled:cursor-not-allowed disabled:opacity-65",
      "transition-all duration-200",
      className,
    );

    const errorClass = cn(
      "font-sans text-[13px] font-medium leading-[18px] text-red-500",
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

        <textarea
          id={id}
          ref={ref}
          rows={rows}
          aria-invalid={Boolean(visibleError)}
          className={textareaClass}
          onBlur={onBlur}
          onChange={handleChange}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
          {...textareaProps}
        />

        {visibleError && <p className={errorClass}>{visibleError}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
