"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentServices,
  densityLegend,
} from "@/lib/appointment-content";
import { DateCalendar } from "./date-calendar";
import { ServiceSelector } from "./service-selector";
import { TimeSlotPicker } from "./time-slot-picker";
import { SuccessDialog } from "./success-dialog";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı."),
  phone: z
    .string()
    .trim()
    .min(10, "Geçerli bir telefon numarası girin.")
    .max(20, "Telefon numarası çok uzun."),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta girin.")
    .or(z.literal("")),
  serviceId: z.string().min(1, "Lütfen bir hizmet seçin."),
  date: z.string().min(1, "Tarih seçin."),
  time: z.string().min(1, "Saat seçin."),
  notes: z.string().optional(),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Gizlilik politikasını onaylamanız gerekir.",
  }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const steps = [
  { id: 1, label: "Hizmet" },
  { id: 2, label: "Tarih & Saat" },
  { id: 3, label: "Bilgiler" },
] as const;

const fieldClass =
  "w-full rounded-2xl border border-[rgba(26,22,20,0.1)] bg-[var(--salon-gray)] px-4 py-3.5 text-sm text-[var(--heading)] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)] focus:bg-white";

function formatDisplayDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(date);
}

function createAppointmentNumber() {
  const stamp = Date.now().toString().slice(-6);
  return `QEVA-${stamp}`;
}

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [appointmentNo, setAppointmentNo] = useState<string | null>(null);
  const [successPayload, setSuccessPayload] = useState<{
    service: string;
    date: string;
    time: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceId: "",
      date: "",
      time: "",
      notes: "",
      privacy: false,
    },
    mode: "onSubmit",
    shouldUnregister: false,
  });

  const serviceId = watch("serviceId");
  const date = watch("date");
  const time = watch("time");
  const name = watch("name");
  const phone = watch("phone");

  const selectedService = appointmentServices.find(
    (service) => service.id === serviceId,
  );

  const goNext = () => {
    if (step === 1) {
      if (!serviceId) {
        setError("serviceId", {
          type: "manual",
          message: "Lütfen bir hizmet seçin.",
        });
        return;
      }
      clearErrors();
      setStep(2);
      return;
    }

    if (step === 2) {
      let valid = true;
      if (!date) {
        setError("date", { type: "manual", message: "Tarih seçin." });
        valid = false;
      } else {
        clearErrors("date");
      }
      if (!time) {
        setError("time", { type: "manual", message: "Saat seçin." });
        valid = false;
      } else {
        clearErrors("time");
      }
      if (!valid) return;
      clearErrors();
      setStep(3);
    }
  };

  const goBack = () => {
    clearErrors();
    setStep((current) => Math.max(1, current - 1));
  };

  const onSubmit = async (data: BookingFormValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    const number = createAppointmentNumber();
    setAppointmentNo(number);
    setSuccessPayload({
      service: selectedService?.name ?? data.serviceId,
      date: formatDisplayDate(data.date),
      time: data.time,
    });
    setStep(1);
    reset({
      name: "",
      phone: "",
      email: "",
      serviceId: "",
      date: "",
      time: "",
      notes: "",
      privacy: false,
    });
  };

  return (
    <>
      <section className="bg-[var(--background)] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Randevu adımları" className="mb-12">
            <ol className="flex items-start">
              {steps.map((item, index) => {
                const active = step === item.id;
                const done = step > item.id;

                return (
                  <li
                    key={item.id}
                    className={`flex items-start ${
                      index < steps.length - 1 ? "flex-1" : ""
                    }`}
                  >
                    <div className="flex w-[4.5rem] flex-col items-center text-center sm:w-24">
                      <span
                        className={`font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.03em] transition-colors duration-300 sm:text-3xl ${
                          active
                            ? "text-[var(--heading)]"
                            : done
                              ? "text-[var(--heading)]"
                              : "text-[rgba(26,22,20,0.22)]"
                        }`}
                      >
                        0{item.id}
                      </span>
                      <span
                        className={`mt-1 text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 sm:text-[11px] ${
                          active
                            ? "text-[var(--heading)]"
                            : done
                              ? "text-[var(--heading)]/70"
                              : "text-[var(--muted)]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {index < steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="mt-4 mx-2 h-px flex-1 self-start"
                      >
                        <span
                          className={`block h-px w-full transition-colors duration-500 ${
                            done
                              ? "bg-[var(--heading)]"
                              : "bg-[rgba(26,22,20,0.12)]"
                          }`}
                        />
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex min-h-[42rem] flex-col sm:min-h-[46rem]"
          >
            <div className="flex-1">
            {step === 1 ? (
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
                  Hizmet seçin
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Randevu almak istediğiniz hizmeti seçerek devam edin.
                </p>
                <div className="mt-8">
                  <ServiceSelector
                    value={serviceId}
                    onChange={(id) => {
                      setValue("serviceId", id, { shouldDirty: true });
                      clearErrors("serviceId");
                    }}
                  />
                </div>
                {errors.serviceId ? (
                  <p className="mt-3 text-xs text-red-600">
                    {errors.serviceId.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
                  Tarih ve saat seçin
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Önce günü seçin, ardından uygun saati belirleyin.
                </p>

                <div className="mt-8 space-y-10">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--subtle)] uppercase">
                        Tarih
                      </p>
                      <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1.5">
                        {densityLegend.map((item) => (
                          <li
                            key={item.level}
                            className="inline-flex items-center gap-1.5 text-[11px] text-[var(--muted)]"
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${item.className}`}
                            />
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <DateCalendar
                      value={date}
                      onChange={(nextDate) => {
                        setValue("date", nextDate, { shouldDirty: true });
                        setValue("time", "", { shouldDirty: true });
                        clearErrors(["date", "time"]);
                      }}
                    />
                    {errors.date ? (
                      <p className="mt-3 text-xs text-red-600">
                        {errors.date.message}
                      </p>
                    ) : null}
                  </div>

                  {date ? (
                    <div>
                      <TimeSlotPicker
                        date={date}
                        value={time}
                        onChange={(slot) => {
                          setValue("time", slot, { shouldDirty: true });
                          clearErrors("time");
                        }}
                      />
                      {errors.time ? (
                        <p className="mt-1.5 text-xs text-red-600">
                          {errors.time.message}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--muted)]">
                      Saat seçmek için önce bir gün seçin.
                    </p>
                  )}
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
                  Bilgileriniz
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Son adım: iletişim bilgilerinizi girin ve randevuyu onaylayın.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
                    >
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
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.name.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
                    >
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
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.phone.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
                    >
                      Email <span className="normal-case">(opsiyonel)</span>
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
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
                    >
                      Not <span className="normal-case">(opsiyonel)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      className={`${fieldClass} resize-none`}
                      placeholder="İsteklerinizi yazabilirsiniz..."
                      {...register("notes")}
                    />
                  </div>
                </div>

                <div className="mt-8 rounded-[1.25rem] border border-[rgba(26,22,20,0.08)] bg-[var(--salon-beige)] px-5 py-5">
                  <p className="text-[11px] font-medium tracking-[0.16em] text-[var(--accent)] uppercase">
                    Özet
                  </p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Hizmet</dt>
                      <dd className="text-right font-medium text-[var(--heading)]">
                        {selectedService?.name}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Tarih</dt>
                      <dd className="text-right font-medium text-[var(--heading)]">
                        {formatDisplayDate(date)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Saat</dt>
                      <dd className="text-right font-medium text-[var(--heading)]">
                        {time}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Süre / Fiyat</dt>
                      <dd className="text-right font-medium text-[var(--heading)]">
                        {selectedService?.duration} · {selectedService?.price}
                      </dd>
                    </div>
                    {name || phone ? (
                      <div className="flex justify-between gap-4 border-t border-[rgba(26,22,20,0.08)] pt-3">
                        <dt className="text-[var(--muted)]">İletişim</dt>
                        <dd className="text-right font-medium text-[var(--heading)]">
                          {[name, phone].filter(Boolean).join(" · ")}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </div>

                <label className="mt-6 flex items-start gap-3 text-sm text-[var(--muted)]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-[rgba(26,22,20,0.2)]"
                    {...register("privacy")}
                  />
                  <span>Gizlilik politikasını okudum ve kabul ediyorum.</span>
                </label>
                {errors.privacy ? (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.privacy.message}
                  </p>
                ) : null}
              </div>
            ) : null}
            </div>

            <div className="mt-auto flex items-center justify-between gap-4 border-t border-[rgba(26,22,20,0.08)] pt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex min-w-[132px] items-center justify-center rounded-2xl border border-[rgba(26,22,20,0.18)] bg-transparent px-7 py-3.5 text-[12px] font-medium tracking-[0.16em] text-[var(--heading)] uppercase transition-colors hover:border-[var(--heading)] hover:bg-[var(--salon-beige)]"
                >
                  Geri
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex min-w-[148px] items-center justify-center rounded-2xl bg-[var(--heading)] px-7 py-3.5 text-[12px] font-medium tracking-[0.16em] text-[var(--background)] uppercase transition-opacity hover:opacity-90"
                >
                  Devam
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-w-[190px] items-center justify-center rounded-2xl bg-[var(--heading)] px-7 py-3.5 text-[12px] font-medium tracking-[0.16em] text-[var(--background)] uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Oluşturuluyor..." : "Randevuyu Oluştur"}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <SuccessDialog
        open={Boolean(appointmentNo && successPayload)}
        appointmentNo={appointmentNo ?? ""}
        service={successPayload?.service ?? ""}
        date={successPayload?.date ?? ""}
        time={successPayload?.time ?? ""}
        onClose={() => {
          setAppointmentNo(null);
          setSuccessPayload(null);
        }}
      />
    </>
  );
}
