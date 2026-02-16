import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default async function ProtectedAppPage() {
  if (!hasSupabaseEnv) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-14 sm:px-10">
        <Link href="/" className="text-sm font-semibold text-accent transition-colors hover:text-[#0b6a6e]">
          Back to home
        </Link>
        <section className="glass-card mt-8 rounded-3xl border border-black/8 p-7 shadow-sm">
          <h1 className="font-display text-4xl tracking-tight">Protected app area</h1>
          <p className="mt-3 text-muted">Set Supabase environment variables to enable authentication.</p>
        </section>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/app");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-14 sm:px-10">
      <Link href="/" className="text-sm font-semibold text-accent transition-colors hover:text-[#0b6a6e]">
        Back to home
      </Link>
      <section className="glass-card mt-8 rounded-3xl border border-black/8 p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Protected</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">App dashboard placeholder</h1>
        <p className="mt-3 text-muted">
          Signed in as <span className="font-semibold text-foreground">{user.email}</span>.
        </p>
      </section>
    </main>
  );
}
