"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { FadeUp } from "@/components/rez/FadeUp";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı."),
  phone: z
    .string()
    .trim()
    .min(10, "Geçerli bir telefon numarası girin.")
    .max(20, "Telefon numarası çok uzun."),
  email: z.string().trim().email("Geçerli bir e-posta girin."),
  subject: z.string().trim().min(2, "Konu en az 2 karakter olmalı."),
  message: z.string().trim().min(10, "Mesaj en az 10 karakter olmalı."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fieldClass =
  "w-full rounded-2xl border border-[rgba(26,22,20,0.1)] bg-[var(--salon-gray)] px-4 py-3.5 text-sm text-[var(--heading)] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)] focus:bg-white";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (_data: ContactFormValues) => {
    setStatus("idle");
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <FadeUp>
      <div className="rounded-[1.75rem] border border-[rgba(26,22,20,0.06)] bg-white p-6 shadow-[0_16px_50px_rgba(26,22,20,0.05)] sm:p-8">
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--heading)]">
          Mesaj Gönderin
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Formu doldurun, en kısa sürede size dönüş yapalım.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase">
              Ad Soyad
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className={fieldClass}
              placeholder="Adınız Soyadınız"
              {...register("name")}
            />
            {errors.name ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase">
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
                placeholder="05xx xxx xx xx"
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={fieldClass}
                placeholder="ornek@mail.com"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase">
              Konu
            </label>
            <input
              id="subject"
              type="text"
              className={fieldClass}
              placeholder="Randevu, hizmet bilgisi..."
              {...register("subject")}
            />
            {errors.subject ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.subject.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase">
              Mesaj
            </label>
            <textarea
              id="message"
              rows={5}
              className={`${fieldClass} resize-none`}
              placeholder="Mesajınızı yazın..."
              {...register("message")}
            />
            {errors.message ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>
            ) : null}
          </div>

          {status === "success" ? (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
              Mesajınız alındı. En kısa sürede size dönüş yapacağız.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
              Bir hata oluştu. Lütfen tekrar deneyin.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rez-btn-primary inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" strokeWidth={1.5} />
            {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
          </button>
        </form>
      </div>
    </FadeUp>
  );
}
