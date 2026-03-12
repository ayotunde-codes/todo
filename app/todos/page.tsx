import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getTodosByUser } from "@/services/todo.service";
import Header from "@/components/layout/Header";
import AuthGuard from "@/components/layout/AuthGuard";
import TodoList from "@/components/todo/TodoList";
import type { TodoItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const todos = await getTodosByUser(session.user.id);

  const serialized: TodoItem[] = todos.map((t) => ({
    ...t,
    dueDate: t.dueDate ? new Date(t.dueDate) : null,
    createdAt: new Date(t.createdAt),
    updatedAt: new Date(t.updatedAt),
  }));

  return (
    <AuthGuard>
      <div className="min-h-dvh bg-[var(--color-bg-base)]">
        <Header />
        <main className="max-w-3xl mx-auto px-5 py-8">
          <TodoList initialTodos={serialized} />
        </main>
      </div>
    </AuthGuard>
  );
}
