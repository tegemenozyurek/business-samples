"use client";

import Image from "next/image";
import { ChessPawn, Cpu, Paintbrush, type LucideIcon } from "lucide-react";
import { HeroGridPattern } from "@/components/home/HeroGridPattern";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { aboutCopy } from "@/lib/about-content";
import { useLanguage } from "@/lib/language";

const principleIcons: LucideIcon[] = [Paintbrush, ChessPawn, Cpu];

export function AboutPage() {
  const { lang } = useLanguage();
  const { hero, story, vision, mission, principles } = aboutCopy[lang];

  return (
    <main className="min-h-screen flex-1 overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--orb),transparent_34%),radial-gradient(circle_at_80%_20%,var(--orb),transparent_28%)]" />
        <HeroGridPattern />
        <div className="absolute top-0 left-1/2 -z-10 h-px w-screen -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--hairline)] to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <ScrollReveal className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-7xl lg:leading-[1.05]">
                {hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted sm:text-base lg:text-[17px]">
                {hero.description}
              </p>
            </ScrollReveal>

            <div className="contact-fade-up contact-fade-up-delay flex justify-center lg:justify-end">
              <Image
                src="/images/logoLongDarkTheme.webp"
                alt="Qeva Digital"
                width={560}
                height={373}
                priority
                unoptimized
                className="h-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[480px] theme-light:brightness-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative border-t border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,var(--orb),transparent_40%),radial-gradient(circle_at_0%_100%,var(--orb),transparent_36%)]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="text-[1.75rem] font-semibold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                  {story.title}
                </h2>
              </div>
            </ScrollReveal>

            <div className="group/story min-w-0 -mt-1 divide-y divide-border sm:-mt-2 lg:mt-0">
              {story.paragraphs.map((paragraph, index) => (
                <ScrollReveal key={paragraph} delay={index * 80}>
                  <p
                    className={`origin-left max-w-2xl cursor-default text-sm leading-[1.9] text-muted transition-[color,opacity,transform] duration-300 ease-out group-hover/story:opacity-45 hover:scale-[1.03] hover:text-heading hover:opacity-100 sm:text-[15px] lg:text-base ${
                      index === 0
                        ? "pb-5 pt-0 sm:pb-6"
                        : "py-5 sm:py-6"
                    }`}
                  >
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative border-t border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--orb),transparent_45%)]" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <ScrollReveal>
              <article className="group flex h-full flex-col py-2 lg:pr-14 xl:pr-20">
                <h3 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem]">
                  {vision.title}
                </h3>
                <p className="mt-6 max-w-md text-sm leading-[1.85] text-muted transition-colors duration-500 group-hover:text-foreground sm:text-[15px] lg:mt-8 lg:text-base">
                  {vision.text}
                </p>
              </article>
            </ScrollReveal>

            <div
              aria-hidden="true"
              className="my-12 h-px w-full bg-gradient-to-r from-transparent via-[var(--hairline)] to-transparent lg:mx-0 lg:my-0 lg:h-auto lg:w-px lg:bg-gradient-to-b"
            />

            <ScrollReveal delay={140}>
              <article className="group flex h-full flex-col py-2 lg:pl-14 xl:pl-20">
                <h3 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem]">
                  {mission.title}
                </h3>
                <p className="mt-6 max-w-md text-sm leading-[1.85] text-muted transition-colors duration-500 group-hover:text-foreground sm:text-[15px] lg:mt-8 lg:text-base">
                  {mission.text}
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,var(--orb),transparent_42%),radial-gradient(circle_at_90%_80%,var(--orb),transparent_40%)]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
          <ScrollReveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem]">
              {principles.label}
            </h2>
          </ScrollReveal>

          <div className="group/principles mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:mt-20 md:grid-cols-3 lg:gap-6">
            {principles.items.map((item, index) => {
              const Icon = principleIcons[index];

              return (
                <ScrollReveal
                  key={item.title}
                  delay={index * 100}
                  className="h-full"
                >
                  <article className="group/item relative flex h-full origin-center cursor-default flex-col overflow-hidden rounded-[1.5rem] border border-border bg-surface px-6 py-7 transition-[transform,opacity,border-color,background-color,box-shadow] duration-300 ease-out group-hover/principles:opacity-40 hover:!opacity-100 hover:scale-[1.03] hover:border-border-strong hover:bg-surface-hover hover:shadow-[0_24px_60px_var(--nav-shadow)] sm:px-7 sm:py-8 lg:px-8 lg:py-9">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hairline)] to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100"
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--orb)] opacity-0 blur-3xl transition-opacity duration-500 group-hover/item:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="relative flex items-center gap-3 sm:gap-3.5">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted transition-all duration-300 group-hover/item:border-[var(--icon-hover-border)] group-hover/item:bg-[var(--icon-hover-bg)] group-hover/item:text-heading sm:h-8 sm:w-8 sm:rounded-lg"
                        aria-hidden="true"
                      >
                        <Icon
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="min-w-0 text-[1.35rem] font-medium tracking-tight text-heading sm:text-[1.5rem]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="relative mt-5 flex-1 text-sm leading-[1.85] text-muted transition-colors duration-300 group-hover/item:text-foreground sm:mt-6 sm:text-[15px]">
                      {item.text}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
