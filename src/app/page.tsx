"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { landingCopy } from "@/lib/translations";

const choices = [
  {
    href: "/rez",
    labelKey: "rezervasyon" as const,
    accent: "#ef4444",
    delayClass: "",
    variant: "primary" as const,
  },
  {
    href: "/rez/admin",
    labelKey: "rezervasyon" as const,
    accent: "#f97316",
    delayClass: "landing-choice-delay-1",
    variant: "admin" as const,
  },
  {
    href: "/sip",
    labelKey: "siparis" as const,
    accent: "#3b82f6",
    delayClass: "landing-choice-delay-2",
    variant: "primary" as const,
  },
  {
    href: "/sip/admin",
    labelKey: "siparis" as const,
    accent: "#6366f1",
    delayClass: "landing-choice-delay-3",
    variant: "admin" as const,
  },
];

export default function LandingPage() {
  const { lang } = useLanguage();
  const copy = landingCopy[lang];

  return (
    <main className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--orb)_0%,transparent_68%)]" />
        <div className="landing-glow-a absolute top-[18%] left-[12%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.14),transparent_70%)] blur-2xl" />
        <div className="landing-glow-b absolute right-[10%] bottom-[20%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_70%)] blur-2xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-5">
        {choices.map((choice) => {
          if (choice.variant === "admin") {
            return (
              <Link
                key={choice.href}
                href={choice.href}
                className={`landing-choice ${choice.delayClass} group relative flex min-h-[52px] items-center justify-between gap-3 overflow-hidden rounded-2xl border border-dashed border-[var(--border-strong)] bg-transparent px-5 py-3.5 transition-all duration-400 ease-out hover:border-[var(--heading)] hover:bg-[color-mix(in_srgb,var(--surface)_55%,transparent)]`}
              >
                <span className="text-[0.95rem] font-medium tracking-[0.04em] text-[var(--muted)] capitalize transition-colors duration-300 group-hover:text-heading">
                  {copy[choice.labelKey]}
                </span>
                <span
                  className="rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase"
                  style={{ backgroundColor: choice.accent }}
                >
                  Admin
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={choice.href}
              href={choice.href}
              className={`landing-choice ${choice.delayClass} group relative flex min-h-[88px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-border bg-[var(--nav-bg)] px-7 py-6 shadow-[0_20px_60px_var(--nav-shadow)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-[var(--icon-hover-border)] hover:bg-surface-hover`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hairline)] to-transparent opacity-70"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: choice.accent }}
              />
              <span className="text-[1.25rem] font-medium tracking-[0.02em] text-heading capitalize">
                {copy[choice.labelKey]}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
