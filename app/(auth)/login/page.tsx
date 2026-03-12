"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/todos");
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-5 bg-[var(--color-bg-base)]">
      <div className="w-full max-w-[380px] animate-fade-in">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 4h10M2 7h7M2 10h5"
                stroke="#080808"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-[18px] font-semibold tracking-tight text-[var(--color-text-primary)]">
            Focus
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-[26px] font-semibold text-[var(--color-text-primary)] tracking-tight mb-1.5">
            Welcome back
          </h1>
          <p className="text-[14px] text-[var(--color-text-secondary)]">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoFocus
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="px-3.5 py-3 rounded-[var(--radius-md)] bg-[var(--color-danger-muted)] border border-[rgba(255,69,58,0.2)]">
              <p className="text-[13px] text-[var(--color-danger)]">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="mt-1 w-full"
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-[13px] text-[var(--color-text-tertiary)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
