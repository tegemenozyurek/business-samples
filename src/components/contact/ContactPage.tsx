"use client";

import { ContactForm } from "@/components/ContactForm";
import { useLanguage } from "@/lib/language";
import { contactCopy } from "@/lib/translations";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15.5 13 19 14.5V18a2 2 0 0 1-2 2A14 14 0 0 1 4 6.5 2 2 0 0 1 6.5 4Z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

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

export function ContactPage() {
  const { lang } = useLanguage();
  const copy = contactCopy[lang];

  const contactItems = [
    {
      icon: MailIcon,
      label: copy.items.email,
      value: "qevadigital@gmail.com",
      href: "mailto:qevadigital@gmail.com",
    },
    {
      icon: PhoneIcon,
      label: copy.items.phone,
      value: "+90 553 973 35 98",
      href: "tel:+905539733598",
    },
    {
      icon: LocationIcon,
      label: copy.items.location,
      value: copy.items.locationValue,
    },
    {
      icon: InstagramIcon,
      label: copy.items.instagram,
      value: "@qeva_digital",
      href: "https://www.instagram.com/qeva_digital/",
    },
  ] as const;

  return (
    <main className="min-h-screen flex-1 pt-20">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <section className="contact-fade-up">
            <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-subtle uppercase">
              {copy.eyebrow}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
              {copy.description}
            </p>

            <ul className="mt-12 space-y-6">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted transition-all duration-300 group-hover:border-[var(--icon-hover-border)] group-hover:bg-[var(--icon-hover-bg)] group-hover:text-heading">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-medium tracking-[0.14em] text-faint uppercase">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm text-foreground transition-colors duration-300 group-hover:text-heading">
                        {item.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={item.label}>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex items-center gap-4"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="contact-fade-up contact-fade-up-delay">
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}
