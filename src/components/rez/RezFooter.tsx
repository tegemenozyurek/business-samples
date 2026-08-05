"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import logoImage from "@/images/logoDarkTheme.webp";

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

const links = [
  { label: "Ana Sayfa", href: "/rez" },
  { label: "Hizmetler", href: "/rez/hizmetler" },
  { label: "Galeri", href: "/rez/gallery" },
  { label: "İletişim", href: "/rez/iletisim" },
  { label: "Randevu Al", href: "/rez/randevu" },
] as const;

export function RezFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(26,22,20,0.08)] bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Link href="/rez" className="inline-flex" aria-label="Qeva Nail Studio">
            <Image
              src={logoImage}
              alt="Qeva"
              width={140}
              height={94}
              className="h-12 w-auto brightness-0"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            Premium nail studio. Soft nude estetik, steril protokol, kişiye özel
            bakım.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-medium tracking-[0.2em] text-[var(--accent)] uppercase">
            Hızlı Bağlantılar
          </h3>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--heading)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-medium tracking-[0.2em] text-[var(--accent)] uppercase">
            İletişim
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
            <li>
              <a
                href="mailto:qevadigital@gmail.com"
                className="transition-colors hover:text-[var(--heading)]"
              >
                qevadigital@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/905000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--heading)]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/qeva_digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--heading)]"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-medium tracking-[0.2em] text-[var(--accent)] uppercase">
            Çalışma Saatleri
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li className="flex justify-between gap-4">
              <span>Pzt – Cum</span>
              <span>10:00 – 20:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Cumartesi</span>
              <span>10:00 – 19:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Pazar</span>
              <span>Kapalı</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(26,22,20,0.08)] px-6 py-5 text-center text-xs text-[var(--faint)] lg:px-10">
        © {year} Qeva Nail Studio. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
