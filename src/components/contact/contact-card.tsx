"use client";

import type { ReactNode } from "react";

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
};

export function ContactCard({
  icon,
  title,
  value,
  href,
  external,
}: ContactCardProps) {
  const content = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--salon-beige)] text-[var(--heading)]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
          {title}
        </span>
        <span className="mt-1 block text-sm text-[var(--heading)]">{value}</span>
      </span>
    </>
  );

  const className =
    "flex items-center gap-4 rounded-[1.25rem] border border-[rgba(26,22,20,0.06)] bg-white p-5 shadow-[0_10px_30px_rgba(26,22,20,0.04)] transition-transform duration-500 hover:-translate-y-0.5";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {content}
    </a>
  );
}
