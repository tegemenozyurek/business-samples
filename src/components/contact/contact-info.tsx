"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactDetails } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";
import { ContactCard } from "./contact-card";

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

export function ContactInfo() {
  return (
    <div className="space-y-3">
      {[
        {
          title: "Telefon",
          value: contactDetails.phone,
          href: contactDetails.phoneHref,
          icon: <Phone className="h-5 w-5" strokeWidth={1.5} />,
        },
        {
          title: "WhatsApp",
          value: contactDetails.whatsapp,
          href: contactDetails.whatsappHref,
          external: true,
          icon: <MessageCircle className="h-5 w-5" strokeWidth={1.5} />,
        },
        {
          title: "Instagram",
          value: contactDetails.instagram,
          href: contactDetails.instagramHref,
          external: true,
          icon: <InstagramIcon className="h-5 w-5" />,
        },
        {
          title: "Email",
          value: contactDetails.email,
          href: contactDetails.emailHref,
          icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
        },
        {
          title: "Adres",
          value: contactDetails.addressFull,
          icon: <MapPin className="h-5 w-5" strokeWidth={1.5} />,
        },
        {
          title: "Çalışma Saatleri",
          value: "Pzt–Cum 10:00–20:00 · Cmt 10:00–19:00",
          icon: <Clock className="h-5 w-5" strokeWidth={1.5} />,
        },
      ].map((item, index) => (
        <FadeUp key={item.title} delay={index * 0.04}>
          <ContactCard
            icon={item.icon}
            title={item.title}
            value={item.value}
            href={item.href}
            external={item.external}
          />
        </FadeUp>
      ))}
    </div>
  );
}
