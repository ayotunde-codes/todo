import { prisma } from "@/lib/prisma";
import type { CreateTodoInput, UpdateTodoInput } from "@/types";

export async function getTodosByUser(userId: string) {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
  });
}

export async function getTodoById(id: string, userId: string) {
  return prisma.todo.findFirst({
    where: { id, userId },
  });
}

export async function createTodo(userId: string, input: CreateTodoInput) {
  return prisma.todo.create({
    data: {
      title: input.title,
      description: input.description ?? null,
      priority: input.priority ?? "MEDIUM",
      dueDate: input.dueDate ? new Date(input.dueDate) : null,
      userId,
    },
  });
}

export async function updateTodo(
  id: string,
  userId: string,
  input: UpdateTodoInput
) {
  const todo = await prisma.todo.findFirst({ where: { id, userId } });
  if (!todo) return null;

  return prisma.todo.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.completed !== undefined && { completed: input.completed }),
      ...(input.priority !== undefined && { priority: input.priority }),
      ...(input.dueDate !== undefined && {
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
      }),
    },
  });
}

export async function deleteTodo(id: string, userId: string) {
  const todo = await prisma.todo.findFirst({ where: { id, userId } });
  if (!todo) return null;

  return prisma.todo.delete({ where: { id } });
}

export async function createUser(
  email: string,
  password: string,
  name?: string
) {
  return prisma.user.create({
    data: { email, password, name: name ?? null },
    select: { id: true, email: true, name: true, createdAt: true },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
