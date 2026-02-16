import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default async function ProfilesPage() {
  if (!hasSupabaseEnv) {
    redirect("/login?next=/profiles");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/profiles");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-14 sm:px-10">
      <Link href="/" className="text-sm font-semibold text-accent transition-colors hover:text-[#0b6a6e]">
        Back to home
      </Link>
      <section className="glass-card mt-8 rounded-3xl border border-black/8 p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Protected</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">Profiles placeholder</h1>
        <p className="mt-3 text-muted">Auth wiring is complete. Profiles CRUD comes in the next slice.</p>
      </section>
    </main>
  );
}
