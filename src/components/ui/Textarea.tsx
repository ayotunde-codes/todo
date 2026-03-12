"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={inputId}
          rows={3}
          className={[
            "w-full px-3.5 py-3 rounded-[var(--radius-md)]",
            "bg-[var(--color-bg-elevated)] border",
            "text-[var(--color-text-primary)] text-[14px] placeholder:text-[var(--color-text-disabled)]",
            "resize-none transition-all duration-150",
            "focus:outline-none focus:ring-0",
            error
              ? "border-[var(--color-danger)]"
              : "border-[var(--color-border-default)] focus:border-[var(--color-border-strong)] hover:border-[var(--color-border-strong)]",
            className,
          ].join(" ")}
          {...props}
        />
        {error && (
          <p className="text-[12px] text-[var(--color-danger)]">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
