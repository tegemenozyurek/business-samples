import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

const instagramUrl = "https://www.instagram.com/qeva_digital/";
const email = "qevadigital@gmail.com";

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-4 px-6 py-5 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        <p className="text-center text-xs tracking-wide text-faint">
          {"©"} {year}{" "}
          <Link href="/" className="transition-colors hover:text-muted">
            Qeva Digital
          </Link>
        </p>

        <div className="flex shrink-0 items-center justify-end gap-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted transition-all duration-300 hover:border-[var(--icon-hover-border)] hover:bg-[var(--icon-hover-bg)] hover:text-heading"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${email}`}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted transition-all duration-300 hover:border-[var(--icon-hover-border)] hover:bg-[var(--icon-hover-bg)] hover:text-heading"
            aria-label={`Email: ${email}`}
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
