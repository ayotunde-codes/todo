import type { Priority } from "@/types";

interface BadgeProps {
  priority: Priority;
}

const priorityConfig: Record<
  Priority,
  { label: string; className: string }
> = {
  LOW: {
    label: "Low",
    className:
      "text-[var(--color-priority-low)] bg-[rgba(99,99,102,0.12)] border-[rgba(99,99,102,0.2)]",
  },
  MEDIUM: {
    label: "Medium",
    className:
      "text-[var(--color-priority-medium)] bg-[rgba(161,161,166,0.1)] border-[rgba(161,161,166,0.2)]",
  },
  HIGH: {
    label: "High",
    className:
      "text-[var(--color-priority-high)] bg-[rgba(245,245,247,0.08)] border-[rgba(245,245,247,0.15)]",
  },
};

export default function Badge({ priority }: BadgeProps) {
  const config = priorityConfig[priority];
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)]",
        "text-[11px] font-medium tracking-wide border",
        "font-[var(--font-mono)]",
        config.className,
      ].join(" ")}
    >
      {config.label}
    </span>
  );
}
