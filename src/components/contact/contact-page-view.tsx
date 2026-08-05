"use client";

import { ContactCta } from "./contact-cta";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { ContactMobileBar } from "./contact-mobile-bar";
import { ContactFaq } from "./faq";
import { LocationMap } from "./location-map";
import { WorkingHours } from "./working-hours";
import { FadeUp } from "@/components/rez/FadeUp";

export function ContactPageView() {
  return (
    <main className="pb-24 md:pb-0">
      <ContactHero />

      <section className="bg-[var(--background)] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <FadeUp className="mb-6">
              <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
                Ulaşın
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)]">
                Hızlı iletişim.
              </h2>
            </FadeUp>
            <ContactInfo />
          </div>
          <ContactForm />
        </div>
      </section>

      <WorkingHours />
      <LocationMap />
      <ContactFaq />
      <ContactCta />
      <ContactMobileBar />
    </main>
  );
}
