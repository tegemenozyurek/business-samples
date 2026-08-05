"use client";

import { MessageCircle, Phone } from "lucide-react";
import { contactDetails } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function AppointmentCta() {
  return (
    <section className="bg-[var(--heading)] px-6 py-24 text-[#fbf9f7] lg:px-10 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Sorularınız mı var?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Randevu öncesi netleştirmek istediğiniz bir şey varsa hemen yazın
            veya arayın.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={contactDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-[12px] font-medium tracking-[0.16em] text-[var(--heading)] uppercase transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              WhatsApp
            </a>
            <a
              href={contactDetails.phoneHref}
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border border-white/25 px-8 py-3.5 text-[12px] font-medium tracking-[0.16em] text-white uppercase transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              Telefon Et
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
