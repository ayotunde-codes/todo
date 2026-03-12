import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getTodosByUser, createTodo } from "@/services/todo.service";
import type { CreateTodoInput } from "@/types";

export async function GET() {
  const session = await getSession();
  if (!session?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todos = await getTodosByUser(session.id);
  return NextResponse.json({ data: todos });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: CreateTodoInput = await req.json();
    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const todo = await createTodo(session.id, body);
    return NextResponse.json({ data: todo }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}
