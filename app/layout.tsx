import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "Focus — Todo",
  description: "A minimal, focused task manager",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ErrorBoundary>
          <SessionProvider>{children}</SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
