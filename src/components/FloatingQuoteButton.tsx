"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language";

const copy = {
  tr: "Teklif Al",
  en: "Get a Quote",
} as const;

export function FloatingQuoteButton() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const isHidden =
    pathname.startsWith("/admin") || pathname.startsWith("/iletisim");

  if (isHidden) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden items-center md:flex">
      <Link
        href="/iletisim"
        className="floating-quote-btn group pointer-events-auto relative flex items-center overflow-hidden rounded-l-2xl border border-r-0 border-[var(--icon-border)] bg-[var(--nav-bg)] px-3.5 py-7 shadow-[0_16px_48px_var(--nav-shadow)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ease-out hover:border-[var(--icon-hover-border)] hover:bg-surface-hover"
        aria-label={copy[lang]}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-[var(--hairline)] to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span
          className="text-[11px] font-medium tracking-[0.22em] text-heading uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          {copy[lang]}
        </span>
      </Link>
    </div>
  );
}
