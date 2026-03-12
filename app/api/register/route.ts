import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/services/todo.service";
import { createToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await createUser(email, hashed, name);

    const token = await createToken({
      id: user.id,
      email: user.email,
      name: user.name ?? null,
    });

    const cookie = setSessionCookie(token);
    const response = NextResponse.json({ data: user }, { status: 201 });
    response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
    return response;
  } catch (err) {
    console.error("[/api/register] error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Registration failed", detail: message }, { status: 500 });
  }
}
