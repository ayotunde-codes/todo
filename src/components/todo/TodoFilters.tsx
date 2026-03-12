"use client";

type Filter = "all" | "active" | "completed";

interface TodoFiltersProps {
  active: Filter;
  onChange: (filter: Filter) => void;
  counts: { all: number; active: number; completed: number };
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Done" },
];

export default function TodoFilters({
  active,
  onChange,
  counts,
}: TodoFiltersProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={[
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-[13px] font-medium transition-all duration-150",
            active === f.value
              ? "bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]"
              : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]",
          ].join(" ")}
        >
          {f.label}
          <span
            className={[
              "min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-[var(--font-mono)] flex items-center justify-center",
              active === f.value
                ? "bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]"
                : "text-[var(--color-text-disabled)]",
            ].join(" ")}
          >
            {counts[f.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
