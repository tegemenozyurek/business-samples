"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  contactDetails,
  contactHeroImage,
  getDirectionsUrl,
} from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  hint: string;
};

export function ContactInfo() {
  const [mapsHref, setMapsHref] = useState(contactDetails.directionsGoogleUrl);

  useEffect(() => {
    setMapsHref(getDirectionsUrl());
  }, []);

  const items: ContactLink[] = [
    {
      label: "Telefon",
      value: contactDetails.phone,
      href: contactDetails.phoneHref,
      hint: "Hemen ara",
    },
    {
      label: "WhatsApp",
      value: contactDetails.phone,
      href: contactDetails.whatsappHref,
      external: true,
      hint: "Mesaj yaz",
    },
    {
      label: "Instagram",
      value: contactDetails.instagram,
      href: contactDetails.instagramHref,
      external: true,
      hint: "Profili aç",
    },
    {
      label: "Adres",
      value: contactDetails.addressFull,
      href: mapsHref,
      external: true,
      hint: "Yol tarifi",
    },
  ];

  return (
    <section className="bg-[var(--background)] px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:items-stretch">
        <FadeUp className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] lg:min-h-full">
          <Image
            src={contactHeroImage}
            alt="Qeva Nail Studio stüdyo atmosferi"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,22,20,0.72)] via-[rgba(26,22,20,0.18)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
            <p className="text-[11px] font-medium tracking-[0.22em] text-white/65 uppercase">
              Stüdyo
            </p>
            <p className="mt-2 font-[family-name:var(--font-cormorant)] text-3xl leading-tight tracking-[-0.02em] text-white">
              Nişantaşı
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
              {contactDetails.addressFull}
            </p>
          </div>
        </FadeUp>

        <div>
          <FadeUp>
            <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
              Ulaşın
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)]">
              Bir dokunuş yeter.
            </h2>
          </FadeUp>

          <ul className="mt-8">
            {items.map((item, index) => (
              <li key={item.label}>
                <FadeUp delay={index * 0.06}>
                  <ContactRow item={item} />
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ item }: { item: ContactLink }) {
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="group flex items-end justify-between gap-4 border-b border-[rgba(26,22,20,0.1)] py-6 first:border-t transition-colors"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-3">
          <span className="text-[11px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
            {item.label}
          </span>
          <span className="hidden text-[11px] tracking-[0.08em] text-[var(--muted)] sm:inline">
            {item.hint}
          </span>
        </span>
        <span className="mt-2 block font-[family-name:var(--font-cormorant)] text-[1.65rem] leading-none tracking-[-0.02em] text-[var(--heading)] transition-transform duration-500 group-hover:translate-x-1 sm:text-[2rem]">
          {item.value}
        </span>
      </span>
      <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(26,22,20,0.12)] text-[var(--heading)] transition-all duration-500 group-hover:border-[var(--heading)] group-hover:bg-[var(--heading)] group-hover:text-[var(--background)]">
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </a>
  );
}
