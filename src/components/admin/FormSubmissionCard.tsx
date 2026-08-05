"use client";

import { Check, Copy, Mail, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type FormSubmission = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: string | null;
};

type FormSubmissionCardProps = {
  form: FormSubmission;
  onDelete: (id: string) => Promise<void>;
};

const roundButtonClassName =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300";

const mailButtonClassName = `${roundButtonClassName} border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted hover:border-[var(--icon-hover-border)] hover:bg-[var(--icon-hover-bg)] hover:text-heading disabled:cursor-not-allowed disabled:opacity-60`;

const deleteButtonClassName = `${roundButtonClassName} border-red-500/20 bg-red-500/10 text-red-500/80 hover:border-red-500/30 hover:bg-red-500/15 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60`;

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function buildReplyMailto(email: string) {
  return `mailto:${email.trim()}`;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-faint transition-colors hover:text-muted"
      aria-label={`${label} kopyala`}
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-500" strokeWidth={1.5} />
      ) : (
        <Copy className="h-3 w-3" strokeWidth={1.5} />
      )}
    </button>
  );
}

function DetailRow({
  label,
  value,
  copyLabel,
}: {
  label: string;
  value: string;
  copyLabel: string;
}) {
  const trimmed = value.trim();

  return (
    <div className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-start gap-x-2 gap-y-1 py-1.5">
      <span className="pt-0.5 text-[10px] leading-none tracking-[0.12em] text-faint uppercase">
        {label}
      </span>
      <span className="min-w-0 break-words text-xs leading-relaxed text-foreground [overflow-wrap:anywhere]">
        {trimmed || "—"}
      </span>
      <div className="pt-0.5">
        {trimmed ? <CopyButton value={trimmed} label={copyLabel} /> : null}
      </div>
    </div>
  );
}

function ExpandableMessage({ message }: { message: string }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    const checkOverflow = () => {
      if (expanded) {
        setCanExpand(true);
        return;
      }

      setCanExpand(element.scrollHeight > element.clientHeight + 1);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [message, expanded]);

  return (
    <div className="min-w-0">
      <p className="mb-1 text-[10px] tracking-[0.12em] text-faint uppercase">
        Mesaj
      </p>

      <div
        role={canExpand ? "button" : undefined}
        tabIndex={canExpand ? 0 : undefined}
        onClick={() => {
          if (canExpand) {
            setExpanded((current) => !current);
          }
        }}
        onKeyDown={(event) => {
          if (!canExpand) {
            return;
          }

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setExpanded((current) => !current);
          }
        }}
        className={`relative min-w-0 rounded-lg border border-border bg-surface-soft px-3 py-2.5 transition-all duration-300 ${
          canExpand
            ? "cursor-pointer hover:border-border-strong hover:bg-surface-hover"
            : ""
        } ${expanded ? "max-h-none" : "max-h-[4.5rem] overflow-hidden"}`}
      >
        <p
          ref={contentRef}
          className={`break-words whitespace-pre-wrap text-xs leading-relaxed text-muted [overflow-wrap:anywhere] ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {message}
        </p>

        {canExpand && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
    </div>
  );
}

export function FormSubmissionCard({ form, onDelete }: FormSubmissionCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const recipientEmail = form.email.trim();

  const handleDelete = async () => {
    if (!window.confirm("Bu formu silmek istediğinize emin misiniz?")) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDelete(form.id);
    } catch {
      setIsDeleting(false);
    }
  };

  const handleReply = () => {
    if (!recipientEmail) {
      return;
    }

    window.location.href = buildReplyMailto(recipientEmail);
  };

  return (
    <article className="flex h-full min-w-0 w-full flex-col rounded-xl border border-border bg-surface-soft px-4 py-3.5 transition-colors hover:border-border-strong">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-sm font-medium text-heading [overflow-wrap:anywhere]">
            {form.name}
          </h2>
          <p className="mt-0.5 break-words text-xs text-subtle [overflow-wrap:anywhere]">
            {form.serviceType}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 self-start">
          <time className="text-[11px] text-faint">
            {formatDate(form.createdAt)}
          </time>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              className={deleteButtonClassName}
              aria-label="Formu sil"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleReply}
              disabled={!recipientEmail}
              className={mailButtonClassName}
              aria-label={`${recipientEmail || "E-posta"} adresine cevapla`}
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 min-w-0 border-t border-border pt-2">
        <DetailRow label="E-posta" value={form.email} copyLabel="E-posta" />
        <DetailRow label="Telefon" value={form.phone} copyLabel="Telefon" />
        <DetailRow label="Şirket" value={form.company} copyLabel="Şirket" />
      </div>

      <div className="mt-2.5 min-w-0 flex-1 border-t border-border pt-2.5">
        <ExpandableMessage message={form.message} />
      </div>
    </article>
  );
}
