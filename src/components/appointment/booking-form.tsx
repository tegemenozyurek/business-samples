"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentServices } from "@/lib/appointment-content";
import { BookingSummary } from "./booking-summary";
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

const fieldClass =
  "w-full rounded-2xl border border-[rgba(26,22,20,0.1)] bg-[var(--salon-gray)] px-4 py-3.5 text-sm text-[var(--heading)] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)] focus:bg-white";

function formatDisplayDate(value: string) {
  if (!value) {
    return "";
  }
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
  const [appointmentNo, setAppointmentNo] = useState<string | null>(null);
  const [successPayload, setSuccessPayload] = useState<{
    service: string;
    date: string;
    time: string;
  } | null>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const {
    register,
    handleSubmit,
    setValue,
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
  });

  const serviceId = watch("serviceId");
  const date = watch("date");
  const time = watch("time");

  const selectedService = appointmentServices.find(
    (service) => service.id === serviceId,
  );

  const onSubmit = async (data: BookingFormValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    const number = createAppointmentNumber();
    setAppointmentNo(number);
    setSuccessPayload({
      service: selectedService?.name ?? data.serviceId,
      date: formatDisplayDate(data.date),
      time: data.time,
    });
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
      <section className="bg-[var(--background)] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
            noValidate
          >
            <ServiceSelector
              value={serviceId}
              onChange={(id) =>
                setValue("serviceId", id, { shouldValidate: true })
              }
            />
            {errors.serviceId ? (
              <p className="-mt-6 text-xs text-red-600">
                {errors.serviceId.message}
              </p>
            ) : null}

            <div className="rounded-[1.75rem] border border-[rgba(26,22,20,0.06)] bg-white p-6 shadow-[0_12px_40px_rgba(26,22,20,0.04)] sm:p-8">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--heading)] sm:text-3xl">
                Bilgileriniz
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
                  >
                    Tarih
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={today}
                    className={fieldClass}
                    {...register("date")}
                  />
                  {errors.date ? (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.date.message}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <TimeSlotPicker
                    value={time}
                    onChange={(slot) =>
                      setValue("time", slot, { shouldValidate: true })
                    }
                  />
                  {errors.time ? (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.time.message}
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

              <label className="mt-5 flex items-start gap-3 text-sm text-[var(--muted)]">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-[rgba(26,22,20,0.2)]"
                  {...register("privacy")}
                />
                <span>
                  Gizlilik politikasını okudum ve kabul ediyorum.
                </span>
              </label>
              {errors.privacy ? (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.privacy.message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rez-btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Oluşturuluyor..." : "Randevuyu Oluştur"}
              </button>
            </div>
          </form>

          <BookingSummary
            serviceName={selectedService?.name}
            date={formatDisplayDate(date)}
            time={time}
            duration={selectedService?.duration}
            price={selectedService?.price}
          />
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
