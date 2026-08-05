"use client";

import Link from "next/link";
import {
  Compass,
  Paintbrush,
  Rocket,
  Route,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { HeroGridPattern } from "@/components/home/HeroGridPattern";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ServicesHeroConstellation } from "@/components/services/ServicesHeroConstellation";
import { useLanguage } from "@/lib/language";
import { servicesCopy } from "@/lib/translations";

const serviceMeta = {
  content: { number: "01", category: "CONTENT" },
  web: { number: "02", category: "WEB" },
  social: { number: "03", category: "SOCIAL" },
  ads: { number: "04", category: "ADS" },
} as const;

const processIcons: LucideIcon[] = [
  Compass,
  Route,
  Paintbrush,
  Rocket,
  TrendingUp,
];

export function ServicesPage() {
  const { lang } = useLanguage();
  const copy = servicesCopy[lang];

  return (
    <main className="min-h-screen flex-1 overflow-hidden pt-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--orb),transparent_34%),radial-gradient(circle_at_80%_10%,var(--orb),transparent_28%)]" />
        <HeroGridPattern />
        <div className="absolute top-0 left-1/2 -z-10 h-px w-screen -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--hairline)] to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-[5.5rem]">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <ScrollReveal className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-7xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base lg:text-[17px]">
                {copy.heroDescription}
              </p>
            </ScrollReveal>

            <div className="contact-fade-up contact-fade-up-delay">
              <ServicesHeroConstellation />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.05),transparent_42%)] theme-light:bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.05),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(0,0,0,0.04),transparent_42%)]" />
          <div className="absolute top-[12%] left-[8%] h-40 w-40 rounded-full bg-white/[0.06] blur-3xl theme-light:bg-black/[0.04]" />
          <div className="absolute right-[10%] bottom-[8%] h-52 w-52 rounded-full bg-white/[0.05] blur-3xl theme-light:bg-black/[0.035]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {copy.services.map((service, index) => {
              const meta = serviceMeta[service.key];

              return (
                <ScrollReveal
                  key={service.key}
                  delay={index * 90}
                  className="h-full"
                >
                  <article className="service-glass-card group/item relative flex h-full origin-center cursor-default flex-col rounded-[1.5rem] px-6 py-7 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:scale-[1.015] sm:rounded-[1.65rem] sm:px-8 sm:py-8 lg:px-9 lg:py-9">
                    <div className="relative flex items-center gap-3">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-heading/75">
                        {meta.number}
                      </span>
                      <span
                        className="h-px w-5 bg-[var(--hairline)]"
                        aria-hidden="true"
                      />
                      <span className="text-[10px] font-medium tracking-[0.22em] text-subtle uppercase">
                        {meta.category}
                      </span>
                    </div>

                    <h2 className="relative mt-8 text-[1.35rem] font-medium tracking-tight text-heading sm:mt-9 sm:text-[1.55rem] sm:leading-snug">
                      {service.title}
                    </h2>

                    <p className="relative mt-4 flex-1 text-sm leading-[1.85] text-muted transition-colors duration-300 group-hover/item:text-foreground sm:mt-5 sm:text-[15px]">
                      {service.description}
                    </p>

                    <div className="relative mt-8 flex justify-center">
                      <Link
                        href="/iletisim"
                        className="inline-flex items-center justify-center rounded-full border border-heading bg-background px-5 py-2.5 text-sm font-medium tracking-wide text-heading transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-hover focus-visible:opacity-100 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/item:translate-y-0 [@media(hover:hover)]:group-hover/item:opacity-100"
                      >
                        {copy.quoteCta}
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,var(--orb),transparent_40%),radial-gradient(circle_at_90%_100%,var(--orb),transparent_38%)]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
          <ScrollReveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              {copy.processTitle}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
              {copy.processSubtitle}
            </p>
          </ScrollReveal>

          <div className="relative mt-14 sm:mt-16 lg:mt-20">
            <div
              aria-hidden="true"
              className="absolute top-5 bottom-5 left-[1.4rem] w-px bg-gradient-to-b from-[var(--hairline)] via-border to-transparent sm:left-[1.55rem] md:left-1/2 md:-translate-x-1/2"
            />

            <ol className="relative space-y-6 md:space-y-10 lg:space-y-12">
              {copy.processSteps.map((step, index) => {
                const isLeft = index % 2 === 0;
                const Icon = processIcons[index];

                return (
                  <li key={step.number}>
                    <ScrollReveal delay={index * 80}>
                      <div className="grid grid-cols-[2.8rem_1fr] items-center gap-4 sm:grid-cols-[3.1rem_1fr] md:grid-cols-[1fr_3.5rem_1fr] md:gap-6 lg:gap-8">
                        <div
                          className={`col-start-2 row-start-1 w-full md:w-auto ${
                            isLeft
                              ? "md:col-start-1 md:justify-self-end"
                              : "md:col-start-3 md:justify-self-start"
                          }`}
                        >
                          <article className="group relative flex w-full max-w-md flex-col overflow-hidden rounded-[1.35rem] border border-border bg-surface px-5 py-5 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:border-border-strong hover:bg-surface-hover hover:shadow-[0_20px_50px_var(--nav-shadow)] sm:rounded-[1.5rem] sm:px-7 sm:py-7 md:w-[22rem] md:max-w-none lg:w-[24rem] lg:px-8 lg:py-8">
                            <div
                              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hairline)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                            <div
                              className="pointer-events-none absolute -top-16 right-0 h-36 w-36 rounded-full bg-[var(--orb)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                              aria-hidden="true"
                            />

                            <div className="relative flex items-center gap-3 sm:gap-3.5">
                              <div
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted transition-all duration-300 group-hover:border-[var(--icon-hover-border)] group-hover:bg-[var(--icon-hover-bg)] group-hover:text-heading sm:h-8 sm:w-8 sm:rounded-lg"
                                aria-hidden="true"
                              >
                                <Icon
                                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                                  strokeWidth={1.5}
                                />
                              </div>
                              <h3 className="min-w-0 text-[1.25rem] font-medium tracking-tight text-heading sm:text-[1.45rem] lg:text-[1.55rem]">
                                {step.title}
                              </h3>
                            </div>

                            <p className="relative mt-3 text-sm leading-[1.8] text-muted transition-colors duration-300 group-hover:text-foreground sm:mt-4 sm:text-[15px]">
                              {step.text}
                            </p>
                          </article>
                        </div>

                        <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                          <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-background text-[11px] font-medium tracking-[0.14em] text-heading shadow-[0_0_0_6px_var(--background)] sm:h-10 sm:w-10 sm:text-xs">
                            {step.number}
                          </span>
                        </div>

                        <div
                          aria-hidden="true"
                          className={`hidden md:block ${
                            isLeft ? "md:col-start-3" : "md:col-start-1"
                          }`}
                        />
                      </div>
                    </ScrollReveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
