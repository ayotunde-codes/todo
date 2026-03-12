import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getTodosByUser } from "@/services/todo.service";
import Header from "@/components/layout/Header";
import TodoList from "@/components/todo/TodoList";
import type { TodoItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const session = await getSession();

  if (!session?.id) {
    redirect("/login");
  }

  const todos = await getTodosByUser(session.id);

  const serialized: TodoItem[] = todos.map((t) => ({
    ...t,
    dueDate: t.dueDate ? new Date(t.dueDate) : null,
    createdAt: new Date(t.createdAt),
    updatedAt: new Date(t.updatedAt),
  }));

  return (
    <div className="min-h-dvh bg-[var(--color-bg-base)]">
      <Header user={session} />
      <main className="max-w-3xl mx-auto px-5 py-8">
        <TodoList initialTodos={serialized} />
      </main>
    </div>
  );
}
