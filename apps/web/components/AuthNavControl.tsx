"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const getUserLabel = (user: User) => {
  const fullName = user.user_metadata?.full_name;
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    return fullName;
  }
  return user.email ?? "Signed in";
};

export default function AuthNavControl() {
  const router = useRouter();
  const supabase = useMemo(() => (hasSupabaseEnv ? createClient() : null), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let active = true;

    const syncUser = async () => {
      const {
        data: { user: nextUser },
      } = await supabase.auth.getUser();

      if (active) {
        setUser(nextUser ?? null);
        setLoading(false);
      }
    };

    syncUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [router, supabase]);

  if (!hasSupabaseEnv) {
    return null;
  }

  if (loading) {
    return <span className="hidden text-[11px] text-white/65 md:inline">Auth...</span>;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center rounded-lg border border-white/25 bg-white/[0.03] px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85 transition hover:bg-white/[0.1]"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-36 truncate rounded-lg border border-white/20 bg-white/[0.04] px-3 py-2 text-[11px] text-white/90 md:inline">
        {getUserLabel(user)}
      </span>
      <button
        type="button"
        disabled={isSigningOut}
        onClick={async () => {
          if (!supabase) {
            return;
          }

          setIsSigningOut(true);
          await supabase.auth.signOut();
          setIsSigningOut(false);
          router.push("/");
          router.refresh();
        }}
        className="inline-flex h-10 items-center rounded-lg border border-white/25 bg-white/[0.03] px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85 transition hover:bg-white/[0.1] disabled:opacity-60"
      >
        {isSigningOut ? "Signing out" : "Sign out"}
      </button>
    </div>
  );
}
