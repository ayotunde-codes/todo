"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-dvh flex items-center justify-center px-5 bg-[#080808]">
      <div className="w-full max-w-[520px] flex flex-col gap-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[rgba(255,69,58,0.12)] border border-[rgba(255,69,58,0.2)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 5v4M8 11v.5"
                stroke="#ff453a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M6.8 2.2L1.2 12a1.4 1.4 0 001.2 2.1h11.2a1.4 1.4 0 001.2-2.1L9.2 2.2a1.4 1.4 0 00-2.4 0z"
                stroke="#ff453a"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[16px] font-semibold text-[#f5f5f7] tracking-tight">
              Something went wrong
            </h1>
            {error.digest && (
              <p className="text-[11px] text-[#636366] font-mono mt-0.5">
                digest: {error.digest}
              </p>
            )}
          </div>
        </div>

        {/* Error card */}
        <div className="rounded-[14px] border border-[#2c2c2e] bg-[#111111] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1f1f1f]">
            <p className="text-[13px] text-[#a1a1a6]">
              {error.message || "An unexpected server error occurred."}
            </p>
          </div>

          {isDev && error.stack && (
            <div className="p-4">
              <p className="text-[11px] font-semibold text-[#636366] uppercase tracking-widest mb-2">
                Stack trace
              </p>
              <pre className="text-[11px] text-[#636366] font-mono bg-[#0a0a0a] rounded-[8px] p-3 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-[#1f1f1f] max-h-48">
                {error.stack}
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="h-10 px-5 rounded-[10px] bg-[#f5f5f7] text-[#080808] text-[14px] font-semibold hover:bg-white transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => router.push("/")}
            className="h-10 px-5 rounded-[10px] bg-[#1a1a1a] border border-[#2c2c2e] text-[#f5f5f7] text-[14px] font-medium hover:bg-[#222] transition-colors"
          >
            Go home
          </button>
        </div>

        {!isDev && (
          <p className="text-[12px] text-[#3a3a3c]">
            If this keeps happening, check your environment variables in the
            Amplify Console (AUTH_SECRET, DATABASE_URL, NEXTAUTH_URL).
          </p>
        )}
      </div>
    </div>
  );
}
