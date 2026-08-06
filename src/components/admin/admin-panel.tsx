"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Phone, X } from "lucide-react";
import { densityLegend } from "@/lib/appointment-content";
import {
  countAppointmentsByDate,
  formatAppointmentDate,
  getAppointments,
  getTodayKey,
  logoutAdmin,
  updateAppointmentStatus,
  type AppointmentStatus,
  type StoredAppointment,
} from "@/lib/appointments-store";
import { DateCalendar } from "@/components/appointment/date-calendar";

type TabId = "calendar" | "pending" | "today" | "history";

const tabs: { id: TabId; label: string }[] = [
  { id: "calendar", label: "Takvim" },
  { id: "pending", label: "Onay Bekleyen" },
  { id: "today", label: "Bugün" },
  { id: "history", label: "Geçmiş" },
];

const weekdayShort = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"] as const;

type AdminPanelProps = {
  onLogout: () => void;
};

function StatusMark({
  status,
  size = "sm",
}: {
  status: AppointmentStatus;
  size?: "sm" | "md";
}) {
  const box = size === "md" ? "h-6 w-6" : "h-5 w-5";
  const icon = size === "md" ? "h-3.5 w-3.5" : "h-3 w-3";
  const q = size === "md" ? "text-xs" : "text-[11px]";

  if (status === "approved") {
    return (
      <span
        className={`flex ${box} shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white`}
        aria-label="Onaylandı"
      >
        <Check className={icon} strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span
      className={`flex ${box} shrink-0 animate-bounce items-center justify-center rounded-full bg-sky-500 ${q} font-semibold text-white`}
      aria-label="Onay bekliyor"
    >
      ?
    </span>
  );
}

function getWeekdayShort(dateKey: string) {
  return weekdayShort[new Date(`${dateKey}T12:00:00`).getDay()];
}

function phoneToWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `90${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function AppointmentDetailModal({
  item,
  onClose,
  onStatus,
}: {
  item: StoredAppointment;
  onClose: () => void;
  onStatus: (id: string, status: AppointmentStatus) => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const details = [
    { label: "İsim", value: item.name },
    { label: "Saat", value: item.time },
    { label: "Gün", value: getWeekdayShort(item.date) },
    { label: "Tarih", value: formatAppointmentDate(item.date) },
    { label: "Hizmet", value: item.serviceName },
    { label: "Telefon", value: item.phone },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(26,22,20,0.45)] backdrop-blur-[2px]"
        aria-label="Kapat"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-detail-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-t-[1.5rem] bg-[var(--background)] px-5 pt-4 pb-6 shadow-[0_24px_70px_rgba(26,22,20,0.18)] sm:rounded-[1.5rem] sm:px-6 sm:pt-5 sm:pb-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.16em] text-[var(--muted)] uppercase">
              Randevu detayı
            </p>
            <div className="mt-1 flex items-center gap-2">
              <h3
                id="appointment-detail-title"
                className="min-w-0 font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)]"
              >
                {item.name}
              </h3>
              <StatusMark status={item.status} size="md" />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--salon-beige)] hover:text-[var(--heading)]"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <dl className="mt-5 divide-y divide-[rgba(26,22,20,0.08)] border-y border-[rgba(26,22,20,0.08)]">
          {details.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <dt className="text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase">
                {row.label}
              </dt>
              <dd className="text-right text-sm font-medium text-[var(--heading)]">
                {row.label === "Telefon" ? (
                  <a href={`tel:${item.phone.replace(/\s/g, "")}`}>{row.value}</a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 space-y-2">
          <a
            href={`tel:${item.phone.replace(/\s/g, "")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(26,22,20,0.14)] px-4 py-3 text-[12px] font-medium tracking-[0.14em] text-[var(--heading)] uppercase transition-colors hover:bg-[var(--salon-beige)]"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            Telefon Et
          </a>
          <a
            href={phoneToWhatsApp(item.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(26,22,20,0.14)] px-4 py-3 text-[12px] font-medium tracking-[0.14em] text-[var(--heading)] uppercase transition-colors hover:bg-[var(--salon-beige)]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        {item.status === "pending" ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onStatus(item.id, "approved");
                onClose();
              }}
              className="rounded-2xl bg-[var(--heading)] px-4 py-3 text-[11px] font-medium tracking-[0.14em] text-[var(--background)] uppercase"
            >
              Onayla
            </button>
            <button
              type="button"
              onClick={() => {
                onStatus(item.id, "rejected");
                onClose();
              }}
              className="rounded-2xl border border-[rgba(26,22,20,0.18)] px-4 py-3 text-[11px] font-medium tracking-[0.14em] text-[var(--heading)] uppercase"
            >
              Reddet
            </button>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function AppointmentCard({
  item,
  onOpen,
}: {
  item: StoredAppointment;
  onOpen: () => void;
}) {
  return (
    <article className="flex items-center gap-3 rounded-[1.15rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 sm:gap-4 sm:px-5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <h2 className="truncate font-[family-name:var(--font-cormorant)] text-xl tracking-[-0.02em] text-[var(--heading)] sm:text-2xl">
          {item.name}
        </h2>
        <StatusMark status={item.status} />
      </div>
      <p className="shrink-0 text-sm font-medium tracking-[0.04em] text-[var(--heading)]">
        {item.time}
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="shrink-0 rounded-xl border border-[rgba(26,22,20,0.14)] px-3.5 py-2 text-[11px] font-medium tracking-[0.14em] text-[var(--heading)] uppercase transition-colors hover:bg-[var(--salon-beige)]"
      >
        Detay
      </button>
    </article>
  );
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const todayKey = getTodayKey();
  const [tab, setTab] = useState<TabId>("calendar");
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [items, setItems] = useState<StoredAppointment[]>(() =>
    getAppointments(),
  );
  const [detailItem, setDetailItem] = useState<StoredAppointment | null>(null);

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const byDate = b.date.localeCompare(a.date);
      if (byDate !== 0) return byDate;
      return a.time.localeCompare(b.time);
    });

    if (tab === "pending") {
      return sorted.filter((item) => item.status === "pending");
    }
    if (tab === "today") {
      return sorted
        .filter((item) => item.date === todayKey)
        .sort((a, b) => a.time.localeCompare(b.time));
    }
    if (tab === "history") {
      return sorted.filter((item) => item.date < todayKey);
    }
    return [];
  }, [items, tab, todayKey]);

  const dayAppointments = useMemo(
    () =>
      items
        .filter((item) => item.date === selectedDate)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [items, selectedDate],
  );

  const occupancyByDate = useMemo(
    () => countAppointmentsByDate(items),
    [items],
  );

  const setStatus = (id: string, status: AppointmentStatus) => {
    const next = updateAppointmentStatus(id, status);
    setItems(next);
    setDetailItem((current) => {
      if (!current || current.id !== id) return current;
      return next.find((item) => item.id === id) ?? null;
    });
  };

  const tabCount = (id: TabId) => {
    if (id === "pending") {
      return items.filter((apt) => apt.status === "pending").length;
    }
    if (id === "today") {
      return items.filter((apt) => apt.date === todayKey).length;
    }
    if (id === "history") {
      return items.filter((apt) => apt.date < todayKey).length;
    }
    return dayAppointments.length;
  };

  const list = tab === "calendar" ? dayAppointments : filtered;
  const pendingCount = items.filter((apt) => apt.status === "pending").length;

  return (
    <section className="min-h-svh bg-[var(--background)] px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
              Randevu Paneli
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Takvim, onay ve randevu takibi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="inline-flex items-center justify-center rounded-2xl border border-[rgba(26,22,20,0.18)] px-5 py-3 text-[12px] font-medium tracking-[0.14em] text-[var(--heading)] uppercase transition-colors hover:bg-[var(--salon-beige)]"
          >
            Çıkış
          </button>
        </div>

        <nav
          aria-label="Panel sekmeleri"
          className="mt-8 border-b border-[rgba(26,22,20,0.1)]"
        >
          <ul className="flex gap-1 overflow-x-auto pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((item) => {
              const active = tab === item.id;
              const count = tabCount(item.id);
              const pendingAlert =
                item.id === "pending" && pendingCount > 1;

              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`relative flex items-center gap-2 px-3 py-3 text-[12px] font-medium tracking-[0.14em] uppercase transition-colors sm:px-4 ${
                      pendingAlert ? "animate-[admin-tab-blink_1.8s_ease-in-out_infinite]" : ""
                    } ${
                      active
                        ? "text-[var(--heading)]"
                        : "text-[var(--muted)] hover:text-[var(--heading)]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`font-[family-name:var(--font-cormorant)] text-base tracking-normal normal-case ${
                        active ? "text-[var(--heading)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {count}
                    </span>
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 h-px bg-[var(--heading)] sm:inset-x-4"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {tab === "calendar" ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--subtle)] uppercase">
                  Takvim
                </p>
                <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1.5">
                  {densityLegend.map((item) => (
                    <li
                      key={item.level}
                      className="inline-flex items-center gap-1.5 text-[11px] text-[var(--muted)]"
                    >
                      <span className={`h-2 w-2 rounded-full ${item.className}`} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <DateCalendar
                mode="admin"
                value={selectedDate}
                onChange={setSelectedDate}
                occupancyByDate={occupancyByDate}
              />
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)]">
                {formatAppointmentDate(selectedDate)}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {dayAppointments.length} randevu
              </p>

              <div className="mt-5 space-y-2">
                {dayAppointments.length === 0 ? (
                  <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--muted)]">
                    Bu günde randevu yok.
                  </div>
                ) : (
                  dayAppointments.map((item) => (
                    <AppointmentCard
                      key={item.id}
                      item={item}
                      onOpen={() => setDetailItem(item)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-2">
            {list.length === 0 ? (
              <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--muted)]">
                Bu bölümde randevu yok.
              </div>
            ) : (
              list.map((item) => (
                <AppointmentCard
                  key={item.id}
                  item={item}
                  onOpen={() => setDetailItem(item)}
                />
              ))
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {detailItem ? (
          <AppointmentDetailModal
            item={detailItem}
            onClose={() => setDetailItem(null)}
            onStatus={setStatus}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
