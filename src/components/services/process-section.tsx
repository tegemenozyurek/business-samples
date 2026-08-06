"use client";

import { servicesProcess } from "@/lib/services-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function ProcessSection() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:items-start">
        <FadeUp className="lg:sticky lg:top-28">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Süreç
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Randevudan son dokunuşa kadar.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Her adım sade ve net: randevudan uygulamaya, stüdyodan çıkışa kadar
            aynı özenle ilerler.
          </p>
        </FadeUp>

        <ol>
          {servicesProcess.map((item, index) => {
            const isLast = index === servicesProcess.length - 1;

            return (
              <FadeUp key={item.step} delay={index * 0.08}>
                <li className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7 sm:pb-12">
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-9 bottom-0 left-[1.15rem] w-px bg-[var(--border-strong)] sm:top-11 sm:left-[1.35rem]"
                    />
                  ) : null}

                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--surface)] text-[var(--accent)] sm:h-11 sm:w-11">
                    <span className="font-[family-name:var(--font-cormorant)] text-sm sm:text-base">
                      {item.step}
                    </span>
                  </div>

                  <div className="min-w-0 pt-1 sm:pt-1.5">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.02em] text-[var(--heading)] sm:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-[0.95rem]">
                      {item.description}
                    </p>
                  </div>
                </li>
              </FadeUp>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
