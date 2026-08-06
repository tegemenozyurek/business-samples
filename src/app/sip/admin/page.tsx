import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Sipariş",
  description: "Sipariş yönetim paneli.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SipAdminPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[var(--background)] px-6 py-10">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-medium tracking-[0.02em] text-heading">
          Sipariş — Admin
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Sipariş yönetim paneli yakında.
        </p>
      </div>
    </main>
  );
}
