"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-bg-base)] hover:bg-[var(--color-accent-hover)] font-semibold",
  secondary:
    "bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-strong)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-text-primary)]",
  danger:
    "bg-[var(--color-danger-muted)] text-[var(--color-danger)] border border-transparent hover:border-[var(--color-danger)] hover:bg-[var(--color-danger-muted)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] rounded-[var(--radius-sm)]",
  md: "h-10 px-4 text-[14px] rounded-[var(--radius-md)]",
  lg: "h-12 px-6 text-[15px] rounded-[var(--radius-md)]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      loading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-all duration-150 ease-out",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "select-none whitespace-nowrap",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
