"use client";

import Link from "next/link";
import { ArtPattern } from "@/components/home/ArtPattern";
import { HeroBackground } from "@/components/home/HeroBackground";
import { HeroSphere } from "@/components/home/HeroSphere";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { homeCopy } from "@/lib/home-content";
import { useLanguage } from "@/lib/language";

const primaryButtonClassName =
  "inline-flex items-center justify-center rounded-full border border-heading bg-background px-8 py-3.5 text-sm font-medium tracking-wide text-heading transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-hover";

const secondaryButtonClassName =
  "inline-flex items-center justify-center rounded-full border border-border-strong bg-background px-8 py-3.5 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-heading";

export function HomePage() {
  const { lang } = useLanguage();
  const { hero, brandStatement, finalCta } = homeCopy[lang];

  return (
    <main className="min-h-screen flex-1 overflow-hidden">
      {/* 1. Hero */}
      <section className="relative flex min-h-[88svh] flex-col overflow-hidden pt-20">
        <HeroBackground />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-start px-6 pb-8 pt-4 sm:pb-10 sm:pt-6 lg:items-center lg:px-10 lg:pb-12 lg:pt-0 lg:-mt-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="contact-fade-up max-w-xl">
              <h1 className="text-3xl font-semibold leading-[1.12] tracking-tight text-heading sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1] xl:text-[3.15rem]">
                {hero.headline}
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-[15px] lg:text-base">
                {hero.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/iletisim" className={primaryButtonClassName}>
                  {hero.primaryCta}
                </Link>
                <Link href="/hakkimizda" className={secondaryButtonClassName}>
                  {hero.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="contact-fade-up contact-fade-up-delay lg:justify-self-end">
              <HeroSphere />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Statement */}
      <section className="relative isolate overflow-hidden border-t border-border">
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,var(--surface-soft),transparent_35%,transparent_70%,var(--surface-soft))]"
          aria-hidden="true"
        />
        <ArtPattern className="-z-10" />

        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-center px-6 py-28 lg:min-h-[78svh] lg:px-10 lg:py-36">
          <ScrollReveal className="max-w-4xl">
            <p className="text-[11px] font-medium tracking-[0.28em] text-subtle uppercase">
              QEVA
            </p>
            <h2 className="mt-8 text-[clamp(2.4rem,7vw,5.75rem)] font-semibold leading-[1.02] tracking-tight text-heading">
              {brandStatement.headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160} className="mt-10 max-w-xl lg:mt-14">
            <p className="border-l border-[var(--hairline)] pl-5 text-sm leading-[1.9] text-muted sm:pl-6 sm:text-[15px] lg:text-base">
              {brandStatement.text}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Final CTA */}
      <section className="relative border-t border-border bg-surface">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,var(--orb),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <ScrollReveal className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {finalCta.headline}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-[1.85] text-muted sm:text-[15px]">
                {finalCta.text}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={120} className="shrink-0">
              <Link
                href="/iletisim"
                className={`${primaryButtonClassName} min-w-[180px] px-10 py-4`}
              >
                {finalCta.button}
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
