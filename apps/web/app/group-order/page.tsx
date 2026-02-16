"use client";

import Link from "next/link";
import Grainient from "@/components/Grainient";
import Silk from "@/components/Silk";

const flow = [
  "Create a group for wedding party or corporate batch.",
  "Set shared fabric, cut, and color choices once.",
  "Invite participants and attach each person's measurement profile.",
  "Submit the group when everyone is complete.",
];

export default function GroupOrderPage() {
  return (
    <div className="relative isolate min-h-[100dvh] bg-[#020611] overflow-x-clip pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={0} rotation={0} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="h-full w-full opacity-40">
          <Grainient
            color1="#1c5182"
            color2="#002757"
            color3="#04060c"
            timeSpeed={0.55}
            colorBalance={-0.2}
            warpStrength={4}
            warpFrequency={12}
            warpSpeed={0.3}
            warpAmplitude={80}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={1.25}
            grainAmount={0}
            grainScale={2}
            grainAnimated={false}
            contrast={1.05}
            gamma={1.3}
            saturation={1}
            centerX={0.25}
            centerY={-0.21}
            zoom={0.9}
          />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020611]/20 to-[#020611]/45" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#2f7ab8]/28 blur-3xl" />
        <div className="absolute -right-24 bottom-[-100px] h-[360px] w-[360px] rounded-full bg-[#031e45]/55 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col px-6 py-12 sm:px-10">
        <div className="inline-flex w-fit rounded-2xl border border-white/25 bg-[#0a1936]/45 p-1.5 shadow-[0_12px_28px_-20px_rgba(0,0,0,0.85)] backdrop-blur">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)] transition hover:bg-white/10"
          >
            <span aria-hidden>←</span>
            <span>Back to home</span>
          </Link>
        </div>

        <section className="glass-card mt-8 rounded-3xl border border-white/15 p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Coming soon</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-foreground">Group order flow</h1>
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
    </div>
  );
}
