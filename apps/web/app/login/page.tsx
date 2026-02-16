"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const DEFAULT_NEXT_PATH = "/app";

const normalizeNextPath = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_NEXT_PATH;
  }
  return value;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const supabase = useMemo(() => (hasSupabaseEnv ? createClient() : null), []);

  const next = normalizeNextPath(searchParams.get("next"));
  const callbackError = searchParams.get("error");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-14 sm:px-10">
      <Link href="/" className="text-sm font-semibold text-accent transition-colors hover:text-[#0b6a6e]">
        Back to home
      </Link>

      <section className="glass-card mt-8 rounded-3xl border border-black/8 p-7 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Authentication</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">Sign in</h1>
        <p className="mt-3 text-base text-muted">
          Continue with Google to access protected pages. Public routes remain open without sign-in.
        </p>

        {callbackError ? (
          <p className="mt-4 rounded-xl border border-[#c86b47]/30 bg-[#fff1ea] px-4 py-3 text-sm text-[#9a4f2d]">
            OAuth callback failed. Please try signing in again.
          </p>
        ) : null}

        {errorMessage ? (
          <p className="mt-4 rounded-xl border border-[#c86b47]/30 bg-[#fff1ea] px-4 py-3 text-sm text-[#9a4f2d]">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-7">
          <button
            type="button"
            disabled={isSubmitting || !supabase}
            onClick={async () => {
              if (!supabase) {
                setErrorMessage("Supabase environment variables are missing.");
                return;
              }

              setIsSubmitting(true);
              setErrorMessage(null);

              // Supabase project settings must allow this callback URL:
              // e.g. http://localhost:3000/auth/callback
              const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo,
                },
              });

              if (error) {
                setErrorMessage(error.message);
                setIsSubmitting(false);
                return;
              }

              router.refresh();
            }}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b6a6e] disabled:opacity-60"
          >
            {isSubmitting ? "Redirecting..." : "Continue with Google"}
          </button>
        </div>
      </section>
    </main>
  );
}
