"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.id) {
      router.replace("/todos");
    } else {
      router.replace("/login");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#080808]">
      <div className="w-5 h-5 border-2 border-[#2c2c2e] border-t-[#f5f5f7] rounded-full animate-spin" />
    </div>
  );
}
