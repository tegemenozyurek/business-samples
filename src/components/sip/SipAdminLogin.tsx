"use client";

import { useState, type FormEvent } from "react";
import { loginSipAdmin } from "@/lib/sip-admin-auth";

type SipAdminLoginProps = {
  onSuccess: () => void;
};

export function SipAdminLogin({ onSuccess }: SipAdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const ok = loginSipAdmin(username.trim(), password);
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
        <h1 className="sip-display text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
          Admin
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Sipariş yönetim paneline giriş yapın.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
        >
          <div>
            <label
              htmlFor="sip-admin-username"
              className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
            >
              Kullanıcı adı
            </label>
            <input
              id="sip-admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--sip-alt)] px-4 py-3.5 text-sm text-[var(--heading)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="sip-admin-password"
              className="mb-2 block text-[11px] tracking-[0.14em] text-[var(--subtle)] uppercase"
            >
              Şifre
            </label>
            <input
              id="sip-admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--sip-alt)] px-4 py-3.5 text-sm text-[var(--heading)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          {error ? <p className="text-xs text-red-600">{error}</p> : null}

          <button type="submit" className="sip-btn-primary mt-2 w-full">
            Giriş Yap
          </button>
        </form>
      </div>
    </section>
  );
}
