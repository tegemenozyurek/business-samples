"use client";

import { FormEvent, useEffect, useState, type ChangeEvent } from "react";
import { useLanguage } from "@/lib/language";
import { contactCopy } from "@/lib/translations";
import { submitContactForm } from "@/lib/submitContactForm";

const PHONE_DIGIT_LIMIT = 10;

function extractPhoneDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, PHONE_DIGIT_LIMIT);
}

function formatPhoneNumber(digits: string) {
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 8);
  const part4 = digits.slice(8, 10);

  if (digits.length <= 3) {
    return part1;
  }

  if (digits.length <= 6) {
    return `${part1} ${part2}`;
  }

  if (digits.length <= 8) {
    return `${part1} ${part2} ${part3}`;
  }

  return `${part1} ${part2} ${part3} ${part4}`;
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const inputClassName =
  "w-full rounded-xl border border-[var(--icon-border)] bg-[var(--icon-bg)] px-4 py-3.5 text-sm text-heading placeholder:text-faint transition-all duration-300 outline-none hover:border-[var(--icon-hover-border)] focus:border-[var(--icon-hover-border)] focus:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-60";

const labelClassName =
  "mb-2 block text-[11px] font-medium tracking-[0.14em] text-subtle uppercase";

export function ContactForm() {
  const { lang } = useLanguage();
  const form = contactCopy[lang].form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentView, setContentView] = useState<"form" | "success">("form");
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (contentView !== "success") {
      return;
    }

    const enterFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const fadeOutTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    const switchTimer = window.setTimeout(() => {
      setContentView("form");
      setPhone("");
      setIsVisible(false);

      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 3700);

    return () => {
      cancelAnimationFrame(enterFrame);
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(switchTimer);
    };
  }, [contentView]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    try {
      await submitContactForm({
        name: String(formData.get("name") ?? ""),
        company: String(formData.get("company") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone,
        service: String(formData.get("service") ?? ""),
        message: String(formData.get("message") ?? ""),
      });

      setPhone("");
      formElement.reset();
      setIsVisible(false);

      window.setTimeout(() => {
        setContentView("success");
      }, 500);
    } catch {
      setError(form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = extractPhoneDigits(event.target.value);
    setPhone(formatPhoneNumber(digits));
  };

  const transitionClassName = `transition-all duration-500 ease-out ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
  }`;

  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-7 sm:p-9 lg:p-10">
      <div className="relative min-h-[420px]">
        {contentView === "success" ? (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center ${transitionClassName}`}
            role="status"
            aria-live="polite"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-surface-soft">
              <svg
                className="h-6 w-6 text-heading"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M5 12.5 10 17.5 19 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-heading">{form.successTitle}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-subtle">
              {form.successText}
            </p>
          </div>
        ) : (
          <div className={transitionClassName}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClassName}>
                    {form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    autoComplete="name"
                    placeholder={form.namePlaceholder}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="company" className={labelClassName}>
                    {form.company}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    disabled={isSubmitting}
                    autoComplete="organization"
                    placeholder={form.companyPlaceholder}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClassName}>
                    {form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    placeholder={form.emailPlaceholder}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClassName}>
                    {form.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    value={phone ?? ""}
                    onChange={handlePhoneChange}
                    placeholder={form.phonePlaceholder}
                    maxLength={13}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className={labelClassName}>
                  {form.service}
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    required
                    disabled={isSubmitting}
                    defaultValue=""
                    className={`${inputClassName} appearance-none pr-10`}
                  >
                    <option value="" disabled>
                      {form.servicePlaceholder}
                    </option>
                    {form.services.map((option) => (
                      <option key={option} value={option} className="bg-surface text-heading">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-subtle" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClassName}>
                  {form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={isSubmitting}
                  rows={5}
                  placeholder={form.messagePlaceholder}
                  className={`${inputClassName} resize-none`}
                />
              </div>

              {error && (
                <p className="text-center text-xs text-red-400/90" role="alert">
                  {error}
                </p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full border border-heading bg-background px-8 py-3.5 text-sm font-medium tracking-wide text-heading transition-all duration-300 hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? form.submitting : form.submit}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-xs leading-relaxed text-faint">
              {form.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
