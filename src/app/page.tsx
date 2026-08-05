"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { landingCopy } from "@/lib/translations";

export default function LandingPage() {
  const { lang } = useLanguage();
  const copy = landingCopy[lang];

  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-6">
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        <Link
          href="/rez"
          className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-heading bg-heading px-8 py-3.5 text-sm font-medium tracking-[0.16em] text-background uppercase transition-opacity duration-300 hover:opacity-90"
        >
          {copy.rezervasyon}
        </Link>
        <Link
          href="/sip"
          className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-heading bg-transparent px-8 py-3.5 text-sm font-medium tracking-[0.16em] text-heading uppercase transition-colors duration-300 hover:bg-surface-hover"
        >
          {copy.siparis}
        </Link>
      </div>
    </main>
  );
}
