"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import {
  contactDetails,
  getDirectionsUrl,
  workingHours,
} from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

type ContactLink = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
};

export function SipContactPage() {
  const [mapsHref, setMapsHref] = useState<string>(
    contactDetails.directionsGoogleUrl,
  );

  useEffect(() => {
    setMapsHref(getDirectionsUrl());
  }, []);

  const items: ContactLink[] = [
    {
      label: "Telefon",
      value: contactDetails.phone,
      href: contactDetails.phoneHref,
      icon: <Phone className="h-5 w-5" strokeWidth={1.5} />,
    },
    {
      label: "WhatsApp",
      value: contactDetails.whatsapp,
      href: contactDetails.whatsappHref,
      external: true,
      icon: <WhatsAppIcon className="h-5 w-5" />,
    },
    {
      label: "Instagram",
      value: contactDetails.instagram,
      href: contactDetails.instagramHref,
      external: true,
      icon: <InstagramIcon className="h-5 w-5" />,
    },
    {
      label: "Adres",
      value: contactDetails.addressFull,
      href: mapsHref,
      external: true,
      icon: <MapPin className="h-5 w-5" strokeWidth={1.5} />,
    },
  ];

  return (
    <main>
      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-6 pt-36 pb-10 sm:pt-40 sm:pb-12 lg:px-10 lg:pt-36">
          <FadeUp className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
              İletişim
            </p>
            <h1 className="sip-display mt-3 text-4xl tracking-[-0.03em] text-[var(--heading)] sm:text-5xl lg:text-6xl">
              Bize Ulaşın
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Sipariş, öneri veya soruların için buradayız. Hemen ara, yaz veya
              yol tarifi al.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={contactDetails.phoneHref} className="sip-btn-primary">
                Hemen Ara
              </a>
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="sip-btn-secondary"
              >
                WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="sip-section bg-[var(--sip-alt)]">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2 lg:gap-6">
          <FadeUp>
            <article className="flex h-full flex-col rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:rounded-[1.75rem] sm:p-8">
              <h2 className="sip-display text-3xl tracking-[-0.03em] text-[var(--heading)] sm:text-4xl">
                İletişim Bilgileri
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Bize en hızlı bu kanallardan ulaşabilirsin.
              </p>

              <ul className="mt-8 space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-label={item.label}
                      className="group flex items-center gap-4 rounded-[1.15rem] border border-[var(--border)] bg-[var(--background)] px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] sm:px-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]">
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                          {item.label}
                        </span>
                        <span className="mt-1 block truncate text-base leading-snug text-[var(--heading)] sm:text-lg">
                          {item.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--heading)]"
                        strokeWidth={1.5}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>

          <FadeUp delay={0.06}>
            <article className="flex h-full flex-col rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:rounded-[1.75rem] sm:p-8">
              <h2 className="sip-display text-3xl tracking-[-0.03em] text-[var(--heading)] sm:text-4xl">
                Çalışma Saatleri
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Mutfağımız bu saatlerde açık; gelmeden bir göz at.
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {workingHours.map((item) => {
                  const closed = item.hours === "Kapalı";
                  return (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-[1.15rem] border border-[var(--border)] bg-[var(--background)] px-4 py-4 sm:px-5"
                    >
                      <p className="sip-display text-xl tracking-[-0.01em] text-[var(--heading)] sm:text-2xl">
                        {item.label}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase ${
                          closed
                            ? "bg-[color-mix(in_srgb,var(--muted)_16%,transparent)] text-[var(--muted)]"
                            : "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]"
                        }`}
                      >
                        {item.hours}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="sip-btn-primary mt-8 w-full"
              >
                Yol Tarifi Al
              </a>
            </article>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
