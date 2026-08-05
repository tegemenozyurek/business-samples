"use client";

import Link from "next/link";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { contactDetails } from "@/lib/contact-content";

export function ContactMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(26,22,20,0.08)] bg-[rgba(251,249,247,0.94)] p-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <a
          href={contactDetails.phoneHref}
          className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl border border-[rgba(26,22,20,0.08)] bg-white px-2 py-2.5 text-[10px] font-medium tracking-[0.08em] text-[var(--heading)] uppercase"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} />
          Ara
        </a>
        <a
          href={contactDetails.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl border border-[rgba(26,22,20,0.08)] bg-white px-2 py-2.5 text-[10px] font-medium tracking-[0.08em] text-[var(--heading)] uppercase"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          WhatsApp
        </a>
        <Link
          href="/rez/randevu"
          className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl bg-[var(--heading)] px-2 py-2.5 text-[10px] font-medium tracking-[0.08em] text-[#fbf9f7] uppercase"
        >
          <Calendar className="h-4 w-4" strokeWidth={1.5} />
          Randevu
        </Link>
      </div>
    </div>
  );
}
