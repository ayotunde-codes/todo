"use client";

import { useState, useCallback } from "react";
import type { TodoItem as TodoItemType, CreateTodoInput, UpdateTodoInput } from "@/types";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TodoFilters from "./TodoFilters";

type Filter = "all" | "active" | "completed";

interface TodoListProps {
  initialTodos: TodoItemType[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<TodoItemType[]>(initialTodos);
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = useCallback(async (input: CreateTodoInput) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await res.json();
    if (json.data) {
      setTodos((prev) => [json.data, ...prev]);
    }
  }, []);

  const updateTodo = useCallback(
    async (id: string, input: UpdateTodoInput) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (json.data) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...json.data } : t))
        );
      }
    },
    []
  );

  const deleteTodo = useCallback(async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)] tracking-tight">
            My Tasks
          </h1>
          <p className="text-[13px] text-[var(--color-text-tertiary)] mt-0.5">
            {counts.active === 0
              ? "All caught up"
              : `${counts.active} task${counts.active === 1 ? "" : "s"} remaining`}
          </p>
        </div>
        <TodoFilters active={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Add form */}
      <TodoForm onAdd={addTodo} />

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 6h12M4 10h8M4 14h6"
                  stroke="var(--color-text-disabled)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-[14px] text-[var(--color-text-tertiary)]">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                ? "No active tasks"
                : "No tasks yet — add one above"}
            </p>
          </div>
        ) : (
          filtered.map((todo, i) => (
            <div
              key={todo.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <TodoItem
                todo={todo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            </div>
          ))
        )}
      </div>

      {/* Footer stats */}
      {todos.length > 0 && (
        <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
          <span className="text-[12px] text-[var(--color-text-disabled)] font-[var(--font-mono)]">
            {counts.completed}/{counts.all} complete
          </span>
          {counts.completed > 0 && (
            <button
              onClick={async () => {
                const completed = todos.filter((t) => t.completed);
                await Promise.all(completed.map((t) => deleteTodo(t.id)));
              }}
              className="text-[12px] text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors duration-150"
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}
