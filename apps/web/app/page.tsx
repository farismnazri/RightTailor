"use client";

import Link from "next/link";
import { useState } from "react";
import Grainient from "@/components/Grainient";
import Silk from "@/components/Silk";

type UseCase = "corporate" | "wedding" | "quick_dress";

type UseCaseDetail = {
  label: string;
  panelTitle: string;
  panelBody: string;
  points: string[];
};

const useCaseOptions: Array<{ id: UseCase; label: string }> = [
  { id: "corporate", label: "Corporate" },
  { id: "wedding", label: "Wedding" },
  { id: "quick_dress", label: "Quick Dress" },
];

const useCaseDetails: Record<UseCase, UseCaseDetail> = {
  corporate: {
    label: "Corporate",
    panelTitle: "Standardize your batch order, not your fit",
    panelBody:
      "Collect each participant's measurements while keeping fabric, cut, and color consistent for the full team.",
    points: [
      "Team members attach their own profile measurements.",
      "Shared spec stays aligned across the group.",
      "Order status stays visible from collection to delivery.",
    ],
  },
  wedding: {
    label: "Wedding",
    panelTitle: "Coordinate wedding looks with less back-and-forth",
    panelBody:
      "Set one shared style for the wedding party while each member keeps an individual fit profile.",
    points: [
      "Create one wedding group and invite everyone.",
      "Lock fabric, cut, and color for a consistent theme.",
      "Track who has completed measurements before submit.",
    ],
  },
  quick_dress: {
    label: "Quick Dress",
    panelTitle: "Handle urgent dress orders without remeasuring",
    panelBody:
      "Use an existing measurement profile and move straight into order details when timelines are tight.",
    points: [
      "Choose a saved profile and garment style.",
      "Attach the active measurement set instantly.",
      "Use size guidance from curated charts when needed.",
    ],
  },
};

const howItWorks = [
  {
    title: "Store profiles once",
    description:
      "Keep separate measurement profiles for yourself, children, or anyone you manage.",
  },
  {
    title: "Delegate your tailor",
    description:
      "Let a tailor enter measurements on your behalf through a dedicated guided flow.",
  },
  {
    title: "Order anything later",
    description:
      "Use stored measurements for suits, wedding outfits, dresses, and future custom pieces.",
  },
];

const groupCards = [
  {
    id: "corporate" as const,
    title: "Corporate batch",
    description:
      "One brief for uniforms or event wear with consistent style and individualized fit.",
  },
  {
    id: "wedding" as const,
    title: "Wedding party",
    description:
      "Coordinate the full party around one fabric, one cut, and one color direction.",
  },
  {
    id: "quick_dress" as const,
    title: "Quick dress line",
    description:
      "Repeat a proven style quickly with existing profiles and minimal friction.",
  },
];

export default function Home() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>("corporate");
  const activeUseCase = useCaseDetails[selectedUseCase];

  return (
    <div className="relative isolate min-h-screen overflow-x-clip pb-16">
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

      <main className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-8 pt-8 sm:px-10 lg:px-12">
        <nav className="animate-rise flex items-center justify-between">
          <p className="font-display text-xl font-semibold tracking-tight">RightTailor</p>
          <div className="hidden gap-6 text-sm font-medium text-muted md:flex">
            <a className="transition-colors hover:text-accent" href="#how-it-works">
              How it works
            </a>
            <a className="transition-colors hover:text-accent" href="#group-orders">
              Group orders
            </a>
            <a className="transition-colors hover:text-accent" href="#size-matching">
              Size matching
            </a>
          </div>
        </nav>

        <section className="glass-card mt-10 grid gap-8 rounded-3xl border border-black/5 px-6 py-8 shadow-sm sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <div className="animate-rise-delay-1 space-y-6">
            <span className="inline-flex rounded-full bg-accent-soft px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Measurement-first tailoring
            </span>
            <h1 className="font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Store measurements once, order anything later.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Build reusable profiles, let a trusted tailor enter measurements, and place solo or group orders without
              repeating the setup each time.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/get-measured"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b6a6e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Get measured
              </Link>
              <Link
                href="/group-order"
                className="rounded-full border border-accent/30 bg-white px-6 py-3 text-sm font-semibold text-accent transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Create a group order
              </Link>
            </div>
          </div>

          <aside className="animate-rise-delay-2 rounded-2xl border border-accent/20 bg-white/80 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Select use case</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {useCaseOptions.map((option) => {
                const isActive = selectedUseCase === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedUseCase(option.id)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-accent bg-accent text-white"
                        : "border-black/10 bg-white text-muted hover:border-accent/35 hover:text-accent"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 rounded-xl bg-accent-soft/70 p-4">
              <p className="font-display text-lg font-semibold text-foreground">{activeUseCase.panelTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{activeUseCase.panelBody}</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {activeUseCase.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-warm" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section id="how-it-works" className="animate-rise-delay-2 mt-14">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-3 max-w-3xl text-muted">
            A practical flow for self profiles, children profiles, and tailor delegation before ordering suits, wedding
            outfits, or dresses.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <article
                key={step.title}
                className="group rounded-2xl border border-black/7 bg-white/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-white"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-warm-soft text-sm font-semibold text-warm">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="group-orders" className="mt-14">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Group orders without group confusion</h2>
          <p className="mt-3 max-w-3xl text-muted">
            For wedding parties and corporate batches, define one shared fabric, cut, and color while each participant
            keeps individual measurements.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {groupCards.map((card) => {
              const isHighlighted = card.id === selectedUseCase;
              return (
                <article
                  key={card.id}
                  className={`rounded-2xl border p-5 transition duration-300 ${
                    isHighlighted
                      ? "border-accent bg-accent-soft/65 shadow-sm"
                      : "border-black/7 bg-white/80 hover:border-accent/30 hover:bg-white"
                  }`}
                >
                  <h3 className="font-display text-xl font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
                  {isHighlighted ? (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Active scenario</p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section id="size-matching" className="mt-14">
          <div className="rounded-3xl border border-black/8 bg-[#fff9f0] p-6 sm:p-8">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Size matching that starts from your profile</h2>
            <p className="mt-3 max-w-3xl text-muted">
              We will map profile measurements to curated brand charts and suggest S, M, L, or numeric sizes. No
              scraping, no guessing, and no feature build in this slice yet.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-black/8 bg-white p-4">
                <p className="text-sm font-semibold text-foreground">1. Pick chart</p>
                <p className="mt-1 text-sm text-muted">Choose a curated chart by brand, region, and garment type.</p>
              </div>
              <div className="rounded-xl border border-black/8 bg-white p-4">
                <p className="text-sm font-semibold text-foreground">2. Compare ranges</p>
                <p className="mt-1 text-sm text-muted">Measurement ranges are compared to your active profile set.</p>
              </div>
              <div className="rounded-xl border border-black/8 bg-white p-4">
                <p className="text-sm font-semibold text-foreground">3. Recommend size</p>
                <p className="mt-1 text-sm text-muted">Show the closest size label with confidence notes.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="trust-banner rounded-2xl border border-accent/25 bg-accent px-6 py-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">Privacy promise</p>
            <p className="mt-2 font-display text-2xl leading-tight">Admin and support cannot view measurement values.</p>
            <p className="mt-2 max-w-3xl text-sm text-white/85">
              Backend enforcement is planned with strict row-level policies so sensitive measurement payloads stay out
              of operator tooling.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
