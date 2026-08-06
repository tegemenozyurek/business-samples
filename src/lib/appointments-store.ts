import {
  appointmentServices,
  getAdminCalendarRange,
  getBookedSlotsForDate,
  toDateKey,
} from "@/lib/appointment-content";

export type AppointmentStatus = "pending" | "approved" | "rejected";

export type StoredAppointment = {
  id: string;
  appointmentNo: string;
  name: string;
  phone: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
};

const STORAGE_KEY = "qeva-appointments-v2";
const AUTH_KEY = "qeva-admin-auth";

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
} as const;

const seedNames = [
  "Elif Yılmaz",
  "Selin Kara",
  "Deniz Acar",
  "Ayşe Demir",
  "Merve Çelik",
  "Zeynep Aksoy",
  "İrem Koç",
  "Ceren Yıldız",
  "Buse Arslan",
  "Gizem Şahin",
  "Ece Polat",
  "Melis Kurt",
  "Derya Özkan",
  "Sude Aydın",
  "Nazlı Erdem",
] as const;

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function eachDateKey(start: Date, end: Date) {
  const keys: string[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    keys.push(toDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return keys;
}

function phoneForIndex(index: number) {
  const base = 5321000000 + ((index * 137) % 8999999);
  const digits = String(base);
  return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
}

function statusForDate(
  dateKey: string,
  todayKey: string,
  index: number,
): AppointmentStatus {
  if (dateKey < todayKey) {
    return index % 9 === 0 ? "rejected" : "approved";
  }
  if (dateKey === todayKey) {
    if (index % 3 === 0) return "pending";
    if (index % 7 === 0) return "rejected";
    return "approved";
  }
  return index % 4 === 0 ? "pending" : "approved";
}

function seedAppointments(): StoredAppointment[] {
  const { start, end, today } = getAdminCalendarRange();
  const todayKey = toDateKey(today);
  const items: StoredAppointment[] = [];
  let seq = 100001;

  for (const dateKey of eachDateKey(start, end)) {
    const slots = getBookedSlotsForDate(dateKey);
    if (slots.length === 0) continue;

    slots.forEach((time, slotIndex) => {
      const index = items.length;
      const service =
        appointmentServices[(index + slotIndex) % appointmentServices.length];
      const created = addDays(new Date(`${dateKey}T12:00:00`), -2);

      items.push({
        id: `seed-${dateKey}-${time}`,
        appointmentNo: `QEVA-${seq}`,
        name: seedNames[index % seedNames.length],
        phone: phoneForIndex(index),
        serviceId: service.id,
        serviceName: service.name,
        date: dateKey,
        time,
        notes: "",
        status: statusForDate(dateKey, todayKey, index),
        createdAt: created.toISOString(),
      });
      seq += 1;
    });
  }

  return items;
}

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getAppointments(): StoredAppointment[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedAppointments();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as StoredAppointment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAppointments(items: StoredAppointment[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addAppointment(
  input: Omit<StoredAppointment, "id" | "status" | "createdAt">,
) {
  const items = getAppointments();
  const next: StoredAppointment = {
    ...input,
    id: `apt-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  saveAppointments([next, ...items]);
  return next;
}

export function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
) {
  const items = getAppointments();
  const next = items.map((item) =>
    item.id === id ? { ...item, status } : item,
  );
  saveAppointments(next);
  return next;
}

export function isAdminAuthenticated() {
  if (!canUseStorage()) return false;
  return window.sessionStorage.getItem(AUTH_KEY) === "1";
}

export function loginAdmin(username: string, password: string) {
  const ok =
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password;
  if (ok && canUseStorage()) {
    window.sessionStorage.setItem(AUTH_KEY, "1");
  }
  return ok;
}

export function logoutAdmin() {
  if (!canUseStorage()) return;
  window.sessionStorage.removeItem(AUTH_KEY);
}

export function formatAppointmentDate(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00`);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(date);
}

export function getTodayKey() {
  return toDateKey(new Date());
}

/** Count appointments per date for calendar density beads. */
export function countAppointmentsByDate(
  items: StoredAppointment[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    counts[item.date] = (counts[item.date] ?? 0) + 1;
  }
  return counts;
}
