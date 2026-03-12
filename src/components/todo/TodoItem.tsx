"use client";

import { useState } from "react";
import type { TodoItem as TodoItemType, UpdateTodoInput, Priority } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface TodoItemProps {
  todo: TodoItemType;
  onUpdate: (id: string, input: UpdateTodoInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description ?? "");
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleToggle() {
    await onUpdate(todo.id, { completed: !todo.completed });
  }

  async function handleSaveEdit() {
    if (!editTitle.trim()) return;
    setSaving(true);
    await onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
    });
    setSaving(false);
    setIsEditing(false);
  }

  async function handleDelete() {
    setDeleting(true);
    await onDelete(todo.id);
  }

  function handleCancelEdit() {
    setEditTitle(todo.title);
    setEditDescription(todo.description ?? "");
    setEditPriority(todo.priority);
    setIsEditing(false);
  }

  const formattedDate = todo.dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(new Date(todo.dueDate))
    : null;

  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  if (isEditing) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] overflow-hidden animate-fade-in">
        <div className="p-4 flex flex-col gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[15px] font-medium text-[var(--color-text-primary)] focus:outline-none"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
            placeholder="Description (optional)"
            className="w-full bg-transparent text-[13px] text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none resize-none"
          />
          <div className="flex items-center gap-1 pt-1 border-t border-[var(--color-border-subtle)]">
            {(["LOW", "MEDIUM", "HIGH"] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setEditPriority(p)}
                className={[
                  "px-2.5 py-1 rounded-[var(--radius-sm)] text-[12px] font-medium transition-all duration-100",
                  editPriority === p
                    ? "bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)]"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] border border-transparent",
                ].join(" ")}
              >
                {p.charAt(0) + p.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-3 bg-[var(--color-bg-surface)] border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={saving}
            onClick={handleSaveEdit}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "group flex items-start gap-3.5 px-4 py-3.5 rounded-[var(--radius-lg)]",
        "border bg-[var(--color-bg-elevated)]",
        "transition-all duration-150",
        todo.completed
          ? "border-[var(--color-border-subtle)] opacity-50"
          : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]",
        deleting ? "opacity-30 pointer-events-none" : "",
      ].join(" ")}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={[
          "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-150",
          todo.completed
            ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
            : "border-[var(--color-border-strong)] hover:border-[var(--color-accent)]",
        ].join(" ")}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="animate-[checkmark_0.15s_ease_forwards]"
          >
            <path
              d="M2 5l2.5 2.5L8 3"
              stroke="#080808"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={[
            "text-[14px] font-medium leading-snug",
            todo.completed
              ? "line-through text-[var(--color-text-tertiary)]"
              : "text-[var(--color-text-primary)]",
          ].join(" ")}
        >
          {todo.title}
        </p>

        {todo.description && (
          <p className="mt-0.5 text-[12px] text-[var(--color-text-tertiary)] leading-relaxed line-clamp-2">
            {todo.description}
          </p>
        )}

        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <Badge priority={todo.priority} />

          {formattedDate && (
            <span
              className={[
                "text-[11px] font-[var(--font-mono)]",
                isOverdue
                  ? "text-[var(--color-danger)]"
                  : "text-[var(--color-text-tertiary)]",
              ].join(" ")}
            >
              {isOverdue ? "Overdue · " : ""}{formattedDate}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] transition-all duration-100"
          aria-label="Edit"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M9.5 1.5l2 2-7 7H2.5v-2l7-7z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger-muted)] transition-all duration-100"
          aria-label="Delete"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 3.5h9M5 3.5V2.5h3v1M4.5 3.5l.5 7h3l.5-7"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
