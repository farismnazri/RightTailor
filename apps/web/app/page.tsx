"use client";

import Link from "next/link";
import { useState } from "react";
import CardNav, { type CardNavItem } from "@/components/CardNav";
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

const topNavItems: CardNavItem[] = [
  {
    label: "How it works",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Profiles flow", href: "#how-it-works", ariaLabel: "How it works profiles flow" },
      { label: "Tailor delegation", href: "#how-it-works", ariaLabel: "How it works tailor delegation" },
    ],
  },
  {
    label: "Group orders",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Wedding party", href: "#group-orders", ariaLabel: "Wedding party section" },
      { label: "Corporate batch", href: "#group-orders", ariaLabel: "Corporate batch section" },
    ],
  },
  {
    label: "Size matching",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Curated charts", href: "#size-matching", ariaLabel: "Curated size charts section" },
      { label: "Recommendation flow", href: "#size-matching", ariaLabel: "Recommendation section" },
    ],
  },
];

export default function Home() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>("corporate");
  const activeUseCase = useCaseDetails[selectedUseCase];

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

      <main className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-8 pt-8 sm:px-10 lg:px-12">
        <nav className="animate-rise relative z-[120]">
          <CardNav items={topNavItems} logoSrc="/righttailor-logo-white.webp" ctaHref="/get-measured" />
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
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold !text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b6a6e] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Book an appointment
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

        <section id="how-it-works" className="mt-12">
          <div className="rounded-[2.3rem] border border-white/35 bg-[#f1ede4] px-6 py-8 sm:px-9 sm:py-10">
            <h2 className="font-display text-4xl tracking-tight text-foreground sm:text-[3.35rem]">How it works</h2>
            <p className="mt-4 max-w-5xl text-[1.1rem] leading-relaxed text-muted sm:text-[1.6rem]">
              A practical flow for self profiles, children profiles, and tailor delegation before ordering suits, wedding
              outfits, or dresses.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {howItWorks.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                  <h3 className="font-display text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
                    {index + 1}
                  </h3>
                  <p className="mt-3 font-display text-[1.55rem] leading-tight tracking-tight text-foreground sm:text-[1.95rem]">
                    {step.title}
                  </p>
                  <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="group-orders" className="mt-10">
          <div className="rounded-[2.3rem] border border-white/35 bg-[#f1ede4] px-6 py-8 sm:px-9 sm:py-10">
            <h2 className="font-display text-4xl tracking-tight text-foreground sm:text-[3.35rem]">
              Group orders without group confusion
            </h2>
            <p className="mt-4 max-w-5xl text-[1.1rem] leading-relaxed text-muted sm:text-[1.6rem]">
              For wedding parties and corporate batches, define one shared fabric, cut, and color while each participant
              keeps individual measurements.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {groupCards.map((card, index) => (
                <article key={card.id} className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                  <p className="font-display text-[1.55rem] leading-tight tracking-tight text-foreground sm:text-[1.95rem]">
                    {index + 1}. {card.title}
                  </p>
                  <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="size-matching" className="mt-10">
          <div className="rounded-[2.3rem] border border-white/35 bg-[#f1ede4] px-6 py-8 sm:px-9 sm:py-10">
            <h2 className="font-display text-4xl tracking-tight text-foreground sm:text-[3.35rem]">
              Size matching that starts from your profile
            </h2>
            <p className="mt-4 max-w-5xl text-[1.1rem] leading-relaxed text-muted sm:text-[1.6rem]">
              We will map profile measurements to curated brand charts and suggest S, M, L, or numeric sizes. No scraping,
              no guessing, and no feature build in this slice yet.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <article className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                <p className="font-display text-[1.55rem] tracking-tight text-foreground sm:text-[1.95rem]">1. Pick chart</p>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">
                  Choose a curated chart by brand, region, and garment type.
                </p>
              </article>
              <article className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                <p className="font-display text-[1.55rem] tracking-tight text-foreground sm:text-[1.95rem]">
                  2. Compare ranges
                </p>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">
                  Measurement ranges are compared to your active profile set.
                </p>
              </article>
              <article className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                <p className="font-display text-[1.55rem] tracking-tight text-foreground sm:text-[1.95rem]">
                  3. Recommend size
                </p>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">
                  Show the closest size label with confidence notes.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-[2.3rem] border border-white/35 bg-[#f1ede4] px-6 py-8 sm:px-9 sm:py-10">
            <h2 className="font-display text-4xl tracking-tight text-foreground sm:text-[3.35rem]">Privacy promise</h2>
            <p className="mt-4 max-w-5xl text-[1.1rem] leading-relaxed text-muted sm:text-[1.6rem]">
              Admin and support cannot view measurement values. Backend enforcement is planned with strict row-level
              policies so sensitive measurement payloads stay out of operator tooling.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <article className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                <p className="font-display text-[1.55rem] tracking-tight text-foreground sm:text-[1.95rem]">
                  1. No operator visibility
                </p>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">
                  Admin and support tools are designed without measurement value access.
                </p>
              </article>
              <article className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                <p className="font-display text-[1.55rem] tracking-tight text-foreground sm:text-[1.95rem]">
                  2. RLS-first backend
                </p>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">
                  Row-level policies are the enforcement boundary for measurement privacy.
                </p>
              </article>
              <article className="rounded-3xl border border-black/8 bg-[#ececee] p-5 sm:p-6">
                <p className="font-display text-[1.55rem] tracking-tight text-foreground sm:text-[1.95rem]">
                  3. No value logging
                </p>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted sm:text-[1.35rem]">
                  Measurement payloads are excluded from logs and analytics events.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
