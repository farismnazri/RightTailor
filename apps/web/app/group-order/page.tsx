import Link from "next/link";

const flow = [
  "Create a group for wedding party or corporate batch.",
  "Set shared fabric, cut, and color choices once.",
  "Invite participants and attach each person's measurement profile.",
  "Submit the group when everyone is complete.",
];

export default function GroupOrderPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12 sm:px-10">
      <Link href="/" className="text-sm font-semibold text-accent transition-colors hover:text-[#0b6a6e]">
        Back to home
      </Link>

      <section className="mt-8 rounded-3xl border border-black/8 bg-white/80 p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Coming soon</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">Group order flow</h1>
        <p className="mt-3 text-base text-muted">
          This page will coordinate shared specs and participant progress without exposing individual measurement values.
        </p>

        <ul className="mt-6 space-y-3">
          {flow.map((item, index) => (
            <li key={item} className="rounded-xl border border-black/8 bg-background px-4 py-3 text-sm text-muted">
              <span className="font-semibold text-foreground">{index + 1}.</span> {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/get-measured"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b6a6e]"
          >
            Preview get-measured flow
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
