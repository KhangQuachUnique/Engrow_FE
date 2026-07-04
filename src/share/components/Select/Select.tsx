import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi2";
import { useDismissibleFieldError } from "@/share/hooks/useDismissibleFieldError";
import { cn } from "@/share/utils/cn";

interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

interface SelectProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children" | "defaultValue" | "onChange" | "type" | "value"
> {
  action?: ReactNode;
  defaultValue?: string;
  error?: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: string) => void;
  options: readonly SelectOption[];
  placeholder?: string;
  value?: string;
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      action,
      className,
      defaultValue = "",
      disabled,
      error,
      id,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      onValueChange,
      options,
      placeholder = "Select an option",
      value,
      ...inputProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? `${generatedId}-select`;
    const listboxId = `${inputId}-listbox`;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { hideError, visibleError } = useDismissibleFieldError(error);

    const selectedValue = isControlled ? value : internalValue;
    const selectedOption = useMemo(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue],
    );

    const enabledOptions = useMemo(
      () => options.filter((option) => !option.disabled),
      [options],
    );

    const setInputRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
        return;
      }

      if (ref) {
        ref.current = node;
      }
    };

    const emitChange = (nextValue: string) => {
      if (!inputRef.current) return;

      inputRef.current.value = nextValue;
      onValueChange?.(nextValue);
      onChange?.({
        currentTarget: inputRef.current,
        target: inputRef.current,
      } as ChangeEvent<HTMLInputElement>);
    };

    const selectValue = (nextValue: string) => {
      const nextOption = options.find((option) => option.value === nextValue);

      if (!nextOption || nextOption.disabled) return;

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      hideError();
      emitChange(nextValue);
      setIsOpen(false);
    };

    const moveHighlight = (direction: 1 | -1) => {
      if (enabledOptions.length === 0) return;

      const selectedIndex = enabledOptions.findIndex(
        (option) => option.value === selectedValue,
      );
      const currentIndex =
        highlightedIndex >= 0 ? highlightedIndex : Math.max(selectedIndex, 0);
      const nextIndex =
        (currentIndex + direction + enabledOptions.length) %
        enabledOptions.length;

      setHighlightedIndex(nextIndex);
    };

    const openMenu = () => {
      if (disabled) return;

      const selectedIndex = enabledOptions.findIndex(
        (option) => option.value === selectedValue,
      );

      setHighlightedIndex(Math.max(selectedIndex, 0));
      setIsOpen(true);
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!isOpen) {
          openMenu();
          return;
        }
        moveHighlight(1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!isOpen) {
          openMenu();
          return;
        }
        moveHighlight(-1);
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!isOpen) {
          openMenu();
          return;
        }

        const option = enabledOptions[highlightedIndex];
        if (option) {
          selectValue(option.value);
        }
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "Home") {
        event.preventDefault();
        setHighlightedIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setHighlightedIndex(enabledOptions.length - 1);
      }
    };

    useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);

      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [isOpen]);

    const fieldClass = cn("flex flex-col gap-2");

    const labelClass = cn(
      "font-sans text-sm font-semibold leading-5 text-text-strong",
    );

    const actionRowClass = cn(
      "flex items-center justify-between gap-4",
      "[&_a]:text-sm [&_a]:font-medium [&_a]:leading-5",
      "[&_a]:text-brand [&_a]:no-underline",
    );

    const triggerClass = cn(
      "flex h-12 w-full items-center justify-between gap-3 rounded-[18px]",
      "border bg-white px-4 py-[13px] text-left",
      visibleError
        ? "border-red-400/75 focus:border-red-400/80 focus:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(239,68,68,0.14)]"
        : "border-border-soft focus:border-brand/80 focus:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(58,190,249,0.14)]",
      "font-sans text-[15px] font-normal text-text-strong",
      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none",
      "transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-65",
      className,
    );

    const valueClass = cn(
      "min-w-0 flex-1 truncate",
      !selectedOption && "text-text-muted/50",
    );

    const chevronClass = cn(
      "h-5 w-5 flex-none text-text-muted transition-transform duration-200",
      isOpen && "rotate-180",
    );

    const menuClass = cn(
      "absolute left-0 right-0 top-[calc(100%+8px)] z-20",
      "max-h-60 overflow-auto rounded-[18px] border border-border-soft",
      "bg-white p-1.5 shadow-[0_18px_40px_rgba(0,102,138,0.14)]",
    );

    const errorClass = cn(
      "font-sans text-[13px] font-medium leading-[18px] text-red-500",
    );

    return (
      <div className={fieldClass} ref={rootRef}>
        {action ? (
          <div className={actionRowClass}>
            <label className={labelClass} htmlFor={inputId}>
              {label}
            </label>
            {action}
          </div>
        ) : (
          <label className={labelClass} htmlFor={inputId}>
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={`${inputId}-value`}
            ref={setInputRef}
            type="hidden"
            name={name}
            value={selectedValue}
            disabled={disabled}
            aria-invalid={Boolean(visibleError)}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            {...inputProps}
          />

          <button
            id={inputId}
            type="button"
            className={triggerClass}
            disabled={disabled}
            aria-controls={listboxId}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-invalid={Boolean(visibleError)}
            onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
            onKeyDown={handleTriggerKeyDown}>
            <span className={valueClass}>
              {selectedOption?.label ?? placeholder}
            </span>
            <HiChevronDown aria-hidden="true" className={chevronClass} />
          </button>

          {isOpen && (
            <div id={listboxId} role="listbox" className={menuClass}>
              {options.map((option) => {
                const enabledIndex = enabledOptions.findIndex(
                  (enabledOption) => enabledOption.value === option.value,
                );
                const isSelected = option.value === selectedValue;
                const isHighlighted = enabledIndex === highlightedIndex;
                const optionClass = cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl",
                  "px-3 py-2.5 text-left font-sans text-sm font-semibold",
                  "transition-colors duration-50",
                  option.disabled
                    ? "cursor-not-allowed text-text-muted/40"
                    : "cursor-pointer text-text-strong hover:bg-primary-50",
                  isHighlighted && !option.disabled && "bg-primary-50",
                  isSelected && "text-brand-dark",
                );

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    disabled={option.disabled}
                    aria-selected={isSelected}
                    className={optionClass}
                    onMouseEnter={() => {
                      if (!option.disabled) setHighlightedIndex(enabledIndex);
                    }}
                    onClick={() => selectValue(option.value)}>
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <HiCheck
                        aria-hidden="true"
                        className="h-4 w-4 flex-none text-brand"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {visibleError && <p className={errorClass}>{visibleError}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
