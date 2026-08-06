import { servicesList } from "@/lib/services-content";

export const appointmentHeroImage =
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=2000&q=80";

export const appointmentServices = servicesList.map((service) => ({
  id: service.id,
  name: service.name,
  description: service.description,
  duration: service.duration,
  price: service.price,
  image: service.image,
}));

/** Matches contact working hours: weekdays 10–20, Saturday 10–19, Sunday closed. */
const weekdaySlots = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
] as const;

const saturdaySlots = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
] as const;

export type DensityLevel = "green" | "yellow" | "orange" | "red";

export const densityLegend: {
  level: DensityLevel;
  label: string;
  className: string;
}[] = [
  { level: "green", label: "Müsait", className: "bg-emerald-500" },
  { level: "yellow", label: "Orta", className: "bg-amber-400" },
  { level: "orange", label: "Yoğun", className: "bg-orange-500" },
  { level: "red", label: "Dolu", className: "bg-red-500" },
];

function hashDate(dateKey: string) {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Available slots for a date based on contact working hours. */
export function getTimeSlotsForDate(dateKey: string): string[] {
  const day = new Date(`${dateKey}T12:00:00`).getDay();
  if (day === 0) return [];
  if (day === 6) return [...saturdaySlots];
  return [...weekdaySlots];
}

/** Mock occupancy for a day — stable per date. */
export function getDayDensity(dateKey: string): DensityLevel {
  const day = new Date(`${dateKey}T12:00:00`).getDay();
  if (day === 0) return "red";

  const bucket = hashDate(dateKey) % 10;
  if (bucket <= 3) return "green";
  if (bucket <= 6) return "yellow";
  if (bucket <= 8) return "orange";
  return "red";
}

/** Mock booked slots for a selected date. */
export function getBookedSlotsForDate(dateKey: string): string[] {
  const slots = getTimeSlotsForDate(dateKey);
  if (slots.length === 0) return [];

  const density = getDayDensity(dateKey);
  const hash = hashDate(dateKey);
  const count =
    density === "green"
      ? 2
      : density === "yellow"
        ? Math.max(4, Math.floor(slots.length * 0.35))
        : density === "orange"
          ? Math.max(7, Math.floor(slots.length * 0.6))
          : slots.length;

  if (count >= slots.length) {
    return [...slots];
  }

  const booked = new Set<string>();
  let cursor = hash;
  while (booked.size < count) {
    booked.add(slots[cursor % slots.length]);
    cursor = (cursor * 17 + 5) >>> 0;
  }
  return [...booked];
}

export function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Selectable range: today → end of next month. */
export function getSelectableRange(now = new Date()) {
  const today = startOfDay(now);
  const end = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  return { today, end };
}

/** Admin calendar range: start of previous month → end of next month. */
export function getAdminCalendarRange(now = new Date()) {
  const today = startOfDay(now);
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  return { today, start, end };
}

export const bookingInfoCards = [
  {
    title: "İptal Politikası",
    description:
      "Randevunuzu en az 24 saat önce iptal edebilirsiniz. Geç iptallerde aynı gün yeni slot açılamayabilir.",
  },
  {
    title: "Geç Kalma",
    description:
      "10 dakikadan fazla gecikmelerde hizmet süresi kısalabilir veya randevu yeniden planlanabilir.",
  },
  {
    title: "Ödeme",
    description:
      "Nakit, kredi / banka kartı ve mobil ödemeleri kabul ediyoruz. Online ön ödeme gerekmez.",
  },
  {
    title: "Onay",
    description:
      "Randevu oluşturulunca SMS / WhatsApp ile onay mesajı gönderilir.",
  },
] as const;
