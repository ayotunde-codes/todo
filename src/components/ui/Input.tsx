"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-[var(--color-text-secondary)] tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "h-11 w-full px-3.5 rounded-[var(--radius-md)]",
            "bg-[var(--color-bg-elevated)] border",
            "text-[var(--color-text-primary)] text-[14px] placeholder:text-[var(--color-text-disabled)]",
            "transition-all duration-150",
            "focus:outline-none focus:ring-0",
            error
              ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
              : "border-[var(--color-border-default)] focus:border-[var(--color-border-strong)] hover:border-[var(--color-border-strong)]",
            className,
          ].join(" ")}
          {...props}
        />
        {error && (
          <p className="text-[12px] text-[var(--color-danger)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-[12px] text-[var(--color-text-tertiary)]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
