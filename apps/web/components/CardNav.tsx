"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthNavControl from "@/components/AuthNavControl";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

type CardNavProps = {
  items: CardNavItem[];
  logoSrc: string;
  logoAlt?: string;
  ctaHref: string;
  ctaLabel?: string;
  className?: string;
};

const Hamburger = ({ open }: { open: boolean }) => (
  <div className="flex h-10 w-10 items-center justify-center">
    <span
      className={`absolute h-0.5 w-6 rounded-full bg-white transition-transform duration-300 ${
        open ? "rotate-45" : "-translate-y-1.5"
      }`}
    />
    <span
      className={`absolute h-0.5 w-6 rounded-full bg-white transition-transform duration-300 ${
        open ? "-rotate-45" : "translate-y-1.5"
      }`}
    />
  </div>
);

export default function CardNav({
  items,
  logoSrc,
  logoAlt = "RightTailor logo",
  ctaHref,
  ctaLabel = "Get started",
  className = "",
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={`relative z-[120] w-full ${className}`.trim()}>
      <div className="rounded-2xl border border-white/18 bg-[#060717]/82 p-2 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl">
        <div className="relative flex h-[60px] items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/[0.06] transition hover:bg-white/[0.12]"
          >
            <Hamburger open={isOpen} />
          </button>

          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-label="RightTailor home">
            <Image src={logoSrc} alt={logoAlt} width={260} height={52} priority className="h-8 w-auto object-contain" />
          </Link>

          <div className="relative z-10 flex items-center gap-2">
            <AuthNavControl />
            <Link
              href={ctaHref}
              className="inline-flex h-12 shrink-0 items-center rounded-xl border border-white/32 bg-white/[0.08] px-4 text-xs font-semibold uppercase tracking-[0.11em] !text-white transition hover:bg-white/[0.18]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ${
            isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="grid gap-3 md:grid-cols-3">
              {items.slice(0, 3).map((item) => (
                <section
                  key={item.label}
                  className="flex min-h-[152px] flex-col rounded-xl border border-white/10 p-4"
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <h3 className="font-display text-2xl tracking-tight">{item.label}</h3>
                  <div className="mt-4 space-y-2">
                    {item.links.map((link) => (
                      <a
                        key={`${item.label}-${link.label}`}
                        href={link.href}
                        aria-label={link.ariaLabel}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-2 text-sm opacity-90 transition hover:opacity-100"
                      >
                        <span aria-hidden>↗</span>
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
