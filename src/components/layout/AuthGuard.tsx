"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-base)]">
        <div className="w-5 h-5 border-2 border-[var(--color-border-strong)] border-t-[var(--color-accent)] rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return <>{children}</>;
}
