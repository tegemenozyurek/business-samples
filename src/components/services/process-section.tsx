"use client";

import { servicesProcess } from "@/lib/services-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function ProcessSection() {
  return (
    <section className="bg-[var(--background)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Süreç
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Randevudan son dokunuşa kadar.
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {servicesProcess.map((item, index) => (
            <FadeUp key={item.step} delay={index * 0.07}>
              <article className="relative h-full rounded-[1.5rem] border border-[rgba(26,22,20,0.06)] bg-white p-7 shadow-[0_12px_40px_rgba(26,22,20,0.04)]">
                <p className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--accent)]">
                  {item.step}
                </p>
                <h3 className="mt-5 font-[family-name:var(--font-cormorant)] text-2xl text-[var(--heading)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
                {index < servicesProcess.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-10 -right-3 hidden h-px w-6 bg-[rgba(26,22,20,0.12)] lg:block"
                  />
                ) : null}
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
