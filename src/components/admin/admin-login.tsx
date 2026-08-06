"use client";

import { useState, type FormEvent } from "react";
import { loginAdmin } from "@/lib/appointments-store";

type AdminLoginProps = {
  onSuccess: () => void;
};

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const ok = loginAdmin(username.trim(), password);
    if (!ok) {
      setError("Kullanıcı adı veya şifre hatalı.");
      return;
    }
    setError("");
    onSuccess();
  };

  return (
    <section className="flex min-h-svh items-center bg-[var(--background)] px-6 py-10 lg:px-10">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
          Admin
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Randevu yönetim paneline giriş yapın.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
        >
          <div>
            <label
              htmlFor="admin-username"
              className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
            >
              Kullanıcı adı
            </label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-2xl border border-[rgba(26,22,20,0.1)] bg-[var(--salon-gray)] px-4 py-3.5 text-sm text-[var(--heading)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
            >
              Şifre
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-[rgba(26,22,20,0.1)] bg-[var(--salon-gray)] px-4 py-3.5 text-sm text-[var(--heading)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          {error ? (
            <p className="text-xs text-red-600">{error}</p>
          ) : null}

          <button
            type="submit"
            className="rez-btn-primary mt-2 w-full"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </section>
  );
}
