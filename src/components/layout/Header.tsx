"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function Header() {
  const { data: session } = useSession();
  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : session?.user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/80 backdrop-blur-xl">
      <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-[var(--radius-sm)] bg-[var(--color-accent)] flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4h10M2 7h7M2 10h5"
                stroke="#080808"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-[var(--color-text-primary)] tracking-tight">
            Focus
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[var(--color-bg-overlay)] border border-[var(--color-border-default)] flex items-center justify-center">
              <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] font-[var(--font-mono)]">
                {initials}
              </span>
            </div>
            <span className="text-[13px] text-[var(--color-text-secondary)] hidden sm:block">
              {session?.user?.name ?? session?.user?.email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
