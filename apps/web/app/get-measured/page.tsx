import Link from "next/link";

const steps = [
  "Choose who this profile is for (self or child).",
  "Invite a tailor or enter measurements directly later.",
  "Review and set one active measurement profile for future orders.",
];

export default function GetMeasuredPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12 sm:px-10">
      <Link href="/" className="text-sm font-semibold text-accent transition-colors hover:text-[#0b6a6e]">
        Back to home
      </Link>

      <section className="mt-8 rounded-3xl border border-black/8 bg-white/80 p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Coming soon</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">Get measured flow</h1>
        <p className="mt-3 text-base text-muted">
          This route will guide profile setup and measurement capture before any order is placed.
        </p>

        <ol className="mt-6 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="rounded-xl border border-black/8 bg-background px-4 py-3 text-sm text-muted">
              <span className="font-semibold text-foreground">Step {index + 1}:</span> {step}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/group-order"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b6a6e]"
          >
            Preview group-order flow
          </Link>
          <Link
            href="/"
            className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
          >
            Return to landing
          </Link>
        </div>
      </section>
    </main>
  );
}
