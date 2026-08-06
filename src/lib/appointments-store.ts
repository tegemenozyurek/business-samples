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

const STORAGE_KEY = "qeva-appointments";
const AUTH_KEY = "qeva-admin-auth";

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
} as const;

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function seedAppointments(): StoredAppointment[] {
  const today = new Date();
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);
  const lastWeek = addDays(today, -7);

  return [
    {
      id: "seed-1",
      appointmentNo: "QEVA-100001",
      name: "Elif Yılmaz",
      phone: "0532 111 22 33",
      email: "elif@mail.com",
      serviceId: "manikur",
      serviceName: "Manikür",
      date: toDateKey(today),
      time: "11:00",
      notes: "",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "seed-2",
      appointmentNo: "QEVA-100002",
      name: "Selin Kara",
      phone: "0541 222 33 44",
      serviceId: "kalici-oje",
      serviceName: "Kalıcı Oje",
      date: toDateKey(today),
      time: "14:30",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "seed-3",
      appointmentNo: "QEVA-100003",
      name: "Deniz Acar",
      phone: "0505 333 44 55",
      serviceId: "pedikur",
      serviceName: "Pedikür",
      date: toDateKey(tomorrow),
      time: "10:00",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "seed-4",
      appointmentNo: "QEVA-100004",
      name: "Ayşe Demir",
      phone: "0533 444 55 66",
      serviceId: "protez-tirnak",
      serviceName: "Protez Tırnak",
      date: toDateKey(yesterday),
      time: "16:00",
      status: "approved",
      createdAt: yesterday.toISOString(),
    },
    {
      id: "seed-5",
      appointmentNo: "QEVA-100005",
      name: "Merve Çelik",
      phone: "0555 666 77 88",
      serviceId: "nail-art",
      serviceName: "Nail Art",
      date: toDateKey(lastWeek),
      time: "13:00",
      status: "rejected",
      createdAt: lastWeek.toISOString(),
    },
  ];
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
