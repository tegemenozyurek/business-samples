"use client";

import { MapPin } from "lucide-react";
import { contactDetails } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function LocationMap() {
  return (
    <section className="bg-[var(--background)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Konum
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Bizi ziyaret edin.
          </h2>
        </FadeUp>

        <FadeUp delay={0.08} className="mt-10">
          <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(26,22,20,0.06)] bg-white shadow-[0_16px_50px_rgba(26,22,20,0.06)]">
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
              <iframe
                title="Qeva Nail Studio konum haritası"
                src={contactDetails.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </FadeUp>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Adres",
              text: contactDetails.addressFull,
            },
            {
              title: "Otopark",
              text: contactDetails.parking,
            },
            {
              title: "Ulaşım",
              text: contactDetails.transit,
            },
          ].map((item, index) => (
            <FadeUp key={item.title} delay={0.1 + index * 0.05}>
              <article className="rounded-[1.25rem] border border-[rgba(26,22,20,0.06)] bg-white p-6 shadow-[0_10px_30px_rgba(26,22,20,0.04)]">
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase">
                    {item.title}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.text}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
