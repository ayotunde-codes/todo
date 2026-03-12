"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import type { CreateTodoInput, Priority } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface TodoFormProps {
  onAdd: (input: CreateTodoInput) => Promise<void>;
}

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expanded) titleRef.current?.focus();
  }, [expanded]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    setLoading(true);

    await onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDueDate("");
    setLoading(false);
    setExpanded(false);
  }

  function handleCancel() {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDueDate("");
    setError("");
    setExpanded(false);
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-default)] text-[var(--color-text-tertiary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-muted)] transition-all duration-150 group"
      >
        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-text-secondary)]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 2v6M2 5h6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="text-[14px]">New task</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] overflow-hidden animate-fade-in"
    >
      <div className="p-4 flex flex-col gap-3">
        <input
          ref={titleRef}
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          className="w-full bg-transparent text-[15px] font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none"
        />

        <Textarea
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="bg-transparent border-none px-0 py-0 text-[13px] text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none resize-none"
        />

        {error && (
          <p className="text-[12px] text-[var(--color-danger)]">{error}</p>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--color-border-subtle)]">
          {/* Priority selector */}
          <div className="flex items-center gap-1">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={[
                  "px-2.5 py-1 rounded-[var(--radius-sm)] text-[12px] font-medium transition-all duration-100",
                  priority === p.value
                    ? "bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)]"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] border border-transparent",
                ].join(" ")}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Due date */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="h-7 px-2 rounded-[var(--radius-sm)] bg-[var(--color-bg-overlay)] border border-[var(--color-border-default)] text-[12px] text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-border-strong)] [color-scheme:dark]"
          />
        </div>
      </div>

      <div className="px-4 py-3 bg-[var(--color-bg-surface)] border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" loading={loading}>
          Add task
        </Button>
      </div>
    </form>
  );
}
