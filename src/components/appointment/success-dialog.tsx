"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

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
  const details = [
    { label: "Hizmet", value: service },
    { label: "Tarih", value: date },
    { label: "Saat", value: time },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(26,22,20,0.5)] backdrop-blur-[2px]"
            aria-label="Kapat"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            className="relative z-10 w-full max-w-lg overflow-y-auto rounded-t-[1.75rem] bg-[var(--background)] px-6 pt-5 pb-8 shadow-[0_30px_80px_rgba(26,22,20,0.2)] sm:rounded-[1.75rem] sm:px-8 sm:pt-7 sm:pb-9"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--salon-beige)] hover:text-[var(--heading)]"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <h2
                id="booking-success-title"
                className="min-w-0 flex-1 font-[family-name:var(--font-cormorant)] text-[2rem] leading-[1.15] tracking-[-0.03em] text-[var(--heading)] sm:text-4xl"
              >
                Randevu talebiniz alındı.
              </h2>
              <motion.div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--background)] sm:h-12 sm:w-12"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.35 }}
              >
                <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
              </motion.div>
            </div>

            <p className="mt-3 text-sm text-[var(--muted)]">
              Onay bilginiz kısa süre içinde iletilecektir.
            </p>

            <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[11px] tracking-[0.14em] text-[var(--heading)] uppercase">
              <span className="text-[var(--muted)]">No</span>
              {appointmentNo}
            </p>

            <dl className="mt-7 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 py-3.5"
                >
                  <dt className="text-[11px] tracking-[0.16em] text-[var(--muted)] uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-right font-[family-name:var(--font-cormorant)] text-xl tracking-[-0.02em] text-[var(--heading)] sm:text-2xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
