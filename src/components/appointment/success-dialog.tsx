"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { contactDetails } from "@/lib/contact-content";

type SuccessDialogProps = {
  open: boolean;
  appointmentNo: string;
  service: string;
  date: string;
  time: string;
  onClose: () => void;
};

export function SuccessDialog({
  open,
  appointmentNo,
  service,
  date,
  time,
  onClose,
}: SuccessDialogProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            aria-label="Kapat"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            className="relative z-10 w-full max-w-md rounded-[1.75rem] bg-white p-7 text-center shadow-[0_30px_80px_rgba(26,22,20,0.18)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--salon-beige)] text-[var(--heading)]">
              <CheckCircle className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h2
              id="booking-success-title"
              className="mt-5 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--heading)]"
            >
              Randevunuz başarıyla oluşturuldu.
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Randevu No: <span className="font-medium text-[var(--heading)]">{appointmentNo}</span>
            </p>

            <dl className="mt-6 space-y-2 rounded-2xl bg-[var(--salon-gray)] px-4 py-4 text-left text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--subtle)]">Hizmet</dt>
                <dd className="font-medium text-[var(--heading)]">{service}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--subtle)]">Tarih</dt>
                <dd className="font-medium text-[var(--heading)]">{date}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--subtle)]">Saat</dt>
                <dd className="font-medium text-[var(--heading)]">{time}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/rez"
                className="rez-btn-primary flex-1 text-center"
                onClick={onClose}
              >
                Ana Sayfaya Dön
              </Link>
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rez-btn-secondary flex-1 text-center"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
